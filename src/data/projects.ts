import type { SecurityCase, SoftwareProject } from '@/types';

const LAB_REPO = 'https://github.com/tales1982/soc-ransomware-isolation-lab';

// Security work, closest to the SOC L1 role first.
export const securityCases: SecurityCase[] = [
  {
    id: 'soc-lab',
    title: { en: 'Home SOC lab', fr: 'Mon lab SOC' },
    kind: { en: 'Detection and investigation with Wazuh, Suricata and TheHive', fr: 'Détection et investigation avec Wazuh, Suricata et TheHive' },
    diagram: 'soc',
    status: 'lab',
    context: {
      en: 'I wanted to practise L1 analyst work on real machines: collect events, read alerts and decide which ones matter. So I built a small SOC at home and attacked it on purpose, without real malware.',
      fr: 'Je voulais m’entraîner au travail d’analyste L1 sur de vraies machines : collecter des événements, lire des alertes et décider lesquelles comptent. J’ai donc monté un petit SOC chez moi, puis je l’ai attaqué volontairement, sans vrai malware.',
    },
    built: {
      en: 'Wazuh collects events from nine Windows, Linux and macOS machines, with Sysmon and auditd on the endpoints. Suricata watches the network, and I open and follow cases in TheHive with Cortex. I added custom Wazuh rules and file integrity monitoring on a simulated media storage server.',
      fr: 'Wazuh collecte les événements de neuf machines Windows, Linux et macOS, avec Sysmon et auditd sur les postes. Suricata surveille le réseau, et j’ouvre et suis les incidents dans TheHive avec Cortex. J’ai ajouté des règles Wazuh personnalisées et un contrôle d’intégrité des fichiers sur un serveur de stockage média simulé.',
    },
    learned: {
      en: 'I wrote down every command, error and fix, then turned the notes into a public guide with exercises on Wazuh, TheHive and Cortex.',
      fr: 'J’ai noté chaque commande, erreur et correction, puis j’en ai fait un guide public avec des exercices sur Wazuh, TheHive et Cortex.',
    },
    tools: ['Wazuh', 'Suricata', 'TheHive', 'Cortex', 'Sysmon', 'auditd'],
    links: [
      { label: { en: 'Read the lab guide', fr: 'Lire le guide du lab' }, href: 'https://soc-lab-alpha.vercel.app' },
      { label: { en: 'Code on GitHub', fr: 'Code sur GitHub' }, href: LAB_REPO },
    ],
    image: '/images/projects/soc-lab.png',
  },
  {
    id: 'isolation',
    title: { en: 'Automated host isolation', fr: 'Isolement automatique d’une machine' },
    kind: { en: 'Incident response automated with Python and Ansible', fr: 'Réponse à incident automatisée avec Python et Ansible' },
    diagram: 'isolation',
    status: 'lab',
    context: {
      en: 'When a machine starts encrypting files, it has to come off the network fast. It also has to stay reachable, because someone needs to investigate it.',
      fr: 'Quand une machine commence à chiffrer des fichiers, il faut la sortir du réseau vite. Elle doit pourtant rester joignable, car quelqu’un doit l’analyser.',
    },
    built: {
      en: 'When Wazuh flags ransomware-like activity, Python and Ansible take over. They apply nftables and iptables rules that cut the host off from the rest of the network while keeping the access the investigator needs. A clean Docker worker takes over the service, and a forensic report is written automatically.',
      fr: 'Quand Wazuh repère une activité qui ressemble à un ransomware, Python et Ansible prennent le relais. Ils appliquent des règles nftables et iptables qui coupent la machine du reste du réseau tout en gardant l’accès dont l’analyste a besoin. Un worker Docker sain reprend le service et un rapport forensique est rédigé automatiquement.',
    },
    learned: {
      en: 'A full simulation under load showed that some forensic evidence was being lost. I found the cause and fixed it. In my lab tests, detection to forensic report took about three seconds on average.',
      fr: 'Une simulation complète sous charge a montré que des preuves forensiques se perdaient. J’ai trouvé la cause et je l’ai corrigée. Dans mes tests en lab, il fallait en moyenne environ trois secondes entre la détection et le rapport forensique.',
    },
    tools: ['Python', 'Ansible', 'nftables', 'iptables', 'Wazuh Active Response', 'Docker'],
    links: [{ label: { en: 'Code on GitHub', fr: 'Code sur GitHub' }, href: LAB_REPO }],
  },
  {
    id: 'continuity-poc',
    title: { en: 'Ransomware detection and service continuity', fr: 'Détection de ransomware et continuité de service' },
    kind: { en: 'Internship proof of concept at BCE, Docker and segmented networks', fr: 'Preuve de concept de stage chez BCE, Docker et réseaux segmentés' },
    diagram: 'continuity',
    status: 'progress',
    context: {
      en: 'A proof of concept for my internship at BCE (Broadcasting Center Europe) in Luxembourg, a one-month placement through DLH Academy in November 2026. Video transcoders have to keep working even if one of them is compromised.',
      fr: 'Une preuve de concept pour mon stage chez BCE (Broadcasting Center Europe) au Luxembourg, un stage d’un mois organisé par la DLH Academy en novembre 2026. Les transcodeurs vidéo doivent continuer à fonctionner même si l’un d’eux est compromis.',
    },
    phases: [
      {
        state: 'done',
        text: { en: 'Docker environment with segmented networks', fr: 'Environnement Docker avec des réseaux segmentés' },
      },
      {
        state: 'progress',
        text: {
          en: 'Detecting suspicious activity on a transcoder and isolating the affected one',
          fr: 'Détecter une activité suspecte sur un transcodeur et isoler celui qui est touché',
        },
      },
      {
        state: 'next',
        text: {
          en: 'Moving the processing to another transcoder so the service keeps running, then measuring detection and isolation times',
          fr: 'Basculer le traitement vers un autre transcodeur pour que le service continue, puis mesurer les temps de détection et d’isolement',
        },
      },
    ],
    note: {
      en: 'There are no results yet. Detection and isolation times are goals, not measurements. Internal details stay private.',
      fr: 'Pas encore de résultats : les temps de détection et d’isolement sont des objectifs, pas des mesures. Les détails internes restent confidentiels.',
    },
    tools: ['Docker', 'Linux'],
    links: [],
  },
  {
    id: 'dlh-exercises',
    title: { en: 'Blue team exercises at DLH Academy', fr: 'Exercices blue team à la DLH Academy' },
    kind: { en: 'Hardening, triage, threat hunting, incident response', fr: 'Durcissement, tri, threat hunting, réponse à incident' },
    status: 'training',
    context: {
      en: 'Hardening Linux and Windows hosts, endpoint monitoring, alert triage, traffic analysis in Wireshark, threat hunting in 14 days of Wazuh and Sysmon exports, and incident response playbooks with a tabletop exercise.',
      fr: 'Durcissement de machines Linux et Windows, surveillance des postes, tri d’alertes, analyse de trafic dans Wireshark, threat hunting sur 14 jours d’exports Wazuh et Sysmon, et playbooks de réponse à incident avec un exercice sur table.',
    },
    tools: ['Wazuh', 'Sysmon', 'Wireshark', 'Python', 'Bash', 'PowerShell'],
    links: [{ label: { en: 'Coursework on GitHub', fr: 'Travaux sur GitHub' }, href: 'https://github.com/tales1982/dlh-cyber_security' }],
    compact: true,
  },
];

export const softwareProjects: SoftwareProject[] = [
  {
    id: 'zaori',
    name: 'Zaori Capital',
    kind: { en: 'Asset tokenization platform', fr: 'Plateforme de tokenisation d’actifs' },
    description: {
      en: 'A regulated platform for tokenized real-world assets. Nobody can hold a token before passing identity checks, and secrets stay out of the code.',
      fr: 'Une plateforme régulée pour la tokenisation d’actifs réels. Personne ne peut détenir un token sans vérification d’identité, et les secrets restent hors du code.',
    },
    role: {
      en: 'I’m one of the co-founders, and I also worked on the product: I designed the compliance architecture and KYC workflows, built the Java and Spring Boot APIs, and wrote smart contracts and the React investor interface.',
      fr: 'Je suis l’un des cofondateurs, et j’ai aussi travaillé sur le produit : j’ai conçu l’architecture de conformité et les parcours KYC, développé les API Java et Spring Boot, et écrit les smart contracts et l’interface investisseur en React.',
    },
    tools: ['Java', 'Spring Boot', 'Solidity', 'Foundry', 'React', 'TypeScript', 'PostgreSQL', 'Vault', 'Keycloak', 'Kubernetes'],
    image: '/images/projects/zaori.png',
    url: 'https://zaoricapital.com',
  },
  {
    id: 'tech-news-explained',
    name: 'Tech News Explained',
    kind: { en: 'Tech and security news', fr: 'Actualité tech et sécurité' },
    description: {
      en: 'A news site in six languages that explains technology, AI and security news in plain words. Its CVE Watch section follows new and actively exploited vulnerabilities, checked against vendor advisories and the CISA catalogue.',
      fr: 'Un site d’actualité en six langues qui explique simplement la tech, l’IA et la sécurité. Sa rubrique CVE Watch suit les vulnérabilités récentes et celles qui sont exploitées, vérifiées dans les avis des éditeurs et le catalogue de la CISA.',
    },
    tools: ['React', 'Vite', 'Static prerendering', 'Cloudflare Pages', 'Cloudflare Workers'],
    image: '/images/projects/technewsexplained.png',
    url: 'https://technewsexplained.com',
  },
  {
    id: 'cyberacademy',
    name: 'CyberAcademy',
    kind: { en: 'Security learning platform', fr: 'Plateforme d’apprentissage en sécurité' },
    description: {
      en: '23 hands-on modules on Linux, networking, ethical hacking and advanced security, in progressive phases with quizzes and certificates.',
      fr: '23 modules pratiques sur Linux, les réseaux, le hacking éthique et la sécurité avancée, en phases progressives avec quiz et certificats.',
    },
    tools: ['Next.js', 'TypeScript'],
    image: '/images/projects/cyberacademy.png',
    url: 'https://cyber-stride-learn.vercel.app',
  },
  {
    id: 'brsolutions',
    name: 'BR Solutions',
    kind: { en: 'Company website', fr: 'Site d’entreprise' },
    description: {
      en: 'A multilingual company site with a contact API, light and dark themes, deployed on Kubernetes through ArgoCD.',
      fr: 'Un site d’entreprise multilingue avec une API de contact, des thèmes clair et sombre, déployé sur Kubernetes via ArgoCD.',
    },
    tools: ['React', 'TypeScript', 'Express', 'i18next', 'Kubernetes', 'ArgoCD'],
    image: '/images/projects/brsolutions.png',
    url: 'https://brsolutions.lu',
  },
];
