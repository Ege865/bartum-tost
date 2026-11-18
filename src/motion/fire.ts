// Scroll-zoom moment: the fire photograph opens from a centred card to the full screen while
// the section is pinned, then the line rises over it.
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

export function fireZoom(wide: boolean) {
  const section = document.querySelector('[data-fire]');
  if (!section) return;
  const pin = section.querySelector('[data-fire-pin]')!;
  const media = section.querySelector('[data-fire-media]');
  const img = section.querySelector('[data-fire-img]');
  const text = section.querySelector<HTMLElement>('[data-fire-text]')!;
  const split = SplitText.create(text.querySelectorAll('span'), { type: 'lines', mask: 'lines' });
  const inset = wide ? 'inset(24% 30% 24% 30%)' : 'inset(26% 12% 26% 12%)';

  gsap
    .timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: section, pin, start: 'top top', end: wide ? '+=140%' : '+=90%', scrub: 0.6 },
    })
    .fromTo(media, { clipPath: inset }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.inOut' })
    .fromTo(img, { scale: 1.45 }, { scale: 1, duration: 1, ease: 'power2.out' }, 0)
    .from(split.lines, { yPercent: 110, duration: 0.35, stagger: 0.12, ease: 'power3.out' }, 0.7);

  return () => split.revert();
}
