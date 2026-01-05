<#
  fix-dev.ps1

  A Windows PowerShell script to fix common “npm run dev missing script / ENOENT package.json” issues
  for JavaScript web projects (Astro / Vite / Next.js). The script is safe to run multiple times
  (idempotent) and prints clear, helpful console messages.

  What it does (high-level):
  - Starts from the current directory.
  - Ensures/creates package.json, or helps you navigate to the correct folder.
  - Detects framework (Astro / Vite / Next.js) via config files or dependencies.
  - Optionally scaffolds Astro when no framework is detected.
  - Ensures required dependencies exist.
  - Ensures scripts.dev (and siblings) are set correctly (with confirmation for overwrites).
  - Installs dependencies if node_modules missing or lockfile changed.
  - Starts the dev server and prints helpful URLs.

  Bonus: If the project is Astro and just needs scripts added, prints a one-liner fallback command.

  Usage:
    pwsh ./fix-dev.ps1
#>

[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

function Write-Info {
  param([string]$Message)
  Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Warn {
  param([string]$Message)
  Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Write-Err {
  param([string]$Message)
  Write-Host "❌ $Message" -ForegroundColor Red
}

function Confirm-YesNo {
  param(
    [Parameter(Mandatory=$true)][string]$Message,
    [bool]$DefaultYes = $true
  )
  if ($env:CI) {
    # Assume yes in CI to avoid hangs
    return $true
  }
  $suffix = if ($DefaultYes) { "[Y/n]" } else { "[y/N]" }
  while ($true) {
    $answer = Read-Host "$Message $suffix"
    if ([string]::IsNullOrWhiteSpace($answer)) {
      return $DefaultYes
    }
    switch ($answer.ToLowerInvariant()) {
      {$_ -in @('y','yes')} { return $true }
      {$_ -in @('n','no')}  { return $false }
      default { Write-Warn "Please enter Y or N." }
    }
  }
}

function Confirm-Overwrite {
  param([string]$Message)
  if ($env:CI) { return $true }
  return (Confirm-YesNo -Message $Message -DefaultYes:$true)
}

function Run-Cmd {
  param(
    [Parameter(Mandatory=$true)][string]$Exe,
    [string[]]$Args = @(),
    [switch]$Quiet
  )
  $argLine = ($Args | ForEach-Object { if ($_ -match '\s') { '"' + $_ + '"' } else { $_ } }) -join ' '
  if (-not $Quiet) { Write-Host "> $Exe $argLine" -ForegroundColor Cyan }
  $psi = New-Object System.Diagnostics.ProcessStartInfo
  $psi.FileName = $Exe
  $psi.Arguments = $argLine
  $psi.RedirectStandardOutput = $true
  $psi.RedirectStandardError  = $true
  $psi.UseShellExecute = $false
  $psi.CreateNoWindow = $true
  $p = New-Object System.Diagnostics.Process
  $p.StartInfo = $psi
  $null = $p.Start()
  $stdOut = $p.StandardOutput.ReadToEnd()
  $stdErr = $p.StandardError.ReadToEnd()
  $p.WaitForExit()
  if (-not $Quiet) {
    if ($stdOut) { Write-Host $stdOut }
    if ($stdErr) { Write-Host $stdErr }
  }
  return [PSCustomObject]@{
    ExitCode = $p.ExitCode
    StdOut   = $stdOut
    StdErr   = $stdErr
  }
}

function Tail-File {
  param([string]$Path, [int]$Lines = 30)
  if (Test-Path -LiteralPath $Path) {
    Write-Host "--- Last $Lines lines of $Path ---" -ForegroundColor DarkGray
    Get-Content -LiteralPath $Path -Tail $Lines | ForEach-Object { Write-Host $_ }
    Write-Host "--- End of log ---" -ForegroundColor DarkGray
  } else {
    Write-Warn "Log file not found: $Path"
  }
}

function Load-PackageJson {
  if (-not (Test-Path -LiteralPath 'package.json')) { return $null }
  try {
    return (Get-Content -LiteralPath 'package.json' -Raw | ConvertFrom-Json)
  } catch {
    Write-Err "package.json exists but is not valid JSON. Please fix it and re-run."
    throw
  }
}

function Save-PackageJson {
  param(
    [Parameter(Mandatory=$true)]$Pkg
  )
  # Back up before modifying (idempotent, overwrite ok)
  if (Test-Path -LiteralPath 'package.json') {
    Copy-Item -LiteralPath 'package.json' -Destination 'package.json.bak' -Force
    Write-Info "Backed up package.json -> package.json.bak"
  }
  $json = $Pkg | ConvertTo-Json -Depth 100
  Set-Content -LiteralPath 'package.json' -Value $json -Encoding UTF8
  Write-Info "Updated package.json"
}

function Detect-Framework {
  param($Pkg)
  # 1) Config files
  if (Get-ChildItem -Name 'astro.config.*' -ErrorAction SilentlyContinue) { return 'Astro' }
  if (Get-ChildItem -Name 'vite.config.*'  -ErrorAction SilentlyContinue) { return 'Vite' }
  if (Get-ChildItem -Name 'next.config.*'  -ErrorAction SilentlyContinue) { return 'Next.js' }

  # 2) Dependencies
  $deps = @()
  if ($Pkg) {
    if ($Pkg.dependencies)     { $deps += $Pkg.dependencies.PSObject.Properties.Name }
    if ($Pkg.devDependencies)  { $deps += $Pkg.devDependencies.PSObject.Properties.Name }
  }
  if ($deps -contains 'astro') { return 'Astro' }
  if ($deps -contains 'vite')  { return 'Vite' }
  if ($deps -contains 'next')  { return 'Next.js' }
  return $null
}

function Ensure-Dependencies {
  param(
    [Parameter(Mandatory=$true)][string]$Framework,
    $Pkg
  )
  $toInstall = @()
  $hasDep = {
    param([string]$name)
    return ($Pkg.dependencies -and $Pkg.dependencies.PSObject.Properties.Name -contains $name) -or 
           ($Pkg.devDependencies -and $Pkg.devDependencies.PSObject.Properties.Name -contains $name)
  }

  switch ($Framework) {
    'Astro'  { if (-not (& $hasDep 'astro'))     { $toInstall += 'astro' } }
    'Vite'   { if (-not (& $hasDep 'vite'))      { $toInstall += 'vite' } }
    'Next.js'{
      if (-not (& $hasDep 'next'))      { $toInstall += 'next' }
      if (-not (& $hasDep 'react'))     { $toInstall += 'react' }
      if (-not (& $hasDep 'react-dom')) { $toInstall += 'react-dom' }
    }
  }

  $lockBefore = if (Test-Path -LiteralPath 'package-lock.json') { (Get-Item 'package-lock.json').LastWriteTimeUtc } else { $null }
  $lockChanged = $false

  if ($toInstall.Count -gt 0) {
    Write-Info ("Installing missing dependencies for $Framework: " + ($toInstall -join ', '))
    $res = Run-Cmd -Exe 'npm' -Args @('i') + $toInstall
    if ($res.ExitCode -ne 0) {
      Write-Err "Failed to install dependencies. See output above."
      exit 1
    }
    if (Test-Path -LiteralPath 'package-lock.json') {
      $lockAfter = (Get-Item 'package-lock.json').LastWriteTimeUtc
      $lockChanged = ($lockBefore -ne $lockAfter)
    }
  }

  return $lockChanged
}

function Ensure-Scripts {
  param(
    [Parameter(Mandatory=$true)][string]$Framework,
    $Pkg
  )
  if (-not $Pkg.scripts) { $Pkg | Add-Member -Name scripts -MemberType NoteProperty -Value (@{}) }

  $expected = @{}
  switch ($Framework) {
    'Astro' {
      $expected.dev = 'astro dev'
      $expected.build = 'astro build'
      $expected.preview = 'astro preview'
    }
    'Vite' {
      $expected.dev = 'vite'
      $expected.build = 'vite build'
      $expected.preview = 'vite preview'
    }
    'Next.js' {
      $expected.dev = 'next dev'
      $expected.build = 'next build'
      $expected.start = 'next start'
    }
  }

  $hadDev = $false
  $changed = $false
  $overwriteDev = $false
  if ($Pkg.scripts.dev) { $hadDev = $true }

  if ($Pkg.scripts.dev -and ($Pkg.scripts.dev -ne $expected.dev)) {
    if (Confirm-Overwrite -Message "A conflicting dev script exists (`"$($Pkg.scripts.dev)`"). Overwrite with `"$($expected.dev)`"?") {
      $overwriteDev = $true
    } else {
      Write-Warn "Keeping existing dev script: $($Pkg.scripts.dev)"
    }
  }

  if (-not $Pkg.scripts.dev -or $overwriteDev) {
    $Pkg.scripts.dev = $expected.dev
    $changed = $true
    Write-Info "Set scripts.dev = '$($expected.dev)'"
  }

  foreach ($k in @('build','preview','start')) {
    if ($expected.ContainsKey($k)) {
      if (-not $Pkg.scripts.PSObject.Properties.Name -contains $k) {
        $Pkg.scripts | Add-Member -Name $k -MemberType NoteProperty -Value $expected[$k]
        $changed = $true
        Write-Info "Set scripts.$k = '$($expected[$k])'"
      }
    }
  }

  return [PSCustomObject]@{ Changed = $changed; HadDev=$hadDev }
}

function Ensure-NodeModules {
  if (-not (Test-Path -LiteralPath 'node_modules')) { return $true }
  return $false
}

function Maybe-Install {
  param(
    [bool]$NodeModulesMissing,
    [bool]$LockChanged
  )
  if ($NodeModulesMissing) {
    if (Test-Path -LiteralPath 'package-lock.json') {
      Write-Info "node_modules missing and lockfile present. Running 'npm ci'..."
      $res = Run-Cmd -Exe 'npm' -Args @('ci')
      if ($res.ExitCode -ne 0) {
        Write-Warn "npm ci failed. Falling back to 'npm install'..."
        $res2 = Run-Cmd -Exe 'npm' -Args @('install')
        if ($res2.ExitCode -ne 0) {
          Write-Err "Dependency installation failed."
          exit 1
        }
      }
    } else {
      Write-Info "node_modules missing. Running 'npm install'..."
      $res3 = Run-Cmd -Exe 'npm' -Args @('install')
      if ($res3.ExitCode -ne 0) {
        Write-Err "Dependency installation failed."
        exit 1
      }
    }
  } elseif ($LockChanged) {
    Write-Info "Lockfile changed; ensuring dependencies are installed (npm install)..."
    $res4 = Run-Cmd -Exe 'npm' -Args @('install')
    if ($res4.ExitCode -ne 0) {
      Write-Err "Dependency installation failed."
      exit 1
    }
  }
}

function Offer-ChangeDir-IfUnambiguousSubfolder {
  # Nice-to-have: if exactly one direct child folder has a package.json, offer to cd into it
  $subs = Get-ChildItem -Directory -ErrorAction SilentlyContinue | Where-Object { Test-Path -LiteralPath (Join-Path $_.FullName 'package.json') }
  if ($subs.Count -eq 1) {
    $target = $subs[0].FullName
    if (Confirm-YesNo -Message "Found a subfolder with package.json: '$target'. cd into it now?" -DefaultYes:$true) {
      Set-Location -LiteralPath $target
      Write-Info "Changed directory to: $target"
      return $true
    }
  }
  return $false
}

function Ensure-PackageJson {
  while (-not (Test-Path -LiteralPath 'package.json')) {
    Write-Warn "No package.json found in: $(Get-Location)"
    Write-Host "Tip: Use 'Get-ChildItem -Recurse -Filter package.json' to find the right folder." -ForegroundColor Yellow

    # Nice-to-have: auto-offer cd into the only subfolder that has a package.json
    if (Offer-ChangeDir-IfUnambiguousSubfolder) {
      continue
    }

    Write-Host "If this is an existing project (e.g., cloned), you may be in the wrong folder." -ForegroundColor Yellow
    if (Confirm-YesNo -Message "Is this a NEW project and you want to create package.json here with 'npm init -y'?" -DefaultYes:$true) {
      Write-Info "Creating package.json via 'npm init -y'..."
      $res = Run-Cmd -Exe 'npm' -Args @('init','-y')
      if ($res.ExitCode -ne 0) { Write-Err "npm init failed"; exit 1 }
    } else {
      Write-Err "No package.json. Move into the correct subfolder and re-run."
      exit 1
    }
  }
}

# --- Main ---

Write-Info "Starting dev fixer in: $(Get-Location)"

Ensure-PackageJson

$pkg = Load-PackageJson
if (-not $pkg) { Write-Err "Unexpected: package.json still missing."; exit 1 }

$framework = Detect-Framework -Pkg $pkg
if (-not $framework) {
  Write-Warn "No framework detected."
  if ($env:CI) {
    Write-Err "Framework unknown in CI. Exiting."
    exit 1
  }
  while ($true) {
    $choice = Read-Host "No framework detected. Press 'A' to scaffold Astro, or 'C' to cancel"
    switch ($choice.ToLowerInvariant()) {
      'a' {
        Write-Info "Scaffolding Astro via 'npx astro init --yes'..."
        $res = Run-Cmd -Exe 'npx' -Args @('astro','init','--yes')
        if ($res.ExitCode -ne 0) {
          Write-Err "Astro scaffolding failed."
          exit 1
        }
        # Ensure minimal starter exists by checking astro config presence
        if (-not (Get-ChildItem -Name 'astro.config.*' -ErrorAction SilentlyContinue)) {
          Write-Warn "Astro config not found after init; proceeding but you may need to complete setup."
        }
        $framework = 'Astro'
        break
      }
      'c' { Write-Err "Canceled by user."; exit 1 }
      default { Write-Warn "Please press 'A' or 'C'." }
    }
    if ($framework) { break }
  }
}

Write-Info "Detected framework: $framework"

# Ensure dependencies for the framework
$lockChangedFromDeps = Ensure-Dependencies -Framework $framework -Pkg $pkg

# Refresh pkg (dependencies may have been added by npm i, but keep local copy consistent)
$pkg = Load-PackageJson

# Ensure scripts
$scriptResult = Ensure-Scripts -Framework $framework -Pkg $pkg
if ($scriptResult.Changed) {
  Save-PackageJson -Pkg $pkg
}

# Bonus: if Astro and dev script was missing, suggest one-liner
if ($framework -eq 'Astro' -and -not $scriptResult.HadDev) {
  Write-Host "You can also fix Astro scripts with this one-liner:" -ForegroundColor Cyan
  Write-Host "npm pkg set scripts.dev=\"astro dev\" scripts.build=\"astro build\" scripts.preview=\"astro preview\" `" -ForegroundColor DarkCyan
  Write-Host "&& npm i astro `" -ForegroundColor DarkCyan
  Write-Host "&& npm run dev" -ForegroundColor DarkCyan
}

# Install dependencies if needed
$needInstall = Ensure-NodeModules
Maybe-Install -NodeModulesMissing:$needInstall -LockChanged:$lockChangedFromDeps

# Start dev server
Write-Info "Starting dev server: npm run dev"
Write-Host "If it doesn't open automatically, try these URLs:" -ForegroundColor Cyan
Write-Host " - Astro:  http://localhost:4321" -ForegroundColor DarkCyan
Write-Host " - Vite:   http://localhost:5173" -ForegroundColor DarkCyan
Write-Host " - Next.js: http://localhost:3000" -ForegroundColor DarkCyan

# Run attached to console so user sees output; capture to analyze on failure
Write-Host "> npm run dev" -ForegroundColor Cyan
$devProc = Start-Process -FilePath 'npm' -ArgumentList @('run','dev') -NoNewWindow -PassThru -RedirectStandardOutput dev.out.txt -RedirectStandardError dev.err.txt
$devProc.WaitForExit()
$exit = $devProc.ExitCode
if ($exit -eq 0) {
  Write-Info "All set! Your dev server should be running. If the browser didn’t open automatically, visit: http://localhost:4321 (Astro), http://localhost:5173 (Vite), or http://localhost:3000 (Next.js)."
  # Stream what was captured for reference, then continue (process ended successfully)
  if (Test-Path dev.out.txt) { Get-Content dev.out.txt }
  if (Test-Path dev.err.txt) { Get-Content dev.err.txt }
  exit 0
} else {
  Write-Err "npm run dev failed with exit code $exit"
  # Try to parse npm error log path from stderr/stdout captures
  $combined = ''
  if (Test-Path dev.out.txt) { $combined += (Get-Content dev.out.txt -Raw) }
  if (Test-Path dev.err.txt) { $combined += (Get-Content dev.err.txt -Raw) }
  $logPath = $null
  if ($combined) {
    # Look for typical npm log path lines
    $regex = "A complete log of this run can be found in:\s*(.+)"
    $m = [regex]::Match($combined, $regex)
    if ($m.Success) { $logPath = $m.Groups[1].Value.Trim() }
  }
  if ($logPath) {
    Tail-File -Path $logPath -Lines 30
  } else {
    Write-Warn "Could not find npm log path. Showing last output:" 
    if (Test-Path dev.err.txt) { Get-Content dev.err.txt -Tail 30 }
    if (Test-Path dev.out.txt) { Get-Content dev.out.txt -Tail 30 }
  }
  exit 1
}

