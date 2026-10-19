// Imports Predictify
import predictifyHero from '../assets/images/projects/predictify/hero/1-landing page.PNG';
import predictifyMockup from '../assets/images/projects/predictify/hero/1- Photo pc & phone.png';
import predictifyAccueil from '../assets/images/projects/predictify/gallery/2-accueil.PNG';
import predictifyPricing from '../assets/images/projects/predictify/gallery/3-pricing.PNG';
import predictifyPricingSelected from '../assets/images/projects/predictify/gallery/4-pricing-selectionne.PNG';
import predictifyPayment from '../assets/images/projects/predictify/gallery/5-paiment.PNG';
import predictifyImport from '../assets/images/projects/predictify/gallery/6-page importation.PNG';
import predictifyAnalyse from "../assets/images/projects/predictify/gallery/7-page d ' analyse.PNG";
import predictifyAffichage from '../assets/images/projects/predictify/gallery/8- page d affichage.PNG';
import predictifyProduct from '../assets/images/projects/predictify/gallery/9-Produit séléctionné.PNG';

// Imports Lactocontrol
import lactoHero from '../assets/images/projects/lactocontrol/hero/1-Landing page.PNG';
import lactoMockup from '../assets/images/projects/lactocontrol/hero/1- Photo Pc & Phone.png';
import lactoAccueil from '../assets/images/projects/lactocontrol/gallery/2-Accueil.PNG';
import lactoSaisie from '../assets/images/projects/lactocontrol/gallery/3-Saisie.PNG';
import lactoResultats from '../assets/images/projects/lactocontrol/gallery/4-Résultats.PNG';
import lactoFonctionnalite from '../assets/images/projects/lactocontrol/gallery/5-Fonctionnalité.PNG';
import lactoDeconnexion from '../assets/images/projects/lactocontrol/gallery/6-Déconnexion.PNG';

// Imports Espasy
import espasyHero from '../assets/images/projects/espasy/hero/1-Landing page.PNG';
import espasyMockup from '../assets/images/projects/espasy/hero/1-Photo pc & phone.png';
import espasyAccueil from '../assets/images/projects/espasy/gallery/2-Accueil.PNG';
import espasyReservation from '../assets/images/projects/espasy/gallery/3-Réservation.PNG';
import espasyNotification from '../assets/images/projects/espasy/gallery/4-Notification.PNG';
import espasyAPropos from '../assets/images/projects/espasy/gallery/5- à propos.PNG';

export interface LocalizedContent {
  tagline: string;
  description: string; // Solution / Ce que fait l'application
  problem: string;     // Le problème ou besoin réel résolu
  features: string[];  // Éléments de preuve (fonctionnalités concrètes)
}

export interface ProjectAccess {
  youtubeUrl: string;        // Lien vidéo YouTube de démonstration
  isYoutubeDemoReady: boolean;
  githubUrl: string;         // Lien de paiement / dépôt GitHub Pro
  isGithubLocked: boolean;   // Accès Premium / Pro
  accessTier: 'PRO' | 'PREMIUM' | 'PUBLIC';
}

export interface Project {
  id: string;
  name: string;
  category?: string;
  en: LocalizedContent;
  fr: LocalizedContent;
  technologies: string[];
  heroImage?: string;
  gallery?: string[];
  mobileImages?: string[];
  access: ProjectAccess;
}

export const projects: Project[] = [
  {
    id: 'predictify',
    name: 'Predictify',
    category: 'SaaS / Analytics',
    en: {
      tagline: 'Your sales insights, at a glance',
      problem: 'E-commerce merchants often lack simple, centralized tools to visualize complex sales data and forecast inventory or revenue trends.',
      description: 'SaaS platform for e-commerce sales analytics and forecasting. Helps store owners track key metrics, analyze product performance, and predict financial trends through an automated data pipeline.',
      features: [
        'Interactive dashboard with real-time sales metrics',
        'Predictive analytics engine for forecasting sales trends',
        'Data import module (CSV files / transactions)',
        'Product catalog management and tracking',
        'Integrated subscription plans and pricing management',
      ],
    },
    fr: {
      tagline: 'Vos données de ventes, en un coup d’œil',
      problem: 'Les e-commerçants manquent souvent d’outils simples et centralisés pour visualiser des données complexes et anticiper leurs tendances de stock ou de chiffre d’affaires.',
      description: 'Plateforme SaaS d’analyse et de prévision des ventes e-commerce. Permet aux commerçants de suivre leurs métriques clés, d’analyser les performances produits et d’anticiper leurs revenus via un pipeline de données automatisé.',
      features: [
        'Tableau de bord interactif avec métriques de vente en temps réel',
        'Moteur d’analyse prédictive pour anticiper les tendances',
        'Module d’importation de données (fichiers CSV / transactions)',
        'Gestion et suivi du catalogue de produits',
        'Gestion intégrée des abonnements et des grilles tarifaires',
      ],
    },
    technologies: ['React.js', 'TypeScript', 'Python', 'SQL', 'Tailwind CSS'],
    heroImage: predictifyHero,
    mobileImages: [predictifyMockup],
    gallery: [
      predictifyAccueil,
      predictifyPricing,
      predictifyPricingSelected,
      predictifyPayment,
      predictifyImport,
      predictifyAnalyse,
      predictifyAffichage,
      predictifyProduct,
    ],
    access: {
      youtubeUrl: 'https://youtube.com/watch?v=PREDICTIFY_DEMO_ID', // Remplace par l'URL YouTube réelle de Predictify
      isYoutubeDemoReady: true,
      githubUrl: 'https://gumroad.com/l/predictify-pro', // Remplace par le lien de paiement Gumroad
      isGithubLocked: true,
      accessTier: 'PRO',
    },
  },
  {
    id: 'lactocontrol',
    name: 'Lactocontrol',
    category: 'Industrial / IoT',
    en: {
      tagline: 'Quality control, simplified',
      problem: 'Quality control and traceability in dairy processing are often manual and prone to data loss or human entry errors.',
      description: 'Business process management application for quality control tracking in yogurt production. Ensures sanitary and industrial compliance across manufacturing batches with secure traceability logs.',
      features: [
        'Automated data entry and tracking for quality metrics',
        'Batch traceability and processing pipeline monitoring',
        'Compliance alerts and critical metric thresholds',
        'Inspection dashboards and automated report generation',
      ],
    },
    fr: {
      tagline: 'Le contrôle qualité, simplifié',
      problem: 'Le contrôle qualité et la traçabilité dans la transformation laitière sont souvent manuels et sujets aux pertes de données ou aux erreurs de saisie.',
      description: 'Application métier de suivi du contrôle qualité pour la production laitière. Garantit la conformité sanitaire et industrielle des lots de fabrication avec des registres de traçabilité sécurisés.',
      features: [
        'Saisie et suivi automatisés des métriques de qualité',
        'Traçabilité des lots et contrôle des étapes de production',
        'Alertes de conformité et seuils critiques paramétrables',
        'Tableaux de bord d’inspection et génération de rapports',
      ],
    },
    technologies: ['React.js', 'TypeScript', 'Python', 'SQL', 'DaisyUI'],
    heroImage: lactoHero,
    mobileImages: [lactoMockup],
    gallery: [
      lactoAccueil,
      lactoSaisie,
      lactoResultats,
      lactoFonctionnalite,
      lactoDeconnexion,
    ],
    access: {
      youtubeUrl: '',
      isYoutubeDemoReady: false,
      githubUrl: '',
      isGithubLocked: true,
      accessTier: 'PREMIUM',
    },
  },
  {
    id: 'espasy',
    name: 'Espasy',
    category: 'Booking / Marketplace',
    en: {
      tagline: 'The space you need, instantly',
      problem: 'Finding and booking specialized spaces with real-time availability and transparent pricing is often time-consuming for individuals and businesses.',
      description: 'Web platform for searching, booking, and managing physical spaces such as offices, meeting rooms, and event venues with integrated calendar conflict resolution.',
      features: [
        'Search and filtering engine for available spaces',
        'Real-time booking and calendar management system',
        'Admin interface for venue owners to manage listings',
        'Detailed venue cards with specs, amenities, and pricing',
      ],
    },
    fr: {
      tagline: 'L’espace dont vous avez besoin, à portée de main',
      problem: 'Trouver et réserver des espaces adaptés avec une disponibilité en temps réel et des tarifs transparents est souvent long et complexe.',
      description: 'Plateforme web de recherche, réservation et gestion d’espaces physiques (bureaux, salles de réunion, espaces événementiels) avec résolution automatique des conflits de calendrier.',
      features: [
        'Moteur de recherche et de filtrage d’espaces disponibles',
        'Système de réservation en temps réel et gestion de calendrier',
        'Interface d’administration pour la gestion des annonces',
        'Fiches détaillées avec équipements, caractéristiques et tarifs',
      ],
    },
    technologies: ['React.js', 'TypeScript', 'SQL', 'Tailwind CSS'],
    heroImage: espasyHero,
    mobileImages: [espasyMockup],
    gallery: [
      espasyAccueil,
      espasyReservation,
      espasyNotification,
      espasyAPropos,
    ],
    access: {
      youtubeUrl: '',
      isYoutubeDemoReady: false,
      githubUrl: '',
      isGithubLocked: true,
      accessTier: 'PRO',
    },
  },
];










/*
================================================================
 CE QUE FAIT CE FICHIER / CE QUE L'UTILISATEUR VOIT
================================================================

 Ce fichier constitue la SOURCE DE DONNÉES des projets du portfolio.

 Il ne crée pas directement une interface visible à l'écran.

 Il rassemble et organise toutes les informations nécessaires
 pour afficher chaque projet dans les "ProjectCard".

 Les trois projets actuellement définis sont :

   1. Predictify
   2. Lactocontrol
   3. Espasy


 ================================================================
 1. IMAGES DES PROJETS
 ================================================================

 Le fichier commence par importer les différentes images
 associées à chaque projet.

 Pour chaque projet, les images sont organisées en deux catégories :

   - HERO :
     image principale présentée en haut de la carte.

   - GALLERY :
     ensemble des captures d'écran supplémentaires du projet.

 Une image supplémentaire "PC & Phone" est également prévue
 pour chaque projet dans "mobileImages".

 Ces images seront ensuite utilisées par "ProjectCard".


 ================================================================
 2. STRUCTURE DES INFORMATIONS
 ================================================================

 Le fichier définit la structure qu'un projet doit respecter.

 Chaque projet peut contenir :

   - un identifiant ;
   - un nom ;
   - une catégorie ;
   - une présentation en anglais ;
   - une présentation en français ;
   - les technologies utilisées ;
   - une image principale ;
   - une galerie d'images ;
   - des images PC / téléphone ;
   - une vidéo YouTube éventuelle ;
   - un dépôt GitHub éventuel ;
   - une URL de démonstration éventuelle.


 ================================================================
 3. CONTENU MULTILINGUE
 ================================================================

 Chaque projet possède deux versions de son contenu :

   EN → contenu anglais
   FR → contenu français

 Chaque version contient :

   - une tagline ;
   - une description ;
   - éventuellement le problème métier ;
   - les fonctionnalités principales.

 Lorsque l'utilisateur change la langue du portfolio,
 "ProjectCard" utilise la version correspondant à la langue active.

 Exemple :

   Français :
   "Vos données de ventes, en un coup d’œil"

   Anglais :
   "Your sales insights, at a glance"


 ================================================================
 4. PROJET : PREDICTIFY
 ================================================================

 Catégorie :
   SaaS / Analytics

 Tagline française :
   "Vos données de ventes, en un coup d’œil"

 Le projet est présenté comme une plateforme SaaS permettant
 l'analyse et la prévision des ventes e-commerce.

 Le visiteur peut comprendre que Predictify permet notamment de :

   - suivre les métriques de vente ;
   - analyser les performances des produits ;
   - anticiper les tendances ;
   - importer des données ;
   - gérer un catalogue de produits ;
   - gérer les abonnements et les tarifs.

 Technologies indiquées :

   React.js
   TypeScript
   Python
   SQL
   Tailwind CSS

 Images prévues :

   - une image principale ;
   - une image PC & téléphone ;
   - plusieurs captures d'écran de l'application.

 VISUELLEMENT, LA CARTE PREDICTIFY PEUT DONC RESSEMBLER À :

 ┌────────────────────────────────────────────────────────────┐
 │  PREDICTIFY                         [ SaaS / Analytics ]   │
 ├────────────────────────────────────────────────────────────┤
 │                                                            │
 │                 IMAGE PREDICTIFY                           │
 │                                                            │
 ├────────────────────────────────────────────────────────────┤
 │  [capture] [capture] [capture] [capture] ...              │
 ├────────────────────────────────────────────────────────────┤
 │  Vos données de ventes, en un coup d’œil                   │
 │                                                            │
 │  Plateforme SaaS d’analyse et de prévision des ventes      │
 │  e-commerce...                                             │
 │                                                            │
 │  ⚡ DÉFI MÉTIER RÉSOLU                                     │
 │  Visualiser les données complexes et anticiper les         │
 │  tendances de stock ou de chiffre d'affaires.              │
 │                                                            │
 │  FONCTIONNALITÉS CLÉS                                      │
 │  ✓ Tableau de bord interactif                              │
 │  ✓ Analyse prédictive                                     │
 │  ✓ Importation de données                                 │
 │                                                            │
 │  [ React.js ] [ TypeScript ] [ Python ] [ SQL ] ...       │
 └────────────────────────────────────────────────────────────┘


 ================================================================
 5. PROJET : LACTOCONTROL
 ================================================================

 Catégorie :
   Industrial / IoT

 Tagline française :
   "Le contrôle qualité, simplifié"

 Le projet est présenté comme une application métier destinée
 au suivi du contrôle qualité dans la production laitière.

 Le visiteur peut comprendre que Lactocontrol permet notamment de :

   - saisir et suivre des métriques de qualité ;
   - assurer la traçabilité des lots ;
   - suivre les étapes de production ;
   - gérer des alertes de conformité ;
   - surveiller des seuils critiques ;
   - produire des rapports.

 Technologies indiquées :

   React.js
   TypeScript
   Python
   SQL
   DaisyUI

 Images prévues :

   - une image principale ;
   - une image PC & téléphone ;
   - plusieurs captures d'écran.


 ================================================================
 6. PROJET : ESPASY
 ================================================================

 Catégorie :
   Booking / Marketplace

 Tagline française :
   "L’espace dont vous avez besoin, à portée de main"

 Le projet est présenté comme une plateforme web permettant
 de rechercher, réserver et gérer des espaces physiques.

 Le visiteur peut comprendre qu'Espasy permet notamment de :

   - rechercher des espaces ;
   - filtrer les résultats ;
   - réserver un espace ;
   - gérer un calendrier ;
   - gérer les annonces ;
   - consulter les caractéristiques et tarifs des espaces.

 Technologies indiquées :

   React.js
   TypeScript
   SQL
   Tailwind CSS

 Images prévues :

   - une image principale ;
   - une image PC & téléphone ;
   - plusieurs captures d'écran.


 ================================================================
 7. CE QUE CE FICHIER PERMET FINALEMENT D'AFFICHER
 ================================================================

 Ce fichier fournit les données qui permettent à "ProjectCard"
 de construire une carte complète pour chacun des projets.

 L'utilisateur voit donc indirectement :

 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │                       PROJECTS                               │
 │                                                              │
 │   ┌────────────────┐  ┌────────────────┐  ┌────────────────┐│
 │   │                │  │                │  │                ││
 │   │   PREDICTIFY   │  │  LACTOCONTROL  │  │     ESPASY     ││
 │   │                │  │                │  │                ││
 │   │   SaaS /       │  │   Industrial / │  │   Booking /    ││
 │   │   Analytics    │  │      IoT       │  │   Marketplace   ││
 │   │                │  │                │  │                ││
 │   │   IMAGE        │  │    IMAGE       │  │    IMAGE       ││
 │   │                │  │                │  │                ││
 │   │   DESCRIPTION  │  │   DESCRIPTION  │  │   DESCRIPTION  ││
 │   │                │  │                │  │                ││
 │   │   FEATURES     │  │   FEATURES     │  │   FEATURES     ││
 │   │                │  │                │  │                ││
 │   │   TECHNOLOGIES │  │   TECHNOLOGIES │  │   TECHNOLOGIES ││
 │   │                │  │                │  │                ││
 │   └────────────────┘  └────────────────┘  └────────────────┘│
 │                                                              │
 └──────────────────────────────────────────────────────────────┘


 ================================================================
 EN RÉSUMÉ
 ================================================================

 "Projects.tsx"
     ↓
 organise les projets dans la page.

 "projects.ts"
     ↓
 contient les DONNÉES de chaque projet.

 "ProjectCard.tsx"
     ↓
 transforme ces données en CARTES VISIBLES.

 "assets/images/projects/"
     ↓
 contient les IMAGES utilisées par les cartes.


 FLUX GLOBAL :

 DONNÉES + IMAGES
       ↓
   projects.ts
       ↓
   Projects.tsx
       ↓
   ProjectCard.tsx
       ↓
 ┌─────────────────────────────┐
 │       CARTE DU PROJET       │
 │                             │
 │ Image                       │
 │ Nom                         │
 │ Catégorie                   │
 │ Tagline                     │
 │ Description                 │
 │ Problème métier             │
 │ Fonctionnalités             │
 │ Technologies               │
 │ Galerie                     │
 │ Actions éventuelles         │
 └─────────────────────────────┘
       ↓
    UTILISATEUR


 IMPORTANT :

 Ce fichier est donc le "catalogue" ou la "base de données
 statique" des projets du portfolio.

 Si une information ou une image doit changer pour un projet,
 c'est principalement dans ce fichier qu'elle est définie.

 Il ne faut pas confondre ce fichier avec "ProjectCard.tsx" :

   projects.ts    = QUOI AFFICHER
   ProjectCard    = COMMENT L'AFFICHER

================================================================
*/