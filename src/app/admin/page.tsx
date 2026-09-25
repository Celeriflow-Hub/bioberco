"use client";

import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

interface Sighting {
  id: string;
  protocol: string;
  photoUrl: string;
  latitude: number;
  longitude: number;
  accuracyMeters: number | null;
  addressReference: string;
  observerName: string;
  observerPhone: string;
  observerEmail: string;
  status: string;
  internalNotes: string | null;
  createdAt: string;
}

const STATUSES = [
  "PENDING_VALIDATION",
  "VALIDATED",
  "REJECTED",
  "NEEDS_INFORMATION",
];

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState<Sighting[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Sighting | null>(null);
  const [notes, setNotes] = useState("");

  async function load(t: string) {
    setError(null);
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status) params.set("status", status);
    const res = await fetch(`/api/admin/sightings?${params}`, {
      headers: { "x-admin-token": t },
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      setError(data.error ?? "Falha ao carregar.");
      return;
    }
    setItems(data.sightings);
    setAuthed(true);
  }

  async function saveStatus(s: Sighting, newStatus: string) {
    const res = await fetch("/api/admin/sightings/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify({
        id: s.id,
        status: newStatus,
        internalNotes: notes || null,
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      setError(data.error ?? "Falha ao salvar.");
      return;
    }
    setSelected({ ...s, status: newStatus, internalNotes: notes || null });
    load(token);
  }

  return (
    <div className="flex min-h-screen flex-col bg-emerald-50">
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-emerald-100">
          <h1 className="text-xl font-bold text-emerald-950">
            Administração — BIOBERÇO
          </h1>
          {!authed ? (
            <form
              className="mt-3 flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                load(token);
              }}
            >
              <label htmlFor="adm-token" className="text-sm font-semibold">
                Token de acesso
              </label>
              <input
                id="adm-token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="min-h-11 rounded-xl border border-slate-200 px-3"
                autoComplete="off"
              />
              <button
                type="submit"
                className="min-h-11 rounded-xl bg-emerald-700 px-4 font-semibold text-white"
              >
                Entrar
              </button>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </form>
          ) : (
            <>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar protocolo, nome, e-mail"
                  className="min-h-11 flex-1 rounded-xl border border-slate-200 px-3"
                />
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="min-h-11 rounded-xl border border-slate-200 px-3"
                  aria-label="Filtrar por status"
                >
                  <option value="">Todos</option>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => load(token)}
                  className="min-h-11 rounded-xl bg-emerald-700 px-4 font-semibold text-white"
                >
                  Buscar
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              <ul className="mt-3 divide-y divide-slate-100">
                {items.map((s) => (
                  <li key={s.id} className="py-3">
                    <button
                      type="button"
                      className="w-full text-left"
                      onClick={() => {
                        setSelected(s);
                        setNotes(s.internalNotes ?? "");
                      }}
                    >
                      <span className="font-bold text-emerald-900">
                        {s.protocol}
                      </span>{" "}
                      <span className="text-xs text-slate-500">{s.status}</span>
                      <br />
                      <span className="text-sm text-slate-600">
                        {s.observerName} •{" "}
                        {new Date(s.createdAt).toLocaleString("pt-BR")}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              {selected && (
                <div className="mt-4 rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                  <h2 className="font-bold">{selected.protocol}</h2>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selected.photoUrl}
                    alt="Foto do avistamento"
                    className="mt-2 max-h-72 w-full rounded-xl object-cover"
                  />
                  <p className="mt-2 text-sm">
                    {selected.latitude}, {selected.longitude}
                    {selected.accuracyMeters != null &&
                      ` (±${selected.accuracyMeters} m)`}
                  </p>
                  <p className="text-sm">{selected.addressReference}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {selected.observerName} • {selected.observerPhone} •{" "}
                    {selected.observerEmail}
                  </p>
                  <label className="mt-2 block text-sm font-semibold">
                    Observações internas
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
                    />
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {STATUSES.map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => saveStatus(selected, st)}
                        className="min-h-11 rounded-xl border border-emerald-300 px-3 text-xs font-bold text-emerald-900"
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
