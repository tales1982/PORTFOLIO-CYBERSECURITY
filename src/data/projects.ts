import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 1,
    name: {
      en: 'SOC Lab — Ransomware Isolation & Blue Team Portfolio',
      fr: 'SOC Lab — Isolation Ransomware & Portfolio Blue Team',
    },
    description: {
      en: 'Interactive SOC training platform with hands-on blue team exercises focused on ransomware detection, isolation, and incident response in a safe lab environment.',
      fr: 'Plateforme d\'entraînement SOC interactive avec des exercices blue team pratiques axés sur la détection, l\'isolation et la réponse aux incidents de ransomware dans un environnement de lab sécurisé.',
    },
    technologies: ['Blue Team', 'Incident Response', 'Next.js', 'TypeScript'],
    category: 'security',
    image: '/images/projects/soc-lab.png',
    demoUrl: 'https://soc-lab-alpha.vercel.app',
    featured: true,
  },
  {
    id: 2,
    name: {
      en: 'CyberAcademy — Cybersecurity Learning Platform',
      fr: 'CyberAcademy — Plateforme d\'Apprentissage en Cybersécurité',
    },
    description: {
      en: '23 hands-on learning modules spanning Linux, Networking, Ethical Hacking, and Advanced Security, organized into progressive phases with quizzes and certificates.',
      fr: '23 modules d\'apprentissage pratiques couvrant Linux, les réseaux, le hacking éthique et la sécurité avancée, organisés en phases progressives avec quiz et certificats.',
    },
    technologies: ['Next.js', 'TypeScript', 'Ethical Hacking', 'Networking'],
    category: 'security',
    image: '/images/projects/cyberacademy.png',
    demoUrl: 'https://cyber-stride-learn.vercel.app',
    featured: true,
  },
  {
    id: 3,
    name: {
      en: 'Zaori Capital — Asset Tokenization Platform',
      fr: 'Zaori Capital — Plateforme de Tokenisation d\'Actifs',
    },
    description: {
      en: 'Full-stack digital finance platform for tokenized securities. Built the compliant security-token smart contracts (identity registry, on-chain compliance, cap table, and governance), the Next.js investor dashboard with Web3 wallet integration, the Java/Spring Boot backend, and the Kubernetes GitOps infrastructure (ArgoCD, Vault, Keycloak IAM).',
      fr: 'Plateforme de finance digitale full-stack pour la tokenisation de titres financiers. Développement des smart contracts de security token conformes (registre d\'identité, conformité on-chain, cap table et gouvernance), du dashboard investisseur Next.js avec intégration Web3, du backend Java/Spring Boot et de l\'infrastructure Kubernetes GitOps (ArgoCD, Vault, IAM Keycloak).',
    },
    technologies: ['Solidity', 'Foundry', 'OpenZeppelin', 'Next.js', 'Wagmi/Viem', 'Java', 'Spring Boot', 'Kubernetes', 'ArgoCD', 'Keycloak'],
    category: 'blockchain',
    image: '/images/projects/zaori.png',
    demoUrl: 'https://zaoricapital.com',
    featured: true,
  },
  {
    id: 4,
    name: {
      en: 'BRsolutions — Digital Agency Platform',
      fr: 'BRsolutions — Plateforme d\'Agence Digitale',
    },
    description: {
      en: 'Multilingual website builder and digital agency platform offering ready-made templates, SEO/marketing services, and web systems. Built with React, TypeScript, and an Express backend, deployed on Kubernetes via ArgoCD GitOps.',
      fr: 'Plateforme d\'agence digitale et créateur de sites multilingue proposant des templates prêts à l\'emploi, des services SEO/marketing et des systèmes web. Développée avec React, TypeScript et un backend Express, déployée sur Kubernetes via ArgoCD GitOps.',
    },
    technologies: ['React', 'TypeScript', 'Vite', 'i18next', 'Express', 'Kubernetes', 'ArgoCD'],
    category: 'development',
    image: '/images/projects/brsolutions.png',
    demoUrl: 'https://brsolutions.lu',
    featured: true,
  },
];
