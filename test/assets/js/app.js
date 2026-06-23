/**
 * ContentClik - Main Application JS
 * Handles: Swiper init, form validation, toast, scroll reveals, save/bookmark
 */

/* -------------------------------------------------------
   TOAST SYSTEM (global)
------------------------------------------------------- */
window.showToast = function (msg, type = 'amber', duration = 3500) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '&#10003;', error: '&#9888;', amber: '&#9432;' };
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `<span>${icons[type] || icons.amber}</span> ${msg}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

/* -------------------------------------------------------
   FORM VALIDATION
------------------------------------------------------- */
window.validateForm = function (formEl) {
  let valid = true;
  const inputs = formEl.querySelectorAll('[data-required]');
  inputs.forEach(input => {
    const group = input.closest('.form-group');
    const err   = group ? group.querySelector('.form-error') : null;
    const val   = input.value.trim();
    let msg     = '';

    if (!val) {
      msg = 'This field is required.';
    } else if (input.type === 'email' && !val.includes('@')) {
      msg = 'Enter a valid email address.';
    }

    if (msg) {
      valid = false;
      input.classList.add('form-input--error');
      if (err) { err.textContent = msg; err.style.display = 'block'; }
    } else {
      input.classList.remove('form-input--error');
      if (err) err.style.display = 'none';
    }
  });
  return valid;
};

/* -------------------------------------------------------
   SCROLL REVEAL
------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  document.addEventListener('revealApply', () => {
    document.querySelectorAll('.revealed').forEach(el => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    });
  });
}

// Apply styles for revealed items
const style = document.createElement('style');
style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

/* -------------------------------------------------------
   SWIPER INIT
------------------------------------------------------- */
function initSwipers() {
  // Featured hero swiper
  if (document.querySelector('.swiper-featured')) {
    new Swiper('.swiper-featured', {
      slidesPerView:  1.1,
      spaceBetween:   20,
      loop:           true,
      autoplay:       { delay: 5000, disableOnInteraction: false },
      pagination:     { el: '.swiper-featured .swiper-pagination', clickable: true },
      navigation:     { nextEl: '.swiper-featured .swiper-button-next', prevEl: '.swiper-featured .swiper-button-prev' },
      breakpoints:    { 768: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3 } }
    });
  }

  // Topics swiper
  if (document.querySelector('.swiper-topics')) {
    new Swiper('.swiper-topics', {
      slidesPerView: 2.2,
      spaceBetween:  16,
      freeMode:      true,
      breakpoints:   { 768: { slidesPerView: 4 }, 1024: { slidesPerView: 6 } }
    });
  }

  // Testimonials swiper
  if (document.querySelector('.swiper-testimonials')) {
    new Swiper('.swiper-testimonials', {
      slidesPerView:  1,
      spaceBetween:   24,
      loop:           true,
      autoplay:       { delay: 6000 },
      pagination:     { el: '.swiper-testimonials .swiper-pagination', clickable: true },
      breakpoints:    { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });
  }

  // Collections swiper
  if (document.querySelector('.swiper-collections')) {
    new Swiper('.swiper-collections', {
      slidesPerView: 1.15,
      spaceBetween:  20,
      loop:          false,
      breakpoints:   { 600: { slidesPerView: 2.1 }, 1024: { slidesPerView: 3.2 } }
    });
  }
}

/* -------------------------------------------------------
   SAVE / BOOKMARK
------------------------------------------------------- */
function initBookmarks() {
  document.querySelectorAll('[data-bookmark]').forEach(btn => {
    const id   = btn.dataset.bookmark;
    const saved = JSON.parse(localStorage.getItem('cc_saved') || '[]');
    if (saved.includes(id)) btn.classList.add('saved');

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const list = JSON.parse(localStorage.getItem('cc_saved') || '[]');
      const idx  = list.indexOf(id);
      if (idx > -1) {
        list.splice(idx, 1);
        btn.classList.remove('saved');
        showToast('Removed from saved.', 'amber');
      } else {
        list.push(id);
        btn.classList.add('saved');
        showToast('Saved to your library.', 'success');
      }
      localStorage.setItem('cc_saved', JSON.stringify(list));
    });
  });
}

/* -------------------------------------------------------
   GATE FORM SUBMIT (content access form)
------------------------------------------------------- */
function initGateForm() {
  const gateForm = document.getElementById('gateForm');
  if (!gateForm) return;

  gateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm(gateForm)) return;

    const btn = gateForm.querySelector('button[type="submit"]');
    btn.textContent = 'Unlocking...';
    btn.disabled    = true;

    // Simulate Firebase write + access grant
    setTimeout(() => {
      const pdfSection = document.getElementById('pdfAccess');
      if (pdfSection) {
        pdfSection.style.display = 'block';
        pdfSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      gateForm.closest('.gate-box').innerHTML = `
        <div style="text-align:center;padding:32px 0;">
          <div style="font-size:2.5rem;margin-bottom:16px;">&#10003;</div>
          <h3>You are in.</h3>
          <p class="lead" style="margin-top:8px;">Your download is ready below.</p>
        </div>`;
      showToast('Access granted. Enjoy the read.', 'success');
    }, 1200);
  });
}

/* -------------------------------------------------------
   FILTER PILLS (explore page)
------------------------------------------------------- */
function initFilters() {
  document.querySelectorAll('.topic-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const parent = pill.closest('.topic-pills, .filter-bar');
      if (!parent) return;
      parent.querySelectorAll('.topic-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
}

/* -------------------------------------------------------
   NEWSLETTER FORM (section on every page)
------------------------------------------------------- */
function initNewsletterForms() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !input.value.includes('@')) {
        showToast('Enter a valid email.', 'error');
        return;
      }
      // Firebase write would go here
      input.value = '';
      showToast('Subscribed. Welcome to the network.', 'success');
    });
  });
}

/* -------------------------------------------------------
   COUNTER ANIMATION (stats)
------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      let start    = 0;
      const step   = Math.ceil(target / 60);
      const timer  = setInterval(() => {
        start += step;
        if (start >= target) {
          el.textContent = target.toLocaleString() + suffix;
          clearInterval(timer);
        } else {
          el.textContent = start.toLocaleString() + suffix;
        }
      }, 20);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* -------------------------------------------------------
   INIT ALL
------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initSwipers();
  initBookmarks();
  initGateForm();
  initFilters();
  initNewsletterForms();
  initCounters();
});
