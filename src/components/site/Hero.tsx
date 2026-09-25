"use client";

import { useState } from "react";
import { Camera, Eye, QrCode, TreeDeciduous } from "lucide-react";
import { projectContent } from "@/content/project";
import { QrCodeModal } from "./QrCodeModal";

export function Hero() {
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <section className="bg-gradient-to-br from-emerald-800 via-emerald-800 to-emerald-900 text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 text-center">
        <p className="mx-auto w-fit rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-amber-300 ring-1 ring-white/20">
          {projectContent.hero.badge}
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
          {projectContent.hero.titleA}
          <br />
          <span className="text-amber-400">
            {projectContent.hero.titleB}
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-emerald-100 sm:text-base">
          {projectContent.hero.description}
        </p>
        <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <a
            href="#guia"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-amber-400 px-5 text-sm font-bold text-emerald-950"
          >
            <Eye size={16} />
            Como Identificar
          </a>
          <a
            href="#registrar"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-emerald-900"
          >
            <Camera size={16} />
            Registrar Árvore
          </a>
          <button
            type="button"
            onClick={() => setQrOpen(true)}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl px-5 text-sm font-bold text-white ring-1 ring-white/40"
          >
            <QrCode size={16} />
            QR Code do Site
          </button>
        </div>
        <div className="mx-auto mt-6 flex w-fit items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 text-left ring-1 ring-white/20">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400 text-emerald-950">
            <TreeDeciduous size={24} aria-hidden />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {projectContent.initialMappedTrees}
            </p>
            <p className="text-xs text-emerald-100">
              árvores mapeadas em Minas Gerais
            </p>
          </div>
        </div>
      </div>
      <QrCodeModal
        open={qrOpen}
        onClose={() => setQrOpen(false)}
        url={projectContent.officialUrl}
      />
    </section>
  );
}
