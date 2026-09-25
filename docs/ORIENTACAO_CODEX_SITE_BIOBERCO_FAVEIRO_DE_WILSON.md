# ORIENTAÇÃO PARA O CODEX — SITE BIOBERÇO / FAVEIRO-DE-WILSON

## 1. Objetivo deste trabalho

Criar a versão **real, funcional e pronta para publicação** do site do projeto **BIOBERÇO**, da **Equipe Bee Lego — SESI Sete Lagoas/MG**, tomando como referência o site provisório já desenhado e o código HTML/JavaScript existente.

O resultado **não deve ser apenas uma réplica estática do HTML atual**. O site precisa manter a identidade visual, textos, fluxo e simplicidade do protótipo, mas substituir todas as partes simuladas por implementação real, com persistência de dados, upload de imagem, captura de localização, protocolo gerado no servidor, tratamento de erros, privacidade e boa experiência em celular.

O foco principal do site é:

1. explicar rapidamente o projeto BIOBERÇO;
2. ajudar uma pessoa a reconhecer o Faveiro-de-Wilson;
3. permitir registrar um possível avistamento no campo;
4. armazenar de forma segura fotografia, localização e dados de contato;
5. gerar um protocolo real para cada registro;
6. permitir posterior validação dos registros pela equipe do projeto.

O site deve parecer um produto concluído e confiável, não uma demonstração técnica.

---

# 2. O que existe no site provisório e deve ser preservado

## 2.1 Identidade geral

O protótipo utiliza:

- nome principal: **BIOBERÇO**;
- subtítulo institucional: **Equipe Bee Lego • SESI Sete Lagoas/MG**;
- selo/texto: **FLL Innovation Challenge**;
- identidade ligada à preservação ambiental;
- fonte principal: **Lexend**;
- paleta com verde-esmeralda como cor institucional principal e amarelo/âmbar como destaque;
- cartões brancos, cantos bem arredondados e sombras discretas;
- linguagem simples, amigável e adequada a uso por público não técnico.

Manter essa linha visual.

### Paleta de referência

Não é obrigatório reproduzir literalmente cada classe Tailwind do HTML provisório, mas o resultado deve permanecer visualmente próximo:

- verde muito escuro: `emerald-950`;
- verde escuro: `emerald-900` / `emerald-800`;
- verde principal: `emerald-700` / `emerald-600`;
- fundo claro: `emerald-50`;
- destaque amarelo: `amber-400` / `amber-500`;
- textos neutros: `slate-600`, `slate-700`, `slate-800`;
- cartões: branco;
- bordas: verdes ou âmbar em tons claros.

Usar variáveis CSS/tokens no projeto para que essas cores possam ser alteradas depois sem refatorar os componentes.

---

# 3. Estrutura visual da página pública

A página inicial deve continuar sendo uma página única, simples e muito adequada a celular.

## 3.1 Cabeçalho institucional

Criar cabeçalho com fundo em gradiente verde escuro contendo:

- símbolo/identidade da Equipe Bee Lego;
- selo `FLL Innovation Challenge`;
- título `BIOBERÇO`;
- texto `Equipe Bee Lego • SESI Sete Lagoas/MG`;
- logo SESI em área própria à direita no desktop e adequadamente reorganizada no celular.

### Regra importante sobre logos

Não depender de imagem carregada diretamente de Wikimedia ou outro site externo em produção.

Colocar as logos oficiais fornecidas pela equipe em `/public/logos` e usar os arquivos locais. Não deformar, recortar ou alterar cores das logos institucionais sem que isso esteja previsto na própria arte.

Se a logo da equipe ainda não estiver disponível, usar temporariamente o símbolo da abelha de forma discreta, mas estruturar o componente para receber a logo oficial depois.

---

## 3.2 Barra do link oficial

O protótipo possui uma faixa amarela logo abaixo do cabeçalho com:

- texto `Link Oficial do Projeto:`;
- endereço do site;
- botão `Copiar Link`;
- botão `Ver QR Code`.

Preservar essa funcionalidade.

### Alteração obrigatória em relação ao protótipo

No site atual o modal permite que qualquer visitante altere o endereço usado para o QR Code. Isso é comportamento de ferramenta de desenvolvimento e **não deve existir na versão pública**.

Usar uma única origem de verdade:

```env
NEXT_PUBLIC_SITE_URL=https://bioberco-beelego.vercel.app
```

ou o domínio definitivo que for configurado depois.

O endereço mostrado na barra, copiado pelo botão e codificado no QR Code deve sempre vir dessa configuração.

O QR Code deve ser gerado dinamicamente, mas o usuário comum não poderá editar sua URL.

---

# 4. Banner introdutório / Hero

Preservar a ideia do cartão introdutório já existente.

Conteúdo principal:

- selo: `Espécie Ameaçada de Extinção`;
- chamada: `Ajude a encontrar o Faveiro-de-Wilson!`;
- explicação breve do BIOBERÇO;
- destaque numérico atualmente apresentado como `240` árvores mapeadas em Minas Gerais.

Texto-base atual:

> Existem pouquíssimas árvores desta espécie na natureza! O projeto BIOBERÇO foi criado para que você possa identificar e registrar a localização de árvores na região de Sete Lagoas e Minas Gerais.

### Regra para o número 240

Não deixar o número `240` espalhado ou hardcoded em componentes.

Criar uma configuração central, por exemplo:

```ts
projectStats.initialMappedTrees = 240
```

ou buscar esse valor de uma tabela/configuração no banco.

Esse número pertence ao conteúdo atual do projeto, mas deve ser facilmente alterável caso a equipe atualize a informação.

Se futuramente houver uma contagem dos próprios registros validados pelo BIOBERÇO, não confundir automaticamente essa quantidade com o dado histórico de `árvores mapeadas em Minas Gerais`.

---

# 5. Guia visual de identificação

Manter a seção:

**Como reconhecer o Faveiro-de-Wilson no campo**

Ela possui três cartões.

## Cartão 1 — Porte na pastagem

Título:

**Árvore Alta e Frondosa**

Texto atual:

> Árvore de grande porte (até 15m), muito visível em pastagens e áreas abertas com copa em formato de guarda-chuva.

Imagem prevista:

`faveiro-porte.jpg`

---

## Cartão 2 — Vagens / Favas

Título:

**Vagens Verdes ou Marrons**

Texto atual:

> Frutos compridos em forma de fava (15 a 25 cm) pendurados em cachos nas pontas dos galhos altos.

Imagem prevista:

`faveiro-vagens.jpg`

---

## Cartão 3 — Folhagem

Etiqueta atual:

`3. Rara no Cerrado`

Título:

**Folhas Delicadas**

Texto atual:

> Folhas divididas em pequenas folhinhas verdes finas que lembram a folha da samambaia ou da mimosa.

Imagem prevista:

`faveiro-preservacao.jpg`

### Regra essencial para as fotografias

O protótipo atual usa imagens genéricas do Unsplash quando uma imagem local não existe. Isso é aceitável somente em um rascunho, mas **não pode ocorrer em produção**, pois uma imagem genérica de outra árvore pode induzir a identificação incorreta da espécie.

Portanto:

- priorizar fotos reais fornecidas pela equipe;
- guardar em `/public/images/faveiro/`;
- se a foto oficial ainda não estiver disponível, exibir um placeholder neutro com texto `Imagem em atualização`;
- nunca substituir silenciosamente por fotografia botânica genérica;
- escrever `alt` descritivo em todas as imagens.

Os textos biológicos atuais devem ficar centralizados em um arquivo de conteúdo, por exemplo `src/content/project.ts`, e não espalhados pelo JSX.

Isso permitirá revisão científica posterior sem alterar componentes.

---

# 6. Formulário de registro de avistamento

Esta é a parte mais importante do sistema.

Manter a chamada:

**Viu uma árvore com essas características? Registre aqui!**

E a explicação:

`Preencha os dados abaixo para que os pesquisadores possam validar o achado.`

O formulário deve ser realmente funcional.

---

## 6.1 Etapa 1 — Foto da árvore

Campo obrigatório.

Permitir:

- abrir câmera traseira no celular quando possível;
- selecionar imagem já existente;
- visualizar a imagem antes do envio;
- trocar/remover a imagem antes de enviar.

Sugestão de HTML-base:

```html
<input type="file" accept="image/*" capture="environment">
```

### Validações

Fazer validação tanto no cliente quanto no servidor:

- arquivo deve ser uma imagem aceita;
- rejeitar arquivos vazios ou inválidos;
- limitar tamanho de upload;
- comprimir/redimensionar a imagem no cliente quando necessário para melhorar o uso em internet móvel;
- preservar qualidade suficiente para identificação da planta;
- evitar depender de uploads enormes em uma única requisição.

Preferir conversão/normalização para JPEG ou WebP quando isso melhorar a compatibilidade entre celulares.

### Armazenamento

Usar **Vercel Blob** para armazenar as fotografias.

Guardar no banco apenas:

- URL/chave da imagem;
- metadados necessários;
- vínculo com o registro.

Não salvar base64 da fotografia no PostgreSQL.

---

# 7. Etapa 2 — Localização da árvore

O protótipo já utiliza `navigator.geolocation`. Manter esse fluxo, mas implementá-lo corretamente.

O botão deve continuar com intenção equivalente a:

**Pegar Minha Localização Atual**

Quando o usuário clicar:

1. mostrar estado `Buscando localização...`;
2. solicitar permissão do navegador;
3. capturar latitude;
4. capturar longitude;
5. capturar também `accuracy`, quando disponível;
6. mostrar confirmação visual de sucesso.

Usar, quando adequado:

```ts
navigator.geolocation.getCurrentPosition(..., {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 0,
})
```

Não congelar a página enquanto aguarda.

## Problema existente que precisa ser corrigido

No protótipo, em caso de erro aparece a mensagem de que o usuário pode digitar a localização manualmente, porém o campo de coordenadas está como `readonly`.

Na nova versão, implementar fallback real.

Se a geolocalização não puder ser obtida:

- mostrar mensagem clara, sem `alert()` nativo;
- permitir digitar latitude e longitude manualmente **ou** continuar preenchendo um endereço/ponto de referência, conforme regra definida para validação do formulário;
- permitir tentar novamente.

### Dados a guardar

No banco:

- latitude;
- longitude;
- precisão em metros (`accuracyMeters`), se informada pelo dispositivo;
- endereço/ponto de referência digitado;
- data/hora da captura, se útil.

Não transformar coordenadas em uma única string no banco.

Usar colunas separadas para latitude e longitude.

---

# 8. Endereço / ponto de referência

Manter o campo de texto com exemplo semelhante a:

`Próximo à cerca da Fazenda X, perto do km 15 da rodovia, Sete Lagoas/MG...`

Esse campo deve aceitar contexto rural, porque nem sempre haverá rua/número/CEP.

Usar `textarea` e não impor modelo de endereço urbano.

---

# 9. Dados do observador

O protótipo solicita:

- nome completo;
- telefone/WhatsApp;
- e-mail.

Manter esses campos inicialmente.

Adicionar:

- máscara amigável de telefone sem prejudicar números válidos;
- validação de e-mail no cliente e no servidor;
- mensagens de erro abaixo de cada campo;
- `autocomplete` adequado.

Não usar `alert()` para erro de formulário.

---

# 10. LGPD e consentimento

Como o formulário coleta dados pessoais, localização precisa e fotografia, adicionar antes do envio um consentimento claro.

Exemplo de intenção do texto:

> Autorizo o uso destes dados pela equipe do projeto BIOBERÇO para análise, validação e contato relacionado a este registro, conforme a Política de Privacidade.

Criar rota/página simples:

`/privacidade`

Ela deve explicar pelo menos:

- quais dados são coletados;
- finalidade da coleta;
- quem terá acesso;
- que dados de contato não serão exibidos publicamente;
- forma de solicitar correção ou exclusão do registro;
- política de retenção, quando esta for definida pela equipe.

Não instalar trackers de publicidade ou analytics invasivos por padrão.

### Segurança adicional relacionada à espécie

Não criar mapa público exibindo automaticamente coordenadas precisas de todos os registros de uma espécie ameaçada.

Caso futuramente seja criado mapa público, somente exibir localização de forma generalizada ou registros previamente aprovados pela equipe.

---

# 11. Envio do formulário — substituir a simulação por fluxo real

O código atual apenas:

- impede o submit normal;
- gera número aleatório no navegador;
- mostra uma caixa de sucesso;
- limpa o formulário.

Isso deve ser removido.

A versão final deve executar o seguinte fluxo:

1. validar todos os dados no cliente;
2. desabilitar o botão enquanto envia;
3. exibir progresso/estado de envio;
4. fazer upload da fotografia;
5. enviar os dados ao backend;
6. validar novamente no servidor;
7. gravar tudo no banco;
8. gerar protocolo no servidor;
9. responder ao cliente somente depois de o registro ter sido efetivamente persistido;
10. exibir confirmação;
11. permitir iniciar um novo registro.

### Evitar duplicidade

O usuário pode tocar duas vezes no botão ou a conexão pode oscilar.

Impedir envio duplo e estruturar a operação para reduzir duplicidades em retries.

---

# 12. Protocolo

O protocolo deve ser gerado **no servidor**, nunca com `Math.random()` no navegador.

Manter formato visual parecido com:

`BIO-2026-XXXXXX`

Mas usar geração com garantia de unicidade.

Exemplos aceitáveis:

- UUID convertido para código curto;
- identificador criptograficamente aleatório com índice `UNIQUE`;
- sequência do banco combinada com o ano.

Exemplo visual:

`BIO-2026-004281`

O campo `protocol` deve possuir índice único no banco.

---

# 13. Confirmação de envio

Depois de sucesso real, substituir o formulário ou mostrar um card equivalente ao atual contendo:

- ícone de sucesso;
- título `Registro enviado com sucesso!`;
- número do protocolo;
- instrução de que a equipe fará a análise;
- botão `Registrar Outra Árvore`.

### Alteração obrigatória

O protótipo afirma:

`Encaminhado para: PAN Faveiros / Zoobotânica BH / Embrapa`

E também diz que o registro será enviado automaticamente a essas instituições.

**Não apresentar essa mensagem como fato enquanto esse envio não existir tecnicamente e não tiver sido autorizado/configurado.**

Enquanto não houver integração real, usar algo como:

`Registro recebido pela equipe BIOBERÇO e aguardando validação.`

Preparar a arquitetura para integração futura, mas nunca simular que houve encaminhamento externo.

---

# 14. Integrações futuras com instituições

Criar uma camada de serviço desacoplada para que, no futuro, seja possível encaminhar um registro validado por:

- API;
- webhook;
- e-mail institucional;
- exportação de arquivo.

Exemplo conceitual:

```ts
interface SightingForwarder {
  forward(sighting: ValidatedSighting): Promise<ForwardResult>
}
```

Não colocar lógica específica de PAN Faveiros, Fundação Zoobotânica ou Embrapa diretamente dentro do componente React.

Criar feature flag/configuração, por exemplo:

```env
ENABLE_EXTERNAL_FORWARDING=false
```

Somente quando a integração real estiver configurada, registrar:

- instituição;
- data/hora do envio;
- status;
- retorno/identificador externo;
- falha e possibilidade de reprocessamento.

---

# 15. Banco de dados

Usar **PostgreSQL no Neon** com **Prisma**.

## Modelo mínimo sugerido

```text
Sighting
- id: UUID
- protocol: string UNIQUE
- photoUrl: string
- photoStorageKey: string/null
- latitude: decimal
- longitude: decimal
- accuracyMeters: decimal/null
- addressReference: text
- observerName: string
- observerPhone: string
- observerEmail: string
- consentAcceptedAt: datetime
- status: enum
- internalNotes: text/null
- createdAt: datetime
- updatedAt: datetime
```

Enum sugerido:

```text
PENDING_VALIDATION
VALIDATED
REJECTED
NEEDS_INFORMATION
```

Se houver encaminhamento externo posteriormente, criar tabela separada `SightingForwarding`, em vez de adicionar dezenas de colunas ao registro principal.

---

# 16. Área administrativa mínima

Embora o protótipo público não apresente painel administrativo, um sistema que recebe registros reais precisa permitir consulta e validação pela equipe.

Criar uma área discreta em:

`/admin`

Ela não deve aparecer como item principal de navegação pública.

## Funcionalidades mínimas

- login restrito;
- lista de avistamentos;
- busca por protocolo, nome ou e-mail;
- filtros por status e data;
- visualização da fotografia;
- latitude/longitude;
- endereço/ponto de referência;
- dados de contato;
- precisão do GPS;
- data do registro;
- alteração de status;
- campo de observações internas.

Se já existir Firebase configurado para o projeto, pode usar **Firebase Authentication** apenas para os administradores.

Não permitir cadastro público de administradores.

Uma lista de e-mails autorizados deve ser validada no servidor.

---

# 17. Stack recomendada

Criar com:

- **Next.js** usando App Router;
- **TypeScript**;
- **React**;
- **Tailwind CSS** instalado no projeto;
- **Prisma**;
- **Neon PostgreSQL**;
- **Vercel Blob** para imagens;
- **Firebase Authentication**, somente se a área administrativa for implementada com a infraestrutura já disponível;
- biblioteca React apropriada para QR Code, instalada via npm;
- `next/font` para Lexend;
- ícones por pacote npm, por exemplo `lucide-react`.

## Não reproduzir estas dependências do HTML provisório

Evitar em produção:

- Tailwind via CDN;
- Font Awesome via CDN;
- QRCode.js via CDN;
- Google Font carregada manualmente por `@import` se `next/font` puder resolver;
- hotlink de logos;
- fallback para imagens aleatórias do Unsplash.

A aplicação deve funcionar a partir das dependências versionadas em `package.json`.

---

# 18. Estrutura sugerida de arquivos

Exemplo:

```text
src/
  app/
    page.tsx
    privacidade/
      page.tsx
    admin/
      page.tsx
      registros/
        [id]/page.tsx
    api/
      sightings/
        route.ts
      stats/
        route.ts
  components/
    site/
      Header.tsx
      OfficialLinkBar.tsx
      Hero.tsx
      IdentificationGuide.tsx
      SightingForm.tsx
      PhotoUpload.tsx
      LocationCapture.tsx
      ContactFields.tsx
      SubmissionSuccess.tsx
      QrCodeModal.tsx
      Footer.tsx
    admin/
      SightingsTable.tsx
      SightingDetails.tsx
  content/
    project.ts
  lib/
    db.ts
    storage.ts
    protocol.ts
    validation.ts
    auth.ts
    forwarding/
      types.ts
      index.ts
  styles/
    globals.css
prisma/
  schema.prisma
public/
  logos/
  images/
    faveiro/
```

Não é obrigatório seguir exatamente esses nomes, mas separar conteúdo, UI, persistência, armazenamento e integração.

---

# 19. API / Server Actions

Pode usar Route Handlers ou Server Actions, mas o fluxo precisa ser seguro e testável.

## Cadastro de avistamento

Entrada lógica:

```text
photo
latitude
longitude
accuracyMeters
addressReference
observerName
observerPhone
observerEmail
consent
```

Validação de servidor obrigatória.

Usar `zod` ou solução equivalente.

Não confiar em `required` do navegador como única proteção.

## Resposta de sucesso

Retornar somente informações necessárias ao cliente, por exemplo:

```json
{
  "success": true,
  "protocol": "BIO-2026-004281"
}
```

Não retornar dados administrativos ou segredos.

---

# 20. Estados de interface obrigatórios

Não deixar ações sem feedback.

Implementar estados para:

## Foto

- vazio;
- imagem selecionada;
- imagem inválida;
- processando/comprimindo;
- pronta.

## GPS

- aguardando;
- solicitando permissão;
- obtendo localização;
- localização capturada;
- permissão negada;
- indisponível;
- timeout;
- modo manual.

## Envio

- pronto para enviar;
- validando;
- enviando imagem;
- salvando registro;
- sucesso;
- erro recuperável.

Não apagar o formulário quando houver erro de rede.

O usuário deve conseguir tentar novamente sem preencher tudo do zero.

---

# 21. UX em celular

O uso principal pode ocorrer em campo.

Priorizar:

- mobile first;
- botões com área de toque confortável;
- textos legíveis sem zoom;
- formulário em coluna única em telas pequenas;
- câmera e GPS fáceis de usar;
- pouca dependência de animações pesadas;
- carregamento rápido em rede móvel;
- compressão de imagem;
- feedback claro durante upload.

No desktop, os grupos de campos podem usar duas ou três colunas como no protótipo.

Manter largura de leitura controlada, aproximadamente equivalente ao atual `max-w-4xl`.

---

# 22. Acessibilidade

Implementar desde o início:

- HTML semântico;
- `label` associado a cada campo;
- navegação por teclado;
- foco visível;
- modal de QR Code com foco controlado;
- `aria-label` quando necessário;
- contraste adequado;
- mensagens de erro ligadas aos campos;
- imagens com `alt`;
- botões não dependentes somente de cor ou ícone.

Evitar modal que o usuário não consiga fechar pelo teclado.

---

# 23. QR Code

Manter o modal de QR Code como no site provisório, mas com implementação de produção.

O QR deve apontar para:

`NEXT_PUBLIC_SITE_URL`

O modal deve conter:

- título `QR Code do BIOBERÇO`;
- explicação breve;
- QR Code;
- link oficial em texto;
- botão fechar.

Opcionalmente pode existir botão `Baixar QR Code`, desde que seja simples e confiável.

Não incluir campo público para alterar a URL.

---

# 24. Rodapé

Preservar a estrutura institucional:

**BIOBERÇO • Projeto de Inovação FLL 2026**

`Desenvolvido pela Equipe Bee Lego — Escola SESI Sete Lagoas / MG`

O texto atual também cita:

`Apoio técnico e conservação: PAN Faveiros • Fundação Zoobotânica de BH • Embrapa Cerrados`

Manter essa linha somente conforme a forma oficialmente aprovada pela equipe. Não transformar a citação em declaração de integração tecnológica.

Adicionar link para:

- Política de Privacidade.

Se necessário, adicionar contato oficial do projeto posteriormente.

---

# 25. Conteúdo que deve ser configurável

Criar arquivo central de conteúdo/configuração.

Exemplo:

```ts
export const projectContent = {
  name: 'BIOBERÇO',
  team: 'Equipe Bee Lego',
  school: 'SESI Sete Lagoas/MG',
  speciesName: 'Faveiro-de-Wilson',
  initialMappedTrees: 240,
  officialUrl: process.env.NEXT_PUBLIC_SITE_URL,
  externalForwardingEnabled: false,
}
```

Textos científicos e institucionais também devem estar concentrados nesse arquivo ou em estrutura equivalente.

Evitar dezenas de strings hardcoded em componentes diferentes.

---

# 26. Segurança

Aplicar medidas mínimas de produção:

- validação no servidor;
- sanitização de entradas textuais quando necessário;
- limite de tamanho e tipo de arquivo;
- não confiar em MIME enviado pelo cliente como única validação;
- impedir upload de arquivo executável;
- rate limiting ou proteção antispam se houver abuso;
- honeypot invisível pode ser usado contra bots simples;
- segredos somente em variáveis de ambiente do servidor;
- nunca expor token de Vercel Blob, banco ou Firebase Admin no cliente;
- rotas administrativas protegidas no servidor;
- não logar telefone/e-mail desnecessariamente em console de produção.

Se for necessário CAPTCHA posteriormente, preferir uma solução discreta e só introduzi-la quando houver necessidade real.

---

# 27. Privacidade dos dados e exibição pública

Por padrão:

- nome do observador não é público;
- telefone não é público;
- e-mail não é público;
- coordenadas exatas não são públicas;
- fotografia só é exibida publicamente se houver fluxo futuro de aprovação e autorização.

A área administrativa pode exibir esses dados aos membros autorizados.

---

# 28. SEO e compartilhamento

Configurar metadata do Next.js:

- título: `BIOBERÇO | Ajude a encontrar o Faveiro-de-Wilson`;
- descrição curta do projeto;
- Open Graph;
- favicon;
- imagem de compartilhamento quando a arte oficial estiver disponível;
- idioma `pt-BR`.

Não exagerar em SEO: o foco é acesso por QR Code, compartilhamento e uso em campo.

---

# 29. Comportamentos do protótipo que NÃO devem ser mantidos

Não repetir os seguintes pontos:

1. envio apenas simulado no navegador;
2. protocolo criado com `Math.random()`;
3. mensagem de encaminhamento para instituições sem integração real;
4. campo GPS `readonly` sem fallback manual;
5. `alert()` do navegador para erros e cópia de link;
6. URL do QR editável por qualquer visitante;
7. imagens aleatórias do Unsplash substituindo fotos da espécie;
8. Tailwind carregado por CDN;
9. QRCode.js por CDN;
10. Font Awesome por CDN;
11. logo institucional carregada por hotlink externo;
12. dados de formulário sem persistência real.

---

# 30. Melhorias de UX recomendadas em relação ao protótipo

Sem descaracterizar o desenho:

- mostrar contador de passos `1. Foto`, `2. Localização`, `3. Contato`;
- mostrar check visual após foto válida;
- mostrar precisão aproximada do GPS, por exemplo `Precisão aproximada: 12 m`;
- permitir nova tentativa de GPS;
- mensagens inline em vez de `alert()`;
- botão de envio com spinner;
- preservar campos em caso de erro de conexão;
- feedback de `Link copiado` usando toast discreto;
- confirmação final com protocolo bem visível e opção de copiar protocolo.

Evitar transformar a página em um sistema complexo ou em um dashboard. O acesso público precisa continuar muito simples.

---

# 31. Variáveis de ambiente previstas

Estruturar `.env.example` sem valores secretos.

Exemplo:

```env
NEXT_PUBLIC_SITE_URL=https://bioberco-beelego.vercel.app
DATABASE_URL=
BLOB_READ_WRITE_TOKEN=

# Somente se houver Firebase Admin/Admin login
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# Integração externa: manter desligada até existir fluxo real
ENABLE_EXTERNAL_FORWARDING=false
```

Adicionar outras variáveis somente se realmente forem usadas.

---

# 32. Migração do HTML existente

O HTML fornecido serve como **referência funcional e visual**, não como base que precisa ser mantida linha a linha.

O Codex deve:

1. identificar cada seção do protótipo;
2. converter em componentes React limpos;
3. remover `onclick` inline;
4. remover JavaScript global;
5. usar estado React para modal, foto, geolocalização e envio;
6. mover operações sensíveis para servidor;
7. usar dependências instaladas pelo projeto;
8. preservar aparência e conteúdo essenciais.

Não criar uma única `page.tsx` gigantesca com todo o código dentro.

---

# 33. Plano de implementação

## Fase 1 — Fundação

- criar/ajustar projeto Next.js + TypeScript + Tailwind;
- instalar Lexend por `next/font`;
- definir tokens visuais;
- configurar estrutura de componentes;
- criar arquivo de conteúdo central.

## Fase 2 — Interface pública

- cabeçalho;
- barra do link oficial;
- hero;
- guia visual;
- formulário;
- modal QR;
- rodapé;
- responsividade.

Nessa fase ainda pode usar handler temporário apenas durante desenvolvimento, mas não considerar a tarefa concluída.

## Fase 3 — Banco e imagem

- Prisma;
- Neon;
- migration;
- Vercel Blob;
- endpoint/server action real;
- protocolo server-side;
- tratamento de falhas.

## Fase 4 — Privacidade e validação

- consentimento;
- página de privacidade;
- validações de arquivo, e-mail e GPS;
- proteção contra spam básico.

## Fase 5 — Administração

- autenticação;
- lista de registros;
- detalhe;
- status;
- observação interna.

## Fase 6 — Qualidade e deploy

- testes manuais;
- lint;
- typecheck;
- build;
- teste mobile;
- deploy Vercel;
- configuração de ambiente;
- verificação do QR no endereço definitivo.

---

# 34. Critérios de aceite

O trabalho só deve ser considerado concluído quando todos estes pontos estiverem atendidos:

- [ ] Site visualmente coerente com o protótipo BIOBERÇO.
- [ ] Responsivo em celular e desktop.
- [ ] Fonte Lexend aplicada corretamente.
- [ ] Logos carregadas localmente.
- [ ] Três cartões de identificação presentes.
- [ ] Nenhuma imagem genérica de outra árvore usada como fallback silencioso.
- [ ] Upload de fotografia real.
- [ ] Preview da fotografia.
- [ ] Captura GPS real.
- [ ] Fallback para erro/permissão negada do GPS.
- [ ] Endereço/ponto de referência funcional.
- [ ] Nome, telefone e e-mail validados.
- [ ] Consentimento de privacidade obrigatório.
- [ ] Dados gravados no PostgreSQL.
- [ ] Fotografia gravada em armazenamento apropriado.
- [ ] Protocolo gerado no servidor e único.
- [ ] Nenhum `Math.random()` usado como garantia de protocolo.
- [ ] Feedback de envio real.
- [ ] Em caso de erro, o formulário não perde todos os dados.
- [ ] QR Code aponta para o domínio configurado.
- [ ] Usuário público não pode editar a URL do QR.
- [ ] Botão de copiar link funciona.
- [ ] Política de Privacidade disponível.
- [ ] Área administrativa protegida.
- [ ] Registros podem ser validados/rejeitados internamente.
- [ ] Dados pessoais não ficam públicos.
- [ ] Coordenadas exatas não ficam expostas publicamente.
- [ ] Nenhum texto afirma encaminhamento externo se ele não aconteceu de verdade.
- [ ] `npm run lint` sem erros relevantes.
- [ ] `npx prisma validate` concluído.
- [ ] `npx prisma generate` concluído.
- [ ] build de produção concluído sem erro.

---

# 35. Testes manuais obrigatórios

Testar pelo menos os seguintes cenários:

## Celular

1. abrir o site por QR Code;
2. tirar foto usando câmera;
3. selecionar foto da galeria;
4. permitir GPS;
5. negar GPS e usar fallback;
6. preencher os contatos;
7. enviar;
8. receber protocolo;
9. conferir registro no banco/admin.

## Falhas

10. tentar enviar sem foto;
11. usar e-mail inválido;
12. negar localização;
13. provocar timeout de localização;
14. tentar arquivo não suportado;
15. perder conexão durante envio;
16. clicar duas vezes no botão Enviar;
17. tentar reenviar após erro sem perder os campos.

## Interface

18. abrir/fechar modal QR pelo mouse;
19. abrir/fechar modal pelo teclado;
20. copiar link;
21. verificar layout em aproximadamente 360 px de largura;
22. verificar tablet;
23. verificar desktop;
24. testar Chrome/Edge e navegador móvel.

---

# 36. Observação sobre os textos científicos e institucionais

Os textos presentes no protótipo devem ser mantidos como conteúdo de referência inicial, porém o Codex **não deve inventar novas afirmações científicas, números, parcerias ou integrações**.

Deixar esses textos centralizados e fáceis de revisar.

Pontos que merecem confirmação da equipe antes da publicação definitiva incluem, por exemplo:

- número `240`;
- descrições botânicas finais;
- forma oficial de citar instituições parceiras/de apoio;
- eventual autorização para encaminhamento de registros a terceiros.

O trabalho do Codex aqui é estruturar o sistema para receber essas confirmações sem exigir reconstrução da página.

---

# 37. Resultado esperado

Ao final, devemos ter um site com a mesma essência do protótipo — verde, amigável, educativo, simples e direto —, porém com arquitetura moderna e fluxo real.

A experiência desejada é:

1. a pessoa chega pelo QR Code;
2. entende em poucos segundos o que é o BIOBERÇO;
3. compara a árvore que viu com as características apresentadas;
4. tira uma foto;
5. captura a localização;
6. informa um ponto de referência e contato;
7. aceita a política de uso dos dados;
8. envia;
9. recebe um protocolo verdadeiro;
10. o registro passa a existir no banco e fica disponível para análise da equipe.

**Não entregar uma maquete. Entregar o fluxo completo e funcional.**
