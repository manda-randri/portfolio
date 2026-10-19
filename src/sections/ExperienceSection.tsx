import React from 'react';
import { useTranslation } from 'react-i18next';
import { Code2, Server, Database } from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiTailwindcss,
  SiDaisyui,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiFastapi,
  SiDjango,
  SiFlask,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiGithub,
  SiDocker,
  SiVercel,
  SiVite,
  SiWebpack,
} from '@icons-pack/react-simple-icons';
import { skillCategories, experiences } from '../data/experience';


export const ExperienceSection: React.FC = () => {
  const { t, i18n } = useTranslation();

  // Récupération de la langue active ('fr' ou 'en')
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  // Fonction pour retourner l'icône Lucide appropriée en fonction de la catégorie
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'frontend':
        return <Code2 className="w-5 h-5" />;
      case 'backend':
        return <Server className="w-5 h-5" />;
      case 'devops':
        return <Database className="w-5 h-5" />;
      default:
        return <Code2 className="w-5 h-5" />;
    }
  };

  // Composant helper pour afficher le logo Python aux couleurs officielles (Bleu & Jaune)
  const PythonOfficialLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M11.914 0C5.814 0 6.012 2.68 6.012 2.68V5.6h5.856v.8H3.344S0 5.924 0 12.024c0 6.1 2.928 5.856 2.928 5.856h1.752v-2.784s-.096-3.312 3.216-3.312h5.688s3.048.12 3.048-2.928V2.832S17.078 0 11.914 0zM8.33 1.92a1.056 1.056 0 1 1 0 2.112 1.056 1.056 0 0 1 0-2.112z"
        fill="#3776AB"
      />
      <path
        d="M12.086 24c6.1 0 5.988-2.68 5.988-2.68v-2.92H12.218v-.8h8.524s3.344.476 3.344-5.624c0-6.1-2.928-5.856-2.928-5.856h-1.752v2.784s.096 3.312-3.216 3.312H8.602s-3.048-.12-3.048 2.928v5.808S6.922 24 12.086 24zm3.584-1.92a1.056 1.056 0 1 1 0-2.112 1.056 1.056 0 0 1 0 2.112z"
        fill="#FFD43B"
      />
    </svg>
  );

  // Fonction pour retourner les éléments technologiques individuels avec couleurs officielles et icônes raffinées (w-5 h-5)
  const getSkillTechnologyItems = (skillName: string): Array<{ name: string; icon?: React.ReactNode }> => {
    const lower = skillName.toLowerCase();

    if (lower.includes('react') && lower.includes('next')) {
      return [
        { name: 'React.js', icon: <SiReact key="react" className="w-5 h-5 flex-shrink-0" style={{ color: '#61DAFB' }} aria-hidden="true" /> },
        { name: 'Next.js', icon: <SiNextdotjs key="next" className="w-5 h-5 flex-shrink-0" style={{ color: '#000000' }} aria-hidden="true" /> }
      ];
    }
    if (lower.includes('tailwind') && lower.includes('daisyui')) {
      return [
        { name: 'Tailwind CSS', icon: <SiTailwindcss key="tw" className="w-5 h-5 flex-shrink-0" style={{ color: '#06B6D4' }} aria-hidden="true" /> },
        { name: 'DaisyUI', icon: <SiDaisyui key="daisy" className="w-5 h-5 flex-shrink-0" style={{ color: '#570DF8' }} aria-hidden="true" /> }
      ];
    }
    if ((lower.includes('html') && lower.includes('css')) || lower.includes('es6')) {
      return [
        { name: 'HTML5', icon: <SiHtml5 key="html" className="w-5 h-5 flex-shrink-0" style={{ color: '#E34F26' }} aria-hidden="true" /> },
        { name: 'CSS3', icon: <SiCss key="css" className="w-5 h-5 flex-shrink-0" style={{ color: '#1572B6' }} aria-hidden="true" /> },
        { name: 'JavaScript (ES6+)', icon: <SiJavascript key="js" className="w-5 h-5 flex-shrink-0" style={{ color: '#F7DF1E' }} aria-hidden="true" /> }
      ];
    }
    if (lower.includes('typescript')) {
      return [
        { name: skillName, icon: <SiTypescript key="ts" className="w-5 h-5 flex-shrink-0" style={{ color: '#3178C6' }} aria-hidden="true" /> }
      ];
    }
    if (lower.includes('python')) {
      return [
        { name: skillName, icon: <PythonOfficialLogo key="py" className="w-5 h-5 flex-shrink-0" /> }
      ];
    }
    if (lower.includes('node') && lower.includes('express')) {
      return [
        { name: 'Node.js', icon: <SiNodedotjs key="node" className="w-5 h-5 flex-shrink-0" style={{ color: '#5FA04E' }} aria-hidden="true" /> },
        { name: 'Express', icon: <SiExpress key="express" className="w-5 h-5 flex-shrink-0" style={{ color: '#000000' }} aria-hidden="true" /> }
      ];
    }
    if (lower.includes('restful') || lower.includes('json')) {
      return [
        { name: skillName, icon: undefined }
      ];
    }
    if (lower.includes('sql') || lower.includes('postgresql') || lower.includes('mysql')) {
      return [
        { name: 'PostgreSQL', icon: <SiPostgresql key="pg" className="w-5 h-5 flex-shrink-0" style={{ color: '#4169E1' }} aria-hidden="true" /> },
        { name: 'MySQL', icon: <SiMysql key="mysql" className="w-5 h-5 flex-shrink-0" style={{ color: '#4479A1' }} aria-hidden="true" /> }
      ];
    }
    if (lower.includes('git') && lower.includes('github')) {
      return [
        { name: 'Git', icon: <SiGit key="git" className="w-5 h-5 flex-shrink-0" style={{ color: '#F05032' }} aria-hidden="true" /> },
        { name: 'GitHub', icon: <SiGithub key="github" className="w-5 h-5 flex-shrink-0" style={{ color: '#181717' }} aria-hidden="true" /> }
      ];
    }
    if (lower.includes('vite') && lower.includes('webpack')) {
      return [
        { name: 'Vite', icon: <SiVite key="vite" className="w-5 h-5 flex-shrink-0" style={{ color: '#646CFF' }} aria-hidden="true" /> },
        { name: 'Webpack', icon: <SiWebpack key="webpack" className="w-5 h-5 flex-shrink-0" style={{ color: '#8DD6F9' }} aria-hidden="true" /> }
      ];
    }
    if (lower.includes('deployment') || (lower.includes('vercel') && lower.includes('docker'))) {
      return [
        { name: 'Vercel', icon: <SiVercel key="vercel" className="w-5 h-5 flex-shrink-0" style={{ color: '#000000' }} aria-hidden="true" /> },
        { name: 'Docker', icon: <SiDocker key="docker" className="w-5 h-5 flex-shrink-0" style={{ color: '#2496ED' }} aria-hidden="true" /> }
      ];
    }

    return [{ name: skillName, icon: undefined }];
  };

  // Fonction pour retourner les icônes monochromes de la timeline (w-3.5 h-3.5)
  const getTechnologyIcons = (tech: string) => {
    const lower = tech.toLowerCase();
    const icons: React.ReactNode[] = [];

    if (lower.includes('react')) {
      icons.push(<SiReact key="react" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('next')) {
      icons.push(<SiNextdotjs key="next" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('typescript')) {
      icons.push(<SiTypescript key="ts" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('python')) {
      icons.push(<SiPython key="py" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('tailwind')) {
      icons.push(<SiTailwindcss key="tw" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('daisyui')) {
      icons.push(<SiDaisyui key="daisy" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('html')) {
      icons.push(<SiHtml5 key="html" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('css')) {
      icons.push(<SiCss key="css" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if ((lower.includes('javascript') || lower.includes('js') || lower.includes('es6')) && !lower.includes('json') && !lower.includes('flask') && !lower.includes('express')) {
      icons.push(<SiJavascript key="js" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('fastapi')) {
      icons.push(<SiFastapi key="fastapi" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('django')) {
      icons.push(<SiDjango key="django" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('flask')) {
      icons.push(<SiFlask key="flask" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('node')) {
      icons.push(<SiNodedotjs key="node" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('express')) {
      icons.push(<SiExpress key="express" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('postgresql') || lower.includes('postgres')) {
      icons.push(<SiPostgresql key="pg" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('mysql')) {
      icons.push(<SiMysql key="mysql" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('git') && !lower.includes('github')) {
      icons.push(<SiGit key="git" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('github')) {
      icons.push(<SiGithub key="github" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('docker')) {
      icons.push(<SiDocker key="docker" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('vercel')) {
      icons.push(<SiVercel key="vercel" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('vite')) {
      icons.push(<SiVite key="vite" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }
    if (lower.includes('webpack')) {
      icons.push(<SiWebpack key="webpack" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />);
    }

    return icons;
  };

  return (
    <section id="experience" className="relative isolate py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* ARRIÈRE-PLAN : lueurs diffuses « Glassmorphism » (décoratif, derrière le contenu) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-[26rem] w-[26rem] rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute top-[14%] -right-20 h-[24rem] w-[24rem] rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute top-[34%] -left-28 h-[26rem] w-[26rem] rounded-full bg-violet-400/20 blur-3xl" />
        <div className="absolute top-[54%] -right-24 h-[26rem] w-[26rem] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-[74%] -left-20 h-[24rem] w-[24rem] rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-[22rem] w-[22rem] rounded-full bg-violet-400/20 blur-3xl" />
      </div>

      {/* 1. Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          {t('experience.badge', lang === 'fr' ? 'Expérience professionnelle' : 'Professional Experience')}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-base-content mt-2.5">
          {t('experience.title', lang === 'fr' ? 'Du code aux produits web' : 'From Code to Web Products')}
        </h2>
      </div>

      {/* 2. Transition Arrow */}
      <div className="flex justify-center mb-8 text-primary/60">
        <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* 3. Positioning Editorial Block */}
      <div className="max-w-2xl mx-auto mb-16 text-center space-y-4">
        <h3 className="font-serif italic text-xl sm:text-2xl font-medium tracking-wide text-primary leading-snug">
          {t(
            'experience.positioning_title',
            lang === 'fr'
              ? '« Nous ne créons pas seulement des interfaces. Nous donnons vie aux idées. »'
              : '“We don\'t just build interfaces. We bring ideas to life.”'
          )}
        </h3>
        <p className="text-base-content/70 text-sm sm:text-base leading-relaxed">
          {t(
            'experience.positioning_desc',
            lang === 'fr'
              ? 'Derrière chaque produit, il y a un besoin, une ambition et une idée à transformer en réalité. Des interfaces responsives aux APIs, des données au déploiement, nous construisons des produits digitaux pensés pour fonctionner, évoluer et créer de la valeur.'
              : 'Behind every product lies a need, an ambition, and an idea to turn into reality. From responsive interfaces to APIs, data to deployment, we build digital products designed to perform, scale, and create value.'
          )}
        </p>
      </div>

      {/* 4. SKILLS GRID */}
      <div className="mb-24">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary/10 text-primary rounded-xl flex items-center justify-center w-10 h-10">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-base-content">
            {t('experience.skills_title', 'Tech Stack & Capabilities')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => {
            const localizedCategory = category[lang] || category.en;

            return (
              <div
                key={idx}
                className="bg-base-100 rounded-2xl p-6 border border-base-300 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-base-200">
                    <div className="p-2 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                      {getCategoryIcon(category.icon)}
                    </div>
                    <h4 className="text-lg font-bold text-base-content">{localizedCategory.title}</h4>
                  </div>

                  <div className="space-y-3.5">
                    {localizedCategory.skills.map((skill, sIdx) => {
                      const techItems = getSkillTechnologyItems(skill.name);
                      return (
                        <div
                          key={sIdx}
                          className="bg-base-200/40 hover:bg-base-200/70 transition-all rounded-xl p-3.5 border border-base-300/50"
                        >
                          <div className="space-y-3">
                            {techItems.map((item, iIdx) => (
                              <div key={iIdx} className="flex items-start gap-3">
                                {item.icon && (
                                  <div className="p-1.5 bg-base-100 rounded-lg shadow-2xs border border-base-300/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {item.icon}
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <span className="font-bold text-base-content text-sm tracking-tight block">
                                    {item.name}
                                  </span>
                                  {skill.description && iIdx === 0 && (
                                    <p className="text-xs text-base-content/60 mt-1 leading-relaxed font-normal">
                                      {skill.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. EXPERIENCE TIMELINE */}
      <div>
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2 bg-primary/10 text-primary rounded-xl flex items-center justify-center w-10 h-10">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-base-content">
            {t('experience.timeline_title', 'Professional Journey & Key Accomplishments')}
          </h3>
        </div>

        <div className="relative border-l border-base-300 ml-4 md:ml-6 space-y-12 pl-6 md:pl-8">
          {experiences.map((exp) => {
            const localizedExp = exp[lang] || exp.en;

            return (
              <div key={exp.id} className="relative group">
                {/* Timeline Bullet */}
                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-primary border-2 border-base-100 shadow-sm" />

                <div className="bg-base-100 rounded-2xl p-6 md:p-8 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-base-content">{localizedExp.role}</h4>
                      <p className="text-primary font-semibold text-sm">{exp.company}</p>
                    </div>
                    <span className="inline-block text-xs font-semibold text-base-content/60 bg-base-200 px-3 py-1 rounded-full w-fit border border-base-300">
                      {localizedExp.period}
                    </span>
                  </div>

                  <p className="text-base-content/70 text-sm leading-relaxed mb-6">
                    {localizedExp.description}
                  </p>

                  {/* Key Achievements */}
                  {localizedExp.achievements && localizedExp.achievements.length > 0 && (
                    <div className="mb-6">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-base-content/50 mb-3">
                        {t('experience.achievements_label', 'Key Impact & Achievements:')}
                      </h5>
                      <ul className="space-y-2">
                        {localizedExp.achievements.map((item, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2.5 text-sm text-base-content/80">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-base-200">
                    {exp.technologies.map((tech, tIdx) => {
                      const techIcons = getTechnologyIcons(tech);
                      return (
                        <span
                          key={tIdx}
                          className="text-xs px-2.5 py-1 bg-base-200 text-base-content/80 rounded-md font-medium border border-base-300 inline-flex items-center gap-1.5"
                        >
                          {techIcons}
                          <span>{tech}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};










/*
================================================================================
EXPERIENCESECTION.TSX — CE QUE LE FICHIER FAIT ET CE QUE L’UTILISATEUR VOIT
================================================================================

RÔLE DU FICHIER
---------------
Ce composant construit la page :

    "Skills & Experience"

Il présente deux grandes informations au visiteur :

    ① Les compétences techniques / technologies maîtrisées
    ② Le parcours professionnel et les réalisations

Les données viennent principalement de :

    experience.ts
         │
         ├── skillCategories
         └── experiences
                  │
                  ▼
          ExperienceSection.tsx
                  │
                  ▼
             VISITEUR


================================================================================
1. VUE GÉNÉRALE DE LA PAGE
================================================================================

L'utilisateur voit globalement :

┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│                         ← Back                                     │
│                                                                    │
│                 [ TRACK RECORD & EXPERTISE ]                       │
│                                                                    │
│                    Skills & Experience                             │
│                                                                    │
│   A robust blend of modern frontend engineering, backend           │
│   architecture, and database management for scalable SaaS apps.   │
│                                                                    │
│                                                                    │
│   ┌────────────────────────────────────────────────────────────┐   │
│   │  Building products, not just interfaces                   │   │
│   │                                                            │   │
│   │  Explication de l'approche de développement...             │   │
│   └────────────────────────────────────────────────────────────┘   │
│                                                                    │
│   ⚡ Tech Stack & Capabilities                                    │
│                                                                    │
│   ┌───────────────┐ ┌───────────────┐ ┌───────────────┐            │
│   │ FRONTEND      │ │ BACKEND       │ │ DATABASES     │            │
│   │               │ │               │ │ & DEVOPS      │            │
│   │ React.js      │ │ Python        │ │ PostgreSQL    │            │
│   │ Next.js       │ │ FastAPI       │ │ MySQL         │            │
│   │ TypeScript    │ │ Django        │ │ Git           │            │
│   │ Tailwind CSS  │ │ Flask         │ │ GitHub        │            │
│   └───────────────┘ └───────────────┘ └───────────────┘            │
│                                                                    │
│   💼 Professional Journey & Key Accomplishments                    │
│                                                                    │
│   ● ──────────────────────────────────────────────────────────     │
│   │  Full-Stack Developer & SaaS Engineer                        │
│   │  Freelance / Upwork                                           │
│   │  2023 — Present                                               │
│   │                                                                │
│   │  Description...                                               │
│   │                                                                │
│   │  KEY IMPACT & ACHIEVEMENTS                                    │
│   │  • Achievement 1                                              │
│   │  • Achievement 2                                              │
│   │                                                                │
│   │  [React] [TypeScript] [Python] [SQL]                          │
│   │                                                                │
│   ● ──────────────────────────────────────────────────────────     │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘


================================================================================
2. BOUTON "BACK"
================================================================================

En haut de la page, l'utilisateur voit un bouton de retour :

    ← Back

Son rôle est de permettre au visiteur de revenir à la page précédente.

Il ne renvoie pas obligatoirement vers une adresse fixe :
il revient à l'étape précédente de l'historique de navigation.


================================================================================
3. EN-TÊTE DE LA PAGE
================================================================================

L'utilisateur voit un petit badge :

    [ TRACK RECORD & EXPERTISE ]

Puis le titre principal :

    Skills & Experience

Et juste dessous une description :

    A robust blend of modern frontend engineering, backend
    architecture, and database management for scalable SaaS applications.


Cette zone explique immédiatement ce que le visiteur va découvrir.


================================================================================
4. BLOC DE POSITIONNEMENT
================================================================================

Avant les compétences techniques, un bloc éditorial présente
l'approche professionnelle.

En anglais :

    Building products, not just interfaces

    I approach development as a complete product-building process.
    From responsive interfaces to APIs, data and deployment, I focus
    on creating reliable digital products that are functional,
    scalable and easy to evolve.


En français, le titre et le texte sont adaptés automatiquement
selon la langue active.

L'objectif visible est de montrer que le développeur ne se limite
pas à créer des interfaces visuelles.

Le message est :

    INTERFACE
        +
    API
        +
    DONNÉES
        +
    DÉPLOIEMENT
        =
    PRODUIT DIGITAL COMPLET


================================================================================
5. SECTION "TECH STACK & CAPABILITIES"
================================================================================

L'utilisateur arrive ensuite à :

    ⚡ Tech Stack & Capabilities


Cette partie présente les compétences techniques sous forme de cartes.


================================================================================
6. LES 3 GRANDES CATÉGORIES TECHNIQUES
================================================================================

Les catégories sont organisées en trois colonnes sur grand écran.

    ┌──────────────────┐
    │  💻 FRONTEND     │
    │                  │
    │  React.js        │
    │  Next.js         │
    │  TypeScript      │
    │  Tailwind CSS    │
    │  HTML5           │
    │  CSS3            │
    │  JavaScript      │
    └──────────────────┘

    ┌──────────────────┐
    │  🖥 BACKEND      │
    │                  │
    │  Python           │
    │  FastAPI          │
    │  Django           │
    │  Flask            │
    │  Node.js          │
    │  Express          │
    └──────────────────┘

    ┌──────────────────┐
    │  🗄 DATABASES    │
    │     & DEVOPS     │
    │                  │
    │  PostgreSQL       │
    │  MySQL            │
    │  Git              │
    │  GitHub           │
    │  Docker           │
    │  Vercel           │
    └──────────────────┘

Les noms exacts dépendent des données présentes dans `experience.ts`.


================================================================================
7. ICÔNES DES CATÉGORIES
================================================================================

Chaque grande catégorie possède une icône :

    Frontend
       → icône Code

    Backend
       → icône Server

    Databases / DevOps
       → icône Database


Cela permet de distinguer visuellement les grands domaines.


================================================================================
8. ICÔNES DES TECHNOLOGIES
================================================================================

Les technologies individuelles peuvent également avoir leur propre
icône officielle.

Par exemple :

    [ ⚛ React.js ]
    [ ▲ Next.js ]
    [ TS TypeScript ]
    [ 🐍 Python ]
    [ Tailwind CSS ]
    [ PostgreSQL ]
    [ Git ]
    [ GitHub ]
    [ Docker ]
    [ Vercel ]


Le composant sépare également certains éléments qui peuvent être
regroupés dans les données.

Par exemple, si une compétence contient :

    "React.js / Next.js"

l'utilisateur peut voir séparément :

    [ ⚛ ] React.js

    [ ▲ ] Next.js


Même logique pour certains regroupements comme :

    Tailwind CSS + DaisyUI
    HTML + CSS + JavaScript
    Node.js + Express
    PostgreSQL + MySQL
    Git + GitHub
    Vite + Webpack
    Vercel + Docker


================================================================================
9. DESCRIPTION DES COMPÉTENCES
================================================================================

Certaines compétences possèdent une description.

L'utilisateur peut donc voir :

    ┌──────────────────────────────────────┐
    │ [React icon] React.js               │
    │                                     │
    │ Description de la compétence...     │
    └──────────────────────────────────────┘


La description est affichée sous le premier élément technologique
du groupe concerné.


================================================================================
10. EFFET VISUEL DES CARTES
================================================================================

Les cartes de compétences réagissent au survol de la souris.

Au repos :

    carte normale

Au survol :

    carte légèrement plus mise en avant
    + ombre plus visible


Cela apporte une petite interaction visuelle sans modifier
le contenu.


================================================================================
11. SECTION "PROFESSIONAL JOURNEY"
================================================================================

Après les compétences, l'utilisateur arrive à :

    💼 Professional Journey & Key Accomplishments


Cette partie présente le parcours professionnel sous forme de timeline.


================================================================================
12. TIMELINE DU PARCOURS
================================================================================

Visuellement, l'utilisateur voit une ligne verticale :

    ●
    │
    │  EXPERIENCE 1
    │
    ●
    │
    │  EXPERIENCE 2
    │
    ●
    │
    │  EXPERIENCE 3


Chaque point correspond à une expérience professionnelle.


================================================================================
13. CONTENU D’UNE EXPÉRIENCE
================================================================================

Chaque expérience est présentée dans une grande carte.

Exemple :

┌──────────────────────────────────────────────────────────────┐
│ Full-Stack Developer & SaaS Engineer       [2023 — Present]│
│ Freelance / Upwork                                           │
│                                                              │
│ Description de l'expérience professionnelle...               │
│                                                              │
│ KEY IMPACT & ACHIEVEMENTS                                    │
│ • Réalisation / impact 1                                     │
│ • Réalisation / impact 2                                     │
│ • Réalisation / impact 3                                     │
│                                                              │
│ [React] [TypeScript] [Python] [SQL]                         │
└──────────────────────────────────────────────────────────────┘


================================================================================
14. INFORMATIONS DE CHAQUE EXPÉRIENCE
================================================================================

Chaque expérience peut présenter :

    → Fonction / rôle
    → Entreprise ou contexte
    → Période
    → Description
    → Réalisations importantes
    → Technologies utilisées


Le visiteur peut donc comprendre à la fois :

    CE QUE TU AS FAIT
          +
    OÙ / DANS QUEL CONTEXTE
          +
    QUAND
          +
    AVEC QUELLES TECHNOLOGIES
          +
    QUEL IMPACT


================================================================================
15. "KEY IMPACT & ACHIEVEMENTS"
================================================================================

Lorsqu'une expérience possède des réalisations, elles sont regroupées
dans une partie :

    KEY IMPACT & ACHIEVEMENTS:

    • Achievement 1
    • Achievement 2
    • Achievement 3


Chaque réalisation possède un petit point visuel devant le texte.


================================================================================
16. TECHNOLOGIES DE CHAQUE EXPÉRIENCE
================================================================================

Au bas de chaque expérience, les technologies utilisées apparaissent
sous forme de badges.

Exemple :

    [ ⚛ React ]
    [ TS TypeScript ]
    [ 🐍 Python ]
    [ PostgreSQL ]
    [ Docker ]


Les icônes permettent d'identifier rapidement les technologies.


================================================================================
17. VERSION MOBILE
================================================================================

Sur téléphone, les trois catégories de compétences ne restent pas
sur trois colonnes.

Elles s'empilent verticalement :

    ┌───────────────────────┐
    │ FRONTEND              │
    │ React                 │
    │ Next.js               │
    │ TypeScript            │
    └───────────────────────┘

    ┌───────────────────────┐
    │ BACKEND               │
    │ Python                │
    │ FastAPI               │
    │ Django                │
    └───────────────────────┘

    ┌───────────────────────┐
    │ DATABASES & DEVOPS    │
    │ PostgreSQL             │
    │ Git                    │
    │ Docker                 │
    └───────────────────────┘


La timeline devient également plus adaptée à la largeur réduite
de l'écran.


================================================================================
18. MULTILINGUE
================================================================================

Le composant détecte la langue active :

    FR → contenu français

    EN → contenu anglais


Cela concerne notamment :

    → titres
    → descriptions
    → catégories
    → expériences
    → réalisations
    → textes de présentation


Si une traduction française n'est pas disponible pour une donnée,
la version anglaise est utilisée comme solution de repli.


================================================================================
19. CE QUE CE FICHIER NE CONTIENT PAS DIRECTEMENT
================================================================================

Les informations détaillées des compétences et expériences ne sont
pas écrites directement dans la présentation.

Elles viennent de :

    ../data/experience


Donc :

    experience.ts
          │
          ├── compétences
          └── expériences
                    │
                    ▼
          ExperienceSection.tsx
                    │
                    ▼
              AFFICHAGE


Le fichier actuel s'occupe principalement de la présentation,
de la traduction, des icônes et de l'organisation visuelle.


================================================================================
20. RÉSUMÉ DU PARCOURS UTILISATEUR
================================================================================

Le visiteur parcourt la page de cette manière :

    ← Back
       │
       ▼
    TRACK RECORD & EXPERTISE
       │
       ▼
    Skills & Experience
       │
       ▼
    Positionnement professionnel
       │
       ▼
    ⚡ Tech Stack & Capabilities
       │
       ├── Frontend
       ├── Backend
       └── Databases & DevOps
       │
       ▼
    💼 Professional Journey
       │
       ├── Expérience 1
       ├── Expérience 2
       └── ...
       │
       ▼
    Technologies + réalisations


================================================================================
OBJECTIF GLOBAL
================================================================================

Cette page doit permettre au visiteur de répondre rapidement à quatre
questions :

    ① QU'EST-CE QUE TU SAIS FAIRE ?
       → Tech Stack & Capabilities

    ② AVEC QUELLES TECHNOLOGIES ?
       → Icônes + badges technologiques

    ③ QUEL EST TON PARCOURS ?
       → Professional Journey

    ④ QUELLE VALEUR AS-TU DÉJÀ PRODUITE ?
       → Key Impact & Achievements


En résumé :

    COMPÉTENCES
         +
    TECHNOLOGIES
         +
    EXPÉRIENCE
         +
    RÉALISATIONS
         ↓
    PROFIL TECHNIQUE COMPLET DU DÉVELOPPEUR


Le visiteur ne voit donc pas simplement une liste de technologies :
il découvre une présentation structurée de ton expertise technique
ET de ton expérience professionnelle.
================================================================================
*/