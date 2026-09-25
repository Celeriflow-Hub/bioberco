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
      "Existem apenas cerca de 246 árvores desta espécie no mundo. Com este aplicativo criado pela equipe Bee Lego (SESI), você aprende a reconhecer a árvore e ajuda os cientistas a cuidarem dela.",
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
  ],
  photoCredit:
    "Fotos ilustrativas: Livia Dias / iNaturalist (CC BY-NC). Serão substituídas por fotos oficiais da equipe.",
  footer: {
    line1: "BIOBERÇO • Projeto de Inovação FLL 2026",
    line2: "Desenvolvido pela Equipe Bee Lego — Escola SESI Sete Lagoas / MG",
    support:
      "Apoio técnico e conservação: PAN Faveiros • Fundação Zoobotânica de BH • Embrapa Cerrados",
  },
} as const;
