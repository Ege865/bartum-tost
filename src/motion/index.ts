// Motion entry point. Every animation is registered inside one gsap.matchMedia() so each
// breakpoint / preference gets its own context and is reverted cleanly when it stops matching.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { playIntro } from './intro';
import { heroTimeline, heroScroll } from './hero';
import { textReveals, imageReveals, parallax, grillDraw, wordHighlight, footerPress, drift, spin } from './reveals';
import { fireZoom } from './fire';
import { branchesTrack } from './branches';
import { navOnScroll } from './nav';

gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.defaults({ ease: 'expo.out', duration: 1 });

export async function initMotion() {
  const root = document.documentElement;
  // Wait for fonts so SplitText measures real line breaks, not fallback metrics.
  await document.fonts.ready;

  navOnScroll();

  const mm = gsap.matchMedia();
  mm.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      reduce: '(prefers-reduced-motion: reduce)',
      wide: '(min-width: 900px) and (hover: hover)',
    },
    (ctx) => {
      const { motion, wide } = ctx.conditions as Record<string, boolean>;

      if (!motion) {
        // Reduced motion: everything is shown in its final state, nothing is pinned or scrubbed.
        root.classList.remove('intro-on');
        gsap.set('[data-hero-line], [data-hero-fade], [data-hero-frame]', { clearProps: 'all', opacity: 1 });
        root.classList.add('motion-ready');
        return;
      }

      const hero = heroTimeline();
      if (root.classList.contains('intro-on')) {
        playIntro(hero);
      } else {
        hero.play(0);
      }
      root.classList.add('motion-ready');

      textReveals();
      imageReveals();
      parallax();
      grillDraw();
      wordHighlight();
      footerPress();
      heroScroll();
      spin();
      const undoFire = fireZoom(wide);

      // The step wipe, the sideways track and the column drift need room and a precise pointer.
      if (wide) {
        drift();
        branchesTrack();
        return () => undoFire?.();
      }
      return () => undoFire?.();
    }
  );

  // Late-loading images change section heights; re-measure once everything is in.
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
