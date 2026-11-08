'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import { useInView, REDUCED_QUERY } from '@/hooks/motion';

/*
 * Simplified architecture diagrams, drawn from what each project actually does.
 * They are schematic on purpose and say so in their caption.
 * Line style encodes status: solid = built, blue dashed = in progress, dotted = planned.
 */

type EdgeState = 'done' | 'progress' | 'next';
interface DNode { id: string; x: number; y: number }
interface DEdge { from: string; to: string; state?: EdgeState }
interface Spec { nodes: DNode[]; edges: DEdge[]; order: string[]; group?: { ids: string[] } }

export type DiagramId = 'soc' | 'isolation' | 'continuity';

const SPECS: Record<DiagramId, Spec> = {
  soc: {
    nodes: [
      { id: 'endpoints', x: 150, y: 110 }, { id: 'network', x: 150, y: 330 },
      { id: 'wazuh', x: 490, y: 110 }, { id: 'suricata', x: 490, y: 330 },
      { id: 'thehive', x: 830, y: 110 }, { id: 'analyst', x: 830, y: 330 },
    ],
    edges: [
      { from: 'endpoints', to: 'wazuh' }, { from: 'network', to: 'suricata' }, { from: 'suricata', to: 'wazuh' },
      { from: 'wazuh', to: 'thehive' }, { from: 'thehive', to: 'analyst' },
    ],
    order: ['endpoints', 'network', 'suricata', 'wazuh', 'thehive', 'analyst'],
  },
  isolation: {
    nodes: [
      { id: 'alert', x: 140, y: 220 }, { id: 'automation', x: 460, y: 220 },
      { id: 'quarantine', x: 830, y: 90 }, { id: 'worker', x: 830, y: 220 }, { id: 'report', x: 830, y: 350 },
    ],
    edges: [
      { from: 'alert', to: 'automation' }, { from: 'automation', to: 'quarantine' },
      { from: 'automation', to: 'worker' }, { from: 'automation', to: 'report' },
    ],
    order: ['alert', 'automation', 'quarantine', 'worker', 'report'],
  },
  continuity: {
    nodes: [
      { id: 'transA', x: 220, y: 120 }, { id: 'transB', x: 220, y: 340 },
      { id: 'detection', x: 720, y: 120 }, { id: 'isolation', x: 720, y: 340 },
    ],
    edges: [
      { from: 'transA', to: 'detection', state: 'progress' },
      { from: 'detection', to: 'isolation', state: 'progress' },
      { from: 'isolation', to: 'transB', state: 'next' },
    ],
    order: ['transA', 'detection', 'isolation', 'transB'],
    group: { ids: ['transA', 'transB'] },
  },
};

const NW = 250, NH = 92;

const Figure = styled.figure`
  --diagram-line: color-mix(in srgb, var(--fg) 45%, transparent);
  svg { width: 100%; height: auto; overflow: visible; }
  .wide { display: block; } .tall { display: none; max-width: 26rem; margin-inline: auto; }
  @media (max-width: ${({ theme }) => theme.bp.md}) { .wide { display: none; } .tall { display: block; } }

  rect.node { fill: var(--bg); stroke: var(--line); }
  rect.group { fill: none; stroke: var(--diagram-line); stroke-dasharray: 2 6; }
  text { fill: var(--fg); font-family: ${({ theme }) => theme.fonts.body}; }
  text.label { font-size: 21px; font-weight: 600; }
  text.sub { font-size: 14px; fill: var(--muted); }
  text.grouplabel { font-size: 14px; fill: var(--muted); }
  path.edge { fill: none; stroke: var(--diagram-line); stroke-width: 1.5; }
  path.edge.progress { stroke: var(--accent); stroke-dasharray: 7 6; animation: dash-run 1.2s linear infinite; }
  path.edge.next { stroke-dasharray: 1.5 6; stroke-linecap: round; }
  circle.pulse { fill: var(--accent); }
  @keyframes dash-run { to { stroke-dashoffset: -13; } }

  /* draw-on when the diagram enters the viewport */
  path.edge { transition: opacity 0.8s ease; transition-delay: calc(var(--k) * 0.12s + 0.2s); }
  rect.node, text { transition: opacity 0.7s ease; transition-delay: calc(var(--k) * 0.08s); }
  &[data-armed='true']:not([data-in='true']) :is(path.edge, rect.node, text) { opacity: 0; }

  figcaption { margin-top: 1.25rem; font-size: ${({ theme }) => theme.size.s}; color: var(--muted); }
  .legend { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; margin-top: 0.75rem; }
  .legend span { display: inline-flex; align-items: center; gap: 0.5rem; }
  .legend i { width: 2rem; height: 0; border-top: 1.5px solid var(--diagram-line); }
  .legend i.progress { border-top: 1.5px dashed var(--accent); }
  .legend i.next { border-top: 2px dotted var(--diagram-line); }
`;

function curve(a: DNode, b: DNode, tall: boolean) {
  if (tall) {
    const adjacent = Math.abs(a.y - b.y) <= 140;
    if (adjacent) return `M${a.x} ${a.y + NH / 2} L${b.x} ${b.y - NH / 2}`;
    const side = a.x + NW / 2;
    return `M${side} ${a.y} C${side + 70} ${a.y}, ${side + 70} ${b.y}, ${side} ${b.y}`;
  }
  if (Math.abs(a.x - b.x) < 10) return `M${a.x} ${a.y + (b.y > a.y ? NH / 2 : -NH / 2)} L${b.x} ${b.y + (b.y > a.y ? -NH / 2 : NH / 2)}`;
  const x1 = a.x + (b.x > a.x ? NW / 2 : -NW / 2);
  const x2 = b.x + (b.x > a.x ? -NW / 2 : NW / 2);
  const mx = (x1 + x2) / 2;
  return `M${x1} ${a.y} C${mx} ${a.y}, ${mx} ${b.y}, ${x2} ${b.y}`;
}

function Svg({ spec, id, tall, pulses, t }: { spec: Spec; id: DiagramId; tall: boolean; pulses: boolean; t: (k: string) => string }) {
  const nodes: DNode[] = tall ? spec.order.map((nid, i) => ({ id: nid, x: 170, y: 70 + i * 140 })) : spec.nodes;
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const vb = tall ? `0 0 400 ${spec.order.length * 140}` : '0 0 1000 440';
  let group = null;
  if (spec.group && !tall) {
    const g = spec.group.ids.map((i) => byId[i]);
    const minY = Math.min(...g.map((n) => n.y)) - NH / 2 - 36, maxY = Math.max(...g.map((n) => n.y)) + NH / 2 + 18;
    group = (
      <g>
        <rect className="group" x={g[0].x - NW / 2 - 18} y={minY} width={NW + 36} height={maxY - minY} rx="14" />
        <text className="grouplabel" x={g[0].x - NW / 2} y={minY + 22}>{t(`${id}.group`)}</text>
      </g>
    );
  }
  return (
    <svg className={tall ? 'tall' : 'wide'} viewBox={vb} role="img" aria-labelledby={`dg-${id}-title`}>
      {group}
      {spec.edges.map((e, k) => {
        const d = curve(byId[e.from], byId[e.to], tall);
        const state = e.state ?? 'done';
        return (
          <g key={k}>
            <path className={`edge ${state}`} d={d} style={{ '--k': k } as React.CSSProperties} />
            {pulses && state !== 'next' && (
              <circle className="pulse" r="4">
                <animateMotion dur={`${2.4 + k * 0.3}s`} begin={`${k * 0.45}s`} repeatCount="indefinite" path={d} />
              </circle>
            )}
          </g>
        );
      })}
      {nodes.map((n, k) => (
        <g key={n.id} style={{ '--k': k } as React.CSSProperties}>
          <rect className="node" x={n.x - NW / 2} y={n.y - NH / 2} width={NW} height={NH} rx="10" style={{ '--k': k } as React.CSSProperties} />
          <text className="label" x={n.x - NW / 2 + 20} y={n.y - 6} style={{ '--k': k } as React.CSSProperties}>{t(`${id}.${n.id}`)}</text>
          <text className="sub" x={n.x - NW / 2 + 20} y={n.y + 20} style={{ '--k': k } as React.CSSProperties}>{t(`${id}.${n.id}Sub`)}</text>
        </g>
      ))}
    </svg>
  );
}

export default function Diagram({ id, legend = false }: { id: DiagramId; legend?: boolean }) {
  const t = useTranslations('diagrams');
  const ref = useInView<HTMLElement>(0.25);
  const [pulses, setPulses] = useState(false);
  useEffect(() => setPulses(!window.matchMedia(REDUCED_QUERY).matches), []);
  const spec = SPECS[id];
  return (
    <Figure ref={ref}>
      <span className="visually-hidden" id={`dg-${id}-title`}>{t(`${id}.title`)}</span>
      <Svg spec={spec} id={id} tall={false} pulses={pulses} t={t} />
      <Svg spec={spec} id={id} tall pulses={pulses} t={t} />
      <figcaption>
        {t(legend ? 'captionStatus' : 'caption')}
        {legend && (
          <span className="legend">
            <span><i />{t('built')}</span>
            <span><i className="progress" />{t('inProgress')}</span>
            <span><i className="next" />{t('planned')}</span>
          </span>
        )}
      </figcaption>
    </Figure>
  );
}

const PreviewBox = styled(Figure)`
  height: 100%; display: flex; align-items: center; justify-content: center; padding: 6%;
  svg { width: 100%; }
  background: var(--paper);
  --bg: #fff; --fg: var(--ink); --muted: #575c65; --line: rgba(21,23,26,0.15); --raised: #fff; --accent: var(--blue);
  .wide { display: block !important; } .tall { display: none !important; }
`;

// Compact, static version used as a project preview image.
export function DiagramPreview({ id }: { id: DiagramId }) {
  const t = useTranslations('diagrams');
  return (
    <PreviewBox as="div" aria-hidden="true">
      <Svg spec={SPECS[id]} id={id} tall={false} pulses={false} t={t} />
    </PreviewBox>
  );
}
