// Hero entrance (paused; the intro or initMotion starts it) and the hero's scroll behaviour.
import { gsap } from 'gsap';

export function heroTimeline() {
  const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]');
  const hot = lines[lines.length - 1];
  const frame = document.querySelector('[data-hero-frame]');
  const img = document.querySelector('[data-hero-img]');
  const fades = gsap.utils.toArray<HTMLElement>('[data-hero-fade]');

  // Each line gets its own clipping parent so it can rise from under its baseline.
  lines.forEach((l) => {
    if (l.parentElement?.classList.contains('mask-line')) return;
    const m = document.createElement('span');
    m.className = 'mask-line';
    m.style.cssText = 'display:block;overflow:hidden;padding-block:0.1em 0.04em;margin-block:-0.1em -0.04em';
    l.replaceWith(m);
    m.appendChild(l);
  });

  gsap.set([...lines, ...fades, frame], { opacity: 1 });

  return gsap
    .timeline({ paused: true })
    .from(img, { scale: 1.35, duration: 2.2, ease: 'expo.out' }, 0)
    .from(frame, { filter: 'brightness(0.2)', duration: 1.6, ease: 'power2.out' }, 0)
    .from(lines, { yPercent: 105, duration: 1.1, stagger: 0.12 }, 0.15)
    .to(hot, { scaleY: 0.8, scaleX: 1.04, transformOrigin: '0% 100%', duration: 0.16, ease: 'power3.in' }, 1)
    .to(hot, { scaleY: 1, scaleX: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
    .from(fades, { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.7);
}

/** While leaving the hero the photograph sinks and zooms slightly, the copy lifts away faster. */
export function heroScroll() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;
  gsap
    .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.4 } })
    .to('[data-hero-img]', { yPercent: 14, scale: 1.08 }, 0)
    .to('.hero__content', { yPercent: -18, opacity: 0.2 }, 0);
}
