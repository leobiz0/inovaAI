# InovaAI · Projeto EDUTEC 2026

Site sobre inteligência artificial feito pelo grupo EDUTEC 2026
(Leonardo Bizo, Nickolas Zilig, Sofia Porto e Yago Santos).

## Como abrir no VS Code

1. Extraia o .zip e abra a pasta `inovaai` no VS Code (Arquivo › Abrir Pasta).
2. Instale a extensão **Live Server** (de Ritwick Dey).
3. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.

## Pôsteres dos filmes

Coloque os arquivos em `img/filmes/` com estes nomes:
`ex-machina.jpg`, `matrix.jpg`, `eu-robo.jpg`, `transcendence.jpg`,
`mitchells.jpg` e `homem-bicentenario.jpg`.
O site usa o pôster quando o arquivo existe e a ilustração quando não existe.
Para usar outro nome ou formato, edite `var SLUG` e o trecho `.jpg` em `script.js`.

## Arquivos

- `index.html`: estrutura de todas as páginas e do chat.
- `style.css`: cores, fontes e layout. As cores dos temas ficam no topo, em `:root`.
- `script.js`: navegação, conteúdo dos assuntos (`TOPICS`), laboratórios,
  jogo (`Q`), filmes (`F`) e a chatbot Nova (`KB`).
- `img/`: ilustrações, logo e fotos do grupo.

## Ensine a máquina

Página `#ensine`. Em `script.js`, procure `var Teach`. O modelo é um k-NN
(k vizinhos mais próximos) com `K = 5`; os desenhos viram vetores de 16 × 16.
Os exemplos que cada visitante ensina ficam salvos só no navegador dele.

## Inova Runner

O jogo fica na página Jogo. Em `script.js`, procure `var Runner`:
- `CFG`: velocidade, pulo, distância (600 m) e número de vidas.
- `QUESTIONS`: perguntas no formato `["Categoria", "Pergunta", ["certa", "errada", "errada", "errada"], "explicação"]`.
  A resposta certa é sempre a primeira da lista; o jogo embaralha as alternativas.
- Imagens dos personagens: `img/run-bin.webp`, `img/run-marcio.webp` (3 quadros lado a lado)
  e `img/roll-bin.webp`, `img/roll-marcio.webp` (pose agachada).

## Como editar a Nova

Procure `var KB` em `script.js`. Cada item é
`["id", [frases de exemplo], "resposta", "página", [sugestões]]`.
Para ela entender uma pergunta nova, acrescente a frase na lista de exemplos.
