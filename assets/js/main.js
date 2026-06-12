const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('nav menu');

if (toggle && menu) {
    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', isOpen);
    });
}

const newsTrack = document.querySelector('.news');
const dotsContainer = document.querySelector('.news__dots');
const newsItems = document.querySelectorAll('.news__new');

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

    let isDown = false;
    let startX;
    let scrollLeft;

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
}

const btnFilter = document.querySelector('#btn-filter');
const btnSort = document.querySelector('#btn-sort');
const filterSort = document.querySelector('.filter-sort');

if (btnFilter && filterSort) {
    btnFilter.addEventListener('click', () => filterSort.classList.toggle('is-open'));
}
if (btnSort && filterSort) {
    btnSort.addEventListener('click', () => filterSort.classList.toggle('is-open'));
}

const thumbs = document.querySelectorAll('.steam-gallery__thumb');
const mainImg = document.querySelector('.steam-gallery__active');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const galleryMain = document.querySelector('.steam-gallery__main');

if (thumbs.length && mainImg) {
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainImg.src = thumb.src;
            mainImg.alt = thumb.alt;
            thumbs.forEach(t => t.classList.remove('is-active'));
            thumb.classList.add('is-active');
        });
    });
}

if (galleryMain && lightbox) {
    galleryMain.addEventListener('click', () => {
        lightboxImg.src = mainImg.src;
        lightboxImg.alt = mainImg.alt;
        lightbox.classList.add('is-open');
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('is-open');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('is-open');
        }
    });
}