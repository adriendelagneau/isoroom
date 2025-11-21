export interface Transform {
  readonly targetPosition: [number, number, number];
  readonly targetRotation: [number, number, number];
  zoom: number;
}
export interface IntroSetting {
  name: string;
  desktop: Transform;
  tablet: Transform;
  mobile: Transform;
}

export const introSettings: IntroSetting[] = [
  {
    name: "IntroView",
    desktop: {
      targetPosition: [0, 5.249, 10],
      targetRotation: [-0.40156, 0, 0],
      zoom: 26,
    },
    tablet: {
      targetPosition: [0.41, 5.82, 10],
      targetRotation: [-0.491459, 0, 0],
      zoom: 21,
    },
    mobile: {
      targetPosition: [0, 5.249, 10],
      targetRotation: [-0.40156, 0, 0],
      zoom: 15,
    },
  },
  {
    name: "InitialView",
    desktop: {
      targetPosition: [0, 0, 10],
      targetRotation: [0, 0, 0],
      zoom: 60,
    },
    tablet: { targetPosition: [0, 0, 10], targetRotation: [0, 0, 0], zoom: 38 },
    mobile: { targetPosition: [0, 0, 10], targetRotation: [0, 0, 0], zoom: 25 },
  },
];

export interface InteractiveItem {
  icon: string;
  name: string;
}
export type InteractiveBlock =
  | { type: "text"; content: string }
  | { type: "techList"; items: InteractiveItem[] }
  | { type: "textWithIcon"; content: string; icon: string };

export interface InteractiveObject {
  name: string;
  desktop: Transform;
  tablet: Transform;
  mobile: Transform;
  title: string;
  text?: string;
  special?: string;
  items?: InteractiveItem[];
  blocks?: InteractiveBlock[];
}

export const interactiveObjects: InteractiveObject[] = [
  {
    name: "Clock",
    desktop: {
      targetPosition: [7.63, 2.89, 10],
      targetRotation: [0, 0.826407, 0.1584],
      zoom: 226,
    },
    tablet: {
      targetPosition: [4.8, 2.83, 10],
      targetRotation: [0, 0.7484, 0.15407],
      zoom: 180,
    },
    mobile: {
      targetPosition: [4.7, 2.55, 10],
      targetRotation: [0, 0.758407, 0.155],
      zoom: 145,
    },
    title: "Clock :",
    text: "Parce qu’en code comme dans la vie, tout est une question de timing.",
  },
  {
    name: "Monkey",
    desktop: {
      targetPosition: [-3.28, 2.71, 10],
      targetRotation: [0, -0.72156, -0.161],
      zoom: 206,
    },
    tablet: {
      targetPosition: [-5.27, 3.2, 10],
      targetRotation: [0, -0.80159, -0.15159],
      zoom: 180,
    },
    mobile: {
      targetPosition: [-3.7, 3.2, 10],
      targetRotation: [0, -0.72159, -0.15159],
      zoom: 145,
    },
    title: "Monkey :",
    text: "Une expérimentation 3D en Three.js, basée sur le modèle emblématique Suzanne. Un jeu de particules, de shaders et de morphing, pour explorer les possibilités du web interactif.",
    special: "monkey",
  },
  {
    name: "Mug",
    desktop: {
      targetPosition: [-0.08399, -2.616, 10],
      targetRotation: [0.0384, -0.0084, -0.02156],
      zoom: 400,
    },
    tablet: {
      targetPosition: [-0.24, -2.43, 10],
      targetRotation: [0, 0, -0.0159],
      zoom: 400,
    },
    mobile: {
      targetPosition: [-0.36, -2.23, 10],
      targetRotation: [0, 0, 0],
      zoom: 320,
    },
    title: "Un café :",
    text: "Entre deux lignes de code et une gorgée de café, je suis toujours ouvert à de nouveaux projets. Télécharge ma carte de visite pour qu’on en parle !",
    special: "mug",
  },
  {
    name: "Library",
    desktop: {
      targetPosition: [-0.5, 0.3, 10],
      targetRotation: [0.1, -0.75156, -0.088],
      zoom: 256,
    },
    tablet: {
      targetPosition: [-2.5, 0.38, 10],
      targetRotation: [0.04807, -0.80156, -0.12159],
      zoom: 215,
    },
    mobile: {
      targetPosition: [-3, 0.41, 10],
      targetRotation: [0.048407, -0.80156, -0.125],
      zoom: 195,
    },
    title: "Library :",
    special: "Library",
    blocks: [
      {
        type: "text",
        content:
          "J’ai commencé mon parcours de développeur par une formation centrée sur les bases du web. Cette première expérience m’a permis d’acquérir une compréhension solide du développement et des fondamentaux du code.",
      },
      {
        type: "techList",
        items: [
          { icon: "/icons/html-5.svg", name: "Html" },
          { icon: "/icons/css-3.svg", name: "CSS" },
          { icon: "/icons/js.svg", name: "Javascript" },
          { icon: "/icons/sql.svg", name: "Sql" },
          { icon: "/icons/php.svg", name: "Php" },
        ],
      },
      {
        type: "text",
        content:
          "Par la suite, je me suis orienté vers le MERN stack, ce qui m’a permis d’élargir mes compétences et de gagner en autonomie sur la création d’applications complètes, du front au back.",
      },
      {
        type: "techList",
        items: [
          { icon: "/icons/mongodb.svg", name: "MongoDB" },
          { icon: "/icons/express.svg", name: "Express" },
          { icon: "/icons/react.svg", name: "React" },
          { icon: "/icons/nodejs.svg", name: "Node.js" },
        ],
      },

      {
        type: "text",
        content:
          "Aujourd’hui, je travaille principalement avec un écosystème moderne que j’utilise pour concevoir des interfaces dynamiques, fluides et immersives.",
      },
      {
        type: "techList",
        items: [
          { icon: "/icons/nextjs.svg", name: "Nextjs" },
          { icon: "/icons/typescript.svg", name: "Typescript" },
          { icon: "/icons/tailwind.svg", name: "Tailwind" },
          { icon: "/icons/shadcn.svg", name: "ShacnUI" },
          { icon: "/icons/gsap.svg", name: "Gsap" },
        ],
      },

      {
        type: "text",
        content:
          "Toujours curieux et passionné, j’aime découvrir de nouveaux outils, expérimenter et me tenir à jour sur les dernières évolutions du développement web.",
      },
    ],
  },
  {
    name: "Photos",
    desktop: {
      targetPosition: [9.47, 3.04, 10],
      targetRotation: [0, 0.68407, 0.16],
      zoom: 226,
    },

    tablet: {
      targetPosition: [10, 2.9, 10],
      targetRotation: [0, 0.7484, 0.163],
      zoom: 180,
    },
    mobile: {
      targetPosition: [10.6, 2.83, 10],
      targetRotation: [-0.00159, 0.768407, 0.168],
      zoom: 145,
    },
    title: "Projets :",
    text: "xplorez ma galerie : entre sites vitrines, boutiques en ligne et projets web interactifs, chaque création reflète une aventure unique.",
    special: "photos",
  },
];

export interface PhotoObject {
  name: string;
  websiteName: string;
  url: string;
}

export const photoObjects: PhotoObject[] = [
  { name: "Photo-1", websiteName: "Breiz-Cola", url: "https://breiz-cola.fr/" },
  { name: "Photo-2", websiteName: "Breiz-Cola", url: "#" },
  { name: "Photo-3", websiteName: "Breiz-Cola", url: "#" },
  { name: "Photo-4", websiteName: "Breiz-Cola", url: "#" },
  { name: "Photo-5", websiteName: "Breiz-Cola", url: "#" },
];
