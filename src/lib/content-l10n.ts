import type { Lang } from "./i18n";
import type { Certification, Mission } from "@/types";

type MissionFields = Pick<Mission, "title" | "location" | "description" | "instructions">;

const MISSION_L10N: Record<string, Partial<Record<Lang, MissionFields>>> = {
  "mis-1": {
    en: {
      title: "Reception entry control",
      location: "Zuidas Headquarters",
      description:
        "Access control at the main entrance. Visitor registration and badge issuance.",
      instructions:
        "Uniform required. Report 15 min before start at reception. Breaks coordinated with colleague.",
    },
    fr: {
      title: "Contrôle d'accès du siège",
      location: "Siège Zuidas",
      description:
        "Contrôle d'accès à l'entrée principale. Enregistrement des visiteurs et remise des badges.",
      instructions:
        "Uniforme obligatoire. Présentez-vous 15 min avant le début à l'accueil. Pauses coordonnées avec le collègue.",
    },
    es: {
      title: "Control de acceso oficina central",
      location: "Sede Zuidas",
      description:
        "Control de acceso en la entrada principal. Registro de visitantes y entrega de credenciales.",
      instructions:
        "Uniforme obligatorio. Preséntate 15 min antes en recepción. Descansos coordinados con el compañero.",
    },
  },
  "mis-2": {
    en: {
      title: "Festival event security",
      location: "Ziggo Dome - Summer Festival",
      description:
        "Crowd control and access checks at the main stage and VIP entrance.",
      instructions:
        "Earpiece and yellow vests provided on site. Briefing 15:30 at gate 4.",
    },
    fr: {
      title: "Sécurité festival",
      location: "Ziggo Dome - Festival d'été",
      description:
        "Gestion de foule et contrôle d'accès à la scène principale et entrée VIP.",
      instructions:
        "Oreillette et gilets jaunes fournis sur place. Briefing 15:30 à la porte 4.",
    },
    es: {
      title: "Seguridad festival",
      location: "Ziggo Dome - Festival de Verano",
      description:
        "Control de aforo y acceso en escenario principal y entrada VIP.",
      instructions:
        "Pinganillo y chalecos amarillos en el lugar. Briefing 15:30 en la puerta 4.",
    },
  },
  "mis-3": {
    en: {
      title: "Retail surveillance",
      location: "AH XL Beverwaard",
      description: "Preventive surveillance and shoplifting response in plain clothes.",
      instructions:
        "Plain clothes. Report to the assistant store manager for briefing.",
    },
    fr: {
      title: "Surveillance commerce",
      location: "AH XL Beverwaard",
      description:
        "Surveillance préventive et intervention anti-vol en civil.",
      instructions:
        "Tenue civile. Présentez-vous au directeur adjoint pour le briefing.",
    },
    es: {
      title: "Vigilancia en tienda",
      location: "AH XL Beverwaard",
      description:
        "Vigilancia preventiva e intervención antihurto de paisano.",
      instructions:
        "De paisano. Preséntate al subgerente para el briefing.",
    },
  },
  "mis-4": {
    en: {
      title: "Mobile patrol business park",
      location: "Schieveen Business Park",
      description:
        "Vehicle patrol with K9. Four rounds per night.",
      instructions: "Vehicle picked up at depot. Follow K9 protocol.",
    },
    fr: {
      title: "Patrouille mobile zone d'activités",
      location: "Parc d'activités Schieveen",
      description:
        "Patrouille véhiculée avec chien. Quatre rondes par nuit.",
      instructions: "Véhicule à récupérer au dépôt. Respecter le protocole K9.",
    },
    es: {
      title: "Patrulla móvil polígono",
      location: "Polígono Schieveen",
      description:
        "Patrulla en vehículo con perro. Cuatro rondas por noche.",
      instructions: "Recoger vehículo en depósito. Seguir protocolo canino.",
    },
  },
  "mis-5": {
    en: {
      title: "Nightlife door supervisor weekend",
      location: "Club NL",
      description: "Door supervision and house-rules enforcement.",
      instructions: "Dress code: black suit. ID check at entrance.",
    },
    fr: {
      title: "Videur weekend",
      location: "Club NL",
      description:
        "Contrôle d'entrée et application du règlement intérieur.",
      instructions: "Tenue : costume noir. Contrôle d'identité à l'entrée.",
    },
    es: {
      title: "Portero fin de semana",
      location: "Club NL",
      description:
        "Control de acceso y cumplimiento del reglamento interno.",
      instructions: "Etiqueta: traje negro. Control de DNI en la entrada.",
    },
  },
  "mis-6": {
    en: {
      title: "Close protection diplomatic visit",
      location: "Hotel Des Indes",
      description: "CP team for an international guest.",
      instructions: "Briefing 1h before start. Discretion required.",
    },
    fr: {
      title: "Protection rapprochée visite diplomatique",
      location: "Hôtel Des Indes",
      description: "Équipe de protection rapprochée pour un invité international.",
      instructions: "Briefing 1h avant le début. Discrétion exigée.",
    },
    es: {
      title: "Protección personal visita diplomática",
      location: "Hotel Des Indes",
      description: "Equipo de PP para un huésped internacional.",
      instructions: "Briefing 1 h antes del inicio. Discreción obligatoria.",
    },
  },
  "mis-7": {
    en: {
      title: "Control room night shift",
      location: "Werkkompas Control Room",
      description:
        "Alarm system operation and coordination of mobile units.",
      instructions: "Handover at 21:45 with colleague. Keep logbook.",
    },
    fr: {
      title: "Opérateur PC sécurité nuit",
      location: "PC sécurité Werkkompas",
      description:
        "Gestion du système d'alarme et coordination des unités mobiles.",
      instructions: "Passation à 21h45 avec le collègue. Tenir le journal.",
    },
    es: {
      title: "Operador central turno noche",
      location: "Central Werkkompas",
      description:
        "Operación del sistema de alarma y coordinación de unidades móviles.",
      instructions: "Relevo 21:45 con el compañero. Mantener bitácora.",
    },
  },
  "mis-8": {
    en: {
      title: "Reception & entry control",
      location: "Achmea Headquarters",
      description: "Reception support, badge control.",
      instructions: "Smart uniform. No visible phone at the desk.",
    },
    fr: {
      title: "Accueil & contrôle d'accès",
      location: "Siège Achmea",
      description: "Soutien accueil, contrôle des badges.",
      instructions: "Uniforme soigné. Pas de téléphone visible au comptoir.",
    },
    es: {
      title: "Recepción y control de acceso",
      location: "Sede Achmea",
      description: "Apoyo en recepción, control de credenciales.",
      instructions: "Uniforme cuidado. Sin teléfono visible en mostrador.",
    },
  },
  "mis-9": {
    en: {
      title: "Event - football match",
      location: "De Kuip Stadium",
      description: "Stewarding at home match, North and East sections.",
      instructions:
        "Meet at gate 6 at 12:30. Vests and radios at briefing.",
    },
    fr: {
      title: "Événement - match de football",
      location: "Stade De Kuip",
      description: "Stewarding au match à domicile, secteurs Nord et Est.",
      instructions: "RDV porte 6 à 12h30. Gilets et talkies au briefing.",
    },
    es: {
      title: "Evento - partido de fútbol",
      location: "Estadio De Kuip",
      description: "Auxiliares en partido en casa, sectores Norte y Este.",
      instructions:
        "Quedada puerta 6 a 12:30. Chalecos y walkies en el briefing.",
    },
  },
  "mis-10": {
    en: {
      title: "Construction site security evening",
      location: "Merwedekanaalzone Construction Site",
      description: "Site and perimeter security after hours.",
      instructions:
        "Keys and key plan at entrance. Hourly rounds, log book.",
    },
    fr: {
      title: "Sécurité chantier soirée",
      location: "Chantier Merwedekanaalzone",
      description: "Sécurité du site et du périmètre après les heures.",
      instructions:
        "Clés et plan des clés à l'entrée. Rondes horaires, journal.",
    },
    es: {
      title: "Seguridad obra tarde-noche",
      location: "Obra Merwedekanaalzone",
      description: "Vigilancia de obra y perímetro fuera de horario.",
      instructions:
        "Llaves y plano de llaves en la entrada. Rondas por hora, libro.",
    },
  },
};

const CERT_L10N: Partial<Record<Lang, Record<Certification, string>>> = {
  en: {
    "Beveiliger 2": "Security Officer 2",
    Evenementenbeveiliger: "Event Steward",
    Persoonsbeveiliger: "Close Protection Officer",
    Centralist: "Control Room Operator",
    BHV: "Workplace First Aid (BHV)",
    EHBO: "First Aid (EHBO)",
    Hondengeleider: "K9 Handler",
    "Horeca Portier": "Door Supervisor",
  },
  fr: {
    "Beveiliger 2": "Agent de sécurité 2",
    Evenementenbeveiliger: "Steward d'événement",
    Persoonsbeveiliger: "Garde rapprochée",
    Centralist: "Opérateur PC sécurité",
    BHV: "Premiers secours en entreprise",
    EHBO: "Premiers secours (EHBO)",
    Hondengeleider: "Maître-chien",
    "Horeca Portier": "Videur",
  },
  es: {
    "Beveiliger 2": "Agente de seguridad 2",
    Evenementenbeveiliger: "Auxiliar de eventos",
    Persoonsbeveiliger: "Guardaespaldas",
    Centralist: "Operador de central",
    BHV: "Primeros auxilios empresa (BHV)",
    EHBO: "Primeros auxilios (EHBO)",
    Hondengeleider: "Guía canino",
    "Horeca Portier": "Portero de discoteca",
  },
};

export function localizeMission(m: Mission, lang: Lang): Mission {
  if (lang === "nl") return m;
  const tr = MISSION_L10N[m.id]?.[lang];
  return tr ? { ...m, ...tr } : m;
}

export function localizeCert(c: Certification, lang: Lang): string {
  if (lang === "nl") return c;
  return CERT_L10N[lang]?.[c] ?? c;
}
