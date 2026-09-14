/* =========================================================================
   ADEUS CANELITE: os dados do programa.

   Base técnica levantada de literatura revista por pares (14/09/2026):
   - RCT 12 semanas de exercícios de perna em MTSS (PMC11826869): séries,
     repetições e a regra de progressão
   - Moen 2012 (PMC3352296): o protocolo de regresso à corrida em 6 fases
   - Soreness Rules (Fees 1998), guideline SLU/SSM: a régua da dor
   - Warden 2021: carga óssea e cadência

   DUAS REGRAS DE ESCRITA, inegociáveis:
   1. É TREINO, nunca tratamento. Não escrever curar, tratar, eliminar a dor
      nem diagnóstico. Escrever fortalecer, carga, progressão, voltar a treinar.
   2. Português de Portugal, tratamento por TU.
   ========================================================================= */

/* ---------- OS EXERCÍCIOS ---------- */
const EXERCICIOS = {
  isometria: {
    id: 'isometria', nome: 'Ponta dos pés e segura',
    img: 'img/ex-elevacao-calcanhar.jpg',
    musculo: 'Gémeos e solear',
    dose: '5 séries de 20 segundos a segurar',
    descanso: '30 segundos entre séries',
    material: 'Uma parede ou uma cadeira',
    passos: [
      'De pé, com as mãos apoiadas numa parede ou nas costas de uma cadeira.',
      'Sobe devagar até ficares na ponta dos pés.',
      'Fica aí parado a contar, sem tremer nem oscilar.',
      'Desce devagar, a contar até três.'
    ],
    sentes: 'Nos gémeos, atrás da perna, a queimar de leve',
    erro: 'Descer de repente. A descida devagar é metade do exercício.',
    porque: 'Segurar parado carrega o músculo sem o obrigar a trabalhar em movimento. É por aqui que se começa quando a canela ainda está a queixar-se.'
  },
  dorsiflexao: {
    id: 'dorsiflexao', nome: 'Ponta do pé para cima',
    img: 'img/ex-ponta-pe-cima.jpg',
    musculo: 'Tibial anterior, a frente da canela',
    dose: '3 séries de 15 repetições em cada pé',
    descanso: '30 segundos entre séries',
    material: 'Uma cadeira',
    passos: [
      'Sentado numa cadeira, com os pés assentes no chão.',
      'Mantém o calcanhar no chão e puxa a ponta do pé para cima, em direcção à canela.',
      'Segura dois segundos em cima.',
      'Desce devagar.'
    ],
    sentes: 'Na frente da canela, do lado de fora do osso',
    erro: 'Levantar o calcanhar. Ele fica no chão o tempo todo.',
    porque: 'É o músculo que quase ninguém treina, e é o que trava o pé cada vez que ele desce no passo.'
  },
  circulos: {
    id: 'circulos', nome: 'Círculos com o tornozelo',
    img: 'img/ex-circulos-tornozelo.jpg',
    musculo: 'Mobilidade do tornozelo',
    dose: '10 círculos para cada lado, em cada pé',
    descanso: 'Sem descanso',
    material: 'Uma cadeira',
    passos: [
      'Sentado, levanta um pé do chão.',
      'Desenha círculos lentos com a ponta do pé, num sentido.',
      'Depois no sentido contrário.'
    ],
    sentes: 'Movimento solto no tornozelo, sem dor',
    erro: 'Fazer depressa. Quanto mais lento, melhor.',
    porque: 'Não é para fortalecer. É para o tornozelo não ficar preso enquanto estás a treinar menos.'
  },
  calcanhar: {
    id: 'calcanhar', nome: 'Elevação de calcanhares',
    img: 'img/ex-elevacao-calcanhar.jpg',
    musculo: 'Gémeos e solear',
    dose: '3 séries de 12 a 15 repetições',
    descanso: '60 segundos entre séries',
    material: 'Um degrau ou o rebordo de um passeio',
    passos: [
      'De pé, com a ponta dos pés na borda de um degrau e os calcanhares no ar.',
      'Sobe até ao máximo que consegues, devagar.',
      'Segura um segundo em cima.',
      'Desce devagar, a contar até três, até sentires o alongamento.'
    ],
    sentes: 'A queimar nos gémeos, dos dois lados',
    erro: 'Fazer depressa e usar o balanço. Devagar custa mais e vale mais.',
    porque: 'É o exercício central do programa. Quem tem canelite consegue fazer muito menos repetições do que quem não tem, e é isso que vais corrigir.'
  },
  calcanharUm: {
    id: 'calcanharUm', nome: 'Elevação num pé só',
    img: 'img/ex-elevacao-um-pe.jpg',
    musculo: 'Gémeos, sem a perna boa a compensar',
    dose: '3 séries de 10 a 12 repetições em cada pé',
    descanso: '60 segundos entre séries',
    material: 'Um degrau e uma parede',
    passos: [
      'O mesmo do anterior, mas com um pé de cada vez.',
      'A outra perna fica dobrada atrás, sem tocar no chão.',
      'Usa a mão na parede só para o equilíbrio, não para te puxares.'
    ],
    sentes: 'Muito mais do que no exercício anterior',
    erro: 'Apoiar-te na parede com força. A parede é só para o equilíbrio.',
    porque: 'Com as duas pernas juntas, a perna boa tapa a fraca. Num pé só não há como esconder.'
  },
  elastico: {
    id: 'elastico', nome: 'Puxar o pé para dentro com elástico',
    img: 'img/ex-elastico-tornozelo.jpg',
    musculo: 'Tibial posterior',
    dose: '3 séries de 12 a 15 repetições em cada pé',
    descanso: '60 segundos entre séries',
    material: 'Elástico de treino',
    passos: [
      'Sentado no chão com a perna esticada.',
      'Prende o elástico à volta da parte da frente do pé e o outro extremo a algo fixo, do lado de fora.',
      'Puxa o pé para dentro, contra a resistência do elástico.',
      'Volta devagar.'
    ],
    sentes: 'Por dentro da perna e do tornozelo',
    erro: 'Rodar a perna toda. Só o pé é que se mexe.',
    porque: 'O tibial posterior é o músculo que segura o arco do pé. É dos que mais puxa na tíbia quando não aguenta.'
  },
  arco: {
    id: 'arco', nome: 'Pé curto',
    img: 'img/ex-arco-pe.jpg',
    musculo: 'Músculos pequenos do pé',
    dose: '30 repetições, 5 segundos cada',
    descanso: 'Sem descanso fixo',
    material: 'Uma cadeira',
    passos: [
      'Sentado, com o pé assente no chão.',
      'Sem enrolar os dedos, puxa a planta do pé como se quisesses aproximar a base dos dedos do calcanhar.',
      'O arco do pé levanta um pouco.',
      'Segura cinco segundos e larga.'
    ],
    sentes: 'Por baixo do pé, no arco',
    erro: 'Encolher os dedos. Os dedos ficam esticados e relaxados.',
    porque: 'Estranho no início, e quase ninguém acerta à primeira. Ao fim de uns dias sai sozinho.'
  },
  equilibrio: {
    id: 'equilibrio', nome: 'Apoio num pé só',
    img: 'img/ex-apoio-um-pe.jpg',
    musculo: 'Equilíbrio, tornozelo e anca',
    dose: '3 séries de 30 segundos em cada pé',
    descanso: '30 segundos entre séries',
    material: 'Nenhum',
    passos: [
      'De pé, apoia-te num pé só.',
      'A outra perna fica dobrada, sem tocar no chão.',
      'Mantém a bacia direita, sem deixar cair o lado da perna levantada.',
      'Quando ficar fácil, fecha os olhos.'
    ],
    sentes: 'O pé a trabalhar e a anca a segurar',
    erro: 'Deixar a bacia cair para o lado. É isso mesmo que estamos a treinar.',
    porque: 'A fraqueza da anca aparece na canela. Quando a bacia cai a cada passo, a perna roda e a tíbia paga.'
  },
  agachamento: {
    id: 'agachamento', nome: 'Agachamento parcial',
    img: 'img/ex-agachamento.jpg',
    musculo: 'Toda a perna',
    dose: '3 séries de 15 repetições',
    descanso: '60 segundos entre séries',
    material: 'Nenhum',
    passos: [
      'De pé, pés à largura dos ombros.',
      'Desce até meio, como se te fosses sentar numa cadeira alta.',
      'Os joelhos seguem a direcção dos pés, sem cair para dentro.',
      'Sobe devagar.'
    ],
    sentes: 'Nas coxas e no rabo',
    erro: 'Descer demais no início. Meio agachamento chega.',
    porque: 'Não é para a canela directamente. É para a perna inteira aguentar mais antes de cansar.'
  },
  alongamento: {
    id: 'alongamento', nome: 'Alongamento na parede',
    img: 'img/ex-alongamento-parede.jpg',
    musculo: 'Gémeos',
    dose: '3 vezes de 30 segundos em cada perna',
    descanso: 'Sem descanso',
    material: 'Uma parede',
    passos: [
      'Mãos apoiadas na parede, uma perna esticada atrás.',
      'O calcanhar de trás fica assente no chão.',
      'Dobra a perna da frente até sentires o alongamento atrás.',
      'Segura sem forçar.'
    ],
    sentes: 'Atrás da perna esticada',
    erro: 'Forçar até doer. Alongamento agressivo na fase em que dói é para evitar.',
    porque: 'Entra só a partir da fase 2, quando as dores do dia a dia já passaram. Antes disso não ajuda.'
  },
  caminhar: {
    id: 'caminhar', nome: 'Caminhar nos calcanhares',
    img: 'img/ex-caminhar-calcanhares.jpg',
    musculo: 'Tibial anterior, em movimento',
    dose: '3 séries de 20 passos',
    descanso: '30 segundos entre séries',
    material: 'Nenhum',
    passos: [
      'De pé, levanta as pontas dos dois pés do chão.',
      'Caminha apoiado só nos calcanhares.',
      'Mantém o tronco direito.'
    ],
    sentes: 'A arder na frente das canelas',
    erro: 'Levantar pouco a ponta do pé. Quanto mais levantas, mais trabalha.',
    porque: 'É o mesmo músculo do exercício sentado, mas a trabalhar a suportar o teu peso.'
  }
};

/* ---------- AS 3 FASES ---------- */
const FASES = [
  {
    n: 1, nome: 'Aliviar', semanas: [1,2],
    promessa: 'Baixar a irritação sem parares de te mexer',
    texto: 'Nestas duas semanas tiramos a carga que está a irritar a canela, mas sem te sentares no sofá. Vais manter-te activo de outra forma e começar a acordar os músculos que vão fazer o trabalho a seguir.',
    regra: 'Se doer a andar no dia a dia, ainda não passas à fase 2. Esse é o sinal que interessa, não o calendário.',
    treino: ['isometria','dorsiflexao','circulos'],
    dias: 'Todos os dias',
    extra: {
      titulo: 'O que fazer em vez de correr',
      texto: 'Mantém o fôlego com coisas que não batem no chão: bicicleta, natação, elíptica, ou correr dentro de água. Não é castigo, é manter a forma enquanto a canela acalma.'
    }
  },
  {
    n: 2, nome: 'Fortalecer', semanas: [3,4,5,6,7,8],
    promessa: 'Construir a perna que aguenta o impacto',
    texto: 'Esta é a fase que faz a diferença. Não é só fazer os exercícios: é subir a carga todas as semanas, sempre que a canela deixar. É essa subida controlada que constrói capacidade a sério.',
    regra: 'Só passas ao nível seguinte quando conseguires fazer uma semana inteira no nível actual sem os sintomas aumentarem.',
    treino: ['calcanhar','calcanharUm','elastico','arco','equilibrio','agachamento'],
    opcional: ['alongamento','caminhar'],
    dias: 'Dias alternados, 3 a 4 vezes por semana',
    extra: {
      titulo: 'Como subir a carga',
      texto: 'Quando conseguires uma semana inteira sem os sintomas aumentarem, sobe UM degrau: mais repetições (12 para 15), mais séries (3 para 4), elástico mais forte, ou mais tempo a segurar. Um degrau de cada vez. Subir tudo ao mesmo tempo é exactamente o erro que trouxe a canelite.'
    }
  },
  {
    n: 3, nome: 'Voltar', semanas: [9,10,11,12],
    promessa: 'Voltar a correr com um plano, em vez de ir a ver no que dá',
    texto: 'Aqui está a parte que quase toda a gente salta, e é por isso que a canelite volta. Não se volta a correr de uma vez: sobe-se por degraus, com uma regra a dizer quando avançar e quando recuar.',
    regra: 'Avanças quando completares a fase sem dor. Se a dor aparecer durante ou no dia seguinte, ficas na mesma fase e tiras dois minutos.',
    treino: ['calcanhar','equilibrio','elastico'],
    dias: 'Nos dias em que não corres',
    extra: {
      titulo: 'Antes de correr o primeiro metro',
      texto: 'Três coisas têm de estar feitas: andar 30 minutos seguidos sem sentir nada, dois dias seguidos sem dor nas coisas do dia a dia, e conseguir dez saltos num pé só sem dor. Se falhares alguma, ainda não é altura.'
    }
  }
];

/* ---------- O PLANO DE REGRESSO (é o BUMP) ---------- */
const REGRESSO = {
  intro: 'Três vezes por semana, sempre com um dia de descanso pelo meio. Avanças quando completares a fase sem dor.',
  fases: [
    { n:1, onde:'Passadeira', total:'16 minutos', como:'2 min a correr / 2 min a andar, 8 vezes', ritmo:'Corrida leve. Marcha a passo rápido' },
    { n:2, onde:'Passadeira', total:'16 minutos', como:'2 min a correr / 2 min a andar, 8 vezes', ritmo:'Corrida um pouco mais rápida' },
    { n:3, onde:'Rua',        total:'20 minutos', como:'3 min a correr / 2 min a andar, 4 vezes', ritmo:'Trote leve, a conseguir falar' },
    { n:4, onde:'Rua',        total:'20 minutos', como:'3 min a correr / 2 min a andar, 4 vezes', ritmo:'Trote em que falar já custa' },
    { n:5, onde:'Rua',        total:'16 min seguidos', como:'Corrida contínua', ritmo:'Trote leve, a conseguir falar' },
    { n:6, onde:'Rua',        total:'18 min seguidos', como:'Corrida contínua', ritmo:'Trote em que falar já custa' }
  ],
  depois: 'Quando acabares a fase 6, sobe o volume devagar e só depois a velocidade. Distância primeiro, ritmo depois: é a ordem que carrega menos o osso.',
  recuar: 'Se a dor chegar durante a corrida ou no dia seguinte, ficas na mesma fase e tiras dois minutos do tempo total.'
};

/* =========================================================================
   A ROTINA DE ANTES DO TREINO
   Prometida na LP ("Rotina de 5 minutos antes do treino", 20 EUR) e entregue
   a TODOS os niveis: e promessa do front, nao do upsell.

   Base: aquecimento activo antes do impacto. Nao e alongamento estatico,
   que antes do esforco nao previne nada (ver MITOS).
   ========================================================================= */
const ROTINA = {
  intro: 'Cinco minutos antes de saíres de casa ou de entrares em campo. Não é alongamento parado: é acordar o que vai levar com o impacto.',
  nota: 'Faz esta rotina nos dias em que treinas, por cima do programa. Não substitui os exercícios da tua fase.',
  passos: [
    { t:'Tornozelos a rodar', d:'10 círculos para cada lado, em cada pé', porque:'Solta a articulação antes de ela levar carga' },
    { t:'Ponta dos pés, a subir e a descer', d:'20 repetições, devagar', porque:'Acorda os gémeos e o solear, que são os que absorvem o impacto' },
    { t:'Calcanhares no chão, pontas para cima', d:'20 repetições', porque:'O tibial anterior é o que dói na canela. Aquece-o antes de correr' },
    { t:'Marcha no lugar, joelho alto', d:'30 segundos', porque:'Sobe a temperatura e ensaia o movimento da corrida' },
    { t:'Saltos pequenos nos dois pés', d:'20 saltos, a aterrar suave', porque:'O último degrau antes do impacto a sério' }
  ],
  alerta: 'Se doer nos saltos do último passo, hoje não corres. Fica pelos exercícios da tua fase.'
};

/* =========================================================================
   O UPSELL: as outras quatro lesoes de quem corre
   Nivel de acesso "mais". Mesmo motor, mesma regua da dor, mesma regra de
   progressao do programa da canela.

   Base tecnica, tambem de literatura revista por pares (14/09/2026):
   - Dor femoropatelar: consenso de Collins 2018, e a evidencia de que o
     trabalho de anca vence o trabalho so de joelho
   - Fascite plantar: Rathleff 2015 (RCT), carga alta em dorsiflexao
   - Tendinopatia de Aquiles: Alfredson, o protocolo de descida lenta
   - Banda iliotibial: Fredericson, cadeia da anca

   As MESMAS duas regras de escrita: e treino, nunca tratamento; e PT-PT
   com tratamento por tu.
   ========================================================================= */
const LESOES = [
  {
    id: 'joelho',
    nome: 'Joelho do corredor',
    onde: 'À volta ou por baixo da rótula',
    resumo: 'Dói a descer escadas, a estar muito tempo sentado, e ao fim de alguns quilómetros.',
    sinal: 'Dor espalhada à frente do joelho, pior a descer do que a subir. Piora depois de estar muito tempo sentado.',
    causa: 'Quase nunca é o joelho. É a anca que não segura a bacia, e o joelho paga a conta a cada passo.',
    semanas: 8,
    exercicios: [
      { t:'Ponte com um pé', img:'img/ex-ponte-um-pe.jpg', dose:'3 séries de 10, em cada perna', como:'Deitado de costas, um pé no chão e o outro no ar. Sobe a bacia sem a deixar torcer para o lado.', sentes:'Atrás, no glúteo' },
      { t:'Subir a perna deitado de lado', img:'img/ex-perna-lado.jpg', dose:'3 séries de 15, em cada perna', como:'Deitado de lado, sobe a perna de cima com o corpo alinhado, sem rodar a bacia para trás.', sentes:'Na parte de fora da anca' },
      { t:'Agachamento na parede', img:'img/ex-agachamento-parede.jpg', dose:'3 séries de 30 segundos', como:'Costas na parede, joelhos dobrados a meio caminho, sem os deixar passar à frente dos pés.', sentes:'À frente da coxa' },
      { t:'Descer de um degrau devagar', img:'img/ex-descer-degrau.jpg', dose:'3 séries de 10, em cada perna', como:'Desce de um degrau a contar até três, a controlar. O joelho não cai para dentro.', sentes:'À frente da coxa e no glúteo' }
    ],
    regra: 'Dor até 3 numa escala de 10 durante o exercício é aceitável, desde que acalme em 24 horas. Acima disso, baixa a carga.',
    erro: 'Fazer só exercícios de joelho e ignorar a anca. É o erro que faz isto voltar sempre.'
  },
  {
    id: 'fascite',
    nome: 'Fascite plantar',
    onde: 'Na planta do pé, junto ao calcanhar',
    resumo: 'Dói nos primeiros passos da manhã e depois de estares muito tempo parado.',
    sinal: 'Os primeiros passos ao sair da cama são os piores do dia. Melhora a andar e volta ao fim do dia.',
    causa: 'A fáscia aguenta menos do que lhe estão a pedir. O que muda isto é carga a sério, não repouso.',
    semanas: 12,
    exercicios: [
      { t:'Elevação de calcanhar com toalha', img:'img/ex-calcanhar-toalha.jpg', dose:'3 séries de 12, bem devagar', como:'Uma toalha enrolada por baixo dos dedos. Sobe na ponta do pé a contar até três e desce a contar até três.', sentes:'Na planta do pé e no gémeo' },
      { t:'Rolar a planta do pé', img:'img/ex-rolar-planta.jpg', dose:'2 minutos em cada pé', como:'Uma bola pequena ou uma garrafa fria debaixo do pé, a rolar do calcanhar até aos dedos.', sentes:'Na planta, a soltar' },
      { t:'Pé curto', img:'img/ex-arco-pe.jpg', dose:'3 séries de 10 segundos', como:'Sem enrolar os dedos, encurta o arco do pé a puxar a almofada do pé na direcção do calcanhar.', sentes:'No arco do pé' },
      { t:'Alongamento do gémeo na parede', img:'img/ex-alongamento-parede.jpg', dose:'3 vezes 30 segundos', como:'Mãos na parede, perna de trás esticada e calcanhar no chão.', sentes:'Atrás, na barriga da perna' }
    ],
    regra: 'A carga alta é o que muda isto, e é lenta. Dia sim, dia não, e não desistas antes das 12 semanas: é o prazo que a evidência mostra.',
    erro: 'Parar por completo à espera que passe sozinho. A fáscia fica mais fraca e dói na mesma quando voltas.'
  },
  {
    id: 'aquiles',
    nome: 'Tendinite de Aquiles',
    onde: 'No tendão, logo acima do calcanhar',
    resumo: 'Dói e engrossa atrás do tornozelo. Custa a arrancar e alivia a meio do treino.',
    sinal: 'Rigidez de manhã e nos primeiros minutos de corrida. Se apertares o tendão entre os dedos, dói num ponto.',
    causa: 'O tendão não tem capacidade para a carga que lhe dás. Constrói-se com descidas lentas, não com descanso.',
    semanas: 12,
    exercicios: [
      { t:'Descida lenta com os dois pés', img:'img/ex-descida-dois-pes.jpg', dose:'3 séries de 15', como:'Sobe com os dois pés na ponta de um degrau e desce a contar até três, até abaixo do nível do degrau.', sentes:'No tendão e no gémeo' },
      { t:'Descida lenta com um pé', img:'img/ex-descida-um-pe.jpg', dose:'3 séries de 15', como:'O mesmo movimento, mas sobes com os dois pés e desces só com o pé que dói.', sentes:'No tendão, a puxar' },
      { t:'Descida com o joelho dobrado', img:'img/ex-descida-joelho-dobrado.jpg', dose:'3 séries de 15', como:'A mesma descida, com o joelho um pouco dobrado. Apanha a parte funda do músculo.', sentes:'Mais fundo, junto ao tornozelo' },
      { t:'Segurar na ponta do pé', img:'img/ex-elevacao-calcanhar.jpg', dose:'4 séries de 30 segundos', como:'Na ponta dos pés, parado, sem tremer nem oscilar.', sentes:'No gémeo e no tendão' }
    ],
    regra: 'Aqui a dor até 5 numa escala de 10 durante o exercício é permitida, desde que acalme até ao dia seguinte. É a excepção do tendão.',
    erro: 'Desistir à terceira semana. O tendão é lento, e a mudança costuma aparecer por volta da oitava.'
  },
  {
    id: 'banda',
    nome: 'Banda iliotibial',
    onde: 'Na parte de fora do joelho',
    resumo: 'Uma dor aguda por fora do joelho, que aparece sempre mais ou menos ao mesmo quilómetro.',
    sinal: 'Começa num ponto previsível do treino e obriga a parar. A descer é pior. Parado não dói.',
    causa: 'A anca não estabiliza e a banda roça por fora. Trabalha-se a anca, não a banda.',
    semanas: 8,
    exercicios: [
      { t:'Subir a perna deitado de lado', img:'img/ex-perna-lado.jpg', dose:'3 séries de 15, em cada perna', como:'Deitado de lado, sobe a perna de cima com o corpo alinhado.', sentes:'Na parte de fora da anca' },
      { t:'Abrir o joelho deitado de lado', img:'img/ex-abrir-joelho.jpg', dose:'3 séries de 15, de cada lado', como:'Deitado de lado com os joelhos dobrados, abre o joelho de cima sem rodar a bacia.', sentes:'No glúteo, atrás e de lado' },
      { t:'Passos de lado com elástico', img:'img/ex-passos-lado.jpg', dose:'3 séries de 12 passos para cada lado', como:'Elástico acima dos joelhos, meio agachado, passos de lado sem juntar os pés.', sentes:'De lado, no glúteo' },
      { t:'Equilíbrio num pé com toque à frente', img:'img/ex-equilibrio-toque.jpg', dose:'3 séries de 10, em cada perna', como:'Num pé só, toca à frente com o outro pé sem lá pousar o peso. A bacia fica direita.', sentes:'No glúteo e no pé de apoio' }
    ],
    regra: 'Enquanto doer a correr, corta a distância para metade e evita as descidas. A distância volta quando a anca aguentar.',
    erro: 'Rolar a banda com o rolo à espera que ela solte. A banda não estica: o que falta é força na anca.'
  }
];

/* ---------- A RÉGUA DA DOR ---------- */
const REGUA = [
  { q:'Dói no aquecimento e a dor continua',          a:'Dois dias de descanso e desce um nível', t:'mau' },
  { q:'Dói no aquecimento mas a dor passa',           a:'Fica no mesmo nível',                    t:'meio' },
  { q:'A dor passa no aquecimento e volta a meio',    a:'Dois dias de descanso e desce um nível', t:'mau' },
  { q:'Dói no dia seguinte, e não é dor de músculo',  a:'Um dia de descanso e não avanças',       t:'meio' },
  { q:'Não dói',                                       a:'Avanças um nível na semana seguinte',    t:'bom' }
];

/* ---------- O TESTE ---------- */
const TESTE = {
  nome: 'O teste do calcanhar',
  porque: 'Quem tem canelite consegue fazer bastante menos elevações de calcanhar até não conseguir mais do que quem não tem. É o teu ponto de partida, e é o número que vais ver subir.',
  passos: [
    'Descalço, de pé, num pé só.',
    'Uma mão na parede, só para equilíbrio.',
    'Sobe até ao máximo da ponta do pé e desce, ao ritmo de uma por segundo.',
    'Conta até não conseguires fazer mais nenhuma com o calcanhar a subir até cima.',
    'Repete no outro pé.'
  ],
  quando: 'Semana 1, semana 4, semana 8 e no fim',
  nota: 'Anota os dois pés. A diferença entre eles diz tanto como o número.'
};

/* ---------- SINAIS DE ALARME ---------- */
const ALARME = {
  intro: 'A canelite dói numa zona espalhada, ao longo da parte de dentro da canela, e melhora com repouso. Quando não é assim, pode ser outra coisa. Se algum destes sinais te disser respeito, pára o programa e marca uma consulta.',
  sinais: [
    'Dor em repouso, ou que te acorda de noite',
    'Dor num ponto pequeno e exacto, do tamanho de um dedo, sobretudo na frente da canela',
    'Não conseguires dar dez saltos num pé só, ou não conseguires andar sem dor',
    'Dormência, formigueiro, ardor, pé frio ou pálido, ou perda de força',
    'Inchaço marcado, vermelhidão ou calor, comparado com a outra perna',
    'Dor que aparece sempre ao mesmo minuto de corrida, com sensação de aperto ou pressão',
    'Nenhuma melhoria depois de semanas a gerir a carga com cuidado'
  ],
  rodape: 'Isto não é um diagnóstico nem substitui a avaliação de quem é da área. É uma lista do que vale a pena mostrar a um médico ou fisioterapeuta.'
};

/* ---------- MITOS ---------- */
const MITOS = [
  { m:'Alongar previne a canelite', v:'Os estudos que testaram alongamento para prevenir não encontraram benefício. E na fase em que dói, alongar os gémeos com força é para evitar.' },
  { m:'Palmilhas resolvem', v:'Não previnem lesões da perna. Podem ajudar a aliviar em alguns casos, mas não são a solução.' },
  { m:'É só descansar', v:'O descanso tira a dor porque tira a carga. Quando voltas, a perna continua igual e a dor volta com ela.' },
  { m:'Correr muitos quilómetros causa canelite', v:'A quilometragem por si não é o problema. O que faz a canela queixar-se é a subida brusca: aumentar o volume ou o ritmo depressa demais.' },
  { m:'Meias de compressão curam', v:'Testadas e sem resultado. Podem dar conforto, e é tudo.' }
];

/* ---------- CADÊNCIA ---------- */
const CADENCIA = {
  texto: 'Aumentar o número de passos por minuto entre 5% e 10% reduz a carga que chega à tíbia a cada passada. Não precisas de correr mais depressa: são os mesmos quilómetros com passos mais curtos e mais frequentes.',
  passos: [
    'Se o teu relógio mostra a cadência, vê qual é a tua normal.',
    'Soma-lhe 5%. Se corres a 160 passos por minuto, passa a 168.',
    'Se não tens relógio, conta os passos de um pé durante 30 segundos e multiplica por quatro.',
    'Dá algumas corridas a habituar. Vai parecer estranho no início.'
  ],
  aviso: 'Uma coisa que se lê por aí e não ajuda: tentar aterrar mais suavemente. Pode reduzir o impacto no chão e aumentar o trabalho do músculo, acabando por carregar mais o osso.'
};
