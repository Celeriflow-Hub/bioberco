import Link from "next/link";
import { projectContent } from "@/content/project";

export function Footer() {
  return (
    <footer className="bg-emerald-950 py-8 text-center text-emerald-100">
      <p className="font-bold text-white">{projectContent.footer.line1}</p>
      <p className="mt-1 text-sm">{projectContent.footer.line2}</p>
      <p className="mx-auto mt-2 max-w-2xl px-4 text-xs text-emerald-200">
        {projectContent.footer.support}
      </p>
      <Link href="/privacidade" className="mt-3 inline-block text-sm font-semibold text-amber-300 underline">
        Política de Privacidade
      </Link>
    </footer>
  );
}
