import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const Projects: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative isolate">
      {/* ARRIÈRE-PLAN : lueurs diffuses « Glassmorphism » (décoratif, derrière le contenu) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-[26rem] w-[26rem] rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute top-[18%] -right-20 h-[24rem] w-[24rem] rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute top-[42%] -left-28 h-[26rem] w-[26rem] rounded-full bg-violet-400/20 blur-3xl" />
        <div className="absolute top-[64%] -right-24 h-[26rem] w-[26rem] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-[22rem] w-[22rem] rounded-full bg-sky-400/20 blur-3xl" />
      </div>

      {/* Header Section (Espacement réduit pour remonter le tout) */}
      <div className="mb-10 sm:mb-12 text-center max-w-2xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-base-content mb-3">
          {t('projects.title', 'Applications Web & SaaS Sur Mesure')}
        </h2>
        <p className="text-base-content/70 text-sm sm:text-base leading-relaxed">
          {t(
            'projects.subtitle',
            'Découvrez une sélection de projets récents conçus pour répondre à des problématiques métier concrètes.'
          )}
        </p>
      </div>

      {/* Grid de Projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
          />
        ))}
      </div>

      {/* Banner Call to Action - Bas de Section */}
      <div className="mt-12 sm:mt-14 p-6 sm:p-8 rounded-2xl bg-base-200/50 border border-base-300 text-center relative z-10 max-w-3xl mx-auto shadow-sm">
        <h3 className="text-lg font-bold text-base-content mb-1.5">
          {t('contact.cta_title', 'Vous avez un projet similaire en tête ?')}
        </h3>
        <p className="text-xs sm:text-sm text-base-content/70 max-w-lg mx-auto mb-6">
          {t(
            'contact.cta_subtitle',
            'Discutons de vos besoins et transformons vos idées en applications performantes.'
          )}
        </p>
        
        <Link to="/contact" className="btn btn-primary btn-sm sm:btn-md gap-2">
          {t('hero.cta_contact', 'Start a project')}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default Projects;






/*
================================================================================
PROJECTS.TSX — CE QUE LE FICHIER FAIT ET CE QUE L’UTILISATEUR VOIT
================================================================================

RÔLE DU FICHIER
---------------
Ce composant construit la SECTION "PROJECTS" du portfolio.

Il ne contient pas directement les informations détaillées de chaque projet.
Il récupère la liste des projets depuis `projects.ts`, puis demande à
`ProjectCard` d'afficher chaque projet.

Flux :

    projects.ts
         │
         │ liste des projets
         ▼
      Projects.tsx
         │
         │ pour chaque projet
         ▼
     ProjectCard.tsx
         │
         ▼
    CARTE DU PROJET


================================================================================
1. STRUCTURE GÉNÉRALE VISIBLE PAR L’UTILISATEUR
================================================================================

La section apparaît globalement comme ceci :

┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│                    [ PROJETS & RÉALISATIONS ]                     │
│                                                                    │
│              Applications Web & SaaS Sur Mesure                   │
│                                                                    │
│   Découvrez une sélection de projets récents conçus pour répondre  │
│   à des problématiques métier concrètes.                          │
│                                                                    │
│                                                                    │
│   ┌────────────────┐  ┌────────────────┐  ┌────────────────┐       │
│   │   PROJECT 1    │  │   PROJECT 2    │  │   PROJECT 3    │       │
│   │                │  │                │  │                │       │
│   │     IMAGE      │  │     IMAGE      │  │     IMAGE      │       │
│   │                │  │                │  │                │       │
│   │   description  │  │   description  │  │   description  │       │
│   └────────────────┘  └────────────────┘  └────────────────┘       │
│                                                                    │
│                                                                    │
│   ┌────────────────────────────────────────────────────────────┐   │
│   │              Vous avez un projet similaire en tête ?       │   │
│   │                                                            │   │
│   │   Discutons de vos besoins et transformons vos idées      │   │
│   │   en applications performantes.                            │   │
│   │                                                            │   │
│   │                    [ Start a project → ]                    │   │
│   └────────────────────────────────────────────────────────────┘   │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘


================================================================================
2. EN-TÊTE DE LA SECTION
================================================================================

Tout en haut, l'utilisateur voit un petit badge :

    [ PROJETS & RÉALISATIONS ]

Puis le titre principal :

    Applications Web & SaaS Sur Mesure

Puis une courte description :

    Découvrez une sélection de projets récents conçus pour répondre
    à des problématiques métier concrètes.


L'ensemble est centré horizontalement.

L'objectif est de présenter clairement au visiteur ce qu'il va découvrir
dans cette section.


================================================================================
3. ARRIÈRE-PLAN
================================================================================

La section possède également une décoration visuelle discrète en arrière-plan.

L'utilisateur peut percevoir une légère zone lumineuse/floue derrière
le contenu.

Elle reste subtile et ne doit pas empêcher la lecture.

Son rôle est principalement esthétique :

    contenu principal
          ↓
    ┌───────────────────────────────┐
    │       léger halo visuel       │
    │             ✦                 │
    │    cartes de projets          │
    └───────────────────────────────┘


================================================================================
4. AFFICHAGE DES PROJETS
================================================================================

Le composant parcourt automatiquement la liste des projets.

Chaque projet devient une `ProjectCard`.

Par exemple, si `projects.ts` contient :

    Projet 1
    Projet 2
    Projet 3

L'utilisateur voit :

    ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
    │   Projet 1   │   │   Projet 2   │   │   Projet 3   │
    │              │   │              │   │              │
    │    IMAGE     │   │    IMAGE     │   │    IMAGE     │
    │              │   │              │   │              │
    │   détails    │   │   détails    │   │   détails    │
    └──────────────┘   └──────────────┘   └──────────────┘


Le nombre de cartes dépend donc directement du nombre de projets présents
dans `projects.ts`.


================================================================================
5. ORGANISATION SUR GRAND ÉCRAN
================================================================================

Sur un écran large, les projets sont organisés en 3 colonnes :

    ┌───────────┐  ┌───────────┐  ┌───────────┐
    │ Projet 1  │  │ Projet 2  │  │ Projet 3  │
    └───────────┘  └───────────┘  └───────────┘

S'il y a davantage de projets :

    ┌───────────┐  ┌───────────┐  ┌───────────┐
    │ Projet 1  │  │ Projet 2  │  │ Projet 3  │
    └───────────┘  └───────────┘  └───────────┘

    ┌───────────┐  ┌───────────┐  ┌───────────┐
    │ Projet 4  │  │ Projet 5  │  │ Projet 6  │
    └───────────┘  └───────────┘  └───────────┘


================================================================================
6. ORGANISATION SUR TABLETTE
================================================================================

Sur une largeur moyenne, la grille passe à 2 colonnes :

    ┌───────────────┐  ┌───────────────┐
    │    Projet 1   │  │    Projet 2   │
    └───────────────┘  └───────────────┘

    ┌───────────────┐  ┌───────────────┐
    │    Projet 3   │  │    Projet 4   │
    └───────────────┘  └───────────────┘


================================================================================
7. ORGANISATION SUR MOBILE
================================================================================

Sur téléphone, les cartes passent automatiquement en une seule colonne :

    ┌───────────────────────┐
    │       Projet 1        │
    │        IMAGE          │
    │       détails         │
    └───────────────────────┘

    ┌───────────────────────┐
    │       Projet 2        │
    │        IMAGE          │
    │       détails         │
    └───────────────────────┘

    ┌───────────────────────┐
    │       Projet 3        │
    │        IMAGE          │
    │       détails         │
    └───────────────────────┘


La section s'adapte donc automatiquement aux différentes tailles
d'écran.


================================================================================
8. CE QUE PROJECTS.TSX NE FAIT PAS
================================================================================

Ce fichier ne construit pas lui-même le contenu détaillé des cartes.

Il ne gère pas directement :

    → les images
    → les miniatures
    → le mode plein écran
    → les flèches de galerie
    → les technologies
    → les fonctionnalités
    → les liens GitHub / YouTube

Tout cela est géré par :

    ProjectCard.tsx


Projects.tsx joue plutôt le rôle de CONTENEUR DE LA SECTION.


================================================================================
9. BOUTON FINAL "START A PROJECT"
================================================================================

Après toutes les cartes, l'utilisateur trouve un bloc d'appel à l'action.

Visuellement :

┌────────────────────────────────────────────────────────────┐
│                                                            │
│       Vous avez un projet similaire en tête ?             │
│                                                            │
│  Discutons de vos besoins et transformons vos idées       │
│  en applications performantes.                             │
│                                                            │
│                 [ Start a project → ]                      │
│                                                            │
└────────────────────────────────────────────────────────────┘


Ce bloc sert à transformer l'intérêt du visiteur en prise de contact.


================================================================================
10. NAVIGATION VERS LA PAGE CONTACT
================================================================================

Lorsque l'utilisateur clique sur :

    [ Start a project → ]

Il est envoyé vers :

    /contact


Il ne s'agit donc pas d'un simple lien vers un élément `#contact`
sur la même page.

Le bouton utilise la navigation interne de React Router.

Parcours :

    PROJECTS
       │
       │ clic
       ▼
    CONTACT


L'utilisateur arrive directement sur la page Contact du portfolio.


================================================================================
11. TRADUCTION
================================================================================

Le composant utilise le système i18next.

Les textes de la section peuvent donc être traduits.

Les principaux éléments concernés sont :

    Badge
    ↓
    Projets & Réalisations

    Titre
    ↓
    Applications Web & SaaS Sur Mesure

    Description
    ↓
    Découvrez une sélection de projets récents...

    CTA
    ↓
    Vous avez un projet similaire en tête ?

    Bouton
    ↓
    Start a project


Si une traduction spécifique est disponible dans les fichiers
de traduction, elle sera utilisée.


================================================================================
12. STRUCTURE GLOBALE DU PARCOURS UTILISATEUR
================================================================================

Le visiteur arrive dans la section :

              PROJECTS
                 │
                 ▼
    ┌──────────────────────────┐
    │ Présentation de la      │
    │ section                  │
    └────────────┬─────────────┘
                 ▼
    ┌──────────────────────────┐
    │ Carte Projet 1           │
    └────────────┬─────────────┘
                 ▼
    ┌──────────────────────────┐
    │ Carte Projet 2           │
    └────────────┬─────────────┘
                 ▼
    ┌──────────────────────────┐
    │ Carte Projet 3           │
    └────────────┬─────────────┘
                 ▼
    ┌──────────────────────────┐
    │ Appel à l'action         │
    │ "Start a project"        │
    └────────────┬─────────────┘
                 │
                 │ clic
                 ▼
             CONTACT


================================================================================
13. RÔLE DANS L’ARCHITECTURE DU PORTFOLIO
================================================================================

Ce fichier se situe entre les données des projets et leur affichage.

    src/data/projects.ts
             │
             │ données
             ▼
       Projects.tsx
             │
             │ distribution
             ▼
       ProjectCard.tsx
             │
             ▼
       VISITEUR


On peut retenir très simplement :

    projects.ts
    = QUELS projets afficher ?

    Projects.tsx
    = OÙ et COMMENT organiser les projets dans la section ?

    ProjectCard.tsx
    = COMMENT présenter chaque projet ?


================================================================================
OBJECTIF FINAL
================================================================================

Projects.tsx constitue donc la vitrine principale des réalisations.

Son objectif est de permettre au visiteur de :

    ① comprendre rapidement ce que contient la section
    ② parcourir les différents projets
    ③ ouvrir chaque projet en détail
    ④ découvrir les différentes interfaces
    ⑤ puis passer naturellement à l'action

                         PROJECTS
                            ↓
                    Découverte des projets
                            ↓
                    Intérêt du visiteur
                            ↓
                    [ Start a project → ]
                            ↓
                         CONTACT
================================================================================
*/