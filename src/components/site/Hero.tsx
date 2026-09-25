import { TreeDeciduous } from "lucide-react";
import { projectContent } from "@/content/project";

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 pt-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-emerald-100">
        <p className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700 ring-1 ring-red-200">
          {projectContent.hero.badge}
        </p>
        <h2 className="mt-3 text-2xl font-bold text-emerald-950">
          {projectContent.hero.title}
        </h2>
        <p className="mt-2 text-slate-600">{projectContent.hero.description}</p>
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-white">
            <TreeDeciduous size={24} aria-hidden />
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-900">
              {projectContent.initialMappedTrees}
            </p>
            <p className="text-sm text-slate-600">
              árvores mapeadas em Minas Gerais
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
