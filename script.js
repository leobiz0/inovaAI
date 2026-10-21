/* InovaAI · Projeto EDUTEC 2026 */
(function(){
"use strict";
var store={get:function(k,d){try{var v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}},
           set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- tema ---------- */
var root=document.documentElement;
function isDark(){var t=root.getAttribute("data-theme");if(t)return t==="dark";return window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches}
function syncIcon(){var d=isDark();$("#iconMoon").hidden=d;$("#iconSun").hidden=!d}
var saved=store.get("inovaai-theme",null); if(saved)root.setAttribute("data-theme",saved);
syncIcon();
$("#themeBtn").addEventListener("click",function(){var next=isDark()?"light":"dark";themeFade();root.setAttribute("data-theme",next);store.set("inovaai-theme",next);syncIcon();netColors()});
/* transição suave de 0,5 s entre os temas */
var fadeT=0;
function themeFade(){if(reduce)return;clearTimeout(fadeT);root.classList.add("theme-fade");fadeT=setTimeout(function(){root.classList.remove("theme-fade")},520)}
if(window.matchMedia)matchMedia("(prefers-color-scheme: dark)").addEventListener("change",function(){themeFade();syncIcon();netColors()});

/* ---------- menu ---------- */
var nav=$("#nav"),menuBtn=$("#menuBtn");
menuBtn.addEventListener("click",function(){var o=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",o)});
nav.addEventListener("click",function(e){if(e.target.closest("a")){nav.classList.remove("open");menuBtn.setAttribute("aria-expanded","false")}});

/* ---------- dados dos assuntos ---------- */
var TOPICS=[
 {id:"definicao",title:"Definição de Inteligência Artificial",short:"Conceitos, história e aplicações no cotidiano.",img:"img/t-def.webp",cta:"Entender IA",
  tldr:"IA é a capacidade de um sistema computacional realizar tarefas que normalmente exigiriam inteligência humana, como aprender, raciocinar e reconhecer padrões.",
  terms:["Teste de Turing","Dartmouth 1956","IA forte","reconhecimento de padrões"],
  video:"o que é inteligência artificial",
  sections:[
   ["Como surgiu","A história da inteligência artificial começou na década de 1950, quando o matemático britânico Alan Turing propôs o “Teste de Turing”, uma forma de avaliar se uma máquina consegue exibir comportamento inteligente parecido com o humano. Em 1956, durante a Conferência de Dartmouth, o termo “inteligência artificial” foi usado oficialmente pela primeira vez, marcando o início formal deste campo de estudo."],
   ["O que é IA?","A inteligência artificial se refere à capacidade de sistemas computacionais realizarem tarefas que normalmente exigiriam inteligência humana, como aprendizado, raciocínio e reconhecimento de padrões. De acordo com a IBM, a chamada IA forte é uma forma ainda teórica que replicaria funções humanas como raciocínio, planejamento e resolução de problemas."],
   ["LAB:timeline"],
   ["IA no cotidiano","Atualmente, a inteligência artificial está presente em diversas áreas do cotidiano. Assistentes virtuais, aplicativos de navegação, sistemas de recomendação de filmes e músicas e ferramentas de tradução automática são exemplos de aplicações que usam IA. Essas tecnologias analisam grandes quantidades de dados para identificar padrões e oferecer respostas mais rápidas e eficientes."],
   ["Benefícios e desafios","Além de facilitar tarefas diárias, a IA também é usada em áreas como medicina, educação, segurança e indústria. Na saúde, por exemplo, ela pode auxiliar no diagnóstico de doenças; na educação, contribui para a personalização do aprendizado. Com o avanço constante da tecnologia, a IA tende a ficar cada vez mais presente na sociedade, trazendo benefícios, mas também desafios ligados à ética, à privacidade e ao mercado de trabalho."]
  ]},
 {id:"machine-learning",title:"Machine e Deep Learning",short:"Como os sistemas aprendem com dados.",img:"img/t-ml.webp",cta:"Explorar o assunto",
  tldr:"No machine learning, em vez de escrever as regras, mostramos exemplos e o sistema descobre as regras sozinho. O deep learning faz isso com muitas camadas de processamento.",
  terms:["modelo","dados de treino","padrões","camadas","predição"],
  video:"machine learning e deep learning explicação",
  sections:[
   ["Machine Learning","O aprendizado de máquina é um método de análise de dados que automatiza a construção de modelos analíticos. É um ramo da inteligência artificial baseado na ideia de que sistemas podem aprender com dados, identificar padrões e tomar decisões com o mínimo de intervenção humana."],
   ["LAB:compare"],
   ["LAB:teachcta"],
   ["Como os modelos aprendem","Esse aprendizado nasceu do reconhecimento de padrões e da teoria de que computadores podem aprender sem serem programados para realizar tarefas específicas: pesquisadores de inteligência artificial queriam saber se as máquinas poderiam aprender com dados. O aspecto iterativo do aprendizado de máquina é importante porque, quando os modelos são expostos a novos dados, eles conseguem se adaptar de forma independente."],
   ["Deep Learning","O deep learning, ou aprendizagem profunda, se baseia em um conjunto de algoritmos ligados ao machine learning. A partir de uma grande quantidade de dados e de inúmeras camadas de processamento, o computador aprende por si mesmo a executar tarefas semelhantes às dos seres humanos, como identificar imagens, reconhecer a voz ou fazer previsões, de forma progressiva."],
   ["Aplicações","A maioria das indústrias que trabalham com grandes quantidades de dados já reconhece o valor do aprendizado de máquina: ao extrair informações desses dados, as organizações trabalham com mais eficiência ou ganham vantagem sobre os concorrentes. As aplicações do deep learning são cada vez mais concretas, como a previsão de resultados de negócio, a evolução dos assistentes virtuais e a análise de imagens médicas."],
   ["Dados e desempenho","O desempenho de um sistema de deep learning é melhor quanto maior for a quantidade de dados. Os diferentes processos podem ser feitos em paralelo, e a arquitetura do sistema é flexível, o que permite que ele evolua e se adapte a problemas novos e futuros."]
  ]},
 {id:"redes-neurais",title:"Redes Neurais Artificiais",short:"Estrutura e aprendizado das redes neurais.",img:"img/t-rna.webp",cta:"Conhecer as redes",
  tldr:"Uma rede neural artificial é formada por camadas de “neurônios” que recebem números, aplicam pesos e decidem se passam o sinal adiante. Ajustar esses pesos é o que a rede aprende.",
  terms:["perceptron","peso","viés","função de ativação","camada oculta","MLP","RNC","RNR"],
  video:"redes neurais artificiais explicação",
  sections:[
   ["Algoritmos e aprendizado","Na IA se usam algoritmos, conjuntos de instruções sem ambiguidade que um computador pode executar. Uma gama de algoritmos de IA torna possível aprender com dados e aprimorar regras e métodos, levando à descoberta e à resolução de problemas por meio de estratégias e inferência; são os chamados algoritmos de aprendizado. Produtos de IA já fazem parte do dia a dia: o reconhecimento de voz dos celulares, por exemplo, é possível graças ao Processamento de Linguagem Natural."],
   ["Estrutura de uma rede","As Redes Neurais Artificiais (RNA) são métodos de deep learning capazes de reconhecer padrões complexos ou numerosos, com aprendizado dentro da própria rede. Elas se inspiram na arquitetura dos neurônios humanos e aprendem a partir de exemplos de treinamento. Uma RNA tem uma camada de entrada, uma de saída e pelo menos uma camada oculta, que transforma os dados recebidos em algo que a saída possa usar. Essas camadas são compostas por neurônios."],
   ["O perceptron","O primeiro tipo de neurônio usado em uma RNA, chamado Perceptron, foi inspirado no neurônio humano. Ele tem arquitetura simples e se tornou insuficiente para problemas complexos pela sua inflexibilidade e pela falta de estabilidade de sua função de ativação, que é a função que decide se um neurônio será ativado ou não."],
   ["LAB:perceptron"],
   ["Modelos de neurônios","Atualmente, dois modelos são muito usados nas redes neurais: o Perceptron Multicamadas, que impulsionou o uso em larga escala do deep learning, e o neurônio sigmoide, geralmente usado em classificadores."],
   ["Arquiteturas","As características do que se pretende ensinar a uma RNA definem a arquitetura usada. Existem cerca de dez arquiteturas principais, entre elas as Redes Multilayer Perceptron (MLP), as Redes Neurais Convolucionais (RNC), muito usadas com imagens, e as Redes Neurais Recorrentes (RNR), usadas com sequências como texto e áudio."]
  ]},
 {id:"visao-computacional",title:"Robótica e Visão Computacional",short:"Imagens, máquinas e tarefas no mundo real.",img:"img/t-rob.webp",cta:"Explorar aplicações",
  tldr:"A visão computacional ensina máquinas a interpretar imagens. Na robótica, isso permite que robôs vejam o ambiente e realizem tarefas sozinhos.",
  terms:["pixel","aquisição","processamento","detecção de bordas","reconhecimento de padrões"],
  video:"visão computacional o que é",
  sections:[
   ["Visão computacional","A visão computacional é uma tecnologia em constante evolução, usada em diversos setores da sociedade, como indústria, saúde e agricultura. Ela permite que as máquinas “vejam” e interpretem informações visuais, fornecendo dados precisos para melhorar a tomada de decisão."],
   ["Como ela funciona","É uma área da computação que busca imitar a capacidade de visão humana por meio de algoritmos. Ela é interdisciplinar e combina computação, estatística, álgebra linear, aprendizado de máquina, inteligência artificial, física e neurociência. Por isso tem usos em muitos campos: robótica, análise de imagens médicas, reconhecimento de objetos e rostos, segurança cibernética e análise de vídeo."],
   ["Aplicações na robótica","Na robótica, a visão computacional permite que robôs realizem tarefas baseadas em visão de forma autônoma, como identificar uma peça na esteira e pegá-la na posição certa."],
   ["Uso na indústria","A tecnologia contribui para a digitalização dos processos, o que aumenta a eficiência e abre espaço para novas tecnologias que otimizam a produção e reduzem perdas. Por isso, a visão computacional é fundamental para a transformação digital da indústria, trazendo redução de custos, processos melhores e vantagem competitiva."],
   ["Etapas do processo","A visão computacional geralmente segue quatro etapas: a aquisição, o processamento de imagens, a análise de imagens e o reconhecimento de padrões. Essas etapas formam a base da área e são usadas em robótica, vigilância e automação industrial, entre outras aplicações. Experimente cada uma no laboratório abaixo."],
   ["LAB:vision"]
  ]}
];
var DONE=store.get("inovaai-done",[]);
function isDone(id){return DONE.indexOf(id)>-1}

function renderTopics(){
  var n=TOPICS.filter(function(t){return isDone(t.id)}).length;
  $("#meterTxt").textContent=n+" de 4 assuntos concluídos";
  $("#meterBar").style.width=(n/4*100)+"%";
  var sec=$("#heroSecondary");
  if(n>0&&n<4){var nx=TOPICS.filter(function(t){return !isDone(t.id)})[0];sec.textContent="Continuar trilha ("+n+"/4)";sec.href="#"+nx.id}
  else{sec.textContent="Jogar Inova Runner";sec.href="#jogo"}
  $("#homeTopics").innerHTML=TOPICS.map(function(t,i){
    return '<a class="topic'+(isDone(t.id)?' done':'')+'" href="#'+t.id+'"><span class="step">'+(isDone(t.id)?'✓ concluído':'Assunto '+(i+1))+'</span><img src="'+t.img+'" alt="" width="96" height="96"><h3>'+t.title+'</h3><p>'+t.short+'</p><span class="go">'+t.cta+' →</span></a>'}).join("");
  $("#pathList").innerHTML=TOPICS.map(function(t,i){
    return '<a class="path-card" href="#'+t.id+'"><img src="'+t.img+'" alt="" width="140" height="140"><div><span class="mono">Assunto '+(i+1)+' de 4</span><h2>'+t.title+'</h2><p>'+t.short+'</p>'+(isDone(t.id)?'<span class="done-tag">✓ Concluído</span>':'')+'</div><span class="pill">'+t.cta+' →</span></a>'}).join("");
}

/* ---------- labs ---------- */
var LABS={
 timeline:function(){
  var ev=[["1950","Teste de Turing","Alan Turing propõe um teste: se, numa conversa por texto, uma pessoa não consegue distinguir a máquina de um humano, a máquina demonstra comportamento inteligente."],
          ["1956","Nasce o nome","Na Conferência de Dartmouth, nos EUA, pesquisadores usam pela primeira vez o termo “inteligência artificial”."],
          ["1997","Xadrez","O computador Deep Blue, da IBM, vence o campeão mundial de xadrez Garry Kasparov."],
          ["2012","Deep learning","Redes neurais profundas passam a reconhecer imagens muito melhor que métodos anteriores, e a técnica se espalha."],
          ["2022","IA no bolso","Assistentes de conversa como o ChatGPT chegam ao grande público e a IA vira assunto do dia a dia."]];
  return '<div class="lab" data-lab="timeline"><div class="lab-head"><h3>Linha do tempo da IA</h3><span class="mono">Toque em um ano</span></div><div class="timeline">'+
   ev.map(function(e,i){return '<button type="button" class="tl" data-i="'+i+'" aria-pressed="'+(i===0)+'"><b>'+e[0]+'</b><span>'+e[1]+'</span></button>'}).join("")+
   '</div><div class="tl-detail" id="tlDetail">'+ev[0][2]+'</div></div>';
 },
 compare:function(){
  return '<div class="lab"><div class="lab-head"><h3>Programar ou ensinar?</h3><span class="mono">Exemplo: filtro de spam</span></div>'+
  '<div class="compare"><div class="flow"><h4>Programação tradicional</h4><div class="flow-row"><span class="chip in">Regras escritas à mão</span><span class="arrow">+</span><span class="chip in">E-mail novo</span><span class="arrow">→</span><span class="chip box">Programa</span><span class="arrow">→</span><span class="chip out">É spam?</span></div><p class="hint" style="margin:14px 0 0">Alguém precisa prever todos os truques dos spammers e escrever uma regra para cada um.</p></div>'+
  '<div class="flow"><h4>Machine learning</h4><div class="flow-row"><span class="chip in">Milhares de e-mails</span><span class="arrow">+</span><span class="chip in">Rótulo: spam ou não</span><span class="arrow">→</span><span class="chip box">Treino</span><span class="arrow">→</span><span class="chip out">Regras aprendidas</span></div><p class="hint" style="margin:14px 0 0">O modelo encontra os padrões sozinho e melhora quando recebe novos exemplos.</p></div></div></div>';
 },
 teachcta:function(){
  return '<a class="tm-cta" href="#ensine"><div><span class="mono" style="opacity:.75">Faça você mesmo</span><h3>Ensine a máquina a reconhecer desenhos</h3><p>Treine um modelo de machine learning de verdade, desenhando com o mouse ou o dedo.</p></div><span class="btn btn-white">Abrir laboratório →</span></a>';
 },
 perceptron:function(){
  return '<div class="lab" data-lab="perceptron"><div class="lab-head"><h3>Monte seu perceptron</h3><span class="mono">Laboratório</span></div>'+
  '<p class="hint">O neurônio soma cada entrada multiplicada pelo seu peso, adiciona o viés e “dispara” (saída 1) se o resultado for maior que zero. Escolha um desafio e ajuste os controles até todas as linhas da tabela ficarem certas.</p>'+
  '<div class="perc"><div><svg viewBox="0 0 360 230" role="img" aria-label="Diagrama do perceptron com duas entradas, pesos, soma e saída">'+
  '<line id="pl1" x1="60" y1="60" x2="200" y2="115" stroke-width="4"/><line id="pl2" x1="60" y1="170" x2="200" y2="115" stroke-width="4"/><line x1="235" y1="115" x2="300" y2="115" stroke="var(--ink-soft)" stroke-width="3"/>'+
  '<circle id="pc1" cx="45" cy="60" r="26" stroke-width="3"/><text x="45" y="66" text-anchor="middle" font-size="16" font-weight="700" id="pt1" fill="var(--ink)">1</text>'+
  '<circle id="pc2" cx="45" cy="170" r="26" stroke-width="3"/><text x="45" y="176" text-anchor="middle" font-size="16" font-weight="700" id="pt2" fill="var(--ink)">0</text>'+
  '<text x="130" y="68" text-anchor="middle" font-size="12" fill="var(--ink-soft)" id="pw1">w1</text><text x="130" y="170" text-anchor="middle" font-size="12" fill="var(--ink-soft)" id="pw2">w2</text>'+
  '<circle cx="215" cy="115" r="34" fill="var(--band-dark)"/><text x="215" y="111" text-anchor="middle" font-size="12" fill="#fff">soma</text><text x="215" y="129" text-anchor="middle" font-size="13" font-weight="700" fill="#fff" id="psum">0</text>'+
  '<circle id="pout" cx="320" cy="115" r="24" stroke-width="3"/><text x="320" y="121" text-anchor="middle" font-size="16" font-weight="700" id="ptout">0</text>'+
  '<text x="45" y="215" text-anchor="middle" font-size="11" fill="var(--ink-soft)">entradas</text><text x="320" y="160" text-anchor="middle" font-size="11" fill="var(--ink-soft)">saída</text></svg>'+
  '<div class="toggles" style="margin-top:10px"><button type="button" class="tog" id="x1" aria-pressed="true">Entrada 1: 1</button><button type="button" class="tog" id="x2" aria-pressed="false">Entrada 2: 0</button></div></div>'+
  '<div class="controls"><div class="goal"><span>Desafio:</span><button type="button" data-goal="and" aria-pressed="true">Porta E</button><button type="button" data-goal="or" aria-pressed="false">Porta OU</button></div>'+
  '<div class="ctrl"><label for="w1">Peso 1 <output id="ow1">1.0</output></label><input type="range" id="w1" min="-2" max="2" step="0.1" value="1"></div>'+
  '<div class="ctrl"><label for="w2">Peso 2 <output id="ow2">1.0</output></label><input type="range" id="w2" min="-2" max="2" step="0.1" value="1"></div>'+
  '<div class="ctrl"><label for="bias">Viés <output id="ob">0.0</output></label><input type="range" id="bias" min="-3" max="2" step="0.1" value="0"></div>'+
  '<div style="overflow-x:auto"><table class="truth"><thead><tr><th>Ent. 1</th><th>Ent. 2</th><th>Esperado</th><th>Rede</th><th></th></tr></thead><tbody id="truth"></tbody></table></div><div id="pwin"></div></div></div></div>';
 },
 vision:function(){
  var st=[["Aquisição","A câmera captura a cena como uma grade de pixels coloridos, com ruído."],
          ["Processamento","A imagem vira tons de cinza e é suavizada para tirar o ruído."],
          ["Análise","O algoritmo procura mudanças bruscas de brilho: as bordas dos objetos."],
          ["Reconhecimento","Os padrões de bordas são comparados ao que o modelo aprendeu e o objeto é identificado."]];
  return '<div class="lab" data-lab="vision"><div class="lab-head"><h3>Como uma máquina enxerga</h3><span class="mono">Imagem de 32 × 32 pixels</span></div>'+
  '<div class="vision"><canvas id="vcan" width="32" height="32" aria-label="Imagem processada pela etapa selecionada"></canvas><div class="stages">'+
  st.map(function(s,i){return '<button type="button" class="stage" data-s="'+i+'" aria-pressed="'+(i===0)+'"><span class="n">'+(i+1)+'</span><span><b>'+s[0]+'</b><span>'+s[1]+'</span></span></button>'}).join("")+
  '</div></div></div>';
 }
};

function renderArticle(id){
  var i=TOPICS.findIndex(function(t){return t.id===id}),t=TOPICS[i],nx=TOPICS[i+1];
  $("#artStep").textContent="Assunto "+(i+1)+" de 4";
  var secs=t.sections.filter(function(s){return s[0].indexOf("LAB:")!==0});
  $("#toc").innerHTML='<span class="mono">Nesta página</span>'+secs.map(function(s,k){return '<a href="#'+t.id+'" data-sec="s'+k+'">'+s[0]+'</a>'}).join("")+'<a href="#'+t.id+'" data-sec="video">Videoaula</a>';
  var k=0,html='<div class="art-head"><img src="'+t.img+'" alt="" width="130" height="130"><div><span class="mono">Fundamentos de IA</span><h1>'+t.title+'</h1></div></div>'+
   '<div class="tldr"><span class="mono">Em uma frase</span><p>'+t.tldr+'</p></div><div class="prose">';
  t.sections.forEach(function(s){
    if(s[0].indexOf("LAB:")===0){html+=LABS[s[0].slice(4)]();return}
    html+='<section id="s'+(k++)+'"><h2>'+s[0]+'</h2><p>'+s[1]+'</p></section>';
  });
  html+='<section><h2>Termos-chave</h2><div class="terms">'+t.terms.map(function(x){return '<span>'+x+'</span>'}).join("")+'</div></section></div>'+
   '<a id="video" class="video-card" style="text-decoration:none;scroll-margin-top:100px" href="https://www.youtube.com/results?search_query='+encodeURIComponent(t.video)+'" target="_blank" rel="noopener"><div><span class="mono" style="opacity:.8">Continue aprendendo</span><h3>Bora aprender mais? Assista a uma videoaula completa.</h3><p>Abre o YouTube com aulas sobre '+t.title.toLowerCase()+'.</p></div><span class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span></a>'+
   '<div class="finish"><button type="button" class="btn '+(isDone(t.id)?'btn-ghost':'btn-primary')+'" id="doneBtn">'+(isDone(t.id)?'✓ Assunto concluído':'Marcar como concluído')+'</button>'+
   (nx?'<a class="next-link" href="#'+nx.id+'"><small>Próximo assunto</small>'+nx.title+' →</a>':'<a class="next-link" href="#jogo"><small>Trilha completa</small>Teste o que aprendeu no jogo →</a>')+'</div>';
  $("#artBody").innerHTML=html;
  $("#doneBtn").addEventListener("click",function(){
    if(isDone(t.id))DONE=DONE.filter(function(x){return x!==t.id});else DONE.push(t.id);
    store.set("inovaai-done",DONE);renderTopics();
    this.className="btn "+(isDone(t.id)?"btn-ghost":"btn-primary");this.textContent=isDone(t.id)?"✓ Assunto concluído":"Marcar como concluído";
  });
  $$("#toc a").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();var el=document.getElementById(a.dataset.sec);if(el)el.scrollIntoView({behavior:reduce?"auto":"smooth"})})});
  initLabs();
}

function initLabs(){
  var tl=$('[data-lab="timeline"]');
  if(tl){var details=["Alan Turing propõe um teste: se, numa conversa por texto, uma pessoa não consegue distinguir a máquina de um humano, a máquina demonstra comportamento inteligente.","Na Conferência de Dartmouth, nos EUA, pesquisadores usam pela primeira vez o termo “inteligência artificial”.","O computador Deep Blue, da IBM, vence o campeão mundial de xadrez Garry Kasparov.","Redes neurais profundas passam a reconhecer imagens muito melhor que métodos anteriores, e a técnica se espalha.","Assistentes de conversa como o ChatGPT chegam ao grande público e a IA vira assunto do dia a dia."];
    $$(".tl",tl).forEach(function(b){b.addEventListener("click",function(){$$(".tl",tl).forEach(function(x){x.setAttribute("aria-pressed","false")});b.setAttribute("aria-pressed","true");$("#tlDetail").textContent=details[+b.dataset.i]})})}
  if($('[data-lab="perceptron"]'))initPerceptron();
  if($('[data-lab="vision"]'))initVision();
}

function initPerceptron(){
  var x=[1,0],goal="and";
  var tgt={and:function(a,b){return a&&b?1:0},or:function(a,b){return a||b?1:0}};
  function out(a,b){var w1=+$("#w1").value,w2=+$("#w2").value,bb=+$("#bias").value;return a*w1+b*w2+bb>0?1:0}
  function draw(){
    var w1=+$("#w1").value,w2=+$("#w2").value,bb=+$("#bias").value;
    $("#ow1").textContent=w1.toFixed(1);$("#ow2").textContent=w2.toFixed(1);$("#ob").textContent=bb.toFixed(1);
    var s=x[0]*w1+x[1]*w2+bb,o=s>0?1:0;
    $("#psum").textContent=s.toFixed(1);$("#ptout").textContent=o;
    $("#pw1").textContent="peso "+w1.toFixed(1);$("#pw2").textContent="peso "+w2.toFixed(1);
    [["#pl1",w1,x[0]],["#pl2",w2,x[1]]].forEach(function(l){var el=$(l[0]);el.setAttribute("stroke",l[1]>=0?"var(--blue)":"var(--bad)");el.setAttribute("stroke-width",(1.5+Math.abs(l[1])*2.5).toFixed(1));el.setAttribute("opacity",l[2]?1:.3)});
    [["#pc1","#pt1",x[0]],["#pc2","#pt2",x[1]]].forEach(function(c){$(c[0]).setAttribute("fill",c[2]?"var(--blue)":"var(--surface)");$(c[0]).setAttribute("stroke","var(--blue)");$(c[1]).textContent=c[2];$(c[1]).setAttribute("fill",c[2]?"#fff":"var(--ink)")});
    $("#pout").setAttribute("fill",o?"var(--purple)":"var(--surface)");$("#pout").setAttribute("stroke","var(--purple)");$("#ptout").setAttribute("fill",o?"#fff":"var(--ink)");
    var all=true,rows="";
    [[0,0],[0,1],[1,0],[1,1]].forEach(function(r){var e=tgt[goal](r[0],r[1]),g=out(r[0],r[1]),ok=e===g;if(!ok)all=false;
      rows+='<tr><td>'+r[0]+'</td><td>'+r[1]+'</td><td>'+e+'</td><td>'+g+'</td><td class="'+(ok?'ok':'no')+'">'+(ok?'✓':'✗')+'</td></tr>'});
    $("#truth").innerHTML=rows;
    $("#pwin").innerHTML=all?'<div class="win">Isso! Seu neurônio aprendeu a porta '+(goal==="and"?"E":"OU")+'. É exatamente esse tipo de ajuste de pesos que uma rede faz sozinha durante o treino.</div>':"";
  }
  ["#w1","#w2","#bias"].forEach(function(s){$(s).addEventListener("input",draw)});
  ["#x1","#x2"].forEach(function(s,i){$(s).addEventListener("click",function(){x[i]=x[i]?0:1;this.setAttribute("aria-pressed",!!x[i]);this.textContent="Entrada "+(i+1)+": "+x[i];draw()})});
  $$("[data-goal]").forEach(function(b){b.addEventListener("click",function(){goal=b.dataset.goal;$$("[data-goal]").forEach(function(z){z.setAttribute("aria-pressed",z===b)});draw()})});
  draw();
}

function initVision(){
  var c=$("#vcan"),ctx=c.getContext("2d"),N=32,seed=7;
  function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647}
  // imagem: rosto de robô sobre fundo, com ruído
  var rgb=[];for(var y=0;y<N;y++)for(var x=0;x<N;x++){
    var r=40+y*2,g=48+y*2,b=110+y*3;
    var inHead=x>=8&&x<=23&&y>=9&&y<=24, ant=(x===15||x===16)&&y>=4&&y<9, antTop=(x>=14&&x<=17&&y>=3&&y<=4);
    if(inHead){r=150;g=110;b=255}
    if(ant||antTop){r=180;g=150;b=255}
    var eye=(Math.pow(x-12,2)+Math.pow(y-15,2)<=4)||(Math.pow(x-19,2)+Math.pow(y-15,2)<=4);
    if(eye){r=245;g=245;b=255}
    if(y===20&&x>=12&&x<=19){r=30;g=24;b=70}
    var n=(rnd()-.5)*60;rgb.push([r+n,g+n,b+n])}
  var gray=rgb.map(function(p){return .3*p[0]+.59*p[1]+.11*p[2]});
  var blur=gray.map(function(_,i){var x=i%N,y=(i/N)|0,s=0,k=0;for(var dy=-1;dy<=1;dy++)for(var dx=-1;dx<=1;dx++){var xx=x+dx,yy=y+dy;if(xx>=0&&yy>=0&&xx<N&&yy<N){s+=gray[yy*N+xx];k++}}return s/k});
  var edge=blur.map(function(_,i){var x=i%N,y=(i/N)|0;if(x<1||y<1||x>N-2||y>N-2)return 0;function G(a,b){return blur[(y+b)*N+x+a]}
    var gx=-G(-1,-1)-2*G(-1,0)-G(-1,1)+G(1,-1)+2*G(1,0)+G(1,1),gy=-G(-1,-1)-2*G(0,-1)-G(1,-1)+G(-1,1)+2*G(0,1)+G(1,1);return Math.min(255,Math.sqrt(gx*gx+gy*gy)*.9)});
  function paint(arr,fn){var im=ctx.createImageData(N,N);arr.forEach(function(v,i){var p=fn(v);im.data[i*4]=p[0];im.data[i*4+1]=p[1];im.data[i*4+2]=p[2];im.data[i*4+3]=255});ctx.putImageData(im,0,0)}
  function show(s){
    if(s===0)paint(rgb,function(p){return p});
    if(s===1)paint(blur,function(v){return [v,v,v]});
    if(s===2)paint(edge,function(v){return [v*.55,v*.35,v]});
    if(s===3){paint(edge,function(v){return [v*.35,v*.25,v*.7]});ctx.strokeStyle="#3DD598";ctx.lineWidth=1;ctx.strokeRect(6.5,1.5,19,25);ctx.fillStyle="#3DD598";ctx.fillRect(6,27,20,5);ctx.fillStyle="#0D1120";ctx.font="4px monospace";ctx.fillText("ROBÔ 94%",7,31)}
  }
  $$(".stage").forEach(function(b){b.addEventListener("click",function(){$$(".stage").forEach(function(z){z.setAttribute("aria-pressed",z===b)});show(+b.dataset.s)})});
  show(0);
}


/* ---------- filmes ---------- */
var F=[
 ["Ex Machina","2014","Alex Garland","#2B1B5E","#8A4FFF","Um programador é convidado para avaliar se Ava, uma robô humanoide, tem consciência de verdade. O filme é praticamente um Teste de Turing levado ao extremo.","Se uma máquina convence você de que sente algo, isso prova que ela sente?",20],
 ["Matrix","1999","Lana e Lilly Wachowski","#0E2A22","#3E7BFA","Um hacker descobre que o mundo em que vive é uma simulação criada por máquinas, que dominaram a humanidade.","Por que confiamos tanto no que vemos em telas e simulações?",8],
 ["Eu, Robô","2004","Alex Proyas","#1A2A4A","#7AA6FF","Em 2035, robôs fazem parte da rotina e seguem as Três Leis da Robótica. Um detetive desconfiado investiga um crime que pode ter sido cometido por um deles.","Regras fixas são suficientes para garantir que uma IA aja com segurança?",35],
 ["Transcendence","2014","Wally Pfister","#2A1640","#B99DFF","Um cientista à beira da morte tem a mente transferida para um computador e passa a crescer de forma descontrolada na internet.","Quem deve ter controle sobre uma IA muito poderosa?",12],
 ["A Família Mitchell e a Revolta das Máquinas","2021","Mike Rianda","#3A1A5A","#FF8AC8","Durante uma viagem de carro, uma família atrapalhada precisa salvar o mundo de uma revolta dos assistentes e robôs domésticos.","Somos dependentes demais dos nossos celulares e assistentes?",55],
 ["O Homem Bicentenário","1999","Chris Columbus","#2A2440","#C9B6FF","Andrew, um robô doméstico, desenvolve criatividade e sentimentos e passa dois séculos tentando ser reconhecido como humano.","O que faria uma máquina merecer direitos?",25]
];

var SV='<svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMin slice" aria-hidden="true">';
var ART=[
/* Ex Machina: conversa do Teste de Turing */
SV+'<defs><linearGradient id="fa1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C9B6FF"/><stop offset="1" stop-color="#7C3BFF"/></linearGradient><radialGradient id="fa2"><stop offset="0" stop-color="#B99DFF" stop-opacity=".55"/><stop offset="1" stop-color="#B99DFF" stop-opacity="0"/></radialGradient></defs>'+
'<circle cx="250" cy="70" r="90" fill="url(#fa2)"/>'+
'<rect x="34" y="26" width="140" height="58" rx="16" fill="#fff" opacity=".94"/><path d="M52 84 l-6 16 22-16z" fill="#fff" opacity=".94"/>'+
'<circle cx="62" cy="48" r="9" fill="#6B33EA"/><path d="M47 72 q15-18 30 0z" fill="#6B33EA"/><rect x="88" y="44" width="70" height="7" rx="3.5" fill="#C9B6FF"/><rect x="88" y="58" width="48" height="7" rx="3.5" fill="#E6DCFF"/>'+
'<rect x="140" y="98" width="148" height="58" rx="16" fill="url(#fa1)"/><path d="M270 156 l8 16 -24-16z" fill="#7C3BFF"/>'+
'<rect x="246" y="110" width="30" height="30" rx="7" fill="none" stroke="#fff" stroke-width="3"/><rect x="254" y="118" width="14" height="14" rx="3" fill="#fff"/>'+
'<path d="M252 106v4M261 106v4M270 106v4M252 140v4M261 140v4M270 140v4M242 116h4M242 125h4M242 134h4M276 116h4M276 125h4M276 134h4" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>'+
'<rect x="156" y="114" width="72" height="7" rx="3.5" fill="#fff" opacity=".85"/><rect x="156" y="128" width="52" height="7" rx="3.5" fill="#fff" opacity=".55"/>'+
'<circle cx="286" cy="34" r="18" fill="#fff"/><text x="286" y="42" text-anchor="middle" font-family="Sora,sans-serif" font-weight="800" font-size="22" fill="#6B33EA">?</text></svg>',
/* Matrix: mundo simulado */
SV+'<defs><linearGradient id="fb1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7AA6FF" stop-opacity="0"/><stop offset="1" stop-color="#7AA6FF" stop-opacity=".7"/></linearGradient></defs>'+
'<g stroke="url(#fb1)" stroke-width="1.2" fill="none">'+
[96,104,116,132,154,184,220].map(function(y){return '<path d="M0 '+y+'H320"/>'}).join("")+
[-260,-170,-90,-20,40,100,160,220,280,340,410,490,580].map(function(x){return '<path d="M160 88L'+x+' 220"/>'}).join("")+'</g>'+
'<g transform="translate(160 58)"><path d="M0-34 30-17 0 0-30-17z" fill="#C9B6FF"/><path d="M-30-17 0 0v34l-30-17z" fill="#8A4FFF"/><path d="M30-17 0 0v34l30-17z" fill="#5B2BD6"/></g>'+
'<g opacity=".9"><rect x="196" y="30" width="34" height="6" fill="#7AA6FF"/><rect x="204" y="40" width="18" height="6" fill="#FF8AC8"/><rect x="92" y="62" width="26" height="6" fill="#7AA6FF"/><rect x="100" y="72" width="12" height="6" fill="#FF8AC8"/></g>'+
'<g font-family="JetBrains Mono,monospace" font-size="9" fill="#AFC8FF" opacity=".55"><text x="24" y="28">01001001 01000001</text><text x="214" y="18">sim_v2.0</text><text x="236" y="74">010110</text></g></svg>',
/* Eu, Robô: as Três Leis */
SV+'<defs><linearGradient id="fc1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4F0FF"/><stop offset="1" stop-color="#C9B6FF"/></linearGradient></defs>'+
'<rect x="30" y="24" width="140" height="112" rx="14" fill="#fff" fill-opacity=".1" stroke="#fff" stroke-opacity=".35"/>'+
[0,1,2].map(function(k){var y=40+k*32;return '<circle cx="52" cy="'+(y+8)+'" r="11" fill="#7AA6FF"/><text x="52" y="'+(y+12.5)+'" text-anchor="middle" font-family="Sora,sans-serif" font-weight="700" font-size="12" fill="#0D1120">'+(k+1)+'</text><rect x="70" y="'+(y+2)+'" width="'+[84,72,62][k]+'" height="6" rx="3" fill="#fff" opacity=".85"/><rect x="70" y="'+(y+12)+'" width="'+[56,64,44][k]+'" height="5" rx="2.5" fill="#fff" opacity=".4"/>'}).join("")+
'<line x1="246" y1="10" x2="246" y2="28" stroke="#E6DCFF" stroke-width="4"/><circle cx="246" cy="10" r="6" fill="#7AA6FF"/>'+
'<rect x="200" y="28" width="92" height="78" rx="22" fill="url(#fc1)"/><rect x="212" y="46" width="68" height="30" rx="15" fill="#151A33"/>'+
'<circle cx="232" cy="61" r="7" fill="#7AA6FF"/><circle cx="260" cy="61" r="7" fill="#7AA6FF"/><circle cx="234" cy="59" r="2" fill="#fff"/><circle cx="262" cy="59" r="2" fill="#fff"/>'+
'<rect x="232" y="86" width="28" height="5" rx="2.5" fill="#8A4FFF"/><rect x="190" y="56" width="10" height="22" rx="5" fill="#C9B6FF"/><rect x="292" y="56" width="10" height="22" rx="5" fill="#C9B6FF"/>'+
'<path d="M222 106h48l8 34h-64z" fill="#C9B6FF" opacity=".8"/></svg>',
/* Transcendence: mente sendo enviada para a rede */
SV+'<defs><radialGradient id="fd1"><stop offset="0" stop-color="#E6DCFF"/><stop offset="1" stop-color="#8A4FFF"/></radialGradient></defs>'+
'<g stroke="#C9B6FF" stroke-opacity=".6" stroke-width="1.5">'+
'<path d="M70 40L104 58M104 58L82 90M82 90L50 74M50 74L70 40M104 58L120 96M82 90L120 96M70 40L40 46M50 74L40 46M104 58L130 40"/></g>'+
[[70,40,8],[104,58,10],[82,90,8],[50,74,7],[120,96,6],[40,46,5],[130,40,5]].map(function(n){return '<circle cx="'+n[0]+'" cy="'+n[1]+'" r="'+n[2]+'" fill="url(#fd1)"/>'}).join("")+
[[150,52,8,.9],[166,64,6,.75],[180,48,6,.6],[194,70,5,.5],[206,56,4,.4],[160,84,5,.7],[188,92,4,.45]].map(function(p){return '<rect x="'+p[0]+'" y="'+p[1]+'" width="'+p[2]+'" height="'+p[2]+'" rx="1.5" fill="#B99DFF" opacity="'+p[3]+'"/>'}).join("")+
[0,1,2].map(function(k){var y=24+k*30;return '<rect x="222" y="'+y+'" width="76" height="24" rx="6" fill="#1B1640" stroke="#B99DFF" stroke-opacity=".6"/><circle cx="234" cy="'+(y+12)+'" r="3.5" fill="#3DD598"/><rect x="244" y="'+(y+9)+'" width="42" height="6" rx="3" fill="#B99DFF" opacity=".5"/>'}).join("")+
'<rect x="40" y="124" width="258" height="8" rx="4" fill="#fff" fill-opacity=".15"/><rect x="40" y="124" width="224" height="8" rx="4" fill="#B99DFF"/>'+
'<text x="298" y="118" text-anchor="end" font-family="JetBrains Mono,monospace" font-size="10" fill="#E6DCFF">upload 87%</text></svg>',
/* Família Mitchell: viagem de carro cercada de aparelhos */
SV+'<defs><linearGradient id="fe1" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FF8AC8"/><stop offset="1" stop-color="#8A4FFF"/></linearGradient></defs>'+
'<circle cx="60" cy="40" r="22" fill="#FFC56B" opacity=".9"/>'+
'<path d="M-10 150 Q120 110 330 136 L330 230 L-10 230z" fill="#1A1238" opacity=".75"/>'+
'<path d="M10 152 Q120 120 320 142" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-dasharray="14 12" fill="none"/>'+
'<g transform="translate(118 84)"><path d="M0 40 V24 Q4 14 18 12 L34 0 H84 L102 14 Q118 16 120 30 V40z" fill="url(#fe1)"/>'+
'<path d="M38 5 H60 V16 H26z M66 5 H82 L96 16 H66z" fill="#E6DCFF" opacity=".9"/><rect x="0" y="36" width="122" height="8" rx="4" fill="#5B2BD6"/>'+
'<circle cx="26" cy="44" r="11" fill="#151A33"/><circle cx="26" cy="44" r="4.5" fill="#C9B6FF"/><circle cx="94" cy="44" r="11" fill="#151A33"/><circle cx="94" cy="44" r="4.5" fill="#C9B6FF"/><path d="M-2 18 h-26 M-6 28 h-34" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/></g>'+
[[196,22,-12],[244,40,10],[150,30,6]].map(function(p){return '<g transform="translate('+p[0]+' '+p[1]+') rotate('+p[2]+')"><rect width="22" height="38" rx="5" fill="#151A33" stroke="#FF8AC8" stroke-width="2"/><rect x="4" y="5" width="14" height="24" rx="2" fill="#FF8AC8" opacity=".6"/><circle cx="11" cy="15" r="2.5" fill="#fff"/><circle cx="11" cy="23" r="1.5" fill="#fff"/></g>'}).join("")+
'<path d="M280 24 a14 14 0 0 1 20 0 M284 30 a8 8 0 0 1 12 0" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="290" cy="36" r="2.5" fill="#fff"/></svg>',
/* O Homem Bicentenário: dois séculos de tempo */
SV+'<defs><linearGradient id="ff1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE3A8"/><stop offset="1" stop-color="#FFB86B"/></linearGradient></defs>'+
'<text x="160" y="104" text-anchor="middle" font-family="Sora,sans-serif" font-weight="800" font-size="104" fill="#fff" opacity=".07">200</text>'+
'<rect x="128" y="16" width="64" height="9" rx="4.5" fill="#E6DCFF"/><rect x="128" y="125" width="64" height="9" rx="4.5" fill="#E6DCFF"/>'+
'<path d="M136 25 H184 Q184 58 162 75 Q184 92 184 125 H136 Q136 92 158 75 Q136 58 136 25z" fill="#fff" fill-opacity=".14" stroke="#E6DCFF" stroke-width="2.5"/>'+
'<path d="M144 40 H176 Q172 60 160 70 Q148 60 144 40z" fill="url(#ff1)"/><path d="M146 125 Q160 100 174 125z" fill="url(#ff1)"/><path d="M160 72 V112" stroke="#FFC56B" stroke-width="2" stroke-dasharray="2 4"/>'+
'<g transform="translate(76 70)"><circle r="20" fill="none" stroke="#B99DFF" stroke-width="9" stroke-dasharray="6 5.2"/><circle r="15" fill="#5B2BD6"/><circle r="6" fill="#2A2440"/></g>'+
'<g transform="translate(246 52)"><circle r="14" fill="none" stroke="#7AA6FF" stroke-width="7" stroke-dasharray="4.6 4.2"/><circle r="10.5" fill="#3E7BFA"/><circle r="4" fill="#2A2440"/></g>'+
'<g transform="translate(232 104)"><circle r="10" fill="none" stroke="#C9B6FF" stroke-width="6" stroke-dasharray="3.6 3.2"/><circle r="7.5" fill="#8A4FFF"/><circle r="3" fill="#2A2440"/></g></svg>'
];
var SLUG=["ex-machina","matrix","eu-robo","transcendence","mitchells","homem-bicentenario"];
function renderFilms(){
  $("#films").innerHTML=F.map(function(f,i){
    return '<article class="film"><div class="poster" style="background:linear-gradient(150deg,'+f[3]+' 10%,'+f[4]+' 140%)">'+ART[i]+'<img class="poster-img" src="img/filmes/'+SLUG[i]+'.jpg" alt="Pôster de '+f[0]+'" loading="lazy" onerror="this.remove()" onload="this.parentNode.classList.add(\'has-img\')"><span class="yr">'+f[1]+'</span><h3'+(f[0].length>24?' class="long"':'')+'>'+f[0]+'</h3></div><div class="film-body"><span class="dir">Direção: '+f[2]+'</span><p>'+f[5]+'</p><p class="q"><b>Para debater:</b> '+f[6]+'</p>'+
    '<div class="real"><div class="lbl"><span>Pura ficção</span><span>Perto da IA de hoje</span></div><div class="track" aria-label="Proximidade da IA atual: '+f[7]+' de 100"><i style="left:'+f[7]+'%"></i></div></div></div></article>'}).join("");
}

/* ---------- roteador ---------- */
var ROUTES=["inicio","ia","ensine","aplicacoes","jogo","filmes"];
function route(){
  var h=(location.hash||"#inicio").slice(1);
  var art=TOPICS.some(function(t){return t.id===h});
  if(!art&&ROUTES.indexOf(h)<0)h="inicio";
  var page=art?"article":h;
  $$(".page").forEach(function(p){p.hidden=p.dataset.page!==page});
  var navKey=art?"ia":h;
  $$("[data-nav]").forEach(function(a){if(a.dataset.nav===navKey)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
  if(art)renderArticle(h);
  if(page==="jogo"&&!route.gameInit){route.gameInit=true;Runner.initTab()}
  if(page!=="jogo")Runner.leave();
  if(page==="ensine")Teach.init();
  $("#readbar").hidden=!art;
  window.scrollTo(0,0);
}
window.addEventListener("hashchange",route);

$$("[data-jump]").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();var el=document.getElementById(a.dataset.jump);if(el)el.scrollIntoView({behavior:reduce?"auto":"smooth"})})});

/* barra de leitura + toc ativo */
window.addEventListener("scroll",function(){
  var rb=$("#readbar");if(rb.hidden)return;
  var d=document.documentElement,max=d.scrollHeight-innerHeight;rb.style.width=(max>0?scrollY/max*100:0)+"%";
  var cur=null;$$(".prose section[id]").forEach(function(s){if(s.getBoundingClientRect().top<160)cur=s.id});
  $$("#toc a").forEach(function(a){a.classList.toggle("on",a.dataset.sec===cur)});
},{passive:true});

/* ---------- texto digitando no hero ---------- */
(function(){var el=$("#typed"),qs=["o que é aprendizado de máquina?","como uma rede neural aprende?","onde a IA já está no meu dia?","uma máquina consegue enxergar?"],qi=0;
 if(reduce)return;
 function type(s,i){el.textContent=s.slice(0,i);if(i<s.length)setTimeout(function(){type(s,i+1)},45);else setTimeout(erase,2200)}
 function erase(){var s=el.textContent;if(s.length){el.textContent=s.slice(0,-1);setTimeout(erase,22)}else{qi=(qi+1)%qs.length;type(qs[qi],0)}}
 setTimeout(erase,2600)})();

/* ---------- rede neural de fundo ---------- */
var cv=$("#net"),cx=cv.getContext("2d"),pts=[],W=0,H=0,mouse={x:-999,y:-999},col={dot:"#8A4FFF",line:"138,79,255"};
function netColors(){var s=getComputedStyle(root);col.dot=s.getPropertyValue("--purple").trim()||"#8A4FFF";col.dark=isDark()}
function size(){var r=cv.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);
  var n=Math.round(Math.min(70,W*H/16000));pts=[];for(var i=0;i<n;i++)pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3})}
function frame(){
  if(!$('[data-page="inicio"]').hidden){
  cx.clearRect(0,0,W,H);var a=col.dark?.55:.35;
  for(var i=0;i<pts.length;i++){var p=pts[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
    for(var j=i+1;j<pts.length;j++){var q=pts[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<120){cx.strokeStyle="rgba(138,79,255,"+(a*(1-d/120)).toFixed(3)+")";cx.lineWidth=1;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}
    var dm=Math.hypot(p.x-mouse.x,p.y-mouse.y);if(dm<160){cx.strokeStyle="rgba(62,123,250,"+(.6*(1-dm/160)).toFixed(3)+")";cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(mouse.x,mouse.y);cx.stroke()}
    cx.fillStyle=col.dot;cx.globalAlpha=a+.2;cx.beginPath();cx.arc(p.x,p.y,2.2,0,6.283);cx.fill();cx.globalAlpha=1}}
  if(!reduce)requestAnimationFrame(frame)}
$(".hero").addEventListener("pointermove",function(e){var r=cv.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top});
$(".hero").addEventListener("pointerleave",function(){mouse.x=mouse.y=-999});
window.addEventListener("resize",size);


/* ---------- chatbot Nova (Naive Bayes, roda no navegador) ---------- */
var PAGE_NAMES={inicio:"Início",ia:"O que é IA?",definicao:"Definição de IA",
 "machine-learning":"Machine e Deep Learning","redes-neurais":"Redes Neurais Artificiais",
 "visao-computacional":"Robótica e Visão Computacional",ensine:"Ensine a IA",aplicacoes:"Aplicações",jogo:"Jogo",filmes:"Filmes"};

/* Base de conhecimento: [id, frases de exemplo (treino), resposta, página relacionada, sugestões] */
var KB=[
 ["saudacao",["oi","olá","ola nova","bom dia","boa tarde","boa noite","e aí","eae","opa","hey","salve","tudo bem","oi tudo bem"],
  "Oi! Eu sou a **Nova**. Pode me perguntar sobre inteligência artificial, machine learning, redes neurais ou sobre o próprio site.",null,["O que é IA?","Como você funciona?"]],
 ["despedida",["tchau","até mais","falou","flw","até logo","vou indo","adeus","até a próxima"],
  "Até mais! Se quiser testar o que aprendeu, os jogos **Inova Runner** e **Central de Comando** estão te esperando.","jogo"],
 ["agradecimento",["obrigado","obrigada","valeu","vlw","muito obrigado","brigado","agradeço","show valeu"],
  "De nada! Se tiver mais alguma dúvida sobre IA, é só perguntar."],
 ["elogio",["você é legal","gostei de você","muito bom","incrível","você é inteligente","adorei","que top","mandou bem"],
  "Obrigada! Mas o mérito é do grupo EDUTEC, que me treinou com frases de exemplo."],
 ["quem_e_voce",["quem é você","qual seu nome","o que você é","você é quem","se apresente","quem é a nova","você é um robô","você é humana"],
  "Sou a **Nova**, o chatbot do InovaAI. Não sou uma pessoa: sou um programa que roda direto no seu navegador e tenta descobrir a **intenção** da sua pergunta para escolher a melhor resposta.",null,["Como você funciona?","Você é uma IA de verdade?"]],
 ["como_funciona",["como você funciona","como você pensa","como você entende","como você foi feita","que algoritmo você usa","como você aprendeu","naive bayes","como você escolhe a resposta"],
  "Eu uso um algoritmo de machine learning chamado **Naive Bayes**:\n- Quando o site abre, eu leio centenas de frases de exemplo, cada uma marcada com uma intenção (como “o que é IA” ou “perceptron”).\n- Conto quais palavras aparecem em cada intenção.\n- Quando você pergunta, calculo a probabilidade de cada intenção e respondo a mais provável.\nLigue a opção **Ver como pensei** no topo do chat para ver isso acontecendo.","machine-learning"],
 ["ia_de_verdade",["você é uma ia de verdade","você é igual ao chatgpt","você é um modelo de linguagem","você pensa de verdade","você tem consciência","você é inteligente de verdade","você usa chatgpt"],
  "Sou uma IA bem simples. Eu **classifico** sua pergunta e escolho uma resposta que o grupo escreveu; não crio textos novos como o ChatGPT. Em compensação, funciono sem internet, de graça e em qualquer navegador.",null,["Como você funciona?","O que é o ChatGPT?"]],
 ["criadores",["quem criou o site","quem fez esse site","quem são os autores","quem desenvolveu","qual o grupo","integrantes do grupo","quem te criou","quem te programou"],
  "O InovaAI foi criado pelo grupo **EDUTEC 2026**: Leonardo Bizo, Nickolas Zilig, Sofia Porto e Yago Santos, alunos do curso técnico em TI.","inicio"],
 ["projeto",["o que é o edutec","o que é esse projeto","qual o objetivo do site","por que esse site existe","sobre o projeto","para que serve esse site","qual o tema do projeto"],
  "O **EDUTEC** é um projeto que integra as matérias de TI com as matérias regulares. O grupo escolheu inteligência artificial como tema para informar, debater e discutir o impacto da IA na sociedade.","inicio"],
 ["o_que_e_ia",["o que é ia","o que é inteligência artificial","defina inteligência artificial","o que significa ia","explica o que é ia","conceito de ia","definição de ia","ia é o que","me explica inteligência artificial"],
  "**Inteligência artificial** é a capacidade de um sistema computacional realizar tarefas que normalmente exigiriam inteligência humana, como aprender, raciocinar e reconhecer padrões. Exemplos: recomendações da Netflix, tradutores e assistentes de voz.","definicao",["Como surgiu a IA?","Exemplos de IA no dia a dia"]],
 ["historia",["como surgiu a ia","história da ia","quando a ia foi criada","quem inventou a ia","quem inventou a inteligência artificial","quem criou a ia","quem criou a inteligência artificial","quem é o pai da ia","inventor da ia","criador da inteligência artificial","quando inventaram a ia","origem da inteligência artificial","primeira ia","quando começou a ia","desde quando existe ia"],
  "A IA não tem um único inventor; ela surgiu na década de **1950**. Em 1950, Alan Turing propôs o Teste de Turing. Em **1956**, John McCarthy e outros pesquisadores organizaram a Conferência de Dartmouth, onde o termo “inteligência artificial” foi usado oficialmente pela primeira vez. Por isso Turing e McCarthy costumam ser chamados de pais da IA. Depois vieram marcos como o Deep Blue vencendo Kasparov no xadrez (1997) e o ChatGPT (2022).","definicao",["O que é o Teste de Turing?"]],
 ["turing",["teste de turing","quem foi alan turing","alan turing","o que é o teste de turing","turing test"],
  "O **Teste de Turing** foi proposto por Alan Turing em 1950: uma pessoa conversa por texto com um humano e com uma máquina, sem ver quem é quem. Se não conseguir distinguir a máquina, ela demonstrou comportamento inteligente. O filme **Ex Machina** brinca com essa ideia.","definicao"],
 ["ia_forte",["o que é ia forte","ia fraca","diferença entre ia forte e fraca","ia geral","agi","superinteligência","ia que pensa como humano"],
  "**IA fraca** (ou estreita) é feita para uma tarefa específica, como reconhecer rostos ou traduzir textos; é a IA que existe hoje. **IA forte** seria uma IA capaz de raciocinar, planejar e resolver problemas de forma geral, como um humano. Segundo a IBM, ela ainda é teórica.","definicao"],
 ["cotidiano",["exemplos de ia no dia a dia","onde a ia está","ia no cotidiano","onde eu uso ia","ia no celular","exemplos de inteligência artificial","onde encontro ia","ia na minha vida"],
  "A IA já está em muita coisa que você usa:\n- Recomendações da Netflix, do YouTube e do Spotify\n- Desbloqueio do celular pelo rosto\n- Tradutores automáticos\n- Assistentes de voz\n- Filtros de spam do e-mail\n- Apps de mapa que preveem o trânsito\nQuer colocar isso em prática? Jogue a **Central de Comando** na página Jogo.","jogo"],
 ["beneficios",["benefícios da ia","vantagens da ia","pontos positivos da ia","para que serve a ia","ia ajuda em que","por que a ia é importante","lado bom da ia"],
  "A IA torna tarefas mais rápidas e precisas: ajuda médicos em diagnósticos, personaliza o ensino, evita falhas em máquinas na indústria e aumenta a segurança no trânsito. Veja exemplos na página **Aplicações**.","aplicacoes"],
 ["desafios",["riscos da ia","perigos da ia","desvantagens da ia","pontos negativos da ia","ética na ia","problemas da ia","ia é perigosa","lado ruim da ia","viés da ia","preconceito em ia"],
  "Os principais desafios da IA são:\n- **Ética:** modelos podem repetir preconceitos presentes nos dados.\n- **Privacidade:** muitos sistemas usam dados pessoais.\n- **Trabalho:** algumas funções podem mudar ou ser substituídas.\n- **Dependência e desinformação:** a IA pode errar ou criar conteúdo falso.\nPor isso é importante usar IA de forma crítica e consciente.","definicao"],
 ["privacidade",["privacidade","a ia usa meus dados","dados pessoais","a ia sabe tudo sobre mim","lgpd","meus dados estão seguros"],
  "Muitos sistemas de IA aprendem com dados pessoais, como histórico de buscas e fotos. No Brasil, a **LGPD** (Lei Geral de Proteção de Dados) define regras para coletar e usar esses dados. Uma boa prática é ler permissões dos apps e compartilhar só o necessário."],
 ["empregos",["a ia vai roubar empregos","ia vai substituir pessoas","vou perder meu emprego","profissões do futuro","ia e mercado de trabalho","a ia vai acabar com empregos"],
  "A IA automatiza tarefas repetitivas, então algumas funções vão mudar ou diminuir. Ao mesmo tempo surgem novas profissões, como cientista de dados e engenheiro de machine learning. Quem aprende a trabalhar **junto** com a IA tende a se dar melhor."],
 ["dominar_mundo",["a ia vai dominar o mundo","as máquinas vão se rebelar","ia vai acabar com a humanidade","revolta das máquinas","skynet","a ia é do mal","a ia vai nos destruir"],
  "Isso é mais coisa de filme! As IAs de hoje são ferramentas feitas para tarefas específicas e não têm vontades próprias. Os riscos reais são outros: erros, preconceitos nos dados e mau uso por pessoas. Vale ver como o cinema imagina isso na página **Filmes**.","filmes"],
 ["sentimentos",["a ia tem sentimentos","ia sente","a ia é consciente","máquina pode sentir","ia tem emoções","você sente alguma coisa"],
  "Não há evidência de que as IAs atuais sintam algo. Elas processam números e padrões; quando “parecem” emocionadas, estão imitando a linguagem que aprenderam. Se uma máquina um dia poderia ter consciência é uma pergunta aberta, discutida em filmes como **Ex Machina** e **O Homem Bicentenário**.","filmes"],
 ["machine_learning",["o que é machine learning","aprendizado de máquina","o que é ml","como a máquina aprende","explica machine learning","como funciona o aprendizado de máquina","máquina aprende sozinha"],
  "**Machine learning** é um ramo da IA em que o computador aprende com exemplos em vez de seguir regras escritas à mão. Ele analisa muitos dados, encontra padrões e usa esses padrões para tomar decisões. Exemplo: um filtro de spam aprende com milhares de e-mails marcados como spam ou não.","machine-learning",["E o deep learning?"]],
 ["deep_learning",["o que é deep learning","aprendizagem profunda","o que é dl","explica deep learning","como funciona deep learning","e o deep learning"],
  "**Deep learning** (aprendizagem profunda) é um tipo de machine learning que usa redes neurais com **muitas camadas**. Com muitos dados, o computador aprende sozinho a reconhecer imagens, entender a voz ou fazer previsões. Quanto mais dados, melhor ele tende a ficar.","machine-learning"],
 ["ml_vs_dl",["diferença entre machine learning e deep learning","machine learning ou deep learning","ml vs dl","deep learning é machine learning","qual a diferença entre ia ml e dl"],
  "Pense em círculos, um dentro do outro:\n- **IA** é o campo inteiro.\n- **Machine learning** é a parte da IA que aprende com dados.\n- **Deep learning** é a parte do machine learning que usa redes neurais profundas, com muitas camadas.\nO deep learning costuma precisar de mais dados e mais poder de processamento.","machine-learning"],
 ["dados",["o que são dados de treino","por que a ia precisa de dados","dataset","treinar um modelo","o que é treinar uma ia","como treinar uma ia","o que é um modelo"],
  "Um **modelo** é o resultado do treino: um conjunto de números ajustados para resolver uma tarefa. **Treinar** é mostrar muitos exemplos (o *dataset*) e ir ajustando esses números até ele acertar. Eu mesma fui treinada assim, com frases de exemplo e suas intenções!","machine-learning"],
 ["rede_neural",["o que é rede neural","redes neurais artificiais","como funciona uma rede neural","rna","neurônio artificial","explica redes neurais"],
  "Uma **rede neural artificial** é inspirada nos neurônios do cérebro. Ela tem uma camada de entrada, uma ou mais **camadas ocultas** e uma camada de saída. Cada neurônio multiplica as entradas por **pesos**, soma tudo e decide se passa o sinal adiante. Treinar a rede é ajustar esses pesos.","redes-neurais",["O que é o perceptron?"]],
 ["perceptron",["o que é perceptron","perceptron","primeiro neurônio artificial","como funciona o perceptron","quem criou o perceptron"],
  "O **perceptron** foi o primeiro modelo de neurônio artificial, criado por Frank Rosenblatt em 1958. Ele soma as entradas multiplicadas por pesos, adiciona um viés e dispara (saída 1) se o resultado passar de zero. Dá para montar um no laboratório da página **Redes Neurais**!","redes-neurais"],
 ["pesos",["o que é peso","o que é viés","bias","peso de uma rede neural","função de ativação","o que é ativação"],
  "**Peso** diz o quanto cada entrada importa para o neurônio. **Viés** é um valor extra que deixa o neurônio mais fácil ou mais difícil de ativar. A **função de ativação** decide se o neurônio dispara a partir da soma. Mexa nesses três controles no laboratório do perceptron.","redes-neurais"],
 ["arquiteturas",["tipos de redes neurais","cnn","rede convolucional","rede recorrente","rnn","mlp","arquiteturas de redes neurais","transformer"],
  "Algumas arquiteturas de redes neurais:\n- **MLP (Perceptron Multicamadas):** a forma mais clássica.\n- **Convolucionais (CNN/RNC):** ótimas para imagens.\n- **Recorrentes (RNN/RNR):** para sequências como texto e áudio.\n- **Transformers:** base dos modelos de linguagem, como o ChatGPT.","redes-neurais"],
 ["visao",["o que é visão computacional","como a máquina enxerga","computador vê imagens","reconhecimento de imagem","reconhecimento facial","como a ia vê"],
  "**Visão computacional** é a área da IA que ensina máquinas a interpretar imagens e vídeos. Ela é usada em reconhecimento facial, carros autônomos, exames médicos e robôs na indústria.","visao-computacional",["Quais as etapas da visão computacional?"]],
 ["etapas_visao",["etapas da visão computacional","como funciona a visão computacional","passos da visão computacional","processamento de imagem","quais as etapas"],
  "A visão computacional geralmente segue quatro etapas:\n- **Aquisição:** a câmera captura a imagem.\n- **Processamento:** a imagem é limpa e simplificada.\n- **Análise:** o sistema procura formas e bordas.\n- **Reconhecimento:** compara os padrões e identifica o objeto.\nVeja cada etapa acontecendo no laboratório da página.","visao-computacional"],
 ["robotica",["robótica","o que é robótica","robôs usam ia","robô industrial","robô autônomo","braço robótico"],
  "Na **robótica**, a IA e a visão computacional permitem que robôs enxerguem o ambiente e façam tarefas sozinhos, como identificar uma peça na esteira e pegá-la na posição certa.","visao-computacional"],
 ["saude",["ia na saúde","ia na medicina","ia ajuda médicos","diagnóstico com ia","ia em hospitais"],
  "Na **saúde**, a IA ajuda a fazer diagnósticos mais rápidos e precisos, a apoiar decisões clínicas e a detectar surtos de doenças. A OMS vê a IA como apoio aos serviços de saúde, sempre com médicos no comando.","aplicacoes"],
 ["industria",["ia na indústria","ia nas fábricas","automação","manutenção preditiva","ia na produção"],
  "Na **indústria**, a IA aparece na automação com robôs, na **manutenção preditiva** (prever que uma máquina vai falhar antes de quebrar) e na otimização da logística.","aplicacoes"],
 ["transporte",["ia no transporte","carro autônomo","carro que dirige sozinho","waymo","tesla","veículo autônomo"],
  "No **transporte**, carros autônomos usam sensores, câmeras e GPS para reconhecer objetos e tomar decisões. A Waymo, empresa do grupo do Google, já opera táxis sem motorista em algumas cidades dos Estados Unidos.","aplicacoes"],
 ["educacao",["ia na educação","ia na escola","ia para estudar","posso usar ia na escola","ia ajuda a estudar","usar chatgpt para fazer trabalho"],
  "Na **educação**, a IA pode personalizar o ensino, adaptar exercícios ao ritmo de cada aluno e ajudar em pesquisas. Mas ela erra, então use como apoio: confira as informações e faça o seu próprio raciocínio.","aplicacoes"],
 ["chatgpt",["o que é o chatgpt","chatgpt","como funciona o chatgpt","modelo de linguagem","llm","gemini","claude","ia que conversa"],
  "O **ChatGPT** é um **modelo de linguagem** (LLM), lançado pela OpenAI em 2022. Ele foi treinado com enormes quantidades de texto e aprendeu a prever a próxima palavra de uma frase, o que permite gerar respostas, resumos e textos. Outros exemplos são o Gemini e o Claude.","definicao",["O que é alucinação de IA?"]],
 ["generativa",["ia generativa","ia que cria imagens","ia que faz imagens","ia que cria textos","como a ia cria arte","deepfake"],
  "**IA generativa** é a IA que cria conteúdo novo: textos, imagens, músicas e vídeos, a partir do que aprendeu com muitos exemplos. Ela é útil para criatividade, mas também pode gerar **deepfakes**, conteúdos falsos muito realistas. Desconfie e verifique a fonte."],
 ["alucinacao",["o que é alucinação de ia","a ia erra","a ia mente","a ia fala coisas falsas","a ia cria fatos errados","a ia inventa coisas","a ia inventa respostas","posso confiar na ia","por que a ia erra"],
  "**Alucinação** é quando uma IA gera uma resposta errada com toda a confiança, como inventar uma data ou uma fonte. Isso acontece porque ela gera o texto mais provável, não necessariamente o verdadeiro. Por isso, sempre confira informações importantes."],
 ["carreira",["como aprender ia","quero trabalhar com ia","como estudar inteligência artificial","qual linguagem para ia","python","carreira em ia","por onde começo a estudar ia"],
  "Um bom caminho para começar:\n- Aprender lógica de programação e **Python**\n- Estudar um pouco de matemática: estatística e álgebra\n- Fazer cursos gratuitos de machine learning\n- Criar projetinhos, como um classificador simples igual a mim!\nA trilha deste site é um ótimo primeiro passo.","ia"],
 ["filmes",["filmes sobre ia","indica um filme","recomenda um filme","filme de robô","filme de inteligência artificial","série sobre ia"],
  "Na página **Filmes** tem seis indicações, cada uma com uma pergunta para debater: Ex Machina, Matrix, Eu, Robô, Transcendence, A Família Mitchell e a Revolta das Máquinas e O Homem Bicentenário.","filmes"],
 ["ensine_info",["o que é ensine a ia","como funciona o ensine a máquina","quero ensinar a máquina","posso treinar uma ia","como treino uma ia no site","laboratório de desenho","o que é knn","k vizinhos mais próximos","k-nn","matriz de confusão","o que é validação"],
  "Na página **Ensine a IA** você desenha formas e treina um modelo de verdade, ali mesmo no navegador. Ele usa o algoritmo **k vizinhos mais próximos (k-NN)**: transforma o desenho em 256 números e compara com os exemplos que você ensinou. Dá até para avaliar o modelo com uma **matriz de confusão**.","ensine",["O que é viés da IA?"]],
 ["jogo_info",["como funciona o jogo","qual é o jogo","tem jogo no site","quero jogar","o que é o inova runner","como jogar o inova runner","como funciona a corrida","o que é o jogo é ia ou não é","quais são os controles do jogo"],
  "A página **Jogo** tem dois jogos:\n- **Inova Runner:** corra 600 metros com o BIN ou o Marcio. ↑ pula, ↓ agacha e → acelera. Bateu num obstáculo? Responda uma pergunta sobre IA. Você tem 3 vidas.\n- **Central de Comando:** jogo 3D em primeira pessoa. Ande pela sala com W A S D, olhe com o mouse e resolva 4 incidentes: alucinação, viés, privacidade e deepfake.","jogo"],
 ["piada",["conta uma piada","me faz rir","piada de ia","fala algo engraçado","piada de programador"],
  "Por que a rede neural foi ao psicólogo? Porque tinha muitas **camadas ocultas**. 😄"],
 ["desconhecido_pessoal",["qual sua idade","onde você mora","você namora","qual sua cor favorita","você come","você dorme"],
  "Sou um programa, então não tenho idade, casa nem cor favorita. Mas se a cor fosse uma variável, eu escolheria o roxo do site! 💜"]
];

/* ---------- processamento de texto ---------- */
var STOP=("a o e é de da do das dos que em um uma uns umas para pra pro por com como no na nos nas ao aos se me te eu tu ele ela isso isto esse essa este esta "+
 "qual quais onde quando sobre mais muito muita ou mas sim nao não já ja tem ter há ha ser sao são foi era seu sua meu minha nossa nosso lhe dele dela "+
 "explica explique diga diz me sabe saber gostaria queria quero pode poderia consegue entao então tipo né ne aí ai").split(" ");
var SYN={"vc":"voce","ce":"voce","ai":"ia","ias":"ia","ml":"machine","dl":"deep","aprendizado":"aprend","aprendizagem":"aprend","aprender":"aprend","rna":"rede","rnas":"rede",
 "neuronio":"neural","neuronios":"neural","neurais":"neural","inteligencia":"ia","artificial":"ia","gpt":"chatgpt","robo":"robot","robos":"robot","robotica":"robot",
 "carro":"veicul","carros":"veicul","autonomo":"autonom","autonomos":"autonom","maquina":"maquin","maquinas":"maquin"};
function norm(t){return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9 ]+/g," ")}
function stem(w){if(SYN[w])return SYN[w];w=w.replace(/oes$/,"ao").replace(/ais$/,"al").replace(/eis$/,"el").replace(/ns$/,"m");if(w.length>4)w=w.replace(/s$/,"");return w.length>6?w.slice(0,6):w}
function tokens(t){return norm(t).split(/\s+/).filter(function(w){return w&&STOP.indexOf(w)<0}).map(stem).filter(function(w){return w.length>1||w==="ia"})}

/* ---------- treino do Naive Bayes ---------- */
var NB={counts:{},totals:{},vocab:{},V:0,ex:0},ALPHA=0.01;
KB.forEach(function(k){var id=k[0];NB.counts[id]={};NB.totals[id]=0;
  k[1].forEach(function(f){NB.ex++;tokens(f).forEach(function(w){NB.counts[id][w]=(NB.counts[id][w]||0)+1;NB.totals[id]++;NB.vocab[w]=1})})});
NB.V=Object.keys(NB.vocab).length;
function classify(q){
  var toks=tokens(q),known=toks.filter(function(w){return NB.vocab[w]});
  if(!known.length)return {id:null,conf:0,toks:toks,known:known,top:[]};
  if(known.every(function(w){return w==="ia"})&&toks.length<=3)return {id:"o_que_e_ia",conf:1,toks:toks,known:known,top:[["o_que_e_ia",1]]};
  var sc=KB.map(function(k){var id=k[0],s=0;known.forEach(function(w){s+=Math.log(((NB.counts[id][w]||0)+ALPHA)/(NB.totals[id]+ALPHA*NB.V))});return [id,s]});
  var mx=Math.max.apply(null,sc.map(function(x){return x[1]}));
  var ex=sc.map(function(x){return [x[0],Math.exp(x[1]-mx)]}),sum=ex.reduce(function(a,x){return a+x[1]},0);
  var pr=ex.map(function(x){return [x[0],x[1]/sum]}).sort(function(a,b){return b[1]-a[1]});
  var cover=known.length/Math.max(1,toks.length);
  return {id:pr[0][0],conf:pr[0][1]*Math.min(1,0.4+cover),toks:toks,known:known,top:pr.slice(0,3)};
}

/* ---------- busca no conteúdo do site (TF-IDF) ---------- */
var DOCS=[];
TOPICS.forEach(function(t){t.sections.forEach(function(s){if(s[0].indexOf("LAB:")!==0)DOCS.push({title:t.title+" · "+s[0],text:s[1],page:t.id})})});
function buildIdx(){
  [["saude","Na saúde"],["industria","Na indústria"],["transporte","No transporte"],["educacao","Na educação"]].forEach(function(a){var el=document.getElementById(a[0]);if(el)DOCS.push({title:"Aplicações · "+a[1],text:$("p",el).textContent,page:"aplicacoes"})});
  F.forEach(function(f){DOCS.push({title:"Filmes · "+f[0],text:f[0]+" ("+f[1]+"). "+f[5],page:"filmes"})});
  var df={};DOCS.forEach(function(d){d.tf={};tokens(d.title+" "+d.text).forEach(function(w){d.tf[w]=(d.tf[w]||0)+1});Object.keys(d.tf).forEach(function(w){df[w]=(df[w]||0)+1})});
  DOCS.forEach(function(d){d.vec={};var n=0;Object.keys(d.tf).forEach(function(w){var v=(1+Math.log(d.tf[w]))*Math.log(DOCS.length/df[w]);d.vec[w]=v;n+=v*v});d.norm=Math.sqrt(n)||1});
  DOCS.df=df;
}
function search(q){
  var qt={};tokens(q).forEach(function(w){if(DOCS.df[w])qt[w]=(qt[w]||0)+1});
  var ws=Object.keys(qt);if(!ws.length)return null;
  var qv={},qn=0;ws.forEach(function(w){var v=(1+Math.log(qt[w]))*Math.log(DOCS.length/DOCS.df[w]);qv[w]=v;qn+=v*v});qn=Math.sqrt(qn)||1;
  var best=null;DOCS.forEach(function(d){var s=0;ws.forEach(function(w){if(d.vec[w])s+=d.vec[w]*qv[w]});s/=d.norm*qn;if(!best||s>best.s)best={d:d,s:s}});
  return best&&best.s>0.12?best:null;
}

/* ---------- navegação ---------- */
var NAV=[["ensine",["ensine","ensinar","laboratorio","desenhar","desenho"]],["jogo",["jogo","jogar","game","quiz"]],["filmes",["filme","filmes","cinema"]],["aplicacoes",["aplicacoes","aplicacao","aplicações"]],
 ["redes-neurais",["rede neural","redes neurais","perceptron"]],["machine-learning",["machine learning","deep learning","aprendizado de maquina"]],
 ["visao-computacional",["visao computacional","robotica"]],["definicao",["definicao"]],["ia",["trilha","assuntos","o que e ia"]],["inicio",["inicio","pagina inicial","home","comeco"]]];
function navIntent(q){
  var n=norm(q);if(!/\b(leva|leve|levar|abre|abra|abrir|ir para|ir pro|ir pra|vai para|vai pro|vai pra|mostra|mostre|me manda|navega|acessar|acessa|quero ver|quero ir)\b/.test(n))return null;
  for(var i=0;i<NAV.length;i++)for(var j=0;j<NAV[i][1].length;j++)if(n.indexOf(norm(NAV[i][1][j]))>-1)return NAV[i][0];
  return null;
}

/* ---------- interface ---------- */
var SUGS=["O que é IA?","Diferença entre machine e deep learning","Me leva para o jogo","Como você funciona?"];
var nv=$("#nova"),log=$("#novaLog"),inp=$("#novaInput"),sendB=$("#novaSend"),busy=false;
var showWhy=store.get("inovaai-why",false);
function esc(t){return t.replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function fmt(t){
  var lines=esc(t).split("\n"),out="",inList=false;
  lines.forEach(function(l){var m=l.match(/^\s*-\s+(.*)/);
    if(m){if(!inList){out+="<ul>";inList=true}out+="<li>"+m[1]+"</li>";return}
    if(inList){out+="</ul>";inList=false}out+=l+"<br>"});
  if(inList)out+="</ul>";
  return out.replace(/(<br>)+$/,"").replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/\*(.+?)\*/g,"<i>$1</i>");
}
function addMsg(cls,html){var d=document.createElement("div");d.className="msg "+cls;d.innerHTML=html;log.appendChild(d);log.scrollTop=log.scrollHeight;return d}
function setSugs(list){$("#novaSugs").innerHTML=(list||[]).map(function(q){return '<button type="button">'+esc(q)+'</button>'}).join("");
  $$("#novaSugs button").forEach(function(b){b.addEventListener("click",function(){ask(b.textContent)})})}
function whyHtml(r,extra){
  var lab=function(id){return id.replace(/_/g," ")};
  var h='<details class="why"'+(showWhy?' open':'')+'><summary>Como pensei</summary>';
  h+='<div>Palavras que reconheci: '+(r.known.length?r.known.map(function(w){return '<code>'+esc(w)+'</code>'}).join(" "):"nenhuma")+'</div>';
  r.top.forEach(function(t){var p=Math.round(t[1]*100);h+='<div class="bar"><span>'+lab(t[0])+'</span><i style="--p:'+p+'%"></i><b>'+p+'%</b></div>'});
  if(extra)h+='<div>'+extra+'</div>';
  return h+'</details>';
}
function openNova(q){nv.hidden=false;$("#novaFab").setAttribute("aria-expanded","true");
  if(!log.children.length){addMsg("bot","Oi! Eu sou a <b>Nova</b>, o chatbot do InovaAI. Rodo inteira no seu navegador, sem internet: aprendi com <b>"+NB.ex+" frases de exemplo</b> usando um classificador Naive Bayes. Pergunte algo sobre IA!");setSugs(SUGS)}
  if(q)ask(q);else setTimeout(function(){inp.focus()},50)}
function closeNova(){nv.hidden=true;$("#novaFab").setAttribute("aria-expanded","false");$("#novaFab").focus()}
$("#novaFab").addEventListener("click",function(){nv.hidden?openNova():closeNova()});
$("#novaClose").addEventListener("click",closeNova);
var whyBtn=$("#novaWhy");whyBtn.setAttribute("aria-pressed",showWhy);
whyBtn.addEventListener("click",function(){showWhy=!showWhy;store.set("inovaai-why",showWhy);whyBtn.setAttribute("aria-pressed",showWhy);$$(".why",log).forEach(function(d){d.open=showWhy})});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!nv.hidden)closeNova()});
$("#heroAsk").addEventListener("click",function(){openNova($("#typed").textContent.trim()||"O que é aprendizado de máquina?")});
inp.addEventListener("input",function(){inp.style.height="44px";inp.style.height=Math.min(inp.scrollHeight,110)+"px"});
inp.addEventListener("keydown",function(e){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();$("#novaForm").requestSubmit()}});
$("#novaForm").addEventListener("submit",function(e){e.preventDefault();var q=inp.value.trim();if(q)ask(q)});
log.addEventListener("click",function(e){var a=e.target.closest("[data-go]");if(a){e.preventDefault();location.hash=a.dataset.go;if(innerWidth<620)closeNova()}});

function respond(q){
  var nav=navIntent(q),r=classify(q);
  if(nav)return {html:"Pronto, abri a página <b>"+PAGE_NAMES[nav]+"</b> para você.",go:nav,why:whyHtml(r,"Detectei um pedido de navegação."),sugs:null};
  if(r.id&&r.conf>=0.42){
    var k=KB.filter(function(x){return x[0]===r.id})[0];
    return {html:fmt(k[2])+(k[3]?'<a class="go" href="#'+k[3]+'" data-go="'+k[3]+'">Abrir página '+PAGE_NAMES[k[3]]+' →</a>':''),why:whyHtml(r),sugs:k[4]||null};
  }
  var hit=search(q);
  if(hit){var sent=hit.d.text.split(/(?<=[.!?])\s+/).slice(0,2).join(" ");
    return {html:"Não tenho uma resposta pronta para isso, mas encontrei no site, em <b>"+esc(hit.d.title)+"</b>:<br>"+esc(sent)+'<a class="go" href="#'+hit.d.page+'" data-go="'+hit.d.page+'">Ler a página completa →</a>',
      why:whyHtml(r,"Confiança baixa, então busquei no texto do site (similaridade "+Math.round(hit.s*100)+"%)."),sugs:null};}
  return {html:"Hmm, não entendi essa. Sou um chatbot simples e conheço principalmente assuntos de IA e do site. Tente perguntar de outro jeito ou escolha uma sugestão abaixo.",why:whyHtml(r,"Nenhuma intenção passou do limite de confiança."),sugs:SUGS};
}
function ask(q){
  if(busy)return;busy=true;sendB.disabled=true;
  inp.value="";inp.style.height="44px";addMsg("me",esc(q));setSugs([]);
  var bubble=addMsg("bot thinking","<i></i><i></i><i></i>Pensando...");
  var res=respond(q);
  setTimeout(function(){
    bubble.className="msg bot";bubble.innerHTML=res.html+res.why;
    if(res.go)location.hash=res.go;
    setSugs(res.sugs);busy=false;sendB.disabled=false;log.scrollTop=log.scrollHeight;inp.focus({preventScroll:true});
  },reduce?0:350+Math.min(700,res.html.length*2));
}
buildIdx();

/* ---------- Ensine a máquina (k vizinhos mais próximos) ---------- */
var Teach=(function(){
  var N=16,K=5,MAXC=5;
  var COLORS=["#8A4FFF","#3E7BFA","#14B8A6","#E8A317","#FF66C4"];
  var pad=$("#tmPad"),pctx=pad.getContext("2d"),pix=$("#tmPixels"),xctx=pix.getContext("2d");
  var off=document.createElement("canvas");off.width=N;off.height=N;var octx=off.getContext("2d",{willReadFrequently:true});
  var data,drawing=false,last=null,hasInk=false,cur=null,guesses={n:0,ok:0},lastGuess=null,taught=false,inited=false;

  /* ----- vetor de características: recorta, centraliza, reduz para 16×16 ----- */
  function featurize(src){
    var w=src.width,h=src.height,a=src.getContext("2d",{willReadFrequently:true}).getImageData(0,0,w,h).data;
    var x0=w,y0=h,x1=-1,y1=-1;
    for(var y=0;y<h;y+=2)for(var x=0;x<w;x+=2)if(a[(y*w+x)*4+3]>40){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}
    if(x1<0)return null;
    var bw=x1-x0+1,bh=y1-y0+1,side=Math.max(bw,bh)*1.18+8,cx=(x0+x1)/2,cy=(y0+y1)/2;
    octx.clearRect(0,0,N,N);octx.imageSmoothingEnabled=true;octx.imageSmoothingQuality="high";
    octx.drawImage(src,cx-side/2,cy-side/2,side,side,0,0,N,N);
    var d=octx.getImageData(0,0,N,N).data,v=new Array(N*N),mx=0;
    for(var i=0;i<N*N;i++){v[i]=d[i*4+3]/255;if(v[i]>mx)mx=v[i]}
    for(i=0;i<N*N;i++)v[i]=+(Math.min(1,v[i]/(mx||1))).toFixed(3);
    return v;
  }
  function dist(a,b){var s=0;for(var i=0;i<a.length;i++){var t=a[i]-b[i];s+=t*t}return Math.sqrt(s)}
  function classify(v,skip){
    var ex=[];data.classes.forEach(function(c,ci){c.ex.forEach(function(e,ei){if(skip&&skip[0]===ci&&skip[1]===ei)return;ex.push({ci:ci,ei:ei,d:dist(v,e.v),v:e.v})})});
    var nonEmpty=data.classes.filter(function(c){return c.ex.length}).length;
    if(ex.length<2||nonEmpty<2)return null;
    ex.sort(function(a,b){return a.d-b.d});
    var nn=ex.slice(0,Math.min(K,ex.length)),votes=data.classes.map(function(){return 0}),tot=0;
    nn.forEach(function(n){var w=1/(n.d+.5);votes[n.ci]+=w;tot+=w});
    var p=votes.map(function(x){return x/tot}),best=0;p.forEach(function(x,i){if(x>p[best])best=i});
    return {best:best,p:p,nn:nn.slice(0,3)};
  }

  /* ----- desenho de vetores como miniaturas ----- */
  function paintVec(cv,v,color){
    var c=cv.getContext("2d"),im=c.createImageData(N,N),rgb=hex(color||cssVar("--ink"));
    for(var i=0;i<N*N;i++){im.data[i*4]=rgb[0];im.data[i*4+1]=rgb[1];im.data[i*4+2]=rgb[2];im.data[i*4+3]=Math.round(v[i]*255)}
    c.putImageData(im,0,0);
  }
  function mini(v,color,cls){var c=document.createElement("canvas");c.width=N;c.height=N;if(cls)c.className=cls;paintVec(c,v,color);return c}
  function hex(h){h=h.trim();if(h[0]!=="#")return [30,35,53];if(h.length===4)h="#"+h[1]+h[1]+h[2]+h[2]+h[3]+h[3];return [1,3,5].map(function(i){return parseInt(h.substr(i,2),16)})}
  function cssVar(n){return getComputedStyle(document.documentElement).getPropertyValue(n)}

  /* ----- exemplos gerados automaticamente ----- */
  function synth(kind){
    var c=document.createElement("canvas");c.width=c.height=320;var g=c.getContext("2d");
    g.lineWidth=14+Math.random()*8;g.lineCap=g.lineJoin="round";g.strokeStyle="#000";
    var cx=160+(Math.random()-.5)*60,cy=160+(Math.random()-.5)*60,r=60+Math.random()*60,j=function(s){return (Math.random()-.5)*s};
    g.translate(cx,cy);g.rotate(j(.5));g.beginPath();
    if(kind===0){g.ellipse(0,0,r*(.85+Math.random()*.3),r*(.85+Math.random()*.3),0,0,Math.PI*2)}
    else if(kind===1){g.moveTo(j(20),-r+j(16));g.lineTo(r*.95+j(16),r*.75+j(16));g.lineTo(-r*.95+j(16),r*.75+j(16));g.closePath()}
    else{var s=r*.85;g.moveTo(-s+j(12),-s+j(12));g.lineTo(s+j(12),-s+j(12));g.lineTo(s+j(12),s+j(12));g.lineTo(-s+j(12),s+j(12));g.closePath()}
    g.stroke();return featurize(c);
  }
  function defaults(){
    var d={classes:[{name:"Círculo",ex:[]},{name:"Triângulo",ex:[]},{name:"Quadrado",ex:[]}]};
    d.classes.forEach(function(c,i){for(var k=0;k<4;k++)c.ex.push({v:synth(i),auto:true})});return d;
  }
  function save(){store.set("inovaai-teach",data)}
  function load(){var d=store.get("inovaai-teach",null);if(d&&d.classes&&d.classes.length>=2&&d.classes.every(function(c){return Array.isArray(c.ex)}))return d;return defaults()}

  /* ----- interface ----- */
  function renderClasses(){
    var tot=0;data.classes.forEach(function(c){tot+=c.ex.length});
    $("#tmTotal").textContent=tot+" exemplos";
    $("#tmAddClass").hidden=data.classes.length>=MAXC;
    var box=$("#tmClasses");box.innerHTML="";
    data.classes.forEach(function(c,ci){
      var el=document.createElement("div");el.className="tm-class";el.style.setProperty("--c",COLORS[ci]);
      el.innerHTML='<div class="tm-class-head"><span class="tm-dot"></span><input id="tmName'+ci+'" maxlength="18" aria-label="Nome da categoria '+(ci+1)+'"><small>'+c.ex.length+'</small>'+(data.classes.length>2?'<button type="button" aria-label="Remover categoria">×</button>':'')+'</div><div class="tm-thumbs"></div>';
      var inp=$("input",el);inp.value=c.name;
      inp.addEventListener("input",function(){c.name=inp.value.trim()||"Categoria "+(ci+1);save();renderTeach();if(cur)predict()});
      var rm=$("button",el);if(rm)rm.addEventListener("click",function(){data.classes.splice(ci,1);save();renderAll()});
      var th=$(".tm-thumbs",el);
      if(!c.ex.length)th.innerHTML="<em>Nenhum exemplo ainda. Desenhe e ensine!</em>";
      c.ex.slice(-40).forEach(function(e,k){var ei=c.ex.length>40?c.ex.length-40+k:k;var m=mini(e.v,COLORS[ci],e.auto?"auto":"");m.title="Clique para apagar este exemplo";
        m.addEventListener("click",function(){c.ex.splice(ei,1);save();renderAll()});th.appendChild(m)});
      box.appendChild(el);
    });
  }
  function renderTeach(){
    var b=$("#tmTeachBtns");b.innerHTML="";
    data.classes.forEach(function(c,ci){var x=document.createElement("button");x.type="button";x.style.setProperty("--c",COLORS[ci]);x.disabled=!cur;
      x.innerHTML='<i></i>';x.appendChild(document.createTextNode(c.name));
      x.addEventListener("click",function(){teach(ci,x)});b.appendChild(x)});
  }
  function renderAll(){renderClasses();renderTeach();if(cur)predict()}

  function predict(){
    var out=$("#tmResult"),r=cur&&classify(cur);
    if(!cur){out.innerHTML='<p class="tm-empty">Desenhe algo para a máquina tentar adivinhar.</p>';$("#tmWhy").hidden=true;return}
    if(!r){out.innerHTML='<p class="tm-empty">A máquina ainda não tem exemplos suficientes. Ensine pelo menos um desenho de duas categorias diferentes.</p>';$("#tmWhy").hidden=true;return}
    lastGuess=r.best;
    var conf=Math.round(r.p[r.best]*100),word=conf>=80?"Tenho certeza":conf>=55?"Acho que é":"Talvez seja";
    out.innerHTML='<div class="tm-top"><span>'+word+'</span><strong>'+esc(data.classes[r.best].name)+'</strong><span>'+conf+'% de confiança</span></div><div class="tm-bars">'+
      data.classes.map(function(c,i){var p=Math.round(r.p[i]*100);return '<div class="tm-bar"><span>'+esc(c.name)+'</span><i style="--p:'+p+'%;--c:'+COLORS[i]+'"></i><b>'+p+'%</b></div>'}).join("")+'</div>';
    var nn=$("#tmNN");nn.innerHTML="";
    r.nn.forEach(function(n){var f=document.createElement("figure");f.style.setProperty("--c",COLORS[n.ci]);f.appendChild(mini(n.v,COLORS[n.ci]));
      var cap=document.createElement("figcaption");cap.textContent=data.classes[n.ci].name;f.appendChild(cap);nn.appendChild(f)});
    $("#tmWhy").hidden=false;
    $("#tmTeachLabel").textContent="Acertou? Confirme. Errou? Ensine a resposta certa:";
  }
  function teach(ci,btn){
    if(!cur)return;
    if(lastGuess!==null&&!taught){guesses.n++;if(lastGuess===ci)guesses.ok++;updScore()}
    data.classes[ci].ex.push({v:cur});save();taught=true;
    btn.classList.add("ok");
    var msg=lastGuess===null?"Guardado como exemplo de "+data.classes[ci].name+".":lastGuess===ci?"Isso! Mais um exemplo de "+data.classes[ci].name+" para reforçar.":"Anotado! Agora ela sabe que isso é "+data.classes[ci].name+".";
    $("#tmTeachLabel").textContent=msg;
    renderClasses();
    setTimeout(function(){clearPad();renderTeach()},650);
  }
  function updScore(){$("#tmScore").textContent=guesses.n?"Acertou "+guesses.ok+" de "+guesses.n+" palpites":""}

  /* ----- quadro de desenho ----- */
  function pos(e){var r=pad.getBoundingClientRect();return {x:(e.clientX-r.left)*pad.width/r.width,y:(e.clientY-r.top)*pad.height/r.height}}
  function clearPad(){pctx.clearRect(0,0,pad.width,pad.height);hasInk=false;cur=null;lastGuess=null;taught=false;pad.classList.remove("drawn");$("#tmHint").hidden=false;
    xctx.clearRect(0,0,N,N);$("#tmTeachLabel").textContent="Ensine: este desenho é um…";renderTeach();predict()}
  pad.addEventListener("pointerdown",function(e){e.preventDefault();try{pad.setPointerCapture(e.pointerId)}catch(_){}
    if(taught)clearPad();drawing=true;last=pos(e);pctx.lineWidth=18;pctx.lineCap=pctx.lineJoin="round";pctx.strokeStyle=cssVar("--ink").trim()||"#1E2335";
    pctx.beginPath();pctx.arc(last.x,last.y,9,0,Math.PI*2);pctx.fillStyle=pctx.strokeStyle;pctx.fill();hasInk=true;$("#tmHint").hidden=true;pad.classList.add("drawn")});
  pad.addEventListener("pointermove",function(e){if(!drawing)return;var p=pos(e);pctx.beginPath();pctx.moveTo(last.x,last.y);pctx.lineTo(p.x,p.y);pctx.stroke();last=p});
  function end(){if(!drawing)return;drawing=false;if(!hasInk)return;cur=featurize(pad);if(cur){paintVec(pix,cur,cssVar("--purple"));renderTeach();predict()}}
  pad.addEventListener("pointerup",end);pad.addEventListener("pointercancel",end);
  $("#tmClear").addEventListener("click",clearPad);

  /* ----- botões de dados ----- */
  $("#tmAddClass").addEventListener("click",function(){if(data.classes.length>=MAXC)return;data.classes.push({name:"Categoria "+(data.classes.length+1),ex:[]});save();renderAll();
    var i=$("#tmName"+(data.classes.length-1));i&&(i.focus(),i.select())});
  $("#tmSamples").addEventListener("click",function(){var d=defaults();
    /* mantém os desenhos do usuário nas três primeiras categorias e repõe os automáticos */
    data.classes.forEach(function(c,i){c.ex=c.ex.filter(function(e){return !e.auto});if(i<3){c.ex=d.classes[i].ex.concat(c.ex)}});
    if(data.classes.length<3)data.classes=d.classes;save();renderAll()});
  var armed=false,armT=0;
  $("#tmReset").addEventListener("click",function(){var b=this;
    if(!armed){armed=true;b.textContent="Clique de novo para confirmar";armT=setTimeout(function(){armed=false;b.textContent="Apagar todos os dados"},3000);return}
    clearTimeout(armT);armed=false;b.textContent="Apagar todos os dados";
    data.classes.forEach(function(c){c.ex=[]});guesses={n:0,ok:0};updScore();save();renderAll();$("#tmEvalOut").innerHTML=""});

  /* ----- avaliação: deixe um de fora ----- */
  $("#tmEval").addEventListener("click",function(){
    var C=data.classes.length,m=[],tot=0,ok=0;for(var i=0;i<C;i++){m.push([]);for(var j=0;j<C;j++)m[i].push(0)}
    data.classes.forEach(function(c,ci){c.ex.forEach(function(e,ei){var r=classify(e.v,[ci,ei]);if(!r)return;m[ci][r.best]++;tot++;if(r.best===ci)ok++})});
    var out=$("#tmEvalOut");
    if(!tot){out.innerHTML='<p class="tm-sub" style="margin-top:12px">Ensine pelo menos dois exemplos em duas categorias para avaliar.</p>';return}
    var acc=Math.round(ok/tot*100),msg=acc>=90?"Excelente! O modelo aprendeu bem.":acc>=70?"Bom, mas dá para melhorar com mais exemplos.":"O modelo está confuso. Ensine mais exemplos ou confira se algum está na categoria errada.";
    var h='<div class="tm-acc"><strong>'+acc+'%</strong><span>de acerto em '+tot+' testes. '+msg+'</span></div><div class="tm-matrix"><table><caption>Matriz de confusão: linhas são a resposta certa, colunas são o palpite da máquina.</caption><tr><th></th>'+
      data.classes.map(function(c){return '<th>'+esc(c.name)+'</th>'}).join("")+'</tr>';
    m.forEach(function(row,i){var rt=row.reduce(function(a,b){return a+b},0)||1;h+='<tr><th>'+esc(data.classes[i].name)+'</th>'+row.map(function(v,j){return '<td class="'+(i===j?'d':v?'x':'')+'" style="--a:'+(v/rt*.55).toFixed(2)+'">'+v+'</td>'}).join("")+'</tr>'});
    out.innerHTML=h+'</table></div>';
  });

  function init(){if(inited)return;inited=true;data=load();renderAll();predict()}
  return {init:init};
})();

/* ---------- Inova Runner (jogo do grupo EDUTEC, adaptado para o site) ---------- */
var Runner=(function(){
  var CFG={width:1100,height:520,ground:418,finish:600,pxPerM:36,speed:290,speedRamp:.7,speedBoost:1.22,startX:175,
    gravity:2300,jumpVelocity:-960,jumpCut:.45,fastFall:1500,moveSpeed:300,slideDuration:.7,protection:1.6,lives:3};
  var NAMES={bin:"BIN",marcio:"Marcio"};
  var SHEETS={bin:"img/run-bin.webp",marcio:"img/run-marcio.webp"},SLIDES={bin:"img/roll-bin.webp",marcio:"img/roll-marcio.webp"};
  var QUESTIONS=[
   ["História da IA","Em qual década começou a história da inteligência artificial?",["1950","1930","1980","2000"],"A história da IA começou na década de 1950, com o Teste de Turing."],
   ["História da IA","Quem propôs o Teste de Turing?",["Alan Turing","Albert Einstein","Steve Jobs","Tim Berners-Lee"],"Alan Turing propôs o teste em 1950 para avaliar se uma máquina se comporta de forma inteligente."],
   ["História da IA","Em qual evento o termo “inteligência artificial” foi usado oficialmente pela primeira vez?",["Conferência de Dartmouth","Feira de Hannover","Olimpíadas de Londres","Congresso de Viena"],"O termo foi cunhado na Conferência de Dartmouth, em 1956."],
   ["Inteligência artificial","O que os sistemas de IA procuram realizar?",["Tarefas que normalmente exigem inteligência humana","Apenas armazenar arquivos","Somente cálculos simples","Apenas conectar computadores"],"A IA realiza tarefas como aprender, raciocinar e reconhecer padrões."],
   ["Inteligência artificial","Qual destes é um desafio ligado ao avanço da IA?",["Privacidade","Cor do monitor","Tamanho do teclado","Velocidade da impressora"],"Os principais desafios envolvem ética, privacidade e mercado de trabalho."],
   ["Inteligência artificial","A IA que existe hoje, feita para tarefas específicas, é chamada de…",["IA fraca ou estreita","IA forte","IA consciente","IA universal"],"A IA forte, capaz de raciocinar como um humano em qualquer tarefa, ainda é teórica."],
   ["Machine learning","O que é machine learning?",["Um método em que o sistema aprende com dados","Um editor de imagens","Um tipo de cabo","Uma rede social"],"Machine learning automatiza a construção de modelos que aprendem com dados."],
   ["Machine learning","O que os modelos de machine learning identificam nos dados?",["Padrões","Parafusos","Somente cores da tela","Senhas, obrigatoriamente"],"Os modelos analisam dados para encontrar padrões e apoiar decisões."],
   ["Machine learning","O que pode acontecer quando um modelo recebe novos dados?",["Ele pode se adaptar","Ele sempre para de funcionar","Ele apaga a internet","Ele troca o computador"],"O aprendizado é iterativo: com novos dados, o modelo se adapta."],
   ["Machine learning","Um filtro de spam que aprende com milhares de e-mails marcados é um exemplo de…",["Machine learning","Regra fixa escrita à mão","Hardware","Planilha"],"Ele descobre sozinho os padrões de spam a partir dos exemplos."],
   ["Deep learning","Deep learning também é chamado de…",["Aprendizagem profunda","Aprendizagem impressa","Memória virtual","Automação manual"],"Deep learning significa aprendizagem profunda."],
   ["Deep learning","O deep learning usa várias…",["Camadas de processamento","Tomadas elétricas","Telas ao mesmo tempo","Pastas vazias"],"Os dados passam por muitas camadas de uma rede neural."],
   ["Deep learning","Qual tarefa pode usar deep learning?",["Reconhecimento de voz","Trocar uma bateria","Limpar uma tela","Montar uma cadeira"],"Reconhecimento de voz, identificação de imagens e previsões usam deep learning."],
   ["Deep learning","Em geral, o desempenho do deep learning melhora quando há…",["Mais dados","Menos dados","Um monitor maior","Internet mais lenta"],"Quanto maior a quantidade de dados, melhor o sistema tende a aprender."],
   ["Redes neurais","Em que as redes neurais artificiais são inspiradas?",["Nos neurônios humanos","Em motores de carros","Em satélites","Em cabos de rede"],"As RNA se baseiam na arquitetura dos neurônios do cérebro."],
   ["Redes neurais","Quais camadas aparecem em uma rede neural artificial?",["Entrada, oculta e saída","Somente entrada","Áudio e vídeo","Superior e inferior"],"Uma RNA tem camada de entrada, de saída e pelo menos uma camada oculta."],
   ["Redes neurais","Como se chama o primeiro tipo de neurônio artificial?",["Perceptron","Pixel","Sensor","Algoritmo azul"],"O Perceptron foi o primeiro modelo de neurônio usado em uma RNA."],
   ["Redes neurais","O que a função de ativação decide?",["Se o neurônio será ativado ou não","A cor da tela","A velocidade da internet","O nome da rede"],"Ela recebe a soma ponderada e decide se o neurônio dispara."],
   ["Redes neurais","Que tipo de rede neural é muito usada com imagens?",["Rede neural convolucional","Rede elétrica","Rede social","Rede Wi-Fi"],"As redes convolucionais (RNC) são especializadas em imagens."],
   ["Visão computacional","O que a visão computacional permite às máquinas?",["Interpretar informações visuais","Sentir sabores","Produzir eletricidade","Trocar peças sozinhas"],"Ela permite que máquinas “vejam” e interpretem imagens e vídeos."],
   ["Visão computacional","Qual é uma etapa da visão computacional?",["Aquisição de imagens","Impressão de documentos","Criação de senhas","Compra de equipamentos"],"As etapas são aquisição, processamento, análise e reconhecimento de padrões."],
   ["Visão computacional","Desbloquear o celular pelo rosto usa…",["Visão computacional","Bluetooth","GPS","Bateria extra"],"O sistema reconhece os traços do rosto a partir da imagem da câmera."],
   ["Aplicações da IA","Na saúde, como a IA pode ajudar?",["Apoiando diagnósticos e decisões clínicas","Eliminando todos os médicos","Garantindo que ninguém adoeça","Substituindo todo tratamento"],"A IA apoia diagnósticos, decisões clínicas, pesquisas e saúde pública."],
   ["Aplicações da IA","Na indústria, a manutenção preditiva serve para…",["Prever falhas e reduzir custos","Mudar a cor das máquinas","Aumentar os erros","Parar toda a produção"],"Ela ajuda a evitar falhas antes que aconteçam."],
   ["Aplicações da IA","Na educação, plataformas adaptativas podem…",["Ajustar conteúdos às necessidades do estudante","Dar a mesma atividade para todos sempre","Eliminar professores","Impedir pesquisas"],"A IA pode personalizar o ensino conforme o ritmo de cada aluno."],
   ["Aplicações da IA","Carros autônomos usam IA para…",["Reconhecer objetos e tomar decisões","Trocar o óleo sozinhos","Tocar música mais alto","Gastar mais combustível"],"Eles processam dados de sensores, câmeras e GPS para dirigir com segurança."],
   ["IA no dia a dia","Qual destes usa IA?",["Recomendações de séries da Netflix","Um interruptor de luz","Uma régua","Um despertador comum"],"Sistemas de recomendação aprendem com o histórico de muitos usuários."],
   ["IA no dia a dia","Quando uma IA inventa uma resposta errada com confiança, chamamos isso de…",["Alucinação","Atualização","Download","Formatação"],"Por isso é importante conferir informações geradas por IA."]
  ];
  var $id=function(i){return document.getElementById(i)};
  var cv=$id("rnCanvas"),ctx=cv.getContext("2d"),sprites={},ready=false;
  var state="menu",prevState="running",chosen="bin",distance=0,correct=0,lives=CFG.lives,bits=0,asked=0,hits=0;
  var elapsed=0,last=0,invul=0,player,obstacles=[],coins=[],items=[],qDeck=[],qi=0,curQ=null,answered=false,wrong=[],particles=[],popups=[],toastT=0,loop=0;
  var score=0,streak=0,bestStreak=0,shield=false,magnet=0,shake=0,flash=null,bannerO=null,cd=0,hitT=0,pending=null,finT=0,nextMile=100,coinChain=0,coinT=0,hudCache="";
  var keys={};
  var C={purple:"#8A4FFF",dark:"#273043",white:"#FFFFFF",pink:"#FF66C4",cyan:"#57E6FF",gold:"#FFD166",lime:"#B6FF5C",orange:"#FF9F43"};
  /* obstáculos: pular dados, chips, firewalls e bugs; agachar sob scanners; drones sobem e descem */
  var OB={data:{w:62,h:62},chip:{w:54,h:40},wall:{w:38,h:112},bug:{w:48,h:30,move:150},scanner:{w:100,h:119},drone:{w:74,h:36}};

  /* imagens: folha com 3 quadros + pose agachada */
  function loadImg(src){return new Promise(function(res,rej){var im=new Image();im.onload=function(){res(im)};im.onerror=rej;im.src=src})}
  Promise.all(["bin","marcio"].map(function(n){
    return Promise.all([loadImg(SHEETS[n]),loadImg(SLIDES[n])]).then(function(r){
      var sh=r[0],fw=Math.floor(sh.width/3);
      sprites[n]=[0,1,2].map(function(i){var b=document.createElement("canvas");b.width=fw;b.height=sh.height;b.getContext("2d").drawImage(sh,i*fw,0,fw,sh.height,0,0,fw,sh.height);return b});
      sprites[n].slide=r[1];
    });
  })).then(function(){ready=true}).catch(function(e){console.error("Inova Runner: erro ao carregar personagens",e)});

  function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
  function screen(n){$id("rnMenu").hidden=n!=="menu";$id("rnGame").hidden=n==="menu"}
  function overlays(show){["rnQuiz","rnPaused","rnResult"].forEach(function(i){$id(i).hidden=i!==show})}
  function toast(t,sec){$id("rnToast").textContent=t;toastT=sec||1.8}
  function best(){return store.get("inovaai-runner-best",null)}
  function showBest(){var b=best();$id("rnBest").textContent=b?"Recorde neste navegador: "+b.pts+" pontos com "+NAMES[b.who]+(b.won?" (percurso completo)":""):""}

  /* efeitos sonoros gerados na hora (sem arquivos de áudio) */
  var audio=null,muted=store.get("inovaai-runner-mute",false);
  function sfx(n,arg){
    if(muted)return;
    try{
      if(!audio){var A=window.AudioContext||window.webkitAudioContext;if(!A)return;audio=new A()}
      if(audio.state==="suspended")audio.resume();
      var t0=audio.currentTime;
      var tone=function(type,f1,f2,dur,vol,delay){var o=audio.createOscillator(),gn=audio.createGain(),s=t0+(delay||0);o.type=type;o.frequency.setValueAtTime(f1,s);if(f2)o.frequency.exponentialRampToValueAtTime(f2,s+dur);
        gn.gain.setValueAtTime(vol,s);gn.gain.exponentialRampToValueAtTime(.0001,s+dur);o.connect(gn);gn.connect(audio.destination);o.start(s);o.stop(s+dur+.02)};
      var arp=function(fs,step,dur){fs.forEach(function(f,i){tone("square",f,0,dur,.045,i*step)})};
      if(n==="jump")tone("square",330,620,.13,.05);
      else if(n==="coin"){var f=880*Math.pow(1.06,Math.min(arg||0,12));tone("triangle",f,0,.08,.07);tone("triangle",f*1.5,0,.1,.05,.05)}
      else if(n==="slide")tone("sawtooth",240,110,.16,.035);
      else if(n==="dive")tone("square",520,160,.12,.045);
      else if(n==="hit"){tone("sawtooth",180,40,.4,.11);tone("square",90,30,.35,.07)}
      else if(n==="shield")tone("sine",300,900,.25,.08);
      else if(n==="power")arp([523,659,784,1047],.06,.1);
      else if(n==="combo")arp([660,990],.08,.1);
      else if(n==="near")tone("triangle",1200,1800,.08,.04);
      else if(n==="beep")tone("square",arg||520,0,.14,.055);
      else if(n==="mile")arp([784,1175],.1,.14);
      else if(n==="win")arp([523,659,784,1047,1319],.09,.16);
    }catch(e){}
  }
  function renderSound(){var b=$id("rnSound");b.classList.toggle("off",muted);b.setAttribute("aria-pressed",String(!muted));b.setAttribute("aria-label",muted?"Ligar som":"Desligar som")}

  function dist(){return Math.min(distance,CFG.finish)}
  function mult(){return Math.min(4,1+Math.floor(streak/5))}
  function points(won){return Math.floor(dist())+score+correct*50+(won?200+lives*100:0)}
  function hud(){
    var key=Math.floor(dist())+"|"+points(false)+"|"+bits+"|"+lives+"|"+mult();
    if(key===hudCache)return;hudCache=key;
    $id("rnDist").textContent=Math.floor(dist())+" / "+CFG.finish+" m";
    $id("rnScore").textContent=points(false);$id("rnBits").textContent=bits;
    var cb=$id("rnCombo");cb.textContent="x"+mult();cb.parentNode.classList.toggle("hot",mult()>1);
    var h="";for(var i=0;i<CFG.lives;i++)h+=i<lives?"♥":"♡";$id("rnLives").textContent=h;$id("rnLives").setAttribute("aria-label",lives+" vidas");
    var p=dist()/CFG.finish*100;$id("rnFill").style.width=p+"%";$id("rnRunnerDot").style.left=p+"%";
    document.querySelector(".rn-progress").setAttribute("aria-valuenow",Math.floor(dist()));
  }
  function popup(t,x,y,col){popups.push({t:t,x:x,y:y,col:col||C.gold,life:1})}
  function banner(t,sub){bannerO={t:t,sub:sub||"",life:1.6}}
  function burst(x,y,col,n,sp){for(var k=0;k<n;k++){var a=Math.random()*Math.PI*2,v=(sp||220)*(.4+Math.random()*.6);particles.push({x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-80,t:.6,col:col,s:4,g:500})}}
  function dust(n){for(var k=0;k<n;k++)particles.push({x:player.x-12+Math.random()*24,y:CFG.ground-2,vx:-speedNow()*.35-Math.random()*90,vy:-Math.random()*90,t:.45,col:"rgba(210,200,255,.7)",s:3+Math.random()*3,g:120})}

  /* percurso: obstáculos cada vez mais rápidos, densos e combinados; espaços medidos em segundos para continuar justo */
  function speedAt(m){return CFG.speed*(1+CFG.speedRamp*m/CFG.finish)}
  function mk(t,x){return {type:t,x:x,w:OB[t].w,h:OB[t].h,ph:Math.random()*6.3,passed:false,done:false,near:1e9}}
  function build(){
    var pm=CFG.pxPerM,X=function(mm){return mm*pm+CFG.startX},m=26,lastT="",nextItem=80+Math.random()*40,kinds=["shield","magnet"],ki=Math.random()<.5?0:1;
    var COMBOS=[["chip","scanner"],["scanner","data"],["data","data"],["wall","chip"],["drone","chip"],["scanner","chip"]],LATE=[["chip","chip","chip"],["scanner","wall"],["data","scanner","data"]];
    obstacles=[];coins=[];items=[];
    while(m<CFG.finish-22){
      var t=m/CFG.finish,v=speedAt(m)/pm,pat;
      if(t>.3&&Math.random()<.2+t*.35){var pool=t>.6?COMBOS.concat(LATE):COMBOS;pat=pool[Math.random()*pool.length|0]}
      else{var types=["data","chip","scanner"];if(t>.08)types.push("wall");if(t>.18)types.push("drone");if(t>.3)types.push("bug");
        var ty;do{ty=types[Math.random()*types.length|0]}while(ty===lastT&&Math.random()<.75);pat=[ty]}
      var mm=m;
      pat.forEach(function(ty,i){
        if(i)mm+=v*1.05;var o=mk(ty,X(mm));obstacles.push(o);lastT=ty;
        /* bits que premiam a manobra certa: arco por cima do que se pula, fileira rente ao chão sob o scanner */
        if(pat.length===1&&(ty==="data"||ty==="chip"||ty==="wall")&&Math.random()<.55)
          for(var k=-2;k<=2;k++)coins.push({x:o.x+o.w/2+k*v*pm*.13,y:CFG.ground-(ty==="wall"?150:115)-60*(1-k*k/5),got:false});
        if(ty==="scanner"&&Math.random()<.6)for(var k2=0;k2<3;k2++)coins.push({x:o.x+18+k2*32,y:CFG.ground-22,got:false});
      });
      var gap=v*((2.3-1.1*t)+Math.random()*.6),mid=mm+gap/2;
      if(m>nextItem){items.push({x:X(mid),y:CFG.ground-(Math.random()<.5?60:150),kind:kinds[ki++%2],got:false});nextItem+=110+Math.random()*60}
      else if(Math.random()<.6){var high=Math.random()<.35;for(var k3=-2;k3<=2;k3++)coins.push({x:X(mid+k3*1.6),y:high?CFG.ground-150:CFG.ground-34,got:false})}
      m=mm+gap;
    }
  }

  function start(n){
    if(!ready){toast("Carregando personagens…");return}
    chosen=n||chosen;confetti.stop();keys={};
    distance=0;correct=0;lives=CFG.lives;bits=0;asked=0;hits=0;elapsed=0;invul=0;wrong=[];particles=[];popups=[];
    score=0;streak=0;bestStreak=0;shield=false;magnet=0;shake=0;flash=null;bannerO=null;nextMile=100;coinChain=0;coinT=0;hudCache="";
    player={x:CFG.startX,y:0,vy:0,slide:0,full:true,buf:0,qslide:false,squash:0};
    qDeck=shuffle(QUESTIONS);qi=0;build();
    $id("rnPause").hidden=false;
    overlays(null);screen("game");fit();state="countdown";cd=3;hud();sfx("beep",520);
    $id("rnPause").focus({preventScroll:true});
    var top=$id("rnGame").getBoundingClientRect().top;if(top<0||top>innerHeight*.5)$id("rnGame").scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});
  }
  function home(){confetti.stop();keys={};state="menu";overlays(null);screen("menu");showBest();var b=document.querySelector('[data-char="'+chosen+'"]');b&&b.focus({preventScroll:true})}

  /* recompensa de chegada: bolo de cenoura com cobertura de chocolate em pixel art (cada letra é um pixel) */
  (function(){
    var PX=["........G.G.......",".........G........","........OOO.......",".........O........",
            "..kkkkkkkkkkkkkk..",".kWWWWWWWWWWWWWWk.",".kWWWWWWWWWWWWWWk.",".kWCWWCWWWWCWWCWk.",
            ".kCCCDCCCCCCDCCCk.",".kCDCCCCDCCCCCDCk.",".kCCCCCCCDCCCCCCk.",".kCCCCDCCCCCDCCCk.",
            ".kCDCCCCCDCCCCCDk.","PPPPPPPPPPPPPPPPPP",".pppppppppppppppp."];
    var COL={G:"#4CAF50",O:"#F28C28",k:"#3A1E10",W:"#6B3A1F",C:"#F2A541",D:"#D9822B",P:"#D7DCF5",p:"#A9B2D6"};
    var svg=$id("rnCake"),h="";svg.setAttribute("viewBox","0 0 18 "+PX.length);
    PX.forEach(function(r,y){for(var x=0;x<r.length;x++)if(COL[r[x]])h+='<rect x="'+x+'" y="'+y+'" width="1" height="1" fill="'+COL[r[x]]+'"/>'});
    svg.innerHTML=h;
  })();

  /* nota: S sem nenhuma batida, A até 2, B o resto; quem perde as vidas tenta de novo */
  function grade(won){return !won?"↻":hits===0?"S":hits<=2?"A":"B"}
  function finish(won){
    state=won?"won":"lost";keys={};
    var pts=points(won),b=best(),rec=!b||pts>b.pts,gr=grade(won);
    if(rec)store.set("inovaai-runner-best",{pts:pts,who:chosen,won:won});
    $id("rnSymbol").textContent=gr;$id("rnSymbol").dataset.grade=gr;
    $id("rnReward").hidden=!won;
    $id("rnEyebrow").textContent=won?"Percurso concluído · nota "+gr:"Fim de jogo";
    $id("rnResT").textContent=won?(gr==="S"?"Corrida perfeita, ":"Parabéns, ")+NAMES[chosen]+"!":"Acabaram as vidas";
    $id("rnFinal").innerHTML='<div><small>Distância</small><strong>'+Math.floor(dist())+' m</strong></div><div><small>Acertos</small><strong>'+correct+'/'+asked+'</strong></div><div><small>Maior combo</small><strong>'+bestStreak+'</strong></div><div class="pts"><small>Pontos</small><strong>'+pts+'</strong></div>';
    $id("rnResDetail").textContent=(rec?"Novo recorde! ":(b?"Recorde: "+b.pts+" pontos. ":""))+(won?(hits?hits+" batida(s) no caminho. ":"Nenhuma batida no caminho! ")+"Bônus de chegada e "+lives+" vida(s) somados aos pontos.":"Revise as respostas e tente de novo.");
    $id("rnReview").hidden=!wrong.length;
    $id("rnReviewList").innerHTML=wrong.map(function(q){return '<div><b>'+esc(q[1])+'</b><br>Resposta: '+esc(q[2][0])+'. '+esc(q[3])+'</div>'}).join("");
    overlays("rnResult");
    if(won)confetti.start();
    $id("rnRetry").focus({preventScroll:true});
  }

  /* perguntas */
  function openQuestion(o){
    o.passed=true;state="quiz";keys={};answered=false;asked++;
    if(qi>=qDeck.length){qDeck=shuffle(QUESTIONS);qi=0}
    var q=qDeck[qi++],order=shuffle([0,1,2,3]);
    curQ={q:q,order:order,correct:order.indexOf(0)};
    $id("rnCat").textContent=q[0];$id("rnQ").textContent=q[1];$id("rnFeedback").innerHTML="";$id("rnContinue").hidden=true;
    $id("rnAnswers").innerHTML=order.map(function(oi,i){return '<button type="button" class="rn-ans" data-i="'+i+'"><b>'+"ABCD"[i]+'</b><span>'+esc(q[2][oi])+'</span></button>'}).join("");
    $$(".rn-ans").forEach(function(b){b.addEventListener("click",function(){answer(+b.dataset.i)})});
    overlays("rnQuiz");setTimeout(function(){var f=$(".rn-ans");f&&f.focus({preventScroll:true})},30);
  }
  function answer(i){
    if(state!=="quiz"||answered)return;answered=true;
    var ok=i===curQ.correct,q=curQ.q;
    $$(".rn-ans").forEach(function(b,k){b.disabled=true;if(k===curQ.correct)b.classList.add("right");else if(k===i)b.classList.add("wrong")});
    if(ok){correct++;$id("rnFeedback").innerHTML='<b class="ok">Acertou!</b> '+esc(q[3])}
    else{lives--;wrong.push(q);$id("rnFeedback").innerHTML='<b class="no">Errou.</b> '+esc(q[3])+(lives>0?' Você perdeu uma vida.':'')}
    hud();
    var c=$id("rnContinue");c.hidden=false;c.textContent=ok||lives>0?"Continuar corrida":"Ver resultado";c.focus({preventScroll:true});
  }
  function cont(){
    if(state!=="quiz"||!answered)return;
    if(lives<=0){finish(false);return}
    overlays(null);keys={};player.y=0;player.vy=0;player.slide=0;player.buf=0;player.qslide=false;invul=CFG.protection;state="running";
    toast(lives<CFG.lives&&$id("rnFeedback").textContent.indexOf("Errou")===0?"Cuidado: "+lives+" vida(s) restante(s)":"Proteção ativada por alguns segundos!");
  }

  /* pausa e controles */
  function pause(){if(state!=="running"&&state!=="countdown")return;prevState=state;state="paused";keys={};overlays("rnPaused");$id("rnResume").focus({preventScroll:true})}
  function resume(){if(state!=="paused")return;overlays(null);keys={};state=prevState}
  function jump(full){player.vy=CFG.jumpVelocity;player.slide=0;player.full=!!full;player.buf=0;player.squash=-.3;sfx("jump");dust(5)}
  function slide(){player.slide=CFG.slideDuration;sfx("slide");dust(8)}
  /* ↑ no chão pula (segurar vai mais alto), no ar fica guardado para o pouso; ↓ no chão rola, no ar mergulha */
  function press(code,full){
    if(state!=="running")return;
    keys[code]=true;
    if(code==="ArrowUp"){if(player.y===0)jump(full);else player.buf=.15}
    if(code==="ArrowDown"){if(player.y<0){if(!player.qslide){player.vy=Math.max(player.vy,CFG.fastFall);player.qslide=true;sfx("dive")}}else if(player.slide<=0)slide()}
  }
  function active(){return !$('[data-page="jogo"]').hidden&&!$id("panelRunner").hidden&&state!=="menu"}
  var MAP={ArrowUp:"ArrowUp",KeyW:"ArrowUp",Space:"ArrowUp",ArrowDown:"ArrowDown",KeyS:"ArrowDown",ArrowLeft:"ArrowLeft",KeyA:"ArrowLeft",ArrowRight:"ArrowRight",KeyD:"ArrowRight"};
  var PLAYING={running:1,countdown:1,hitstop:1,finishing:1};
  document.addEventListener("keydown",function(e){
    if(!active()||e.target.closest("textarea,input")||!$id("nova").hidden&&e.key==="Escape")return;
    if(PLAYING[state]&&MAP[e.code]){e.preventDefault();if(!e.repeat)press(MAP[e.code]);return}
    if(e.key==="Escape"&&(state==="running"||state==="countdown"||state==="paused")){e.preventDefault();state==="paused"?resume():pause();return}
    if(state==="quiz"&&!answered){var n="1234".indexOf(e.key);if(n<0)n="abcd".indexOf(e.key.toLowerCase());if(n>-1){e.preventDefault();answer(n)}}
  });
  document.addEventListener("keyup",function(e){if(MAP[e.code])delete keys[MAP[e.code]]});
  window.addEventListener("blur",pause);
  document.addEventListener("visibilitychange",function(){if(document.hidden)pause()});
  $$("[data-ctl]").forEach(function(b){
    b.addEventListener("pointerdown",function(e){e.preventDefault();try{b.setPointerCapture(e.pointerId)}catch(_){}press(b.dataset.ctl)});
    ["pointerup","pointercancel","lostpointercapture"].forEach(function(t){b.addEventListener(t,function(){delete keys[b.dataset.ctl]})});
  });
  /* toque na pista: tocar pula alto, deslizar para baixo agacha (ou mergulha, se estiver no ar) */
  var sy=null,tapJumped=false,tapT=0;
  function tapJump(){if(sy===null||tapJumped)return;tapJumped=true;press("ArrowUp",true);delete keys.ArrowUp}
  cv.addEventListener("pointerdown",function(e){if(state!=="running")return;sy=e.clientY;tapJumped=false;try{cv.setPointerCapture(e.pointerId)}catch(_){}clearTimeout(tapT);tapT=setTimeout(tapJump,110)});
  cv.addEventListener("pointermove",function(e){if(sy!==null&&e.clientY-sy>24){clearTimeout(tapT);sy=null;press("ArrowDown");delete keys.ArrowDown}});
  cv.addEventListener("pointerup",function(){clearTimeout(tapT);tapJump();sy=null});
  cv.addEventListener("pointercancel",function(){clearTimeout(tapT);sy=null});
  $$("[data-char]").forEach(function(b){b.addEventListener("click",function(){start(b.dataset.char)})});
  $id("rnPause").addEventListener("click",pause);$id("rnResume").addEventListener("click",resume);
  $id("rnQuit").addEventListener("click",home);$id("rnHome").addEventListener("click",home);
  $id("rnRetry").addEventListener("click",function(){start()});$id("rnContinue").addEventListener("click",cont);
  $id("rnSound").addEventListener("click",function(){muted=!muted;store.set("inovaai-runner-mute",muted);renderSound();sfx("coin")});
  renderSound();

  /* física e colisões */
  function oRect(o){var x=o.x-distance*CFG.pxPerM,g=CFG.ground,y=o.type==="scanner"?g-176:o.type==="drone"?g-o.h-100-50*Math.sin(elapsed*2.2+o.ph):g-o.h;return {x:x,y:y,w:o.w,h:o.h}}
  function pRect(){var s=player.slide>0;return {x:player.x-(s?34:20),y:CFG.ground+player.y-(s?40:114),w:s?68:40,h:s?38:110}}
  function hit(a,b,m){m=m||0;return a.x<b.x+b.w-m&&a.x+a.w>b.x+m&&a.y<b.y+b.h-m&&a.y+a.h>b.y+m}
  function speedNow(){return speedAt(dist())*(keys.ArrowRight?CFG.speedBoost:1)}
  function cleared(o){
    if(invul>0)return;
    streak++;bestStreak=Math.max(bestStreak,streak);var py=CFG.ground+player.y-140;
    if(o.near<14){score+=25;popup("Por um triz! +25",player.x,py-28,C.cyan);sfx("near")}
    if(streak%5===0&&streak<=15){popup("Combo x"+mult()+"!",player.x,py,C.pink);sfx("combo");flash={c:"138,79,255",a:.18}}
  }
  function crash(o){
    o.passed=true;streak=0;if(!reduce)shake=16;
    if(shield){shield=false;invul=1;burst(player.x,CFG.ground+player.y-60,C.cyan,18,300);popup("Escudo salvou!",player.x,CFG.ground+player.y-150,C.cyan);sfx("shield");return}
    hits++;flash={c:"255,70,110",a:.35};sfx("hit");burst(player.x+20,CFG.ground+player.y-60,C.pink,14,260);
    state="hitstop";hitT=.45;pending=o;keys={};
  }
  function update(dt){
    toastT=Math.max(0,toastT-dt);if(toastT===0&&$id("rnToast").textContent)$id("rnToast").textContent="";
    particles=particles.filter(function(p){p.t-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=(p.g||500)*dt;return p.t>0});
    popups=popups.filter(function(p){p.life-=dt*.9;p.y-=40*dt;return p.life>0});
    shake=Math.max(0,shake-dt*50);if(flash){flash.a-=dt*1.4;if(flash.a<=0)flash=null}
    if(bannerO){bannerO.life-=dt;if(bannerO.life<=0)bannerO=null}
    if(state==="hitstop"){hitT-=dt;if(hitT<=0)openQuestion(pending);return}
    if(state==="countdown"){elapsed+=dt;var was=Math.ceil(cd);cd-=dt;
      if(cd<=0){state="running";banner("Valendo!","↑ pula · ↓ agacha");sfx("beep",880)}else if(Math.ceil(cd)<was)sfx("beep",520);return}
    if(state!=="running"&&state!=="finishing")return;
    elapsed+=dt;invul=Math.max(0,invul-dt);magnet=Math.max(0,magnet-dt);coinT=Math.max(0,coinT-dt);if(!coinT)coinChain=0;
    var pm=CFG.pxPerM,g=CFG.ground,fin=state==="finishing";
    var ax=fin?1:(keys.ArrowRight?1:0)-(keys.ArrowLeft?1:0);
    player.x=Math.max(80,Math.min(fin?CFG.width+120:490,player.x+ax*CFG.moveSpeed*(fin?1.6:1)*dt));
    player.slide=Math.max(0,player.slide-dt);player.buf=Math.max(0,player.buf-dt);
    player.squash+=(0-player.squash)*Math.min(1,dt*10);
    if(player.vy<0&&!player.full&&!keys.ArrowUp){player.vy*=CFG.jumpCut;player.full=true}
    if(player.vy!==0||player.y<0){player.vy+=CFG.gravity*dt;player.y+=player.vy*dt;
      if(player.y>=0){var imp=player.vy;player.y=0;player.vy=0;player.squash=Math.min(.45,imp/2600);dust(4);
        if(player.qslide){player.qslide=false;slide()}else if(player.buf>0&&!fin)jump(!keys.ArrowUp)}}
    distance+=speedNow()*dt/pm;
    hud();
    if(fin){finT-=dt;if(finT<=0)finish(true);return}
    if(dist()>=nextMile&&nextMile<CFG.finish){banner(nextMile+" m",nextMile===500?"Última reta!":"Mais rápido agora");sfx("mile");nextMile+=100}
    var pr=pRect(),wx=distance*pm,mx=player.x+wx,my=g+player.y-60;
    for(var i=0;i<coins.length;i++){var c=coins[i];if(c.got)continue;var cx=c.x-wx;if(cx<-40||cx>CFG.width+40)continue;
      if(magnet>0&&cx<player.x+340){var f=Math.min(1,dt*10);c.x+=(mx-c.x)*f;c.y+=(my-c.y)*f;cx=c.x-wx}
      if(hit(pr,{x:cx-12,y:c.y-12,w:24,h:24})){c.got=true;bits++;var val=10*mult();score+=val;coinChain++;coinT=.5;sfx("coin",coinChain);popup("+"+val,cx,c.y-16,C.gold);
        for(var k=0;k<6;k++)particles.push({x:cx,y:c.y,vx:(Math.random()-.5)*220,vy:-Math.random()*220,t:.45,col:C.gold,s:4})}}
    for(var q=0;q<items.length;q++){var it=items[q];if(it.got)continue;var ix=it.x-wx;if(ix<-40||ix>CFG.width+40)continue;
      if(hit(pr,{x:ix-19,y:it.y-19,w:38,h:38})){it.got=true;var sh=it.kind==="shield";sfx("power");burst(ix,it.y,sh?C.cyan:C.pink,16,240);
        if(sh){shield=true;popup("Escudo ativado!",ix,it.y-32,C.cyan)}else{magnet=8;popup("Ímã de bits!",ix,it.y-32,C.pink)}
        flash={c:sh?"87,230,255":"255,102,196",a:.2}}}
    for(var j=0;j<obstacles.length;j++){var o=obstacles[j];if(o.passed||o.done)continue;
      if(o.type==="bug"&&o.x-wx<CFG.width+40)o.x-=OB.bug.move*dt;
      var r=oRect(o);if(r.x>CFG.width+60)continue;
      if(r.x+r.w<pr.x){o.done=true;cleared(o);continue}
      if(r.x<pr.x+pr.w&&r.x+r.w>pr.x){
        if(invul<=0&&hit(pr,r,5)){crash(o);break}
        o.near=Math.min(o.near,Math.max(r.y-(pr.y+pr.h),pr.y-(r.y+r.h)))}}
    if(state==="running"&&distance>=CFG.finish){state="finishing";finT=1.5;keys={};banner("Chegada!","Você completou os 600 m");sfx("win");flash={c:"255,255,255",a:.35};burst(player.x,g-80,C.gold,30,340)}
  }

  /* cenário: céu que escurece e amanhece ao longo da corrida, cidade, chão em grade neon */
  function rr(x,y,w,h,r,fill,stroke){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x,y,w,h,r);else ctx.rect(x,y,w,h);if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke()}}
  function glow(col,b){ctx.shadowColor=col;ctx.shadowBlur=reduce?0:b}
  function rgb(h){return [1,3,5].map(function(i){return parseInt(h.slice(i,i+2),16)})}
  function mix(a,b,t){a=rgb(a);b=rgb(b);return "rgb("+a.map(function(v,i){return Math.round(v+(b[i]-v)*t)}).join(",")+")"}
  var SKY=[["#17122F","#5030A5","#8A4FFF"],["#08061A","#22175E","#4B33B8"],["#1A1038","#6A35C8","#FF7AB8"]];
  function sky(s,g,p){var a=p<.5?0:1,t=p<.5?p*2:(p-.5)*2,gr=ctx.createLinearGradient(0,0,0,g),W=CFG.width;
    [0,.55,1].forEach(function(st,i){gr.addColorStop(st,mix(SKY[a][i],SKY[a+1][i],t))});ctx.fillStyle=gr;ctx.fillRect(0,0,W,g);
    var night=1-Math.abs(p-.5)*2;
    for(var i=0;i<34;i++){var x=((i*163-s*.05)%(W+150)+W+150)%(W+150)-40,y=30+(i*71)%240;ctx.globalAlpha=(.35+.4*Math.sin(elapsed*2+i*1.7))*(.5+.5*night);ctx.fillStyle=i%5===0?C.cyan:"#fff";var z=i%4===0?3:2;ctx.fillRect(x,y,z,z)}
    ctx.globalAlpha=1;var mx=W-225,my=92+p*30,m=ctx.createRadialGradient(mx,my,2,mx,my,90);m.addColorStop(0,"rgba(255,255,255,.75)");m.addColorStop(1,"rgba(138,79,255,0)");ctx.fillStyle=m;ctx.beginPath();ctx.arc(mx,my,90,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#F4F1FF";ctx.beginPath();ctx.arc(mx,my,24,0,Math.PI*2);ctx.fill();ctx.fillStyle="rgba(150,130,220,.35)";ctx.beginPath();ctx.arc(mx-8,my-5,5,0,Math.PI*2);ctx.arc(mx+7,my+7,3.5,0,Math.PI*2);ctx.fill()}
  function city(s,g){for(var l=0;l<2;l++){var sp=l?.28:.14;for(var i=0;i<13;i++){var w=82+(i%3)*22,h=75+((i*47+l*31)%150),x=((i*128-s*sp)%1664+1664)%1664-150;
      ctx.fillStyle=l?"rgba(30,26,66,.85)":"rgba(39,48,67,.4)";ctx.fillRect(x,g-h,w,h);
      for(var r=0;r<4;r++)for(var c=0;c<3;c++)if((r+c+i)%3){ctx.fillStyle=l?((r*3+c+i+Math.floor(elapsed*.7))%11?"rgba(87,230,255,.3)":"rgba(255,209,102,.75)"):"rgba(255,255,255,.14)";ctx.fillRect(x+13+c*22,g-h+17+r*25,7,4)}
      if(l&&i%4===0){ctx.fillStyle="rgba(200,200,255,.5)";ctx.fillRect(x+w/2-1,g-h-16,2,16);ctx.fillStyle=Math.sin(elapsed*3+i)>0?"#FF4D6D":"rgba(255,77,109,.25)";ctx.fillRect(x+w/2-3,g-h-20,6,5)}}}
    ctx.strokeStyle="rgba(87,230,255,.22)";ctx.lineWidth=2;for(var r2=0;r2<3;r2++){ctx.beginPath();var y=g-68-r2*34;ctx.moveTo(0,y);for(var x2=0;x2<=CFG.width;x2+=70)ctx.lineTo(x2,y+Math.sin((x2+s*.25)/80)*10);ctx.stroke()}}
  function track(s,g){var W=CFG.width,H=CFG.height,gr=ctx.createLinearGradient(0,g,0,H);gr.addColorStop(0,"#2B1F63");gr.addColorStop(1,"#0E0B24");ctx.fillStyle=gr;ctx.fillRect(0,g,W,H-g);
    ctx.save();ctx.beginPath();ctx.rect(0,g,W,H-g);ctx.clip();ctx.strokeStyle="rgba(138,79,255,.5)";ctx.lineWidth=1.2;
    for(var k=1;k<6;k++){var y=g+Math.pow(k/5,1.8)*(H-g);ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
    var vx=W/2,sp=90;for(var x=-(s%sp)-sp*6;x<W+sp*6;x+=sp){ctx.beginPath();ctx.moveTo(vx+(x-vx)*.3,g);ctx.lineTo(x,H);ctx.stroke()}
    ctx.restore();ctx.save();glow(C.cyan,14);ctx.fillStyle=C.cyan;ctx.fillRect(0,g,W,3);ctx.restore()}
  function markers(d,g){var n=Math.floor(d/50)*50;ctx.font="600 12px Sora, sans-serif";ctx.fillStyle="rgba(255,255,255,.6)";for(var m=n;m<=n+100;m+=50){var x=(m-d)*CFG.pxPerM+175;if(x>-50&&x<CFG.width&&m<=CFG.finish)ctx.fillText(m+" m",x,g+83)}}
  function finishLine(d,g){var x=(CFG.finish-d)*CFG.pxPerM+175;if(x>CFG.width+100||x<-120)return;ctx.save();glow(C.gold,18);ctx.fillStyle=C.white;ctx.fillRect(x,g-230,5,230);ctx.fillRect(x+83,g-230,5,230);ctx.restore();
    for(var r=0;r<4;r++)for(var c=0;c<6;c++){ctx.fillStyle=(r+c)%2?C.purple:C.white;ctx.fillRect(x+5+c*13,g-230+r*13,13,13)}
    ctx.fillStyle="rgba(255,209,102,.18)";ctx.fillRect(x+5,g-178,78,178);ctx.fillStyle=C.white;ctx.font="700 15px Sora, sans-serif";ctx.textAlign="center";ctx.fillText("CHEGADA",x+44,g-246);ctx.textAlign="start"}

  /* obstáculos */
  function dataBlock(r){ctx.save();glow(C.cyan,16);rr(r.x,r.y,r.w,r.h,8,"#1B2340",C.cyan);ctx.shadowBlur=0;ctx.fillStyle=C.cyan;
    for(var i=0;i<4;i++)ctx.fillRect(r.x+9,r.y+11+i*12,(r.w-18)*(.45+.55*Math.abs(Math.sin(elapsed*3+i*1.3))),5);ctx.restore()}
  function chip(r){ctx.save();rr(r.x,r.y,r.w,r.h,8,C.white,C.dark);glow(C.purple,8+8*Math.abs(Math.sin(elapsed*4)));rr(r.x+13,r.y+9,r.w-26,r.h-18,3,C.purple);ctx.shadowBlur=0;ctx.strokeStyle=C.cyan;ctx.lineWidth=2;
    for(var y=r.y+8;y<r.y+r.h;y+=11){ctx.beginPath();ctx.moveTo(r.x-7,y);ctx.lineTo(r.x,y);ctx.stroke();ctx.beginPath();ctx.moveTo(r.x+r.w,y);ctx.lineTo(r.x+r.w+7,y);ctx.stroke()}ctx.restore()}
  function wall(r){ctx.save();var gr=ctx.createLinearGradient(0,r.y,0,r.y+r.h);gr.addColorStop(0,"#FF5E7E");gr.addColorStop(1,"#7A1E3C");glow("#FF5E7E",18);rr(r.x,r.y,r.w,r.h,6,gr);ctx.shadowBlur=0;
    ctx.strokeStyle="rgba(40,8,24,.5)";ctx.lineWidth=2;for(var y=r.y+14,n=0;y<r.y+r.h;y+=14,n++){ctx.beginPath();ctx.moveTo(r.x,y);ctx.lineTo(r.x+r.w,y);var bx=r.x+(n%2?r.w*.66:r.w*.33);ctx.moveTo(bx,y-14);ctx.lineTo(bx,y);ctx.stroke()}
    var fw=(r.w-6)/3;for(var k=0;k<3;k++){var fh=12+9*Math.abs(Math.sin(elapsed*9+k*1.7)),fx=r.x+3+k*fw;ctx.fillStyle=k%2?C.gold:C.orange;ctx.beginPath();ctx.moveTo(fx,r.y+2);ctx.lineTo(fx+fw/2,r.y-fh);ctx.lineTo(fx+fw,r.y+2);ctx.fill()}
    ctx.restore()}
  function scanner(r){ctx.save();ctx.fillStyle="rgba(255,102,196,.16)";ctx.fillRect(r.x+8,r.y+r.h,r.w-16,CFG.ground-r.y-r.h);
    ctx.strokeStyle="rgba(255,102,196,.6)";ctx.lineWidth=2;var sy=r.y+r.h+((elapsed*90)%(CFG.ground-r.y-r.h));ctx.beginPath();ctx.moveTo(r.x+8,sy);ctx.lineTo(r.x+r.w-8,sy);ctx.stroke();
    glow(C.pink,16);rr(r.x,r.y,r.w,r.h,8,C.dark,C.pink);ctx.shadowBlur=0;ctx.fillStyle=C.pink;ctx.fillRect(r.x+7,r.y+r.h-15,r.w-14,5);
    ctx.beginPath();ctx.arc(r.x+19,r.y+22,8,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(r.x+r.w-19,r.y+22,8,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=C.white;ctx.font="700 22px Sora, sans-serif";ctx.textAlign="center";ctx.fillText("↓",r.x+r.w/2,r.y+42);ctx.restore()}
  function drone(r){var cx=r.x+r.w/2,cy=r.y+r.h/2;ctx.save();
    ctx.fillStyle="rgba(255,102,196,.13)";ctx.beginPath();ctx.moveTo(cx-8,r.y+r.h);ctx.lineTo(cx+8,r.y+r.h);ctx.lineTo(cx+26,r.y+r.h+46);ctx.lineTo(cx-26,r.y+r.h+46);ctx.fill();
    ctx.strokeStyle="#AAB3D6";ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(r.x+8,r.y+7);ctx.lineTo(r.x+r.w-8,r.y+7);ctx.stroke();
    [r.x+8,r.x+r.w-8].forEach(function(px,k){var bw=4+14*Math.abs(Math.cos(elapsed*38+k));ctx.fillStyle="rgba(255,255,255,.8)";ctx.fillRect(px-bw,r.y,bw*2,3)});
    glow(C.pink,14);rr(r.x+14,r.y+8,r.w-28,r.h-8,10,"#2A2F4F",C.pink);ctx.shadowBlur=0;
    ctx.fillStyle=Math.sin(elapsed*10)>0?"#FF3B6B":"#7A1B3A";ctx.beginPath();ctx.arc(cx,cy+4,6,0,Math.PI*2);ctx.fill();ctx.restore()}
  function bug(r){var cx=r.x+r.w/2,cy=r.y+r.h/2+2,j=reduce?0:Math.sin(elapsed*30)*1.5;ctx.save();
    [["rgba(255,102,196,.5)",-3],["rgba(87,230,255,.5)",3]].forEach(function(c){ctx.fillStyle=c[0];ctx.beginPath();ctx.ellipse(cx+c[1]+j,cy,r.w/2-4,r.h/2-2,0,0,Math.PI*2);ctx.fill()});
    ctx.strokeStyle="#1D3B12";ctx.lineWidth=3;for(var k=0;k<3;k++){var lx=r.x+14+k*10,a=Math.sin(elapsed*26+k*2)*5;ctx.beginPath();ctx.moveTo(lx,cy);ctx.lineTo(lx+a-3,CFG.ground);ctx.stroke()}
    glow(C.lime,12);ctx.fillStyle=C.lime;ctx.beginPath();ctx.ellipse(cx,cy,r.w/2-4,r.h/2-2,0,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
    ctx.fillStyle="#1D3B12";ctx.fillRect(cx+2,r.y+4,2,r.h-8);ctx.beginPath();ctx.arc(r.x+7,cy-2,8,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#FF3B6B";ctx.fillRect(r.x+2,cy-5,3,3);ctx.fillRect(r.x+7,cy-5,3,3);
    ctx.strokeStyle="#1D3B12";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(r.x+4,cy-9);ctx.lineTo(r.x-4,cy-18);ctx.moveTo(r.x+9,cy-9);ctx.lineTo(r.x+6,cy-20);ctx.stroke();ctx.restore()}
  var DRAW={data:dataBlock,chip:chip,wall:wall,scanner:scanner,drone:drone,bug:bug};
  /* aviso na borda direita do que está chegando */
  function warnings(){var wx=distance*CFG.pxPerM,W=CFG.width,lead=speedNow()*.9,a=.55+.45*Math.sin(elapsed*16);
    obstacles.forEach(function(o){if(o.passed||o.done)return;var x=o.x-wx;if(x<=W||x>W+lead)return;var r=oRect(o),y=Math.max(18,r.y+r.h/2);
      ctx.globalAlpha=a;ctx.fillStyle=o.type==="drone"||o.type==="scanner"?C.pink:o.type==="bug"?C.lime:o.type==="wall"?C.orange:C.cyan;ctx.beginPath();ctx.moveTo(W-6,y);ctx.lineTo(W-22,y-11);ctx.lineTo(W-22,y+11);ctx.fill()});ctx.globalAlpha=1}

  /* bits, power-ups e personagem */
  function drawCoins(){var wx=distance*CFG.pxPerM;for(var i=0;i<coins.length;i++){var c=coins[i];if(c.got)continue;var x=c.x-wx;if(x<-20||x>CFG.width+20)continue;
    var bob=Math.sin(elapsed*5+i)*3,sx=.3+.7*Math.abs(Math.cos(elapsed*3+i*.5));ctx.save();ctx.translate(x,c.y+bob);ctx.scale(sx,1);glow(C.gold,12);ctx.fillStyle=C.gold;ctx.beginPath();
    for(var k=0;k<6;k++){var a=Math.PI/3*k+Math.PI/6;ctx[k?"lineTo":"moveTo"](Math.cos(a)*11,Math.sin(a)*11)}ctx.closePath();ctx.fill();ctx.shadowBlur=0;
    ctx.fillStyle="#3A2A00";ctx.font="700 11px JetBrains Mono, monospace";ctx.textAlign="center";ctx.fillText(i%2?"1":"0",0,4);ctx.restore()}}
  function drawItems(){var wx=distance*CFG.pxPerM;items.forEach(function(it){if(it.got)return;var x=it.x-wx;if(x<-30||x>CFG.width+30)return;
    var y=it.y+Math.sin(elapsed*4)*5,col=it.kind==="shield"?C.cyan:C.pink;ctx.save();glow(col,20);rr(x-19,y-19,38,38,10,"rgba(20,16,48,.9)",col);ctx.shadowBlur=0;ctx.strokeStyle=col;ctx.lineWidth=3;ctx.beginPath();
    if(it.kind==="shield"){ctx.moveTo(x,y-11);ctx.lineTo(x+10,y-7);ctx.quadraticCurveTo(x+10,y+6,x,y+12);ctx.quadraticCurveTo(x-10,y+6,x-10,y-7);ctx.closePath()}
    else{ctx.moveTo(x-8,y-10);ctx.lineTo(x-8,y);ctx.arc(x,y,8,Math.PI,0,true);ctx.lineTo(x+8,y-10)}
    ctx.stroke();if(it.kind!=="shield"){ctx.fillStyle="#fff";ctx.fillRect(x-10,y-12,5,4);ctx.fillRect(x+5,y-12,5,4)}ctx.restore()})}
  function drawPlayer(g){
    var sl=player.slide>0,air=player.y<0,sp=sprites[chosen],sf=speedNow()/CFG.speed;
    var fr=sl?sp.slide:sp[air?0:1+Math.floor(elapsed*8*sf)%2];
    ctx.save();var sh=Math.max(.35,1+player.y/320);ctx.fillStyle="rgba(0,0,0,"+(.3*sh)+")";ctx.beginPath();ctx.ellipse(player.x,g+2,37*sh,7*sh,0,0,Math.PI*2);ctx.fill();
    if(shield){var cy=g+player.y-(sl?40:72),R=sl?60:82;ctx.strokeStyle="rgba(87,230,255,"+(.55+.25*Math.sin(elapsed*6))+")";ctx.fillStyle="rgba(87,230,255,.08)";ctx.lineWidth=3;ctx.beginPath();
      for(var k=0;k<6;k++){var an=Math.PI/3*k+elapsed;ctx[k?"lineTo":"moveTo"](player.x+Math.cos(an)*R*.8,cy+Math.sin(an)*R)}ctx.closePath();ctx.fill();ctx.stroke()}
    if(magnet>0){ctx.strokeStyle="rgba(255,102,196,"+Math.min(.6,magnet/2)+")";ctx.lineWidth=2;for(var m=0;m<2;m++){var rad=(elapsed*120+m*60)%120;ctx.beginPath();ctx.arc(player.x,g+player.y-60,30+rad,-.6,.6);ctx.stroke()}}
    if(invul>0)ctx.globalAlpha=.45+.55*Math.pow(Math.sin(elapsed*22),2);
    var h=sl?92:143,w=fr.width/fr.height*h;
    if(sl){ctx.strokeStyle="rgba(255,255,255,.5)";ctx.lineWidth=2;for(var k2=0;k2<3;k2++){var ly=g-14-k2*16;ctx.beginPath();ctx.moveTo(player.x-w/2-8-k2*6,ly);ctx.lineTo(player.x-w/2-34-k2*10,ly);ctx.stroke()}
      /* rolamento: uma volta para a frente, encolhendo no meio e sempre apoiado no chão */
      if(!reduce){var p=1-player.slide/CFG.slideDuration,e=p<.5?2*p*p:1-2*(1-p)*(1-p),a=e*Math.PI*2,sc=1-.32*Math.sin(Math.PI*p),
        rw=w*sc/2,rh=h*sc/2,ry=g+6-(Math.abs(rw*Math.sin(a))+Math.abs(rh*Math.cos(a)));
        ctx.translate(player.x,ry);ctx.rotate(a);ctx.drawImage(fr,-rw,-rh,rw*2,rh*2);ctx.restore();return}
      ctx.drawImage(fr,player.x-w/2,g-h+6,w,h);ctx.restore();return}
    var sx=1+player.squash*.35,sy=1-player.squash*.45,dw=w*sx,dh=h*sy,y0=g+player.y+5;
    if(keys.ArrowRight&&state==="running"&&!reduce){var ga=ctx.globalAlpha;ctx.globalAlpha=ga*.22;ctx.drawImage(fr,player.x-dw/2-24,y0-dh,dw,dh);ctx.globalAlpha=ga*.1;ctx.drawImage(fr,player.x-dw/2-46,y0-dh,dw,dh);ctx.globalAlpha=ga}
    ctx.drawImage(fr,player.x-dw/2,y0-dh,dw,dh);ctx.restore()}
  function drawParticles(){particles.forEach(function(p){ctx.globalAlpha=Math.max(0,Math.min(1,p.t*2));ctx.fillStyle=p.col||C.gold;var z=p.s||4;ctx.fillRect(p.x-z/2,p.y-z/2,z,z)});ctx.globalAlpha=1}

  /* camada de interface no canvas */
  function speedLines(){var f=speedNow()/CFG.speed-1;if(f<.25||reduce)return;ctx.strokeStyle="rgba(255,255,255,"+Math.min(.3,(f-.25)*.45)+")";ctx.lineWidth=2;
    for(var i=0;i<14;i++){var y=(i*53)%(CFG.ground-20)+10,len=60+(i%4)*30,x=CFG.width-((elapsed*1400+i*397)%(CFG.width+300));ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+len,y);ctx.stroke()}}
  function outlined(t,x,y,font,col,lw){ctx.font=font;ctx.lineWidth=lw||4;ctx.strokeStyle="rgba(13,10,35,.8)";ctx.strokeText(t,x,y);ctx.fillStyle=col;ctx.fillText(t,x,y)}
  function drawPopups(){ctx.textAlign="center";popups.forEach(function(p){ctx.globalAlpha=Math.min(1,p.life*2);outlined(p.t,p.x,p.y,"800 "+(p.t.length>5?17:15)+"px Sora, sans-serif",p.col)});ctx.globalAlpha=1;ctx.textAlign="start"}
  function pill(x,y,txt,col,frac){ctx.font="700 12px Sora, sans-serif";var w=ctx.measureText(txt).width+22;rr(x,y,w,26,13,"rgba(13,10,35,.7)",col);
    if(frac!=null){ctx.fillStyle=col;ctx.globalAlpha=.35;ctx.fillRect(x+3,y+20,(w-6)*frac,3);ctx.globalAlpha=1}ctx.fillStyle=col;ctx.fillText(txt,x+11,y+17);return w}
  function drawStatus(){var x=14;if(shield)x+=pill(x,14,"ESCUDO",C.cyan)+8;if(magnet>0)pill(x,14,"ÍMÃ "+Math.ceil(magnet)+"s",C.pink,magnet/8)}
  function drawBanner(){if(!bannerO)return;var b=bannerO,t=1.6-b.life,sc=reduce?1:t<.18?.6+t/.18*.4:1;ctx.save();ctx.globalAlpha=Math.min(1,b.life*2.5);ctx.translate(CFG.width/2,150);ctx.scale(sc,sc);ctx.textAlign="center";
    glow(C.purple,24);outlined(b.t,0,0,"800 52px Sora, sans-serif","#fff",8);ctx.shadowBlur=0;if(b.sub)outlined(b.sub,0,34,"600 18px Poppins, sans-serif",C.cyan,4);ctx.restore()}
  function drawCountdown(){if(state!=="countdown")return;var n=Math.ceil(cd),f=cd-Math.floor(cd),sc=reduce?1:1+f*.5;
    ctx.fillStyle="rgba(13,10,35,.35)";ctx.fillRect(0,0,CFG.width,CFG.height);ctx.save();ctx.translate(CFG.width/2,CFG.ground/2);ctx.textAlign="center";ctx.textBaseline="middle";
    outlined("Prepare-se",0,88,"600 18px Poppins, sans-serif",C.cyan,4);ctx.scale(sc,sc);ctx.globalAlpha=Math.min(1,.25+f*1.5);glow(C.purple,30);outlined(String(n),0,0,"800 110px Sora, sans-serif","#fff",10);ctx.restore()}
  function draw(){
    if(!ready||$id("rnGame").hidden)return;
    var g=CFG.ground,s=distance*CFG.pxPerM,W=CFG.width,H=CFG.height;
    ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle="#0E0B24";ctx.fillRect(0,0,W,H);
    if(shake>0)ctx.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);
    sky(s,g,dist()/CFG.finish);city(s,g);track(s,g);markers(distance,g);finishLine(distance,g);drawCoins();drawItems();
    obstacles.forEach(function(o){if(o.passed)return;var r=oRect(o);if(r.x+r.w<-40||r.x>W+40)return;DRAW[o.type](r)});
    drawPlayer(g);drawParticles();
    ctx.setTransform(1,0,0,1,0,0);speedLines();warnings();drawPopups();drawStatus();drawBanner();drawCountdown();
    if(flash){ctx.fillStyle="rgba("+flash.c+","+Math.max(0,flash.a)+")";ctx.fillRect(0,0,W,H)}
  }
  function tick(now){
    var rem=Math.min((now-last)/1000||0,.05);last=now;
    while(rem>0){var st=Math.min(rem,1/120);update(st);rem-=st}
    draw();loop=requestAnimationFrame(tick);
  }

  /* confetes da vitória (do jogo original) */
  var confetti=(function(c){var x=c.getContext("2d"),cols=["#8A4FFF","#57E6FF","#FF66C4","#FFFFFF","#FFD166"],ps=[],id=0,tm=0,lt=0;
    function rs(){var sc=devicePixelRatio||1,b=c.getBoundingClientRect();c.width=Math.max(1,b.width*sc|0);c.height=Math.max(1,b.height*sc|0);x.setTransform(sc,0,0,sc,0,0);return b}
    function mk(w,ctr){return {x:ctr?w/2+(Math.random()-.5)*130:Math.random()*w,y:ctr?200:-20-Math.random()*280,vx:ctr?(Math.random()-.5)*360:(Math.random()-.5)*50,vy:ctr?-230-Math.random()*210:85+Math.random()*150,g:235+Math.random()*90,r:Math.random()*3,sp:(Math.random()-.5)*9,w:7+Math.random()*8,h:4+Math.random()*6,c:cols[Math.random()*5|0]}}
    function fr(now){var b=rs(),dt=Math.min((now-lt)/1000||0,.034);lt=now;x.clearRect(0,0,b.width,b.height);
      ps.forEach(function(p){p.vy+=p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=p.sp*dt;if(p.y>b.height+30)Object.assign(p,mk(b.width));x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.w/2,-p.h/2,p.w,p.h);x.restore()});id=requestAnimationFrame(fr)}
    function start(){stop();if(reduce)return;var b=rs();ps=Array.from({length:110},function(_,i){return mk(b.width,i<50)});lt=performance.now();id=requestAnimationFrame(fr);tm=setTimeout(stop,4000)}
    function stop(){if(id)cancelAnimationFrame(id);if(tm)clearTimeout(tm);id=0;tm=0;ps=[];x.clearRect(0,0,c.width,c.height)}
    return {start:start,stop:stop}})($id("rnConfetti"));

  /* abas */
  var TABS={runner:["tabRunner","panelRunner"],central:["tabCentral","panelCentral"]},TAB_ORDER=["runner","central"],central=null;
  function pauseCentral(){if(central&&central._game.isActive())central._game.showPause()}
  function tab(which){if(!TABS[which])which="runner";
    TAB_ORDER.forEach(function(k){var on=k===which;$id(TABS[k][0]).setAttribute("aria-selected",on);$id(TABS[k][1]).hidden=!on});
    if(which!=="runner")pause();if(which!=="central")pauseCentral();
    if(which==="central"&&!central)central=CentralIA.mount("#jogoCentral");
    store.set("inovaai-gametab",which)}
  TAB_ORDER.forEach(function(k,i){var b=$id(TABS[k][0]);b.addEventListener("click",function(){tab(k)});
    b.addEventListener("keydown",function(e){if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();var n=TAB_ORDER[(i+(e.key==="ArrowRight"?1:TAB_ORDER.length-1))%TAB_ORDER.length];$id(TABS[n][0]).focus();tab(n)}})});

  /* tela estreita: câmera mais próxima, personagens maiores */
  function fit(){var w=$id("rnArena").clientWidth;if(!w)return;var nw=w<720?640:1100;if(nw!==CFG.width){CFG.width=nw;cv.width=nw}}
  window.addEventListener("resize",fit);
  showBest();
  requestAnimationFrame(tick);
  return {leave:function(){pause();pauseCentral()},tab:tab,initTab:function(){tab(store.get("inovaai-gametab","runner"))}};
})();

/* ---------- início ---------- */
renderTopics();renderFilms();netColors();route();size();frame();
})();
