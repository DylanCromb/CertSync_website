// ===== Data =====
const DATA = {
  individual: [
    {
      id: 'free', name: 'Free',
      monthly: 0, annual: 0,
      includes: ['2 credentials', '1 permit'],
      badge: 'Starter',
      cta: { label: 'Get started', href: './login.html' }
    },
    {
      id: 'ind-1', name: 'Tier 1',
      monthly: 4.40, annual: null,
      includes: ['5 credentials', '5 permits'],
      cta: { label: 'Choose Tier 1', href: './login.html' }
    },
    {
      id: 'ind-2', name: 'Tier 2',
      monthly: 8.00, annual: null,
      includes: ['10 credentials', '10 permits'],
      cta: { label: 'Choose Tier 2', href: './login.html' }
    },
    {
      id: 'ind-3', name: 'Tier 3',
      monthly: 12.50, annual: 134.00,
      includes: ['Unlimited credentials', 'Unlimited permits'],
      badge: 'Best value',
      cta: { label: 'Choose Tier 3', href: './login.html' }
    }
  ],
  enterprise: [
    { id:'ent-1', name:'Tier 1', monthly:35,  cap:8,   cta:{label:'Start Tier 1', href:'./contact.html'} },
    { id:'ent-2', name:'Tier 2', monthly:44,  cap:15,  cta:{label:'Start Tier 2', href:'./contact.html'} },
    { id:'ent-3', name:'Tier 3', monthly:62,  cap:25,  cta:{label:'Start Tier 3', href:'./contact.html'} },
    { id:'ent-4', name:'Tier 4', monthly:116, cap:50,  cta:{label:'Start Tier 4', href:'./contact.html'} },
    { id:'ent-5', name:'Tier 5', monthly:224, cap:100, cta:{label:'Start Tier 5', href:'./contact.html'} },
    { id:'ent-6', name:'Tier 6', monthly:422, cap:250, cta:{label:'Start Tier 6', href:'./contact.html'} },
    { id:'ent-7', name:'Tier 7', monthly:null, cap:500, custom:true,
      cta:{label:'Contact sales', href:'./contact.html'} }
  ]
};

// ===== Helpers =====
const fmt = (n) => (n === 0 ? '$0' : (n ? `$${n.toLocaleString('en-AU', {minimumFractionDigits: (n % 1 ? 2 : 0)})}` : '—'));
const el = (s, ctx = document) => ctx.querySelector(s);
const els = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

// ===== Render cards =====
function renderIndividual(billing='monthly'){
  const root = el('#individual-grid'); root.innerHTML = '';
  DATA.individual.forEach(p=>{
    const price = billing === 'annual' ? p.annual : p.monthly;
    const period = billing === 'annual' ? 'AUD / year' : 'AUD / month';
    const unavailable = (billing === 'annual' && p.annual == null);
    const card = document.createElement('article');
    card.className = 'price-card' + (p.badge === 'Best value' ? ' recommended' : '');

    card.innerHTML = `
      <div class="card-header">
        <div class="plan-name">${p.name}</div>
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
      </div>

      <div class="price-wrap">
        <div class="price">${fmt(price)}</div>
        <div class="period">${unavailable ? '—' : period}</div>
      </div>

      <ul class="features">
        ${p.includes.map(x => `<li>${x}</li>`).join('')}
      </ul>

      <a class="card-cta" href="${p.cta.href}" ${unavailable ? 'aria-disabled="true" tabindex="-1" style="opacity:.6;pointer-events:none;"' : ''}>
        ${unavailable ? 'Annual not available' : p.cta.label}
      </a>
    `;
    root.appendChild(card);
  });
}

function renderEnterprise(billing='monthly', employees=12){
  const root = el('#enterprise-grid'); root.innerHTML = '';

  // pick recommended tier for employees
  const rec = DATA.enterprise.find(p => employees <= p.cap) || DATA.enterprise.at(-1);

  DATA.enterprise.forEach(p=>{
    const isRec = p === rec;
    const price = billing === 'annual' ? null : p.monthly; // annual not defined for enterprise (can extend later)
    const period = billing === 'annual' ? 'AUD / year' : 'AUD / month';
    const badgeTxt = p.custom ? 'Custom' : (isRec ? 'Recommended' : null);

    const card = document.createElement('article');
    card.className = 'price-card' + (isRec ? ' recommended' : '');

    card.innerHTML = `
      <div class="card-header">
        <div class="plan-name">${p.name}</div>
        ${badgeTxt ? `<span class="badge">${badgeTxt}</span>` : ''}
      </div>

      <div class="price-wrap">
        <div class="price">${fmt(price)}</div>
        <div class="period">${p.custom ? 'Get a quote' : period}</div>
      </div>

      <ul class="features">
        <li>Employee limit: ${p.cap}${p.custom ? '+' : ''}</li>
      </ul>

      <a class="card-cta ${p.custom ? 'secondary' : ''}" href="${p.cta.href}">
        ${p.cta.label}
      </a>
    `;
    root.appendChild(card);
  });
}

// ===== Tabs & controls =====
function initPricing(){
  const billingBtns = els('.billing-btn');
  let billing = 'monthly';

  const tabButtons = {
    individual: el('#tab-individual-btn'),
    enterprise: el('#tab-enterprise-btn')
  };
  const tabs = {
    individual: el('#tab-individual'),
    enterprise: el('#tab-enterprise')
  };

  const empRange = el('#empRange');
  const empCount = el('#empCount');

  // Billing toggle
  billingBtns.forEach(b=>{
    b.addEventListener('click', ()=>{
      billingBtns.forEach(x => x.setAttribute('aria-pressed', String(x===b)));
      billing = b.dataset.billing;
      renderIndividual(billing);
      renderEnterprise(billing, parseInt(empRange.value,10));
    });
  });

  // Tabs
  Object.entries(tabButtons).forEach(([key, btn])=>{
    btn.addEventListener('click', ()=>{
      Object.entries(tabButtons).forEach(([k, b])=>{
        b.setAttribute('aria-selected', String(k===key));
        tabs[k].hidden = (k!==key);
      });
    });
  });

  // Employee slider
  empRange?.addEventListener('input', ()=>{
    empCount.textContent = (parseInt(empRange.value,10) >= 600) ? '500+' : empRange.value;
    renderEnterprise(billing, parseInt(empRange.value,10));
  });

  // First render
  empCount.textContent = empRange ? empRange.value : '';
  renderIndividual(billing);
  renderEnterprise(billing, empRange ? parseInt(empRange.value,10) : 12);
}

document.addEventListener('DOMContentLoaded', initPricing);
