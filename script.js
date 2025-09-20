// Back-to-top behavior
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    const SHOW_AFTER = 320; // pixels scrolled before showing button

    // Show/hide on scroll
    function checkScroll() {
        if (window.scrollY > SHOW_AFTER) {
            btn.classList.add('show');
            btn.setAttribute('aria-hidden', 'false');
        } else {
            btn.classList.remove('show');
            btn.setAttribute('aria-hidden', 'true');
        }
    }
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });

    // Click -> smooth scroll to top
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            window.scrollTo(0, 0);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // move keyboard focus to the top landmark (if present) to preserve accessibility
        const topTarget = document.querySelector('header, [role="banner"], main, [role="main"]');
        if (topTarget) {
            // make focusable temporarily if not focusable
            const prevTab = topTarget.getAttribute('tabindex');
            if (!topTarget.hasAttribute('tabindex')) topTarget.setAttribute('tabindex', '-1');
            topTarget.focus({ preventScroll: true });
            // restore original tabindex after a short delay
            setTimeout(() => {
                if (prevTab === null) topTarget.removeAttribute('tabindex'); else topTarget.setAttribute('tabindex', prevTab);
            }, 800);
        }
    });

    // Optional: show button when keyboard user presses PageDown or Arrow keys (improves discoverability)
    window.addEventListener('keydown', (e) => {
        if (['PageDown', 'ArrowDown', 'Space'].includes(e.key)) checkScroll();
    });
});
