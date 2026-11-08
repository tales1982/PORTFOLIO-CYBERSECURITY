'use client';

import { useEffect, useRef, useState } from 'react';

const query = (q: string) => typeof window !== 'undefined' && window.matchMedia(q).matches;
export const HOVER_QUERY = '(hover: hover) and (pointer: fine)';
export const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

export function useMediaQuery(q: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, [q]);
  return match;
}

/**
 * Adds data-in="true" once the element enters the viewport.
 * Elements start visible in the server HTML; they are only hidden after
 * hydration ("armed"), so the page still works without JavaScript.
 */
export function useInView<T extends HTMLElement>(threshold = 0.2, rootMargin = '0px 0px -8% 0px') {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.dataset.armed = 'true';
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.in = 'true';
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return ref;
}

/** Vertical parallax: the element drifts at `speed` relative to its own scroll position. */
export function useParallax<T extends HTMLElement>(speed = 0.12) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || query(REDUCED_QUERY)) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.parentElement!.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      const offset = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      el.style.transform = '';
    };
  }, [speed]);
  return ref;
}

/**
 * Magnetic pull for primary buttons. The listener sits on the (static) wrapper,
 * so the clickable area never moves away from the pointer. Off on touch and
 * with reduced motion.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const wrap = ref.current;
    const target = wrap?.firstElementChild as HTMLElement | null;
    if (!wrap || !target || !query(HOVER_QUERY) || query(REDUCED_QUERY)) return;
    const label = target.querySelector<HTMLElement>('[data-magnetic-label]');
    let raf = 0, x = 0, y = 0, tx = 0, ty = 0;
    const loop = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      target.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      if (label) label.style.transform = `translate3d(${(x * 0.35).toFixed(2)}px, ${(y * 0.35).toFixed(2)}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.05 ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const move = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
      kick();
    };
    const leave = () => { tx = 0; ty = 0; kick(); };
    wrap.addEventListener('pointermove', move);
    wrap.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener('pointermove', move);
      wrap.removeEventListener('pointerleave', leave);
      target.style.transform = '';
      if (label) label.style.transform = '';
    };
  }, [strength]);
  return ref;
}
