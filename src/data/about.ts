export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface PrincipleItem {
  number: string;
  title: string;
  description: string;
}

export interface LocalizedAboutContent {
  title: string;
  subTitle: string;
  bio: string[];
  principlesTitle: string;
  principles: PrincipleItem[];
  statsTitle: string;
  stats: StatItem[];
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
}

export interface AboutData {
  en: LocalizedAboutContent;
  fr: LocalizedAboutContent;
}

export const aboutData: AboutData = {
  en: {
    title: "From ideas to digital products.",
    subTitle:
      "I design and build modern web applications and SaaS products that answer real business needs.",
    bio: [
      "I'm a Full-Stack Developer who turns ideas, business challenges and product concepts into reliable digital solutions, from the first sketch to a working product.",
      "Frontend, backend, data and product thinking: I bring all of it together to build applications that are not only functional, but clear, scalable and made to last.",
    ],
    principlesTitle: "How I approach a product",
    principles: [
      {
        number: "01",
        title: "Understand the problem",
        description:
          "Before writing a single line of code, I make sure I understand the business need, the users, and what the product really has to achieve.",
      },
      {
        number: "02",
        title: "Build the right solution",
        description:
          "I turn that understanding into a focused product experience, pairing thoughtful interfaces with solid technical foundations.",
      },
      {
        number: "03",
        title: "Build for what's next",
        description:
          "A product has to be able to grow. I favor maintainable code and a reliable architecture that can evolve alongside the business.",
      },
    ],
    statsTitle: "Built with purpose",
    stats: [
      {
        value: "3+",
        label: "Digital Products",
        description: "SaaS and web applications, designed and developed",
      },
      {
        value: "Full-Stack",
        label: "From Interface to Backend",
        description: "Frontend, APIs, databases and deployment",
      },
      {
        value: "End-to-End",
        label: "Product Development",
        description: "From the initial idea to a working digital product",
      },
    ],
    ctaTitle: "Have an idea worth building?",
    ctaDescription:
      "Let's turn your business challenge or product idea into a clear, functional and scalable digital solution.",
    ctaLabel: "Let's Build Together",
  },
  fr: {
    title: "Des idées aux produits digitaux.",
    subTitle:
      "Je conçois et développe des applications web modernes et des produits SaaS qui répondent à de vrais besoins métier.",
    bio: [
      "Développeur Full-Stack, je transforme des idées, des enjeux métier et des concepts de produit en solutions digitales fiables, du premier croquis jusqu'à un produit fonctionnel.",
      "Frontend, backend, données et réflexion produit : je réunis tout ce qu'il faut pour créer des applications fonctionnelles, mais aussi claires, évolutives et pensées pour durer.",
    ],
    principlesTitle: "Ma façon d'aborder un produit",
    principles: [
      {
        number: "01",
        title: "Comprendre le problème",
        description:
          "Avant d'écrire la moindre ligne de code, je m'assure de comprendre le besoin métier, les utilisateurs et ce que le produit doit réellement accomplir.",
      },
      {
        number: "02",
        title: "Construire la bonne solution",
        description:
          "Je transforme cette compréhension en une expérience produit cohérente, en associant des interfaces réfléchies à des bases techniques solides.",
      },
      {
        number: "03",
        title: "Préparer la suite",
        description:
          "Un produit doit pouvoir grandir. Je privilégie un code maintenable et une architecture fiable, capables d'accompagner l'évolution du projet.",
      },
    ],
    statsTitle: "Des produits conçus avec intention",
    stats: [
      {
        value: "3+",
        label: "Produits digitaux",
        description: "SaaS et applications web, conçus et développés",
      },
      {
        value: "Full-Stack",
        label: "De l'interface au backend",
        description: "Frontend, APIs, bases de données et déploiement",
      },
      {
        value: "End-to-End",
        label: "Développement produit",
        description: "De l'idée initiale à un produit digital fonctionnel",
      },
    ],
    ctaTitle: "Vous avez une idée qui mérite d'être construite ?",
    ctaDescription:
      "Transformons votre problématique métier ou votre idée de produit en une solution digitale claire, fonctionnelle et évolutive.",
    ctaLabel: "Construisons ensemble",
  },
};







/*
========================================================
RÔLE DE CE FICHIER : DONNÉES DE LA PAGE "ABOUT"
========================================================

Ce fichier contient le CONTENU qui sera affiché dans
la section "About / À propos" du portfolio.

Il ne construit pas l'interface graphique.

Il définit simplement :

    • le contenu personnel
    • la biographie
    • les statistiques
    • les valeurs professionnelles
    • le chemin du CV
    • les versions anglaise et française


Architecture :

    about.ts
       │
       │ fournit les données
       ▼
    AboutSection.tsx
       │
       │ organise l'affichage
       ▼
    PAGE "ABOUT"
       │
       ├── Présentation
       ├── Biographie
       ├── CV
       ├── Valeurs
       └── Statistiques


========================================================
1. STRUCTURE DES STATISTIQUES
========================================================

Chaque statistique possède 3 informations :

    • value
    • label
    • description

Par exemple :

    3+
    SaaS Applications
    Full-stack projects built & deployed


L'utilisateur voit donc une information structurée
comme :

    ┌──────────────────────────────┐
    │             3+               │
    │      SaaS Applications       │
    │                              │
    │ Full-stack projects built &  │
    │ deployed                     │
    └──────────────────────────────┘


========================================================
2. STRUCTURE DES VALEURS PROFESSIONNELLES
========================================================

Chaque valeur possède :

    • une icône
    • un titre
    • une description

Les trois valeurs présentées ici sont :

    🎯 Business-Driven Solutions
    ⚡ Performance & Responsive
    🤝 Transparency & Rigor


Elles permettent au visiteur de comprendre
la manière dont le développeur aborde ses projets.


Visuellement :

    🎯 Business-Driven Solutions
       Chaque fonctionnalité répond à un besoin
       réel du business.

    ⚡ Performance & Responsive
       Interfaces rapides et adaptées aux
       différents appareils.

    🤝 Transparency & Rigor
       Code propre, documentation et respect
       des délais.


========================================================
3. STRUCTURE DU CONTENU ABOUT
========================================================

La structure LocalizedAboutContent regroupe tout
le contenu nécessaire à la page About.

Elle contient :

    title
       ↓
    titre principal de présentation

    subTitle
       ↓
    phrase d'introduction

    bio
       ↓
    plusieurs paragraphes de présentation

    stats
       ↓
    statistiques clés

    values
       ↓
    valeurs professionnelles


Cela permet à AboutSection.tsx de récupérer
l'ensemble du contenu depuis un seul objet.


========================================================
4. CONTENU ANGLAIS
========================================================

La version anglaise présente le profil comme :

    Manda RANDRIANANTOANDRO
    Full-Stack Developer & SaaS Builder


Le sous-titre explique que le développeur
transforme des idées complexes et des défis
business en applications web modernes,
fluides et performantes.


La biographie met particulièrement en avant :

    • React
    • TypeScript
    • Python
    • développement de plateformes web
    • outils métier personnalisés
    • compréhension des besoins business
    • interface utilisateur
    • architecture maintenable
    • expérience utilisateur


========================================================
5. CONTENU FRANÇAIS
========================================================

La version française reprend le même positionnement,
mais avec un contenu adapté en français :

    Manda RANDRIANANTOANDRO
    Développeur Full-Stack & Concepteur SaaS


Le visiteur retrouve notamment :

    • spécialisation React / TypeScript / Python
    • accompagnement des entrepreneurs et PME
    • plateformes web
    • outils sur-mesure
    • compréhension des besoins métiers
    • interface soignée
    • architecture maintenable
    • expérience utilisateur


La structure reste exactement la même que la version
anglaise.


========================================================
6. LES 3 STATISTIQUES AFFICHÉES
========================================================

Le fichier fournit actuellement trois indicateurs.

────────────────────────────────────────────────────────

    3+

    Applications SaaS

    Projets full-stack conçus & déployés

────────────────────────────────────────────────────────

    100%

    Code Propre & Typé

    Respect strict des standards TypeScript

────────────────────────────────────────────────────────

    24/7

    Communication Réactive

    Collaboration fluide et transparente

────────────────────────────────────────────────────────


En anglais, les mêmes indicateurs deviennent :

    3+
    SaaS Applications

    100%
    Clean & Typed Code

    24/7
    Responsive Communication


========================================================
7. LES 3 VALEURS PROFESSIONNELLES
========================================================

La première valeur :

    🎯 Solutions Orientées Métier

Elle indique que les fonctionnalités sont pensées
pour répondre à un besoin réel du client.


La deuxième :

    ⚡ Performance & Responsive

Elle met en avant des interfaces rapides et adaptées
aux différents formats d'écran :

    Desktop
    Tablette
    Mobile


La troisième :

    🤝 Transparence & Rigueur

Elle insiste sur :

    • code propre
    • documentation
    • respect des délais


========================================================
8. LE CV
========================================================

Le fichier définit également :

    cvUrl: "/cv.pdf"


Cela signifie que la section About sait où trouver
le CV destiné au bouton de téléchargement.

Le fonctionnement global est :

    Visiteur
       │
       ▼
    [ 📄 Télécharger le CV ]
       │
       ▼
    /cv.pdf


Le fichier lui-même ne crée pas le bouton.

Il fournit simplement l'emplacement du document.


========================================================
9. BILINGUISME
========================================================

Le fichier possède deux blocs principaux :

    en
    fr


La structure est identique dans les deux langues :

    en
     ├── title
     ├── subTitle
     ├── bio
     ├── stats
     └── values

    fr
     ├── title
     ├── subTitle
     ├── bio
     ├── stats
     └── values


AboutSection.tsx choisit ensuite le bloc correspondant
à la langue actuellement sélectionnée.


========================================================
10. CE QUE LE VISITEUR VOIT AU FINAL
========================================================

La page About peut être comprise visuellement ainsi :

    ┌───────────────────────────────────────────────┐
    │                    ← Back                     │
    │                                               │
    │                 [ ABOUT ]                     │
    │                                               │
    │        About / À propos                       │
    │                                               │
    │  Je transforme les idées complexes...        │
    └───────────────────────────────────────────────┘

                      ↓

    ┌────────────────────────┬──────────────────────┐
    │                        │                      │
    │  TITRE PERSONNEL       │   MES VALEURS        │
    │                        │                      │
    │  Biographie            │ 🎯 Solutions métier │
    │                        │                      │
    │  Biographie            │ ⚡ Performance       │
    │                        │                      │
    │  [📄 Télécharger CV]   │ 🤝 Transparence     │
    │                        │                      │
    └────────────────────────┴──────────────────────┘

                      ↓

    ┌───────────────────────────────────────────────┐
    │                 KEY METRICS                   │
    │                                               │
    │       3+          100%          24/7          │
    │                                               │
    │      SaaS        Code propre   Communication │
    │                                               │
    │    description   description    description   │
    └───────────────────────────────────────────────┘


========================================================
11. RELATION AVEC AboutSection.tsx
========================================================

Il est important de distinguer les deux fichiers :

    about.ts
    = QUOI DIRE


    AboutSection.tsx
    = COMMENT LE MONTRER


Par exemple :

    about.ts
       │
       └── "3+"
              │
              ▼
       AboutSection.tsx
              │
              ▼
       grand chiffre "3+" à l'écran


Même principe pour :

    titre
    biographie
    valeurs
    descriptions
    statistiques
    CV


========================================================
EN RÉSUMÉ
========================================================

Ce fichier est la SOURCE DE CONTENU de la page
"About / À propos".

Il contient actuellement :

    ✓ identité professionnelle
    ✓ positionnement Full-Stack / SaaS
    ✓ présentation personnelle
    ✓ biographie
    ✓ 3 statistiques
    ✓ 3 valeurs professionnelles
    ✓ chemin du CV
    ✓ contenu anglais
    ✓ contenu français

Il ne gère pas directement :

    ✗ la mise en page
    ✗ les couleurs
    ✗ les animations
    ✗ les boutons
    ✗ la navigation
    ✗ le responsive

Ces responsabilités appartiennent principalement
à AboutSection.tsx et aux composants utilisés
par cette section.
*/