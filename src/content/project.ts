export const projectContent = {
  name: "BIOBERÇO",
  team: "Equipe Bee Lego",
  school: "SESI Sete Lagoas/MG",
  challenge: "FLL Innovation Challenge",
  speciesName: "Faveiro-de-Wilson",
  initialMappedTrees: 240,
  officialUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://bioberco-beelego.vercel.app",
  externalForwardingEnabled: false,
  hero: {
    badge: "Espécie Ameaçada de Extinção",
    title: "Ajude a encontrar o Faveiro-de-Wilson!",
    description:
      "Existem pouquíssimas árvores desta espécie na natureza! O projeto BIOBERÇO foi criado para que você possa identificar e registrar a localização de árvores na região de Sete Lagoas e Minas Gerais.",
  },
  guide: [
    {
      step: "1. Porte na pastagem",
      title: "Árvore Alta e Frondosa",
      text: "Árvore de grande porte (até 15m), muito visível em pastagens e áreas abertas com copa em formato de guarda-chuva.",
      imageLabel: "Imagem em atualização",
    },
    {
      step: "2. Vagens / Favas",
      title: "Vagens Verdes ou Marrons",
      text: "Frutos compridos em forma de fava (15 a 25 cm) pendurados em cachos nas pontas dos galhos altos.",
      imageLabel: "Imagem em atualização",
    },
    {
      step: "3. Rara no Cerrado",
      title: "Folhas Delicadas",
      text: "Folhas divididas em pequenas folhinhas verdes finas que lembram a folha da samambaia ou da mimosa.",
      imageLabel: "Imagem em atualização",
    },
  ],
  footer: {
    line1: "BIOBERÇO • Projeto de Inovação FLL 2026",
    line2: "Desenvolvido pela Equipe Bee Lego — Escola SESI Sete Lagoas / MG",
    support:
      "Apoio técnico e conservação: PAN Faveiros • Fundação Zoobotânica de BH • Embrapa Cerrados",
  },
} as const;
