/* =====================================================================
   CLUBE DE XADREZ DE MARINGÁ — PAINEL DE CONTEÚDO EDITÁVEL
   =====================================================================
   Este arquivo concentra TODOS os textos, links, horários, eventos,
   planos, imagens da galeria e depoimentos exibidos no site.

   ▸ Para atualizar o site, edite apenas este arquivo (e as imagens em
     assets/img/). Não é necessário mexer em HTML, CSS ou no main.js.
   ▸ Itens marcados com "ATUALIZAR INFORMAÇÃO" são placeholders que
     precisam de confirmação do clube antes de ir ao ar como fato.
   ▸ Fontes dos dados confirmados (verificados em 02/11/2026):
       - Google Maps oficial  → endereço, telefone, horários, avaliação
       - Linktree oficial     → WhatsApp, grupo, links de pagamento
       - Páginas Asaas        → nomes dos planos, valores, benefícios, e-mail
       - Sympla (organizador) → eventos e referência ao Shopping Cidade
       - Projeto de Lei 195/2025 (ALEP) → fundação em 08/06/1954,
         filiação à FEXPAR e Utilidade Pública Municipal (Lei nº 334/64)
   ===================================================================== */

window.SITE_DATA = {
  /* ------------------------------------------------------------------
     1. IDENTIDADE E CONTATOS
     ------------------------------------------------------------------ */
  club: {
    name: "Clube de Xadrez de Maringá",
    shortName: "CX Maringá",
    tagline: "Seu próximo movimento começa aqui.",
    foundedYear: 1954,            // Fundado em 08/06/1954 (documento oficial do clube)
    cnpj: "77.211.126/0001-30",   // conforme páginas de pagamento Asaas
    email: "clubexadrezmaringa@gmail.com", // conforme Asaas
    phoneDisplay: "(44) 99988-1166",
    phoneE164: "+5544999881166",
    whatsappNumber: "5544999881166", // apenas dígitos, com DDI 55
    whatsappMessage:
      "Olá! Gostaria de saber mais sobre as aulas e o Clube de Xadrez de Maringá.",
    whatsappTrialMessage:
      "Olá! Gostaria de agendar uma aula experimental no Clube de Xadrez de Maringá.",
    whatsappGroupUrl: "https://chat.whatsapp.com/Lsh5hDkRgiD98csOu5kZxc", // "Grupo de WhatsApp do Clube" (Linktree)
    instagram: "https://www.instagram.com/clubexadrezmga/",
    instagramHandle: "@clubexadrezmga",
    facebook: "https://www.facebook.com/cxmga",
    linktree: "https://linktr.ee/clubexadrezmaringa",
    // URL pública do site (usada em compartilhamentos/SEO). Troque ao usar domínio próprio.
    siteUrl: "https://axs-ai-mid.github.io/clube.de.xadrez.maringa/",
    // Selo de avaliação do Google (número real verificado em 02/11/2026 — atualize periodicamente)
    googleRating: { value: "4,9", count: 22, verifiedAt: "02/11/2026" },
    affiliations: [
      "Fundado em 1954",
      "Filiado à FEXPAR – Federação de Xadrez do Paraná",
      "Utilidade Pública Municipal (Lei nº 334/64)",
      "Associação sem fins lucrativos"
    ]
  },

  /* ------------------------------------------------------------------
     2. LOCALIZAÇÃO (fonte: Google Maps oficial)
     ------------------------------------------------------------------ */
  location: {
    venueName: "Shopping Cidade – Terminal Urbano de Maringá",
    street: "Av. Tuiuti, 710",
    neighborhood: "Vila Nova",
    city: "Maringá",
    state: "PR",
    postalCode: "87040-360",
    reference: "Loja ao lado da lotérica, no Shopping Cidade (junto ao Terminal Urbano).",
    lat: -23.4231537,
    lng: -51.9082002,
    mapsUrl: "https://maps.app.goo.gl/NKk5LfTbypHXEa12A",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Clube+de+Xadrez+de+Maring%C3%A1,+Av.+Tuiuti,+710,+Vila+Nova,+Maring%C3%A1+-+PR",
    embedUrl:
      "https://www.google.com/maps?q=Clube+de+Xadrez+de+Maring%C3%A1,+Av.+Tuiuti,+710,+Maring%C3%A1+-+PR&z=17&output=embed",
    // Horários conforme Google Maps (podem variar em feriados — confirme pelo WhatsApp)
    hoursNote: "Horários conforme a página oficial no Google Maps. Em feriados podem variar — confirme pelo WhatsApp.",
    // Formato dos horários: "HH:MM-HH:MM" (24h). Deixe a lista vazia para "Fechado".
    hours: [
      { day: "Segunda-feira", dayCode: "Monday",    times: ["14:00-15:00", "18:30-19:30"] },
      { day: "Terça-feira",   dayCode: "Tuesday",   times: ["18:30-19:30"] },
      { day: "Quarta-feira",  dayCode: "Wednesday", times: ["18:30-19:30"] },
      { day: "Quinta-feira",  dayCode: "Thursday",  times: ["18:30-19:30"] },
      { day: "Sexta-feira",   dayCode: "Friday",    times: ["11:00-12:00", "18:30-19:30"] },
      { day: "Sábado",        dayCode: "Saturday",  times: ["10:00-12:00", "14:30-17:30"] },
      { day: "Domingo",       dayCode: "Sunday",    times: [] }
    ]
  },

  /* ------------------------------------------------------------------
     3. FAIXA DE INFORMAÇÕES RÁPIDAS (abaixo do hero)
     ------------------------------------------------------------------ */
  highlights: [
    { icon: "users", title: "Aulas para todas as idades", text: "Crianças, jovens e adultos, do primeiro movimento à competição." },
    { icon: "calendar", title: "De segunda a sábado", text: "Atividades ao longo da semana. Consulte os horários na seção de localização." },
    { icon: "trophy", title: "Torneios e eventos", text: "Campeonatos, blitz e circuitos organizados pelo clube e parceiros." },
    { icon: "academy", title: "Academia de treinamento", text: "Escolinha e academia de xadrez para evoluir com acompanhamento." }
  ],

  /* ------------------------------------------------------------------
     4. SEÇÃO "AULAS"
     ------------------------------------------------------------------ */
  classes: [
    { icon: "pawn", title: "Iniciantes", text: "Regras, movimentos e os primeiros princípios do jogo, em um ambiente acolhedor e sem pressa." },
    { icon: "kids", title: "Crianças e jovens", text: "Escolinha de xadrez que desenvolve raciocínio, paciência e foco enquanto diverte." },
    { icon: "adult", title: "Adultos", text: "Para quem quer começar ou retomar o xadrez, com turmas e horários ao longo da semana." },
    { icon: "growth", title: "Jogadores que desejam evoluir", text: "Aberturas, tática, finais e análise de partidas para subir de nível com método." },
    { icon: "trophy", title: "Preparação e prática para torneios", text: "Treinamento com relógio, ritmo competitivo e acompanhamento para quem disputa campeonatos." }
  ],

  /* ------------------------------------------------------------------
     5. "POR QUE JOGAR XADREZ?"
     ------------------------------------------------------------------ */
  benefits: [
    { icon: "brain", title: "Desenvolve o raciocínio lógico", text: "Cada lance é uma hipótese testada no tabuleiro." },
    { icon: "focus", title: "Estimula a concentração", text: "Atenção plena por partidas inteiras, longe das distrações." },
    { icon: "decision", title: "Exercita a tomada de decisões", text: "Avaliar opções, assumir riscos e aprender com as consequências." },
    { icon: "strategy", title: "Trabalha planejamento e estratégia", text: "Pensar à frente e construir planos de longo prazo." },
    { icon: "discipline", title: "Incentiva a disciplina", text: "Rotina de estudo, respeito às regras e ao adversário." },
    { icon: "community", title: "Promove interação social", text: "Encontros, amizades e uma comunidade que compartilha a paixão pelo jogo." },
    { icon: "ages", title: "Para todas as idades", text: "Das crianças aos veteranos: o xadrez acompanha a vida inteira." }
  ],

  /* ------------------------------------------------------------------
     6. TORNEIOS E EVENTOS
     ------------------------------------------------------------------
     type: "torneio" | "aula" | "especial"
     date: "AAAA-MM-DD" (ou apenas "AAAA" se souber só o ano; use ""
           quando a data ainda não estiver definida)
     status: "proximo" | "inscricoes" | "realizado" | "embreve"
     Eventos com data futura (ou status "proximo"/"inscricoes"/"embreve")
     aparecem no filtro "Próximos eventos".
     ------------------------------------------------------------------ */
  events: [
    {
      title: "3º Campeonato Metropolitano de Xadrez Escolar Shopping Cidade 2026 – 3ª Etapa",
      date: "2026-11-15",
      dateLabel: "15 de novembro de 2026 · 12h às 18h",
      location: "Shopping Cidade – Av. Tuiuti, 710, Maringá – PR",
      category: "Escolar · Sub-07 a Sub-17",
      type: "torneio",
      status: "inscricoes",
      text: "Etapa final do campeonato escolar, valendo rating FEXPAR. Categorias Sub-07 a Sub-17 (nascidos entre 2009 e 2019). Sócios do clube com mensalidade em dia têm inscrição gratuita.",
      ctaLabel: "Inscrever-se no Sympla",
      ctaUrl: "https://www.sympla.com.br/evento/3o-campeonato-metropolitano-de-xadrez-escolar-shopping-cidade-2026-3a-etapa/3572133"
    },
    {
      title: "Próximo evento em breve",
      date: "",
      dateLabel: "Data a definir",
      location: "Clube de Xadrez de Maringá",
      category: "ATUALIZAR INFORMAÇÃO",
      type: "especial",
      status: "embreve",
      text: "Espaço reservado para a próxima atividade do clube (torneio blitz, aula especial, encontro ou circuito). Edite este card em assets/js/data.js.",
      ctaLabel: "Receber novidades no WhatsApp",
      ctaUrl: "whatsapp"
    },
    {
      title: "2º Torneio de Xadrez Blitz do Shopping Cidade 2026",
      date: "2026",
      dateLabel: "2026 · evento realizado",
      location: "Shopping Cidade – Av. Tuiuti, 710, Maringá – PR",
      category: "Blitz · Premiação em dinheiro · Rating FEXPAR",
      type: "torneio",
      status: "realizado",
      text: "Competição organizada pelo Clube de Xadrez de Maringá em parceria com o Shopping Cidade, valendo rating FEXPAR de blitz.",
      ctaLabel: "Ver página do evento",
      ctaUrl: "https://www.sympla.com.br/evento/2-torneio-de-xadrez-blitz-do-shopping-cidade-2026-premiacao-em-dinheiro-valendo-rating-fexar/3420211"
    },
    {
      title: "1º Torneio de Xadrez Blitz do Shopping Cidade 2026",
      date: "2026",
      dateLabel: "2026 · evento realizado",
      location: "Shopping Cidade – Av. Tuiuti, 710, Maringá – PR",
      category: "Blitz · Premiação em dinheiro · Rating FEXPAR",
      type: "torneio",
      status: "realizado",
      text: "Primeira edição do torneio blitz do Shopping Cidade, aberto à comunidade enxadrística da região.",
      ctaLabel: "Ver página do evento",
      ctaUrl: "https://www.sympla.com.br/evento/1-torneio-de-xadrez-blitz-do-shopping-cidade-2026-premiacao-em-dinheiro-valendo-rating-fexpar/3320330"
    },
    {
      title: "I IRT CX Maringá STD 2024",
      date: "2024-07-26",
      dateLabel: "26 a 28 de julho de 2024",
      location: "Clube de Xadrez de Maringá – Terminal Urbano de Maringá",
      category: "Xadrez convencional · Rating CBX/FIDE",
      type: "torneio",
      status: "realizado",
      text: "Torneio de xadrez convencional (60 min + 30 s) com R$ 3.000,00 em prêmios, valendo rating CBX e FIDE.",
      ctaLabel: "Ver página do evento",
      ctaUrl: "https://www.sympla.com.br/evento/i-irt-cx-maringa-std-2024/2476837"
    },
    {
      title: "4º Circuito Maringaense de Xadrez RPD 2024 – Etapa 4/5",
      date: "2024",
      dateLabel: "2024 · evento realizado",
      location: "Maringá – PR",
      category: "Rápidas · Rating CBX/FIDE",
      type: "torneio",
      status: "realizado",
      text: "Etapa do circuito maringaense de xadrez rápido, valendo movimentação de rating CBX e FIDE.",
      ctaLabel: "Ver página do evento",
      ctaUrl: "https://www.sympla.com.br/evento/4-circuito-maringaense-de-xadrez-rpd-2024-etapa-4-5-valendo-movimentacao-de-rating-cbx-fide/2542591"
    },
    {
      title: "Aulas regulares – Escolinha e Academia de Xadrez",
      date: "",
      dateLabel: "De segunda a sábado",
      location: "Clube de Xadrez de Maringá – Shopping Cidade",
      category: "Iniciantes, intermediários e avançados",
      type: "aula",
      status: "proximo",
      text: "Turmas para iniciantes, intermediários e avançados ao longo da semana. Agende uma aula experimental e conheça o clube.",
      ctaLabel: "Agendar aula experimental",
      ctaUrl: "whatsapp-trial"
    }
  ],

  /* ------------------------------------------------------------------
     7. ASSOCIAÇÃO E PLANOS (fonte: páginas oficiais Asaas)
     Os valores abaixo foram lidos nas páginas oficiais em 02/11/2026.
     Se mudarem, atualize aqui — o link sempre mostrará o valor vigente.
     ------------------------------------------------------------------ */
  plans: [
    {
      id: "associado",
      featured: true,
      badge: "Sócio contribuinte",
      title: "Associado",
      price: "R$ 165,00",
      priceNote: "pagamento único à vista · cadastro de sócio contribuinte",
      description:
        "A Associação do Clube de Xadrez de Maringá está comprometida em levar o xadrez ao máximo de crianças e jovens possível. A sua contribuição faz a diferença.",
      benefits: [
        "Inscrição gratuita no Campeonato Municipal de Xadrez Blitz do CX Maringá",
        "50% de desconto em todos os demais eventos promovidos pelo clube",
        "50% de desconto nas aulas da Escolinha de Xadrez (isenção para o 1º membro da família)",
        "Participação na comunidade e nas decisões da associação"
      ],
      ctaLabel: "Quero ser associado",
      ctaUrl: "https://www.asaas.com/c/161318923845"
    },
    {
      id: "nao-associado",
      featured: false,
      badge: "Academia de Xadrez",
      title: "Não associado",
      price: "R$ 80,00",
      priceNote: "por mês · mensalidade da Academia de Xadrez",
      description:
        "Mensalidade da Academia de Xadrez para não sócios, com atividades de segunda a sábado.",
      benefits: [
        "Acesso às atividades da Academia de Xadrez de segunda a sábado",
        "Sem taxa de associação — pague apenas a mensalidade",
        "Condições e benefícios adicionais: ATUALIZAR INFORMAÇÃO"
      ],
      ctaLabel: "Ver mensalidade",
      ctaUrl: "https://www.asaas.com/c/5meuojr39gyv52c2"
    }
  ],
  paymentNotice:
    "Os pagamentos são processados pela plataforma externa Asaas, em ambiente seguro. Ao clicar, você será direcionado para fora deste site, em uma nova aba.",

  /* ------------------------------------------------------------------
     8. GALERIA
     ------------------------------------------------------------------
     As imagens atuais são ILUSTRATIVAS (geradas para o projeto) e devem
     ser substituídas por fotos reais e autorizadas do clube.
     Duas formas de cadastrar:
       a) Responsiva: image = caminho base SEM extensão + widths disponíveis
          (ex.: assets/img/gallery/foto + [480, 800, 1200] gera
           foto-480.webp/.jpg, foto-800.webp/.jpg ...)
       b) Simples: image = caminho COM extensão (ex.: assets/img/gallery/foto.jpg)
     span: "wide" (2 colunas), "tall" (2 linhas) ou "" (padrão)
     ------------------------------------------------------------------ */
  galleryNotice: "Imagens ilustrativas — substitua pelas fotos oficiais do clube em assets/img/gallery/.",
  gallery: [
    { image: "assets/img/gallery/aula-criancas", widths: [480, 800, 1200], width: 1264, height: 848, span: "wide",
      alt: "Crianças em aula de xadrez observando o professor explicar uma posição no tabuleiro mural", caption: "Aulas de xadrez para crianças e jovens" },
    { image: "assets/img/gallery/knight", widths: [480, 800], width: 928, height: 1152, span: "tall",
      alt: "Peça de cavalo de madeira iluminada por luz dourada sobre fundo escuro", caption: "Detalhe de peça de xadrez" },
    { image: "assets/img/gallery/relogio", widths: [480, 800, 1200], width: 1264, height: 848, span: "",
      alt: "Mão pressionando o relógio de xadrez durante uma partida blitz", caption: "Partidas blitz e treino com relógio" },
    { image: "assets/img/gallery/tabuleiro", widths: [480, 800], width: 1024, height: 1024, span: "",
      alt: "Tabuleiro de xadrez visto de cima com planilha de anotação e caneta", caption: "Tabuleiro e planilha de partida" },
    { image: "assets/img/gallery/geracoes", widths: [480, 800, 1200], width: 1264, height: 848, span: "wide",
      alt: "Senhor e criança jogando xadrez em ambiente de clube", caption: "Xadrez que une gerações" },
    { image: "assets/img/gallery/concentracao", widths: [480, 800], width: 900, height: 1124, span: "tall",
      alt: "Jogador concentrado diante do tabuleiro em sala de clube com luz quente", caption: "Concentração em cada lance" },
    { image: "assets/img/gallery/medalhas", widths: [480, 800, 1200], width: 1200, height: 896, span: "",
      alt: "Medalhas e troféu sobre um tabuleiro de xadrez", caption: "Premiações dos torneios" }
  ],

  /* ------------------------------------------------------------------
     9. DEPOIMENTOS
     ------------------------------------------------------------------
     Substitua pelos depoimentos REAIS e AUTORIZADOS. Enquanto isso, os
     cards exibem conteúdo demonstrativo claramente sinalizado.
     Para publicar um depoimento real, troque placeholder para false.
     ------------------------------------------------------------------ */
  testimonials: [
    { placeholder: true, quote: "Conteúdo de depoimento a ser substituído por uma avaliação real autorizada.", name: "Nome do aluno(a)", role: "Aluno(a) do clube — ATUALIZAR INFORMAÇÃO" },
    { placeholder: true, quote: "Conteúdo de depoimento a ser substituído por uma avaliação real autorizada.", name: "Nome do responsável", role: "Pai/mãe de aluno(a) — ATUALIZAR INFORMAÇÃO" },
    { placeholder: true, quote: "Conteúdo de depoimento a ser substituído por uma avaliação real autorizada.", name: "Nome do participante", role: "Participante de torneios — ATUALIZAR INFORMAÇÃO" }
  ],

  /* ------------------------------------------------------------------
     10. FORMULÁRIO DE CONTATO
     ------------------------------------------------------------------
     O site é estático (sem servidor). Por padrão, ao enviar, o formulário
     abre o WhatsApp oficial com a mensagem preenchida. Se quiser receber
     por e-mail, crie um formulário gratuito no Formspree
     (https://formspree.io) e cole o endpoint abaixo, ex.:
     formEndpoint: "https://formspree.io/f/xxxxxxxx"
     ------------------------------------------------------------------ */
  formEndpoint: "",
  formSubjects: [
    "Aula experimental",
    "Aulas para crianças e jovens",
    "Aulas para adultos",
    "Torneios e eventos",
    "Associação e mensalidade",
    "Outro assunto"
  ]
};
