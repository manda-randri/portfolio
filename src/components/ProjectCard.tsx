import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t, i18n } = useTranslation();

  const activeLang = i18n.resolvedLanguage || i18n.language || 'fr';
  const currentLang = (activeLang.substring(0, 2) as 'fr' | 'en') || 'fr';

  const localizedContent = project[currentLang] || project.fr || project.en;

  const [activeImage, setActiveImage] = useState<string | undefined>(
    project.heroImage
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);

  const galleryList = useMemo(() => {
    return [
      ...(project.heroImage ? [project.heroImage] : []),
      ...(project.gallery || []),
    ];
  }, [project.heroImage, project.gallery]);

  const currentImage = activeImage || project.heroImage;

  const currentImageIndex = useMemo(() => {
    if (!currentImage) return 0;
    const idx = galleryList.indexOf(currentImage);
    return idx !== -1 ? idx : 0;
  }, [galleryList, currentImage]);

  // Handle opening/closing fullscreen container & body scroll lock
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      // Tentative de passage en mode plein écran natif du navigateur
      if (fullscreenContainerRef.current && fullscreenContainerRef.current.requestFullscreen) {
        fullscreenContainerRef.current.requestFullscreen().catch(() => {
          // Ignorer si refusé par les politiques du navigateur, le mode fixed de l'overlay prend le relais
        });
      }
    } else {
      document.body.style.overflow = '';
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Synchronize ESC or manual exit from browser fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isModalOpen]);

  // Keyboard navigation for full-screen modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      } else if (e.key === 'ArrowRight') {
        const nextIdx = (currentImageIndex + 1) % galleryList.length;
        setActiveImage(galleryList[nextIdx]);
      } else if (e.key === 'ArrowLeft') {
        const nextIdx = (currentImageIndex - 1 + galleryList.length) % galleryList.length;
        setActiveImage(galleryList[nextIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentImageIndex, galleryList]);

  const labels = {
    expand: t('projectCard.expand', "Agrandir l'aperçu"),
    noScreens: t('projectCard.noScreens', "Captures HD en cours d'intégration"),
    screens: t('projectCard.screens', "Écrans :"),
    problemTitle: t('projectCard.problemTitle', "The Problem"),
    solutionTitle: t('projectCard.solutionTitle', "The Solution"),
    featuresTitle: t('projectCard.featuresTitle', "Key Features"),
    demoVideo: t('projectCard.demoVideo', "Watch Demo"),
    githubPro: t('projectCard.githubPro', "GitHub — Pro"),
    inspect: t('projectCard.inspect', "Explore Gallery"),
    close: t('projectCard.close', "Fermer"),
  };

  const handleThumbnailClick = (imgUrl: string) => {
    setActiveImage(imgUrl);
  };

  return (
    <>
      <div className="group relative bg-base-100 rounded-2xl border border-base-300/80 hover:border-primary/60 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div>
          {/* En-tête du projet */}
          <div className="p-6 pb-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-2xl font-black text-base-content tracking-tight group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              <span className="badge badge-primary badge-outline text-[10px] font-semibold px-2.5 py-1">
                {project.category || 'SaaS / MVP'}
              </span>
            </div>
            {localizedContent.tagline && (
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {localizedContent.tagline}
              </p>
            )}
          </div>

          {/* Image principale */}
          <div
            className="relative aspect-[16/10] w-full overflow-hidden cursor-pointer bg-base-200/50"
            onClick={() => currentImage && setIsModalOpen(true)}
          >
            {currentImage ? (
              <>
                <img
                  src={currentImage}
                  alt={`${project.name} screenshot`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="btn btn-sm btn-primary gap-2 shadow-lg">
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    {labels.expand}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full text-base-content/40 p-6 text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-base-content/60">
                  {labels.noScreens}
                </span>
              </div>
            )}
          </div>

          {/* Mini-Galerie */}
          {galleryList.length > 1 && (
            <div className="flex items-center gap-2 p-3 bg-base-200/40 border-b border-base-300 overflow-x-auto">
              <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/40 pl-1 shrink-0">
                {labels.screens}
              </span>
              {galleryList.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => handleThumbnailClick(imgUrl)}
                  className={`relative aspect-[16/10] w-12 rounded-md overflow-hidden border transition-all shrink-0 ${
                    currentImage === imgUrl
                      ? 'border-primary ring-2 ring-primary/30 scale-105'
                      : 'border-base-300 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${project.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Body Content */}
          <div className="p-6 space-y-4">
            {/* Problem */}
            {localizedContent.problem && (
              <div className="p-3.5 rounded-xl bg-base-200/60 border border-base-300/80 relative">
                <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/50 block mb-1">
                  {labels.problemTitle}
                </span>
                <p className="text-xs text-base-content/80 font-medium leading-snug">
                  {localizedContent.problem}
                </p>
              </div>
            )}

            {/* Solution */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/50 block mb-1">
                {labels.solutionTitle}
              </span>
              <p className="text-sm text-base-content/80 leading-relaxed font-normal">
                {localizedContent.description}
              </p>
            </div>

            {/* Key Features */}
            {localizedContent.features && localizedContent.features.length > 0 && (
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-base-content/50 block mb-2">
                  {labels.featuresTitle}
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {localizedContent.features.slice(0, 3).map((feat, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-xs text-base-content/80"
                    >
                      <span className="flex-none w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-base-200 text-base-content/80 rounded-lg border border-base-300/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="p-6 pt-0 mt-auto">
          <div className="pt-4 border-t border-base-200/80 flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {project.access?.githubUrl && project.access.isGithubLocked && (
                <a
                  href={project.access.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline btn-xs rounded-lg gap-1.5"
                  title="Source code access is available with the Pro offer."
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  {labels.githubPro}
                </a>
              )}
              {project.access?.youtubeUrl && project.access.isYoutubeDemoReady && (
                <a
                  href={project.access.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-error btn-xs text-white rounded-lg gap-1"
                >
                  {labels.demoVideo}
                </a>
              )}
            </div>

            {currentImage && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-ghost btn-xs text-primary font-bold hover:bg-primary/10 rounded-lg ml-auto gap-1"
              >
                {labels.inspect}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Absolute 100% Native Fullscreen Viewer */}
      {isModalOpen && currentImage && (
        <div
          ref={fullscreenContainerRef}
          className="fixed inset-0 z-[99999] w-screen h-screen bg-black flex flex-col items-center justify-center overflow-hidden m-0 p-0"
        >
          {/* Top Bar: Title & Close Button */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-4 text-white z-20 bg-gradient-to-b from-black/90 via-black/50 to-transparent">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider bg-primary/20 text-primary-content border border-primary/40 px-3 py-1.5 rounded-md">
                {project.name}
              </span>
              <span className="text-sm font-medium text-white/80">
                {currentImageIndex + 1} / {galleryList.length}
              </span>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-md btn-circle btn-ghost text-white hover:bg-white/20"
              aria-label={labels.close}
            >
              ✕
            </button>
          </div>

          {/* Main Full-Screen Image Container */}
          <div className="relative w-full h-full flex items-center justify-center p-0 m-0">
            <img
              src={currentImage}
              alt={`${project.name} full-screen preview`}
              className="w-full h-full object-contain select-none pointer-events-none"
            />

            {/* Navigation Arrows */}
            {galleryList.length > 1 && (
              <>
                <button
                  onClick={() => {
                    const prevIdx = (currentImageIndex - 1 + galleryList.length) % galleryList.length;
                    setActiveImage(galleryList[prevIdx]);
                  }}
                  className="absolute left-8 btn btn-circle btn-lg bg-black/60 border-none text-white hover:bg-black/90 shadow-2xl"
                  aria-label="Previous image"
                >
                  ❮
                </button>
                <button
                  onClick={() => {
                    const nextIdx = (currentImageIndex + 1) % galleryList.length;
                    setActiveImage(galleryList[nextIdx]);
                  }}
                  className="absolute right-8 btn btn-circle btn-lg bg-black/60 border-none text-white hover:bg-black/90 shadow-2xl"
                  aria-label="Next image"
                >
                  ❯
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails Strip in Fullscreen */}
          {galleryList.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 p-3 bg-black/80 rounded-2xl backdrop-blur-md z-20 max-w-[95vw] overflow-x-auto border border-white/10 shadow-2xl">
              {galleryList.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative aspect-[16/10] w-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    currentImage === imgUrl
                      ? 'border-primary ring-2 ring-primary/50 scale-105'
                      : 'border-transparent opacity-40 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectCard;




















/*
================================================================================
PROJECTCARD.TSX — LECTURE RAPIDE : CE QUE L’UTILISATEUR VOIT
================================================================================

RÔLE DU FICHIER
---------------
Ce composant représente UNE carte de projet complète dans le portfolio.

Il prend les données d'un projet et les transforme en une présentation
visuelle interactive.

Flux général :

    projects.ts
        │
        ▼
    ProjectCard
        │
        ├── Informations du projet
        ├── Image principale
        ├── Galerie
        ├── Problème
        ├── Solution
        ├── Fonctionnalités
        ├── Technologies
        └── Actions
                │
                ▼
          VISITEUR DU PORTFOLIO


================================================================================
1. CE QUE L’UTILISATEUR VOIT AU PREMIER REGARD
================================================================================

La carte ressemble globalement à ceci :

┌──────────────────────────────────────────────────────────────┐
│  NOM DU PROJET                              [ SaaS / MVP ]  │
│  TAGLINE / POSITIONNEMENT                                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                   IMAGE DU PROJET                            │
│                                                              │
│              [ 👁 Agrandir l'aperçu ]                       │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ ÉCRANS :   [img] [img] [img] [img]                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ THE PROBLEM                                                  │
│ Explication du problème métier                               │
│                                                              │
│ THE SOLUTION                                                 │
│ Description de la solution                                   │
│                                                              │
│ KEY FEATURES                                                 │
│ • Fonctionnalité 1                                           │
│ • Fonctionnalité 2                                           │
│ • Fonctionnalité 3                                           │
│                                                              │
│ [React] [TypeScript] [Python] [SQL]                         │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ [🔒 GitHub — Pro] [Watch Demo]          Explore Gallery →   │
└──────────────────────────────────────────────────────────────┘


================================================================================
2. NOM + CATÉGORIE + TAGLINE
================================================================================

En haut :

    Predictify                              [ SaaS / MVP ]

    PREDICTIVE ANALYTICS

Le nom du projet est fortement mis en avant.

La catégorie apparaît sous forme de badge.

Le tagline apparaît juste sous le nom lorsqu'il existe.

Le contenu textuel du projet peut être affiché en français ou en anglais
selon la langue active du portfolio.


================================================================================
3. IMAGE PRINCIPALE
================================================================================

L'image principale occupe une grande partie de la carte.

Au repos :

    ┌──────────────────────────────────────┐
    │                                      │
    │          CAPTURE DU PROJET           │
    │                                      │
    └──────────────────────────────────────┘

Au survol :

    ┌──────────────────────────────────────┐
    │                                      │
    │          IMAGE légèrement            │
    │             agrandie                 │
    │                                      │
    │       [ 👁 Agrandir l'aperçu ]       │
    │                                      │
    └──────────────────────────────────────┘

L'utilisateur comprend donc immédiatement que l'image est interactive.

Un clic sur l'image ouvre la galerie plein écran.


================================================================================
4. SI AUCUNE IMAGE N’EST DISPONIBLE
================================================================================

La zone d'image n'est pas vide.

L'utilisateur voit un message du type :

    ┌──────────────────────────────────────┐
    │                                      │
    │  CAPTURES HD EN COURS D'INTÉGRATION │
    │                                      │
    └──────────────────────────────────────┘


================================================================================
5. MINI-GALERIE
================================================================================

Lorsque plusieurs images existent :

    ÉCRANS :

    [ 01 ] [ 02 ] [ 03 ] [ 04 ] [ 05 ]

L'image actuellement sélectionnée est mise en évidence.

Exemple :

    [ 01 ] [ 02 ] [ ★03★ ] [ 04 ]

Lorsque l'utilisateur clique sur une miniature :

    clic sur [04]
          ↓
    l'image principale devient l'image 04


La galerie permet donc de consulter rapidement plusieurs captures
du même projet.


================================================================================
6. "THE PROBLEM"
================================================================================

Si un problème est défini pour le projet, l'utilisateur voit :

    THE PROBLEM
    ─────────────────────────────────────
    Le problème métier que le projet
    cherche à résoudre.


Cette zone donne du contexte au projet.

Le visiteur ne voit donc pas uniquement "une application",
mais comprend également le besoin auquel elle répond.


================================================================================
7. "THE SOLUTION"
================================================================================

Ensuite :

    THE SOLUTION
    ─────────────────────────────────────
    Description de la solution proposée
    par le projet.


Cette partie explique concrètement ce que fait l'application.


================================================================================
8. "KEY FEATURES"
================================================================================

Si des fonctionnalités sont définies :

    KEY FEATURES

    • Fonctionnalité principale 1
    • Fonctionnalité principale 2
    • Fonctionnalité principale 3

Le composant affiche volontairement les 3 premières fonctionnalités
dans la carte.


================================================================================
9. TECHNOLOGIES UTILISÉES
================================================================================

En dessous :

    [ React ]
    [ TypeScript ]
    [ Tailwind CSS ]
    [ Python ]
    [ SQL ]

Les technologies sont présentées sous forme de badges.

Le visiteur peut donc identifier rapidement la stack technique du projet.


================================================================================
10. ACTIONS DISPONIBLES
================================================================================

Tout en bas de la carte :

    [ 🔒 GitHub — Pro ]    [ Watch Demo ]    Explore Gallery →


"GitHub — Pro"
    → visible uniquement si une URL GitHub existe.
    → ouvre le lien dans un nouvel onglet.
    → indique que l'accès au code source correspond à l'offre Pro.


"Watch Demo"
    → visible uniquement si une URL YouTube existe.
    → ouvre la démonstration dans un nouvel onglet.


"Explore Gallery →"
    → ouvre la galerie d'images en plein écran.


================================================================================
11. GALERIE PLEIN ÉCRAN
================================================================================

Lorsque l'utilisateur clique sur l'image ou sur
"Explore Gallery", une nouvelle interface apparaît par-dessus la page.

L'utilisateur voit :

┌──────────────────────────────────────────────────────────────────┐
│ [ PROJECT NAME ]                         2 / 5              ✕    │
│                                                                  │
│                                                                  │
│                                                                  │
│                    ❮     IMAGE DU PROJET     ❯                  │
│                                                                  │
│                                                                  │
│                                                                  │
│       [img]    [img]    [IMAGE]    [img]    [img]              │
└──────────────────────────────────────────────────────────────────┘

Le fond devient noir afin de mettre toute l'attention sur la capture
du projet.


================================================================================
12. COMPTEUR D’IMAGES
================================================================================

En haut de la galerie :

    [ PROJECT NAME ]                         2 / 5

Cela indique :

    image actuellement affichée = 2
    nombre total d'images       = 5


================================================================================
13. NAVIGATION AVEC LES FLÈCHES
================================================================================

Sur les côtés de l'image :

                    ❮          IMAGE          ❯

    ❮  → image précédente

    ❯  → image suivante

Lorsque l'utilisateur arrive à la dernière image, la navigation revient
au début de la galerie.

Exemple :

    1 → 2 → 3 → 4 → 5 → 1 → ...


================================================================================
14. NAVIGATION AU CLAVIER
================================================================================

Lorsque la galerie est ouverte :

    ←  → image précédente

    →  → image suivante

    ESC → fermer la galerie


Cela permet de consulter les captures sans utiliser constamment la souris.


================================================================================
15. MINIATURES DANS LE MODE PLEIN ÉCRAN
================================================================================

En bas de l'écran :

    [ image 1 ] [ image 2 ] [ IMAGE 3 ] [ image 4 ] [ image 5 ]

L'image active est visuellement mise en évidence.

L'utilisateur peut cliquer directement sur une miniature.


================================================================================
16. BOUTON DE FERMETURE
================================================================================

En haut à droite :

                              ✕

Un clic ferme la galerie et ramène l'utilisateur à la carte du projet.


================================================================================
17. MODE PLEIN ÉCRAN DU NAVIGATEUR
================================================================================

Lorsque la galerie est ouverte, le composant tente également d'utiliser
le véritable mode plein écran du navigateur.

Si le navigateur accepte :

    navigateur
    ┌────────────────────────────────────────────┐
    │                                            │
    │              GALERIE PLEIN ÉCRAN           │
    │                                            │
    └────────────────────────────────────────────┘

Si le navigateur refuse cette fonction, l'interface visuelle plein écran
prévue par le composant continue de fonctionner.


================================================================================
18. SCROLL DE LA PAGE BLOQUÉ
================================================================================

Pendant que la galerie est ouverte, l'utilisateur ne peut plus faire
défiler la page Projects située derrière.

Cela donne une expérience de visualisation indépendante :

    PAGE PROJECTS
         │
         │ clic
         ▼
    GALERIE PLEIN ÉCRAN
         │
         │ fermeture
         ▼
    PAGE PROJECTS


================================================================================
19. MULTILINGUE
================================================================================

Le composant récupère la langue actuellement utilisée par le portfolio.

Il peut donc adapter les textes de l'interface :

    FR
    ├── Agrandir l'aperçu
    ├── Écrans
    ├── Fermer
    └── autres traductions disponibles

    EN
    ├── textes anglais
    └── contenu anglais du projet


Les informations spécifiques au projet viennent également de la version
FR ou EN disponible dans les données.


================================================================================
20. RÉSUMÉ DU PARCOURS UTILISATEUR
================================================================================

Le visiteur découvre le projet dans cet ordre :

    ┌─────────────────────────┐
    │ ① NOM + CATÉGORIE       │
    └────────────┬────────────┘
                 ↓
    ┌─────────────────────────┐
    │ ② IMAGE PRINCIPALE      │
    └────────────┬────────────┘
                 ↓
    ┌─────────────────────────┐
    │ ③ GALERIE               │
    └────────────┬────────────┘
                 ↓
    ┌─────────────────────────┐
    │ ④ PROBLÈME              │
    └────────────┬────────────┘
                 ↓
    ┌─────────────────────────┐
    │ ⑤ SOLUTION              │
    └────────────┬────────────┘
                 ↓
    ┌─────────────────────────┐
    │ ⑥ KEY FEATURES          │
    └────────────┬────────────┘
                 ↓
    ┌─────────────────────────┐
    │ ⑦ TECHNOLOGIES          │
    └────────────┬────────────┘
                 ↓
    ┌─────────────────────────┐
    │ ⑧ GITHUB / DEMO         │
    └────────────┬────────────┘
                 ↓
    ┌─────────────────────────┐
    │ ⑨ EXPLORE GALLERY       │
    └─────────────────────────┘


================================================================================
21. OBJECTIF DU COMPOSANT
================================================================================

L'objectif est de transformer chaque projet du portfolio en une
présentation qui ressemble davantage à une véritable étude de cas
interactive qu'à une simple liste de projets.

Le visiteur doit pouvoir comprendre rapidement :

    → Quel est le projet ?
    → Quel problème résout-il ?
    → Quelle solution a été construite ?
    → Quelles sont ses fonctionnalités principales ?
    → Quelles technologies ont été utilisées ?
    → Puis-je voir les interfaces ?
    → Puis-je regarder une démo ?
    → Puis-je accéder au code selon l'offre proposée ?

En résumé :

    projects.ts
         ↓
    DONNÉES DU PROJET
         ↓
    ProjectCard.tsx
         ↓
    PRÉSENTATION VISUELLE + INTERACTIVE
         ↓
    EXPÉRIENCE DU VISITEUR


Ce composant est donc la "fiche interactive" de chaque projet
présenté dans le portfolio.
================================================================================
*/