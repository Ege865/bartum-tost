// Pinned moment #2 (desktop): vertical scroll drives the branch track sideways.
// Each name widens from condensed to normal width as it reaches the middle of the screen.
import { gsap } from 'gsap';

export function branchesTrack() {
  const section = document.querySelector<HTMLElement>('[data-branches]');
  if (!section) return;
  const pin = section.querySelector('[data-branches-pin]')!;
  const viewport = section.querySelector<HTMLElement>('[data-branches-viewport]')!;
  const track = section.querySelector<HTMLElement>('[data-branches-track]')!;

  const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth + parseFloat(getComputedStyle(viewport).paddingLeft) * 2);

  const move = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      pin,
      start: 'top top',
      end: () => '+=' + distance(),
      scrub: 0.8,
      invalidateOnRefresh: true,
    },
  });

  // Each name wipes in from the left as it travels into view; the city behind drifts slower.
  gsap.utils.toArray<HTMLElement>('.branch__name', section).forEach((name) => {
    gsap.fromTo(
      name,
      { clipPath: 'inset(0% 100% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'power2.out',
        scrollTrigger: { trigger: name, containerAnimation: move, start: 'left 92%', end: 'left 55%', scrub: true },
      }
    );
  });
  gsap.fromTo('[data-branches-bg]', { xPercent: 0, scale: 1.15 }, {
    xPercent: -6, ease: 'none',
    scrollTrigger: { trigger: section, start: 'top top', end: () => '+=' + distance(), scrub: 0.8, invalidateOnRefresh: true },
  });
}
