export type Locale = 'en' | 'fr';

export interface LocalizedString {
  en: string;
  fr: string;
}

// live = online and finished, lab = home lab, progress = in development,
// training = coursework still running
export type Status = 'live' | 'lab' | 'progress' | 'training';

export interface ProjectLink {
  label: LocalizedString;
  href: string;
}

export interface SecurityCase {
  id: string;
  title: LocalizedString;
  kind: LocalizedString; // one line for the project index
  diagram?: 'soc' | 'isolation' | 'continuity';
  status: Status;
  context: LocalizedString;
  built?: LocalizedString;
  learned?: LocalizedString;
  // For work in progress: what exists, what is being built, what comes next
  phases?: { state: 'done' | 'progress' | 'next'; text: LocalizedString }[];
  note?: LocalizedString;
  tools: string[];
  links: ProjectLink[];
  image?: string;
  compact?: boolean;
}

export interface SoftwareProject {
  id: string;
  name: string;
  kind: LocalizedString;
  description: LocalizedString;
  role?: LocalizedString;
  tools: string[];
  image: string;
  url: string;
}

export interface SkillArea {
  id: string;
  title: LocalizedString;
  summary: LocalizedString;
  items: { name: string | LocalizedString; use: LocalizedString }[];
  evidence: { label: LocalizedString; href: string }[];
}

export interface ExperienceEntry {
  id: string;
  kind: 'work' | 'study';
  title: LocalizedString;
  org: string | LocalizedString;
  place: LocalizedString;
  period: LocalizedString;
  ongoing: boolean;
  description: LocalizedString;
}

export interface TimelineEvent {
  date: string; // YYYY-MM
  label: LocalizedString;
  when: LocalizedString;
  current?: boolean;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  issueDate: string; // YYYY-MM
  expirationDate: string | null;
  image: string;
  credentialUrl: string;
}
