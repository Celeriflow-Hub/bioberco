import Image from "next/image";
import { projectContent } from "@/content/project";

export function IdentificationGuide() {
  return (
    <section
      id="guia"
      className="mx-auto w-full max-w-6xl scroll-mt-4 px-4 pt-6"
      aria-labelledby="guia-titulo"
    >
      <p className="mx-auto w-fit rounded-full bg-emerald-100 px-4 py-1 text-xs font-bold tracking-wide text-emerald-800">
        GUIA PRÁTICO DE CAMPO
      </p>
      <h2
        id="guia-titulo"
        className="mt-2 text-center text-2xl font-bold text-emerald-950"
      >
        Como Reconhecer um {projectContent.speciesName}
      </h2>
      <p className="mt-1 text-center text-sm text-slate-600">
        Aprenda a reconhecer a árvore no campo pelas fotos reais de suas
        características principais:
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projectContent.guide.map((card) => (
          <article
            key={card.title}
            className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-emerald-100"
          >
            <div className="relative h-56 w-full bg-emerald-900">
              <Image
                src={card.image}
                alt={card.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
              <p className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-bold text-amber-300">
                {card.step}
              </p>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-emerald-950">{card.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{card.text}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-slate-500">
        {projectContent.photoCredit}
      </p>
    </section>
  );
}
