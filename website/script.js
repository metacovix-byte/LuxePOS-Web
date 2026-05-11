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
    const revealable = document.querySelectorAll('.section, .feature, .persona-card, .step, .rm-item');
    revealable.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    if ('IntersectionObserver' in window) {
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
    } else {
        // Fallback : tout afficher
        revealable.forEach(el => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; });
    }

    // ─── Détection plateforme : adapter le CTA principal ───────────────────
    const ua = navigator.userAgent || '';
    const isMac = /Macintosh|Mac OS X/.test(ua);
    const isLinux = /Linux/.test(ua) && !/Android/.test(ua);
    const isAndroid = /Android/.test(ua);
    const isiOS = /iPhone|iPad|iPod/.test(ua);

    const primaryCta = document.querySelector('.cta-row .btn-primary');
    if (primaryCta && isMac) {
        primaryCta.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            Télécharger pour macOS
            <span class="btn-sub">.dmg · v5.14.15</span>
        `;
        primaryCta.href = 'https://github.com/metacovix-byte/LuxePOS-Web/releases/latest/download/LuxePOS_5.14.15_universal.dmg';
    } else if (primaryCta && (isAndroid || isiOS)) {
        primaryCta.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2.5"/><path d="M11 18h2"/></svg>
            Bientôt sur mobile
            <span class="btn-sub">en cours · suis sur GitHub</span>
        `;
        primaryCta.href = 'https://github.com/metacovix-byte/LuxePOS-Web';
    } else if (primaryCta && isLinux) {
        primaryCta.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            Build Linux à venir
            <span class="btn-sub">voir GitHub</span>
        `;
        primaryCta.href = 'https://github.com/metacovix-byte/LuxePOS-Web';
    }

    // ─── Année courante dans le footer si jamais on en ajoute ──────────────
    document.querySelectorAll('[data-year]').forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // ─── Pretty FAQ : ferme les autres details à l'ouverture (accordéon) ───
    const faqDetails = document.querySelectorAll('.faq details');
    faqDetails.forEach(d => {
        d.addEventListener('toggle', () => {
            if (d.open) faqDetails.forEach(other => { if (other !== d) other.open = false; });
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
