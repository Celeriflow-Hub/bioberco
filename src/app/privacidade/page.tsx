import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default function Privacidade() {
  return (
    <div className="flex min-h-screen flex-col bg-emerald-50">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-emerald-100">
          <h1 className="text-2xl font-bold text-emerald-950">
            Política de Privacidade — BIOBERÇO
          </h1>
          <div className="mt-3 space-y-3 text-sm text-slate-700">
            <p>
              <strong>Dados coletados:</strong> fotografia da árvore, latitude,
              longitude, precisão do GPS, endereço/ponto de referência, nome,
              telefone e e-mail.
            </p>
            <p>
              <strong>Finalidade:</strong> análise e validação de possíveis
              avistamentos de Faveiro-de-Wilson e contato com o observador.
            </p>
            <p>
              <strong>Acesso:</strong> apenas membros autorizados da equipe
              BIOBERÇO. Dados de contato e coordenadas exatas nunca são
              exibidos publicamente.
            </p>
            <p>
              <strong>Correção/exclusão:</strong> solicite pelo contato oficial
              do projeto informando o protocolo do registro.
            </p>
            <p>
              <strong>Retenção:</strong> mantidos enquanto necessários à
              pesquisa; política detalhada será publicada pela equipe.
            </p>
            <p>
              Não usamos trackers de publicidade. Não há mapa público com
              coordenadas precisas de espécie ameaçada.
            </p>
          </div>
          <Link
            href="/"
            className="mt-4 inline-block rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white"
          >
            Voltar ao início
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

