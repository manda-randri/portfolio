import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeroCanvas } from '../components/HeroCanvas';

function Hero() {
  const { t } = useTranslation();
  const heroContainerRef = useRef<HTMLDivElement | null>(null);

  const titlePart2 = t('hero.title_part2');

  return (
    <section id="home" ref={heroContainerRef} className="relative h-[180vh] w-full bg-base-100">
      {/* Zone Sticky bloquée à l'écran pendant le défilement */}
      <div className="sticky top-0 flex min-h-[calc(100vh-4rem)] h-screen w-full items-center justify-center overflow-hidden px-6 py-12">
        
        {/* Conteneur principal */}
        <div className="container mx-auto grid grid-cols-1 items-center gap-10 lg:grid-cols-12 z-10">
          
          {/* Colonne Gauche : Copywriting & Typographie Premium */}
          <div className="flex flex-col items-start justify-center lg:col-span-7 xl:col-span-7 space-y-6">
            
            {/* Niveau 0 : Badge d'état minimaliste */}
            <div className="inline-flex items-center gap-2 rounded-full bg-base-200/70 px-3.5 py-1 text-[11px] font-semibold tracking-wider uppercase text-base-content/80 border border-base-300/80 shadow-xs backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>{t('hero.badge')}</span>
            </div>

            {/* Niveau 1 : H1 — Typographie fine, dégradé fluide */}
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl xl:text-5xl leading-[1.15] text-base-content">
              {t('hero.title_part1')}{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t('hero.title_highlight')}
              </span>
              {titlePart2 ? ` ${titlePart2}` : ''}
            </h1>

            {/* Niveau 2 : Sous-titre */}
            <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-base-content/70 font-normal">
              {t('hero.subtitle')}
            </p>

            {/* Niveau 3 : Boutons d'action (CTAs) */}
            <div className="flex flex-col gap-3 sm:flex-row pt-2 w-full sm:w-auto">
              <Link
                to="/projects"
                className="btn btn-primary btn-md shadow-md hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 font-medium"
              >
                {t('hero.cta_projects')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                to="/contact"
                className="btn btn-outline border-base-300 hover:border-primary btn-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 font-medium"
              >
                {t('hero.cta_contact')}
              </Link>
            </div>

            {/* Niveau 4 : Badges de compétences discrets */}
            <div className="flex flex-wrap items-center gap-2 pt-3 text-[11px] font-medium text-base-content/50">
              <span className="px-2.5 py-1 rounded-md bg-base-200/50 border border-base-300/50">React.js</span>
              <span className="px-2.5 py-1 rounded-md bg-base-200/50 border border-base-300/50">TypeScript</span>
              <span className="px-2.5 py-1 rounded-md bg-base-200/50 border border-base-300/50">Tailwind CSS</span>
              <span className="px-2.5 py-1 rounded-md bg-base-200/50 border border-base-300/50">Python</span>
              <span className="px-2.5 py-1 rounded-md bg-base-200/50 border border-base-300/50">SQL</span>
            </div>
          </div>

          {/* Colonne Droite : Canvas avec Glow discret */}
          <div className="relative flex items-center justify-center lg:col-span-5 xl:col-span-5 h-[320px] sm:h-[400px] w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-40 pointer-events-none" />

            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-base-300 shadow-xl bg-base-200/40 backdrop-blur-md">
              <HeroCanvas scrollContainerRef={heroContainerRef} totalFrames={90} />
              
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-base-100/70 via-transparent to-base-100/20" />
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-base-content/10 rounded-2xl" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;














/*
===============================================================================
RÔLE DE CE FICHIER : Hero.tsx
===============================================================================

Ce fichier construit la section HERO, c'est-à-dire la première grande zone
que l'utilisateur découvre sur la page d'accueil du portfolio.

C'est la section destinée à présenter immédiatement :

- qui est le développeur ;
- son positionnement professionnel ;
- ce qu'il construit ;
- les technologies qu'il utilise ;
- les deux actions principales proposées au visiteur ;
- un visuel animé à droite.

La section est également conçue pour réagir au défilement de la page grâce
au composant HeroCanvas.


===============================================================================
CE QUE L'UTILISATEUR VOIT À L'ÉCRAN
===============================================================================

┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  [ ● DISPONIBLE / BADGE ]                                                   │
│                                                                              │
│  SaaS & MVP Developer                                                       │
│  ────────────────────────────────────────────────────────────────────────   │
│  I build modern web applications and SaaS products from idea to production. │
│                                                                              │
│  [ View my projects → ]     [ Let's Work together ]                          │
│                                                                              │
│  [ React.js ] [ TypeScript ] [ Tailwind CSS ] [ Python ] [ SQL ]             │
│                                                                              │
│                                      ┌───────────────────────────────┐       │
│                                      │                               │       │
│                                      │       VISUEL ANIMÉ            │       │
│                                      │                               │       │
│                                      │       HeroCanvas              │       │
│                                      │                               │       │
│                                      │     animation / frames        │       │
│                                      │                               │       │
│                                      └───────────────────────────────┘       │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘


===============================================================================
1. BADGE DE STATUT
===============================================================================

En haut du bloc texte, l'utilisateur voit un petit badge arrondi contenant :

    ●  [texte du hero.badge]

Le point vert possède une animation de pulsation.

Cela donne visuellement l'impression d'un statut actif / disponible,
selon le texte réellement défini dans les traductions.


===============================================================================
2. TITRE PRINCIPAL
===============================================================================

Le titre principal est construit à partir de plusieurs éléments traduits :

    hero.title_part1
    hero.title_highlight
    hero.title_part2

Une partie du titre est mise en évidence avec un dégradé de couleurs.

Visuellement :

    ┌───────────────────────────────────────────────┐
    │ SaaS & MVP [Developer]                        │
    └───────────────────────────────────────────────┘
                       ↑
              partie mise en valeur


Le texte exact dépend des traductions présentes dans le projet.


===============================================================================
3. SOUS-TITRE / DESCRIPTION
===============================================================================

Sous le titre, l'utilisateur voit une phrase de présentation :

    hero.subtitle

Elle explique davantage le positionnement du développeur.

Le texte est volontairement plus discret que le titre principal.


===============================================================================
4. DEUX BOUTONS D'ACTION
===============================================================================

Sous la présentation, deux boutons sont affichés :

    ┌─────────────────────────┐   ┌────────────────────────────┐
    │ View my projects    →   │   │ Let's Work together        │
    └─────────────────────────┘   └────────────────────────────┘
              │                              │
              ▼                              ▼
         /projects                       /contact


Le premier bouton dirige vers la page des projets.

Le deuxième bouton dirige vers la page Contact.

Ces boutons constituent les deux principales actions proposées au visiteur
depuis le Hero.


===============================================================================
5. BADGES TECHNOLOGIQUES
===============================================================================

Sous les boutons, l'utilisateur voit plusieurs technologies :

    [ React.js ]
    [ TypeScript ]
    [ Tailwind CSS ]
    [ Python ]
    [ SQL ]


Ces badges servent à présenter rapidement les principales technologies
associées au profil du développeur.


===============================================================================
6. VISUEL ANIMÉ À DROITE
===============================================================================

La partie droite du Hero contient un grand cadre visuel.

    ┌──────────────────────────────────────────────┐
    │                                              │
    │                                              │
    │              HeroCanvas                     │
    │                                              │
    │         VISUEL / ANIMATION                  │
    │                                              │
    │                                              │
    └──────────────────────────────────────────────┘


Le composant HeroCanvas est chargé à l'intérieur de ce cadre.

Il reçoit notamment :

    - la référence du conteneur Hero ;
    - 90 frames.


Le code indique donc que le visuel est conçu pour être lié au défilement
du Hero.


===============================================================================
7. COMPORTEMENT AU SCROLL
===============================================================================

La section Hero possède une hauteur de :

                         180vh

Elle est donc plus grande qu'un écran classique.

À l'intérieur, le contenu principal est placé dans une zone :

                         STICKY

Cela signifie que pendant une partie du défilement, le contenu reste
visuellement bloqué à l'écran pendant que l'utilisateur fait défiler
la section.

Schéma simplifié :

    DÉBUT DE LA PAGE
           │
           ▼
    ┌───────────────────────────────┐
    │                               │
    │          HERO                 │
    │                               │
    │   Texte       HeroCanvas      │
    │                               │
    └───────────────────────────────┘
           │
           │ scroll
           ▼
    ┌───────────────────────────────┐
    │                               │
    │     contenu toujours visible  │
    │        pendant le scroll      │
    │                               │
    └───────────────────────────────┘
           │
           ▼
       fin du Hero


Le `heroContainerRef` permet de transmettre la référence de cette section
au composant HeroCanvas afin que celui-ci puisse utiliser le conteneur
comme référence pour son comportement lié au scroll.


===============================================================================
8. ORGANISATION VISUELLE DESKTOP
===============================================================================

Sur un écran large, le Hero est organisé en deux colonnes :

┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│   COLONNE GAUCHE                         COLONNE DROITE                    │
│                                                                            │
│   [ Badge ]                            ┌──────────────────────┐            │
│                                        │                      │            │
│   Grand titre                          │    HeroCanvas        │            │
│                                        │                      │            │
│   Description                          │    animation         │            │
│                                        │                      │            │
│   [ CTA ] [ CTA ]                      └──────────────────────┘            │
│                                                                            │
│   [React] [TS] [Python]                                                    │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘


La colonne gauche occupe davantage d'espace que la colonne droite.

Cela donne la priorité visuelle au message professionnel,
tout en conservant un visuel important à côté.


===============================================================================
9. VERSION PETIT ÉCRAN
===============================================================================

La grille passe sur une seule colonne.

Le contenu est donc organisé verticalement :

┌───────────────────────────────┐
│                               │
│          [ Badge ]            │
│                               │
│       Grand titre             │
│                               │
│       Description             │
│                               │
│    [ CTA ] [ CTA ]            │
│                               │
│   [React] [TS] [Python]       │
│                               │
│  ┌─────────────────────────┐  │
│  │                         │  │
│  │      HeroCanvas         │  │
│  │                         │  │
│  └─────────────────────────┘  │
│                               │
└───────────────────────────────┘


Le Hero reste donc adapté aux différentes tailles d'écran.


===============================================================================
10. EFFETS VISUELS
===============================================================================

Le cadre du visuel possède plusieurs effets :

    - bordure ;
    - ombre ;
    - arrière-plan légèrement transparent ;
    - effet de flou ;
    - halo lumineux autour du cadre ;
    - dégradé sombre/lumineux par-dessus le Canvas ;
    - contour interne léger.


L'objectif est de donner au visuel une apparence plus premium et intégrée
au design général du portfolio.


===============================================================================
11. TRADUCTION
===============================================================================

Plusieurs textes ne sont pas écrits directement dans ce composant.

Ils proviennent du système de traduction :

    hero.badge
    hero.title_part1
    hero.title_highlight
    hero.title_part2
    hero.subtitle
    hero.cta_projects
    hero.cta_contact


Cela permet au même Hero d'afficher différentes langues sans modifier
directement la structure du composant.


===============================================================================
RÔLE DANS LE PORTFOLIO
===============================================================================

Hero.tsx est la PREMIÈRE GRANDE IMPRESSION du portfolio.

Son parcours visuel est :

                 IDENTITÉ
                    ↓
              POSITIONNEMENT
                    ↓
              PRÉSENTATION
                    ↓
             APPEL À L'ACTION
                 ↙       ↘
             PROJETS     CONTACT
                    ↓
              VISUEL ANIMÉ
                    ↓
                 SCROLL


===============================================================================
À RETENIR
===============================================================================

Hero.tsx = INTRODUCTION + POSITIONNEMENT + CTA + VISUEL ANIMÉ

À gauche :
    → présentation professionnelle
    → titre
    → description
    → boutons d'action
    → technologies

À droite :
    → HeroCanvas
    → visuel animé lié au conteneur Hero

Et surtout :

    Hero.tsx
        ↓
    HeroCanvas
        ↓
    animation visuelle liée au défilement

Ce fichier est donc particulièrement important pour la première impression
du portfolio.
===============================================================================
*/