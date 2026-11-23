document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const year = document.getElementById('year');

    if (year) year.textContent = new Date().getFullYear();

    // 滾動時為導覽列加上非常輕的陰影，保留清新的紙張色調。
    const updateNavbar = () => {
        navbar?.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });

    // 預設內容直接可見；支援 IntersectionObserver 時才加上漸入效果。
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion && 'IntersectionObserver' in window) {
        const targets = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries, currentObserver) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                entry.target.classList.add('is-visible');
                currentObserver.unobserve(entry.target);
            }
        }, { threshold: 0.08, rootMargin: '0px 0px -18px 0px' });
        for (const target of targets) observer.observe(target);
        document.documentElement.classList.add('js-ready');
    }
});
