document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     1. Theme Toggle
     ========================================= */
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeToggle ? themeToggle.querySelector('i') : null;

  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    if (icon) icon.className = 'fas fa-moon';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      if (icon) icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  /* =========================================
     2. Scroll Animations
     ========================================= */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // Logic mainly handled by CSS transition
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';

        // Animate Skill Bars
        if (entry.target.classList.contains('skill-bar-fill')) {
          const width = entry.target.getAttribute('data-width');
          entry.target.style.width = width;
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-up, .hero-content, .info-grid, .services-grid, .tools-wrapper, .form-card, .skill-bar-fill').forEach(el => {
    if (!el.classList.contains('skill-bar-fill')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    }
    observer.observe(el);
  });



  /* =========================================
     4. Mobile Nav
     ========================================= */
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      navToggle.querySelector('i').classList.toggle('fa-times');
      navToggle.querySelector('i').classList.toggle('fa-bars');
    });

    // Close on link click
    document.querySelectorAll('.nav-list a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
      });
    });
  }

  /* =========================================
     5. FAQ Accordion
     ========================================= */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // Close others
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });

  /* =========================================
     6. Form Handling (Mock + Netlify)
     ========================================= */
  async function handleFormSubmit(formId, action) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      btn.disabled = true;

      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => data[key] = value);

      // Simulate/Call API
      setTimeout(() => {
        let resultHTML = '';

        if (action === 'calculate_revenue') {
          const tr = parseFloat(data.traffic);
          const cr = parseFloat(data.conversion_rate) / 100;
          const av = parseFloat(data.aov);
          const current = tr * cr * av;
          const proj = tr * 1.25 * cr * av; // 25% boost

          resultHTML = `
                       <div class="result-content">
                            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem">
                                <span>Current Revenue:</span> <b>$${current.toLocaleString('en-US', { maximumFractionDigits: 0 })}</b>
                            </div>
                            <div style="display:flex; justify-content:space-between;">
                                <span>Projected Revenue:</span> <b>$${proj.toLocaleString('en-US', { maximumFractionDigits: 0 })}</b>
                            </div>
                       </div>
                   `;
          document.getElementById('revenue-result').innerHTML = resultHTML;
          document.getElementById('revenue-result').style.display = 'block';

        } else if (action === 'calculate_traffic') {
          const ct = parseFloat(data.current_traffic);
          const gr = parseFloat(data.growth_rate) / 100;
          const m = parseInt(data.months);
          const future = ct * Math.pow((1 + gr), m);

          resultHTML = `
                        <div class="result-content">
                             <div style="display:flex; justify-content:space-between;">
                                 <span>Projected Traffic:</span> <b>${Math.round(future).toLocaleString()} Visits</b>
                             </div>
                        </div>
                   `;
          document.getElementById('traffic-result').innerHTML = resultHTML;
          document.getElementById('traffic-result').style.display = 'block';
        } else if (action === 'calculate_roi') {
          const cost = parseFloat(data.cost);
          const value = parseFloat(data.value);
          const breakEven = (cost / value).toFixed(1);
          const val3 = (value * 36) - cost;

          resultHTML = `
                     <div class="result-content">
                          <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem">
                              <span>Break-Even:</span> <b>${breakEven} Mo</b>
                          </div>
                          <div style="display:flex; justify-content:space-between;">
                              <span>3-Year Value:</span> <b>$${val3.toLocaleString()}</b>
                          </div>
                     </div>
                  `;
          document.getElementById('roi-result-main').innerHTML = resultHTML;
          document.getElementById('roi-result-main').style.display = 'block';

        } else if (action === 'send_contact') {
          alert('Thank you! Your message has been sent successfully.');
          form.reset();
        }

        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 800);
    });
  }

  handleFormSubmit('revenue-form', 'calculate_revenue');
  handleFormSubmit('traffic-form', 'calculate_traffic');
  handleFormSubmit('roi-form-main', 'calculate_roi');
  handleFormSubmit('contact-form', 'send_contact');
});
