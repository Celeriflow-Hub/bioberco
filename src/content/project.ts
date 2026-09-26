export const projectContent = {
  name: "BIOBERÇO",
  team: "Equipe Bee Lego",
  school: "SESI Sete Lagoas/MG",
  challenge: "FLL Innovation Challenge",
  speciesName: "Faveiro-de-Wilson",
  initialMappedTrees: 240,
  worldEstimate: 246,
  officialUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://bioberco-beelego.vercel.app",
  externalForwardingEnabled: false,
  hero: {
    badge:
      "Ajude a encontrar e proteger as últimas árvores de Faveiro-de-Wilson!",
    titleA: "Viu um Faveiro-de-Wilson?",
    titleB: "Envie a foto e a localização aqui!",
    description:
      "Existem apenas cerca de 246 árvores dessa espécie no mundo, todas encontradas em Minas Gerais. Com o aplicativo criado pela equipe Bee Lego, do SESI, você aprende a reconhecer o faveiro-de-Wilson e pode contribuir com biólogos e pesquisadores no monitoramento e na proteção dessa espécie ameaçada.",
  },
  guide: [
    {
      step: "1. Porte e Copa",
      title: "Árvore Frondosa em Áreas Abertas",
      text: "É uma árvore grande, isolada em pastagens ou cerrados, com copa bem aberta e folhagem bem verde e densa.",
      image: "/images/faveiro/faveiro-porte.jpg",
      imageAlt:
        "Faveiro-de-Wilson adulto com copa aberta em formato de guarda-chuva",
    },
    {
      step: "2. Vagens e Folhas",
      title: "Vagens Verdes em Cachos",
      text: "Possui vagens (favas) compridas e achatadas agrupadas no topo dos galhos, junto a folhas finas parecidas com penas.",
      image: "/images/faveiro/faveiro-vagens.jpg",
      imageAlt: "Cacho de vagens verdes compridas de Faveiro-de-Wilson",
    },
    {
      step: "3. Rara em Minas",
      title: "Rara e Ameaçada",
      text: "Apenas cerca de 240 exemplares foram identificados em Minas Gerais. Cada nova árvore encontrada é essencial para a conservação.",
      image: "/images/faveiro/faveiro-folhas.jpg",
      imageAlt: "Folhas divididas em pequenas folhinhas verdes de Faveiro-de-Wilson",
    },
    {
      step: "4. Porte da Árvore",
      title: "Árvore Alta e Longeva",
      bullets: [
        "Pode chegar a 18 m de altura.",
        "O tronco pode chegar a 1,5 m de diâmetro.",
        "Pode viver mais de 100 anos.",
      ],
      image: "/images/faveiro/faveiro-tronco.jpg",
      imageAlt:
        "Troncos de Faveiro-de-Wilson em campo aberto, mostrando porte de grande árvore",
    },
    {
      step: "5. Folhas",
      title: "Folhas Grandes e Bipinadas",
      bullets: [
        "Folhas grandes e bipinadas.",
        "Possuem vários pares de pinas.",
        "Os folíolos têm cerca de 3 a 5 cm.",
      ],
      image: "/images/faveiro/faveiro-foliolos.jpg",
      imageAlt: "Folhas bipinadas de Faveiro-de-Wilson com vários pares de pinas",
    },
    {
      step: "6. Folíolos",
      title: "Folíolos Aveludados",
      text: "Têm cerca de 3 a 5 cm, são ligeiramente aveludados e fazem parte de folhas grandes e bipinadas.",
      image: "/images/faveiro/faveiro-foliolos.jpg",
      imageAlt: "Detalhe dos folíolos aveludados de 3 a 5 cm do Faveiro-de-Wilson",
    },
    {
      step: "7. Flores",
      title: "Flores Amarelas no Verão",
      bullets: [
        "Surgem entre dezembro e fevereiro.",
        "Formam cachos de pequenas flores amarelas.",
      ],
      image: "/images/faveiro/faveiro-flores.jpg",
      imageAlt:
        "Cachos de pequenas flores amarelas do Faveiro-de-Wilson entre dezembro e fevereiro",
    },
    {
      step: "8. Casca",
      title: "Casca Acinzentada",
      bullets: [
        "Geralmente acinzentada e um pouco áspera.",
        "Não se desprende facilmente em placas.",
      ],
      image: "/images/faveiro/faveiro-tronco.jpg",
      imageAlt: "Detalhe da casca acinzentada e áspera do tronco do Faveiro-de-Wilson",
    },
  ],
  photoCredit:
    "Fotos de campo: equipe BIOBERÇO. Fotos ilustrativas complementares: Livia Dias / iNaturalist (CC BY-NC).",
  footer: {
    line1: "BIOBERÇO • Projeto de Inovação FLL 2026",
    line2: "Desenvolvido pela Equipe Bee Lego — Escola SESI Sete Lagoas / MG",
    support:
      "Apoio técnico e conservação: PAN Faveiros • Fundação Zoobotânica de BH • Embrapa Cerrados",
  },
} as const;
