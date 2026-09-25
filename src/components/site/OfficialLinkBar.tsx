"use client";

import { useState } from "react";
import { Check, Copy, QrCode } from "lucide-react";
import { projectContent } from "@/content/project";
import { QrCodeModal } from "./QrCodeModal";

export function OfficialLinkBar() {
  const [copied, setCopied] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const url = projectContent.officialUrl;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="bg-amber-400 text-emerald-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center">
        <p className="min-w-0 flex-1 truncate text-sm font-medium">
          <span className="font-bold">Link Oficial do Projeto: </span>
          {url}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-emerald-950 px-4 text-sm font-semibold text-white"
            aria-live="polite"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copiado!" : "Copiar Link"}
          </button>
          <button
            type="button"
            onClick={() => setQrOpen(true)}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border-2 border-emerald-950 px-4 text-sm font-semibold"
          >
            <QrCode size={16} />
            Ver QR Code
          </button>
        </div>
      </div>
      <QrCodeModal open={qrOpen} onClose={() => setQrOpen(false)} url={url} />
    </div>
  );
}

