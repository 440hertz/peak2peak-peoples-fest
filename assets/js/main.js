/* Peak 2 Peak Peoples' Festival — main.js
 * Small bits of progressive enhancement only. The site works without JS.
 */

(function () {
  'use strict';

  /* -------------------------------------------------------------------------
   * Mobile nav toggle
   * ----------------------------------------------------------------------- */
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('[data-nav-toggle]');

  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });

    // Close menu when a nav link is clicked (mobile only)
    nav.querySelectorAll('.nav__link, .nav__cta').forEach((link) => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.textContent = 'Menu';
        }
      });
    });
  }

  /* -------------------------------------------------------------------------
   * Contact form — Formspree-friendly submit handler.
   * Posts JSON via fetch so we can show inline success/error without
   * navigating away. Works whether or not Formspree is wired up — if the
   * endpoint hasn't been replaced yet, the user sees a clear error.
   * ----------------------------------------------------------------------- */
  const form = document.querySelector('[data-form="contact"]');
  if (form) {
    const status = document.createElement('p');
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.style.cssText = 'margin-top: 1rem; font-size: 0.95rem;';
    form.appendChild(status);

    form.addEventListener('submit', async (event) => {
      const action = form.getAttribute('action') || '';
      // If the endpoint hasn't been wired up, do nothing fancy — let the
      // browser submit normally so the missing endpoint is obvious.
      if (action.includes('REPLACE_WITH_YOUR_ENDPOINT')) return;

      event.preventDefault();
      const data = new FormData(form);
      status.textContent = 'Sending…';
      status.style.color = 'var(--gray-700)';

      try {
        const res = await fetch(action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });

        if (res.ok) {
          form.reset();
          status.textContent = 'Thanks — your message is on its way. We\'ll be in touch.';
          status.style.color = 'var(--ink)';
        } else {
          const body = await res.json().catch(() => ({}));
          status.textContent = body && body.error
            ? `Couldn't send: ${body.error}`
            : 'Something went wrong sending your message. Please try again, or email hello@peak2peakpeoplesfest.com.';
          status.style.color = '#993333';
        }
      } catch (err) {
        status.textContent = 'Network error. Please try again, or email hello@peak2peakpeoplesfest.com.';
        status.style.color = '#993333';
      }
    });
  }

})();
