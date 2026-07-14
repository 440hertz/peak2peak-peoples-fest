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
   * Hero poster parallax — the artwork drifts upward slower than the page,
   * revealing the canoe scene before the next section scrolls over it.
   * Progressive enhancement: without JS the image simply sits static.
   * Honors prefers-reduced-motion.
   * ----------------------------------------------------------------------- */
  const parallax = document.querySelector('[data-parallax]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (parallax && !reduceMotion.matches) {
    const DRIFT = 0.55;             // image moves at 55% of scroll speed
    let ticking = false;

    const update = () => {
      parallax.style.transform = `translate3d(0, ${window.scrollY * DRIFT}px, 0)`;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();   // set initial position
  }

  /* -------------------------------------------------------------------------
   * Nav color flip — the header is white text over the hero poster, but once
   * it scrolls onto the light content below, flip it to a pale glass bar with
   * black text so the menu stays readable. Toggles the .is-scrolled class.
   * ----------------------------------------------------------------------- */
  const heroEl = document.querySelector('.hero');
  if (nav && heroEl) {
    let navTicking = false;
    const updateNav = () => {
      // Flip when the fixed nav's lower edge passes the bottom of the hero.
      const threshold = heroEl.offsetHeight - nav.offsetHeight;
      nav.classList.toggle('is-scrolled', window.scrollY >= threshold);
      navTicking = false;
    };
    window.addEventListener('scroll', () => {
      if (!navTicking) {
        window.requestAnimationFrame(updateNav);
        navTicking = true;
      }
    }, { passive: true });
    updateNav();   // set initial state
  }

  /* -------------------------------------------------------------------------
   * Gallery lightbox — click a thumbnail to view the large image with
   * caption; navigate with on-screen arrows or the keyboard; close with the
   * button, a backdrop click, or Escape. Progressive enhancement: without JS
   * the thumbnails remain visible, they just don't expand.
   * ----------------------------------------------------------------------- */
  const lightbox = document.querySelector('[data-lightbox]');
  const galleryItems = Array.prototype.slice.call(
    document.querySelectorAll('.gallery__item')
  );

  if (lightbox && galleryItems.length) {
    const lbImg = lightbox.querySelector('[data-lb-img]');
    const lbCaption = lightbox.querySelector('[data-lb-caption]');
    const btnClose = lightbox.querySelector('[data-lb-close]');
    const btnPrev = lightbox.querySelector('[data-lb-prev]');
    const btnNext = lightbox.querySelector('[data-lb-next]');
    let current = 0;
    let lastFocused = null;

    const show = (index) => {
      current = (index + galleryItems.length) % galleryItems.length;
      const item = galleryItems[current];
      const img = item.querySelector('img');
      lbImg.src = item.getAttribute('data-full');
      lbImg.alt = img ? img.alt : '';
      lbCaption.textContent = item.getAttribute('data-caption') || '';
    };

    const open = (index) => {
      lastFocused = document.activeElement;
      show(index);
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      btnClose.focus();
    };

    const close = () => {
      lightbox.hidden = true;
      lbImg.src = '';
      document.body.style.overflow = '';
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    };

    galleryItems.forEach((item, i) => {
      item.addEventListener('click', () => open(i));
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', () => show(current - 1));
    btnNext.addEventListener('click', () => show(current + 1));

    // Backdrop click (but not clicks on the image or controls) closes.
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) close();
    });

    document.addEventListener('keydown', (event) => {
      if (lightbox.hidden) return;
      if (event.key === 'Escape') close();
      else if (event.key === 'ArrowLeft') show(current - 1);
      else if (event.key === 'ArrowRight') show(current + 1);
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
            : 'Something went wrong sending your message. Please try again, or email info@peak2peakpeoplesfest.com.';
          status.style.color = '#993333';
        }
      } catch (err) {
        status.textContent = 'Network error. Please try again, or email info@peak2peakpeoplesfest.com.';
        status.style.color = '#993333';
      }
    });
  }

})();
