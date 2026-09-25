import { Leaf } from "lucide-react";
import { projectContent } from "@/content/project";

export function Header() {
  return (
    <header className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 text-white">
      <div className="mx-auto flex w-full max-w-4xl items-center gap-4 px-4 py-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-emerald-950">
          <Leaf size={28} aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide">
            {projectContent.challenge}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            {projectContent.name}
          </h1>
          <p className="text-sm text-emerald-100">
            {projectContent.team} • {projectContent.school}
          </p>
        </div>
      </div>
    </header>
  );
}
