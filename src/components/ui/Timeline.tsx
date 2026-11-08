'use client';

import styled from 'styled-components';
import { useLocale } from 'next-intl';
import { timeline } from '@/data/experience';
import { useInView } from '@/hooks/motion';
import type { Locale } from '@/types';

const START = new Date('2024-01-01').getTime();
const END = new Date('2027-01-01').getTime();
const pos = (ym: string) => ((new Date(`${ym}-01`).getTime() - START) / (END - START)) * 100;

// The career change as one line. On reveal, the line draws and a pulse travels to "Now",
// the same motif as the hero network. Vertical list on small screens.
const Track = styled.div`
  position: relative; height: 16rem;
  ol { position: absolute; inset: 0; }

  &::before {
    content: ''; position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: var(--line);
  }
  .fill {
    position: absolute; left: 0; top: 50%; height: 1px; width: var(--now); background: var(--fg);
    transform-origin: left; transition: transform 1.8s ${({ theme }) => theme.ease} 0.2s;
  }
  .pulse {
    position: absolute; top: calc(50% - 3px); left: var(--now); width: 7px; height: 7px; margin-left: -3.5px; border-radius: 50%;
    background: var(--blue-light); box-shadow: -16px 0 14px -4px rgba(46, 75, 255, 0.6);
    transition: left 1.8s ${({ theme }) => theme.ease} 0.2s, opacity 0.3s ease;
  }
  &[data-armed='true']:not([data-in='true']) .fill { transform: scaleX(0); }
  &[data-armed='true']:not([data-in='true']) .pulse { left: 0; opacity: 0; }
  &[data-armed='true']:not([data-in='true']) li { opacity: 0; }

  @media (max-width: ${({ theme }) => theme.bp.md}) {
    height: auto; padding-left: 1.75rem;
    ol { position: static; display: grid; gap: 1.75rem; }
    &::before { left: 0.3rem; right: auto; top: 0.5rem; bottom: 0.5rem; width: 1px; height: auto; }
    .fill, .pulse { display: none; }
  }
`;

const Event = styled.li<{ $x: number; $up: boolean; $current?: boolean; $align: 'start' | 'center' | 'end'; $i: number }>`
  position: absolute; left: ${({ $x }) => $x}%; top: 50%;
  transition: opacity 0.6s ease ${({ $i }) => 0.3 + $i * 0.25}s;
  &::before {
    content: ''; position: absolute; left: 0; top: 0; width: 0.7rem; height: 0.7rem; border-radius: 50%;
    transform: translate(-50%, -50%);
    background: ${({ $current }) => ($current ? 'var(--blue-light)' : 'var(--bg)')};
    border: 1.5px solid ${({ $current }) => ($current ? 'var(--blue-light)' : 'var(--fg)')};
  }
  div {
    position: absolute; width: 13rem;
    ${({ $up }) => ($up ? 'bottom: 1.4rem;' : 'top: 1.4rem;')}
    ${({ $align }) => ($align === 'start' ? 'left: -0.35rem;' : $align === 'end' ? 'right: -0.35rem; text-align: right;' : 'left: 50%; transform: translateX(-50%); text-align: center;')}
  }
  span { display: block; font-size: ${({ theme }) => theme.size.s}; color: ${({ $current }) => ($current ? 'var(--blue-light)' : 'var(--muted)')}; }
  p { font-family: ${({ theme }) => theme.fonts.display}; font-size: 1.15rem; line-height: 1.25; letter-spacing: -0.01em; }

  @media (max-width: ${({ theme }) => theme.bp.md}) {
    position: relative; left: auto; top: auto;
    &::before { left: -1.45rem; top: 0.7rem; }
    div { position: static; width: auto; transform: none; text-align: left; }
  }
`;

export default function Timeline({ titleId }: { titleId: string }) {
  const locale = useLocale() as Locale;
  const ref = useInView<HTMLDivElement>(0.35);
  const now = pos(timeline[timeline.length - 1].date);
  return (
    <Track ref={ref} style={{ '--now': `${now}%` } as React.CSSProperties}>
      <span className="fill" aria-hidden="true" />
      <span className="pulse" aria-hidden="true" />
      <ol aria-labelledby={titleId}>
      {timeline.map((e, i) => {
        const x = pos(e.date);
        return (
          <Event key={e.date} $x={x} $i={i} $up={i % 2 === 0} $current={e.current} $align={x < 12 ? 'start' : x > 85 ? 'end' : 'center'}
            aria-current={e.current ? 'step' : undefined}>
            <div><span>{e.when[locale]}</span><p>{e.label[locale]}</p></div>
          </Event>
        );
      })}
      </ol>
    </Track>
  );
}
