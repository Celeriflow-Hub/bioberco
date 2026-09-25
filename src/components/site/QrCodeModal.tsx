"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export function QrCodeModal({
  open,
  onClose,
  url,
}: {
  open: boolean;
  onClose: () => void;
  url: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="QR Code do BIOBERÇO"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl bg-white p-6 text-center text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-emerald-900">
          QR Code do BIOBERÇO
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Aponte a câmera do celular para abrir o site oficial.
        </p>
        <div className="mx-auto mt-4 w-fit rounded-2xl border border-emerald-100 bg-white p-3">
          <QRCodeSVG value={url} size={200} aria-label={`QR Code para ${url}`} />
        </div>
        <p className="mt-3 break-all text-xs text-slate-500">{url}</p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 font-semibold text-white"
        >
          <X size={16} />
          Fechar
        </button>
      </div>
    </div>
  );
}
