const { company, navLinks, services, stats, testimonials, portfolioCategories, portfolioItems, blogPosts, team } = window.SITE_DATA;

const shell = document.getElementById('site-shell');
const page = document.body.dataset.page || 'home';
const logoSvg = `<svg width="248" height="90" viewBox="0 0 248 90" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="248" height="90" fill="white"/><path d="M8 37C12 31 18 29 25 30C31 31 35 35 39 41C33 42 28 41 23 38C19 35 15 34 8 37Z" fill="#148A43"/><path d="M0 33C5 29 11 28 16 29C22 31 27 35 31 41C25 42 20 41 15 39C10 37 6 34 0 33Z" fill="#148A43"/><rect x="58" y="8" width="28" height="26" fill="#148A43"/><rect x="91" y="8" width="28" height="26" fill="#44B649"/><rect x="124" y="8" width="28" height="26" fill="#9BC53D"/><rect x="157" y="8" width="28" height="26" fill="#F7B53C"/><rect x="190" y="8" width="28" height="26" fill="#F99B1D"/><text x="26" y="80" fill="#148A43" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="58" font-weight="900" letter-spacing="-3">SI</text><text x="85" y="80" fill="#6F7072" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="58" font-weight="900" letter-spacing="-3">BE</text><text x="164" y="80" fill="#F99B1D" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="58" font-weight="900" letter-spacing="-3">VE</text></svg>`;
const logoDataUri = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(logoSvg)}`;

const iconSvg = {
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.79.65 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.45-1.22a2 2 0 0 1 2.11-.45c.84.31 1.73.53 2.63.65A2 2 0 0 1 22 16.92z"></path></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"></path><path d="m22 6-10 7L2 6"></path></svg>',
  mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-6-5.33-6-11a6 6 0 1 1 12 0c0 5.67-6 11-6 11Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"></path></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.5 2.94 5.96 6.58.96-4.76 4.64 1.12 6.56L12 17.53l-5.88 3.09 1.12-6.56L2.48 9.42l6.58-.96L12 2.5Z"></path></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.25-1.46 1.5-1.46H16.7V5a23 23 0 0 0-2.46-.13c-2.43 0-4.1 1.48-4.1 4.2V11H7.4v3h2.74v8h3.36Z"></path></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm10.25 1.65a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2A2.8 2.8 0 1 0 12 14.8 2.8 2.8 0 0 0 12 9.2Z"></path></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 8.5H3.56V20h3.38V8.5Zm.22-3.56a1.95 1.95 0 1 0-3.9 0 1.95 1.95 0 0 0 3.9 0ZM20.44 13.02c0-3.13-1.67-4.58-3.9-4.58-1.8 0-2.6.98-3.05 1.67V8.5h-3.38V20h3.38v-6.42c0-.34.03-.68.13-.92.27-.68.88-1.39 1.92-1.39 1.36 0 1.9 1.04 1.9 2.56V20H21v-6.98h-.56Z"></path></svg>',
  twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.25l-4.9-6.4L6.45 22H3.34l7.24-8.27L.8 2h6.4l4.43 5.86L18.9 2Zm-1.1 18h1.72L6.28 3.9H4.43L17.8 20Z"></path></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M3 10h18"></path></svg>',
  briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6V4h6v2"></path><rect x="3" y="6" width="18" height="14" rx="2"></rect><path d="M3 12h18"></path></svg>',
  gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="8" width="18" height="13" rx="2"></rect><path d="M12 8v13"></path><path d="M19 8H5"></path><path d="M12 8s-3-1.5-3-4a2 2 0 0 1 4 0c0 2.5-1 4-1 4Zm0 0s3-1.5 3-4a2 2 0 0 0-4 0c0 2.5 1 4 1 4Z"></path></svg>',
  printer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V3h12v6"></path><rect x="6" y="14" width="12" height="7"></rect><path d="M6 18H4a2 2 0 0 1-2-2v-5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v5a2 2 0 0 1-2 2h-2"></path></svg>',
  shirt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 3 5 4-3 4-2-1v11H8V10l-2 1-3-4 5-4 2 2h4l2-2Z"></path></svg>',
  panel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v5H3z"></path><path d="M5 8v13"></path><path d="M19 8v13"></path><path d="M8 21h8"></path></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1.5"></circle></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"></circle><path d="m8.21 13.89-1.42 7.11L12 18l5.21 3-1.42-7.11"></path></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 21-1.45-1.32C5.4 15.02 2 11.96 2 8.2 2 5.14 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 16.5 3C19.58 3 22 5.14 22 8.2c0 3.76-3.4 6.82-8.55 11.49Z"></path></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
  bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 0 0-4 12.75c.64.46 1 1.19 1 1.98V18h6v-1.27c0-.79.36-1.52 1-1.98A7 7 0 0 0 12 2Z"></path></svg>',
  zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"></path></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 16V4"></path><path d="m7 9 5-5 5 5"></path><path d="M20 16.5v2a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-2"></path></svg>',
  loader: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.22-8.56"></path></svg>'
};

function icon(name, className = 'icon') {
  return `<span class="${className}">${iconSvg[name] || ''}</span>`;
}

function revealClass(direction = 'up') {
  return `reveal reveal-${direction === 'none' ? 'scale' : direction}`;
}

function placeholder(text, gradient = 'gradient-primary', minHeight = 380, image = '') {
  return `<div class="placeholder ${gradient} ${image ? 'has-image' : ''}" style="min-height:${minHeight}px">
    ${image ? `<img class="placeholder-image" src="${image}" alt="${text}" loading="lazy" />` : ''}
    <div class="placeholder-content">
      <div class="placeholder-icon">${iconSvg.panel}</div>
      <div>${text}</div>
    </div>
  </div>`;
}

function sectionHead(badge, title, description = '', align = 'center') {
  return `<div class="section-head ${align === 'left' ? 'left' : ''} ${revealClass('up')}">
    <span class="badge">${badge}</span>
    <h2 class="heading-lg" style="margin-top:1rem;">${title}</h2>
    ${description ? `<p class="text-muted" style="margin-top:1rem;">${description}</p>` : ''}
  </div>`;
}

function headerMarkup() {
  return `
    <div class="site-topbar">
      <div class="container">
        <div class="topbar-links">
          <a href="tel:${company.phone[0].replace(/\s/g, '')}">${icon('phone')}${company.phone[0]}</a>
          <a href="mailto:${company.email[0]}">${icon('mail')}${company.email[0]}</a>
        </div>
        <div>${company.address}</div>
      </div>
    </div>
    <header class="site-nav" id="siteNav">
      <div class="container">
        <a href="index.html" class="brand"><img src="${logoDataUri}" alt="Sibeve logo" /></a>
        <nav class="nav-links">
          ${navLinks.map(link => `<a href="${link.href}" data-key="${link.key}" ${page === link.key ? 'class="active"' : ''}>${link.label}</a>`).join('')}
        </nav>
        <div class="nav-cta inline-actions">
          <a href="quote.html" class="btn">Get a Quote ${icon('arrowRight')}</a>
        </div>
        <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle menu">${icon('menu')}</button>
      </div>
      <div class="mobile-menu" id="mobileMenu">
        <div class="container">
          ${navLinks.map(link => `<a href="${link.href}" ${page === link.key ? 'class="active"' : ''}>${link.label}</a>`).join('')}
          <a href="quote.html" class="btn">Get a Quote ${icon('arrowRight')}</a>
        </div>
      </div>
    </header>`;
}

function footerMarkup() {
  return `
    <footer>
      <div class="footer-cta">
        <div class="container">
          <div>
            <h3 class="heading-md" style="color:white;">Ready to Elevate Your Brand?</h3>
            <p class="text-light" style="max-width:42rem;margin-top:0.7rem;">Let's create something amazing together. Get in touch for a free consultation and quote.</p>
          </div>
          <div class="inline-actions">
            <a href="quote.html" class="btn">Get a Quote ${icon('arrowRight')}</a>
            <a href="contact.html" class="btn-outline" style="border-color:rgba(255,255,255,0.25);color:white;">Contact Us</a>
          </div>
        </div>
      </div>
      <div class="footer-main">
        <div class="container">
          <div class="footer-grid">
            <div>
              <a href="index.html" class="brand" style="min-width:245px;"><img src="${logoDataUri}" alt="Sibeve logo" style="width:245px;"></a>
              <p class="text-light" style="font-size:0.92rem;margin-top:1rem;">${company.description}</p>
              <div class="footer-social" style="margin-top:1.5rem;">
                <a href="${company.social.facebook}" target="_blank" rel="noreferrer">${icon('facebook')}</a>
                <a href="${company.social.instagram}" target="_blank" rel="noreferrer">${icon('instagram')}</a>
                <a href="${company.social.linkedin}" target="_blank" rel="noreferrer">${icon('linkedin')}</a>
                <a href="${company.social.twitter}" target="_blank" rel="noreferrer">${icon('twitter')}</a>
              </div>
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul class="clean-list" style="margin-top:1rem;">
                ${navLinks.map(link => `<li><a class="text-light" href="${link.href}">${link.label}</a></li>`).join('')}
                <li><a href="quote.html" style="color:var(--primary-300);font-weight:700;">Request a Quote</a></li>
              </ul>
            </div>
            <div>
              <h4>Services</h4>
              <ul class="clean-list" style="margin-top:1rem;">
                ${services.map(service => `<li><a class="text-light" href="services.html#${service.id}">${service.title}</a></li>`).join('')}
              </ul>
            </div>
            <div>
              <h4>Contact Us</h4>
              <ul class="clean-list" style="margin-top:1rem;">
                <li>${icon('mapPin', 'check')}<span class="text-light">${company.address}</span></li>
                <li>${icon('phone', 'check')}<a class="text-light" href="tel:${company.phone[0].replace(/\s/g, '')}">${company.phone[0]}</a></li>
                <li>${icon('mail', 'check')}<a class="text-light" href="mailto:${company.email[0]}">${company.email[0]}</a></li>
              </ul>
              <div style="margin-top:1.5rem;">
                <h4>Newsletter</h4>
                <p class="newsletter-success" id="newsletterSuccess">Thanks for subscribing!</p>
                <form class="newsletter-form" id="newsletterForm" style="margin-top:0.75rem;">
                  <input type="email" id="newsletterEmail" placeholder="Your email" required style="background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.1);color:white;" />
                  <button class="btn" type="submit">${icon('arrowRight')}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          <p>© ${new Date().getFullYear()} Sibeve Group. All rights reserved.</p>
          <div class="footer-bottom-links">
            <a href="terms-and-conditions.html">Terms & Conditions</a>
            <a href="privacy-policy.html">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
    <a class="quote-fab" id="quoteFab" href="quote.html">${icon('arrowRight')} Request Quote</a>
    <a class="whatsapp-fab" href="https://wa.me/${company.whatsapp}" target="_blank" rel="noreferrer">WhatsApp</a>`;
}

function heroCommon(badge, title, description, visual = '') {
  return `<section class="hero">
    <div class="container hero-inner">
      <div class="${visual ? 'hero-grid' : ''}">
        <div class="${revealClass('up')}">
          <span class="badge">${badge}</span>
          <h1 class="heading-xl" style="margin-top:1.5rem;">${title}</h1>
          <p class="lead" style="margin-top:1.5rem;">${description}</p>
        </div>
        ${visual}
      </div>
    </div>
  </section>`;
}

function counterBlock(list) {
  return list.map(stat => `<div class="reveal reveal-up"><div class="heading-md" style="color:white;"><span class="counter" data-target="${stat.value}" data-suffix="${stat.suffix}">0${stat.suffix}</span></div><div style="margin-top:0.4rem;color:rgba(255,255,255,0.75);font-size:0.85rem;">${stat.label}</div></div>`).join('');
}

function homePage() {
  return `
    ${heroCommon(`${icon('zap')} Eswatini's Premier Branding Partner`, `Design. Print. <span class="gradient-text">Promote.</span>`, company.description, `<div class="hero-visual reveal reveal-right">
      <div class="placeholder-card">
        ${placeholder('Branded Apparel Showcase', 'gradient-primary', 500, 'assets/images/Branded%20Apperel.jpg')}
        <div class="floating-card top-left"><strong>500+ Projects</strong><div style="font-size:0.8rem;color:var(--dark-400);">Successfully delivered</div></div>
        <div class="floating-card bottom-right secondary"><strong>5-Star Rated</strong><div style="font-size:0.8rem;color:var(--dark-400);">Client satisfaction</div></div>
      </div>
    </div>`)}
    <section class="section section-dark" style="padding-top:0; margin-top:-3rem; background:transparent; color:white;">
      <div class="container"><div class="stats-inline">${counterBlock(stats.slice(0,3))}</div></div>
    </section>
    <section class="section">
      <div class="container">
        ${sectionHead('What We Do', 'Our Services', 'From corporate branding to custom apparel, we offer a complete range of promotional and branding solutions to elevate your business.')}
        <div class="card-grid three" style="margin-top:3rem;">
          ${services.map(service => `<a href="services.html#${service.id}" class="card card-hover ${revealClass('up')}"><div class="icon-box">${icon(service.icon)}</div><h3 style="margin-top:1.25rem;">${service.title}</h3><p class="text-muted" style="margin-top:0.75rem;">${service.shortDesc}</p><div style="margin-top:1.25rem;color:var(--primary-600);font-weight:700;display:flex;gap:0.5rem;align-items:center;">Learn More ${icon('arrowRight')}</div></a>`).join('')}
        </div>
      </div>
    </section>
    <section class="section section-muted">
      <div class="container two-col">
        <div class="reveal reveal-left">${placeholder('Team at Work', 'gradient-mixed', 450, 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80')}</div>
        <div class="reveal reveal-right">
          ${sectionHead('Why Choose Us', 'Your Trusted Branding Partner in Eswatini', 'We combine creativity, quality, and reliability to deliver branding solutions that truly make a difference.', 'left')}
          <div class="card-grid two" style="margin-top:2rem;">
            ${[
              ['zap','Fast Turnaround','Quick delivery without compromising on quality.'],
              ['shield','Premium Quality','Top-grade materials and state-of-the-art printing.'],
              ['clock','On-Time Delivery','We respect deadlines and deliver as promised.'],
              ['users','Dedicated Support','Personal project manager for every client.']
            ].map(item => `<div class="reveal reveal-up"><div style="display:flex;gap:1rem;"><div class="icon-box" style="width:2.8rem;height:2.8rem;">${icon(item[0])}</div><div><h4 style="margin:0;">${item[1]}</h4><p class="text-muted" style="margin-top:0.35rem;">${item[2]}</p></div></div></div>`).join('')}
          </div>
        </div>
      </div>
    </section>
    <section class="section stats-band">
      <div class="container"><div class="stats-grid">${counterBlock(stats)}</div></div>
    </section>
    <section class="section">
      <div class="container">
        ${sectionHead('Our Work', 'Recent Projects', 'A glimpse of our latest branding and promotional projects.')}
        <div class="portfolio-grid" style="margin-top:3rem;">
          ${portfolioItems.slice(0,6).map(item => galleryCard(item, true)).join('')}
        </div>
        <div style="text-align:center;margin-top:2.5rem;"><a href="portfolio.html" class="btn-outline">View All Projects ${icon('arrowRight')}</a></div>
      </div>
    </section>
    <section class="section section-muted">
      <div class="container">
        ${sectionHead('Testimonials', 'What Our Clients Say', 'Hear from businesses that trust us with their brand.')}
        <div class="testimonial-slider" id="testimonialSlider">
          <div class="testimonial-track" id="testimonialTrack">
            ${testimonials.map(t => `<div class="testimonial-slide"><div class="panel card-hover ${revealClass('up')}"><div style="display:flex;gap:0.25rem;color:var(--accent-400);">${Array.from({length:t.rating}).map(() => icon('star')).join('')}</div><p class="text-muted" style="margin-top:1rem;font-style:italic;">“${t.content}”</p><div style="display:flex;gap:1rem;align-items:center;border-top:1px solid var(--dark-100);margin-top:1.5rem;padding-top:1.5rem;"><div class="icon-box" style="border-radius:999px;background:var(--primary-100);font-weight:700;">${t.name.charAt(0)}</div><div><div style="font-weight:700;">${t.name}</div><div style="color:var(--dark-400);font-size:0.9rem;">${t.role}</div></div></div></div></div>`).join('')}
          </div>
          <div class="testimonial-nav">
            <button type="button" id="testimonialPrev" aria-label="Previous testimonial"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"></path></svg></button>
            <div class="testimonial-dots" id="testimonialDots">
              ${testimonials.map((_, i) => `<span data-index="${i}" class="${i === 0 ? 'active' : ''}"></span>`).join('')}
            </div>
            <button type="button" id="testimonialNext" aria-label="Next testimonial"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"></path></svg></button>
          </div>
        </div>
      </div>
    </section>
    ${ctaSection('Ready to Make Your Brand <span class="gradient-text">Stand Out?</span>', 'From concept to creation, we are here to bring your vision to life.', '<a href="quote.html" class="btn">Get a Free Quote '+icon('arrowRight')+'</a><a href="services.html" class="btn-white">Explore Services</a>')}
  `;
}

function aboutPage() {
  return `
    ${heroCommon('About Us', `Crafting Brands That <span class="gradient-text">Inspire</span>`, 'We are Eswatini\'s premier promotional and branding solutions company, dedicated to helping businesses create powerful visual identities that resonate with their audiences.')}
    <section class="section"><div class="container two-col"><div class="reveal reveal-left">${placeholder('Our Workshop', 'gradient-mixed', 450, 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80')}</div><div class="reveal reveal-right">${sectionHead('Our Story','From Passion to Profession','', 'left')}<div class="text-muted" style="margin-top:1.2rem;"><p>Founded with a passion for creativity and a commitment to quality, Sibeve Group has grown from a small sublimation printing shop in Mbabane to Eswatini's most trusted promotional and branding solutions provider.</p><p>Over the years, we have partnered with hundreds of businesses — from local startups to national corporations — helping them build memorable brand identities through high-quality printed materials, custom apparel, promotional products, and large-format displays.</p><p>Our SEDCO Estate workshop is equipped with the latest sublimation and digital printing technology, allowing us to deliver vibrant, durable results that exceed expectations every time.</p></div></div></div></section>
    <section class="section section-muted"><div class="container card-grid two"><div class="panel ${revealClass('up')}"><div class="icon-box">${icon('target')}</div><h3 style="margin-top:1.25rem;">Our Mission</h3><p class="text-muted" style="margin-top:0.8rem;">To empower businesses in Eswatini and beyond with innovative, high-quality branding and promotional solutions that drive visibility, build trust, and create lasting impressions.</p></div><div class="panel ${revealClass('up')}"><div class="icon-box accent">${icon('eye')}</div><h3 style="margin-top:1.25rem;">Our Vision</h3><p class="text-muted" style="margin-top:0.8rem;">To be the leading creative branding agency in Southern Africa, recognized for exceptional quality, innovation, and client satisfaction.</p></div></div></section>
    <section class="section"><div class="container">${sectionHead('Our Values','What Drives Us','Our core values shape everything we do, from the way we create to how we serve our clients.')}<div class="values-grid" style="margin-top:3rem;">${[['award','Excellence','We never settle for mediocre. Every project gets our best.'],['heart','Passion','We love what we do, and it shows in every design.'],['bulb','Innovation','We stay ahead with the latest trends and technology.'],['users','Partnership','Your success is our success. We grow together.']].map(v => `<div class="${revealClass('up')}" style="text-align:center;"><div class="icon-box" style="margin:0 auto;">${icon(v[0])}</div><h4 style="margin-top:1rem;">${v[1]}</h4><p class="text-muted" style="margin-top:0.5rem;">${v[2]}</p></div>`).join('')}</div></div></section>
    <section class="section stats-band"><div class="container"><div class="stats-grid">${counterBlock(stats)}</div></div></section>
    <section class="section"><div class="container">${sectionHead('Our Team','Meet the People Behind the Brand','A talented team of creatives, designers, and branding experts dedicated to your success.')}<div class="team-grid" style="margin-top:3rem;">${team.map(member => `<div class="${revealClass('up')}" style="text-align:center;"><div style="width:8rem;height:8rem;border-radius:999px;margin:0 auto;overflow:hidden;box-shadow:var(--shadow-sm);"><img src="${member.image}" alt="${member.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;" /></div><h4 style="margin-top:1rem;">${member.name}</h4><p class="text-muted">${member.role}</p></div>`).join('')}</div></div></section>
    ${ctaSection('Let\'s Build Something <span class="gradient-text">Amazing Together</span>', 'Ready to take your brand to the next level? We would love to hear from you.', '<a href="quote.html" class="btn">Get a Quote '+icon('arrowRight')+'</a><a href="contact.html" class="btn-white">Contact Us</a>')}
  `;
}

function servicesPage() {
  return `
    ${heroCommon('Our Services', `Complete Branding <span class="gradient-text">Solutions</span>`, 'From initial concept to final delivery, we offer end-to-end promotional and branding services that help your business make a lasting impression.')}
    <section class="section"><div class="container">${services.map((service, i) => `<div id="${service.id}" style="margin-bottom:5rem;scroll-margin-top:6rem;"><div class="service-row"><div class="${revealClass(i % 2 ? 'right' : 'left')}" ${i % 2 ? 'style="order:2;"' : ''}><div class="icon-box">${icon(service.icon)}</div><h2 class="heading-md" style="margin-top:1.25rem;">${service.title}</h2><p class="text-muted" style="margin-top:1rem;">${service.description}</p><ul class="feature-list" style="margin-top:1.2rem;">${service.features.map(feature => `<li>${icon('check', 'check')}${feature}</li>`).join('')}</ul><a href="quote.html" class="btn" style="margin-top:1.5rem;">Request Quote ${icon('arrowRight')}</a></div><div class="${revealClass(i % 2 ? 'left' : 'right')}" ${i % 2 ? 'style="order:1;"' : ''}>${placeholder(service.title, service.gradient, 380, service.image)}</div></div></div>`).join('')}</div></section>
    <section class="section section-muted"><div class="container">${sectionHead('Our Process','How We Work','A simple, transparent process that ensures quality results every time.')}<div class="process-grid" style="margin-top:3rem;">${[['01','Consultation','We discuss your goals, brand, and project requirements.'],['02','Design','Our creative team develops concepts and visual mockups.'],['03','Production','Using premium materials and cutting-edge printing technology.'],['04','Delivery','Quality-checked and delivered on time, every time.']].map(step => `<div class="process-card ${revealClass('up')}" style="text-align:center;"><div style="font-size:3rem;font-weight:800;color:var(--primary-100);">${step[0]}</div><h4 style="margin-top:0.75rem;">${step[1]}</h4><p class="text-muted" style="margin-top:0.5rem;">${step[2]}</p></div>`).join('')}</div></div></section>
    ${ctaSection('Have a Project in Mind?', 'Tell us about your branding needs and get a free, no-obligation quote today.', '<a href="quote.html" class="btn">Get a Free Quote '+icon('arrowRight')+'</a>')}
  `;
}

function galleryCard(item, preview = false) {
  return `<button class="gallery-card card-hover ${revealClass('up')}" type="button" data-portfolio-id="${item.id}"><div class="gallery-media">${placeholder(item.title, item.gradient, preview ? 280 : 300, item.image)}<div class="gallery-overlay"><div><div style="font-size:0.75rem;font-weight:700;color:var(--primary-300);text-transform:uppercase;letter-spacing:0.06em;">${item.category}</div><h3 style="margin:0.35rem 0 0.2rem;">${item.title}</h3>${preview ? '' : `<p style="margin:0;color:rgba(255,255,255,0.8);font-size:0.9rem;">${item.description}</p>`}</div></div></div></button>`;
}

function portfolioPage() {
  return `
    ${heroCommon('Our Work', `Portfolio & <span class="gradient-text">Gallery</span>`, 'Explore our collection of branding projects, promotional products, and creative designs that have helped businesses across Eswatini stand out.')}
    <section class="section"><div class="container"><div class="gallery-filter">${portfolioCategories.map((cat, index) => `<button class="filter-btn ${index === 0 ? 'active' : ''}" type="button" data-filter="${cat}">${cat}</button>`).join('')}</div><div class="portfolio-grid" id="portfolioGrid">${portfolioItems.map(item => galleryCard(item)).join('')}</div><div id="portfolioEmpty" class="hidden" style="padding:3rem 0;text-align:center;color:var(--dark-400);">No projects found in this category.</div></div></section>
    ${lightboxMarkup()}
  `;
}

function blogPage() {
  return `
    ${heroCommon('Blog & Insights', `Branding <span class="gradient-text">Insights</span>`, 'Tips, trends, and expert advice to help you make the most of your branding and promotional strategy.')}
    <section class="section"><div class="container"><div class="blog-grid">${blogPosts.map(post => `<article class="post-card card-hover ${revealClass('up')}"><div class="post-media">${placeholder(post.title, post.gradient, 260, post.image)}<div style="position:absolute;top:1rem;left:1rem;"><span class="badge" style="background:rgba(255,255,255,0.92);color:var(--primary-600);border:none;">${post.category}</span></div></div><div style="padding:1.5rem;"><div class="post-meta"><span>${icon('calendar')} ${new Date(post.date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span><span>${icon('clock')} ${post.readTime}</span></div><h3 style="margin-top:0.9rem;">${post.title}</h3><p class="text-muted" style="margin-top:0.6rem;">${post.excerpt}</p><div style="margin-top:1rem;color:var(--primary-600);font-weight:700;display:flex;gap:0.5rem;align-items:center;">Read More ${icon('arrowRight')}</div></div></article>`).join('')}</div><div style="margin-top:3rem;" class="panel ${revealClass('up')}"><div style="text-align:center;"><h3 class="heading-sm">More Articles Coming Soon</h3><p class="text-muted" style="max-width:38rem;margin:1rem auto 0;">We are working on bringing you more branding tips, industry insights, and marketing advice. Stay tuned.</p><a href="contact.html" class="btn" style="margin-top:1.25rem;">Subscribe for Updates</a></div></div></div></section>
  `;
}

function rateServicePage() {
  return `
    ${heroCommon('Rate Our Service', `Share Your <span class="gradient-text">Experience</span>`, 'Your feedback helps us improve our service, quality, communication, and delivery. The rating form will connect to your Google Sheet form once the link is provided.')}
    <section class="section"><div class="container two-col"><div class="reveal reveal-left"><div class="panel"><div class="icon-box">${icon('star')}</div><h2 class="heading-md" style="margin-top:1rem;">We Value Your Feedback</h2><p class="text-muted" style="margin-top:1rem;">Please use this page to rate your experience with Sibeve Group. Once the Google Sheet form link is available, the button below can point directly to the live feedback form.</p><div class="inline-actions" style="margin-top:1.5rem;"><a href="#" class="btn">Google Form Link Coming Soon ${icon('arrowRight')}</a><a href="contact.html" class="btn-outline">Contact Us</a></div></div></div><div class="reveal reveal-right"><div class="card-grid two">${[['star','Service Quality'],['clock','Turnaround Time'],['users','Customer Support'],['award','Final Results']].map(item => `<div class="info-card"><div class="icon-box">${icon(item[0])}</div><h3 style="margin-top:1rem;">${item[1]}</h3><p class="text-muted" style="margin-top:0.5rem;">Tell us how we did and where we can improve.</p></div>`).join('')}</div></div></div></section>
  `;
}

function weeklyInspirationPage() {
  const posts = [
    ['Start where you are', 'Small consistent actions compound into powerful brand growth.'],
    ['Show up with purpose', 'Every flyer, shirt, banner, and post is a chance to tell your story.'],
    ['Quality creates trust', 'Your brand is remembered by the details people can see and feel.']
  ];
  return `
    ${heroCommon('Weekly Inspiration', `Ideas That <span class="gradient-text">Keep You Moving</span>`, 'A static home for weekly inspirational posts, brand motivation, and practical reminders for business growth.')}
    <section class="section"><div class="container">${sectionHead('Inspiration Board','This Week\'s Motivation','Fresh thoughts to encourage creativity, consistency, and brand confidence.')}<div class="card-grid three" style="margin-top:3rem;">${posts.map((post, index) => `<article class="panel ${revealClass('up')}"><span class="badge">Week ${index + 1}</span><h3 style="margin-top:1rem;">${post[0]}</h3><p class="text-muted" style="margin-top:0.75rem;">${post[1]}</p></article>`).join('')}</div></div></section>
    ${ctaSection('Need Creative Support?', 'Let us help you turn inspiration into branded materials that move your business forward.', '<a href="quote.html" class="btn">Request a Quote '+icon('arrowRight')+'</a>')}
  `;
}

function quoteFormMarkup() {
  return `<div><div class="form-success" id="quoteSuccess"><div style="color:#22c55e;font-size:3rem;">${icon('check')}</div><h3 class="heading-sm" style="margin-top:1rem;">Quote Request Submitted!</h3><p class="text-muted" style="max-width:32rem;margin:1rem auto 0;">Thank you for your interest. We will review your request and get back to you within 24 hours with a customized quote.</p><button class="btn" type="button" id="quoteReset" style="margin-top:1.5rem;">Submit Another Request</button></div><form id="quoteForm"><div class="form-shell"><h3 class="heading-sm">Your Details</h3><div class="form-grid" style="margin-top:1.5rem;"><div class="form-field"><label for="quote-name">Full Name *</label><input id="quote-name" name="name" type="text" placeholder="John Doe" /><div class="error-text" data-error="name"></div></div><div class="form-field"><label for="quote-email">Email Address *</label><input id="quote-email" name="email" type="email" placeholder="john@example.com" /><div class="error-text" data-error="email"></div></div><div class="form-field"><label for="quote-phone">Phone Number</label><input id="quote-phone" name="phone" type="tel" placeholder="+268 7654 9020" /></div><div class="form-field"><label for="quote-service">Service Needed *</label><select id="quote-service" name="service"><option value="">Select a service</option>${services.map(service => `<option value="${service.title}">${service.title}</option>`).join('')}<option value="Other">Other</option></select><div class="error-text" data-error="service"></div></div><div class="form-field full"><label for="quote-description">Describe Your Request *</label><textarea id="quote-description" name="description" placeholder="Tell us about your project, quantity needed, timeline, and any specific requirements..."></textarea><div class="error-text" data-error="description"></div></div><div class="form-field full"><label for="quote-file">Upload Logo/Design (optional)</label><label class="file-drop" for="quote-file"><div>${icon('upload')}</div><strong id="quoteFileLabel">Click to upload</strong><div class="text-muted" style="font-size:0.82rem;">PNG, JPG, PDF, AI, or SVG (max 10MB)</div></label><input id="quote-file" type="file" class="hidden" accept=".png,.jpg,.jpeg,.pdf,.ai,.svg" /></div></div></div><div class="form-error" id="quoteError">Something went wrong. Please try again or contact us directly.</div><button type="submit" class="btn" style="width:100%;margin-top:1rem;">${icon('arrowRight')} Submit Quote Request</button></form></div>`;
}

function quotePage() {
  return `
    ${heroCommon('Get Started', `Request a <span class="gradient-text">Free Quote</span>`, 'Tell us about your project and we will get back to you with a customized quote within 24 hours. No obligations, no hidden fees.')}
    <section class="section"><div class="container quote-grid"><div class="reveal reveal-left"><div style="position:sticky;top:8rem;"><h3 class="heading-sm">Why Request a Quote?</h3><ul class="feature-list" style="margin-top:1.5rem;">${['Custom pricing tailored to your needs','No hidden charges or surprises','Expert advice on the best solutions','Quick turnaround on all quotes','Flexible options for every budget'].map(item => `<li>${icon('check', 'check')}${item}</li>`).join('')}</ul><div class="info-card" style="margin-top:2rem;background:var(--dark-50);"><h4>Need it faster?</h4><p class="text-muted" style="margin-top:0.5rem;">Call or email us directly for urgent requests.</p><div class="clean-list" style="margin-top:1rem;display:grid;gap:0.7rem;"><a href="tel:${company.phone[0].replace(/\s/g, '')}">${icon('phone')} ${company.phone[0]}</a><a href="mailto:${company.email[0]}">${icon('mail')} ${company.email[0]}</a><div>${icon('clock')} Mon–Fri: 8:00 AM – 5:00 PM</div></div></div></div></div><div class="reveal reveal-right">${quoteFormMarkup()}</div></div></section>
  `;
}

function contactFormMarkup() {
  return `<div><div class="form-success" id="contactSuccess"><div style="color:#22c55e;font-size:3rem;">${icon('check')}</div><h3 class="heading-sm" style="margin-top:1rem;">Message Sent!</h3><p class="text-muted" style="max-width:32rem;margin:1rem auto 0;">Thank you for reaching out. We will get back to you as soon as possible.</p><button class="btn" type="button" id="contactReset" style="margin-top:1.5rem;">Send Another Message</button></div><form id="contactForm"><div class="form-shell"><h3 class="heading-sm">Send Us a Message</h3><div class="form-grid" style="margin-top:1.5rem;"><div class="form-field"><label for="contact-name">Full Name *</label><input id="contact-name" name="name" type="text" placeholder="John Doe" /><div class="error-text" data-error="name"></div></div><div class="form-field"><label for="contact-email">Email Address *</label><input id="contact-email" name="email" type="email" placeholder="john@example.com" /><div class="error-text" data-error="email"></div></div><div class="form-field"><label for="contact-phone">Phone Number</label><input id="contact-phone" name="phone" type="tel" placeholder="+268 7654 9020" /></div><div class="form-field"><label for="contact-subject">Subject</label><input id="contact-subject" name="subject" type="text" placeholder="Branding inquiry" /></div><div class="form-field full"><label for="contact-message">Message *</label><textarea id="contact-message" name="message" placeholder="Tell us how we can help..."></textarea><div class="error-text" data-error="message"></div></div></div></div><div class="form-error" id="contactError">Something went wrong. Please try again or contact us directly.</div><button type="submit" class="btn" style="width:100%;margin-top:1rem;">${icon('arrowRight')} Send Message</button></form></div>`;
}

function contactPage() {
  return `
    ${heroCommon('Get in Touch', `Contact <span class="gradient-text">Us</span>`, 'Have a question or want to discuss a project? We would love to hear from you. Reach out through any of the channels below or fill out the form.')}
    <section class="section"><div class="container contact-grid"><div class="reveal reveal-left"><div><h3 class="heading-sm">Contact Information</h3><p class="text-muted" style="margin-top:0.6rem;">Reach out to chat about your branding ideas or sublimation projects today.</p></div><div style="display:grid;gap:1.25rem;margin-top:2rem;">${[
      ['mapPin','Address',company.address],
      ['phone','Phone',company.phone.map(p => `<a href="tel:${p.replace(/\s/g, '')}">${p}</a>`).join('<br>')],
      ['mail','Email',company.email.map(e => `<a href="mailto:${e}">${e}</a>`).join('<br>')],
      ['clock','Business Hours','Mon – Thur: 8:00 AM – 5:00 PM<br>Fri: 8:00 AM – 4:00 PM<br><span style="color:var(--dark-400);">Sat & Sun: Closed</span>']
    ].map(item => `<div style="display:flex;gap:1rem;align-items:flex-start;"><div class="icon-box">${icon(item[0])}</div><div><h4 style="margin:0;">${item[1]}</h4><div class="text-muted" style="margin-top:0.35rem;">${item[2]}</div></div></div>`).join('')}<div><h4>Follow Us</h4><div class="footer-social" style="margin-top:0.75rem;"><a href="${company.social.facebook}" target="_blank">${icon('facebook')}</a><a href="${company.social.instagram}" target="_blank">${icon('instagram')}</a><a href="${company.social.linkedin}" target="_blank">${icon('linkedin')}</a><a href="${company.social.twitter}" target="_blank">${icon('twitter')}</a></div></div></div></div><div class="reveal reveal-right">${contactFormMarkup()}</div></div></section>
    <section><iframe class="map-frame" title="Sibeve Group Location" src="${company.mapUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>
  `;
}

function ctaSection(title, description, actions) {
  return `<section class="section cta-band"><div class="container" style="text-align:center;"><div class="${revealClass('up')}"><h2 class="heading-lg">${title}</h2><p class="text-light" style="max-width:40rem;margin:1.5rem auto 0;">${description}</p><div class="inline-actions" style="justify-content:center;margin-top:2rem;">${actions}</div></div></div></section>`;
}

function lightboxMarkup() {
  return `<div class="lightbox" id="lightbox"><div class="lightbox-panel"><button class="lightbox-close" id="lightboxClose">${icon('close')}</button><div id="lightboxMedia"></div><div style="text-align:center;margin-top:1rem;"><div id="lightboxCategory" style="font-size:0.75rem;font-weight:700;color:var(--primary-400);text-transform:uppercase;letter-spacing:0.06em;"></div><h3 id="lightboxTitle" style="color:white;margin-top:0.35rem;"></h3><p id="lightboxDescription" style="color:var(--dark-300);margin-top:0.35rem;"></p></div></div></div>`;
}

function renderPageContent() {
  switch (page) {
    case 'about': return aboutPage();
    case 'services': return servicesPage();
    case 'portfolio': return portfolioPage();
    case 'blog': return blogPage();
    case 'quote': return quotePage();
    case 'contact': return contactPage();
    case 'rate-service': return rateServicePage();
    case 'weekly-inspiration': return weeklyInspirationPage();
    default: return homePage();
  }
}

shell.innerHTML = `${headerMarkup()}<main>${renderPageContent()}</main>${footerMarkup()}`;

function initNav() {
  const nav = document.getElementById('siteNav');
  const toggle = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.innerHTML = menu.classList.contains('open') ? icon('close') : icon('menu');
    });
  }
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    document.getElementById('quoteFab')?.classList.toggle('show', window.scrollY > 400);
  });
}

function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 60, 320)}ms`;
    observer.observe(el);
  });
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target || 0);
      const suffix = el.dataset.suffix || '';
      const start = performance.now();
      const duration = 2000;
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${Math.floor(eased * target)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => observer.observe(counter));
}

//subscription form submit function

async function submitForm(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Something went wrong. Please try again.');
  }
  return data;
}

function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  const email = document.getElementById('newsletterEmail');
  const success = document.getElementById('newsletterSuccess');
  if (!form || !email || !success) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = email.value.trim();
    if (!value) return;
    const button = form.querySelector('button[type="submit"]');
    const originalHtml = button ? button.innerHTML : '';
    if (button) { button.disabled = true; button.textContent = 'Sending...'; }
    submitForm('/api/newsletter', { email: value })
      .then(() => {
        success.classList.add('show');
        email.value = '';
      })
      .catch((err) => {
        alert(err.message || 'Could not subscribe right now. Please try again later.');
      })
      .finally(() => {
        if (button) { button.disabled = false; button.innerHTML = originalHtml; }
      });
  });
}
//--------------------------------------------

function setError(form, name, message) {
  const error = form.querySelector(`[data-error="${name}"]`);
  if (error) error.textContent = message || '';
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function initQuoteForm() {
  const form = document.getElementById('quoteForm');
  if (!form) return;
  const success = document.getElementById('quoteSuccess');
  const reset = document.getElementById('quoteReset');
  const errorBox = document.getElementById('quoteError');
  const fileInput = document.getElementById('quote-file');
  const fileLabel = document.getElementById('quoteFileLabel');
  if (fileInput && fileLabel) {
    fileInput.addEventListener('change', () => {
      fileLabel.textContent = fileInput.files && fileInput.files[0] ? fileInput.files[0].name : 'Click to upload';
    });
  }

  // contact us form submit function

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorBox.classList.remove('show');
    ['name','email','service','description'].forEach(key => setError(form, key, ''));
    const data = Object.fromEntries(new FormData(form).entries());
    let valid = true;
    if (!String(data.name || '').trim()) { setError(form, 'name', 'Name is required'); valid = false; }
    if (!String(data.email || '').trim()) { setError(form, 'email', 'Email is required'); valid = false; }
    else if (!validateEmail(String(data.email))) { setError(form, 'email', 'Invalid email address'); valid = false; }
    if (!String(data.service || '').trim()) { setError(form, 'service', 'Please select a service'); valid = false; }
    if (!String(data.description || '').trim()) { setError(form, 'description', 'Please describe your request'); valid = false; }
    if (!valid) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalHtml = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

    submitForm('/api/quote', {
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      service: data.service,
      description: data.description,
    })
      .then(() => {
        form.classList.add('hidden');
        success.classList.add('show');
      })
      .catch((err) => {
        errorBox.textContent = err.message || 'Something went wrong. Please try again or contact us directly.';
        errorBox.classList.add('show');
      })
      .finally(() => {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalHtml; }
      });
  });
  reset?.addEventListener('click', () => {
    success.classList.remove('show');
    form.classList.remove('hidden');
    form.reset();
    if (fileLabel) fileLabel.textContent = 'Click to upload';
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const success = document.getElementById('contactSuccess');
  const reset = document.getElementById('contactReset');
  const errorBox = document.getElementById('contactError');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorBox.classList.remove('show');
    ['name','email','message'].forEach(key => setError(form, key, ''));
    const data = Object.fromEntries(new FormData(form).entries());
    let valid = true;
    if (!String(data.name || '').trim()) { setError(form, 'name', 'Name is required'); valid = false; }
    if (!String(data.email || '').trim()) { setError(form, 'email', 'Email is required'); valid = false; }
    else if (!validateEmail(String(data.email))) { setError(form, 'email', 'Invalid email address'); valid = false; }
    if (!String(data.message || '').trim()) { setError(form, 'message', 'Message is required'); valid = false; }
    if (!valid) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalHtml = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

    submitForm('/api/contact', {
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      subject: data.subject || '',
      message: data.message,
    })
      .then(() => {
        form.classList.add('hidden');
        success.classList.add('show');
      })
      .catch((err) => {
        errorBox.textContent = err.message || 'Something went wrong. Please try again or contact us directly.';
        errorBox.classList.add('show');
      })
      .finally(() => {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalHtml; }
      });
  });
  reset?.addEventListener('click', () => {
    success.classList.remove('show');
    form.classList.remove('hidden');
    form.reset();
  });
}

//--------------------------------------------------------

function initPortfolio() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = [...document.querySelectorAll('[data-portfolio-id]')];
  const empty = document.getElementById('portfolioEmpty');
  const lightbox = document.getElementById('lightbox');
  const lightboxMedia = document.getElementById('lightboxMedia');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxDescription = document.getElementById('lightboxDescription');
  const close = document.getElementById('lightboxClose');
  if (buttons.length) {
    buttons.forEach(btn => btn.addEventListener('click', () => {
      const category = btn.dataset.filter;
      buttons.forEach(b => b.classList.toggle('active', b === btn));
      let visible = 0;
      cards.forEach(card => {
        const item = portfolioItems.find(entry => String(entry.id) === card.dataset.portfolioId);
        const show = category === 'All' || item.category === category;
        card.classList.toggle('hidden', !show);
        if (show) visible += 1;
      });
      if (empty) empty.classList.toggle('hidden', visible !== 0);
    }));
  }
  cards.forEach(card => card.addEventListener('click', () => {
    const item = portfolioItems.find(entry => String(entry.id) === card.dataset.portfolioId);
    if (!item || !lightbox) return;
    lightboxMedia.innerHTML = placeholder(item.title, item.gradient, 420, item.image);
    lightboxTitle.textContent = item.title;
    lightboxCategory.textContent = item.category;
    lightboxDescription.textContent = item.description;
    lightbox.classList.add('open');
  }));
  close?.addEventListener('click', () => lightbox?.classList.remove('open'));
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('open');
  });
}

function initTestimonialSlider() {
  const track = document.getElementById('testimonialTrack');
  const dots = document.querySelectorAll('#testimonialDots span');
  const prev = document.getElementById('testimonialPrev');
  const next = document.getElementById('testimonialNext');
  if (!track || !dots.length) return;
  let current = 0;
  const total = dots.length;
  function goTo(index) {
    current = ((index % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }
  prev?.addEventListener('click', () => goTo(current - 1));
  next?.addEventListener('click', () => goTo(current + 1));
  dots.forEach(d => d.addEventListener('click', () => goTo(Number(d.dataset.index))));
  let interval = setInterval(() => goTo(current + 1), 5000);
  const slider = document.getElementById('testimonialSlider');
  if (slider) {
    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', () => { interval = setInterval(() => goTo(current + 1), 5000); });
  }
}

initNav();
initReveal();
initCounters();
initNewsletter();
initQuoteForm();
initContactForm();
initPortfolio();
initTestimonialSlider();
