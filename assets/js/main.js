const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('nav menu');
const newsTrack = document.querySelector('.news');
const dotsContainer = document.querySelector('.news__dots');
const newsItems = document.querySelectorAll('.news__new');
let isDown = false;
let startX;
let scrollLeft;

toggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', isOpen);
});


if (newsTrack && dotsContainer && newsItems.length) {
    newsItems.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('news__dot');
        dot.setAttribute('aria-label', `Novinka ${i + 1}`);
        if (i === 0) dot.classList.add('is-active');
        dot.addEventListener('click', () => {
            newsItems[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.news__dot');

    newsTrack.addEventListener('scroll', () => {
        const center = newsTrack.scrollLeft + newsTrack.offsetWidth / 2;
        let closest = 0;
        let minDist = Infinity;
        newsItems.forEach((item, i) => {
            const itemCenter = item.offsetLeft + item.offsetWidth / 2;
            const dist = Math.abs(center - itemCenter);
            if (dist < minDist) { minDist = dist; closest = i; }
        });
        dots.forEach(d => d.classList.remove('is-active'));
        dots[closest].classList.add('is-active');
    });
}

newsTrack.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - newsTrack.offsetLeft;
    scrollLeft = newsTrack.scrollLeft;
});
newsTrack.addEventListener('mouseleave', () => isDown = false);
newsTrack.addEventListener('mouseup', () => isDown = false);
newsTrack.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - newsTrack.offsetLeft;
    const walk = (x - startX) * 1.5;
    newsTrack.scrollLeft = scrollLeft - walk;
});