import type { ExperienceEntry, TimelineEvent } from '@/types';

// Dates follow the CV (public/cv/Tales_Lima_CV_EN_SecOps.pdf). Newest first.
export const experience: ExperienceEntry[] = [
  {
    id: 'internship',
    kind: 'work',
    title: { en: 'Cybersecurity intern', fr: 'Stagiaire en cybersécurité' },
    org: 'BCE (Broadcasting Center Europe)',
    place: { en: 'Luxembourg', fr: 'Luxembourg' },
    // One-month placement organised by DLH Academy. Set ongoing to false after 28 November 2026.
    period: { en: '2 to 28 November 2026', fr: 'Du 2 au 28 novembre 2026' },
    ongoing: true,
    description: {
      en: 'A one-month placement through DLH Academy. I’m building a proof of concept for ransomware detection and service continuity on video transcoders.',
      fr: 'Un stage d’un mois organisé par la DLH Academy. Je construis une preuve de concept de détection de ransomware et de continuité de service sur des transcodeurs vidéo.',
    },
  },
  {
    id: 'zaori',
    kind: 'work',
    title: { en: 'Co-founder', fr: 'Cofondateur' },
    org: 'Zaori Capital',
    place: { en: 'Luxembourg', fr: 'Luxembourg' },
    period: { en: 'Since 2025', fr: 'Depuis 2025' },
    ongoing: true,
    description: {
      en: 'A regulated fintech that tokenizes real-world assets. Besides co-founding it, I worked on the platform myself: compliance architecture, KYC workflows, Spring Boot APIs and smart contracts.',
      fr: 'Une fintech régulée qui tokenise des actifs réels. En plus de la cofonder, j’ai travaillé moi-même sur la plateforme : architecture de conformité, parcours KYC, API Spring Boot et smart contracts.',
    },
  },
  {
    id: 'dlh',
    kind: 'study',
    title: { en: 'Cybersecurity, defensive specialization', fr: 'Cybersécurité, spécialisation défensive' },
    org: 'DLH Academy',
    place: { en: 'Luxembourg', fr: 'Luxembourg' },
    period: { en: 'Ends December 2026 (expected)', fr: 'Fin prévue en décembre 2026' },
    ongoing: true,
    description: {
      en: 'Common Core completed. Now in the Blue Team track aimed at SOC L1 work: monitoring, detection, triage, incident response and hardening.',
      fr: 'Tronc commun validé. Je suis maintenant le parcours Blue Team orienté SOC L1 : surveillance, détection, tri, réponse à incident et durcissement.',
    },
  },
  {
    id: 'unigran',
    kind: 'study',
    title: { en: 'Cybersecurity degree, online', fr: 'Diplôme en cybersécurité, en ligne' },
    org: 'Unigran Europa',
    place: { en: 'Brussels, Belgium', fr: 'Bruxelles, Belgique' },
    period: { en: 'Since early 2025', fr: 'Depuis début 2025' },
    ongoing: true,
    description: {
      en: 'Network security, digital forensics, cryptography, risk management, ISO 27001 and NIST.',
      fr: 'Sécurité réseau, forensique, cryptographie, gestion des risques, ISO 27001 et NIST.',
    },
  },
  {
    id: '42-cyber',
    kind: 'study',
    title: { en: 'Cybersecurity specialization', fr: 'Spécialisation cybersécurité' },
    org: '42 Luxembourg',
    place: { en: 'Luxembourg', fr: 'Luxembourg' },
    period: { en: '2026, ongoing', fr: '2026, en cours' },
    ongoing: true,
    description: {
      en: 'Security projects in the same peer-to-peer model as the main 42 programme.',
      fr: 'Des projets de sécurité dans le même modèle entre pairs que le cursus principal de 42.',
    },
  },
  {
    id: '42',
    kind: 'study',
    title: { en: 'Systems analysis and development', fr: 'Analyse et développement de systèmes' },
    org: '42 Luxembourg',
    place: { en: 'Luxembourg', fr: 'Luxembourg' },
    period: { en: '2024 to 2026, graduated 13 March 2026', fr: '2024 à 2026, diplômé le 13 mars 2026' },
    ongoing: false,
    description: {
      en: 'Unix, networking, C and C++, data structures. Final project ft_transcendence: a task marketplace with its own ERC-20 token, real-time chat, JWT login and two-factor authentication, with secrets in HashiCorp Vault.',
      fr: 'Unix, réseaux, C et C++, structures de données. Projet final ft_transcendence : une place de marché de tâches avec son propre token ERC-20, un chat en temps réel, une connexion JWT et la double authentification, avec les secrets dans HashiCorp Vault.',
    },
  },
];

// The career change in one line. Positions are computed from the dates.
export const timeline: TimelineEvent[] = [
  { date: '2024-01', when: { en: '2024', fr: '2024' }, label: { en: 'Starts at 42 Luxembourg', fr: 'Entrée à 42 Luxembourg' } },
  { date: '2025-02', when: { en: 'Early 2025', fr: 'Début 2025' }, label: { en: 'Cybersecurity degree at Unigran Europa', fr: 'Diplôme en cybersécurité à Unigran Europa' } },
  { date: '2025-07', when: { en: '2025', fr: '2025' }, label: { en: 'Co-founds Zaori Capital', fr: 'Cofonde Zaori Capital' } },
  { date: '2026-03', when: { en: 'March 2026', fr: 'Mars 2026' }, label: { en: 'Graduates from 42', fr: 'Diplômé de 42' } },
  {
    date: '2026-11',
    when: { en: 'Now', fr: 'Aujourd’hui' },
    label: { en: 'DLH defensive track, internship at BCE, looking for a SOC L1 role', fr: 'Parcours défensif DLH, stage chez BCE, recherche d’un poste SOC L1' },
    current: true,
  },
];
