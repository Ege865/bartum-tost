// The press opens: the name is squeezed between two hot plates, then the plates part and
// hand over to the hero timeline. ~1.7s, once per session.
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

export function playIntro(hero: gsap.core.Timeline) {
  const root = document.documentElement;
  const el = document.querySelector<HTMLElement>('[data-intro]');
  if (!el) { hero.play(0); return; }

  const word = el.querySelector<HTMLElement>('[data-intro-word]')!;
  const top = el.querySelector('[data-plate="top"]');
  const bottom = el.querySelector('[data-plate="bottom"]');
  const split = SplitText.create(word, { type: 'chars', mask: 'chars' });

  // The CSS failsafe is no longer needed once the script owns the overlay.
  el.style.animation = 'none';

  const done = () => {
    root.classList.remove('intro-on');
    split.revert();
    try { sessionStorage.setItem('bt-intro', '1'); } catch {}
  };

  gsap
    .timeline({ onComplete: done })
    .from(split.chars, { yPercent: 110, duration: 0.7, stagger: 0.035 })
    // the press: plates squeeze the word flat for a beat
    .to(word, { scaleY: 0.42, scaleX: 1.12, duration: 0.22, ease: 'power4.in' }, '+=0.1')
    .to(word, { scaleY: 1, scaleX: 1, duration: 0.5, ease: 'elastic.out(1, 0.45)' })
    .to(word, { opacity: 0, duration: 0.2, ease: 'power1.out' }, '-=0.25')
    .to(top, { yPercent: -101, duration: 0.9, ease: 'expo.inOut' }, '<')
    .to(bottom, { yPercent: 101, duration: 0.9, ease: 'expo.inOut' }, '<')
    .add(() => { hero.play(0); }, '-=0.55');
}
