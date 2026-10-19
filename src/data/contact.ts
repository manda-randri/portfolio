export type ContactInfoType = "email" | "whatsapp" | "availability";

export type SocialPlatform = "LinkedIn" | "Facebook";

export interface ContactInfo {
  /** Identifiant utilisé par ContactSection.tsx pour associer l'icône de marque */
  type: ContactInfoType;
  title: string;
  value: string;
  link?: string;
}

export interface SocialLink {
  /** Plateforme (sert à choisir le logo officiel) */
  platform: SocialPlatform;
  /** Nom affiché tel qu'il apparaît sur la plateforme (élément non cliquable) */
  displayName: string;
}

export interface LocalizedContactContent {
  title: string;
  subtitle: string;
  infoList: ContactInfo[];
}

export interface ContactData {
  // Réseaux sociaux (indépendants de la langue)
  socials: SocialLink[];

  // Contenu bilingue
  en: LocalizedContactContent;
  fr: LocalizedContactContent;

  // Fallbacks (français par défaut), conservés pour compatibilité
  title: string;
  subtitle: string;
  infoList: ContactInfo[];
}

const fr: LocalizedContactContent = {
  title: "Construisons quelque chose d'utile.",
  subtitle:
    "Vous avez une idée de SaaS, une application web à développer ou un produit existant à faire évoluer ? Transformons-la en un produit digital clair, fonctionnel et utile.",
  infoList: [
    {
      type: "email",
      title: "E-mail",
      value: "mandarandri2@gmail.com",
      link: "mailto:mandarandri2@gmail.com",
    },
    {
      type: "whatsapp",
      title: "WhatsApp",
      value: "+261 34 04 112 30",
      link: "https://wa.me/261340411230",
    },
    {
      type: "availability",
      title: "Disponibilité",
      value: "À distance · Monde entier",
    },
  ],
};

const en: LocalizedContactContent = {
  title: "Let's build something useful.",
  subtitle:
    "Have a SaaS idea, a web application to build, or an existing product to improve? Let's turn it into a clear, functional digital product.",
  infoList: [
    {
      type: "email",
      title: "Email",
      value: "mandarandri2@gmail.com",
      link: "mailto:mandarandri2@gmail.com",
    },
    {
      type: "whatsapp",
      title: "WhatsApp",
      value: "+261 34 04 112 30",
      link: "https://wa.me/261340411230",
    },
    {
      type: "availability",
      title: "Availability",
      value: "Remote · Worldwide",
    },
  ],
};

export const contactData: ContactData = {
  fr,
  en,

  // WhatsApp retiré (déjà présent dans infoList) — affichage seul, sans lien
  socials: [
    { platform: "LinkedIn", displayName: "Manda RANDRIANANTOANDRO" },
    { platform: "Facebook", displayName: "Manda Ny Aina" },
  ],

  // Fallbacks (français), dérivés de `fr` pour éviter toute duplication
  title: fr.title,
  subtitle: fr.subtitle,
  infoList: fr.infoList,
};