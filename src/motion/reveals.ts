// Section-level reveals. Each one plays once when its element enters, except the two
// scrubbed effects (word highlight, parallax) that are tied to scroll by design.
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

/** Section headings: lines rise from under a mask. */
export function textReveals() {
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true, // re-splits on resize / font swap and re-runs onSplit
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 105,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        }),
    });
  });
}

/** Photographs open from the bottom edge while the picture settles from a slight zoom. */
export function imageReveals() {
  gsap.utils.toArray<HTMLElement>('[data-reveal-img]').forEach((frame) => {
    const img = frame.querySelector('img');
    gsap
      .timeline({ scrollTrigger: { trigger: frame, start: 'top 80%', once: true } })
      .from(frame, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' })
      .from(img, { scale: 1.25, duration: 1.6 }, 0);
  });
}

/** Parallax on pictures only (never on text): the image drifts inside its fixed frame. */
export function parallax() {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((img) => {
    const target = img.tagName === 'IMG' ? img : img.querySelector('img');
    gsap.fromTo(
      target,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: img.closest('.frame'), start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      }
    );
  });
}

/** Grill marks burn in, stroke by stroke. The hero's own marks are drawn by the hero timeline. */
export function grillDraw() {
  gsap.utils.toArray<SVGElement>('[data-grill]:not(.hero__grill)').forEach((svg) => {
    gsap.fromTo(
      svg.querySelectorAll('line'),
      { strokeDasharray: 1, strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: svg, start: 'top 85%', once: true },
      }
    );
  });
}

/** The story paragraph "toasts" word by word as it is read. */
export function wordHighlight() {
  gsap.utils.toArray<HTMLElement>('[data-highlight]').forEach((el) => {
    SplitText.create(el, {
      type: 'words',
      wordsClass: 'w',
      autoSplit: true,
      onSplit: (self) =>
        gsap.fromTo(self.words, { opacity: 0.22 }, {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 42%', scrub: 0.5 },
        }),
    });
  });
}

/** Footer name is pressed down into place as the page ends. */
export function footerPress() {
  const mark = document.querySelector('[data-press-word]');
  if (!mark) return;
  gsap.fromTo(
    mark,
    { scaleY: 1.6, opacity: 0.2 },
    {
      scaleY: 1,
      opacity: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: mark, start: 'top bottom', end: 'bottom 85%', scrub: 0.6 },
    }
  );
}

/** Frames marked data-speed drift against the scroll by that many percent of their height. */
export function drift() {
  gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
    const s = Number(el.dataset.speed) || 0;
    gsap.fromTo(
      el,
      { yPercent: s },
      { yPercent: -s, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 } }
    );
  });
}

/** The round stamp turns with the scroll. */
export function spin() {
  gsap.utils.toArray<HTMLElement>('[data-spin]').forEach((el) => {
    gsap.to(el, { rotation: 240, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.5 } });
  });
}
