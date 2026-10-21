/*!
 * IA: Central de Comando 3D · InovaAI
 * Jogo educativo em primeira pessoa sobre uso responsável de inteligência artificial.
 * Requer three.js carregado antes (vendor/three.min.js, que expõe window.THREE).
 *
 *   <link rel="stylesheet" href="central-ia/central-ia.css">
 *   <div id="jogo-ia"></div>
 *   <script src="central-ia/vendor/three.min.js"></script>
 *   <script src="central-ia/central-ia.js"></script>
 *   <script>CentralIA.mount('#jogo-ia');</script>
 *
 * Controles: WASD anda · mouse olha · E interage · Shift corre · Esc pausa
 */
(function (global) {
  'use strict';
  var THREE = global.THREE;

  /* =====================================================================
     CONTEÚDO DOS INCIDENTES (edite aqui os textos do jogo)
     ===================================================================== */
  var INCIDENTS = [
    {
      id: 'info', n: 1, short: 'Notícias', sub: 'Alucinação da IA', title: 'O sistema está alucinando', icon: 'fileSearch',
      brief: 'O assistente de IA do jornal da escola escreveu uma matéria que será publicada em poucos minutos. O texto parece convincente, mas algo não bate.',
      evidence: function () {
        return '<div class="cia-ev"><div class="cia-ev-head"><span>rascunho_ia · Jornal da Escola</span><span class="cia-tag warn">Publicação pausada</span></div>' +
          '<div class="cia-ev-body"><p class="cia-ev-title">IA faz notas dispararem, diz estudo</p>' +
          '<p><mark>Um estudo de 2025 prova que alunos que usam IA tiram notas 47% maiores.</mark> <mark>Segundo o professor Ricardo Almeida, a IA vai substituir as provas.</mark> ' +
          'Especialistas lembram que ferramentas de IA generativa podem errar, e muitas escolas já criaram regras para o uso em trabalhos.</p></div>' +
          '<div class="cia-ev-foot"><span>Tom da resposta</span><span class="cia-meter"><i style="width:96%"></i></span><b>muito confiante</b></div></div>';
      },
      question: 'O que você faz antes de publicar?',
      options: [
        { text: 'Publicar agora: o texto está bem escrito e a IA parece ter certeza.', ok: false,
          fb: 'Texto confiante não é sinônimo de texto verdadeiro. Modelos de linguagem geram as palavras mais prováveis, não fatos checados.' },
        { text: 'Pausar a publicação e conferir cada afirmação em fontes confiáveis.', ok: true,
          fb: 'Isso mesmo! Toda informação gerada por IA precisa ser conferida em fontes externas antes de ser publicada.' },
        { text: 'Perguntar à própria IA se as informações são verdadeiras.', ok: false,
          fb: 'A IA pode "confirmar" a própria invenção. A checagem precisa vir de fora: sites oficiais, artigos científicos, especialistas.' }
      ],
      task: 'Pegue as 4 afirmações que flutuam ao lado do terminal, passe cada uma no Verificador de fontes (parede esquerda) e jogue no cesto certo: Confirmado ou Sem fonte.',
      lesson: 'IA generativa pode produzir informações falsas com aparência convincente: são as chamadas alucinações. Antes de usar ou publicar uma resposta, confira cada afirmação em fontes externas e confiáveis.',
      lessonShort: 'IA generativa pode produzir informações falsas e precisa de verificação.'
    },
    {
      id: 'ident', n: 2, short: 'Biometria', sub: 'Viés algorítmico', title: 'Erro de identificação', icon: 'scanFace',
      brief: 'O reconhecimento facial da biblioteca bloqueou a entrada da aluna Júlia, confundindo-a com outra pessoa. É o terceiro caso da semana, e todos com alunos de pele mais escura.',
      evidence: function () {
        return '<div class="cia-ev"><div class="cia-ev-head"><span>log · catraca da biblioteca</span><span class="cia-tag bad">3 bloqueios indevidos</span></div>' +
          '<div class="cia-ev-body"><ul class="cia-log">' +
          '<li><time>07:42</time><span>Júlia M. → lida como "aluno #2231"</span><em>NEGADO</em></li>' +
          '<li><time>10:15</time><span>Pedro S. → lido como "aluno #0874"</span><em>NEGADO</em></li>' +
          '<li><time>13:05</time><span>Carla R. → lida como "aluna #1590"</span><em>NEGADO</em></li></ul>' +
          '<div class="cia-bars"><p>Fotos usadas para treinar o modelo, por tom de pele:</p><ul>' +
          '<li><span>Pele clara</span><span class="track"><i style="width:67%"></i></span><span>67%</span></li>' +
          '<li><span>Pele média</span><span class="track"><i style="width:17%"></i></span><span>17%</span></li>' +
          '<li><span>Pele escura</span><span class="track"><i style="width:16%"></i></span><span>16%</span></li></ul></div></div></div>';
      },
      question: 'Qual é a melhor forma de corrigir o problema?',
      options: [
        { text: 'Pedir que a Júlia cadastre outra foto, com mais iluminação.', ok: false,
          fb: 'O problema não está na aluna, e sim no sistema. Trocar a foto não corrige os dados desequilibrados: outros alunos continuarão sendo barrados.' },
        { text: 'Deixar o sistema menos rigoroso, para aceitar qualquer rosto parecido.', ok: false,
          fb: 'Isso troca um erro por outro: pessoas erradas passariam a entrar. E o viés continuaria lá.' },
        { text: 'Equilibrar os dados de treinamento, com autorização das pessoas, e manter revisão humana.', ok: true,
          fb: 'Exato! O erro nasce de dados que não representam bem todas as pessoas. A correção começa por eles.' }
      ],
      task: 'Leve fotos da prateleira (parede direita) até o painel Dados de treino até equilibrar as três barras. Atenção: só valem fotos com autorização.',
      lesson: 'Vieses algorítmicos surgem quando os dados de treinamento não representam bem todas as pessoas. Equilibrar os dados, sempre com consentimento, e manter supervisão humana reduz o problema.',
      lessonShort: 'Vieses algorítmicos vêm de dados de treinamento desequilibrados.'
    },
    {
      id: 'priv', n: 3, short: 'Dados', sub: 'Vazamento de dados', title: 'Vazamento de dados', icon: 'shieldCheck',
      brief: 'Para "ganhar tempo", alguém da secretaria mandou a planilha de matrículas para um chatbot gratuito da internet. A esteira de envio foi pausada a tempo.',
      evidence: function () {
        return '<div class="cia-ev"><div class="cia-ev-head"><span>envio · matriculas_2026.xlsx</span><span class="cia-tag warn">Pausado</span></div>' +
          '<div class="cia-ev-body cia-up"><div class="row"><span>Destino</span><b>chatbot-gratis.exemplo (servidor externo)</b></div>' +
          '<div class="row"><span>Progresso</span><b>64%</b></div><div class="cia-prog"><i></i></div>' +
          '<div class="cia-tablewrap"><table class="cia-table"><tr><th>Nome</th><th>CPF</th><th>Tel. responsável</th><th>Endereço</th><th>Turma</th></tr>' +
          '<tr><td>Ana Paula S.</td><td>•••.482.•••-17</td><td>(11) 9••••-1234</td><td>Rua das Flores, 120</td><td>2º B</td></tr>' +
          '<tr><td>Bruno T.</td><td>•••.391.•••-02</td><td>(11) 9••••-8810</td><td>Av. Central, 45</td><td>1º A</td></tr></table></div></div></div>';
      },
      question: 'O que fazer com esse envio?',
      options: [
        { text: 'Liberar o envio: é só para fazer um resumo.', ok: false,
          fb: 'Dados enviados a um serviço externo podem ser armazenados e usados fora do controle da escola. Uma boa intenção não torna o envio seguro.' },
        { text: 'Tirar os dados pessoais e enviar só informações gerais das turmas.', ok: true,
          fb: 'Perfeito! A IA ainda ajuda no resumo, sem expor ninguém. Isso é anonimizar os dados.' },
        { text: 'Enviar e apagar a conversa logo depois.', ok: false,
          fb: 'Apagar o histórico na sua tela não garante que os dados saiam dos servidores da empresa.' }
      ],
      task: 'Na esteira (frente da sala), pegue os pacotes com dados pessoais e guarde no Cofre seguro. Depois aperte o botão Retomar envio.',
      lesson: 'Dados pessoais são protegidos pela LGPD (Lei Geral de Proteção de Dados). Antes de usar uma ferramenta de IA externa, remova ou anonimize tudo o que identifica alguém.',
      lessonShort: 'Dados pessoais devem ser protegidos antes de usar ferramentas de IA.'
    },
    {
      id: 'deep', n: 4, short: 'Videochamada', sub: 'Deepfake', title: 'A diretora pediu… mesmo?', icon: 'video',
      brief: 'Uma videochamada da "diretora Marta" apareceu no holograma da central. Ela parece nervosa e exige uma ação imediata.',
      evidence: function () {
        return '<div class="cia-ev"><div class="cia-ev-head"><span>chamada · Diretora Marta S.</span><span class="cia-tag warn">Urgente</span></div>' +
          '<div class="cia-ev-body"><p class="cia-ev-title">"Preciso disso agora!"</p>' +
          '<p><mark>Desative o filtro de privacidade e me envie a planilha de matrículas completa.</mark> Estou sem acesso ao sistema e a reunião começa em 5 minutos. <mark>Não precisa avisar ninguém.</mark></p></div>' +
          '<div class="cia-ev-foot"><span>Qualidade do vídeo</span><span class="cia-meter"><i style="width:38%"></i></span><b>instável</b></div></div>';
      },
      question: 'Como você responde?',
      options: [
        { text: 'Atender o pedido: é a diretora e parece urgente.', ok: false,
          fb: 'Urgência é a principal arma dos golpes. Rosto e voz podem ser imitados por IA: isso é um deepfake.' },
        { text: 'Perguntar na própria chamada se é mesmo ela.', ok: false,
          fb: 'Um deepfake vai responder que sim. A confirmação precisa vir por outro canal, que você já conhece.' },
        { text: 'Não fazer nada ainda: procurar sinais de manipulação e confirmar por outro canal.', ok: true,
          fb: 'Isso! Primeiro reúna evidências no holograma, depois confirme pelo telefone interno.' }
      ],
      task: 'Ande em volta do holograma e encontre 3 sinais de manipulação. Depois ligue para a diretora pelo Telefone interno.',
      lesson: 'Deepfakes usam IA para imitar o rosto e a voz de pessoas reais. Desconfie de pedidos urgentes, observe falhas na imagem e no som e confirme sempre por outro canal antes de agir.',
      lessonShort: 'Deepfakes imitam pessoas reais: confirme sempre por outro canal.'
    }
  ];

  var CARDS = [
    { id: 'c1', zone: 'no', text: 'Estudo de 2025 prova: quem usa IA tira notas 47% maiores.',
      result: 'Nenhum estudo com esse resultado foi encontrado.',
      why: 'Esse estudo não existe: é uma alucinação, um dado inventado com cara de fato.' },
    { id: 'c2', zone: 'no', text: 'Prof. Ricardo Almeida: "a IA vai substituir as provas".',
      result: 'Nenhum pesquisador com esse nome ou declaração.',
      why: 'Nomes e citações inventados são um tipo comum de alucinação.' },
    { id: 'c3', zone: 'ok', text: 'Ferramentas de IA generativa podem produzir respostas incorretas.',
      result: 'Confirmado na documentação oficial das ferramentas.',
      why: 'Os próprios desenvolvedores avisam que a IA pode errar.' },
    { id: 'c4', zone: 'ok', text: 'Muitas escolas criaram regras para o uso de IA em trabalhos.',
      result: 'Confirmado em notícias e documentos de várias escolas.',
      why: 'Há várias fontes independentes confirmando.' }
  ];
  var TONES = {
    clara: { label: 'Pele clara', color: '#F2D3B5' },
    media: { label: 'Pele média', color: '#C48A5C' },
    escura: { label: 'Pele escura', color: '#6E4127' }
  };
  var CUBES = [
    { id: 'p1', tone: 'media', ok: true }, { id: 'p2', tone: 'escura', ok: true }, { id: 'p3', tone: 'clara', ok: true },
    { id: 'p4', tone: 'escura', ok: true }, { id: 'p5', tone: 'media', ok: false }, { id: 'p6', tone: 'media', ok: true },
    { id: 'p7', tone: 'escura', ok: false }, { id: 'p8', tone: 'media', ok: true }, { id: 'p9', tone: 'escura', ok: true }
  ];
  var BARS_START = { clara: 4, media: 1, escura: 1 }, BARS_TARGET = 4;
  var PACKETS = [
    { id: 'd1', personal: true, text: 'Nome completo', why: 'O nome identifica diretamente uma pessoa.' },
    { id: 'd2', personal: false, text: 'Alunos por turma', why: 'É um número geral: não identifica ninguém. Pode seguir na esteira.' },
    { id: 'd3', personal: true, text: 'CPF', why: 'Documento único de cada pessoa, um dos dados mais perigosos de vazar.' },
    { id: 'd4', personal: true, text: 'Telefone dos responsáveis', why: 'Contato pessoal: se vazar, pode ser usado em golpes.' },
    { id: 'd5', personal: false, text: 'Frequência média da turma', why: 'É uma estatística da turma: não identifica ninguém. Pode seguir.' },
    { id: 'd6', personal: true, text: 'Endereço residencial', why: 'Revela onde a pessoa mora.' }
  ];
  var SIGNS = [
    { id: 's1', title: 'Contorno do rosto se desfaz', detail: 'As bordas do rosto tremem e se misturam com o fundo: falha típica de deepfake.' },
    { id: 's2', title: 'Sombra para o lado errado', detail: 'A luz vem da luminária, mas a sombra aponta para ela. A cena não é real.' },
    { id: 's3', title: 'Voz fora de sincronia', detail: 'O áudio chega quase 1 segundo depois do movimento da boca.' }
  ];

  var DECISION_PTS = [100, 50, 0];
  var OK_PTS = 15, MISS_PTS = -5, SIGN_PTS = 20;
  var RANKS = [
    { min: 0.85, title: 'Especialista em IA', icon: 'trophy', color: 'var(--cia-good)',
      text: 'Você usou a IA com senso crítico, protegeu as pessoas e manteve a central estável.' },
    { min: 0.55, title: 'Analista de Sistemas', icon: 'badgeCheck', color: 'var(--cia-purple)',
      text: 'Boas decisões! Alguns pontos merecem atenção: confira os aprendizados abaixo.' },
    { min: 0, title: 'Estagiário de IA', icon: 'sprout', color: 'var(--cia-blue)',
      text: 'Todo especialista começou assim. Revise os aprendizados e tente de novo.' }
  ];

  /* =====================================================================
     ÍCONES E UTILITÁRIOS
     ===================================================================== */
  var ICONS = {
    fileSearch: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="11.5" cy="14.5" r="2.5"/><path d="M13.3 16.3 15 18"/>',
    scanFace: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/>',
    shieldCheck: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    video: '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    volume: '<path d="M11 4.7a.7.7 0 0 0-1.2-.5L6.4 7.6A1.4 1.4 0 0 1 5.4 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.4a1.4 1.4 0 0 1 1 .4l3.4 3.4a.7.7 0 0 0 1.2-.5z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.4 18.4a9 9 0 0 0 0-12.7"/>',
    mute: '<path d="M11 4.7a.7.7 0 0 0-1.2-.5L6.4 7.6A1.4 1.4 0 0 1 5.4 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.4a1.4 1.4 0 0 1 1 .4l3.4 3.4a.7.7 0 0 0 1.2-.5z"/><path d="m22 9-6 6"/><path d="m16 9 6 6"/>',
    expand: '<path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    circleCheck: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    circleX: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    rotate: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    badgeCheck: '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
    sprout: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'
  };
  function ico(name) {
    return '<svg class="cia-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function byId(id) { for (var i = 0; i < INCIDENTS.length; i++) if (INCIDENTS[i].id === id) return INCIDENTS[i]; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function short(s, n) { return s.length > n ? s.slice(0, n - 1) + '…' : s; }

  var FONT = {
    display: 'Sora, Poppins, system-ui, sans-serif',
    body: 'Poppins, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, Menlo, monospace'
  };
  function wrapText(ctx, text, maxW) {
    var words = String(text).split(' '), lines = [], line = '';
    words.forEach(function (w) {
      var t = line ? line + ' ' + w : w;
      if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t;
    });
    if (line) lines.push(line);
    return lines;
  }
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  /* =====================================================================
     SOM
     ===================================================================== */
  function Sound() { this.ctx = null; this.on = true; }
  Sound.prototype.tone = function (freq, dur, type, delay, vol) {
    if (!this.on) return;
    try {
      if (!this.ctx) this.ctx = new (global.AudioContext || global.webkitAudioContext)();
      var c = this.ctx, t = c.currentTime + (delay || 0), o = c.createOscillator(), g = c.createGain();
      o.type = type || 'sine'; o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.06, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + 0.02);
    } catch (e) { /* sem áudio */ }
  };
  Sound.prototype.play = function (n) {
    var s = this;
    if (n === 'click') s.tone(660, 0.06, 'square', 0, 0.02);
    else if (n === 'pick') { s.tone(520, 0.07, 'triangle'); s.tone(780, 0.08, 'triangle', 0.05); }
    else if (n === 'ok') { s.tone(660, 0.1); s.tone(990, 0.16, 'sine', 0.08); }
    else if (n === 'bad') s.tone(180, 0.22, 'sawtooth', 0, 0.045);
    else if (n === 'scan') { [400, 600, 800].forEach(function (f, i) { s.tone(f, 0.09, 'sine', i * 0.07, 0.04); }); }
    else if (n === 'win') [523, 659, 784, 1046].forEach(function (f, i) { s.tone(f, 0.22, 'sine', i * 0.1); });
  };

  /* =====================================================================
     JOGO
     ===================================================================== */
  function Game(el, opts) {
    if (!THREE) throw new Error('CentralIA: carregue o three.js (vendor/three.min.js) antes deste arquivo.');
    this.el = el;
    this.opts = opts;
    this.sound = new Sound();
    this.sound.on = opts.sound !== false;
    this.keys = {};
    this.yaw = 0; this.pitch = 0;
    this.pos = new THREE.Vector3(0, 0, 2.6);
    this.inter = [];
    this.anim = [];
    this.texs = [];
    this.obs = [];
    this.inv = [];
    this.hover = null;
    this.layerOpen = false;
    this.touch = global.matchMedia && global.matchMedia('(pointer: coarse)').matches;
    this.buildDOM();
    this.initThree();
    this.buildWorld();
    this.applyTheme();
    this.reset();
    this.showIntro();
    this.loop();
  }
  var G = Game.prototype;

  /* ------------------------------------------------------------- DOM */
  G.buildDOM = function () {
    var el = this.el, self = this;
    el.classList.add('cia');
    el.innerHTML =
      '<canvas class="cia-canvas" tabindex="0" aria-label="Sala 3D da Central de Comando"></canvas>' +
      '<div class="cia-hud">' +
        '<div class="cia-obj">' +
          '<span class="cia-eyebrow">Protocolo IA</span><strong class="cia-obj-title">Central de <span>Comando</span></strong>' +
          '<ul data-objs></ul>' +
        '</div>' +
        '<div class="cia-top">' +
          '<div class="cia-stat" data-score-box><span>Pontos</span><b data-score>0</b></div>' +
          '<div class="cia-stat"><span>Estabilidade</span><b data-stab>0%</b></div>' +
          '<button class="cia-icon-btn" type="button" data-sound></button>' +
          '<button class="cia-icon-btn" type="button" data-full aria-label="Tela cheia" title="Tela cheia">' + ico('expand') + '</button>' +
        '</div>' +
        '<div class="cia-cross" data-cross></div>' +
        '<div class="cia-prompt" data-prompt></div>' +
        '<div class="cia-inv" data-inv></div>' +
        '<div class="cia-toast" data-toast role="status" aria-live="polite"></div>' +
        (this.touch ? '<div class="cia-joy" data-joy><i></i></div><button class="cia-use" type="button" data-use>Usar</button>' : '') +
      '</div>' +
      '<div class="cia-layer" data-layer></div>';
    this.$ = function (s) { return el.querySelector(s); };
    this.$$ = function (s) { return Array.prototype.slice.call(el.querySelectorAll(s)); };
    this.canvas = this.$('.cia-canvas');
    this.layer = this.$('[data-layer]');
    this.renderSoundBtn();

    this.h = {
      click: function (e) { self.onClick(e); },
      key: function (e) { self.onKey(e, true); },
      keyup: function (e) { self.onKey(e, false); },
      lock: function () { self.onLockChange(); },
      lockErr: function () { self.setDrag(); },
      mmove: function (e) { self.onMouseMove(e); },
      mdown: function (e) { self.onMouseDown(e); },
      mup: function () { self.dragging = false; },
      blur: function () { self.keys = {}; },
      theme: function () { self.applyTheme(); },
      resize: function () { self.resize(); }
    };
    el.addEventListener('click', this.h.click);
    document.addEventListener('keydown', this.h.key);
    document.addEventListener('keyup', this.h.keyup);
    document.addEventListener('pointerlockchange', this.h.lock);
    document.addEventListener('pointerlockerror', this.h.lockErr);
    document.addEventListener('mousemove', this.h.mmove);
    this.canvas.addEventListener('mousedown', this.h.mdown);
    document.addEventListener('mouseup', this.h.mup);
    global.addEventListener('blur', this.h.blur);
    this.ro = new ResizeObserver(this.h.resize); this.ro.observe(el);
    this.mo = new MutationObserver(this.h.theme);
    this.mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    this.mq = global.matchMedia ? global.matchMedia('(prefers-color-scheme: dark)') : null;
    if (this.mq && this.mq.addEventListener) this.mq.addEventListener('change', this.h.theme);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { self.redrawAll(); });
    if (this.touch) this.bindTouch();
  };

  G.renderSoundBtn = function () {
    var b = this.$('[data-sound]');
    b.innerHTML = ico(this.sound.on ? 'volume' : 'mute');
    b.setAttribute('aria-label', this.sound.on ? 'Desligar som' : 'Ligar som');
    b.title = b.getAttribute('aria-label');
  };

  /* ------------------------------------------------------------- THREE */
  G.initThree = function () {
    var r = this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, powerPreference: 'high-performance' });
    r.setPixelRatio(Math.min(global.devicePixelRatio || 1, 1.75));
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.05;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, 16 / 9, 0.05, 80);
    this.camera.rotation.order = 'YXZ';
    this.ray = new THREE.Raycaster(); this.ray.far = 3.2;
    this.last = performance.now(); this.time = 0;
    this.resize();
  };

  G.resize = function () {
    var w = this.el.clientWidth || 800, h = this.el.clientHeight || 500;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  };

  /* texturas desenhadas em canvas (redesenhadas ao trocar o tema) */
  G.ctex = function (w, h, draw) {
    var c = document.createElement('canvas'); c.width = w; c.height = h;
    var t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
    var self = this, o = { canvas: c, ctx: c.getContext('2d'), tex: t, draw: draw };
    o.redraw = function () { o.ctx.clearRect(0, 0, w, h); o.draw(o.ctx, w, h, self.pal); t.needsUpdate = true; };
    this.texs.push(o);
    return o;
  };
  G.redrawAll = function () { if (this.pal) this.texs.forEach(function (o) { o.redraw(); }); };

  /* rótulo flutuante (sprite que sempre olha para a câmera) */
  G.label = function (text, sub, color) {
    var mc = document.createElement('canvas').getContext('2d');
    mc.font = '600 40px ' + FONT.body; var tw = mc.measureText(text).width;
    if (sub) { mc.font = '500 26px ' + FONT.mono; tw = Math.max(tw, mc.measureText(sub).width); }
    var W = Math.max(260, Math.ceil(tw + 96));
    var o = this.ctex(W, sub ? 150 : 104, function (ctx, w, h, p) {
      roundRect(ctx, 4, 4, w - 8, h - 8, 26); ctx.fillStyle = p.surface; ctx.fill();
      ctx.lineWidth = 4; ctx.strokeStyle = color ? p[color] : p.line; ctx.stroke();
      ctx.fillStyle = p.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = '600 40px ' + FONT.body; ctx.fillText(text, w / 2, sub ? 52 : h / 2 + 2);
      if (sub) { ctx.font = '500 26px ' + FONT.mono; ctx.fillStyle = color ? p[color] : p.inkSoft; ctx.fillText(sub, w / 2, 106); }
    });
    var s = new THREE.Sprite(new THREE.SpriteMaterial({ map: o.tex, transparent: true, depthWrite: false }));
    s.scale.set(1.1 * W / 512, 1.1 * o.canvas.height / 512, 1);
    s.renderOrder = 2;
    return s;
  };

  /* materiais com cor ligada ao tema */
  G.mat = function (key, extra) {
    var m = new THREE.MeshStandardMaterial(Object.assign({ roughness: 0.75, metalness: 0.1 }, extra || {}));
    m.userData.key = key;
    (this.mats = this.mats || []).push(m);
    return m;
  };
  G.glow = function (key, intensity) {
    var m = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.4, emissiveIntensity: intensity || 1.6 });
    m.userData.glow = key;
    (this.glows = this.glows || []).push(m);
    return m;
  };

  G.box = function (w, h, d, mat, x, y, z, parent) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x || 0, y || 0, z || 0);
    (parent || this.scene).add(m);
    return m;
  };
  G.cyl = function (rt, rb, h, mat, x, y, z, parent, seg) {
    var m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 32), mat);
    m.position.set(x || 0, y || 0, z || 0);
    (parent || this.scene).add(m);
    return m;
  };
  G.obBox = function (x, z, w, d) { this.obs.push({ t: 'b', x0: x - w / 2, x1: x + w / 2, z0: z - d / 2, z1: z + d / 2 }); };
  G.obCirc = function (x, z, r) { this.obs.push({ t: 'c', x: x, z: z, r: r }); };

  G.addInter = function (it) {
    it.meshes.forEach(function (m) { m.userData.it = it; });
    this.inter.push(it);
    return it;
  };

  /* ------------------------------------------------------------- MUNDO */
  var HX = 8, HZ = 7, HY = 4.2;

  G.buildWorld = function () {
    var S = this.scene, self = this;
    this.hemi = new THREE.HemisphereLight(0xffffff, 0x444466, 1.2); S.add(this.hemi);
    this.amb = new THREE.AmbientLight(0xffffff, 0.35); S.add(this.amb);
    this.sun = new THREE.DirectionalLight(0xffffff, 0.6); this.sun.position.set(3, 8, 4); S.add(this.sun);
    this.fill = [];
    [[-4.5, -3.5], [4.5, -3.5], [4.5, 3.8], [-4.5, 3.8], [0, 0]].forEach(function (p) {
      var l = new THREE.PointLight(0xffffff, 6, 9, 1.6); l.position.set(p[0], 3.4, p[1]); S.add(l); self.fill.push(l);
    });

    // piso com grade
    this.floorTex = this.ctex(512, 512, function (ctx, w, h, p) {
      ctx.fillStyle = p.room.floor; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = p.room.grid; ctx.lineWidth = 3; ctx.strokeRect(0, 0, w, h);
      ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
    });
    this.floorTex.tex.wrapS = this.floorTex.tex.wrapT = THREE.RepeatWrapping;
    this.floorTex.tex.repeat.set(HX, HZ);
    var floor = new THREE.Mesh(new THREE.PlaneGeometry(HX * 2, HZ * 2), new THREE.MeshStandardMaterial({ map: this.floorTex.tex, roughness: 0.55, metalness: 0.15 }));
    floor.rotation.x = -Math.PI / 2; S.add(floor);

    // paredes com painéis
    this.wallTex = this.ctex(512, 512, function (ctx, w, h, p) {
      ctx.fillStyle = p.room.wall; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = p.room.panel; ctx.fillRect(12, 40, w - 24, h - 120);
      ctx.strokeStyle = p.room.seam; ctx.lineWidth = 3; ctx.strokeRect(12, 40, w - 24, h - 120);
      ctx.fillStyle = p.room.seam; ctx.fillRect(0, h - 40, w, 40);
    });
    var mk = function (w, x, z, ry) {
      var t = self.wallTex.tex.clone(); t.wrapS = THREE.RepeatWrapping; t.repeat.set(w / 2, 1); t.needsUpdate = true;
      self.texs.push({ redraw: function () { t.needsUpdate = true; } });
      var m = new THREE.Mesh(new THREE.PlaneGeometry(w, HY), new THREE.MeshStandardMaterial({ map: t, roughness: 0.85 }));
      m.position.set(x, HY / 2, z); m.rotation.y = ry; S.add(m);
    };
    mk(HX * 2, 0, -HZ, 0); mk(HX * 2, 0, HZ, Math.PI); mk(HZ * 2, -HX, 0, Math.PI / 2); mk(HZ * 2, HX, 0, -Math.PI / 2);
    var ceil = new THREE.Mesh(new THREE.PlaneGeometry(HX * 2, HZ * 2), this.mat('ceil'));
    ceil.rotation.x = Math.PI / 2; ceil.position.y = HY; S.add(ceil);
    var panelMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    [[-4.5, -3.5], [4.5, -3.5], [4.5, 3.8], [-4.5, 3.8], [0, 0]].forEach(function (p) {
      var m = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.5), panelMat); m.rotation.x = Math.PI / 2; m.position.set(p[0], HY - 0.01, p[1]); S.add(m);
    });
    // faixas de luz (mudam de cor com a estabilidade)
    this.stripMat = this.glow('amb', 2.2);
    [[0, -HZ + 0.03, HX * 2, 0], [0, HZ - 0.03, HX * 2, 0], [-HX + 0.03, 0, HZ * 2, 1], [HX - 0.03, 0, HZ * 2, 1]].forEach(function (s) {
      var w = s[3] ? 0.04 : s[2], d = s[3] ? s[2] : 0.04;
      self.box(w, 0.06, d, self.stripMat, s[0], HY - 0.35, s[1]);
      self.box(w, 0.04, d, self.stripMat, s[0], 0.12, s[1]);
    });

    this.buildCore();
    this.buildServers();
    this.buildBigScreen();
    this.buildInfo();
    this.buildIdent();
    this.buildPriv();
    this.buildDeep();
    this.zoneSign('REDAÇÃO', -4.6, -HZ + 0.02, 0);
    this.zoneSign('BIOMETRIA', 4.6, -HZ + 0.02, 0);
    this.zoneSign('DADOS', HX - 0.02, 4.6, -Math.PI / 2);
    this.zoneSign('VIDEOCHAMADAS', -HX + 0.02, 4.4, Math.PI / 2);
  };

  G.zoneSign = function (text, x, z, ry) {
    var o = this.ctex(1024, 160, function (ctx, w, h, p) {
      ctx.fillStyle = p.purpleText; ctx.font = '600 84px ' + FONT.mono; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(text, w / 2, h / 2);
    });
    var m = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.5), new THREE.MeshBasicMaterial({ map: o.tex, transparent: true }));
    m.position.set(x, 3.45, z); m.rotation.y = ry; this.scene.add(m);
  };

  /* núcleo central: holograma de estabilidade */
  G.buildCore = function () {
    var g = new THREE.Group(); g.position.set(0, 0, -0.8); this.scene.add(g);
    this.cyl(1.35, 1.5, 0.25, this.mat('metal'), 0, 0.125, 0, g);
    this.cyl(0.8, 0.95, 0.75, this.mat('desk'), 0, 0.6, 0, g);
    this.cyl(1.2, 1.2, 0.08, this.mat('trim'), 0, 1.0, 0, g);
    var ring = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.035, 12, 64), this.glow('amb', 2.4));
    ring.rotation.x = Math.PI / 2; ring.position.y = 1.06; g.add(ring);
    var ico3 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.7 }));
    ico3.position.y = 2.0; g.add(ico3); this.coreIco = ico3;
    var beam = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 1.0, 1.0, 32, 1, true), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08, side: THREE.DoubleSide, depthWrite: false }));
    beam.position.y = 1.55; g.add(beam); this.coreBeam = beam;
    var self = this;
    this.stabTex = this.ctex(512, 200, function (ctx, w, h, p) {
      roundRect(ctx, 6, 6, w - 12, h - 12, 30); ctx.fillStyle = p.surface; ctx.globalAlpha = 0.92; ctx.fill(); ctx.globalAlpha = 1;
      ctx.lineWidth = 5; ctx.strokeStyle = p.ambColor || p.bad; ctx.stroke();
      ctx.textAlign = 'center'; ctx.fillStyle = p.inkSoft; ctx.font = '500 30px ' + FONT.mono; ctx.fillText('ESTABILIDADE', w / 2, 62);
      ctx.fillStyle = p.ink; ctx.font = '700 86px ' + FONT.display; ctx.fillText(Math.round((self.state ? self.state.resolved : 0) / 4 * 100) + '%', w / 2, 158);
    });
    var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.stabTex.tex, transparent: true, depthWrite: false }));
    sp.scale.set(1.15, 0.45, 1); sp.position.y = 2.95; g.add(sp);
    this.obCirc(0, -0.8, 1.55);
    this.anim.push(function (t) { ico3.rotation.y = t * 0.5; ico3.rotation.x = t * 0.2; ico3.position.y = 2.0 + Math.sin(t * 1.5) * 0.06; });
  };

  G.buildServers = function () {
    var ledTex = this.ctex(256, 512, function (ctx, w, h, p) {
      ctx.fillStyle = p.room.rack; ctx.fillRect(0, 0, w, h);
      for (var i = 0; i < 12; i++) {
        var y = 20 + i * 40; ctx.fillStyle = p.room.slot; ctx.fillRect(18, y, w - 36, 28);
        ctx.fillStyle = i % 3 ? p.blue : p.purple; ctx.fillRect(30, y + 10, 10, 8);
        ctx.fillStyle = p.good; ctx.fillRect(48, y + 10, 10, 8);
        ctx.fillStyle = p.room.seam; ctx.fillRect(80, y + 12, 60 + (i * 37) % 80, 4);
      }
    });
    for (var i = 0; i < 4; i++) {
      var x = -1.65 + i * 1.1;
      var mats = [this.mat('rack'), this.mat('rack'), this.mat('rack'), this.mat('rack'),
        new THREE.MeshStandardMaterial({ map: ledTex.tex, emissive: 0xffffff, emissiveMap: ledTex.tex, emissiveIntensity: 0.35, roughness: 0.6 }), this.mat('rack')];
      var m = new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.5, 0.8), mats);
      m.position.set(x, 1.25, -HZ + 0.45); this.scene.add(m);
    }
    this.obBox(0, -HZ + 0.45, 4.6, 0.9);
  };

  G.buildBigScreen = function () {
    var self = this;
    this.bigTex = this.ctex(1024, 400, function (ctx, w, h, p) {
      ctx.fillStyle = '#0B0F1C'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(185,157,255,.12)'; ctx.lineWidth = 2;
      for (var x = 0; x < w; x += 64) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (var y = 0; y < h; y += 64) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      ctx.fillStyle = '#B99DFF'; ctx.font = '500 34px ' + FONT.mono; ctx.fillText('MONITOR DE MODELOS · v4.0', 40, 64);
      var st = self.state;
      INCIDENTS.forEach(function (inc, i) {
        var s = st ? st.inc[inc.id] : null, done = s && s.stage === 'done';
        var yy = 130 + i * 62;
        ctx.fillStyle = done ? '#3DD598' : '#FF6B81';
        ctx.beginPath(); ctx.arc(54, yy - 12, 10, 0, 7); ctx.fill();
        ctx.fillStyle = '#EEF0FF'; ctx.font = '600 34px ' + FONT.body; ctx.fillText(inc.n + ' · ' + inc.short, 80, yy);
        ctx.fillStyle = done ? '#3DD598' : '#FF6B81'; ctx.font = '500 28px ' + FONT.mono;
        ctx.fillText(done ? 'ESTÁVEL' : (s && s.stage === 'task' ? 'EM CORREÇÃO' : 'ANOMALIA'), 520, yy);
      });
      ctx.strokeStyle = p.ambColor || '#FF6B81'; ctx.lineWidth = 5; ctx.beginPath();
      for (var k = 0; k < 14; k++) { var xx = 760 + k * 18, y2 = 300 - Math.abs(Math.sin(k * 1.7)) * 120 * (1 - (st ? st.resolved : 0) / 5); if (k) ctx.lineTo(xx, y2); else ctx.moveTo(xx, y2); }
      ctx.stroke();
    });
    var m = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 1.8), new THREE.MeshBasicMaterial({ map: this.bigTex.tex }));
    m.position.set(0, 3.25, -HZ + 0.03); this.scene.add(m);
    this.box(4.75, 1.95, 0.05, this.mat('trim'), 0, 3.25, -HZ + 0.01);
  };

  /* terminal de incidente */
  G.buildTerminal = function (inc, x, z, ry) {
    var self = this, g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; this.scene.add(g);
    var desk = this.box(1.7, 0.9, 0.75, this.mat('desk'), 0, 0.45, 0, g);
    this.box(1.74, 0.05, 0.79, this.mat('trim'), 0, 0.92, 0, g);
    var kb = this.box(0.9, 0.03, 0.25, this.glow('purple', 0.9), 0, 0.955, 0.15, g);
    this.box(0.08, 0.6, 0.08, this.mat('metal'), 0, 1.25, -0.25, g);
    var scr = this.ctex(800, 460, function (ctx, w, h, p) {
      var s = self.state ? self.state.inc[inc.id] : null, stage = s ? s.stage : 'decide';
      var col = stage === 'done' ? p.good : stage === 'task' ? p.purple : p.bad;
      ctx.fillStyle = '#0B0F1C'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = col; ctx.globalAlpha = 0.22; ctx.fillRect(0, 0, w, 80); ctx.globalAlpha = 1;
      ctx.strokeStyle = col; ctx.lineWidth = 10; ctx.strokeRect(5, 5, w - 10, h - 10);
      ctx.fillStyle = '#EEF0FF'; ctx.font = '500 36px ' + FONT.mono; ctx.fillText('T' + inc.n + ' · ' + inc.short.toUpperCase(), 32, 54);
      ctx.fillStyle = col; ctx.font = '700 54px ' + FONT.display;
      ctx.fillText(stage === 'done' ? '✓ Estável' : stage === 'task' ? 'Em correção' : '! Incidente', 32, 170);
      ctx.fillStyle = '#EEF0FF'; ctx.font = '600 40px ' + FONT.body; ctx.fillText(inc.sub, 32, 240);
      ctx.fillStyle = '#AAB1D0'; ctx.font = '400 30px ' + FONT.body;
      var lines = stage === 'decide' ? ['Aproxime-se e aperte E', 'para analisar.'] : stage === 'task' ? wrapText(ctx, self.taskHint(inc.id), w - 64).slice(0, 3) : ['Aprendizado registrado.'];
      lines.forEach(function (l, i) { ctx.fillText(l, 32, 310 + i * 42); });
    });
    var screen = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.86), new THREE.MeshBasicMaterial({ map: scr.tex }));
    screen.position.set(0, 1.62, -0.22); screen.rotation.x = -0.1; g.add(screen);
    this.box(1.58, 0.94, 0.05, this.mat('metal'), 0, 1.62, -0.26, g).rotation.x = -0.1;
    var pad = new THREE.Mesh(new THREE.RingGeometry(1.15, 1.25, 48), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 }));
    pad.rotation.x = -Math.PI / 2; pad.position.set(0, 0.012, 0.9); g.add(pad);
    var alert = this.ctex(128, 128, function (ctx, w, h, p) {
      var s = self.state ? self.state.inc[inc.id] : null, stage = s ? s.stage : 'decide';
      var col = stage === 'done' ? p.good : stage === 'task' ? p.purple : p.bad;
      ctx.save(); ctx.translate(w / 2, h / 2); ctx.rotate(Math.PI / 4);
      roundRect(ctx, -38, -38, 76, 76, 14); ctx.fillStyle = p.surface; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = col; ctx.stroke();
      ctx.rotate(-Math.PI / 4); ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = '800 58px ' + FONT.display; ctx.fillText(stage === 'done' ? '✓' : stage === 'task' ? String(inc.n) : '!', 0, 4);
      ctx.restore();
    });
    var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: alert.tex, transparent: true, depthWrite: false }));
    sp.scale.set(0.42, 0.42, 1); sp.position.set(0, 2.55, -0.1); g.add(sp);
    this.anim.push(function (t) { sp.position.y = 2.55 + Math.sin(t * 2.4 + inc.n) * 0.07; });
    var sw = Math.abs(Math.sin(ry)) > 0.5;
    this.obBox(x, z, sw ? 0.85 : 1.8, sw ? 1.8 : 0.85);
    this.addInter({
      meshes: [desk, screen, kb],
      prompt: function () {
        var st = self.state.inc[inc.id];
        if (st.stage === 'decide') return { text: 'Analisar incidente ' + inc.n + ': ' + inc.sub, can: true };
        if (st.stage === 'task') return { text: 'Rever objetivo do incidente', can: true };
        return { text: 'Terminal estável', can: false };
      },
      use: function () {
        var st = self.state.inc[inc.id];
        if (st.stage === 'decide') self.openIncident(inc.id);
        else if (st.stage === 'task') self.toast('<b>Missão: ' + esc(inc.short) + '</b>' + esc(inc.task), 'info', 6000);
      }
    });
    this.terms = this.terms || {};
    this.terms[inc.id] = { scr: scr, alert: alert, pad: pad };
  };

  /* ----- incidente 1: afirmações, verificador e cestos ----- */
  G.buildInfo = function () {
    var self = this;
    this.buildTerminal(byId('info'), -4.6, -HZ + 0.75, 0);
    this.cyl(0.4, 0.5, 0.9, this.mat('desk'), -2.6, 0.45, -5.0);
    this.cyl(0.42, 0.42, 0.04, this.glow('purple', 1.4), -2.6, 0.92, -5.0);
    this.obCirc(-2.6, -5.0, 0.6);
    var lab = this.label('Rascunho da IA', 'afirmações'); lab.position.set(-2.6, 2.35, -5.0); this.scene.add(lab);
    this.cards = {};
    CARDS.forEach(function (c, i) {
      var tex = self.ctex(512, 320, function (ctx, w, h, p) {
        var s = self.state ? self.state.cards[c.id] : {};
        roundRect(ctx, 6, 6, w - 12, h - 12, 26); ctx.fillStyle = p.surface; ctx.fill();
        ctx.lineWidth = 8; ctx.strokeStyle = s.scanned ? p.blue : p.purple; ctx.stroke();
        ctx.fillStyle = s.scanned ? p.blue : p.purpleText; ctx.font = '500 26px ' + FONT.mono;
        ctx.fillText(s.scanned ? 'VERIFICADA' : 'NÃO VERIFICADA', 32, 52);
        ctx.fillStyle = p.ink; ctx.font = '600 32px ' + FONT.body;
        wrapText(ctx, c.text, w - 64).slice(0, 4).forEach(function (l, k) { ctx.fillText(l, 32, 104 + k * 42); });
        if (s.scanned) { ctx.fillStyle = p.inkSoft; ctx.font = '400 22px ' + FONT.body; ctx.fillText(short('Busca: ' + c.result, 44), 32, 288); }
      });
      var face = new THREE.MeshBasicMaterial({ map: tex.tex });
      var m = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.31, 0.02), [self.mat('desk'), self.mat('desk'), self.mat('desk'), self.mat('desk'), face, face]);
      var bx = -2.6 + (i % 2 ? 0.28 : -0.28), by = 1.25 + (i < 2 ? 0.36 : 0);
      m.position.set(bx, by, -5.0); m.rotation.y = 0.15; self.scene.add(m);
      m.visible = false;
      self.anim.push(function (t) { if (m.visible) { m.position.y = by + Math.sin(t * 2 + i) * 0.03; m.rotation.y = 0.15 + Math.sin(t + i) * 0.12; } });
      self.cards[c.id] = { mesh: m, tex: tex, data: c };
      self.addInter({
        meshes: [m],
        enabled: function () { return m.visible; },
        prompt: function () { return self.inv.length >= 3 ? { text: 'Mãos cheias (máx. 3 itens)', can: false } : { text: 'Pegar afirmação', can: true }; },
        use: function () { self.pickUp({ kind: 'card', id: c.id, label: short(c.text, 38), mesh: m }); }
      });
    });
    // verificador de fontes
    var vx = -HX + 0.65, vz = -3.0;
    this.box(0.8, 1.0, 1.0, this.mat('desk'), vx, 0.5, vz);
    var ring = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.03, 10, 40), this.glow('blue', 2));
    ring.rotation.x = Math.PI / 2; ring.position.set(vx, 1.05, vz); this.scene.add(ring);
    var ringHit = this.box(0.7, 0.12, 0.7, new THREE.MeshBasicMaterial({ visible: false }), vx, 1.05, vz);
    this.verTex = this.ctex(640, 400, function (ctx, w, h, p) {
      ctx.fillStyle = '#0B0F1C'; ctx.fillRect(0, 0, w, h); ctx.strokeStyle = p.blue; ctx.lineWidth = 10; ctx.strokeRect(5, 5, w - 10, h - 10);
      ctx.fillStyle = '#7AA6FF'; ctx.font = '500 30px ' + FONT.mono; ctx.fillText('VERIFICADOR DE FONTES', 30, 56);
      var last = self.state && self.state.lastScan;
      ctx.fillStyle = '#EEF0FF'; ctx.font = '600 30px ' + FONT.body;
      if (!last) { ctx.fillStyle = '#AAB1D0'; wrapText(ctx, 'Traga uma afirmação e aperte E para buscar fontes.', w - 60).forEach(function (l, i) { ctx.fillText(l, 30, 130 + i * 40); }); return; }
      wrapText(ctx, '"' + last.text + '"', w - 60).slice(0, 3).forEach(function (l, i) { ctx.fillText(l, 30, 120 + i * 40); });
      ctx.fillStyle = '#7AA6FF'; ctx.font = '500 26px ' + FONT.mono; ctx.fillText('RESULTADO DA BUSCA', 30, 270);
      ctx.fillStyle = '#EEF0FF'; ctx.font = '400 28px ' + FONT.body;
      wrapText(ctx, last.result, w - 60).slice(0, 2).forEach(function (l, i) { ctx.fillText(l, 30, 314 + i * 38); });
    });
    var vs = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 0.78), new THREE.MeshBasicMaterial({ map: this.verTex.tex }));
    vs.position.set(-HX + 0.03, 1.85, vz); vs.rotation.y = Math.PI / 2; this.scene.add(vs);
    var lv = this.label('Verificador de fontes', null, 'blue'); lv.position.set(vx + 0.2, 2.55, vz); this.scene.add(lv);
    this.obBox(vx, vz, 0.9, 1.1);
    this.addInter({
      meshes: [ringHit, vs],
      enabled: function () { return self.state.inc.info.stage === 'task'; },
      prompt: function () {
        var c = self.inv.filter(function (i) { return i.kind === 'card' && !self.state.cards[i.id].scanned; })[0];
        return c ? { text: 'Verificar: "' + short(c.label, 30) + '"', can: true } : { text: 'Verificador: traga uma afirmação não verificada', can: false };
      },
      use: function () { self.scanCard(); }
    });
    // cestos
    [['ok', 'Confirmado', 'good', -1.0], ['no', 'Sem fonte', 'bad', 0.9]].forEach(function (b) {
      var bz = b[3], bx2 = -HX + 0.6;
      var bin = self.cyl(0.36, 0.3, 0.8, self.mat('desk'), bx2, 0.4, bz);
      var rim = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.035, 10, 40), self.glow(b[2], 2.2));
      rim.rotation.x = Math.PI / 2; rim.position.set(bx2, 0.81, bz); self.scene.add(rim);
      var l = self.label(b[1], b[0] === 'ok' ? 'há fontes' : 'remover da matéria', b[2]); l.position.set(bx2 + 0.1, 1.45, bz); self.scene.add(l);
      self.obCirc(bx2, bz, 0.45);
      self.addInter({
        meshes: [bin, rim],
        enabled: function () { return self.state.inc.info.stage === 'task'; },
        prompt: function () {
          var c = self.inv.filter(function (i) { return i.kind === 'card' && self.state.cards[i.id].scanned; })[0];
          if (c) return { text: 'Jogar em "' + b[1] + '": ' + short(c.label, 26), can: true };
          if (self.inv.some(function (i) { return i.kind === 'card'; })) return { text: 'Verifique a afirmação antes de decidir', can: false };
          return { text: 'Cesto ' + b[1], can: false };
        },
        use: function () { self.binCard(b[0], b[1]); }
      });
    });
  };

  /* ----- incidente 2: prateleira de fotos e dados de treino ----- */
  G.buildIdent = function () {
    var self = this;
    this.buildTerminal(byId('ident'), 4.6, -HZ + 0.75, 0);
    var tx = 6.5, tz = -3.4;
    this.box(1.5, 0.3, 1.1, this.mat('desk'), tx, 0.15, tz);
    var plate = this.box(1.4, 0.04, 1.0, this.glow('purple', 0.35), tx, 0.32, tz);
    this.bars = {};
    ['clara', 'media', 'escura'].forEach(function (k, i) {
      var m = new THREE.Mesh(new THREE.BoxGeometry(0.26, 1, 0.26), new THREE.MeshStandardMaterial({ color: TONES[k].color, roughness: 0.5 }));
      m.position.set(tx - 0.42 + i * 0.42, 0.34, tz); self.scene.add(m);
      self.bars[k] = m;
      var l = self.label(TONES[k].label.replace('Pele ', '').replace(/^./, function (c) { return c.toUpperCase(); })); l.scale.multiplyScalar(0.36); l.position.set(tx - 0.42 + i * 0.42, 0.55, tz + 0.62); self.scene.add(l);
    });
    var target = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.025), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8, side: THREE.DoubleSide }));
    target.position.set(tx, 0.34 + BARS_TARGET * 0.28, tz + 0.15); this.scene.add(target); this.barTarget = target;
    var lt = this.label('Dados de treino', 'meta: barras iguais', 'purple'); lt.position.set(tx, 2.45, tz); this.scene.add(lt);
    this.obBox(tx, tz, 1.6, 1.2);
    this.addInter({
      meshes: [plate].concat(Object.keys(this.bars).map(function (k) { return self.bars[k]; })),
      enabled: function () { return self.state.inc.ident.stage === 'task'; },
      prompt: function () {
        var c = self.inv.filter(function (i) { return i.kind === 'cube'; })[0];
        return c ? { text: 'Adicionar ao treino: ' + c.label, can: true } : { text: 'Dados de treino: traga fotos da prateleira', can: false };
      },
      use: function () { self.feedCube(); }
    });
    // prateleira
    var sx = HX - 0.35, sz0 = -0.9;
    for (var lv = 0; lv < 3; lv++) this.box(0.6, 0.04, 3.0, this.mat('metal'), sx, 0.45 + lv * 0.55, sz0 + 1.4);
    this.box(0.6, 1.7, 0.05, this.mat('metal'), sx, 0.85, sz0 - 0.08);
    this.box(0.6, 1.7, 0.05, this.mat('metal'), sx, 0.85, sz0 + 2.88);
    var ls = this.label('Banco de fotos', 'com e sem autorização'); ls.position.set(sx - 0.2, 2.4, sz0 + 1.4); this.scene.add(ls);
    this.obBox(sx, sz0 + 1.4, 0.7, 3.1);
    this.cubes = {};
    CUBES.forEach(function (c, i) {
      var tex = self.ctex(256, 256, function (ctx, w, h, p) {
        ctx.fillStyle = TONES[c.tone].color; ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.arc(w / 2, 62, 30, 0, 7); ctx.fill();
        ctx.beginPath(); ctx.ellipse(w / 2, 136, 56, 36, 0, Math.PI, 0); ctx.fill();
        roundRect(ctx, 16, 150, w - 32, 90, 16); ctx.fillStyle = p.surface; ctx.fill();
        ctx.fillStyle = p.ink; ctx.font = '600 28px ' + FONT.body; ctx.textAlign = 'center'; ctx.fillText(TONES[c.tone].label, w / 2, 186);
        ctx.fillStyle = c.ok ? p.good : p.bad; ctx.font = '600 21px ' + FONT.mono; ctx.fillText(c.ok ? '✓ AUTORIZADA' : '✗ SEM AUTORIZAÇÃO', w / 2, 222);
      });
      var m = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.34, 0.34), new THREE.MeshStandardMaterial({ map: tex.tex, roughness: 0.6 }));
      var home = new THREE.Vector3(sx, 0.64 + Math.floor(i / 3) * 0.55, sz0 + 0.4 + (i % 3) * 1.0);
      m.position.copy(home); self.scene.add(m);
      self.cubes[c.id] = { mesh: m, home: home, data: c };
      self.addInter({
        meshes: [m],
        enabled: function () { return m.visible; },
        prompt: function () {
          var lbl = TONES[c.tone].label + (c.ok ? ' · autorizada' : ' · sem autorização');
          if (self.state.inc.ident.stage !== 'task') return { text: 'Foto: ' + lbl, can: false };
          return self.inv.length >= 3 ? { text: 'Mãos cheias (máx. 3 itens)', can: false } : { text: 'Pegar foto: ' + lbl, can: true };
        },
        use: function () { self.pickUp({ kind: 'cube', id: c.id, label: TONES[c.tone].label + (c.ok ? '' : ' (sem aut.)'), mesh: m }); }
      });
    });
  };

  /* ----- incidente 3: esteira, cofre e botão ----- */
  G.buildPriv = function () {
    var self = this;
    this.buildTerminal(byId('priv'), HX - 0.75, 3.4, -Math.PI / 2);
    var bz = HZ - 0.85, bx0 = 1.6, bx1 = HX - 0.3, bw = bx1 - bx0, bcx = (bx0 + bx1) / 2;
    this.box(bw, 0.7, 0.9, this.mat('metal'), bcx, 0.35, bz);
    this.beltTex = this.ctex(256, 64, function (ctx, w, h, p) {
      ctx.fillStyle = p.room.slot; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = p.room.seam; for (var i = 0; i < 8; i++) ctx.fillRect(i * 32, 0, 10, h);
    });
    this.beltTex.tex.wrapS = THREE.RepeatWrapping; this.beltTex.tex.repeat.set(bw * 2, 1);
    var belt = new THREE.Mesh(new THREE.PlaneGeometry(bw, 0.8), new THREE.MeshStandardMaterial({ map: this.beltTex.tex, roughness: 0.7 }));
    belt.rotation.x = -Math.PI / 2; belt.position.set(bcx, 0.705, bz); this.scene.add(belt);
    this.obBox(bcx, bz, bw, 1.0);
    var portal = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.06, 12, 48), this.glow('bad', 2.4));
    portal.position.set(HX - 0.05, 1.15, bz); portal.rotation.y = Math.PI / 2; this.scene.add(portal);
    var lp = this.label('Servidor externo', 'chatbot-gratis.exemplo', 'bad'); lp.position.set(HX - 0.6, 2.25, bz); this.scene.add(lp);
    var lb = this.label('Esteira de envio', 'pausada'); lb.position.set(bcx - 0.4, 1.75, bz); this.scene.add(lb);
    this.packets = {};
    PACKETS.forEach(function (d, i) {
      var tex = self.ctex(256, 256, function (ctx, w, h, p) {
        ctx.fillStyle = p.surface2; ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = p.purple; ctx.lineWidth = 10; ctx.strokeRect(5, 5, w - 10, h - 10);
        ctx.fillStyle = p.purpleText; ctx.font = '500 24px ' + FONT.mono; ctx.textAlign = 'center'; ctx.fillText('PACOTE ' + (i + 1), w / 2, 52);
        ctx.fillStyle = p.ink; ctx.font = '600 34px ' + FONT.body;
        wrapText(ctx, d.text, w - 36).slice(0, 3).forEach(function (l, k) { ctx.fillText(l, w / 2, 118 + k * 42); });
      });
      var m = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.4, 0.46), new THREE.MeshStandardMaterial({ map: tex.tex, roughness: 0.6 }));
      var home = new THREE.Vector3(bx0 + 0.6 + i * ((bw - 1.4) / 5), 0.91, bz);
      m.position.copy(home); self.scene.add(m);
      self.packets[d.id] = { mesh: m, home: home, data: d };
      self.addInter({
        meshes: [m],
        enabled: function () { return m.visible && !self.state.beltRunning; },
        prompt: function () {
          if (self.state.inc.priv.stage !== 'task') return { text: 'Pacote: ' + d.text, can: false };
          return self.inv.length >= 3 ? { text: 'Mãos cheias (máx. 3 itens)', can: false } : { text: 'Pegar pacote: ' + d.text, can: true };
        },
        use: function () { self.pickUp({ kind: 'packet', id: d.id, label: d.text, mesh: m }); }
      });
    });
    this.addInter({
      meshes: [belt],
      enabled: function () { return self.state.inc.priv.stage === 'task' && !self.state.beltRunning; },
      prompt: function () {
        var pk = self.inv.filter(function (i) { return i.kind === 'packet'; })[0];
        return pk ? { text: 'Devolver à esteira: ' + pk.label, can: true } : { text: 'Esteira de envio (pausada)', can: false };
      },
      use: function () { var pk = self.inv.filter(function (i) { return i.kind === 'packet'; })[0]; if (pk) self.returnItem(pk, true); }
    });
    // cofre
    var vx = 0.0, vz = HZ - 0.75;
    var vault = this.box(1.1, 1.2, 0.9, this.mat('metal'), vx, 0.6, vz);
    var door = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.04, 10, 40), this.glow('purple', 2));
    door.position.set(vx, 0.65, vz - 0.47); this.scene.add(door);
    var lv = this.label('Cofre seguro', 'dados pessoais', 'purple'); lv.position.set(vx, 1.75, vz); this.scene.add(lv);
    this.obBox(vx, vz, 1.2, 1.0);
    this.addInter({
      meshes: [vault, door],
      enabled: function () { return self.state.inc.priv.stage === 'task'; },
      prompt: function () {
        var pk = self.inv.filter(function (i) { return i.kind === 'packet'; })[0];
        return pk ? { text: 'Guardar no cofre: ' + pk.label, can: true } : { text: 'Cofre seguro: traga pacotes com dados pessoais', can: false };
      },
      use: function () { self.vaultPacket(); }
    });
    // botão
    var bx = 1.0, bzz = 4.7;
    this.cyl(0.22, 0.28, 1.0, this.mat('desk'), bx, 0.5, bzz);
    var btn = this.cyl(0.16, 0.18, 0.1, this.glow('bad', 1.8), bx, 1.05, bzz);
    var lbtn = this.label('Retomar envio', null, 'bad'); lbtn.scale.multiplyScalar(0.8); lbtn.position.set(bx, 1.55, bzz); this.scene.add(lbtn);
    this.obCirc(bx, bzz, 0.35);
    this.addInter({
      meshes: [btn],
      enabled: function () { return self.state.inc.priv.stage === 'task' && !self.state.beltRunning; },
      prompt: function () { return { text: 'Apertar: Retomar envio', can: true }; },
      use: function () { self.pressSend(); }
    });
    this.anim.push(function (t, dt) {
      if (!self.state || !self.state.beltRunning) return;
      self.beltTex.tex.offset.x -= dt * 1.2;
      PACKETS.forEach(function (d) {
        var o = self.packets[d.id];
        if (!o.mesh.visible || d.personal) return;
        o.mesh.position.x += dt * 1.1;
        if (o.mesh.position.x > HX - 0.2) o.mesh.visible = false;
      });
    });
  };

  /* ----- incidente 4: holograma, sinais e telefone ----- */
  G.buildDeep = function () {
    var self = this;
    this.buildTerminal(byId('deep'), -HX + 0.75, 3.0, Math.PI / 2);
    var hx = -4.4, hz = 4.3;
    this.cyl(0.75, 0.85, 0.12, this.mat('metal'), hx, 0.06, hz);
    this.cyl(0.7, 0.7, 0.02, this.glow('purple', 1.6), hx, 0.13, hz);
    this.obCirc(hx, hz, 0.85);
    var fig = new THREE.Group(); fig.position.set(hx, 0.14, hz); fig.rotation.y = Math.PI / 2; this.scene.add(fig);
    var hm = new THREE.MeshBasicMaterial({ color: 0x9b7bff, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending });
    this.holoMat = hm;
    var body = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 0.62, 6, 16), hm); body.position.y = 1.0; fig.add(body);
    var head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 16), hm); head.position.y = 1.62; fig.add(head);
    [-1, 1].forEach(function (s) {
      var arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.5, 4, 8), hm); arm.position.set(s * 0.33, 1.05, 0); arm.rotation.z = s * 0.15; fig.add(arm);
      var leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.55, 4, 8), hm); leg.position.set(s * 0.12, 0.35, 0); fig.add(leg);
    });
    var cone = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.7, 2.0, 32, 1, true), new THREE.MeshBasicMaterial({ color: 0x9b7bff, transparent: true, opacity: 0.07, side: THREE.DoubleSide, depthWrite: false }));
    cone.position.y = 0.95; fig.add(cone);
    var lh = this.label('Diretora Marta (chamada)', 'ao vivo', 'bad'); lh.position.set(hx, 2.3, hz); this.scene.add(lh);
    this.anim.push(function (t) {
      hm.opacity = 0.42 + Math.sin(t * 9) * 0.05 + (Math.random() < 0.02 ? 0.2 : 0);
      fig.position.y = 0.14 + Math.sin(t * 1.3) * 0.02;
    });
    // luminária (fonte de luz da cena)
    var lx = -HX + 0.6, lz = HZ - 0.6;
    this.cyl(0.03, 0.03, 1.8, this.mat('metal'), lx, 0.9, lz);
    var bulb = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), new THREE.MeshBasicMaterial({ color: 0xfff4d6 }));
    bulb.position.set(lx, 1.85, lz); this.scene.add(bulb);
    var lamp = new THREE.PointLight(0xfff0d0, 2, 4, 2); lamp.position.set(lx, 1.85, lz); this.scene.add(lamp);
    this.obCirc(lx, lz, 0.25);
    // sinal 1: rosto com falhas
    var s1 = new THREE.Group(); s1.position.set(0.17, 1.64, 0); fig.add(s1);
    var s1mats = [];
    for (var k = 0; k < 4; k++) {
      var mm = new THREE.MeshBasicMaterial({ color: 0xff3d9a, transparent: true, opacity: 0.8, depthWrite: false }); s1mats.push(mm);
      var b = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.06 + k * 0.02, 0.12), mm); b.position.set(0.02 * k, (k - 1.5) * 0.06, (k % 2 ? 0.04 : -0.04)); s1.add(b);
    }
    var hit1 = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), new THREE.MeshBasicMaterial({ visible: false })); s1.add(hit1);
    // sinal 2: sombra apontando para a luminária
    var shadow = new THREE.Mesh(new THREE.CircleGeometry(0.5, 32), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.45, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2; shadow.scale.set(0.6, 1.8, 1);
    var dir = new THREE.Vector2(lx - hx, lz - hz).normalize();
    shadow.position.set(hx + dir.x * 1.35, 0.015, hz + dir.y * 1.35);
    shadow.rotation.z = Math.atan2(dir.x, dir.y);
    this.scene.add(shadow);
    // sinal 3: painel de áudio atrás do holograma
    var wave = this.ctex(512, 256, function (ctx, w, h) {
      ctx.fillStyle = 'rgba(11,15,28,.85)'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#ff3d9a'; ctx.lineWidth = 4; ctx.strokeRect(2, 2, w - 4, h - 4);
      ctx.font = '500 24px ' + FONT.mono; ctx.fillStyle = '#ff8ac8'; ctx.fillText('ÁUDIO × BOCA', 20, 38);
      [['#7AA6FF', 90, 0], ['#ff3d9a', 170, 46]].forEach(function (r) {
        ctx.strokeStyle = r[0]; ctx.lineWidth = 4; ctx.beginPath();
        for (var x = 20; x < w - 20; x += 4) { var y = r[1] + Math.sin((x - r[2]) / 18) * 22 * Math.sin((x - r[2]) / 90); if (x === 20) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
        ctx.stroke();
      });
      ctx.fillStyle = '#EEF0FF'; ctx.font = '600 24px ' + FONT.body; ctx.fillText('atraso: 0,8 s', w - 190, 236);
    });
    var wp = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.45), new THREE.MeshBasicMaterial({ map: wave.tex, transparent: true }));
    wp.position.set(0, 1.35, -0.55); wp.rotation.y = Math.PI; fig.add(wp);
    this.signs = { s1: { obj: s1, hits: [hit1] }, s2: { obj: shadow, hits: [shadow] }, s3: { obj: wp, hits: [wp] } };
    [s1, shadow, wp].forEach(function (o) { o.visible = false; });
    SIGNS.forEach(function (sg) {
      var o = self.signs[sg.id];
      self.addInter({
        meshes: o.hits,
        enabled: function () { return o.obj.visible; },
        prompt: function () { return self.state.signs[sg.id] ? { text: 'Sinal registrado: ' + sg.title, can: false } : { text: 'Examinar detalhe estranho', can: true }; },
        use: function () { self.findSign(sg); }
      });
    });
    this.anim.push(function (t) {
      if (!s1.visible) return;
      s1.children.forEach(function (c, i) { if (c !== hit1) c.position.x = 0.02 * i + Math.sin(t * 23 + i * 2) * 0.03; });
      s1mats.forEach(function (m) { m.opacity = self.state.signs.s1 ? 0.3 : 0.5 + Math.random() * 0.5; });
    });
    // telefone interno
    var px = -2.3, pz = HZ - 0.6;
    this.box(0.8, 0.85, 0.6, this.mat('desk'), px, 0.425, pz);
    var phone = this.box(0.32, 0.1, 0.22, this.glow('good', 0.7), px, 0.9, pz);
    var phoneHit = this.box(0.7, 0.4, 0.5, new THREE.MeshBasicMaterial({ visible: false }), px, 1.0, pz);
    var lph = this.label('Telefone interno', 'canal confiável', 'good'); lph.position.set(px, 1.65, pz); this.scene.add(lph);
    this.obBox(px, pz, 0.9, 0.7);
    this.addInter({
      meshes: [phone, phoneHit],
      enabled: function () { return self.state.inc.deep.stage === 'task'; },
      prompt: function () { return { text: 'Ligar para a diretora pelo telefone interno', can: true }; },
      use: function () { self.callPhone(); }
    });
  };

  /* ------------------------------------------------------------- TEMA */
  G.readPalette = function () {
    var cs = getComputedStyle(this.el);
    var g = function (n, f) { var v = cs.getPropertyValue(n).trim(); return v || f; };
    var p = {
      bg: g('--cia-bg', '#EDF1FF'), surface: g('--cia-surface', '#FFFFFF'), surface2: g('--cia-surface-2', '#E2E6FB'),
      line: g('--cia-line', '#D3D8F3'), ink: g('--cia-ink', '#1E2335'), inkSoft: g('--cia-ink-soft', '#4E5576'),
      purple: g('--cia-purple', '#8A4FFF'), purpleText: g('--cia-purple-text', '#6B33EA'), purpleSoft: g('--cia-purple-soft', '#E6DCFF'),
      blue: g('--cia-blue', '#3E7BFA'), good: g('--cia-good', '#16A36A'), bad: g('--cia-bad', '#E0435C')
    };
    var hsl = {}; new THREE.Color(p.surface).getHSL(hsl);
    p.dark = hsl.l < 0.5;
    p.room = p.dark ? {
      floor: '#161C2D', grid: 'rgba(185,157,255,.16)', wall: '#1F2639', panel: '#252D43', seam: '#2F3852',
      ceil: '#0F1322', trim: '#323B57', desk: '#2B3450', metal: '#3A4462', rack: '#232B42', slot: '#11162A'
    } : {
      floor: '#DCE2F8', grid: 'rgba(107,51,234,.14)', wall: '#F2F4FF', panel: '#E6EAFB', seam: '#CDD4F2',
      ceil: '#FAFBFF', trim: '#C9D1F1', desk: '#FFFFFF', metal: '#B4BDE2', rack: '#3A4466', slot: '#1D2436'
    };
    return p;
  };

  G.applyTheme = function () {
    var p = this.pal = this.readPalette();
    this.scene.background = new THREE.Color(p.room.ceil);
    this.scene.fog = new THREE.Fog(p.room.ceil, 14, 34);
    this.hemi.color.set(p.dark ? '#c9c4ff' : '#ffffff');
    this.hemi.groundColor.set(p.dark ? '#141a2a' : '#c9d1f1');
    this.hemi.intensity = p.dark ? 0.75 : 1.4;
    this.amb.intensity = p.dark ? 0.25 : 0.55;
    this.sun.intensity = p.dark ? 0.25 : 0.7;
    (this.mats || []).forEach(function (m) { m.color.set(p.room[m.userData.key] || p.room.desk); });
    if (this.holoMat) { this.holoMat.blending = p.dark ? THREE.AdditiveBlending : THREE.NormalBlending; this.holoMat.needsUpdate = true; }
    this.updateLevelColors();
    this.redrawAll();
  };

  G.levelColor = function () {
    var lv = this.state ? this.state.resolved : 0, p = this.pal;
    return [p.bad, p.purple, p.purple, p.blue, p.good][lv];
  };

  G.updateLevelColors = function () {
    var p = this.pal, self = this; if (!p) return;
    var amb = this.levelColor(); p.ambColor = amb;
    var col = { amb: amb, purple: p.purple, blue: p.blue, good: p.good, bad: p.bad };
    (this.glows || []).forEach(function (m) { var c = new THREE.Color(col[m.userData.glow] || amb); m.color.copy(c).multiplyScalar(0.3); m.emissive.copy(c); });
    var ambC = new THREE.Color(amb);
    this.fill.forEach(function (l, i) { l.color.set('#ffffff').lerp(ambC, i === 4 ? 0.8 : 0.2); l.intensity = p.dark ? 7 : 4; });
    if (this.coreIco) this.coreIco.material.color.set(amb);
    if (this.coreBeam) this.coreBeam.material.color.set(amb);
    if (this.barTarget) this.barTarget.material.color.set(p.purple);
    Object.keys(this.terms || {}).forEach(function (k) {
      var st = self.state ? self.state.inc[k].stage : 'decide';
      self.terms[k].pad.material.color.set(st === 'done' ? p.good : st === 'task' ? p.purple : p.bad);
    });
    if (this.stabTex) this.stabTex.redraw();
    if (this.bigTex) this.bigTex.redraw();
  };

  /* ------------------------------------------------------------- ESTADO */
  G.reset = function () {
    var self = this;
    this.state = { phase: 'intro', score: 0, resolved: 0, inc: {}, cards: {}, bars: Object.assign({}, BARS_START), signs: {}, beltRunning: false, lastScan: null, called: false };
    INCIDENTS.forEach(function (inc) { self.state.inc[inc.id] = { stage: 'decide', tried: [], chosen: null, decisionPts: 0, actionPts: 0 }; });
    CARDS.forEach(function (c) { self.state.cards[c.id] = { scanned: false, placed: false }; self.cards[c.id].mesh.visible = false; });
    CUBES.forEach(function (c) { var o = self.cubes[c.id]; o.mesh.visible = true; o.mesh.position.copy(o.home); });
    PACKETS.forEach(function (d) { var o = self.packets[d.id]; o.mesh.visible = true; o.mesh.position.copy(o.home); o.vaulted = false; });
    Object.keys(this.signs).forEach(function (k) { self.signs[k].obj.visible = false; });
    this.holoMat.color.set(0x9b7bff);
    this.beltTex.tex.offset.x = 0;
    this.inv = [];
    this.pos.set(0, 0, 3.9); this.yaw = 0; this.pitch = -0.08;
    this.updateBars();
    this.$('[data-score]').textContent = '0';
    this.updateLevelColors();
    this.redrawAll();
    this.renderHud();
  };

  G.start = function () {
    this.reset();
    this.state.phase = 'play';
    this.el.setAttribute('data-phase', 'play');
    this.closeLayer();
    this.sound.play('ok');
    this.lock();
    this.toast('<b>Bem-vindo(a) à central</b>Siga os alertas vermelhos e ' + (this.touch ? 'toque em Usar' : 'aperte E') + ' nos terminais para analisar cada incidente.', 'info', 5000);
    if (typeof this.opts.onStart === 'function') this.opts.onStart();
  };

  G.addPts = function (id, n) {
    var st = this.state.inc[id];
    var before = st.actionPts;
    st.actionPts = Math.max(0, st.actionPts + n);
    var d = st.actionPts - before;
    this.state.score += d;
    this.$('[data-score]').textContent = this.state.score;
    if (d > 0) { var b = this.$('[data-score-box]'); b.classList.remove('is-bump'); void b.offsetWidth; b.classList.add('is-bump'); }
  };

  /* ------------------------------------------------------------- AÇÕES DOS PUZZLES */
  G.pickUp = function (item) {
    if (this.inv.length >= 3) return;
    item.mesh.visible = false;
    this.inv.push(item);
    this.sound.play('pick');
    this.renderHud();
  };
  G.returnItem = function (item, sound) {
    this.inv = this.inv.filter(function (i) { return i !== item; });
    if (item.kind === 'cube') { var c = this.cubes[item.id]; c.mesh.position.copy(c.home); c.mesh.visible = true; }
    if (item.kind === 'packet') { var p = this.packets[item.id]; p.mesh.position.copy(p.home); p.mesh.visible = true; }
    if (item.kind === 'card') { this.cards[item.id].mesh.visible = true; }
    if (sound) this.sound.play('pick');
    this.renderHud();
  };
  G.dropLast = function () {
    var it = this.inv[this.inv.length - 1];
    if (!it) return;
    this.returnItem(it, true);
    this.toast('<b>Item devolvido</b>' + esc(it.label) + ' voltou para o lugar de origem.', 'info', 2200);
  };
  G.removeItem = function (item) { this.inv = this.inv.filter(function (i) { return i !== item; }); this.renderHud(); };

  G.scanCard = function () {
    var self = this;
    var it = this.inv.filter(function (i) { return i.kind === 'card' && !self.state.cards[i.id].scanned; })[0];
    if (!it) return;
    var c = this.cards[it.id].data;
    this.state.cards[it.id].scanned = true;
    this.state.lastScan = c;
    this.cards[it.id].tex.redraw();
    this.verTex.redraw();
    this.sound.play('scan');
    this.toast('<b>Resultado da busca</b>"' + esc(short(c.text, 60)) + '": ' + esc(c.result), 'info', 5500);
    this.renderHud();
  };
  G.binCard = function (zone, name) {
    var self = this;
    var it = this.inv.filter(function (i) { return i.kind === 'card' && self.state.cards[i.id].scanned; })[0];
    if (!it) return;
    var c = this.cards[it.id].data, cs = this.state.cards[it.id];
    if (c.zone === zone) {
      cs.placed = true; this.removeItem(it);
      this.addPts('info', OK_PTS); this.sound.play('ok');
      this.toast('<b>Certo! +' + OK_PTS + '</b>' + esc(c.why), 'good');
      if (CARDS.every(function (k) { return self.state.cards[k.id].placed; })) this.completeIncident('info');
    } else {
      this.addPts('info', MISS_PTS); this.sound.play('bad');
      this.toast('<b>Não vai em "' + esc(name) + '" (' + MISS_PTS + ')</b>Releia o resultado da busca: ' + esc(c.result), 'bad', 5000);
    }
    this.renderHud();
  };

  G.updateBars = function () {
    var self = this;
    Object.keys(this.bars || {}).forEach(function (k) {
      var n = self.state.bars[k], m = self.bars[k];
      m.scale.y = Math.max(0.01, n * 0.28); m.position.y = 0.34 + n * 0.14;
    });
  };
  G.feedCube = function () {
    var self = this;
    var it = this.inv.filter(function (i) { return i.kind === 'cube'; })[0];
    if (!it) return;
    var c = this.cubes[it.id].data;
    if (!c.ok) {
      this.addPts('ident', MISS_PTS); this.sound.play('bad'); this.returnItem(it);
      this.toast('<b>Foto recusada (' + MISS_PTS + ')</b>Sem autorização da pessoa, a foto não pode ser usada para treinar a IA. Ela voltou para a prateleira.', 'bad', 5200);
      return;
    }
    if (c.tone === 'clara') {
      this.addPts('ident', MISS_PTS); this.sound.play('bad'); this.returnItem(it);
      this.toast('<b>Foto recusada (' + MISS_PTS + ')</b>Já há fotos de pele clara demais: isso aumentaria o desequilíbrio. Ela voltou para a prateleira.', 'bad', 5200);
      return;
    }
    if (this.state.bars[c.tone] >= BARS_TARGET) {
      this.returnItem(it);
      this.toast('<b>Essa barra já está na meta</b>Equilibre a outra barra.', 'info');
      return;
    }
    this.removeItem(it);
    this.state.bars[c.tone]++;
    this.updateBars();
    this.addPts('ident', OK_PTS); this.sound.play('ok');
    this.toast('<b>Foto adicionada! +' + OK_PTS + '</b>' + TONES[c.tone].label + ': ' + this.state.bars[c.tone] + '/' + BARS_TARGET, 'good', 2600);
    if (this.state.bars.media >= BARS_TARGET && this.state.bars.escura >= BARS_TARGET) {
      this.inv.filter(function (i) { return i.kind === 'cube'; }).forEach(function (i) { self.returnItem(i); });
      this.completeIncident('ident');
    }
    this.renderHud();
  };

  G.vaultPacket = function () {
    var it = this.inv.filter(function (i) { return i.kind === 'packet'; })[0];
    if (!it) return;
    var d = this.packets[it.id].data;
    if (d.personal) {
      this.removeItem(it); this.packets[it.id].vaulted = true;
      this.addPts('priv', OK_PTS); this.sound.play('ok');
      this.toast('<b>Guardado no cofre! +' + OK_PTS + '</b>' + esc(d.why), 'good');
    } else {
      this.addPts('priv', MISS_PTS); this.sound.play('bad'); this.returnItem(it);
      this.toast('<b>Não precisa guardar (' + MISS_PTS + ')</b>' + esc(d.why) + ' O pacote voltou para a esteira.', 'bad', 5200);
    }
    this.renderHud();
  };
  G.pressSend = function () {
    var self = this;
    var personalLeft = PACKETS.filter(function (d) { return d.personal && !self.packets[d.id].vaulted; });
    if (personalLeft.length) {
      this.addPts('priv', MISS_PTS); this.sound.play('bad');
      this.toast('<b>Envio bloqueado (' + MISS_PTS + ')</b>Ainda há ' + personalLeft.length + ' pacote' + (personalLeft.length > 1 ? 's' : '') + ' com dados pessoais fora do cofre.', 'bad', 5000);
      return;
    }
    this.inv.filter(function (i) { return i.kind === 'packet'; }).forEach(function (i) { self.returnItem(i); });
    this.state.beltRunning = true;
    this.addPts('priv', OK_PTS); this.sound.play('scan');
    this.toast('<b>Envio retomado! +' + OK_PTS + '</b>Só dados gerais, que não identificam ninguém, seguem para o chatbot.', 'good');
    setTimeout(function () { if (self.state.phase === 'play') self.completeIncident('priv'); }, 3200);
  };

  G.findSign = function (sg) {
    if (this.state.signs[sg.id]) return;
    this.state.signs[sg.id] = true;
    this.addPts('deep', SIGN_PTS); this.sound.play('ok');
    var n = Object.keys(this.state.signs).length;
    this.toast('<b>Sinal ' + n + '/3: ' + esc(sg.title) + ' (+' + SIGN_PTS + ')</b>' + esc(sg.detail), 'good', 5000);
    this.renderHud();
  };
  G.callPhone = function () {
    var self = this, n = Object.keys(this.state.signs).length;
    if (n < 3) { this.sound.play('click'); this.toast('<b>Reúna as evidências primeiro</b>Encontre os 3 sinais de manipulação no holograma (' + n + '/3). Dica: ande em volta dele.', 'info', 4500); return; }
    if (this.state.called) return;
    this.state.called = true;
    this.addPts('deep', OK_PTS); this.sound.play('scan');
    this.toast('<b>A diretora atende o telefone</b>"Eu não fiz nenhuma chamada! Não envie nada." Golpe confirmado.', 'good', 5000);
    this.holoMat.color.set(this.pal.bad);
    setTimeout(function () { if (self.state.phase === 'play') self.completeIncident('deep'); }, 2200);
  };

  G.beginTask = function (id) {
    var self = this;
    this.state.inc[id].stage = 'task';
    if (id === 'info') CARDS.forEach(function (c) { self.cards[c.id].mesh.visible = true; });
    if (id === 'deep') Object.keys(this.signs).forEach(function (k) { self.signs[k].obj.visible = true; });
    this.refreshTerminal(id);
    this.renderHud();
  };
  G.refreshTerminal = function (id) {
    var t = this.terms[id]; t.scr.redraw(); t.alert.redraw();
    this.updateLevelColors();
  };

  G.taskHint = function (id) {
    var s = this.state, self = this;
    if (id === 'info') {
      var placed = CARDS.filter(function (c) { return s.cards[c.id].placed; }).length;
      return 'Afirmações no cesto certo: ' + placed + '/4. Verifique cada uma antes.';
    }
    if (id === 'ident') return 'Pele média ' + s.bars.media + '/' + BARS_TARGET + ' · Pele escura ' + s.bars.escura + '/' + BARS_TARGET + '. Só fotos autorizadas.';
    if (id === 'priv') {
      var v = PACKETS.filter(function (d) { return d.personal && self.packets[d.id].vaulted; }).length;
      return v < 4 ? 'Dados pessoais no cofre: ' + v + '/4. Depois aperte Retomar envio.' : 'Tudo no cofre! Aperte Retomar envio.';
    }
    if (id === 'deep') {
      var n = Object.keys(s.signs).length;
      return n < 3 ? 'Sinais de manipulação: ' + n + '/3. Ande em volta do holograma.' : 'Ligue para a diretora no Telefone interno.';
    }
    return '';
  };

  G.completeIncident = function (id) {
    var st = this.state.inc[id];
    if (st.stage === 'done') return;
    st.stage = 'done';
    this.state.resolved++;
    this.refreshTerminal(id);
    this.renderHud();
    this.sound.play('win');
    this.showDone(id);
  };

  /* ------------------------------------------------------------- HUD */
  G.renderHud = function () {
    var self = this, s = this.state;
    this.$('[data-objs]').innerHTML = INCIDENTS.map(function (inc) {
      var st = s.inc[inc.id];
      var cls = st.stage === 'done' ? 'done' : st.stage === 'task' ? 'task' : 'alert';
      var hint = st.stage === 'task' ? '<small>' + esc(self.taskHint(inc.id)) + '</small>' : st.stage === 'decide' ? '<small>Analise o terminal T' + inc.n + '</small>' : '';
      return '<li class="' + cls + '"><i></i><span><b>' + inc.n + ' · ' + inc.short + '</b>' + hint + '</span></li>';
    }).join('');
    this.$('[data-inv]').innerHTML = this.inv.length ? '<span class="cia-inv-t">Nas mãos ' + this.inv.length + '/3</span>' + this.inv.map(function (i) {
      var extra = i.kind === 'card' && s.cards[i.id].scanned ? ' · verificada' : '';
      return '<span class="cia-inv-i k-' + i.kind + '">' + esc(i.label + extra) + '</span>';
    }).join('') + (this.touch ? '<button class="cia-drop" type="button" data-drop>Devolver último</button>' : '<span class="cia-inv-h"><span class="cia-kbd">Q</span>devolver o último</span>') : '';
    this.$('[data-stab]').textContent = Math.round(s.resolved / 4 * 100) + '%';
    Object.keys(this.terms || {}).forEach(function (k) { if (s.inc[k].stage === 'task') self.terms[k].scr.redraw(); });
    this.promptKey = null;
  };

  G.toast = function (html, kind, ms) {
    var t = this.$('[data-toast]');
    t.className = 'cia-toast is-on ' + (kind || 'info');
    t.innerHTML = html;
    clearTimeout(this.toastT);
    this.toastT = setTimeout(function () { t.classList.remove('is-on'); }, ms || 3200);
  };

  /* ------------------------------------------------------------- CONTROLES */
  G.isActive = function () { return this.state.phase === 'play' && !this.layerOpen; };

  G.lock = function () {
    if (this.touch || this.dragMode) return;
    var self = this;
    try {
      var p = this.canvas.requestPointerLock && this.canvas.requestPointerLock();
      if (p && p.catch) p.catch(function () { self.setDrag(); });
    } catch (e) { this.setDrag(); }
  };
  // quando o navegador não deixa travar o cursor (ex.: dentro de iframes), olhar = segurar e arrastar
  G.setDrag = function () {
    if (this.dragMode) return;
    this.dragMode = true;
    this.el.classList.add('is-drag');
    this.toast('<b>Modo arrastar</b>Segure o botão do mouse e arraste para olhar em volta. WASD continua andando.', 'info', 6000);
  };
  G.unlock = function () {
    var self = this;
    this.ignoreUnlock = true;
    if (document.pointerLockElement === this.canvas && document.exitPointerLock) document.exitPointerLock();
    setTimeout(function () { self.ignoreUnlock = false; }, 250);
  };
  G.onLockChange = function () {
    var locked = document.pointerLockElement === this.canvas;
    this.el.classList.toggle('is-locked', locked);
    if (!locked && !this.ignoreUnlock && this.isActive()) this.showPause();
  };

  G.onMouseMove = function (e) {
    if (!this.isActive()) return;
    var locked = document.pointerLockElement === this.canvas;
    if (!locked && !(this.dragMode && this.dragging)) return;
    var s = locked ? 0.0022 : 0.005;
    // ignora saltos do mouse que alguns navegadores mandam ao travar o cursor
    if (Math.abs(e.movementX) > 180 || Math.abs(e.movementY) > 180) return;
    this.yaw -= e.movementX * s;
    this.pitch = clamp(this.pitch - e.movementY * s, -1.35, 1.35);
  };
  G.onMouseDown = function (e) {
    if (!this.isActive() || this.touch) return;
    if (document.pointerLockElement === this.canvas) { if (e.button === 0) this.interact(); return; }
    if (this.dragMode) { this.dragging = true; return; }
    this.lock();
  };

  G.onKey = function (e, down) {
    if (!this.el.offsetParent && document.fullscreenElement !== this.el) return;
    var t = e.target;
    if (t && t.tagName && /INPUT|TEXTAREA|SELECT/.test(t.tagName)) return;
    if (down && this.layerOpen && this.ui && this.ui.openId && /^[1-3]$/.test(e.key)) {
      var ob = this.$('[data-opt="' + (+e.key - 1) + '"]');
      if (ob && !ob.disabled) { e.preventDefault(); this.choose(+e.key - 1); }
      return;
    }
    if (down && this.layerOpen && e.key === 'Escape' && this.ui && this.ui.closable) { e.preventDefault(); this.resume(); return; }
    if (!this.isActive()) { if (!down) this.keys = {}; return; }
    var code = e.code;
    var map = { KeyW: 'f', ArrowUp: 'f', KeyS: 'b', ArrowDown: 'b', KeyA: 'l', ArrowLeft: 'l', KeyD: 'r', ArrowRight: 'r', ShiftLeft: 'run', ShiftRight: 'run' };
    if (map[code]) { this.keys[map[code]] = down; e.preventDefault(); }
    if (down && !e.repeat && (code === 'KeyE' || code === 'Enter' || code === 'Space')) { e.preventDefault(); this.interact(); }
    if (down && !e.repeat && code === 'KeyQ') { e.preventDefault(); this.dropLast(); }
    if (down && code === 'Escape' && this.dragMode) this.showPause();
  };

  G.interact = function () {
    if (!this.hover || !this.hoverPrompt || !this.hoverPrompt.can) return;
    var it = this.hover;
    this.hoverPrompt = null; this.promptKey = null;
    it.use();
  };

  G.bindTouch = function () {
    var self = this, joy = this.$('[data-joy]'), knob = joy.querySelector('i');
    this.joy = { x: 0, y: 0 };
    var jid = null, lid = null, lx = 0, ly = 0;
    function move(e) {
      var r = joy.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      var max = r.width / 2, d = Math.min(max, Math.hypot(dx, dy)), a = Math.atan2(dy, dx);
      var x = Math.cos(a) * d, y = Math.sin(a) * d;
      knob.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      self.joy.x = x / max; self.joy.y = -y / max;
    }
    joy.addEventListener('pointerdown', function (e) { jid = e.pointerId; joy.setPointerCapture(jid); move(e); });
    joy.addEventListener('pointermove', function (e) { if (e.pointerId === jid) move(e); });
    var end = function (e) { if (e.pointerId === jid) { jid = null; self.joy.x = self.joy.y = 0; knob.style.transform = ''; } };
    joy.addEventListener('pointerup', end); joy.addEventListener('pointercancel', end);
    this.canvas.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'touch') return; lid = e.pointerId; lx = e.clientX; ly = e.clientY; });
    this.canvas.addEventListener('pointermove', function (e) {
      if (e.pointerId !== lid || !self.isActive()) return;
      self.yaw -= (e.clientX - lx) * 0.006; self.pitch = clamp(self.pitch - (e.clientY - ly) * 0.006, -1.3, 1.3); lx = e.clientX; ly = e.clientY;
    });
    var lend = function (e) { if (e.pointerId === lid) lid = null; };
    this.canvas.addEventListener('pointerup', lend); this.canvas.addEventListener('pointercancel', lend);
    this.$('[data-use]').addEventListener('click', function () { if (self.isActive()) self.interact(); });
  };

  /* ------------------------------------------------------------- LOOP */
  G.loop = function () {
    var self = this;
    this.raf = requestAnimationFrame(function () { self.loop(); });
    var now = performance.now(), dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    if ((!this.el.offsetParent && document.fullscreenElement !== this.el) || document.hidden) return;
    var t = (this.time += dt);
    if (this.isActive()) this.move(dt, t);
    this.camera.position.set(this.pos.x, 1.62 + (this.bob || 0), this.pos.z);
    this.camera.rotation.set(this.pitch, this.yaw, 0);
    this.anim.forEach(function (f) { f(t, dt); });
    if (this.isActive()) this.pick(); else if (this.hover) { this.hover = null; this.setPrompt(null); }
    this.renderer.render(this.scene, this.camera);
  };

  G.move = function (dt, t) {
    var k = this.keys, j = this.joy || { x: 0, y: 0 };
    var f = (k.f ? 1 : 0) - (k.b ? 1 : 0) + j.y, s = (k.r ? 1 : 0) - (k.l ? 1 : 0) + j.x;
    var len = Math.hypot(f, s);
    if (len > 1) { f /= len; s /= len; }
    var sp = k.run ? 5.2 : 3.2;
    var sin = Math.sin(this.yaw), cos = Math.cos(this.yaw);
    this.pos.x += (-sin * f + cos * s) * sp * dt;
    this.pos.z += (-cos * f - sin * s) * sp * dt;
    this.collide();
    this.bob = len > 0.1 ? Math.sin(t * (k.run ? 13 : 9)) * 0.025 : (this.bob || 0) * 0.9;
  };

  G.collide = function () {
    var r = 0.32, p = this.pos;
    for (var it = 0; it < 2; it++) {
      p.x = clamp(p.x, -HX + r, HX - r); p.z = clamp(p.z, -HZ + r, HZ - r);
      this.obs.forEach(function (o) {
        if (o.t === 'c') {
          var dx = p.x - o.x, dz = p.z - o.z, d = Math.hypot(dx, dz), m = o.r + r;
          if (d < m && d > 1e-5) { p.x = o.x + dx / d * m; p.z = o.z + dz / d * m; }
        } else {
          var cx = clamp(p.x, o.x0, o.x1), cz = clamp(p.z, o.z0, o.z1), ex = p.x - cx, ez = p.z - cz, dd = Math.hypot(ex, ez);
          if (dd < r) {
            if (dd > 1e-5) { p.x = cx + ex / dd * r; p.z = cz + ez / dd * r; }
            else {
              var pen = [p.x - o.x0, o.x1 - p.x, p.z - o.z0, o.z1 - p.z], mi = pen.indexOf(Math.min.apply(null, pen));
              if (mi === 0) p.x = o.x0 - r; else if (mi === 1) p.x = o.x1 + r; else if (mi === 2) p.z = o.z0 - r; else p.z = o.z1 + r;
            }
          }
        }
      });
    }
  };

  G.pick = function () {
    var meshes = [];
    this.inter.forEach(function (it) { if (!it.enabled || it.enabled()) it.meshes.forEach(function (m) { meshes.push(m); }); });
    this.ray.setFromCamera({ x: 0, y: 0 }, this.camera);
    var hits = this.ray.intersectObjects(meshes, false);
    var it = hits.length ? hits[0].object.userData.it : null;
    var pr = it ? it.prompt() : null;
    var key = pr ? pr.text + '|' + pr.can : '';
    this.hover = it; this.hoverPrompt = pr;
    if (key !== this.promptKey) {
      this.promptKey = key; this.setPrompt(pr);
      this.$('[data-cross]').classList.toggle('is-hot', !!(pr && pr.can));
    }
  };
  G.setPrompt = function (pr) {
    var el = this.$('[data-prompt]');
    if (!pr) { el.classList.remove('is-on'); this.promptKey = ''; this.$('[data-cross]').classList.remove('is-hot'); return; }
    var key = this.touch ? '<span class="cia-kbd">Usar</span>' : '<span class="cia-kbd">E</span>';
    el.innerHTML = (pr.can ? key : '') + '<span>' + esc(pr.text) + '</span>';
    el.className = 'cia-prompt is-on' + (pr.can ? '' : ' dim');
  };

  /* ------------------------------------------------------------- CAMADAS */
  G.openLayer = function (html, closable) {
    this.layerOpen = true;
    this.keys = {};
    this.ui = { closable: !!closable };
    this.unlock();
    this.layer.innerHTML = html;
    this.layer.scrollTop = 0;
    this.el.classList.add('has-layer');
    var f = this.layer.querySelector('.cia-btn, .cia-opt');
    if (f) try { f.focus({ preventScroll: true }); } catch (e) { /* ok */ }
  };
  G.closeLayer = function () {
    this.layerOpen = false;
    this.el.classList.remove('has-layer');
    this.layer.innerHTML = '';
    this.ui = null;
  };
  G.resume = function () {
    this.closeLayer();
    if (this.state.phase === 'play') this.lock();
  };

  G.controlsHtml = function () {
    if (this.touch) return '<ul class="cia-keys"><li><span class="cia-kbd">◎</span>Joystick para andar</li><li><span class="cia-kbd">☝</span>Arraste a tela para olhar</li><li><span class="cia-kbd">Usar</span>Interagir com o que está na mira</li></ul>';
    return '<ul class="cia-keys">' +
      '<li><span class="cia-kbds"><span class="cia-kbd">W</span><span class="cia-kbd">A</span><span class="cia-kbd">S</span><span class="cia-kbd">D</span></span>Andar</li>' +
      '<li><span class="cia-kbd">Mouse</span>Olhar em volta</li>' +
      '<li><span class="cia-kbd">E</span>Interagir com o que está na mira</li>' +
      '<li><span class="cia-kbd">Q</span>Devolver o último item</li>' +
      '<li><span class="cia-kbd">Shift</span>Correr</li>' +
      '<li><span class="cia-kbd">Esc</span>Pausar</li></ul>';
  };

  G.showIntro = function () {
    this.el.setAttribute('data-phase', 'intro');
    this.openLayer(
      '<div class="cia-panel cia-intro" role="dialog" aria-modal="true" aria-labelledby="cia-intro-t">' +
        '<span class="cia-eyebrow">Missão de treinamento · 3D</span>' +
        '<h2 id="cia-intro-t">IA: <span>Central de Comando</span></h2>' +
        '<p>Você é operador(a) de uma central de inteligência artificial. Quatro incidentes causados pelo uso inadequado da IA estão desestabilizando o sistema. Ande pela sala, analise cada terminal e resolva os problemas com as próprias mãos.</p>' +
        '<div class="cia-chips"><span class="cia-chip">Alucinação</span><span class="cia-chip">Viés algorítmico</span><span class="cia-chip">Privacidade</span><span class="cia-chip">Deepfake</span></div>' +
        this.controlsHtml() +
        '<button class="cia-btn" type="button" data-action="start">' + ico('play') + 'Entrar na central</button>' +
        '<p class="cia-note">' + ico('zap') + 'Sem pressa: acertar de primeira vale mais pontos.</p>' +
      '</div>');
  };

  G.showPause = function () {
    if (this.layerOpen) return;
    this.openLayer(
      '<div class="cia-panel cia-intro" role="dialog" aria-modal="true" aria-labelledby="cia-p-t">' +
        '<span class="cia-eyebrow">Jogo pausado</span><h2 id="cia-p-t">Pausa</h2>' +
        this.controlsHtml() +
        '<div class="cia-actions"><button class="cia-btn" type="button" data-action="resume">' + ico('play') + 'Continuar</button>' +
        '<button class="cia-btn ghost" type="button" data-action="restart">' + ico('rotate') + 'Recomeçar</button></div>' +
      '</div>', true);
  };

  G.openIncident = function (id) {
    this.sound.play('click');
    this.openLayer('<div class="cia-panel cia-modal" role="dialog" aria-modal="true" aria-labelledby="cia-m-t" data-modal></div>', true);
    this.ui.openId = id;
    this.renderIncident();
    var f = this.layer.querySelector('.cia-opt:not(:disabled)');
    if (f) try { f.focus({ preventScroll: true }); } catch (e) { /* ok */ }
  };

  G.renderIncident = function () {
    var id = this.ui.openId, inc = byId(id), st = this.state.inc[id];
    var chosenOk = st.chosen !== null && inc.options[st.chosen].ok;
    var opts = inc.options.map(function (op, i) {
      var cls = '', dis = '';
      if (st.tried.indexOf(i) > -1) { cls = ' is-wrong'; dis = ' disabled'; }
      if (chosenOk) { dis = ' disabled'; cls = i === st.chosen ? ' is-right' : (cls || ' is-muted'); }
      return '<button class="cia-opt' + cls + '" type="button" data-opt="' + i + '"' + dis + '><span class="cia-kbd">' + (i + 1) + '</span><span>' + esc(op.text) + '</span></button>';
    }).join('');
    var fb = '';
    if (st.chosen !== null) {
      var op = inc.options[st.chosen];
      fb = '<div class="cia-fb ' + (op.ok ? 'good' : 'bad') + '" role="status">' + (op.ok ? '<b>Acertou! +' + st.decisionPts + ' pontos</b>' : '<b>Não é o melhor caminho.</b>') + esc(op.fb) + '</div>';
      if (op.ok) fb += '<div class="cia-mission"><span class="cia-eyebrow">' + ico('target') + 'Sua missão na sala</span><p>' + esc(inc.task) + '</p></div>' +
        '<div class="cia-next"><button class="cia-btn" type="button" data-action="totask">Voltar à sala e agir' + ico('arrowRight') + '</button></div>';
    }
    var steps = ['Analisar', 'Agir na sala', 'Resolvido'].map(function (s, i) {
      return '<li class="' + (i === 0 ? (chosenOk ? 'is-done' : 'is-active') : (i === 1 && chosenOk ? 'is-active' : '')) + '"><span>0' + (i + 1) + '</span>' + s + '</li>';
    }).join('');
    this.$('[data-modal]').innerHTML =
      '<div class="cia-mhead"><div class="cia-mtitle"><span class="cia-badge">' + ico(inc.icon) + '</span>' +
      '<div><span class="cia-eyebrow">Incidente ' + inc.n + ' de 4 · ' + inc.short + '</span><h3 id="cia-m-t">' + inc.title + '</h3></div></div>' +
      '<div class="cia-mmeta"><button class="cia-close" type="button" data-action="' + (chosenOk ? 'totask' : 'resume') + '" aria-label="Voltar à sala" title="Voltar à sala (Esc)">' + ico('x') + '</button></div></div>' +
      '<ol class="cia-steps">' + steps + '</ol>' +
      '<div class="cia-mbody"><div class="cia-dec"><div><p class="cia-brief">' + esc(inc.brief) + '</p>' + inc.evidence() + '</div>' +
      '<div><p class="cia-q">' + esc(inc.question) + '</p><div class="cia-opts">' + opts + '</div>' + fb + '</div></div></div>';
  };

  G.choose = function (i) {
    var id = this.ui.openId, inc = byId(id), st = this.state.inc[id];
    if (st.stage !== 'decide' || st.tried.indexOf(i) > -1) return;
    if (st.chosen !== null && inc.options[st.chosen].ok) return;
    st.chosen = i;
    if (inc.options[i].ok) {
      st.decisionPts = DECISION_PTS[Math.min(st.tried.length, 2)];
      this.state.score += st.decisionPts;
      this.$('[data-score]').textContent = this.state.score;
      this.sound.play('ok');
      this.ui.closable = false;
    } else { st.tried.push(i); this.sound.play('bad'); }
    this.renderIncident();
    var f = this.$('[data-action="totask"].cia-btn') || this.$('.cia-opt:not(:disabled)');
    if (f) try { f.focus({ preventScroll: true }); } catch (e) { /* ok */ }
    var fbEl = this.$('.cia-fb'); if (fbEl && fbEl.scrollIntoView) fbEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };

  G.showDone = function (id) {
    var inc = byId(id), st = this.state.inc[id], last = this.state.resolved === INCIDENTS.length;
    var self = this;
    setTimeout(function () {
      if (self.state.phase !== 'play') return;
      self.openLayer(
        '<div class="cia-panel cia-modal" role="dialog" aria-modal="true" aria-labelledby="cia-d-t"><div class="cia-mbody">' +
          '<div class="cia-done"><div class="cia-done-badge">' + ico('shieldCheck') + '</div>' +
          '<div><span class="cia-eyebrow">Incidente ' + inc.n + ' resolvido · terminal estabilizado</span><h4 id="cia-d-t">' + inc.title + '</h4>' +
          '<div class="cia-pts"><span>Decisão <b>+' + st.decisionPts + '</b></span><span>Ações na sala <b>+' + st.actionPts + '</b></span><span>Estabilidade <b>' + Math.round(self.state.resolved / 4 * 100) + '%</b></span></div></div>' +
          '<div class="cia-lesson"><span class="cia-eyebrow">O que aprendemos</span><p>' + esc(inc.lesson) + '</p></div>' +
          '<div class="cia-next">' + (last ? '<button class="cia-btn" type="button" data-action="final">Ver relatório final' + ico('arrowRight') + '</button>'
            : '<button class="cia-btn" type="button" data-action="resume">Voltar à sala' + ico('arrowRight') + '</button>') + '</div></div>' +
        '</div></div>', !last);
    }, 700);
  };

  G.finish = function () {
    var s = this.state;
    s.phase = 'end';
    this.el.setAttribute('data-phase', 'end');
    var maxAcc = INCIDENTS.length * DECISION_PTS[0] + (CARDS.length + 6 + 5) * OK_PTS + 3 * SIGN_PTS + OK_PTS;
    var dec = 0, act = 0;
    INCIDENTS.forEach(function (inc) { dec += s.inc[inc.id].decisionPts; act += s.inc[inc.id].actionPts; });
    var total = dec + act, ratio = total / maxAcc;
    var rank = RANKS.filter(function (r) { return ratio >= r.min; })[0];
    var learn = INCIDENTS.map(function (inc) {
      return '<li class="ok">' + ico('circleCheck') + '<span><b>' + inc.title + '</b><span>' + esc(inc.lessonShort) + '</span></span></li>';
    }).join('');
    this.openLayer(
      '<div class="cia-panel cia-result" role="dialog" aria-modal="true" aria-labelledby="cia-r-t" style="--rk:' + rank.color + '">' +
        '<span class="cia-eyebrow">Missão concluída · relatório final</span>' +
        '<div class="cia-rank"><div class="cia-rank-medal">' + ico(rank.icon) + '</div><div><h2 id="cia-r-t">' + rank.title + '</h2><p>' + rank.text + '</p></div></div>' +
        '<div class="cia-scoregrid">' +
          '<div><span>Decisões</span><b>' + dec + '</b><small>de ' + INCIDENTS.length * DECISION_PTS[0] + '</small></div>' +
          '<div><span>Ações na sala</span><b>' + act + '</b><small>de ' + (maxAcc - INCIDENTS.length * DECISION_PTS[0]) + '</small></div>' +
          '<div class="total"><span>Total</span><b>' + total + '</b><small>de ' + maxAcc + ' pontos</small></div>' +
        '</div>' +
        '<div class="cia-learn"><h3>O que você aprendeu</h3><ul>' + learn + '</ul></div>' +
        '<div class="cia-actions"><button class="cia-btn" type="button" data-action="restart">' + ico('rotate') + 'Jogar novamente</button></div>' +
      '</div>');
    if (typeof this.opts.onFinish === 'function') this.opts.onFinish({ rank: rank.title, score: total, max: maxAcc, decisions: dec, actions: act, accuracy: Math.round(ratio * 100) });
  };

  G.onClick = function (e) {
    var t = e.target.closest ? e.target.closest('[data-action],[data-opt],[data-sound],[data-full],[data-drop]') : null;
    if (!t || !this.el.contains(t)) return;
    if (t.hasAttribute('data-drop')) { this.dropLast(); return; }
    if (t.hasAttribute('data-sound')) { this.sound.on = !this.sound.on; this.renderSoundBtn(); if (this.sound.on) this.sound.play('click'); return; }
    if (t.hasAttribute('data-full')) { this.toggleFull(); return; }
    if (t.hasAttribute('data-opt')) { this.choose(+t.getAttribute('data-opt')); return; }
    var a = t.getAttribute('data-action');
    if (a === 'start' || a === 'restart') this.start();
    else if (a === 'resume') this.resume();
    else if (a === 'totask') {
      var id = this.ui.openId, inc = byId(id);
      this.beginTask(id); this.resume();
      this.toast('<b>Missão: ' + esc(inc.short) + '</b>' + esc(inc.task), 'info', 7000);
    }
    else if (a === 'final') this.finish();
  };

  G.toggleFull = function () {
    var el = this.el;
    if (document.fullscreenElement === el) document.exitFullscreen();
    else if (el.requestFullscreen) el.requestFullscreen().catch(function () { /* sem tela cheia */ });
  };

  G.destroy = function () {
    cancelAnimationFrame(this.raf);
    clearTimeout(this.toastT);
    this.el.removeEventListener('click', this.h.click);
    document.removeEventListener('keydown', this.h.key);
    document.removeEventListener('keyup', this.h.keyup);
    document.removeEventListener('pointerlockchange', this.h.lock);
    document.removeEventListener('pointerlockerror', this.h.lockErr);
    document.removeEventListener('mousemove', this.h.mmove);
    document.removeEventListener('mouseup', this.h.mup);
    global.removeEventListener('blur', this.h.blur);
    this.ro.disconnect(); this.mo.disconnect();
    if (this.mq && this.mq.removeEventListener) this.mq.removeEventListener('change', this.h.theme);
    if (document.pointerLockElement === this.canvas) document.exitPointerLock();
    this.scene.traverse(function (o) {
      if (o.geometry) o.geometry.dispose();
      if (o.material) [].concat(o.material).forEach(function (m) { if (m.map) m.map.dispose(); m.dispose(); });
    });
    this.renderer.dispose();
    if (this.sound.ctx && this.sound.ctx.close) this.sound.ctx.close();
    this.el.innerHTML = '';
    this.el.classList.remove('cia', 'has-layer', 'is-locked', 'is-drag');
    this.el.__centralIA = null;
  };

  /* =====================================================================
     API PÚBLICA
     ===================================================================== */
  var CentralIA = {
    version: '2.0.0',
    incidents: INCIDENTS,
    /**
     * Monta o jogo dentro de um elemento.
     *   sound     (boolean)  som ligado ao iniciar. Padrão: true
     *   onStart   (função)   chamada quando a partida começa
     *   onFinish  (função)   recebe { rank, score, max, decisions, actions, accuracy }
     */
    mount: function (target, options) {
      var el = typeof target === 'string' ? document.querySelector(target) : target;
      if (!el) throw new Error('CentralIA: elemento "' + target + '" não encontrado.');
      if (el.__centralIA) el.__centralIA.destroy();
      var o = options || {};
      var g = new Game(el, { sound: o.sound !== false, onStart: o.onStart, onFinish: o.onFinish });
      var api = { start: function () { g.start(); }, restart: function () { g.start(); }, destroy: function () { g.destroy(); }, _game: g };
      el.__centralIA = api;
      return api;
    }
  };
  function autoMount() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-central-ia]'), function (el) {
      if (!el.__centralIA) CentralIA.mount(el, { sound: el.dataset.sound !== 'false' });
    });
  }
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoMount);
    else autoMount();
  }
  global.CentralIA = CentralIA;
})(typeof window !== 'undefined' ? window : this);
