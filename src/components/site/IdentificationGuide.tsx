import { ImageOff } from "lucide-react";
import { projectContent } from "@/content/project";

export function IdentificationGuide() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 pt-6" aria-labelledby="guia">
      <h2 id="guia" className="text-xl font-bold text-emerald-950">
        Como reconhecer o {projectContent.speciesName} no campo
      </h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {projectContent.guide.map((card) => (
          <article
            key={card.title}
            className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-emerald-100"
          >
            <div className="flex h-32 flex-col items-center justify-center gap-1 bg-emerald-50 text-emerald-700">
              <ImageOff size={28} aria-hidden />
              <p className="px-4 text-center text-xs font-semibold">
                {card.imageLabel}
              </p>
            </div>
            <div className="p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-600">
                {card.step}
              </p>
              <h3 className="mt-1 font-bold text-emerald-950">{card.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{card.text}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Fotos oficiais da espécie entram em{" "}
        <code>public/images/faveiro/</code>. Nenhuma imagem genérica é usada
        como substituta.
      </p>
    </section>
  );
}
