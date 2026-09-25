"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Camera,
  CheckCircle2,
  Loader2,
  LocateFixed,
  RefreshCw,
  Send,
} from "lucide-react";

type GpsState =
  | "idle"
  | "loading"
  | "ok"
  | "denied"
  | "unavailable"
  | "timeout"
  | "manual";

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

function maskPhone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

async function optimizeImage(file: File): Promise<File> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
    return file;
  if (file.size <= 1.5 * 1024 * 1024) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const MAX = 1920;
    const scale = Math.min(1, MAX / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    if (typeof bitmap.close === "function") bitmap.close();
    const blob = await new Promise<Blob | null>((res) =>
      canvas.toBlob(res, "image/jpeg", 0.85),
    );
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", {
      type: "image/jpeg",
    });
  } catch {
    return file;
  }
}

export function SightingForm() {
  const fileRef = useRef<HTMLInputElement>(null);
  const honeyRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [photoProcessing, setPhotoProcessing] = useState(false);

  const [gps, setGps] = useState<GpsState>("idle");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);

  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [protocol, setProtocol] = useState<string | null>(null);

  async function onPhoto(file: File | undefined) {
    setPhotoError(null);
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setPhotoError("Envie uma imagem JPG, PNG, WEBP ou HEIC.");
      return;
    }
    if (file.size <= 0 || file.size > 12 * 1024 * 1024) {
      setPhotoError("Imagem deve ter até 12 MB.");
      return;
    }
    setPhotoProcessing(true);
    try {
      const optimized = await optimizeImage(file);
      setPhoto(optimized);
      setPreview(URL.createObjectURL(optimized));
    } finally {
      setPhotoProcessing(false);
    }
  }

  function captureGps() {
    setGps("loading");
    setGpsError(null);
    if (!("geolocation" in navigator)) {
      setGps("unavailable");
      setGpsError("GPS indisponível neste aparelho. Preencha manualmente.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(String(pos.coords.latitude));
        setLng(String(pos.coords.longitude));
        setAccuracy(pos.coords.accuracy ?? null);
        setGps("ok");
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setGps("denied");
          setGpsError("Permissão negada. Preencha latitude/longitude manualmente ou tente de novo.");
        } else if (err.code === err.TIMEOUT) {
          setGps("timeout");
          setGpsError("Tempo esgotado. Tente novamente ou preencha manualmente.");
        } else {
          setGps("unavailable");
          setGpsError("Não foi possível obter a localização. Preencha manualmente.");
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!photo) e.photo = "Foto é obrigatória.";
    const la = Number(lat);
    const lo = Number(lng);
    if (!lat || Number.isNaN(la) || la < -90 || la > 90)
      e.lat = "Latitude inválida (-90 a 90).";
    if (!lng || Number.isNaN(lo) || lo < -180 || lo > 180)
      e.lng = "Longitude inválida (-180 a 180).";
    if (address.trim().length < 5) e.address = "Descreva o ponto de referência.";
    if (name.trim().length < 3) e.name = "Informe seu nome completo.";
    if (phone.replace(/\D/g, "").length < 10)
      e.phone = "Informe um telefone válido com DDD.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "Informe um e-mail válido.";
    if (!consent) e.consent = "É necessário aceitar o uso dos dados.";
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setSubmitError(null);
    if (!validate() || !photo) return;
    setSending(true);
    try {
      const fd = new FormData();
      fd.append("photo", photo);
      fd.append("website", honeyRef.current?.value ?? "");
      fd.append("latitude", String(Number(lat)));
      fd.append("longitude", String(Number(lng)));
      if (accuracy != null) fd.append("accuracyMeters", String(accuracy));
      fd.append("addressReference", address.trim());
      fd.append("observerName", name.trim());
      fd.append("observerPhone", phone.trim());
      fd.append("observerEmail", email.trim());
      fd.append("consent", "true");
      const res = await fetch("/api/sightings", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubmitError(data.error ?? "Falha ao enviar. Tente novamente.");
        return;
      }
      setProtocol(data.protocol);
    } catch {
      setSubmitError("Sem conexão. Verifique a internet e tente de novo.");
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setPhoto(null);
    setPreview(null);
    setLat("");
    setLng("");
    setAccuracy(null);
    setGps("idle");
    setAddress("");
    setName("");
    setPhone("");
    setEmail("");
    setConsent(false);
    setProtocol(null);
    setFieldErrors({});
    if (honeyRef.current) honeyRef.current.value = "";
  }

  if (protocol) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6">
        <div className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-emerald-100">
          <CheckCircle2 size={48} className="mx-auto text-emerald-600" />
          <h2 className="mt-2 text-xl font-bold text-emerald-950">
            Registro enviado com sucesso!
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Registro recebido pela equipe BIOBERÇO e aguardando validação.
          </p>
          <p className="mx-auto mt-4 w-fit rounded-2xl bg-emerald-50 px-6 py-3 text-2xl font-bold tracking-wide text-emerald-900 ring-1 ring-emerald-200">
            {protocol}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Guarde este protocolo. Sem banco configurado, o registro é
            provisório e será persistido na Fase 3 (Neon + Blob).
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-6 font-semibold text-white"
          >
            Registrar Outra Árvore
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6" aria-labelledby="registrar">
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-emerald-100">
        <h2 id="registrar" className="text-xl font-bold text-emerald-950">
          Viu uma árvore com essas características? Registre aqui!
        </h2>
        <p className="text-sm text-slate-600">
          Preencha os dados abaixo para que os pesquisadores possam validar o
          achado.
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-4 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="font-bold text-emerald-900">1. Foto da árvore *</h3>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => onPhoto(e.target.files?.[0])}
            />
            {!preview ? (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="mt-2 flex min-h-24 w-full flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 p-4 text-emerald-800"
              >
                <Camera size={28} />
                <span className="text-sm font-semibold">
                  Tirar foto ou escolher da galeria
                </span>
              </button>
            ) : (
              <div className="mt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Prévia da árvore fotografada"
                  className="max-h-64 w-full rounded-2xl object-cover"
                />
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="min-h-11 flex-1 rounded-xl border border-emerald-200 px-4 text-sm font-semibold text-emerald-800"
                  >
                    Trocar foto
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPhoto(null);
                      setPreview(null);
                    }}
                    className="min-h-11 rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-700"
                  >
                    Remover
                  </button>
                </div>
              </div>
            )}
            {photoProcessing && (
              <p className="mt-1 text-sm text-emerald-700">
                Otimizando imagem para envio...
              </p>
            )}
            {photoError && <p className="mt-1 text-sm text-red-600">{photoError}</p>}
            {fieldErrors.photo && <p className="mt-1 text-sm text-red-600">{fieldErrors.photo}</p>}
            {photo && (
              <p className="mt-1 text-xs text-emerald-700">
                Foto pronta: {photo.name} ({Math.round(photo.size / 1024)} KB)
              </p>
            )}
          </div>

          <div>
            <h3 className="font-bold text-emerald-900">2. Localização da árvore *</h3>
            <button
              type="button"
              onClick={captureGps}
              disabled={gps === "loading"}
              className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white disabled:opacity-60"
            >
              {gps === "loading" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <LocateFixed size={16} />
              )}
              {gps === "loading" ? "Buscando localização..." : "Pegar Minha Localização Atual"}
            </button>
            {gps !== "idle" && gps !== "loading" && (
              <button
                type="button"
                onClick={captureGps}
                className="ml-2 inline-flex min-h-11 items-center gap-1 rounded-xl border border-emerald-200 px-3 text-sm font-semibold text-emerald-800"
              >
                <RefreshCw size={14} /> Tentar de novo
              </button>
            )}
            {gps === "ok" && accuracy != null && (
              <p className="mt-1 text-xs text-emerald-700">
                Precisão aproximada: {Math.round(accuracy)} m
              </p>
            )}
            {gpsError && <p className="mt-1 text-sm text-amber-700">{gpsError}</p>}
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <div>
                <label htmlFor="lat" className="text-sm font-semibold text-slate-700">
                  Latitude *
                </label>
                <input
                  id="lat"
                  inputMode="decimal"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  placeholder="-19.81..."
                  className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 px-3"
                />
                {fieldErrors.lat && <p className="text-sm text-red-600">{fieldErrors.lat}</p>}
              </div>
              <div>
                <label htmlFor="lng" className="text-sm font-semibold text-slate-700">
                  Longitude *
                </label>
                <input
                  id="lng"
                  inputMode="decimal"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  placeholder="-44.24..."
                  className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 px-3"
                />
                {fieldErrors.lng && <p className="text-sm text-red-600">{fieldErrors.lng}</p>}
              </div>
            </div>
            <div className="mt-2">
              <label htmlFor="address" className="text-sm font-semibold text-slate-700">
                Endereço / ponto de referência *
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                placeholder="Próximo à cerca da Fazenda X, perto do km 15 da rodovia, Sete Lagoas/MG..."
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              {fieldErrors.address && <p className="text-sm text-red-600">{fieldErrors.address}</p>}
            </div>
          </div>
          </div>

          <div>
            <h3 className="font-bold text-emerald-900">3. Seus dados para contato</h3>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                  Nome completo *
                </label>
                <input
                  id="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 px-3"
                />
                {fieldErrors.name && <p className="text-sm text-red-600">{fieldErrors.name}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                  Telefone/WhatsApp *
                </label>
                <input
                  id="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(maskPhone(e.target.value))}
                  placeholder="(31) 99999-9999"
                  className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 px-3"
                />
                {fieldErrors.phone && <p className="text-sm text-red-600">{fieldErrors.phone}</p>}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                  E-mail *
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 px-3"
                />
                {fieldErrors.email && <p className="text-sm text-red-600">{fieldErrors.email}</p>}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
            <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-5 w-5 accent-emerald-700"
              />
              <span>
                Autorizo o uso destes dados pela equipe do projeto BIOBERÇO
                para análise, validação e contato relacionado a este registro,
                conforme a{" "}
                <Link href="/privacidade" className="font-semibold text-emerald-800 underline">
                  Política de Privacidade
                </Link>
                . *
              </span>
            </label>
            {fieldErrors.consent && <p className="mt-1 text-sm text-red-600">{fieldErrors.consent}</p>}
          </div>

          {submitError && (
            <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-200">
              {submitError}
            </p>
          )}

          <input
            ref={honeyRef}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <button
            type="submit"
            disabled={sending || photoProcessing}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 font-bold text-white disabled:opacity-60"
          >
            {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            {sending ? "Enviando..." : "Enviar Registro"}
          </button>
        </form>
      </div>
    </section>
  );
}

