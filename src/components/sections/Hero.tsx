'use client';

import styled, { keyframes } from 'styled-components';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

const gridMove = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 40px 40px; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-8px) rotate(1deg); }
  66% { transform: translateY(-4px) rotate(-1deg); }
`;

const glowPulse = keyframes`
  0%, 100% { opacity: 0.4; filter: blur(40px); }
  50% { opacity: 0.7; filter: blur(60px); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.heroBg};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(77, 184, 255, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(77, 184, 255, 0.06) 1px, transparent 1px);
    background-size: 40px 40px;
    animation: ${gridMove} 8s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 80% 60% at 50% 50%,
      rgba(0, 82, 204, 0.12) 0%,
      transparent 70%
    );
  }
`;

const GlowOrb = styled.div<{ size: number; x: number; y: number; color: string }>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  left: ${({ x }) => x}%;
  top: ${({ y }) => y}%;
  background: ${({ color }) => color};
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: ${glowPulse} 4s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  width: 100%;
  padding-top: var(--header-height);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: var(--header-height) ${({ theme }) => theme.spacing.sm} 0;
  }
`;

const HeroInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: ${({ theme }) => theme.spacing['2xl']};
  align-items: center;
  min-height: calc(100vh - var(--header-height));
  padding: ${({ theme }) => theme.spacing['2xl']} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  background: rgba(77, 184, 255, 0.1);
  border: 1px solid rgba(77, 184, 255, 0.25);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.8125rem;
  color: rgba(200, 230, 255, 0.9);
  font-family: ${({ theme }) => theme.fonts.mono};
  width: fit-content;
  animation: ${fadeInUp} 0.6s ease 0.1s both;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 0 auto;
  }
`;

const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4ade80;
  display: inline-block;
  box-shadow: 0 0 8px #4ade80;
  animation: ${blink} 2s ease infinite;
`;

const Greeting = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: rgba(200, 230, 255, 0.7);
  font-family: ${({ theme }) => theme.fonts.mono};
  animation: ${fadeInUp} 0.6s ease 0.2s both;
`;

const HeroName = styled.h1`
  font-size: clamp(2.5rem, 5vw, ${({ theme }) => theme.fontSizes['7xl']});
  font-weight: 800;
  color: #ffffff;
  line-height: 1.1;
  letter-spacing: -0.02em;
  animation: ${fadeInUp} 0.6s ease 0.3s both;

  span {
    background: linear-gradient(135deg, #4db8ff 0%, #00e5ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: rgba(180, 210, 255, 0.8);
  font-family: ${({ theme }) => theme.fonts.mono};
  animation: ${fadeInUp} 0.6s ease 0.4s both;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const HeroHeadline = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: rgba(220, 235, 255, 0.85);
  line-height: 1.6;
  max-width: 580px;
  animation: ${fadeInUp} 0.6s ease 0.5s both;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 0 auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const HeroButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.875rem;
  animation: ${fadeInUp} 0.6s ease 0.6s both;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

const HeroBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  animation: ${fadeInUp} 0.6s ease 0.7s both;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

const HeroBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.75rem;
  background: rgba(77, 184, 255, 0.08);
  border: 1px solid rgba(77, 184, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.8125rem;
  color: rgba(180, 220, 255, 0.85);
  font-family: ${({ theme }) => theme.fonts.mono};

  &::before {
    content: '#';
    color: rgba(77, 184, 255, 0.6);
  }
`;

const HeroRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const ShieldWrapper = styled.div`
  animation: ${float} 6s ease-in-out infinite;
  position: relative;
`;

const ShieldBg = styled.div`
  position: absolute;
  inset: -30px;
  background: radial-gradient(ellipse at center, rgba(0, 180, 216, 0.15) 0%, transparent 70%);
  border-radius: 50%;
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(180, 210, 255, 0.5);
  font-size: 0.75rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  animation: ${fadeInUp} 0.6s ease 1s both;
  cursor: default;
`;

const ScrollLine = styled.div`
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, rgba(77, 184, 255, 0.5), transparent);
`;

const PrimaryBtn = styled(Button)`
  background: linear-gradient(135deg, #0066cc 0%, #00b4d8 100%) !important;
  color: #ffffff !important;
  border-color: transparent !important;
  box-shadow: 0 4px 20px rgba(0, 102, 204, 0.4) !important;

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 102, 204, 0.5) !important;
    transform: translateY(-2px) !important;
  }
`;

const OutlineBtn = styled(Button)`
  background: rgba(255, 255, 255, 0.05) !important;
  color: rgba(200, 230, 255, 0.9) !important;
  border-color: rgba(77, 184, 255, 0.4) !important;

  &:hover {
    background: rgba(77, 184, 255, 0.1) !important;
    border-color: rgba(77, 184, 255, 0.7) !important;
    color: #ffffff !important;
    transform: translateY(-2px) !important;
  }
`;

export default function Hero() {
  const t = useTranslations('hero');

  const badges = [
    t('badge1'),
    t('badge2'),
    t('badge3'),
    t('badge4'),
  ];

  return (
    <HeroSection id="hero">
      <GlowOrb size={400} x={15} y={20} color="#0066CC" />
      <GlowOrb size={300} x={75} y={60} color="#00B4D8" />
      <GlowOrb size={200} x={85} y={10} color="#4DB8FF" />

      <HeroContent>
        <HeroInner>
          <HeroLeft>
            <StatusBadge>
              <StatusDot />
              {t('statusLabel')}
            </StatusBadge>

            <Greeting>{t('greeting')}</Greeting>

            <HeroName>
              Tales Lima<br />
              <span>de Paula</span>
            </HeroName>

            <HeroSubtitle>{t('subtitle')}</HeroSubtitle>

            <HeroHeadline>{t('headline')}</HeroHeadline>

            <HeroButtons>
              <PrimaryBtn $size="lg" as="a" href="#projects">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
                {t('viewProjects')}
              </PrimaryBtn>
              <OutlineBtn $size="lg" $variant="outline" as="a" href="#certifications">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                </svg>
                {t('viewCertifications')}
              </OutlineBtn>
              <OutlineBtn $size="lg" $variant="outline" as="a" href="#contact">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                {t('contactMe')}
              </OutlineBtn>
            </HeroButtons>

            <HeroBadges>
              {badges.map((badge) => (
                <HeroBadge key={badge}>{badge}</HeroBadge>
              ))}
            </HeroBadges>
          </HeroLeft>

          <HeroRight>
            <ShieldWrapper>
              <ShieldBg />
              <svg
                width="320"
                height="380"
                viewBox="0 0 320 380"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="shieldGrad1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0052CC" />
                    <stop offset="100%" stopColor="#00B4D8" />
                  </linearGradient>
                  <linearGradient id="shieldGrad2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#4DB8FF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.1" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path
                  d="M160 20L30 75V185C30 265 85 335 160 360C235 335 290 265 290 185V75L160 20Z"
                  fill="url(#shieldGrad2)"
                  stroke="url(#shieldGrad1)"
                  strokeWidth="2.5"
                  filter="url(#glow)"
                />

                <path
                  d="M160 20L30 75V185C30 265 85 335 160 360C235 335 290 265 290 185V75L160 20Z"
                  fill="none"
                  stroke="rgba(77, 184, 255, 0.15)"
                  strokeWidth="1"
                  strokeDasharray="8 4"
                  transform="scale(0.88) translate(21 26)"
                />

                <path
                  d="M110 185L142 217L210 145"
                  stroke="url(#shieldGrad1)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow)"
                />

                <circle cx="160" cy="190" r="80" stroke="rgba(77, 184, 255, 0.08)" strokeWidth="1" fill="none" />
                <circle cx="160" cy="190" r="60" stroke="rgba(77, 184, 255, 0.06)" strokeWidth="1" fill="none" />

                <circle cx="90" cy="100" r="4" fill="rgba(77, 184, 255, 0.5)" />
                <circle cx="230" cy="120" r="3" fill="rgba(0, 229, 255, 0.5)" />
                <circle cx="75" cy="250" r="3" fill="rgba(77, 184, 255, 0.4)" />
                <circle cx="248" cy="230" r="4" fill="rgba(0, 229, 255, 0.4)" />
                <circle cx="160" cy="60" r="3" fill="rgba(77, 184, 255, 0.6)" />

                <text
                  x="160"
                  y="318"
                  textAnchor="middle"
                  fill="rgba(77, 184, 255, 0.6)"
                  fontSize="11"
                  fontFamily="JetBrains Mono, monospace"
                  letterSpacing="3"
                >
                  SECURE BY DESIGN
                </text>
              </svg>
            </ShieldWrapper>
          </HeroRight>
        </HeroInner>
      </HeroContent>

      <ScrollIndicator>
        <span>{t('scrollDown')}</span>
        <ScrollLine />
      </ScrollIndicator>
    </HeroSection>
  );
}
