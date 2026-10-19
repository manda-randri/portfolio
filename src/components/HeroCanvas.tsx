import React, { useRef, useEffect, useCallback } from 'react';

interface HeroCanvasProps {
  totalFrames?: number;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({
  totalFrames = 90,
  scrollContainerRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Les images vivent dans une ref : plus d'attente que "tout" soit chargé pour afficher
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Valeurs pour l'interpolation LERP (smooth scroll)
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Indique qu'un nouveau dessin est nécessaire (image arrivée, redimensionnement…)
  const dirtyRef = useRef<boolean>(true);

  const isReady = (img?: HTMLImageElement) =>
    !!img && img.complete && img.naturalWidth > 0;

  // Retourne la frame demandée, ou la plus proche déjà chargée (jamais d'écran vide)
  const getBestImage = useCallback((index: number): HTMLImageElement | null => {
    const imgs = imagesRef.current;
    if (imgs.length === 0) return null;

    const target = Math.min(Math.max(Math.round(index), 0), imgs.length - 1);
    if (isReady(imgs[target])) return imgs[target];

    for (let offset = 1; offset < imgs.length; offset++) {
      const before = imgs[target - offset];
      if (isReady(before)) return before;
      const after = imgs[target + offset];
      if (isReady(after)) return after;
    }
    return null;
  }, []);

  // 1. Chargement progressif : frame 1 en priorité, le reste ensuite en arrière-plan
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = new Array(totalFrames);
    imagesRef.current = images;

    const srcFor = (i: number) =>
      `/frames/desk/frame_${String(i).padStart(3, '0')}.jpg`;

    const loadFrame = (i: number, highPriority = false) => {
      const img = new Image();
      img.decoding = 'async';
      if (highPriority) img.setAttribute('fetchpriority', 'high');

      const markReady = () => {
        if (isMounted) dirtyRef.current = true; // redessiner dès qu'une image arrive
      };
      img.onload = markReady;
      img.onerror = markReady;

      img.src = srcFor(i);
      images[i - 1] = img;
      return img;
    };

    // Première frame : demandée seule, avec la priorité maximale
    const first = loadFrame(1, true);

    const loadRest = () => {
      if (!isMounted) return;
      for (let i = 2; i <= totalFrames; i++) {
        loadFrame(i);
      }
    };

    // Le reste démarre dès que la première frame est reçue (ou a échoué)
    if (first.complete) {
      loadRest();
    } else {
      first.addEventListener('load', loadRest, { once: true });
      first.addEventListener('error', loadRest, { once: true });
    }

    return () => {
      isMounted = false;
    };
  }, [totalFrames]);

  // 2. Dessiner une frame avec gestion Retina (HiDPI) & Cover
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = getBestImage(index);
      if (!img) return;

      const dpr = window.devicePixelRatio || 1;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      // Correction haute résolution Retina
      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const imgWidth = img.naturalWidth || displayWidth;
      const imgHeight = img.naturalHeight || displayHeight;

      const ratio = Math.max(displayWidth / imgWidth, displayHeight / imgHeight);
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;
      const x = (displayWidth - newWidth) / 2;
      const y = (displayHeight - newHeight) / 2;

      ctx.clearRect(0, 0, displayWidth, displayHeight);
      ctx.drawImage(img, x, y, newWidth, newHeight);
      ctx.restore();
    },
    [getBestImage]
  );

  // 3. Boucle d'animation LERP pour une fluidité "Apple-like" (démarre immédiatement)
  useEffect(() => {
    const renderLoop = () => {
      // Formule LERP : current = current + (target - current) * factor
      const ease = 0.08;
      const diff = targetFrameRef.current - currentFrameRef.current;

      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * ease;
        drawFrame(currentFrameRef.current);
        dirtyRef.current = false;
      } else {
        currentFrameRef.current = targetFrameRef.current;
        // Au repos : on ne redessine que si nécessaire (nouvelle image, resize)
        if (dirtyRef.current) {
          drawFrame(currentFrameRef.current);
          // Reste "sale" tant qu'aucune image n'est exploitable
          dirtyRef.current = !getBestImage(currentFrameRef.current);
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [drawFrame, getBestImage]);

  // 4. Écoute du Scroll pour mettre à jour la frame cible
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      const rect = container.getBoundingClientRect();
      const totalScrollableDistance = container.clientHeight - window.innerHeight;

      if (totalScrollableDistance <= 0) return;

      const progress = Math.min(
        Math.max(-rect.top / totalScrollableDistance, 0),
        1
      );

      targetFrameRef.current = progress * (totalFrames - 1);
    };

    const handleResize = () => {
      dirtyRef.current = true;
      handleScroll();
    };

    handleScroll(); // position initiale (ex. rechargement en milieu de page)

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [totalFrames, scrollContainerRef]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
    </div>
  );
};





















/*
===============================================================================
RÔLE DE CE FICHIER : HeroCanvas.tsx
===============================================================================

Ce composant est responsable du VISUEL ANIMÉ présent dans le Hero.

Contrairement à Hero.tsx, qui organise le texte et les boutons,
HeroCanvas.tsx s'occupe principalement de :

- charger les 90 images qui composent l'animation ;
- afficher ces images dans un Canvas HTML ;
- adapter l'image à la taille du cadre ;
- rendre l'affichage net sur les écrans haute résolution ;
- associer l'animation au défilement de la page ;
- rendre la transition entre les images fluide.


===============================================================================
CE QUE L'UTILISATEUR VOIT
===============================================================================

Dans Hero.tsx, ce composant apparaît dans le cadre situé à droite :

┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                     VISUEL ANIMÉ                             │
│                                                              │
│        ┌──────────────────────────────────────────┐          │
│        │                                          │          │
│        │              IMAGE / FRAME               │          │
│        │                                          │          │
│        │         animation contrôlée par          │          │
│        │              le défilement               │          │
│        │                                          │          │
│        └──────────────────────────────────────────┘          │
│                                                              │
└──────────────────────────────────────────────────────────────┘


Le visiteur ne voit donc pas directement les 90 fichiers image.

Il voit une ANIMATION CONTINUE construite à partir de ces images.


===============================================================================
1. LES 90 IMAGES DE L'ANIMATION
===============================================================================

Le composant reçoit par défaut :

                         90 frames

Il recherche ensuite les images dans :

                         /frames/desk/

avec cette logique de nommage :

    frame_001.jpg
    frame_002.jpg
    frame_003.jpg
    ...
    frame_090.jpg


Ces images constituent les différentes étapes de l'animation.

On peut les imaginer comme les images d'un film :

    Frame 001 → Frame 002 → Frame 003 → ... → Frame 090


Chaque image représente donc une position différente du visuel.


===============================================================================
2. PRÉCHARGEMENT DES IMAGES
===============================================================================

Au chargement de la page, les 90 images sont préchargées.

L'objectif est d'éviter que l'animation apparaisse progressivement image
par image pendant que l'utilisateur fait défiler la page.

Pendant le chargement, l'utilisateur voit un indicateur :

┌──────────────────────────────────────────────┐
│                                              │
│                                              │
│                  ◌                           │
│              CHARGEMENT                      │
│                                              │
│                                              │
└──────────────────────────────────────────────┘


Lorsque toutes les images sont chargées :

    → le spinner disparaît ;
    → l'animation devient disponible.


===============================================================================
3. AFFICHAGE DANS UN CANVAS
===============================================================================

Les images ne sont pas affichées comme une simple série de balises <img>.

Elles sont dessinées dans un élément HTML :

                         CANVAS


Visuellement, le résultat est simplement :

┌──────────────────────────────────────────────┐
│                                              │
│               IMAGE ACTIVE                   │
│                                              │
│             affichée dans                    │
│               le Canvas                      │
│                                              │
└──────────────────────────────────────────────┘


Le Canvas permet de remplacer rapidement l'image affichée
à mesure que l'utilisateur fait défiler la page.


===============================================================================
4. LE DÉFILEMENT CONTRÔLE L'ANIMATION
===============================================================================

C'est le principe principal de ce composant.

Le composant observe le défilement de la section Hero.

Au fur et à mesure que l'utilisateur descend :

                         SCROLL
                           ↓
                           ↓
                    progression 0 → 1
                           ↓
                     frame 1 → 90


Exemple :

    Début du Hero
          ↓
       Frame 001

          ↓
       utilisateur descend

          ↓
       Frame 020

          ↓
       utilisateur continue

          ↓
       Frame 050

          ↓
       utilisateur continue

          ↓
       Frame 090

Ainsi, l'animation est directement liée à la position du visiteur
dans la section Hero.


===============================================================================
5. LE VISUEL EST CALCULÉ EN POURCENTAGE DE PROGRESSION
===============================================================================

Le composant calcule la progression du défilement entre :

                         0% → 100%

Puis transforme cette progression en numéro de frame.

Exemple simplifié :

    0%       → Frame 001
    25%      → Frame 023
    50%      → Frame 045
    75%      → Frame 068
    100%     → Frame 090


Cela permet de synchroniser l'animation avec le scroll.


===============================================================================
6. ANIMATION FLUIDE AVEC LERP
===============================================================================

Le composant n'affiche pas brutalement la frame cible.

Il utilise une interpolation appelée LERP.

Principe :

    Frame actuelle
          │
          │
          ▼
    Frame cible
          │
          ▼
    transition progressive


Par exemple, si l'utilisateur passe rapidement de :

    Frame 20 → Frame 70

le composant ne saute pas brutalement de 20 à 70.

Il effectue progressivement :

    20
    24
    28
    31
    34
    ...
    65
    68
    70


Le résultat visuel est une animation beaucoup plus fluide.


===============================================================================
7. POURQUOI L'ANIMATION PARAÎT FLUIDE
===============================================================================

Le composant utilise une boucle d'animation basée sur
requestAnimationFrame.

Schéma :

    Scroll
      ↓
    Frame cible
      ↓
    LERP
      ↓
    Frame actuelle
      ↓
    Canvas
      ↓
    Image affichée


Cette boucle continue tant que l'animation est active.


===============================================================================
8. ADAPTATION À LA TAILLE DU CADRE
===============================================================================

Le Canvas récupère sa largeur et sa hauteur réelles.

L'image est ensuite adaptée au cadre avec un comportement de type "cover".

Cela signifie que l'image remplit complètement la zone disponible.

Exemple :

┌──────────────────────────────────────────────┐
│██████████████████████████████████████████████│
│████████      IMAGE            ███████████████│
│██████████████████████████████████████████████│
└──────────────────────────────────────────────┘

L'image peut être légèrement recadrée afin de remplir toute la surface.


===============================================================================
9. SUPPORT DES ÉCRANS HAUTE RÉSOLUTION
===============================================================================

Le composant prend en compte :

                         devicePixelRatio

Cela permet d'adapter la résolution interne du Canvas aux écrans
haute densité / Retina.

Le but est que le visuel reste net lorsque l'écran possède beaucoup
de pixels.


===============================================================================
10. REDIMENSIONNEMENT DE L'ÉCRAN
===============================================================================

Le composant écoute également les changements de taille de la fenêtre.

Si l'utilisateur :

    - agrandit la fenêtre ;
    - réduit la fenêtre ;
    - change de taille d'écran ;

le calcul de la progression et l'affichage du Canvas peuvent être
réadaptés.


===============================================================================
11. CE QUE L'UTILISATEUR EXPÉRIMENTE
===============================================================================

L'expérience globale ressemble à ceci :

                    ARRIVÉE SUR LE HERO
                           │
                           ▼
                 ┌───────────────────┐
                 │   IMAGE INITIALE   │
                 │     Frame 001      │
                 └───────────────────┘
                           │
                           │ scroll
                           ▼
                 ┌───────────────────┐
                 │    ANIMATION       │
                 │  Frame 001 → ...  │
                 └───────────────────┘
                           │
                           │ scroll
                           ▼
                 ┌───────────────────┐
                 │   IMAGE FINALE    │
                 │     Frame 090      │
                 └───────────────────┘


Le visiteur a donc l'impression de contrôler une animation
en faisant simplement défiler la page.


===============================================================================
12. RELATION AVEC Hero.tsx
===============================================================================

Les deux fichiers travaillent ensemble :

                    Hero.tsx
                       │
                       │ fournit :
                       │
                       ├── conteneur du Hero
                       └── référence du scroll
                       │
                       ▼
                 HeroCanvas.tsx
                       │
                       ├── charge les frames
                       ├── calcule le scroll
                       ├── sélectionne la frame
                       ├── applique le LERP
                       └── dessine dans le Canvas
                       │
                       ▼
                VISUEL ANIMÉ À L'ÉCRAN


Donc :

    Hero.tsx
    = ORGANISE LE HERO

    HeroCanvas.tsx
    = ANIME LE VISUEL DU HERO


===============================================================================
À RETENIR
===============================================================================

HeroCanvas.tsx = MOTEUR DE L'ANIMATION DU HERO

Il transforme :

    90 images JPG
          +
    position du scroll
          +
    interpolation LERP
          ↓
    une animation fluide affichée dans un Canvas.


En résumé :

    /frames/desk/frame_001.jpg
    /frames/desk/frame_002.jpg
    /frames/desk/frame_003.jpg
                  ...
    /frames/desk/frame_090.jpg
                  │
                  ▼
            HeroCanvas
                  │
                  ▼
          Animation liée au scroll
                  │
                  ▼
        VISUEL ANIMÉ DU HERO


C'est donc ce composant qui donne au Hero son caractère interactif :
le défilement de l'utilisateur devient le contrôleur de l'animation.
===============================================================================
*/