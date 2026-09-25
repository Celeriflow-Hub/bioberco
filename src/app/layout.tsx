import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BIOBERÇO | Ajude a encontrar o Faveiro-de-Wilson",
  description:
    "Projeto BIOBERÇO da Equipe Bee Lego — SESI Sete Lagoas/MG. Aprenda a reconhecer o Faveiro-de-Wilson e registre avistamentos com foto e localização.",
  openGraph: {
    title: "BIOBERÇO | Ajude a encontrar o Faveiro-de-Wilson",
    description:
      "Identifique e registre árvores de Faveiro-de-Wilson na região de Sete Lagoas e Minas Gerais.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${lexend.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
