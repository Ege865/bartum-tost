// The header steps out of the way while reading down and returns on the way up.
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function navOnScroll() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const menuOpen = nav.querySelector('[data-menu-toggle]')?.getAttribute('aria-expanded') === 'true';
      const focusInside = nav.contains(document.activeElement);
      const hide = self.direction === 1 && self.scroll() > window.innerHeight * 0.6 && !menuOpen && !focusInside;
      nav.classList.toggle('is-hidden', hide);
      nav.classList.toggle('at-top', self.scroll() < 40);
    },
  });
  // Keyboard users always see where focus is.
  nav.addEventListener('focusin', () => nav.classList.remove('is-hidden'));
}
