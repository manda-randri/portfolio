import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from './ui/ThemeToggle';
import { LanguageToggle } from './ui/LanguageToggle';

function Navbar() {
  const { t } = useTranslation();

  return (
    <header className="navbar bg-base-100/90 backdrop-blur-md sticky top-0 z-50 border-b border-base-300">
      <div className="navbar-start">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-primary"
          aria-label="Go to homepage"
        >
          Portfolio
        </Link>
      </div>

      <div className="navbar-end flex items-center gap-2">
        <nav className="hidden md:flex items-center gap-2">
          <Link to="/projects" className="btn btn-ghost btn-sm">
            {t('nav.projects')}
          </Link>

          <Link to="/experience" className="btn btn-ghost btn-sm">
            {t('nav.experience')}
          </Link>

          <Link to="/about" className="btn btn-ghost btn-sm">
            {t('nav.about')}
          </Link>

          <Link to="/contact" className="btn btn-primary btn-sm">
            {t('nav.contact')}
          </Link>

          {/* Sélecteur de langue & Bascule de thème (Desktop) */}
          <div className="ml-2 pl-2 border-l border-base-300 flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>

        {/* Sélecteur de langue, Bascule de thème & Hamburger (Mobile) */}
        <div className="flex items-center gap-1.5 md:hidden">
          <LanguageToggle />
          <ThemeToggle />

          <div className="dropdown dropdown-end">
            <button
              type="button"
              tabIndex={0}
              className="btn btn-ghost btn-square btn-sm"
              aria-label="Open navigation menu"
            >
              ☰
            </button>

            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow border border-base-300"
            >
              <li>
                <Link to="/projects">{t('nav.projects')}</Link>
              </li>

              <li>
                <Link to="/experience">{t('nav.experience')}</Link>
              </li>

              <li>
                <Link to="/about">{t('nav.about')}</Link>
              </li>

              <li>
                <Link to="/contact">{t('nav.contact')}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;









/*
===============================================================================
RÔLE DE CE FICHIER : Navbar.tsx
===============================================================================

Ce fichier crée la barre de navigation principale du portfolio.

La Navbar est visible en haut de l'écran et permet à l'utilisateur de :

- revenir à l'accueil ;
- accéder aux Projets ;
- accéder aux Expériences & Compétences ;
- accéder à la page À propos ;
- accéder à la page Contact ;
- changer de langue ;
- changer de thème ;
- ouvrir un menu hamburger sur mobile.

Le texte des différents liens est récupéré avec le système de traduction
i18next grâce à useTranslation().

===============================================================================
CE QUE L'UTILISATEUR VOIT SUR ORDINATEUR
===============================================================================

┌─────────────────────────────────────────────────────────────────────────────┐
│ Portfolio     Projects   Experience   About   Contact   │  🌐  ◐           │
└─────────────────────────────────────────────────────────────────────────────┘
   ↑              ↑           ↑          ↑        ↑          ↑    ↑
   │              │           │          │        │          │    │
 Accueil        Projets   Expérience   À propos  Contact   Langue Thème


La barre reste fixée en haut de l'écran lorsque l'utilisateur fait défiler
la page.

Elle possède également un effet de transparence/flou sur l'arrière-plan.


===============================================================================
PARTIE GAUCHE : LOGO / NOM DU PORTFOLIO
===============================================================================

┌──────────────┐
│  Portfolio   │
└──────────────┘

"Portfolio" est cliquable.

Lorsque l'utilisateur clique dessus :

    /  →  retour à la page d'accueil


===============================================================================
PARTIE DROITE : NAVIGATION DESKTOP
===============================================================================

Sur ordinateur, les boutons sont affichés horizontalement :

    [ Projects ] [ Experience ] [ About ] [ Contact ]

Chaque bouton redirige vers une page différente :

    Projects     → /projects
    Experience   → /experience
    About        → /about
    Contact      → /contact


Le bouton "Contact" possède un style visuel plus important
(btn-primary) afin de mettre davantage en évidence l'action de contact.


===============================================================================
SÉLECTEUR DE LANGUE
===============================================================================

Après les liens de navigation :

    │  LanguageToggle  │  ThemeToggle

Le composant LanguageToggle permet à l'utilisateur de changer la langue
de l'interface.

Le texte de la Navbar peut donc être traduit.

Exemple possible :

    EN :
    Projects | Experience | About | Contact

    FR :
    Projets | Expérience | À propos | Contact


Les traductions proviennent des clés :

    nav.projects
    nav.experience
    nav.about
    nav.contact


===============================================================================
SÉLECTEUR DE THÈME
===============================================================================

Le composant ThemeToggle permet de basculer entre les thèmes disponibles
gérés par l'application.

Visuellement, l'utilisateur dispose d'un contrôle supplémentaire à droite
de la navigation :

    [ Language ] [ Theme ]


===============================================================================
VERSION MOBILE
===============================================================================

Lorsque l'écran devient plus petit, la navigation horizontale disparaît.

L'utilisateur voit alors une version simplifiée :

┌───────────────────────────────────────────────┐
│ Portfolio                         🌐  ◐  ☰   │
└───────────────────────────────────────────────┘


Les éléments visibles sont :

    Portfolio
    LanguageToggle
    ThemeToggle
    ☰ menu hamburger


===============================================================================
MENU HAMBURGER MOBILE
===============================================================================

Lorsque l'utilisateur clique sur :

                         [ ☰ ]

un menu déroulant apparaît :

┌──────────────────────────────┐
│ Projects                     │
│ Experience                   │
│ About                        │
│ Contact                      │
└──────────────────────────────┘


L'utilisateur peut alors sélectionner une page.

Exemple :

    ☰
     ↓
    ┌──────────────┐
    │ Projects     │
    │ Experience   │
    │ About        │
    │ Contact      │
    └──────────────┘


===============================================================================
COMPORTEMENT RESPONSIVE
===============================================================================

                  ÉCRAN LARGE
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ Portfolio   Projects  Experience  About  Contact  🌐  ◐     │
└─────────────────────────────────────────────────────────────┘


                  ÉCRAN MOBILE
                       │
                       ▼
┌───────────────────────────────────────────────┐
│ Portfolio                            🌐  ◐  ☰ │
└───────────────────────────────────────────────┘
                                           │
                                           ▼
                                  ┌────────────────┐
                                  │ Projects       │
                                  │ Experience     │
                                  │ About          │
                                  │ Contact        │
                                  └────────────────┘


===============================================================================
RÔLE DANS L'APPLICATION
===============================================================================

Navbar.tsx est utilisé dans App.tsx.

La structure générale devient donc :

                         App.tsx
                            │
                            ▼
                         Navbar
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
      Navigation        Langue            Thème
          │
          ▼
     Pages du site
          │
    ┌─────┼─────┬──────────┬─────────┐
    ▼     ▼     ▼          ▼         ▼
  Hero  Projects Experience About   Contact


===============================================================================
À RETENIR
===============================================================================

Navbar.tsx = BARRE DE NAVIGATION DU PORTFOLIO

Elle sert principalement à :

    1. Naviguer entre les pages
    2. Revenir à l'accueil
    3. Changer de langue
    4. Changer de thème
    5. Adapter la navigation aux écrans mobiles

Desktop :
    → liens visibles directement

Mobile :
    → liens cachés dans le menu ☰

La Navbar ne contient pas le contenu des différentes pages.
Elle sert principalement à permettre à l'utilisateur de se déplacer
facilement dans le portfolio.
===============================================================================
*/