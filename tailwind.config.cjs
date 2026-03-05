/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./pricing.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'w-full', 'py-20', 'lg:py-40', 'container', 'mx-auto', 'flex', 'text-center',
    'justify-center', 'items-center', 'gap-4', 'flex-col', 'gap-2', 'text-3xl',
    'md:text-5xl', 'tracking-tighter', 'max-w-xl', 'font-regular', 'text-lg',
    'leading-relaxed', 'tracking-tight', 'text-muted-foreground', 'grid', 'pt-20',
    'text-left', 'grid-cols-1', 'lg:grid-cols-4', 'gap-8', 'rounded-md', 'flex-row',
    'font-normal', 'gap-8', 'justify-start', 'items-center', 'gap-2', 'text-xl',
    'text-4xl', 'text-sm', 'w-4', 'h-4', 'mt-2', 'text-primary', 'shadow-2xl',
    'border-2', 'border-primary', 'justify-between', 'items-start', 'rounded-lg',
    'border', 'bg-card', 'text-card-foreground', 'shadow-sm', 'space-y-1.5', 'p-6',
    'text-2xl', 'font-semibold', 'leading-none', 'tracking-tight', 'pt-0',
    'inline-flex', 'whitespace-nowrap', 'ring-offset-background', 'transition-colors',
    'focus-visible:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-ring',
    'focus-visible:ring-offset-2', 'disabled:pointer-events-none', 'disabled:opacity-50',
    'bg-primary', 'text-primary-foreground', 'hover:bg-primary/90', 'h-10', 'px-4', 'py-2',
    'border-input', 'bg-background', 'hover:bg-accent', 'hover:text-accent-foreground',
    'rounded-full', 'px-2.5', 'py-0.5', 'text-xs', 'font-semibold', 'border-transparent',
    'hover:bg-primary/80', 'h-11', 'px-8',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
