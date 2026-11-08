'use client';

import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useTranslations } from 'next-intl';
import { HOVER_QUERY, REDUCED_QUERY } from '@/hooks/motion';

/*
 * The hero piece: three clusters of systems (Develop, Detect, Respond) drawn in
 * 3D on a 2D canvas. Blue pulses carry "events" from development through
 * detection to response. The structure tilts with the pointer and, while you
 * scroll, flattens into a pipeline that leads into the projects.
 * The three hubs are real buttons, so keyboard and screen reader users get the
 * same labels and links. Nothing on the page depends on this canvas.
 */

type HubId = 'develop' | 'detect' | 'respond';
type V3 = [number, number, number];
interface Node { home: V3; flow: V3; cluster: number; hub?: HubId; size: number }
interface Pulse { path: number[]; seg: number; u: number; speed: number }

const HUBS: { id: HubId; home: V3; flow: V3; target: string }[] = [
  { id: 'develop', home: [-0.8, -0.2, -0.25], flow: [-0.92, 0.05, 0], target: '#software' },
  { id: 'detect', home: [0.02, 0.3, 0.3], flow: [0, 0.05, 0], target: '#case-soc-lab' },
  { id: 'respond', home: [0.82, -0.1, -0.08], flow: [0.92, 0.05, 0], target: '#case-isolation' },
];

function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Each cluster has a shape that says what it does:
// Develop = a lattice of modules, Detect = sensor rings, Respond = a closed shell (containment).
function clusterShape(kind: number, small: boolean): V3[] {
  const pts: V3[] = [];
  if (kind === 0) {
    const n = small ? [-1, 0, 1] : [-1, 0, 1];
    const layers = small ? [0] : [-0.5, 0.5];
    for (const i of n) for (const j of n) for (const k of layers) if (i || j || k) pts.push([i * 0.17, j * 0.17, k * 0.2]);
  } else if (kind === 1) {
    const outer = small ? 8 : 14, inner = small ? 0 : 7;
    for (let i = 0; i < outer; i++) { const a = (i / outer) * Math.PI * 2; pts.push([Math.cos(a) * 0.34, Math.sin(a) * 0.1, Math.sin(a) * 0.32]); }
    for (let i = 0; i < inner; i++) { const a = (i / inner) * Math.PI * 2 + 0.3; pts.push([Math.cos(a) * 0.18, Math.sin(a) * 0.16 + 0.02, Math.sin(a) * 0.05]); }
  } else {
    const count = small ? 8 : 16;
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963;
      pts.push([Math.cos(th) * r * 0.25, y * 0.25, Math.sin(th) * r * 0.25]);
    }
  }
  return pts;
}

function buildGraph(small: boolean) {
  const rand = rng(42);
  const nodes: Node[] = HUBS.map((h, i) => ({ home: h.home, flow: h.flow, cluster: i, hub: h.id, size: 1 }));
  HUBS.forEach((h, c) => {
    clusterShape(c, small).forEach((o) => {
      nodes.push({
        home: [h.home[0] + o[0], h.home[1] + o[1], h.home[2] + o[2]],
        // in the flattened "pipeline" each cluster spreads along one line
        flow: [h.flow[0] + o[0] * 0.8 + o[2] * 0.4, h.flow[1] + o[1] * 0.15, 0],
        cluster: c,
        size: 0.7 + rand() * 0.6,
      });
    });
  });
  const d = (a: V3, b: V3) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  const edges = new Set<string>();
  const add = (a: number, b: number) => edges.add(a < b ? `${a}-${b}` : `${b}-${a}`);
  const k = [2, 2, 3]; // neighbours per node: lattice and rings stay sparse, the shell closes up
  nodes.forEach((n, i) => {
    if (n.hub) return;
    const near = nodes
      .map((m, j) => ({ j, dist: m.cluster === n.cluster && j !== i && !m.hub ? d(n.home, m.home) : 9 }))
      .sort((a, b) => a.dist - b.dist);
    near.slice(0, k[n.cluster]).forEach(({ j }) => add(i, j));
    // spokes: lattice centre column and inner ring connect to the hub; the shell does not (it encloses it)
    if (n.cluster === 0 && Math.abs(n.home[0] - HUBS[0].home[0]) < 0.01) add(i, 0);
    if (n.cluster === 1 && d(n.home, HUBS[1].home) < 0.25) add(i, 1);
  });
  add(0, 1); add(1, 2);
  const edgeList = [...edges].map((e) => e.split('-').map(Number) as [number, number]);
  const members = (c: number) => nodes.map((n, i) => (n.cluster === c && !n.hub ? i : -1)).filter((i) => i >= 0);
  const [devs, dets, resps] = [members(0), members(1), members(2)];
  const pick = (arr: number[]) => arr[Math.floor(rand() * arr.length)];
  // Event routes: a change leaves development, is seen by detection, reaches response.
  const routes: number[][] = [];
  for (let i = 0; i < 14; i++) routes.push([pick(devs), 0, 1, 2, pick(resps)]);
  for (let i = 0; i < 8; i++) routes.push([pick(dets), 1, 2, pick(resps)]);
  return { nodes, edges: edgeList, routes };
}

const Root = styled.div`
  position: absolute; inset: 0; z-index: 0; overflow: hidden;
  canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
`;

const HubBtn = styled.a<{ $active: boolean; $touch: boolean; $left: boolean }>`
  position: absolute; left: 0; top: 0; width: 3rem; height: 3rem; margin: -1.5rem 0 0 -1.5rem;
  border-radius: 50%; z-index: 2;
  &:focus-visible { outline: 2px solid var(--blue-light); outline-offset: 0; }
  span {
    position: absolute; left: 3.2rem; top: 50%; translate: 0 -50%;
    white-space: nowrap; pointer-events: none;
    font-family: ${({ theme }) => theme.fonts.display}; font-size: clamp(1.25rem, 2.4vw, 2.25rem); letter-spacing: -0.03em; line-height: 1;
    color: var(--soft);
    clip-path: inset(0 100% 0 0);
    transition: clip-path 0.6s ${({ theme }) => theme.ease};
  }
  small {
    display: block; margin-top: 0.4rem; font-family: ${({ theme }) => theme.fonts.body};
    font-size: 0.8rem; letter-spacing: 0; color: var(--blue-light);
  }
  ${({ $active, $touch }) => ($active || $touch) && css`span { clip-path: inset(0 0 0 0); }`}
  ${({ $touch }) => $touch && css`span { font-size: 1rem; left: 2.6rem; } small { display: none; }`}
  ${({ $left, $touch }) => $left && css`span { left: auto; right: ${$touch ? '2.6rem' : '3.2rem'}; text-align: right; clip-path: inset(0 0 0 100%); }`}
  ${({ $left, $active, $touch }) => $left && ($active || $touch) && css`span { clip-path: inset(0 0 0 0); }`}
`;

export default function EventNetwork({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const t = useTranslations('hero');
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hubRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const activeRef = useRef<number>(-1);
  const [active, setActive] = useState(-1);
  const [touch, setTouch] = useState(false);

  const activate = (i: number) => { activeRef.current = i; setActive(i); };

  useEffect(() => {
    const root = rootRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const canHover = window.matchMedia(HOVER_QUERY).matches;
    const reduced = window.matchMedia(REDUCED_QUERY).matches;
    setTouch(!canHover);

    let W = 0, H = 0, dpr = 1, small = false;
    let graph = buildGraph(false);
    const rot = { x: 0, y: 0 }, target = { x: 0, y: 0 };
    const flash = [0, 0, 0];
    let pulses: Pulse[] = [];
    let spawnIn = 0.3, time = 0, last = performance.now(), raf = 0, visible = true;

    const resize = () => {
      const r = root.getBoundingClientRect();
      W = r.width; H = r.height; dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      const nextSmall = W < 900;
      if (nextSmall !== small) { small = nextSmall; graph = buildGraph(small); pulses = []; }
      if (reduced) draw(0);
    };

    // Composition: the network sits right of the text on desktop, above it on phones.
    const frame = () => {
      if (small) return { cx: W * 0.5, cy: H * 0.24, R: Math.min(W * 0.42, H * 0.22) };
      return { cx: W * 0.62, cy: H * 0.4, R: Math.min(W * 0.28, H * 0.46) };
    };

    const project = (p: V3, m: number, f: ReturnType<typeof frame>) => {
      const cy = Math.cos(rot.y), sy = Math.sin(rot.y), cx = Math.cos(rot.x), sx = Math.sin(rot.x);
      let x = p[0] * cy - p[2] * sy;
      let z = p[0] * sy + p[2] * cy;
      const y = p[1] * cx - z * sx;
      z = p[1] * sx + z * cx;
      const s = 2.6 / (2.6 + z);
      // when flattened, the pipeline slides down toward the projects
      x = f.cx + x * f.R * s * (1 + m * (small ? 0.1 : 0.35));
      return { x, y: f.cy + y * f.R * s + m * H * 0.18, z, s };
    };

    const pos = (n: Node, m: number): V3 => [
      n.home[0] + (n.flow[0] - n.home[0]) * m,
      n.home[1] + (n.flow[1] - n.home[1]) * m,
      n.home[2] + (n.flow[2] - n.home[2]) * m,
    ];

    function draw(dt: number) {
      const p = Math.min(Math.max(progressRef.current, 0), 1);
      const m = reduced ? 0 : p * p * (3 - 2 * p);
      const f = frame();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const pts = graph.nodes.map((n) => project(pos(n, m), m, f));

      // edges
      ctx.lineWidth = 1;
      for (const [a, b] of graph.edges) {
        const A = pts[a], B = pts[b];
        const depth = (A.s + B.s) / 2;
        const hubEdge = graph.nodes[a].hub && graph.nodes[b].hub;
        ctx.strokeStyle = `rgba(243,243,241,${(hubEdge ? 0.32 : 0.1 + (depth - 0.7) * 0.35).toFixed(3)})`;
        ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
      }

      // nodes, far to near; small squares read as machines
      const order = pts.map((q, i) => i).sort((i, j) => pts[i].z - pts[j].z);
      for (const i of order) {
        const n = graph.nodes[i], q = pts[i];
        if (n.hub) continue;
        const sz = (1.6 + n.size * 1.6) * q.s;
        ctx.fillStyle = `rgba(243,243,241,${Math.min(0.9, 0.25 + (q.s - 0.6) * 0.9).toFixed(3)})`;
        ctx.fillRect(q.x - sz / 2, q.y - sz / 2, sz, sz);
      }

      // pulses
      if (!reduced) {
        spawnIn -= dt;
        if (spawnIn <= 0 && pulses.length < (small ? 3 : 6)) {
          const path = graph.routes[Math.floor(Math.random() * graph.routes.length)];
          pulses.push({ path, seg: 0, u: 0, speed: 0.55 + Math.random() * 0.25 });
          spawnIn = small ? 1.4 : 0.8;
        }
      }
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const drawPulse = (x: number, y: number, tx: number, ty: number) => {
        const g = ctx.createLinearGradient(tx, ty, x, y);
        g.addColorStop(0, 'rgba(46,75,255,0)'); g.addColorStop(1, 'rgba(110,135,255,0.9)');
        ctx.strokeStyle = g; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(x, y); ctx.stroke();
        ctx.fillStyle = '#c5ceff';
        ctx.beginPath(); ctx.arc(x, y, 2.4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(46,75,255,0.35)';
        ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
      };
      if (reduced) {
        // a still frame: three events caught mid-route
        [[3 + 2, 0, 0.6], [0, 1, 0.5], [1, 2, 0.45]].forEach(([a, b, u]) => {
          const A = pts[a], B = pts[b];
          drawPulse(A.x + (B.x - A.x) * u, A.y + (B.y - A.y) * u, A.x + (B.x - A.x) * (u - 0.2), A.y + (B.y - A.y) * (u - 0.2));
        });
      }
      pulses = pulses.filter((pl) => {
        pl.u += dt * pl.speed * 1.6;
        while (pl.u >= 1) {
          pl.u -= 1; pl.seg += 1;
          const reached = pl.path[pl.seg];
          if (reached !== undefined && reached < 3) flash[reached] = 1;
          if (pl.seg >= pl.path.length - 1) return false;
        }
        const A = pts[pl.path[pl.seg]], B = pts[pl.path[pl.seg + 1]];
        const e = pl.u;
        const tail = Math.max(0, e - 0.35);
        drawPulse(A.x + (B.x - A.x) * e, A.y + (B.y - A.y) * e, A.x + (B.x - A.x) * tail, A.y + (B.y - A.y) * tail);
        return true;
      });
      ctx.restore();

      // hubs
      HUBS.forEach((h, i) => {
        const q = pts[i];
        const on = activeRef.current === i;
        flash[i] = Math.max(0, flash[i] - dt * 1.6);
        const r = (on ? 9 : 6) * q.s;
        if (flash[i] > 0) {
          ctx.strokeStyle = `rgba(110,135,255,${(flash[i] * 0.7).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(q.x, q.y, r + (1 - flash[i]) * 22, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.fillStyle = '#17191d';
        ctx.strokeStyle = on ? '#6e87ff' : 'rgba(243,243,241,0.85)';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(q.x, q.y, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = on ? '#6e87ff' : '#f3f3f1';
        ctx.beginPath(); ctx.arc(q.x, q.y, 2, 0, Math.PI * 2); ctx.fill();
        const btn = hubRefs.current[i];
        if (btn) btn.style.transform = `translate3d(${q.x.toFixed(1)}px, ${q.y.toFixed(1)}px, 0)`;
      });
    }

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now; time += dt;
      const p = Math.min(Math.max(progressRef.current, 0), 1);
      const calm = 1 - p;
      rot.x += ((target.x + Math.sin(time * 0.21) * 0.06) * calm - rot.x) * 0.05;
      rot.y += ((target.y + Math.sin(time * 0.13) * 0.18) * calm - rot.y) * 0.05;
      draw(dt);
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => { if (!raf && !reduced) { last = performance.now(); raf = requestAnimationFrame(loop); } };

    const onPointer = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      target.y = (px - 0.5) * 0.7;
      target.x = (py - 0.5) * -0.4;
      // reveal the nearest hub when the pointer comes close
      let best = -1, bestD = 70;
      hubRefs.current.forEach((b, i) => {
        if (!b) return;
        const br = b.getBoundingClientRect();
        const d = Math.hypot(e.clientX - (br.left + br.width / 2), e.clientY - (br.top + br.height / 2));
        if (d < bestD) { bestD = d; best = i; }
      });
      if (best !== activeRef.current && document.activeElement?.parentElement !== root) activate(best);
      if (reduced) draw(0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(root);
    resize();
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) start(); });
    io.observe(root);
    const onVis = () => { if (!document.hidden) start(); };
    document.addEventListener('visibilitychange', onVis);
    const hero = root.parentElement!;
    const onLeave = () => { target.x = 0; target.y = 0; if (document.activeElement?.parentElement !== root) activate(-1); };
    if (canHover) { hero.addEventListener('pointermove', onPointer); hero.addEventListener('pointerleave', onLeave); }
    if (reduced) draw(0); else start();

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      hero.removeEventListener('pointermove', onPointer);
      hero.removeEventListener('pointerleave', onLeave);
    };
  }, [progressRef]);

  return (
    <Root ref={rootRef}>
      <canvas ref={canvasRef} aria-hidden="true" />
      {HUBS.map((h, i) => (
        <HubBtn
          key={h.id}
          ref={(el) => { hubRefs.current[i] = el; }}
          href={h.target}
          $active={active === i}
          $touch={touch}
          $left={h.id === 'respond'}
          aria-label={`${t(`nodes.${h.id}`)}: ${t(`nodes.${h.id}Hint`)}`}
          onFocus={() => activate(i)}
          onBlur={() => activate(-1)}
          onMouseEnter={() => activate(i)}
        >
          <span aria-hidden="true">
            {t(`nodes.${h.id}`)}
            <small>{t(`nodes.${h.id}Hint`)}</small>
          </span>
        </HubBtn>
      ))}
    </Root>
  );
}
