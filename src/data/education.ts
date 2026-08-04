import type { Education } from '@/types';

export const education: Education[] = [
  {
    id: 1,
    institution: '42 Luxembourg',
    program: 'Software Engineering',
    status: 'completed',
    location: 'Luxembourg City, Luxembourg',
    period: '2023 – 2026',
    description: 'Rigorous peer-to-peer software engineering school focused on C, C++, algorithms, Unix systems, and full-stack development. Mastered low-level programming through intensive project-based learning with no teachers.',
    icon: '🏫',
  },
  {
    id: 2,
    institution: 'Unigran Europa',
    program: 'Cybersecurity',
    status: 'inProgress',
    location: 'Brussels, Belgium',
    period: '2025 – Present',
    description: 'Comprehensive cybersecurity degree covering network security, ethical hacking, digital forensics, cryptography, risk management, and compliance frameworks such as ISO 27001 and NIST.',
    icon: '🎓',
  },
  {
    id: 3,
    institution: 'DLH Academy',
    program: 'Cybersecurity Specialization',
    status: 'inProgress',
    location: 'Luxembourg City, Luxembourg',
    period: '2026 – Present',
    description: 'Professional cybersecurity specialization program covering penetration testing, vulnerability assessment, threat intelligence, incident response, and advanced network defense techniques.',
    icon: '🔐',
  },
];
