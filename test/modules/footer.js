/**
 * ContentClik - Shared Footer Module
 * CommonJS pattern: inject footer HTML into #cc-footer
 */

(function () {
  const footerHTML = `
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">Content<span>Clik</span></div>
        <p>A publisher platform built for serious minds. We connect curated intelligence with audiences who are ready to grow.</p>
        <div style="display:flex;gap:12px;margin-top:24px;">
          <a href="https://linkedin.com" target="_blank" rel="noopener" style="color:var(--ink-light);font-size:0.8rem;transition:color 0.2s;">LinkedIn</a>
          <a href="https://twitter.com" target="_blank" rel="noopener" style="color:var(--ink-light);font-size:0.8rem;transition:color 0.2s;">Twitter / X</a>
        </div>
      </div>

      <div class="footer-col">
        <h6>Platform</h6>
        <ul>
          <li><a href="./explore.html">Explore Content</a></li>
          <li><a href="./topics.html">Topics</a></li>
          <li><a href="./collections.html">Collections</a></li>
          <li><a href="./publishers.html">For Publishers</a></li>
          <li><a href="./dashboard.html">Your Dashboard</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h6>Company</h6>
        <ul>
          <li><a href="./about.html">About Us</a></li>
          <li><a href="./careers.html">Careers</a></li>
          <li><a href="./privacy.html">Privacy Policy</a></li>
          <li><a href="./terms.html">Terms of Service</a></li>
        </ul>
      </div>

      <div class="footer-col footer-newsletter">
        <h5>Weekly Briefing</h5>
        <p>Smart content, delivered every Monday. No noise.</p>
        <div class="footer-form">
          <input type="email" placeholder="Your work email" id="footerEmail"./>
          <button type="button" onclick="footerSubscribe()">Join</button>
        </div>
        <p style="font-size:0.75rem;color:var(--ink-light);margin-top:8px;">No spam. Unsubscribe anytime.</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2026 ContentClik. All rights reserved. A LogicPublish Publication.</p>
      <div class="footer-bottom-links">
        <a href="./privacy.html">Privacy</a>
        <a href="./terms.html">Terms</a>
        <a href="./careers.html">Careers</a>
      </div>
    </div>
  `;

  function initFooter() {
    const el = document.getElementById('cc-footer');
    if (!el) return;
    el.innerHTML = footerHTML;
  }

  window.footerSubscribe = function () {
    const input = document.getElementById('footerEmail');
    if (!input) return;
    const email = input.value.trim();
    if (!email || !email.includes('@')) {
      showToast('Enter a valid email address.', 'error');
      return;
    }
    // Firebase call would go here
    input.value = '';
    showToast('You are on the list. See you Monday.', 'success');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooter);
  } else {
    initFooter();
  }
})();
