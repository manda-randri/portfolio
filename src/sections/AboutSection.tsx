import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { aboutData } from '../data/about';

/**
 * Échelle typographique compacte (du plus important au moins important) :
 *  - H1 ..................... text-2xl → sm:text-3xl
 *  - Valeur stat (mise en avant) text-3xl → sm:text-4xl (maximum de la page)
 *  - H2 de section .......... text-xl  → sm:text-2xl
 *  - H3 de carte ............ text-base → sm:text-lg
 *  - Texte courant .......... text-sm  → sm:text-base
 *  - Détails ................ text-xs  → sm:text-sm
 */

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-8 flex flex-col items-center gap-3 text-center">
    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-base-content">
      {children}
    </h2>
    <span
      aria-hidden="true"
      className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-secondary"
    />
  </div>
);

export const AboutSection: React.FC = () => {
  const { i18n } = useTranslation();

  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const currentAbout = aboutData[lang] || aboutData.en;

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden py-12 sm:py-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Halos décoratifs en arrière-plan */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[55%] -right-20 -z-10 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"
      />

      <div className="mx-auto max-w-4xl">
        {/* ───────── En-tête ───────── */}
        <header className="mx-auto mb-8 max-w-2xl space-y-3 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-base-content">
            {currentAbout.title}
          </h1>
          <p className="mx-auto max-w-xl text-sm sm:text-base font-light leading-relaxed text-base-content/70">
            {currentAbout.subTitle}
          </p>
        </header>

        {/* ───────── Bio ───────── */}
        <div className="relative mx-auto mb-12 max-w-2xl overflow-hidden rounded-2xl border border-base-300/70 bg-base-100/70 p-5 text-center shadow-md backdrop-blur sm:p-7">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
          <div className="space-y-3">
            {currentAbout.bio.map((paragraph, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? 'text-sm sm:text-base font-medium leading-relaxed text-base-content'
                    : 'text-sm leading-relaxed text-base-content/70'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* ───────── Principes (séquence en 3 étapes) ───────── */}
        <div className="mb-12">
          <SectionTitle>{currentAbout.principlesTitle}</SectionTitle>

          <div className="grid grid-cols-1 gap-x-4 gap-y-9 md:grid-cols-3">
            {currentAbout.principles.map((principle, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl border border-base-300/70 bg-base-100 px-5 pb-5 pt-9 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {/* Pastille numérotée */}
                <div className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary font-mono text-sm font-bold text-primary-content shadow-md shadow-primary/30 ring-4 ring-base-100">
                  {principle.number}
                </div>

                <h3 className="mb-2 text-base sm:text-lg font-bold text-base-content">
                  {principle.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-base-content/70">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ───────── Stats ───────── */}
        <div className="mb-12">
          <SectionTitle>{currentAbout.statsTitle}</SectionTitle>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-stretch">
            {currentAbout.stats.map((stat, idx) => {
              const featured = idx === 0;

              return (
                <div
                  key={idx}
                  className={
                    featured
                      ? 'relative flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-secondary p-5 text-center text-primary-content shadow-lg shadow-primary/25 md:-my-2 md:py-8'
                      : 'flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-base-300/70 bg-base-100 p-5 text-center shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md motion-reduce:transition-none'
                  }
                >
                  {featured && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/20 blur-2xl"
                    />
                  )}

                  <div
                    className={
                      featured
                        ? 'relative text-3xl sm:text-4xl font-black tracking-tight'
                        : 'text-2xl sm:text-3xl font-black tracking-tight text-primary'
                    }
                  >
                    {stat.value}
                  </div>
                  <div
                    className={
                      featured
                        ? 'relative text-sm sm:text-base font-bold'
                        : 'text-sm sm:text-base font-bold text-base-content'
                    }
                  >
                    {stat.label}
                  </div>
                  <div
                    className={
                      featured
                        ? 'relative max-w-[15rem] text-xs sm:text-sm leading-relaxed text-primary-content/80'
                        : 'max-w-[15rem] text-xs sm:text-sm leading-relaxed text-base-content/60'
                    }
                  >
                    {stat.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ───────── CTA final ───────── */}
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-base-200/60 to-secondary/10 p-6 text-center shadow-md sm:p-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-12 -top-12 h-36 w-36 rounded-full bg-primary/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-secondary/20 blur-3xl"
          />

          <div className="relative mx-auto max-w-xl space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-base-content">
              {currentAbout.ctaTitle}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-base-content/70">
              {currentAbout.ctaDescription}
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="group/cta inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm sm:text-base font-semibold text-primary-content shadow-md shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span>{currentAbout.ctaLabel}</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover/cta:translate-x-1 motion-reduce:transition-none"
                >
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};







/*
========================================================
RÔLE DE CE FICHIER : PAGE "ABOUT / À PROPOS"
========================================================

Ce fichier construit la section "About" du portfolio.

Son rôle est de présenter au visiteur :

    • qui est le développeur
    • sa présentation / biographie
    • ses valeurs principales
    • quelques statistiques importantes
    • son CV téléchargeable

Il récupère le contenu depuis :

    ../data/about

et utilise le système de traduction i18next pour
adapter l'interface à la langue sélectionnée.


========================================================
1. LANGUE AFFICHÉE
========================================================

Le fichier détecte automatiquement la langue active.

Si la langue commence par "fr" :

    → version française

Sinon :

    → version anglaise

Le contenu correspondant est ensuite récupéré
dans aboutData.

Ainsi, le visiteur peut avoir :

    🇬🇧 ENGLISH

    About
    Who I am...
    My values...
    Download CV


ou :

    🇫🇷 FRANÇAIS

    À propos
    Qui je suis...
    Mes valeurs...
    Télécharger mon CV


La structure de la page reste la même.
Seul le contenu textuel change.


========================================================
2. STRUCTURE GÉNÉRALE VISIBLE
========================================================

La page est organisée en plusieurs grandes zones :

    ┌─────────────────────────────────────────────┐
    │ ← Back                                     │
    │                                             │
    │        [ ABOUT / BADGE ]                    │
    │                                             │
    │             About                           │
    │                                             │
    │       Sous-titre / présentation             │
    └─────────────────────────────────────────────┘

                         ↓

    ┌──────────────────────────┬──────────────────┐
    │                          │                  │
    │  BIOGRAPHIE              │  MES VALEURS     │
    │                          │                  │
    │  Titre personnel        │  ⭐ Valeur 1     │
    │                          │                  │
    │  Paragraphe             │  ⚡ Valeur 2     │
    │  de présentation        │                  │
    │                          │  🎯 Valeur 3     │
    │  Paragraphe             │                  │
    │                          │                  │
    │  [ 📄 Télécharger CV ]  │                  │
    └──────────────────────────┴──────────────────┘

                         ↓

    ┌─────────────────────────────────────────────┐
    │              KEY METRICS / STATS             │
    │                                             │
    │       3+          5+          10+           │
    │     Projects     Years...    Technologies  │
    │                                             │
    │       description    description             │
    └─────────────────────────────────────────────┘


========================================================
3. BOUTON "BACK"
========================================================

En haut de la section apparaît :

    ← Back

Ce bouton est fourni par :

    BackButton

Il permet au visiteur de revenir à la page
précédente dans son historique de navigation.

Ce n'est donc pas un simple texte décoratif :
c'est un élément de navigation.


========================================================
4. EN-TÊTE DE LA SECTION
========================================================

La première partie présente un en-tête centré.

On retrouve :

    [ BADGE ]

    About

    [Sous-titre]


Le badge utilise la traduction :

    about.badge

Le titre principal utilise :

    nav.about

Le sous-titre provient directement de :

    currentAbout.subTitle


Cela signifie que le contenu de présentation peut
être différent entre l'anglais et le français.


========================================================
5. PARTIE "BIOGRAPHIE"
========================================================

La colonne de gauche contient la présentation
personnelle du développeur.

Elle affiche :

    currentAbout.title

puis plusieurs paragraphes provenant de :

    currentAbout.bio


Chaque élément de bio devient un paragraphe distinct.

Visuellement :

    ┌─────────────────────────────────────┐
    │ Mon titre / présentation            │
    │                                     │
    │ Premier paragraphe de présentation. │
    │                                     │
    │ Deuxième paragraphe...               │
    │                                     │
    │ Troisième paragraphe...              │
    └─────────────────────────────────────┘


Le nombre de paragraphes dépend directement
des données présentes dans aboutData.


========================================================
6. BOUTON DE TÉLÉCHARGEMENT DU CV
========================================================

Sous la biographie apparaît un bouton :

    📄 Download CV

ou en français :

    📄 Télécharger mon CV


Le texte du bouton utilise :

    about.download_cv


Le fichier à télécharger est défini par :

    aboutData.cvUrl


Le visiteur peut donc cliquer sur ce bouton
pour accéder au CV prévu dans les données
du portfolio.


========================================================
7. SECTION "CORE VALUES"
========================================================

La colonne de droite présente les valeurs principales.

Titre :

    Core Values

ou sa traduction correspondante.


Les valeurs sont récupérées depuis :

    currentAbout.values


Chaque valeur possède :

    • une icône
    • un titre
    • une description


Exemple visuel :

    ┌─────────────────────────────────────┐
    │ ⭐  Professionalism                 │
    │                                     │
    │     Description de la valeur...     │
    └─────────────────────────────────────┘

    ┌─────────────────────────────────────┐
    │ 🎯  User Focus                      │
    │                                     │
    │     Description de la valeur...     │
    └─────────────────────────────────────┘

    ┌─────────────────────────────────────┐
    │ ⚡  Innovation                       │
    │                                     │
    │     Description de la valeur...     │
    └─────────────────────────────────────┘


Le nombre de cartes dépend des données
présentes dans currentAbout.values.


========================================================
8. INTERACTION VISUELLE DES CARTES
========================================================

Les cartes de valeurs possèdent un effet au survol.

Normalement :

    Carte
    ─────────────────
    apparence normale


Lorsque la souris passe dessus :

    Carte
    ─────────────────
    légère augmentation de l'ombre

Cela donne un effet interactif subtil sans
modifier le contenu.


========================================================
9. SECTION STATISTIQUES
========================================================

En bas de la page se trouve un grand bloc consacré
aux statistiques / indicateurs clés.

Titre :

    Stats / Key Metrics

ou sa traduction correspondante.


Les données viennent de :

    currentAbout.stats


Chaque statistique possède :

    • une valeur
    • un label
    • une description


Exemple visuel :

    ┌─────────────────────────────────────────────┐
    │              KEY METRICS                    │
    │                                             │
    │       10+          5+           3+          │
    │                                             │
    │     Projects     Clients      Years         │
    │                                             │
    │   description   description   description   │
    └─────────────────────────────────────────────┘


Le fichier ne fixe pas lui-même les chiffres.

Il affiche simplement les valeurs présentes
dans aboutData.stats.


========================================================
10. RESPONSIVE DESIGN
========================================================

La disposition change selon la taille de l'écran.

Sur ordinateur :

    ┌──────────────────────┬───────────────────┐
    │      BIO             │     VALUES        │
    │                      │                   │
    │                      │                   │
    └──────────────────────┴───────────────────┘


Sur mobile :

    ┌─────────────────────────────┐
    │            BIO              │
    └─────────────────────────────┘

    ┌─────────────────────────────┐
    │           VALUE 1           │
    └─────────────────────────────┘

    ┌─────────────────────────────┐
    │           VALUE 2           │
    └─────────────────────────────┘

    ┌─────────────────────────────┐
    │           VALUE 3           │
    └─────────────────────────────┘


Les statistiques passent également d'une disposition
en plusieurs colonnes à une disposition verticale
sur les petits écrans.


========================================================
11. RELATION AVEC LES AUTRES FICHIERS
========================================================

Le fonctionnement global est :

    data/about.ts
          │
          │ contient les informations
          ▼
    AboutSection.tsx
          │
          │ organise et affiche
          ▼
    PAGE ABOUT
          │
          ├── Présentation
          ├── Biographie
          ├── CV
          ├── Valeurs
          └── Statistiques


Le fichier :

    about.ts

répond principalement à :

    "QUOI afficher ?"


Alors que :

    AboutSection.tsx

répond à :

    "COMMENT afficher ces informations ?"


========================================================
EN RÉSUMÉ
========================================================

Ce fichier représente la page personnelle du portfolio.

Le visiteur y découvre :

    ✓ une introduction "About"
    ✓ une biographie
    ✓ une présentation personnelle
    ✓ un bouton pour télécharger le CV
    ✓ les valeurs professionnelles
    ✓ des statistiques / chiffres clés
    ✓ une version française ou anglaise
    ✓ une interface responsive ordinateur / mobile

Cette section sert donc principalement à répondre
à la question du visiteur :

    "QUI EST CE DÉVELOPPEUR,
     QUEL EST SON PROFIL,
     QUELLE EST SA FAÇON DE TRAVAILLER
     ET QUELLE EXPÉRIENCE PEUT-IL APPORTER ?"
*/