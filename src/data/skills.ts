import type { SkillArea } from '@/types';

// Each tool is paired with what I actually do with it.
// Evidence links point to project anchors on the same page.
export const skillAreas: SkillArea[] = [
  {
    id: 'defense',
    title: { en: 'Defensive security and investigation', fr: 'Sécurité défensive et investigation' },
    summary: {
      en: 'What I practise in my lab and in the DLH Academy defensive track.',
      fr: 'Ce que je pratique dans mon lab et dans le parcours défensif de la DLH Academy.',
    },
    items: [
      { name: 'Wazuh, Suricata, TheHive', use: { en: 'Run them together: endpoint and network alerts in Wazuh and Suricata, cases in TheHive', fr: 'Je les fais tourner ensemble : alertes postes et réseau dans Wazuh et Suricata, incidents dans TheHive' } },
      { name: { en: 'Log and event analysis', fr: 'Analyse de logs et d’événements' }, use: { en: 'Read the raw events behind an alert to decide if it is real', fr: 'Lire les événements bruts derrière une alerte pour savoir si elle est fondée' } },
      { name: 'Wireshark, tshark', use: { en: 'Follow suspicious traffic in packet captures', fr: 'Suivre un trafic suspect dans des captures réseau' } },
      { name: 'Sysmon, Linux auditd', use: { en: 'Collect process, file and login events on Windows and Linux', fr: 'Collecter les événements de processus, de fichiers et de connexion sous Windows et Linux' } },
      { name: { en: 'Detection, triage, incident response', fr: 'Détection, tri, réponse à incident' }, use: { en: 'The fundamentals, practised in triage exercises, playbooks and a tabletop', fr: 'Les bases, pratiquées en exercices de tri, en playbooks et lors d’un exercice sur table' } },
      { name: { en: 'Linux and Windows hardening', fr: 'Durcissement Linux et Windows' }, use: { en: 'Lock down hosts in the DLH exercises', fr: 'Durcir des machines dans les exercices de la DLH' } },
    ],
    evidence: [
      { label: { en: 'Home SOC lab', fr: 'Mon lab SOC' }, href: '#case-soc-lab' },
      { label: { en: 'DLH exercises', fr: 'Exercices DLH' }, href: '#case-dlh-exercises' },
    ],
  },
  {
    id: 'automation',
    title: { en: 'Automation and infrastructure', fr: 'Automatisation et infrastructure' },
    summary: {
      en: 'Where my developer background helps most on the defensive side.',
      fr: 'Là où mon passé de développeur m’aide le plus côté défense.',
    },
    items: [
      { name: 'Python, Bash', use: { en: 'Scripts that parse logs and trigger a response', fr: 'Des scripts qui analysent des logs et déclenchent une réponse' } },
      { name: 'Ansible', use: { en: 'Playbooks that apply quarantine rules to a host', fr: 'Des playbooks qui appliquent des règles de quarantaine à une machine' } },
      { name: 'nftables, iptables', use: { en: 'Firewall rules that isolate a host but keep investigator access', fr: 'Des règles de pare-feu qui isolent une machine en gardant l’accès de l’analyste' } },
      { name: { en: 'Docker, network segmentation', fr: 'Docker, segmentation réseau' }, use: { en: 'Separate networks and failover workers for lab scenarios', fr: 'Des réseaux séparés et des workers de secours pour les scénarios de lab' } },
    ],
    evidence: [
      { label: { en: 'Automated isolation', fr: 'Isolement automatique' }, href: '#case-isolation' },
      { label: { en: 'BCE internship POC', fr: 'POC de stage chez BCE' }, href: '#case-continuity-poc' },
    ],
  },
  {
    id: 'development',
    title: { en: 'Development', fr: 'Développement' },
    summary: {
      en: 'My first job in tech, and still part of my work.',
      fr: 'Mon premier métier dans la tech, et toujours une partie de mon travail.',
    },
    items: [
      { name: 'Java, Spring Boot', use: { en: 'Secure REST APIs for Zaori Capital, the fintech I co-founded', fr: 'Des API REST sécurisées pour Zaori Capital, la fintech que j’ai cofondée' } },
      { name: 'Next.js, TypeScript', use: { en: 'Web apps, including CyberAcademy and this site', fr: 'Des applications web, dont CyberAcademy et ce site' } },
      { name: { en: 'Solidity, blockchain', fr: 'Solidity, blockchain' }, use: { en: 'More than two years of smart contract and Web3 work', fr: 'Plus de deux ans de smart contracts et de Web3' } },
      { name: 'Git', use: { en: 'Branch-based workflow in team and personal projects', fr: 'Travail par branches, en équipe et sur mes projets' } },
    ],
    evidence: [
      { label: { en: 'Zaori Capital', fr: 'Zaori Capital' }, href: '#sw-zaori' },
      { label: { en: 'CyberAcademy', fr: 'CyberAcademy' }, href: '#sw-cyberacademy' },
    ],
  },
];
