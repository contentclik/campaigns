/**
 * ContentClik - Shared Navigation Module
 * CommonJS pattern: inject nav HTML into #cc-nav
 */

(function () {
  const navHTML = `
    <nav class="nav-inner">
      <a href="./index.html" class="nav-logo">
        Content<span>Clik</span>
        <div class="nav-logo-dot"></div>
      </a>

      <div class="nav-links">
        <a href="./explore.html">Explore</a>
        <a href="./topics.html">Topics</a>
        <a href="./collections.html">Collections</a>
        <a href="./publishers.html">For Publishers</a>
        <a href="./about.html">About</a>
      </div>

      <div class="nav-actions">
        <button class="nav-search-btn" id="searchToggle" aria-label="Search">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
        <a href="./dashboard.html" class="btn btn--outline btn--sm">Sign In</a>
        <a href="./publishers.html" class="btn btn--amber btn--sm">Get Started</a>
        <div class="nav-hamburger" id="hamburger" role="button" aria-label="Menu">
          <span></span><span></span><span></span>
        </div>
      </div>
    </nav>

    <div class="nav-mobile" id="mobileMenu">
      <a href="./index.html">Home</a>
      <a href="./explore.html">Explore</a>
      <a href="./topics.html">Topics</a>
      <a href="./collections.html">Collections</a>
      <a href="./publishers.html">For Publishers</a>
      <a href="./about.html">About</a>
      <a href="./careers.html">Careers</a>
      <a href="./dashboard.html">Sign In</a>
    </div>

    <div class="search-overlay" id="searchOverlay">
      <div class="search-box">
        <div class="search-input-wrap">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input type="text" id="searchInput" placeholder="Search topics, eBooks, reports..." autocomplete="off"/>
          <button id="searchClose" style="color:var(--ink-muted); font-size:1.2rem;">&#x2715;</button>
        </div>
        <p style="font-size:0.8rem;color:var(--ink-light);margin-top:12px;">Try: Future of Work, Employee Experience, Leadership</p>
      </div>
    </div>
  `;

  function initNav() {
    const el = document.getElementById('cc-nav');
    if (!el) return;
    el.innerHTML = navHTML;

    // Scroll shadow
    window.addEventListener('scroll', () => {
      el.classList.toggle('scrolled', window.scrollY > 10);
    });

    // Active link
    const links = el.querySelectorAll('.nav-links a, .nav-mobile a');
    const current = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(a => {
      if (a.getAttribute('href') === '/' + current) {
        a.classList.add('active');
      }
    });

    // Hamburger
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    // Search
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');

    searchToggle.addEventListener('click', () => {
      searchOverlay.classList.add('open');
      setTimeout(() => searchInput.focus(), 100);
    });

    const closeSearch = () => searchOverlay.classList.remove('open');
    searchClose.addEventListener('click', closeSearch);
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) closeSearch();
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSearch();
      if (e.key === 'Enter' && searchInput.value.trim()) {
        window.location.href = '/explore.html?q=' + encodeURIComponent(searchInput.value.trim());
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
