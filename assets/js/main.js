const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('nav menu');

toggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', isOpen);
});