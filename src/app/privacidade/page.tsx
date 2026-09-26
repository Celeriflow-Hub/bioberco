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
          <div className="mt-3 space-y-4 text-sm text-slate-700">
            <section>
              <h2 className="font-bold text-emerald-950">Dados coletados</h2>
              <p className="mt-1">
                Para registrar um possível avistamento do Faveiro-de-Wilson, o
                aplicativo pode coletar: fotografia da árvore, latitude e
                longitude, precisão do GPS, endereço ou ponto de referência,
                além de nome, telefone e e-mail do observador.
              </p>
            </section>
            <section>
              <h2 className="font-bold text-emerald-950">Finalidade</h2>
              <p className="mt-1">
                As informações são utilizadas exclusivamente para analisar e
                validar possíveis avistamentos, apoiar pesquisas sobre a
                espécie e, quando necessário, entrar em contato com o
                observador para obter informações complementares.
              </p>
            </section>
            <section>
              <h2 className="font-bold text-emerald-950">Acesso aos dados</h2>
              <p className="mt-1">
                Os registros são acessados somente por membros autorizados da
                equipe BIOBERÇO. Dados pessoais e coordenadas exatas das
                árvores não são disponibilizados publicamente, contribuindo
                para a proteção da espécie.
              </p>
            </section>
            <section>
              <h2 className="font-bold text-emerald-950">
                Correção ou exclusão
              </h2>
              <p className="mt-1">
                O observador pode solicitar a correção ou exclusão de seus
                dados por meio do contato oficial do projeto, informando o
                protocolo do registro.
              </p>
            </section>
            <section>
              <h2 className="font-bold text-emerald-950">Retenção dos dados</h2>
              <p className="mt-1">
                Os dados serão mantidos pelo período necessário para as
                finalidades de pesquisa, monitoramento e conservação do
                Faveiro-de-Wilson. Informações detalhadas sobre o período de
                retenção serão disponibilizadas pela equipe responsável pelo
                projeto.
              </p>
            </section>
            <section>
              <h2 className="font-bold text-emerald-950">
                Segurança e privacidade
              </h2>
              <p className="mt-1">
                O aplicativo não utiliza rastreadores para fins publicitários.
                Também não disponibiliza um mapa público com coordenadas
                precisas dos indivíduos registrados, evitando a exposição de
                informações que possam colocar a espécie em risco.
              </p>
            </section>
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

