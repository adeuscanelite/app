/* =========================================================================
   ADEUS CANELITE: a aplicação.

   Sem servidor, sem base de dados, sem login. O progresso de cada pessoa
   vive no aparelho dela (localStorage). Isso é decisão de arquitectura:
   o produto tem de continuar a funcionar mesmo que tudo o resto caia
   (o "teste do desligamento" da oferta-construir).

   ACESSO POR NÍVEL: quem comprou só o front vê o programa; quem comprou o
   bump vê também o plano de regresso à corrida. O nível vem do CAMINHO da
   pasta, nunca da query string, porque query morre quando a pessoa instala
   o PWA na tela inicial (ver memória liberacao-sobrevive-a-instalacao).
     /app/base/  -> só o programa
     /app/tudo/  -> programa + plano de regresso
   ========================================================================= */

/* ---------- NÍVEL DE ACESSO ---------- */
const NIVEL = (function () {
  const p = location.pathname;
  if (/\/mais\//.test(p)) return 'mais';   /* front + bump + upsell */
  if (/\/tudo\//.test(p)) return 'tudo';   /* front + bump */
  return 'base';                            /* so o front */
})();
/* O nivel 'mais' contem tudo o que o 'tudo' contem. */
const TEM_REGRESSO = (NIVEL === 'tudo' || NIVEL === 'mais');
const TEM_LESOES   = (NIVEL === 'mais');

/* ---------- ESTADO ---------- */
const CHAVE = 'adeus_canelite_v1';

function carrega() {
  let e = null;
  try {
    const g = localStorage.getItem(CHAVE);
    if (g) e = JSON.parse(g);
  } catch (x) {}
  if (!e) e = { inicio: hoje(), feitos: {}, teste: [], faseCorrida: 1 };

  /* MIGRACAO: ate v1 a semana era calculada pelo calendario, entao quem
     parasse um mes voltava a encontrar uma fase que nunca construiu. A
     semana passa a ser dela. Para quem ja tinha progresso, arrancamos na
     semana que o calendario mostrava, limitada ao que ela de facto treinou:
     nao se herda uma fase avancada sem treino nenhum por tras. */
  if (typeof e.semana !== 'number') {
    const porData = Math.min(12, Math.floor(diasDesde(e.inicio) / 7) + 1);
    const diasFeitos = new Set(Object.keys(e.feitos || {}).map(k => k.split('|')[0])).size;
    e.semana = Math.max(1, Math.min(porData, Math.floor(diasFeitos / 3) + 1));
  }
  e.semana = Math.max(1, Math.min(12, e.semana));
  if (typeof e.concluido !== 'boolean') e.concluido = false;
  return e;
}
function guarda() {
  try { localStorage.setItem(CHAVE, JSON.stringify(E)); } catch (e) {}
}
function hoje() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}
function diasDesde(iso) {
  const a = new Date(iso + 'T00:00:00'), b = new Date(hoje() + 'T00:00:00');
  return Math.max(0, Math.round((b - a) / 86400000));
}

let E = carrega();
guarda();  /* fixa a migração, para não voltar a ser recalculada */

/* A semana é da pessoa, não do calendário: ela avança quando a canela
   deixa, que é a regra escrita em cada fase. Ver ecraHoje. */
function semanaAtual() { return Math.max(1, Math.min(12, E.semana)); }

function mudaSemana(delta) {
  const nova = Math.max(1, Math.min(12, E.semana + delta));
  if (nova === E.semana) return;
  E.semana = nova;
  if (nova < 12) E.concluido = false;
  guarda();
  ir('hoje');
}
function concluiPrograma() { E.concluido = true; guarda(); ir('hoje'); }
function vaiParaSemana(n) {
  n = Math.max(1, Math.min(12, n));
  if (n === E.semana && !E.concluido) return;
  E.semana = n; E.concluido = false; guarda(); ir('hoje');
}
function recomeca() {
  if (!confirm('Recomeçar do início? O teu histórico de dias treinados mantém-se.')) return;
  E.semana = 1; E.concluido = false; guarda(); ir('hoje');
}
function faseDaSemana(s) {
  return FASES.find(f => f.semanas.includes(s)) || FASES[FASES.length - 1];
}
/* Os exercícios de hoje: o treino da fase, mais os opcionais. */
function treinoDeHoje() {
  const f = faseDaSemana(semanaAtual());
  return (f.treino || []).concat(f.opcional || []);
}
function chaveDeHoje(id) { return hoje() + '|' + id; }
function estaFeito(id)   { return !!E.feitos[chaveDeHoje(id)]; }
function marca(id) {
  const k = chaveDeHoje(id);
  if (E.feitos[k]) delete E.feitos[k]; else E.feitos[k] = 1;
  guarda();
}
/* "1 dia treinado" e não "1 dias treinados": o plural tem de concordar. */
function diasTxt() {
  const n = diasTreinados();
  return n + (n === 1 ? ' dia treinado' : ' dias treinados');
}
/* Quantos dias distintos com pelo menos um exercício feito. */
function diasTreinados() {
  const dias = new Set(Object.keys(E.feitos).map(k => k.split('|')[0]));
  return dias.size;
}

/* ---------- NAVEGAÇÃO ---------- */
let ECRA = 'hoje', DETALHE = null;

function ir(ecra, detalhe) {
  ECRA = ecra; DETALHE = detalhe || null;
  document.querySelectorAll('.menu button').forEach(b =>
    b.classList.toggle('on', b.dataset.ecra === ecra));
  window.scrollTo(0, 0);
  pinta();
}
document.getElementById('menu').addEventListener('click', ev => {
  const b = ev.target.closest('button');
  if (b) ir(b.dataset.ecra);
});

/* ---------- HELPERS DE HTML ---------- */
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

function topo(marca, titulo, sub, comVoltar) {
  return (comVoltar ? '<button class="voltar" onclick="voltar()">← Voltar</button>' : '') +
    '<div class="marca">' + esc(marca) + '</div>' +
    '<h1>' + esc(titulo) + '</h1>' +
    (sub ? '<div class="sub">' + esc(sub) + '</div>' : '');
}
function voltar() {
  if (ECRA === 'exercicio') return ir('hoje');
  if (ECRA === 'lesao') return ir('saber');
  ir(ECRA);
}

/* ---------- ECRÃ: HOJE ---------- */
function ecraHoje() {
  if (E.concluido) return ecraConcluido();
  const s = semanaAtual(), f = faseDaSemana(s);
  const lista = treinoDeHoje();
  const feitos = lista.filter(estaFeito).length;
  const pct = lista.length ? Math.round(feitos / lista.length * 100) : 0;

  let h = '<div class="hoje">' +
    '<div class="fase">Fase ' + f.n + ' · ' + esc(f.nome) + '</div>' +
    '<h2>Semana ' + s + '</h2>' +
    '<div class="nota">' + esc(f.promessa) + '</div>' +
    '<div class="barra"><i style="width:' + pct + '%"></i></div>' +
    '<div class="barra-txt"><span>' + feitos + ' de ' + lista.length + ' feitos hoje</span><span>' + pct + '%</span></div>' +
    '</div>';

  h += '<div class="semanas">';
  for (let i = 1; i <= 12; i++) {
    const cls = (E.concluido || i < s) ? 'feita' : (i === s && !E.concluido ? 'agora' : '');
    h += '<button class="sem ' + cls + '" onclick="vaiParaSemana(' + i + ')" ' +
         'title="Ir para a semana ' + i + '">' + i + '</button>';
  }
  h += '</div>';

  h += '<div class="cartao"><div class="olho">O treino de hoje</div>' +
       '<p>' + esc(f.dias) + '</p></div>';

  lista.forEach(id => {
    const x = EXERCICIOS[id];
    if (!x) return;
    h += '<button class="ex ' + (estaFeito(id) ? 'ok' : '') + '" onclick="ir(\'exercicio\',\'' + id + '\')">' +
      '<span class="mini"><img src="' + x.img + '" alt="" loading="lazy"></span>' +
      '<span class="txt"><b>' + esc(x.nome) + '</b><span>' + esc(x.dose) + '</span></span>' +
      '<span class="tick">' + (estaFeito(id) ? '✓' : '') + '</span>' +
      '</button>';
  });

  if (f.extra) {
    h += '<div class="aviso laranja" style="margin-top:16px"><b>' + esc(f.extra.titulo) + '</b>' +
         esc(f.extra.texto) + '</div>';
  }
  h += '<div class="aviso amarelo"><b>A regra desta fase</b>' + esc(f.regra) + '</div>';

  /* Passar de semana é decisão dela, e o texto diz porquê. */
  h += '<div class="cartao"><div class="olho">Quando estiveres pronta</div>' +
       '<h2 style="font-size:16px">Semana ' + s + ' de 12</h2>' +
       '<p style="margin-bottom:4px">Só avanças quando aguentares esta semana sem os sintomas ' +
       'aumentarem. Se doeu mais, recua: não se perde nada, ganha-se.</p>';
  if (s < 12) {
    h += '<button class="btn" onclick="mudaSemana(1)">Aguentei a semana. Avançar para a ' + (s+1) + '</button>';
  } else {
    h += '<button class="btn" onclick="concluiPrograma()">Terminei as 12 semanas</button>';
  }
  if (s > 1) h += '<button class="btn sec" onclick="mudaSemana(-1)">Doeu mais. Recuar para a ' + (s-1) + '</button>';
  h += '</div>';

  const sub = 'Semana ' + s + ' · ' + diasTxt();
  return { topo: topo('Adeus Canelite', 'Hoje', sub), corpo: h };
}

/* ---------- ECRÃ: PROGRAMA TERMINADO ---------- */
function ecraConcluido() {
  let h = '<div class="hoje">' +
    '<div class="fase">As 12 semanas</div>' +
    '<h2>Está feito</h2>' +
    '<div class="nota">Treinaste em ' + diasTreinados() + (diasTreinados() === 1 ? ' dia' : ' dias') + '. A canela que tens agora ' +
    'não é a mesma com que começaste.</div>' +
    '<div class="barra"><i style="width:100%"></i></div>' +
    '</div>';

  h += '<div class="semanas">';
  for (let i = 1; i <= 12; i++)
    h += '<button class="sem feita" onclick="vaiParaSemana(' + i + ')">' + i + '</button>';
  h += '</div>';

  h += '<div class="cartao"><div class="olho">E agora</div>' +
       '<h2>Não pares de todo</h2>' +
       '<p>O que construíste perde-se se parares. Duas vezes por semana dos exercícios da fase 2 ' +
       'chega para manter, e é o que separa quem não volta a ter canelite de quem volta daqui a ' +
       'seis meses.</p></div>';

  if (TEM_REGRESSO) {
    h += '<button class="btn" onclick="ir(&quot;correr&quot;)">Ver o plano de regresso à corrida</button>';
  }
  h += '<button class="btn sec" onclick="vaiParaSemana(8)">Voltar à fase 2 para manter</button>';
  h += '<button class="btn sec" onclick="recomeca()">Recomeçar do início</button>';

  return { topo: topo('Adeus Canelite', 'Terminado', diasTxt()), corpo: h };
}

/* ---------- ECRÃ: DETALHE DO EXERCÍCIO ---------- */
function ecraExercicio(id) {
  const x = EXERCICIOS[id];
  if (!x) return ecraHoje();
  const feito = estaFeito(id);

  let h = '<div class="foto-ex"><img src="' + x.img + '" alt="' + esc(x.nome) + '"></div>';
  h += '<div class="dose">' +
    '<div><b>Quantas vezes</b><span>' + esc(x.dose) + '</span></div>' +
    '<div><b>Descanso</b><span>' + esc(x.descanso) + '</span></div>' +
    '<div><b>Precisas de</b><span>' + esc(x.material) + '</span></div>' +
    '<div><b>Onde sentes</b><span>' + esc(x.sentes) + '</span></div>' +
    '</div>';

  h += '<div class="cartao"><div class="olho">Como se faz</div><ol class="passos">';
  x.passos.forEach(p => { h += '<li>' + esc(p) + '</li>'; });
  h += '</ol></div>';

  h += '<div class="aviso vermelho"><b>Erro comum</b>' + esc(x.erro) + '</div>';
  h += '<div class="aviso verde"><b>Porque é que isto conta</b>' + esc(x.porque) + '</div>';

  h += '<button class="btn ' + (feito ? 'feito' : '') + '" onclick="marca(\'' + id + '\');ir(\'exercicio\',\'' + id + '\')">' +
       (feito ? '✓ Feito hoje' : 'Marcar como feito') + '</button>';
  h += '<button class="btn sec" onclick="ir(\'hoje\')">Voltar ao treino</button>';

  return { topo: topo(x.musculo, x.nome, null, true), corpo: h };
}

/* ---------- ECRÃ: PROGRAMA ---------- */
function ecraPrograma() {
  let h = '';
  FASES.forEach(f => {
    const s = semanaAtual();
    const atual = f.semanas.includes(s);
    h += '<div class="cartao" style="' + (atual ? 'border-color:var(--lar);border-width:2px' : '') + '">' +
      '<div class="olho">Fase ' + f.n + ' · semanas ' + f.semanas[0] + ' a ' + f.semanas[f.semanas.length-1] +
      (atual ? ' · estás aqui' : '') + '</div>' +
      '<h2>' + esc(f.nome) + '</h2>' +
      '<p style="margin-bottom:10px">' + esc(f.texto) + '</p>';
    f.treino.forEach(id => {
      const x = EXERCICIOS[id];
      if (x) h += '<div style="font-size:14.5px;padding:5px 0;border-top:1px solid var(--linha)">' +
                  esc(x.nome) + ' <span style="color:var(--cinza)">· ' + esc(x.dose) + '</span></div>';
    });
    h += '</div>';
  });
  return { topo: topo('O plano completo', 'Programa', '12 semanas, três fases'), corpo: h };
}

/* ---------- ECRÃ: VOLTAR A CORRER (o bump) ---------- */
function ecraCorrer() {
  if (!TEM_REGRESSO) {
    let h = '<div class="cartao bloq" style="min-height:330px">' +
      '<div class="veu">' +
        '<div>' +
        '<div class="cad">🔒</div>' +
        '<b>Plano de regresso à corrida</b>' +
        '<p>As seis fases para voltares a correr sem recair, com a regra que diz quando avançar e quando recuar.</p>' +
        '<a href="#" id="link-bump">Quero o plano</a>' +
        '</div>' +
      '</div>' +
      '<div class="olho">Seis fases</div><h2>Voltar a correr</h2>' +
      '<p>Três vezes por semana, com um dia de descanso pelo meio.</p>' +
      '<div style="filter:blur(3px);margin-top:10px">' +
        REGRESSO.fases.slice(0,3).map(f =>
          '<div style="padding:9px 0;border-top:1px solid var(--linha);font-size:14.5px">' +
          '<b>Fase ' + f.n + '</b> · ' + esc(f.total) + ' · ' + esc(f.como) + '</div>').join('') +
      '</div></div>';
    h += '<div class="aviso verde"><b>Já tens o plano?</b>Se compraste e ainda estás a ver isto, ' +
         'abre o link que recebeste por e-mail depois da compra.</div>';
    return { topo: topo('Ainda bloqueado', 'Voltar a correr', null), corpo: h };
  }

  let h = '';
  if (E.corridaFeita) {
    h += '<div class="aviso verde"><b>Fizeste as seis fases</b>' +
         'Estás a correr o que corrias antes, sem dor. Daqui para a frente a regra é a mesma ' +
         'de sempre: subir no máximo um bocado de cada vez, e manter os exercícios duas vezes ' +
         'por semana.</div>';
  }
  h += '<div class="aviso laranja"><b>Antes do primeiro metro</b>' +
    'Andar 30 minutos seguidos sem sentir nada, dois dias sem dor no dia a dia, e dez saltos ' +
    'num pé só sem dor. Se falhares alguma, ainda não é altura.</div>';

  h += '<div class="cartao"><p>' + esc(REGRESSO.intro) + '</p></div>';

  REGRESSO.fases.forEach(f => {
    const atual = E.faseCorrida === f.n;
    h += '<div class="cartao" style="' + (atual ? 'border-color:var(--lar);border-width:2px' : '') + '">' +
      '<div class="olho">Fase ' + f.n + (atual ? ' · estás aqui' : '') + '</div>' +
      '<h2 style="font-size:16px">' + esc(f.total) + ' · ' + esc(f.onde) + '</h2>' +
      '<p>' + esc(f.como) + '</p>' +
      '<p style="margin-top:4px;font-size:14px">' + esc(f.ritmo) + '</p>';
    if (atual) {
      h += f.n < 6
        ? '<button class="btn" onclick="avancaCorrida()">Completei esta fase sem dor</button>'
        : '<button class="btn" onclick="terminaCorrida()">Completei a última fase</button>';
      if (f.n > 1) h += '<button class="btn sec" onclick="recuaCorrida()">Doeu. Recuar uma fase</button>';
    }
    h += '</div>';
  });

  h += '<div class="aviso verde"><b>Depois da fase 6</b>' + esc(REGRESSO.depois) + '</div>';
  h += '<div class="aviso vermelho"><b>Se doer</b>' + esc(REGRESSO.recuar) + '</div>';
  return { topo: topo('O teu plano', 'Voltar a correr', 'Fase ' + E.faseCorrida + ' de 6'), corpo: h };
}
function avancaCorrida() { E.faseCorrida = Math.min(6, E.faseCorrida + 1); guarda(); ir('correr'); }
/* Recuar RECUA mesmo. Antes gravava e repintava sem mexer na fase, e o
   botão não fazia nada, que é o pior tipo de botão. */
function recuaCorrida()  { E.faseCorrida = Math.max(1, E.faseCorrida - 1); guarda(); ir('correr'); }
function terminaCorrida() { E.corridaFeita = true; guarda(); ir('correr'); }

/* ---------- ECRÃ: SABER MAIS ---------- */
function ecraSaber() {
  let h = '';

  /* a régua da dor */
  h += '<div class="cartao"><div class="olho">A régua</div>' +
       '<h2>Avançar ou recuar?</h2>' +
       '<p>A dor manda mais que o calendário. Usa esta tabela sempre que tiveres dúvida.</p>' +
       '<div class="regua">';
  REGUA.forEach(r => {
    h += '<div class="r"><span class="pt ' + r.t + '"></span>' +
         '<span class="txt">' +
           '<span class="q">' + esc(r.q) + '</span>' +
           '<span class="a">' + esc(r.a) + '</span>' +
         '</span></div>';
  });
  h += '</div></div>';

  /* a rotina de antes do treino: promessa do front, entregue a todos */
  h += '<div class="cartao"><div class="olho">Antes de treinar</div>' +
       '<h2>A rotina de cinco minutos</h2>' +
       '<p style="margin-bottom:10px">' + esc(ROTINA.intro) + '</p>';
  ROTINA.passos.forEach(function (x, i) {
    h += '<div style="padding:11px 0;border-top:1px solid var(--linha)">' +
         '<div style="font-weight:700;font-size:15px">' + (i + 1) + '. ' + esc(x.t) + '</div>' +
         '<div style="font-size:14.5px;margin-top:2px">' + esc(x.d) + '</div>' +
         '<div style="font-size:13.5px;color:var(--cinza);margin-top:2px">' + esc(x.porque) + '</div>' +
         '</div>';
  });
  h += '<div class="aviso vermelho" style="margin-top:10px"><b>Atenção</b>' +
       esc(ROTINA.alerta) + '</div>';
  h += '<div class="aviso verde" style="margin-top:10px">' + esc(ROTINA.nota) + '</div></div>';

  /* as outras lesoes: o upsell */
  h += secaoLesoes();

  /* o teste */
  h += '<div class="cartao"><div class="olho">O teste</div><h2>' + esc(TESTE.nome) + '</h2>' +
       '<p style="margin-bottom:10px">' + esc(TESTE.porque) + '</p><ol class="passos">';
  TESTE.passos.forEach(p => { h += '<li>' + esc(p) + '</li>'; });
  h += '</ol><div class="aviso amarelo" style="margin-top:10px"><b>Quando fazer</b>' +
       esc(TESTE.quando) + '. ' + esc(TESTE.nota) + '</div></div>';

  /* cadência */
  h += '<div class="cartao"><div class="olho">Técnica</div><h2>Passos mais curtos e mais rápidos</h2>' +
       '<p style="margin-bottom:10px">' + esc(CADENCIA.texto) + '</p><ol class="passos">';
  CADENCIA.passos.forEach(p => { h += '<li>' + esc(p) + '</li>'; });
  h += '</ol><div class="aviso vermelho" style="margin-top:10px"><b>Cuidado com isto</b>' +
       esc(CADENCIA.aviso) + '</div></div>';

  /* mitos */
  h += '<div class="cartao"><div class="olho">O que se lê por aí</div><h2>Cinco coisas que não resolvem</h2>';
  MITOS.forEach(m => {
    h += '<div style="padding:11px 0;border-top:1px solid var(--linha)">' +
         '<div style="font-weight:700;font-size:15px">' + esc(m.m) + '</div>' +
         '<div style="font-size:14.5px;color:var(--cinza);margin-top:2px">' + esc(m.v) + '</div></div>';
  });
  h += '</div>';

  /* sinais de alarme */
  h += '<div class="cartao" style="border-color:#f3c9c5"><div class="olho" style="color:var(--verm)">Importante</div>' +
       '<h2>Quando é para ver um profissional</h2>' +
       '<p style="margin-bottom:10px">' + esc(ALARME.intro) + '</p>';
  ALARME.sinais.forEach(s => {
    h += '<div style="font-size:14.5px;padding:7px 0 7px 20px;position:relative">' +
         '<span style="position:absolute;left:0;color:var(--verm);font-weight:800">•</span>' + esc(s) + '</div>';
  });
  h += '<div class="aviso vermelho" style="margin-top:10px">' + esc(ALARME.rodape) + '</div></div>';

  h += '<div class="fim">Adeus Canelite · programa de treino<br>' +
       'Isto não substitui avaliação médica.</div>';

  return { topo: topo('O que precisas de saber', 'Saber mais', null), corpo: h };
}

/* ---------- AS OUTRAS LESÕES (o upsell) ----------
   Quem tem o nível 'mais' vê a lista e abre cada uma. Quem não tem vê o
   mesmo cartão com véu, tal como acontece no plano de regresso à corrida. */
function secaoLesoes() {
  if (!TEM_LESOES) {
    var amostra = LESOES.map(function (l) {
      return '<div style="padding:9px 0;border-top:1px solid var(--linha);font-size:14.5px">' +
             '<b>' + esc(l.nome) + '</b> · ' + esc(l.onde) + '</div>';
    }).join('');
    return '<div class="cartao bloq" style="min-height:300px">' +
      '<div class="veu"><div>' +
        '<div class="cad">🔒</div>' +
        '<b>As outras quatro lesões</b>' +
        '<p>Joelho, planta do pé, Aquiles e parte de fora do joelho. O mesmo tipo de programa, ' +
        'para as lesões que aparecem a seguir a esta.</p>' +
        '<a href="#" id="link-upsell">Quero as quatro</a>' +
      '</div></div>' +
      '<div class="olho">Quatro programas</div><h2>As outras lesões de quem corre</h2>' +
      '<p>Cada uma com os exercícios, a dose e a regra de quando avançar.</p>' +
      '<div style="filter:blur(3px);margin-top:10px">' + amostra + '</div></div>';
  }

  var h = '<div class="cartao"><div class="olho">Quatro programas</div>' +
          '<h2>As outras lesões de quem corre</h2>' +
          '<p style="margin-bottom:4px">A canela foi a primeira. Estas são as que aparecem a ' +
          'seguir, e o princípio é o mesmo: força primeiro, carga depois.</p>';
  LESOES.forEach(function (l) {
    h += '<button class="ex" style="margin-top:10px" onclick="ir(&quot;lesao&quot;,&quot;' + l.id + '&quot;)">' +
      '<span class="txt"><b>' + esc(l.nome) + '</b>' +
      '<span>' + esc(l.onde) + ' · ' + l.semanas + ' semanas</span></span>' +
      '<span class="tick" style="border:none;color:var(--cinza);font-size:18px">›</span>' +
      '</button>';
  });
  return h + '</div>';
}

/* A moldura desaparece se o cartao ainda nao existir. Usa a classe .oculto
   em vez de style, para nada lhe voltar a mexer no display. */
function semFoto(img) {
  var m = img.parentNode;
  if (m) m.classList.add('oculto');
}

function ecraLesao(id) {
  var l = null;
  for (var i = 0; i < LESOES.length; i++) if (LESOES[i].id === id) l = LESOES[i];
  if (!l || !TEM_LESOES) return ecraSaber();

  var h = '<div class="cartao"><div class="olho">O que é</div>' +
          '<p>' + esc(l.resumo) + '</p></div>';

  h += '<div class="cartao"><div class="olho">Como se reconhece</div>' +
       '<p>' + esc(l.sinal) + '</p></div>';

  h += '<div class="aviso laranja"><b>De onde vem</b>' + esc(l.causa) + '</div>';

  h += '<div class="cartao"><div class="olho">O programa · ' + l.semanas + ' semanas</div>' +
       '<h2 style="font-size:17px">Os exercícios</h2>';
  l.exercicios.forEach(function (x, i) {
    h += '<div class="ex-lesao">' +
         (x.img ? '<div class="foto-lesao"><img src="' + x.img + '" alt="' + esc(x.t) + '" ' +
                  'loading="lazy" onerror="semFoto(this)"></div>' : '') +
         '<div style="font-weight:700;font-size:15px">' + (i + 1) + '. ' + esc(x.t) + '</div>' +
         '<div style="font-size:14.5px;color:var(--lar);font-weight:600;margin-top:2px">' + esc(x.dose) + '</div>' +
         '<div style="font-size:14.5px;margin-top:4px">' + esc(x.como) + '</div>' +
         '<div style="font-size:13.5px;color:var(--cinza);margin-top:3px">Onde sentes: ' + esc(x.sentes) + '</div>' +
         '</div>';
  });
  h += '</div>';

  h += '<div class="aviso amarelo"><b>A regra</b>' + esc(l.regra) + '</div>';
  h += '<div class="aviso vermelho"><b>Erro comum</b>' + esc(l.erro) + '</div>';
  h += '<div class="aviso verde"><b>A régua da dor é a mesma</b>' +
       'Usa a mesma tabela de avançar ou recuar que usas para a canela. ' +
       'Está no princípio do Saber mais.</div>';
  h += '<button class="btn sec" onclick="ir(&quot;saber&quot;)">Voltar</button>';

  return { topo: topo(l.onde, l.nome, l.semanas + ' semanas', true), corpo: h };
}

/* ---------- PINTAR ---------- */
function pinta() {
  let r;
  if (ECRA === 'exercicio')     r = ecraExercicio(DETALHE);
  else if (ECRA === 'lesao')    r = ecraLesao(DETALHE);
  else if (ECRA === 'programa') r = ecraPrograma();
  else if (ECRA === 'correr')   r = ecraCorrer();
  else if (ECRA === 'saber')    r = ecraSaber();
  else                          r = ecraHoje();

  document.getElementById('topo').innerHTML = r.topo;
  document.getElementById('corpo').innerHTML = r.corpo;
}

pinta();

/* ---------- SERVICE WORKER ----------
   Registado a partir da raiz da pasta actual, para o âmbito bater certo
   com o nível de acesso. Se falhar, a aplicação continua a funcionar:
   o service worker só serve para abrir sem rede. */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const base = location.pathname.replace(/[^/]*$/, '');
    navigator.serviceWorker.register(base + 'sw.js', { scope: base }).catch(() => {});
  });
}
