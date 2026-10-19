import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

export const BackButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-base-content/70 hover:text-base-content transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
      aria-label={t('common.goBackToPreviousPage', 'Go back to previous page')}
    >
      <ArrowLeft
        className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
        aria-hidden="true"
      />
      <span>{t('common.back', 'Back')}</span>
    </button>
  );
};
















/*
===============================================================================
RÔLE DE CE FICHIER : BackButton.tsx
===============================================================================

Ce composant crée un petit bouton permettant à l'utilisateur de revenir
à la page précédente.

Il est utilisé notamment dans la page ExperienceSection.tsx.

Son fonctionnement repose sur l'historique de navigation de React Router.


===============================================================================
CE QUE L'UTILISATEUR VOIT
===============================================================================

En haut d'une page, l'utilisateur voit simplement :

┌──────────────────────────────┐
│  ←  Back                     │
└──────────────────────────────┘


Le bouton possède :

    ←    une icône de flèche vers la gauche
    Back un texte indiquant l'action


===============================================================================
QUE SE PASSE-T-IL AU CLIC ?
===============================================================================

Lorsque l'utilisateur clique sur :

                         [ ← Back ]

le composant demande au navigateur de revenir d'une étape
dans l'historique de navigation.

Exemple :

    Page précédente
          │
          ▼
    /projects
          │
          ▼
    /experience
          │
       clic sur
       [ ← Back ]
          │
          ▼
    /projects


Autre exemple :

    /about
       ↓
    /contact
       ↓
    [ ← Back ]
       ↓
    /about


Le bouton ne redirige donc pas vers une URL fixe.

Il revient simplement à la page visitée juste avant.


===============================================================================
DIFFÉRENCE AVEC UN LIEN CLASSIQUE
===============================================================================

Un lien classique pourrait dire :

    "Aller vers /projects"

Alors que ce bouton dit plutôt :

    "Revenir là où j'étais juste avant."


Donc :

    Link → destination déterminée à l'avance

    BackButton → destination basée sur l'historique de navigation


===============================================================================
APPARENCE DU BOUTON
===============================================================================

Le bouton utilise un style discret :

    [ ← Back ]

Il est volontairement moins important visuellement que les boutons
principaux de la page.

Au survol, son arrière-plan et son texte deviennent plus visibles :

Normal :
    [ ← Back ]

Survol :
    [ ← Back ]
       ↑
    effet visuel


===============================================================================
POSITION DANS LA PAGE EXPERIENCE
===============================================================================

Dans ExperienceSection.tsx, il est placé avant le titre de la page.

L'utilisateur voit donc :

┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  ← Back                                                       │
│                                                              │
│              [ TRACK RECORD & EXPERTISE ]                    │
│                                                              │
│                 Skills & Experience                          │
│                                                              │
│              ... contenu de la page ...                      │
│                                                              │
└──────────────────────────────────────────────────────────────┘


Cela donne à l'utilisateur un moyen simple de revenir à l'écran
qu'il consultait auparavant.


===============================================================================
RÔLE DANS L'APPLICATION
===============================================================================

Le fonctionnement est très simple :

                         BackButton
                             │
                             ▼
                   utilisateur clique
                             │
                             ▼
                    historique React Router
                             │
                             ▼
                  page précédente affichée


Le composant utilise donc la navigation déjà gérée par React Router.


===============================================================================
À RETENIR
===============================================================================

BackButton.tsx = BOUTON "RETOUR"

Il affiche :

    ← Back

Au clic :

    → revient à la page précédente.

Il ne possède pas de contenu complexe et ne gère pas une page entière.

Son rôle est uniquement de fournir une navigation de retour simple,
rapide et cohérente dans le portfolio.
===============================================================================
*/