import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Projects from './sections/Projects'; // Redirection vers le chef d'orchestre unique
import { ExperienceSection } from './sections/ExperienceSection';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-base-100 text-base-content font-sans antialiased flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* Page d'accueil (Hero) */}
            <Route path="/" element={<Hero />} />

            {/* Page Projets */}
            <Route path="/projects" element={<Projects />} />

            {/* Page Expériences & Compétences */}
            <Route path="/experience" element={<ExperienceSection />} />

            {/* Page À Propos */}
            <Route path="/about" element={<AboutSection />} />

            {/* Page Contact */}
            <Route path="/contact" element={<ContactSection />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;













/*
══════════════════════════════════════════════════════════════════════
📁 STRUCTURE GÉNÉRALE DU PORTFOLIO
══════════════════════════════════════════════════════════════════════

Chaque fichier possède une responsabilité précise dans l'application.

──────────────────────────────────────────────────────────────────────
📄 src/main.tsx
──────────────────────────────────────────────────────────────────────
Contenu :
Point d'entrée de l'application React.

Rôle :
Lance l'application et connecte React à la page HTML du navigateur.


──────────────────────────────────────────────────────────────────────
📄 src/App.tsx
──────────────────────────────────────────────────────────────────────
Contenu :
Structure principale et routes du portfolio.

Rôle :
Organise les différentes pages et détermine quelle page afficher
selon l'URL.


──────────────────────────────────────────────────────────────────────
📁 src/components/
──────────────────────────────────────────────────────────────────────

📄 Navbar.tsx
Contenu : Barre de navigation, langue, thème et menu mobile.
Rôle : Permettre à l'utilisateur de naviguer dans le portfolio.


📄 Hero.tsx
Contenu : Présentation principale, titre, description, boutons et
technologies.
Rôle : Créer la première impression et présenter immédiatement
le profil et les services.


📄 HeroCanvas.tsx
Contenu : Système d'animation utilisant les images du Hero.
Rôle : Transformer le scroll de l'utilisateur en animation visuelle.


📄 Projects.tsx
Contenu : Section contenant la liste des projets.
Rôle : Présenter les différents projets disponibles.


📄 ProjectCard.tsx
Contenu : Carte visuelle d'un projet avec image, description,
technologies, fonctionnalités et actions.
Rôle : Déterminer comment chaque projet est présenté à l'écran.


📄 ProjectDetail.tsx
Contenu : Informations détaillées concernant un projet sélectionné.
Rôle : Permettre à l'utilisateur d'examiner un projet plus en détail.


📄 ExperienceSection.tsx
Contenu : Compétences techniques et expériences professionnelles.
Rôle : Montrer l'expertise, les technologies et le parcours
professionnel.


📄 AboutSection.tsx
Contenu : Présentation personnelle, valeurs, statistiques et CV.
Rôle : Expliquer qui je suis, ma façon de travailler et ma valeur
pour les clients.


📄 ContactSection.tsx
Contenu : Informations de contact, réseaux sociaux et formulaire.
Rôle : Permettre à un visiteur de prendre contact.


📄 BackButton.tsx
Contenu : Bouton « ← Back ».
Rôle : Permettre de revenir à la page précédente.


📄 SectionTitle.tsx
Contenu : Structure réutilisable pour les titres de sections.
Rôle : Garder une présentation cohérente entre les différentes
sections.


📄 Footer.tsx
Contenu : Pied de page du portfolio.
Rôle : Terminer les pages et afficher les informations complémentaires.


──────────────────────────────────────────────────────────────────────
📁 src/data/
──────────────────────────────────────────────────────────────────────

📄 projects.ts
Contenu : Données des projets : noms, descriptions, images,
fonctionnalités, problèmes résolus, technologies et traductions.
Rôle : Définir CE QUI doit être affiché dans les projets.


📄 experience.ts
Contenu : Données des compétences et expériences professionnelles,
en anglais et en français.
Rôle : Fournir les informations affichées par ExperienceSection.tsx.


📄 about.ts
Contenu : Données de présentation, valeurs, statistiques et CV.
Rôle : Fournir les informations affichées par AboutSection.tsx.


══════════════════════════════════════════════════════════════════════
🔄 RELATION ENTRE LES FICHIERS
══════════════════════════════════════════════════════════════════════

                  ┌───────────────┐
                  │   main.tsx    │
                  └───────┬───────┘
                          ↓
                  ┌───────────────┐
                  │    App.tsx    │
                  │ Chef d'orchestre│
                  └───────┬───────┘
                          ↓
        ┌─────────────────┼─────────────────┐
        ↓                 ↓                 ↓
     Components         Components        Components
        ↓                 ↓                 ↓
     Hero.tsx         Projects.tsx      AboutSection.tsx
        ↓                 ↓                 ↓
 HeroCanvas.tsx     ProjectCard.tsx       about.ts
        ↓                 ↓
    Animation        projects.ts

        experience.ts
              ↓
   ExperienceSection.tsx

══════════════════════════════════════════════════════════════════════
🧠 À RETENIR
══════════════════════════════════════════════════════════════════════

📂 data/
→ Contient principalement LES INFORMATIONS.

📂 components/
→ Contient principalement CE QUE L'UTILISATEUR VOIT ET UTILISE.

📄 App.tsx
→ Organise l'ensemble.

📄 main.tsx
→ Lance l'application.

En résumé :

        DATA
         ↓
   "Quoi afficher ?"
         ↓
    COMPONENTS
         ↓
   "Comment l'afficher ?"
         ↓
      App.tsx
         ↓
   PORTFOLIO FINAL
         ↓
      👤 USER
*/


























/*
===============================================================================
RÔLE DE CE FICHIER : App.tsx
===============================================================================

Ce fichier est le point d'entrée principal de l'interface du portfolio.

Il définit :
- la structure générale de l'application ;
- la barre de navigation présente sur toutes les pages ;
- les différentes pages accessibles avec leurs URLs ;
- le système de navigation entre les pages grâce aux routes.

Il ne contient pas directement le contenu détaillé des pages :
il indique plutôt QUEL composant doit être affiché selon l'URL visitée.


===============================================================================
CE QUE L'UTILISATEUR VOIT
===============================================================================

┌──────────────────────────────────────────────────────────────┐
│                         NAVBAR                               │
│   portfolio       Projects   Experience   About   Contact   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                                                              │
│              CONTENU DE LA PAGE ACTUELLE                     │
│                                                              │
│                  Exemple : HERO                              │
│                                                              │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                    autres éléments                            │
└──────────────────────────────────────────────────────────────┘


La Navbar est affichée en permanence.

En dessous de la Navbar, le contenu change en fonction de l'URL.


===============================================================================
LES DIFFÉRENTES PAGES
===============================================================================

URL : /

┌──────────────────────────────────────────────┐
│                  NAVBAR                      │
├──────────────────────────────────────────────┤
│                                              │
│                 HERO                         │
│                                              │
│        SaaS & MVP Developer                  │
│                                              │
│   Présentation principale du portfolio       │
│                                              │
└──────────────────────────────────────────────┘

→ C'est la page d'accueil du portfolio.


URL : /projects

┌──────────────────────────────────────────────┐
│                  NAVBAR                      │
├──────────────────────────────────────────────┤
│                                              │
│              PROJECTS                        │
│                                              │
│     Projets & Réalisations                   │
│                                              │
│   [Projet 1] [Projet 2] [Projet 3]           │
│                                              │
└──────────────────────────────────────────────┘

→ Affiche la page des projets.


URL : /experience

┌──────────────────────────────────────────────┐
│                  NAVBAR                      │
├──────────────────────────────────────────────┤
│                                              │
│          EXPERIENCE & COMPÉTENCES            │
│                                              │
│       Expériences professionnelles           │
│       Compétences / technologies              │
│                                              │
└──────────────────────────────────────────────┘

→ Affiche la section Expériences & Compétences.


URL : /about

┌──────────────────────────────────────────────┐
│                  NAVBAR                      │
├──────────────────────────────────────────────┤
│                                              │
│                 ABOUT                        │
│                                              │
│       Présentation personnelle                │
│       Parcours / profil                       │
│                                              │
└──────────────────────────────────────────────┘

→ Affiche la section À propos.


URL : /contact

┌──────────────────────────────────────────────┐
│                  NAVBAR                      │
├──────────────────────────────────────────────┤
│                                              │
│                CONTACT                       │
│                                              │
│       Informations / formulaire              │
│       pour contacter le développeur          │
│                                              │
└──────────────────────────────────────────────┘

→ Affiche la section Contact.


===============================================================================
COMMENT LA NAVIGATION FONCTIONNE
===============================================================================

L'utilisateur peut naviguer entre plusieurs pages :

                    ┌──────────────┐
                    │   NAVBAR     │
                    └──────┬───────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
        /projects      /experience        /about
          │                │                │
          ▼                ▼                ▼
       Projects       Experience         About
                                     
                           │
                           ▼
                        /contact
                           │
                           ▼
                        Contact


La navigation est gérée par React Router.

Cela signifie que l'application peut changer de page selon l'URL
sans devoir reconstruire toute l'application.


===============================================================================
STRUCTURE GÉNÉRALE
===============================================================================

App
 │
 ├── Navbar
 │
 └── Main
      │
      └── Route actuelle
           │
           ├── /             → Hero
           ├── /projects     → Projects
           ├── /experience   → ExperienceSection
           ├── /about        → AboutSection
           └── /contact      → ContactSection


===============================================================================
À RETENIR
===============================================================================

App.tsx = le "chef d'orchestre" global de l'application.

Il ne construit pas lui-même les différentes pages.

Il décide simplement :

    "Quelle page dois-je afficher pour cette URL ?"

Exemple :

    /projects   → afficher Projects
    /about      → afficher AboutSection
    /contact    → afficher ContactSection

Donc :

App.tsx
   ↓
choisit la page
   ↓
le composant de la page
   ↓
affichage réel à l'écran


En résumé :

App.tsx = STRUCTURE + NAVIGATION + ROUTES

Hero / Projects / Experience / About / Contact
        = CONTENU DES DIFFÉRENTES PAGES
===============================================================================
*/