export interface LocalizedSkillCategory {
  title: string;
  skills: { 
    name: string; 
    description?: string 
  }[];
}

export interface SkillCategory {
  icon: string;
  en: LocalizedSkillCategory;
  fr: LocalizedSkillCategory;
}

export interface LocalizedExperienceContent {
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  type: 'freelance' | 'emploi' | 'projet';
  technologies: string[];
  en: LocalizedExperienceContent;
  fr: LocalizedExperienceContent;
}

export const skillCategories: SkillCategory[] = [
  {
    icon: 'frontend',
    en: {
      title: 'Frontend Development',
      skills: [
        { name: 'React.js / Next.js', description: 'Component architecture, Hooks, State management' },
        { name: 'TypeScript', description: 'Strict typing, Generics, Interfaces' },
        { name: 'Tailwind CSS / DaisyUI', description: 'Responsive design, custom themes & UI systems' },
        { name: 'HTML5 / CSS3 / Modern JS (ES6+)', description: 'Semantic HTML, DOM manipulation, Async/Await' },
      ],
    },
    fr: {
      title: 'Développement Frontend',
      skills: [
        { name: 'React.js / Next.js', description: 'Architecture composant, Hooks, Gestion d’état' },
        { name: 'TypeScript', description: 'Typage strict, Génériques, Interfaces' },
        { name: 'Tailwind CSS / DaisyUI', description: 'Design réactif, thèmes sur-mesure & systèmes UI' },
        { name: 'HTML5 / CSS3 / JS Moderne (ES6+)', description: 'HTML sémantique, manipulation DOM, Async/Await' },
      ],
    },
  },
  {
    icon: 'backend',
    en: {
      title: 'Backend Development',
      skills: [
        { name: 'Python (FastAPI / Django / Flask)', description: 'Data processing, API creation, Automation' },
        { name: 'Node.js / Express', description: 'Microservices, REST APIs, JSON handling' },
        { name: 'RESTful APIs & JSON', description: 'Endpoint design, authentication, performance' },
      ],
    },
    fr: {
      title: 'Développement Backend',
      skills: [
        { name: 'Python (FastAPI / Django / Flask)', description: 'Traitement de données, création d’APIs, Automatisation' },
        { name: 'Node.js / Express', description: 'Microservices, APIs REST, manipulation JSON' },
        { name: 'APIs RESTful & JSON', description: 'Design d’endpoints, authentification, performance' },
      ],
    },
  },
  {
    icon: 'devops',
    en: {
      title: 'Databases & DevOps',
      skills: [
        { name: 'SQL (PostgreSQL / MySQL)', description: 'Database modeling, query optimization, indexing' },
        { name: 'Git & GitHub Workflow', description: 'Version control, PR review, GitHub Actions' },
        { name: 'Vite / Webpack', description: 'Build optimization, module bundling, HMR' },
        { name: 'Deployment (Vercel / Docker)', description: 'CI/CD pipelines, containerization, hosting' },
      ],
    },
    fr: {
      title: 'Bases de données & DevOps',
      skills: [
        { name: 'SQL (PostgreSQL / MySQL)', description: 'Modélisation BDD, optimisation de requêtes, indexation' },
        { name: 'Git & GitHub Workflow', description: 'Gestion de versions, revue de PR, GitHub Actions' },
        { name: 'Vite / Webpack', description: 'Optimisation de build, bundling, HMR' },
        { name: 'Déploiement (Vercel / Docker)', description: 'Pipelines CI/CD, conteneurisation, hébergement' },
      ],
    },
  },
];

export const experiences: ExperienceItem[] = [
  {
    id: 'freelance-saas',
    company: 'Freelance / Upwork',
    type: 'freelance',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Python', 'SQL', 'DaisyUI', 'Vercel'],
    en: {
      role: 'Full-Stack Developer & SaaS Engineer',
      period: '2023 - Present',
      description: 'Designing, building, and deploying custom web applications and SaaS platforms for independent clients and SMBs.',
      achievements: [
        'Full end-to-end development of Predictify (e-commerce sales predictive analytics SaaS)',
        'Engineered Lactocontrol (Dairy quality control monitoring platform)',
        'Designed and built Espasy (Space booking and management web application)',
        'Optimized UI/UX performance and integrated fully responsive multi-device previews',
      ],
    },
    fr: {
      role: 'Développeur Full-Stack & Concepteur SaaS',
      period: '2023 - Présent',
      description: 'Conception, développement et déploiement d’applications web sur-mesure et de plateformes SaaS pour clients indépendants et PME.',
      achievements: [
        'Développement complet de Predictify (SaaS d’analyse prédictive de ventes e-commerce)',
        'Création de Lactocontrol (Application métier de suivi du contrôle qualité laitière)',
        'Conception d’Espasy (Plateforme de recherche et réservation d’espaces)',
        'Optimisation des performances UI/UX et intégration de mockups multi-devices réactifs',
      ],
    },
  },
  {
    id: 'fullstack-dev',
    company: 'Independent & Client Projects',
    type: 'projet',
    technologies: ['React.js', 'TypeScript', 'Python', 'PostgreSQL', 'Git', 'REST API'],
    en: {
      role: 'React / Python Developer',
      period: '2022 - 2023',
      description: 'Implementation of modular web architectures, database modeling, and creation of dynamic client-side interfaces.',
      achievements: [
        'Built real-time analytics dashboards with interactive data visualizations',
        'Designed database schemas and optimized SQL queries for high-volume data handling',
        'Integrated automated quality control workflows and complex business rules',
      ],
    },
    fr: {
      role: 'Développeur React / Python',
      period: '2022 - 2023',
      description: 'Mise en œuvre d’architectures modulaires complexes, modélisation de bases de données et intégration d’interfaces utilisateurs dynamiques.',
      achievements: [
        'Implémentation de dashboards analytiques en temps réel avec graphiques interactifs',
        'Modélisation et optimisation de requêtes SQL pour le traitement de volumes de données',
        'Mise en place de flux de travail de contrôle qualité et de règles métier strictes',
      ],
    },
  },
];





/*
========================================================
RÔLE DE CE FICHIER : DATA / CONTENU DE LA PAGE EXPERIENCE
========================================================

Ce fichier ne crée pas directement l'interface graphique.

Il contient les DONNÉES que ExperienceSection.tsx utilise
pour construire visuellement la page :

    experience.ts
          │
          ├──► Compétences / Tech Stack
          │
          └──► Expériences professionnelles
                    │
                    ▼
           ExperienceSection.tsx
                    │
                    ▼
              Écran utilisateur


========================================================
1. GESTION DES NIVEAUX DE COMPÉTENCES
========================================================

Le fichier définit 3 niveaux possibles :

    EN                          FR
    ─────────────────────────────────────
    Expert              →      Expert
    Advanced            →      Avancé
    Intermediate        →      Intermédiaire

Ces niveaux servent à afficher le niveau de maîtrise
de chaque technologie.

Exemple visuel possible :

    React.js / Next.js
    ████████████████░░░░  Advanced

    TypeScript
    ████████████████░░░░  Advanced

    Tailwind CSS / DaisyUI
    ████████████████████  Expert


========================================================
2. CATÉGORIES DE COMPÉTENCES
========================================================

Le fichier définit 3 grandes catégories :

    🎨 Frontend Development
    ⚙️ Backend Development
    🛢️ Databases & DevOps


Chaque catégorie possède :

    • une icône
    • un titre anglais
    • un titre français
    • une liste de technologies
    • un niveau pour chaque technologie
    • éventuellement une courte description


L'utilisateur peut donc voir une structure similaire à :

    ┌──────────────────────────────┐
    │ 🎨 Frontend Development      │
    │                              │
    │ React.js / Next.js           │
    │ Advanced                     │
    │ Component architecture...    │
    │                              │
    │ TypeScript                   │
    │ Advanced                     │
    │ Strict typing...             │
    │                              │
    │ Tailwind CSS / DaisyUI       │
    │ Expert                       │
    │ Responsive design...         │
    └──────────────────────────────┘


    ┌──────────────────────────────┐
    │ ⚙️ Backend Development       │
    │                              │
    │ Python                       │
    │ Advanced                     │
    │ Data processing...           │
    │                              │
    │ Node.js / Express            │
    │ Intermediate                 │
    └──────────────────────────────┘


    ┌──────────────────────────────┐
    │ 🛢️ Databases & DevOps        │
    │                              │
    │ SQL                          │
    │ Advanced                     │
    │                              │
    │ Git & GitHub Workflow        │
    │ Advanced                     │
    │                              │
    │ Vite / Webpack               │
    │ Advanced                     │
    └──────────────────────────────┘


========================================================
3. BILINGUISME
========================================================

Chaque catégorie possède deux versions :

    en → contenu anglais
    fr → contenu français

Exemple :

    EN
    Frontend Development
    React.js / Next.js
    Advanced

    FR
    Développement Frontend
    React.js / Next.js
    Avancé

ExperienceSection.tsx choisit normalement la version
correspondant à la langue actuellement sélectionnée
sur le portfolio.


========================================================
4. DESCRIPTION DES COMPÉTENCES
========================================================

Chaque compétence peut avoir une description complémentaire.

Exemple :

    TypeScript
    Advanced

    "Strict typing, Generics, Interfaces"

L'objectif est de ne pas seulement montrer le nom
de la technologie, mais également ce qui est maîtrisé
dans cette technologie.

À l'écran, cela permet donc de présenter :

    Technologie
          ↓
    Niveau de maîtrise
          ↓
    Domaines de compétence


========================================================
5. DONNÉES DES EXPÉRIENCES
========================================================

La deuxième grande partie du fichier contient :

    experiences

Elle décrit le parcours professionnel affiché dans
la section "Experience" / "Skills & Experience".

Chaque expérience contient :

    • id
    • entreprise / contexte
    • type
    • technologies utilisées
    • contenu anglais
    • contenu français


========================================================
6. PREMIÈRE EXPÉRIENCE
========================================================

Contexte :

    Freelance / Upwork

Type :

    freelance

Rôle :

    Full-Stack Developer & SaaS Engineer

Période :

    2023 - Present

Technologies :

    React
    TypeScript
    Tailwind CSS
    Python
    SQL
    DaisyUI
    Vercel


L'utilisateur voit donc une expérience centrée sur :

    développement Full-Stack
             +
    conception SaaS
             +
    développement d'applications web
             +
    déploiement


Les réalisations présentées comprennent notamment :

    • Predictify
    • Lactocontrol
    • Espasy
    • optimisation UI/UX
    • responsive multi-device


Visuellement, cela peut être représenté comme :

    ● 2023 - Present
    │
    ├── Full-Stack Developer & SaaS Engineer
    │
    ├── Freelance / Upwork
    │
    ├── Description de l'activité
    │
    ├── Achievements
    │    ├── Predictify
    │    ├── Lactocontrol
    │    ├── Espasy
    │    └── UI/UX & responsive
    │
    └── React • TypeScript • Python • SQL • ...


========================================================
7. DEUXIÈME EXPÉRIENCE
========================================================

Contexte :

    Independent & Client Projects

Type :

    projet

Rôle :

    React / Python Developer

Période :

    2022 - 2023


Cette expérience présente davantage :

    • architectures web modulaires
    • modélisation de bases de données
    • interfaces dynamiques
    • dashboards analytiques
    • optimisation SQL
    • automatisation
    • règles métier


À l'écran, l'utilisateur peut donc voir :

    ● 2022 - 2023
    │
    ├── React / Python Developer
    │
    ├── Independent & Client Projects
    │
    ├── Description
    │
    ├── Real-time analytics dashboards
    ├── Database / SQL optimization
    └── Quality control workflows


========================================================
8. VERSION ANGLAISE ET FRANÇAISE DES EXPÉRIENCES
========================================================

Comme pour les compétences, chaque expérience possède :

    en → contenu anglais
    fr → contenu français

Cela concerne :

    • le rôle
    • la période
    • la description
    • les réalisations

Les technologies et le nom des entreprises restent
principalement identiques.


========================================================
9. CE QUE CE FICHIER REPRÉSENTE DANS LE PORTFOLIO
========================================================

Ce fichier est essentiellement la "BASE DE DONNÉES"
statique de la page Experience.

Il répond à la question :

    "QUEL CONTENU doit être affiché ?"

Alors que :

    ExperienceSection.tsx

répond plutôt à :

    "COMMENT ce contenu doit-il être affiché ?"


Architecture :

    experience.ts
        │
        │  compétences
        │  expériences
        │  technologies
        │  descriptions
        │
        ▼
    ExperienceSection.tsx
        │
        │  cartes
        │  titres
        │  timeline
        │  badges
        │
        ▼
    PAGE EXPERIENCE
        │
        ├── Tech Stack & Capabilities
        │
        └── Professional Journey
             & Key Accomplishments


========================================================
EN RÉSUMÉ
========================================================

Ce fichier ne dessine pas la page.

Il stocke le contenu qui permet à la page
"Skills & Experience" de présenter :

    ✓ les compétences techniques
    ✓ les niveaux de maîtrise
    ✓ les descriptions techniques
    ✓ les catégories Frontend / Backend / DevOps
    ✓ les expériences professionnelles
    ✓ les réalisations importantes
    ✓ les technologies utilisées
    ✓ les versions anglaise et française

C'est donc le fichier qui contient principalement
le CONTENU MÉTIER de la section Experience.
*/