'use client';

import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import { Wrap, ArrowLink } from '@/components/ui/Layout';
import { LINKS } from '@/data/contact';

const Foot = styled.footer`
  background: var(--bg); color: var(--muted); font-size: ${({ theme }) => theme.size.s};
  padding-block: 2rem 2.5rem; border-top: 1px solid var(--line);
`;

const Row = styled(Wrap)`
  display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.75rem 2rem;
  ul { display: flex; flex-wrap: wrap; gap: 0.5rem 1.75rem; }
  a { color: var(--fg); }
`;

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <Foot data-tone="dark">
      <Row>
        <p>© 2026 Tales Lima de Paula. {t('made')}</p>
        <ul>
          <li><ArrowLink href={LINKS.source} external>{t('source')}</ArrowLink></li>
          <li><ArrowLink href="#top" dir="e">{t('top')}</ArrowLink></li>
        </ul>
      </Row>
    </Foot>
  );
}
