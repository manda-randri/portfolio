// Interface pour les captures d'écran de la galerie
export interface ProjectGalleryItem {
  id: string;
  url: string;
  caption: string;
}

// Interface principale pour un projet SaaS
export interface Project {
  id: string;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  description: string;
  problemImage?: string;
  heroImage?: string;
  technologies: string[];
  features?: string[];
  mobileImages?: string[];
  youtubeUrl?: string;
  githubUrl?: string;
  isGithubLocked?: boolean;
  gallery?: ProjectGalleryItem[];
}

// Interface pour une technologie/compétence
export interface TechSkill {
  name: string;
  iconSvg: string; // Fichier SVG ou nom du composant d'icône
}

// Interface pour les catégories de compétences
export interface TechStackCategory {
  category: 'Frontend Development' | 'Backend Development' | 'Outils & DevOps' | string;
  skills: TechSkill[];
}

// Interface pour le parcours professionnel (Timeline)
export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  impact?: string;
  technologies?: string[];
  achievements?: string[]; // <-- Ajouté pour sécuriser ExperienceSection
  visualAsset?: string;
}

// Interface pour les informations de profil (About)
export interface Profile {
  name: string;
  title: string;
  heroHeadline: string;
  heroSubheadline: string;
  bio: string[];
  vision: string[];
  socialLinks: {
    github: string;
    linkedin: string;
    upwork: string;
    email: string;
  };
}

// Interface pour le formulaire de contact
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}