document.addEventListener('DOMContentLoaded', () => {
  // =========================================
  // Theme Toggle Logic
  // =========================================
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeToggle.querySelector('.icon');

  // Check saved preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    icon.textContent = '🌙';
  } else {
    icon.textContent = '☀';
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    icon.textContent = isDark ? '🌙' : '☀';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // =========================================
  // Mobile Navigation
  // =========================================
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      // Animate hamburger lines (optional simple toggle)
      navToggle.classList.toggle('open');
    });

    // Close nav when clicking a link
    document.querySelectorAll('.nav-list a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
      });
    });
  }

  // =========================================
  // FAQ Accordion
  // =========================================
  document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const isActive = item.classList.contains('active');

      // Close all others
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // =========================================
  // Scroll Animations
  // =========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Determine animation type based on class
        if (entry.target.classList.contains('animate-scale')) {
          entry.target.style.animation = 'scaleUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
        } else {
          entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
        }

        // Add delay if specified
        if (entry.target.classList.contains('delay-1')) entry.target.style.animationDelay = '0.1s';
        if (entry.target.classList.contains('delay-2')) entry.target.style.animationDelay = '0.2s';
        if (entry.target.classList.contains('delay-3')) entry.target.style.animationDelay = '0.3s';
        if (entry.target.classList.contains('delay-4')) entry.target.style.animationDelay = '0.4s';

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-up, .animate-scale').forEach((el) => {
    el.style.opacity = '0'; // Ensure hidden initially
    observer.observe(el);
  });

  // =========================================
  // Form Handlers (Server-Side Integration)
  // =========================================
  async function handleFormSubmit(formId, action, successCallback) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      // Create data object
      const formData = new FormData(form);
      const data = { action: action };
      formData.forEach((value, key) => data[key] = value);

      // Loading state
      btn.innerHTML = 'Processing...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      try {
        const response = await fetch('/.netlify/functions/api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await response.json();

        if (result.status === 'success') {
          successCallback(result);
        } else {
          alert('Error: ' + result.message);
        }
      } catch (err) {
        console.error(err);
        alert('An error occurred. Please try again.');
      } finally {
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
        btn.disabled = false;
      }
    });
  }

  // Initialize Forms
  handleFormSubmit('revenue-form', 'calculate_revenue', (result) => {
    const resultDiv = document.getElementById('revenue-result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
            <div class="result-row"><span>Current Revenue:</span> <span>${result.data.current_revenue}</span></div>
            <div class="result-row"><span>Proj. w/ SEO (+20%):</span> <span style="color:var(--accent-primary); font-weight:700;">${result.data.projected_revenue}</span></div>
            <div class="result-row"><span>Potential Growth:</span> <span style="color: #10b981">+${result.data.potential_growth}</span></div>
        `;
  });

  handleFormSubmit('traffic-form', 'calculate_traffic', (result) => {
    const resultDiv = document.getElementById('traffic-result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
            <div class="result-row"><span>Projected Traffic:</span> <span style="color:var(--accent-primary); font-weight:700;">${result.data.future_traffic} visits</span></div>
            <div class="result-row"><span>Growth:</span> <span style="color: #10b981">+${result.data.increase_percentage}</span></div>
        `;
  });

  handleFormSubmit('contact-form', 'submit_contact', (result) => {
    const form = document.getElementById('contact-form');
    form.reset();
    const btn = form.querySelector('button[type="submit"]');
    const oldText = btn.innerText;
    btn.innerHTML = '✓ Message Sent';
    btn.style.background = '#10b981';
    setTimeout(() => {
      btn.innerHTML = oldText;
      btn.style.background = ''; // Reset to CSS default
    }, 3000);
    alert(result.message);
  });
});
