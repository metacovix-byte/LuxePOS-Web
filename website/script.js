// LuxePOS marketing site — tiny enhancements
// Zero framework, zero tracking, zero CDN.

(function () {
    'use strict';

    // ─── Smooth scroll for in-page anchors avec offset pour la nav sticky ───
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href');
            if (!id || id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const navHeight = document.querySelector('.nav')?.offsetHeight || 64;
            const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // ─── Lazy reveal on scroll (intersection observer, sans biblio) ────────
    // GRACEFUL DEGRADATION : on n'applique opacity:0 que si IO est disponible
    // ET on signale qu'on prend le contrôle via la classe .js-reveal-active sur
    // <html>. Si JS plante avant cette ligne, le contenu reste visible.
    const revealable = document.querySelectorAll('.section, .feature, .persona-card, .step, .rm-item');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if ('IntersectionObserver' in window && !prefersReducedMotion) {
        document.documentElement.classList.add('js-reveal-active');
        revealable.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        revealable.forEach(el => io.observe(el));
    }
    // Sinon (no IO ou reduced motion) : contenu visible immédiatement, aucune intervention.

    // ─── Détection plateforme : adapter le CTA principal ───────────────────
    // Les libellés sont traduits via window.LUXEPOS_I18N quand disponible.
    const ua = navigator.userAgent || '';
    const isMac = /Macintosh|Mac OS X/.test(ua);
    const isLinux = /Linux/.test(ua) && !/Android/.test(ua);
    const isAndroid = /Android/.test(ua);
    const isiOS = /iPhone|iPad|iPod/.test(ua);

    function getI18n(path, fallback) {
        try {
            const lang = document.documentElement.lang || 'fr';
            const dict = (window.LUXEPOS_I18N && window.LUXEPOS_I18N[lang]) || (window.LUXEPOS_I18N && window.LUXEPOS_I18N.fr);
            if (!dict) return fallback;
            const value = path.split('.').reduce((acc, k) => acc && acc[k], dict);
            return value || fallback;
        } catch (e) {
            return fallback;
        }
    }

    const primaryCta = document.querySelector('.cta-row .btn-primary');
    if (primaryCta && isMac) {
        const title = getI18n('platformCta.macTitle', 'Télécharger pour macOS');
        const sub = getI18n('platformCta.macSub', '.dmg · v5.14.21');
        primaryCta.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            <span>${title}</span>
            <span class="btn-sub">${sub}</span>
        `;
        primaryCta.href = 'https://github.com/metacovix-byte/LuxePOS-Web/releases/latest/download/LuxePOS_5.14.21_universal.dmg';
    } else if (primaryCta && (isAndroid || isiOS)) {
        const title = getI18n('platformCta.mobileTitle', 'Bientôt sur mobile');
        const sub = getI18n('platformCta.mobileSub', 'en cours · suis sur GitHub');
        primaryCta.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2.5"/><path d="M11 18h2"/></svg>
            <span>${title}</span>
            <span class="btn-sub">${sub}</span>
        `;
        primaryCta.href = 'https://github.com/metacovix-byte/LuxePOS-Web';
    } else if (primaryCta && isLinux) {
        const title = getI18n('platformCta.linuxTitle', 'Build Linux à venir');
        const sub = getI18n('platformCta.linuxSub', 'voir GitHub');
        primaryCta.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            <span>${title}</span>
            <span class="btn-sub">${sub}</span>
        `;
        primaryCta.href = 'https://github.com/metacovix-byte/LuxePOS-Web';
    }

    // ─── Année courante dans le footer si jamais on en ajoute ──────────────
    document.querySelectorAll('[data-year]').forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // ─── Pretty FAQ : ferme les autres details à l'ouverture (accordéon) ───
    // + Esc pour fermer le details ouvert (a11y clavier)
    const faqDetails = document.querySelectorAll('.faq details');
    faqDetails.forEach(d => {
        d.addEventListener('toggle', () => {
            if (d.open) faqDetails.forEach(other => { if (other !== d) other.open = false; });
        });
        d.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && d.open) {
                d.open = false;
                d.querySelector('summary')?.focus();
            }
        });
    });

    // ─── Console hello pour les curieux ────────────────────────────────────
    console.log(
        '%cLuxePOS%c — vous êtes curieux du code ?\n' +
        'Tout est sur : https://github.com/metacovix-byte/LuxePOS-Web',
        'font: bold 14px monospace; color: #10b981;',
        'font: 12px sans-serif; color: #475569;'
    );
})();
