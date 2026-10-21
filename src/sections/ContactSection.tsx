import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, CheckCircle, Send } from 'lucide-react';
import { FaWhatsapp, FaLinkedin, FaFacebook, FaLocationDot } from 'react-icons/fa6';
import emailjs from '@emailjs/browser';
import { contactData } from '../data/contact';
import type { ContactInfoType, SocialPlatform } from '../data/contact';

type IconComponent = React.ComponentType<{ className?: string }>;

/* ------------------------------------------------------------------ */
/*  Logos fidèles aux originaux                                        */
/* ------------------------------------------------------------------ */

const GmailIcon: IconComponent = ({ className }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4caf50" d="M45 16.2l-5 2.75-5 4.75L35 40h7c1.657 0 3-1.343 3-3V16.2z" />
    <path fill="#1e88e5" d="M3 16.2l3.614 1.71L13 23.7V40H6c-1.657 0-3-1.343-3-3V16.2z" />
    <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
    <path fill="#c62828" d="M3 12.298V16.2l10 7.5V11.2L9.876 8.859C9.132 8.301 8.228 8 7.298 8h0C4.924 8 3 9.924 3 12.298z" />
    <path fill="#fbc02d" d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341C38.868 8.301 39.772 8 40.702 8h0C43.076 8 45 9.924 45 12.298z" />
  </svg>
);

const WhatsAppIcon: IconComponent = ({ className }) => (
  <FaWhatsapp className={className} style={{ color: '#25D366' }} aria-hidden="true" />
);

const PinIcon: IconComponent = ({ className }) => (
  <FaLocationDot className={className} style={{ color: '#EA4335' }} aria-hidden="true" />
);

const LinkedInIcon: IconComponent = ({ className }) => (
  <FaLinkedin className={className} style={{ color: '#0A66C2' }} aria-hidden="true" />
);

const FacebookIcon: IconComponent = ({ className }) => (
  <FaFacebook className={className} style={{ color: '#1877F2' }} aria-hidden="true" />
);

const INFO_ICONS: Record<ContactInfoType, IconComponent> = {
  email: GmailIcon,
  whatsapp: WhatsAppIcon,
  availability: PinIcon,
};

const SOCIAL_ICONS: Record<SocialPlatform, IconComponent> = {
  LinkedIn: LinkedInIcon,
  Facebook: FacebookIcon,
};

/* ------------------------------------------------------------------ */
/*  Système de verre                                                   */
/* ------------------------------------------------------------------ */

/**
 * Surface « verre dépoli » :
 * - fond translucide + backdrop-blur (le fond de page transparaît)
 * - bordure quasi invisible (black/5 en clair, white/10 en sombre)
 * - reflet de lumière en haut (inset) pour l'effet de matière
 * - ombre large et diffuse pour la sensation de flottement
 */
const glass =
  'bg-white/55 dark:bg-white/[0.04] backdrop-blur-xl backdrop-saturate-150 ' +
  'border border-black/5 dark:border-white/10 ' +
  'shadow-xl shadow-black/5 dark:shadow-black/30 ' +
  'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]';

/** Pastille blanche façon icône d'app : le logo garde ses vraies couleurs */
function LogoTile({ Icon, size = 'md' }: { Icon: IconComponent; size?: 'md' | 'sm' }) {
  const box = size === 'md' ? 'w-10 h-10 rounded-xl' : 'w-8 h-8 rounded-[10px]';
  const glyph = size === 'md' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <span
      className={`${box} shrink-0 inline-flex items-center justify-center bg-white shadow-md shadow-black/10 ring-1 ring-black/5`}
    >
      <Icon className={glyph} />
    </span>
  );
}

/** Champs sans contour dur : fond en retrait, focus lumineux */
const fieldClasses =
  'w-full px-3.5 py-2.5 rounded-xl text-[13px] text-foreground placeholder:text-muted-foreground/50 ' +
  'bg-black/[0.035] dark:bg-white/[0.05] border border-transparent outline-none ' +
  'transition-all duration-200 ' +
  'focus:bg-white/80 dark:focus:bg-white/[0.08] focus:border-primary/30 focus:ring-4 focus:ring-primary/10';

const labelClasses = 'block text-xs font-medium text-muted-foreground mb-1.5 pl-0.5';

export function ContactSection() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.startsWith('fr') ? 'fr' : 'en') as 'fr' | 'en';
  const content = contactData[currentLang] || contactData.fr;

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Identifiants EmailJS intégrés directement (sans passer par les variables d'environnement Vercel)
      const serviceID = "service_6vs7bl8";   // Ex: "service_abc1234"
      const templateID = "template_srgp2bc"; // Ex: "template_xyz9876"
      const publicKey = "TIQmNd7yZuGe_RnHc";     // Ex: "XyZ_AbCdEfGhIjK"

      const templateParams = {
        from_name: formState.name,
        from_email: formState.email,
        reply_to: formState.email,
        message: formState.message,
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
    } catch (error: unknown) {
      const errDetails =
        typeof error === 'object' && error !== null && 'text' in error
          ? (error as { text?: string }).text
          : error;

      console.error('EmailJS Error details:', errDetails);
      setErrorMessage(
        currentLang === 'fr'
          ? "Impossible d'envoyer le message. Veuillez réessayer ultérieurement."
          : "Unable to send the message. Please try again later."
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-14 lg:py-0 lg:min-h-[100svh] lg:pt-16 lg:pb-6 lg:flex lg:items-center antialiased"
    >
      {/* Arrière-plan : lueurs diffuses qui donnent de la matière au verre */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-[26rem] w-[26rem] rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-[24rem] w-[24rem] rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-[22rem] w-[22rem] rounded-full bg-violet-400/20 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ---------- Colonne gauche ---------- */}
          <div className="lg:col-span-5">
            <h2 className="text-[1.75rem] sm:text-[2rem] font-semibold tracking-[-0.025em] leading-[1.1] text-foreground">
              {content.title}
            </h2>
            <p className="mt-3 max-w-[26rem] text-[13px] leading-relaxed text-muted-foreground">
              {content.subtitle}
            </p>

            {/* Une carte flottante par information, légèrement décalées */}
            <ul className="mt-6 space-y-3">
              {content.infoList.map((info, index) => {
                const Icon = INFO_ICONS[info.type] ?? GmailIcon;
                const isExternal = info.link?.startsWith('http');
                const offset = index % 2 === 1 ? 'lg:ml-5' : '';

                const body = (
                  <>
                    <LogoTile Icon={Icon} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] leading-none text-muted-foreground mb-1.5">
                        {info.title}
                      </span>
                      <span className="block truncate text-[13px] font-medium leading-none text-foreground">
                        {info.value}
                      </span>
                    </span>
                    {info.link && (
                      <ArrowUpRight
                        className="w-3.5 h-3.5 shrink-0 text-muted-foreground/40 transition-all duration-300 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    )}
                  </>
                );

                return (
                  <li key={info.type} className={offset}>
                    {info.link ? (
                      <a
                        href={info.link}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className={`${glass} group flex items-center gap-3.5 rounded-2xl p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:bg-white/70 dark:hover:bg-white/[0.07] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40`}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={`${glass} flex items-center gap-3.5 rounded-2xl p-3.5`}>
                        {body}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Réseaux sociaux : cartes de verre, logo + nom, non cliquables */}
            <ul className="mt-3 flex flex-wrap gap-3">
              {contactData.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform];
                if (!Icon) return null;

                return (
                  <li
                    key={social.platform}
                    className={`${glass} flex items-center gap-2.5 rounded-2xl py-2.5 pl-2.5 pr-4`}
                  >
                    <LogoTile Icon={Icon} size="sm" />
                    <span className="min-w-0">
                      <span className="block text-[10px] leading-none text-muted-foreground mb-1">
                        {social.platform}
                      </span>
                      <span className="block text-xs font-medium leading-none text-foreground">
                        {social.displayName}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ---------- Colonne droite : formulaire flottant ---------- */}
          <div className="lg:col-span-7">
            <div className={`${glass} rounded-3xl p-6 sm:p-7 relative`}>
              {isSubmitted ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-success/10 text-success flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {currentLang === 'fr' ? 'Message envoyé' : 'Message sent'}
                  </h3>
                  <p className="mx-auto max-w-sm text-[13px] leading-relaxed text-muted-foreground">
                    {currentLang === 'fr'
                      ? 'Merci pour votre message. Je vous répondrai dans les plus brefs délais.'
                      : 'Thank you for your message. I will get back to you as soon as possible.'}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-[13px] font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-opacity hover:opacity-90"
                  >
                    {currentLang === 'fr' ? 'Envoyer un autre message' : 'Send another message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-sm font-semibold tracking-tight text-foreground">
                    {currentLang === 'fr' ? 'Envoyez un message' : 'Send a message'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className={labelClasses}>
                        {currentLang === 'fr' ? 'Nom' : 'Name'}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        placeholder={currentLang === 'fr' ? 'Jean Dupont' : 'John Doe'}
                        className={fieldClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClasses}>
                        {currentLang === 'fr' ? 'E-mail' : 'Email'}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="jean.dupont@example.com"
                        className={fieldClasses}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClasses}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      placeholder={
                        currentLang === 'fr'
                          ? 'Parlez-moi de votre projet...'
                          : 'Tell me about your project...'
                      }
                      className={`${fieldClasses} resize-none`}
                    />
                  </div>

                  {errorMessage && (
                    <p className="rounded-xl bg-destructive/10 p-2.5 text-xs text-destructive">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-[13px] font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:opacity-90 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:shadow-none cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>{currentLang === 'fr' ? 'Envoi en cours...' : 'Sending...'}</span>
                    ) : (
                      <>
                        <span>{currentLang === 'fr' ? 'Envoyer le message' : 'Send message'}</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}











/*
========================================================
CE QUE CE FICHIER FAIT ET CE QUE L'UTILISATEUR VOIT
========================================================

Ce fichier construit la page "CONTACT" du portfolio.

Son objectif est de permettre au visiteur de comprendre
comment contacter le développeur et de lui laisser
un message via un formulaire.

À l'écran, l'utilisateur voit principalement :

    ← Back

    [ GET IN TOUCH ]

             Contact

    Un court texte de présentation


    ┌──────────────────────────┬──────────────────────────┐
    │                          │                          │
    │  CONTACT INFORMATION     │     CONTACT FORM         │
    │                          │                          │
    │  📧 Email                │  Your Name               │
    │  📍 ...                  │  Your Email              │
    │  🔗 ...                  │  Subject                 │
    │                          │  Message                 │
    │  SOCIAL NETWORKS         │                          │
    │                          │  [ Send Message 🚀 ]     │
    │  [GitHub] [LinkedIn]     │                          │
    │                          │                          │
    └──────────────────────────┴──────────────────────────┘

    © 2026 Manda RANDRIANANTOANDRO — All rights reserved.


========================================================
1. BOUTON DE RETOUR
========================================================

Tout en haut de la page, l'utilisateur voit :

    ← Back

Ce bouton permet de revenir à la page précédente.

Il est fourni par le composant BackButton.


========================================================
2. EN-TÊTE "GET IN TOUCH"
========================================================

L'utilisateur voit un petit badge :

    [ GET IN TOUCH ]

Puis un grand titre :

    Contact

Puis une phrase explicative sous le titre.

Le texte dépend de la langue sélectionnée.

En français, l'utilisateur voit la version française.

En anglais, il voit la version anglaise.


========================================================
3. COLONNE DE GAUCHE : INFORMATIONS DE CONTACT
========================================================

Sur ordinateur, la partie gauche affiche les
informations permettant de contacter le développeur.

Chaque information apparaît sous forme de carte.

Exemple visuel :

    ┌──────────────────────────────────────┐
    │  📧   Email                          │
    │       contact@example.com            │
    └──────────────────────────────────────┘

    ┌──────────────────────────────────────┐
    │  📍   Location                       │
    │       Madagascar                     │
    └──────────────────────────────────────┘


Les informations exactes dépendent du contenu
présent dans contactData.


Si une information possède un lien, sa valeur
devient cliquable.

L'utilisateur peut donc, selon les données,
cliquer directement sur certaines informations.


========================================================
4. PARTIE "SOCIAL NETWORKS"
========================================================

Sous les coordonnées, l'utilisateur voit :

    CONNECT ON SOCIAL NETWORKS:


Puis des boutons correspondant aux réseaux définis
dans contactData.

Par exemple :

    [ 🔗 GitHub ]   [ 💼 LinkedIn ]   [ ... ]


Chaque bouton contient :

    • une icône
    • le nom de la plateforme

Lorsque l'utilisateur clique dessus, le réseau
social s'ouvre dans un nouvel onglet.


========================================================
5. COLONNE DE DROITE : FORMULAIRE
========================================================

La partie droite contient une grande carte
avec le formulaire de contact.

L'utilisateur voit les champs suivants :

    Your Name
    ┌────────────────────────────────────┐
    │ John Doe                           │
    └────────────────────────────────────┘


    Your Email
    ┌────────────────────────────────────┐
    │ john@example.com                   │
    └────────────────────────────────────┘


    Subject
    ┌────────────────────────────────────┐
    │ SaaS Project / Freelance Opportunity│
    └────────────────────────────────────┘


    Message
    ┌────────────────────────────────────┐
    │ Describe your project or technical │
    │ requirements...                    │
    │                                    │
    └────────────────────────────────────┘


    ┌────────────────────────────────────┐
    │        Send Message 🚀             │
    └────────────────────────────────────┘


========================================================
6. NOM ET EMAIL SUR LA MÊME LIGNE
========================================================

Sur ordinateur, les deux premiers champs sont
placés côte à côte :

    ┌───────────────────┬───────────────────┐
    │ Your Name         │ Your Email        │
    │                   │                   │
    │ John Doe          │ john@example.com  │
    └───────────────────┴───────────────────┘


Sur un écran plus petit, ils passent l'un
sous l'autre :

    ┌─────────────────────────────┐
    │ Your Name                   │
    └─────────────────────────────┘

    ┌─────────────────────────────┐
    │ Your Email                  │
    └─────────────────────────────┘


========================================================
7. CE QUE LE VISITEUR FAIT DANS LE FORMULAIRE
========================================================

Le visiteur peut écrire :

    son nom
          ↓
    son adresse email
          ↓
    le sujet de sa demande
          ↓
    son message


Les informations saisies restent visibles
dans les champs pendant qu'il remplit le formulaire.


Exemple :

    Your Name
    ┌─────────────────────────────┐
    │ Manda                       │
    └─────────────────────────────┘

    Your Email
    ┌─────────────────────────────┐
    │ manda@email.com             │
    └─────────────────────────────┘

    Subject
    ┌─────────────────────────────┐
    │ SaaS Project                │
    └─────────────────────────────┘

    Message
    ┌─────────────────────────────┐
    │ I would like to discuss...  │
    └─────────────────────────────┘


========================================================
8. CLIC SUR "SEND MESSAGE"
========================================================

Lorsque l'utilisateur clique :

    [ Send Message 🚀 ]


le bouton change temporairement d'apparence
et son texte devient :

    [ Sending Message... ]


Le bouton est temporairement désactivé.


L'utilisateur voit donc une courte phase :

    Remplir le formulaire
            ↓
    [ Send Message 🚀 ]
            ↓
    [ Sending Message... ]
            ↓
    confirmation


========================================================
9. MESSAGE DE SUCCÈS
========================================================

Après environ une seconde, le formulaire disparaît
et l'utilisateur voit une nouvelle interface :

    ┌──────────────────────────────────────────┐
    │                                          │
    │                    🎉                    │
    │                                          │
    │       Message Sent Successfully!         │
    │                                          │
    │  Thank you for reaching out. I will      │
    │  get back to you as soon as possible.    │
    │                                          │
    │      [ Send Another Message ]            │
    │                                          │
    └──────────────────────────────────────────┘


En français, les textes affichés dépendent
des traductions correspondantes.


========================================================
10. "SEND ANOTHER MESSAGE"
========================================================

Après le message de succès, l'utilisateur voit :

    [ Send Another Message ]


S'il clique dessus :

    confirmation
          ↓
    retour au formulaire
          ↓
    nouveaux champs vides


Il peut alors rédiger un autre message.


========================================================
11. IMPORTANT : CE QUE FAIT RÉELLEMENT LE FORMULAIRE
========================================================

À l'écran, le visiteur a l'impression que son message
est envoyé après avoir cliqué sur le bouton.

Mais dans CE FICHIER, l'envoi est actuellement
une simulation.

Le fonctionnement réel est :

    Utilisateur remplit les champs
                  ↓
           clic sur "Send"
                  ↓
        attente d'environ 1 seconde
                  ↓
       affichage du succès
                  ↓
        formulaire réinitialisé


Ce fichier ne montre pas d'envoi réel vers :

    • une adresse email
    • un serveur
    • une API
    • une base de données
    • un service de formulaire


Donc le visiteur VOIT une confirmation d'envoi,
mais ce code ne montre pas que le message est
effectivement transmis à une destination.


========================================================
12. CHANGEMENT DE LANGUE
========================================================

La page adapte son contenu à la langue active.

Une partie des textes provient de i18next.

Par exemple :

    EN
    ─────────────────
    Get In Touch
    Contact
    Your Name
    Your Email
    Subject
    Message
    Send Message


    FR
    ─────────────────
    Contactez-moi
    Contact
    Votre nom
    Votre email
    Sujet
    Message
    Envoyer le message


Les informations principales de contact sont également
récupérées dans la version linguistique correspondante
de contactData.


========================================================
13. VERSION MOBILE
========================================================

Sur ordinateur :

    ┌──────────────────────┬──────────────────────┐
    │ CONTACT INFORMATION  │ CONTACT FORM         │
    │                      │                      │
    │ Email                │ Name / Email         │
    │ Location             │ Subject              │
    │ Social Networks      │ Message              │
    │                      │ Send Message         │
    └──────────────────────┴──────────────────────┘


Sur téléphone, les éléments sont empilés :

    ┌───────────────────────────┐
    │ CONTACT INFORMATION       │
    │                           │
    │ Email                     │
    │ Location                  │
    │ ...                       │
    └───────────────────────────┘

                 ↓

    ┌───────────────────────────┐
    │ SOCIAL NETWORKS            │
    │                           │
    │ [GitHub] [LinkedIn]       │
    └───────────────────────────┘

                 ↓

    ┌───────────────────────────┐
    │ CONTACT FORM              │
    │                           │
    │ Your Name                 │
    │ Your Email                │
    │ Subject                   │
    │ Message                   │
    │                           │
    │ [ Send Message 🚀 ]       │
    └───────────────────────────┘


========================================================
14. BAS DE LA PAGE
========================================================

Tout en bas, l'utilisateur voit une ligne de copyright :

    © 2026 Manda RANDRIANANTOANDRO
    — All rights reserved.


L'année est automatiquement récupérée à partir
de l'année actuelle.


========================================================
VISION GLOBALE DE CE QUE L'UTILISATEUR VOIT
========================================================

                 ← Back

              [ GET IN TOUCH ]

                  Contact

       Let's discuss your project...


    ┌──────────────────────┬────────────────────────┐
    │                      │                        │
    │  CONTACT INFORMATION │      CONTACT FORM      │
    │                      │                        │
    │  📧 Email            │  Your Name             │
    │  📍 Location         │  Your Email            │
    │  🔗 Contact          │  Subject               │
    │                      │  Message               │
    │  SOCIAL NETWORKS     │                        │
    │                      │  [ Send Message 🚀 ]   │
    │  [GitHub] [LinkedIn] │                        │
    │                      │                        │
    └──────────────────────┴────────────────────────┘


    Après l'envoi :

              🎉

       Message Sent Successfully!

       Thank you for reaching out.
       I will get back to you
       as soon as possible.

       [ Send Another Message ]


    ─────────────────────────────────────────────

    © 2026 Manda RANDRIANANTOANDRO
    — All rights reserved.


========================================================
EN RÉSUMÉ
========================================================

Ce fichier est la PAGE DE CONTACT interactive.

L'utilisateur y voit et peut utiliser :

    ✓ bouton ← Back
    ✓ titre et introduction
    ✓ coordonnées de contact
    ✓ liens vers les réseaux sociaux
    ✓ formulaire Nom
    ✓ formulaire Email
    ✓ formulaire Sujet
    ✓ formulaire Message
    ✓ bouton "Send Message 🚀"
    ✓ état "Sending Message..."
    ✓ écran de confirmation 🎉
    ✓ bouton "Send Another Message"
    ✓ copyright
    ✓ interface adaptée au mobile
    ✓ contenu adapté à la langue FR / EN

Le point le plus important à retenir :

    contact.ts
         ↓
    fournit les informations

    ContactSection.tsx
         ↓
    les transforme en interface visible
    et gère les interactions du formulaire.
*/