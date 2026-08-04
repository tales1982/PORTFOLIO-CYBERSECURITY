export type ThemeMode = 'light' | 'dark';
export type Locale = 'en' | 'fr';
export type CertStatus = 'valid' | 'expired' | 'noExpiration';
export type ProjectCategory = 'security' | 'development' | 'blockchain' | 'all';
export type EducationStatus = 'completed' | 'inProgress';

export interface LocalizedString {
  en: string;
  fr: string;
}

export interface Certification {
  id: number;
  name: string | LocalizedString;
  issuer: string | LocalizedString;
  issueDate: string;
  expirationDate: string | null;
  status: CertStatus;
  image: string;
  credentialUrl: string;
}

export interface Project {
  id: number;
  name: string | LocalizedString;
  description: string | LocalizedString;
  technologies: string[];
  category: Exclude<ProjectCategory, 'all'>;
  image: string;
  demoUrl: string | null;
  featured: boolean;
}

export interface Education {
  id: number;
  institution: string;
  program: string;
  status: EducationStatus;
  location: string;
  period: string;
  description: string;
  icon: string;
}

export interface SkillCategory {
  id: string;
  nameKey: string;
  skills: string[];
}

export interface JourneyStep {
  id: number;
  year: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  type: 'development' | 'blockchain' | 'cybersecurity' | 'milestone';
}

export interface NavLink {
  href: string;
  labelKey: string;
}
