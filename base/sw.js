/* =========================================================================
   Service worker: serve para a aplicação abrir sem rede.

   Estratégia: cache-first para tudo o que é da própria pasta. O produto é
   estático e pequeno (uns 150 kB com as imagens), então cabe todo em cache
   e a pessoa passa a poder treinar sem net.

   ATENÇÃO ao que NÃO se faz aqui: nada de `ignoreSearch` no match nem de
   fallback que sirva uma página de outra pasta. O nível de acesso vive no
   CAMINHO (/base/ vs /tudo/), e um fallback descuidado devolveria o ecrã
   errado a quem comprou o bump. Ver memória liberacao-sobrevive-a-instalacao.
   ========================================================================= */

const VERSAO = 'adeus-canelite-v7';
const BASE = self.registration.scope;

const ESSENCIAIS = [
  '', 'index.html', 'app.js', 'dados.js', 'manifest.webmanifest',
  'img/ex-elevacao-calcanhar.jpg',
  'img/ex-elevacao-um-pe.jpg',
  'img/ex-ponta-pe-cima.jpg',
  'img/ex-apoio-um-pe.jpg',
  'img/ex-agachamento.jpg',
  'img/ex-elastico-tornozelo.jpg',
  'img/ex-alongamento-parede.jpg',
  'img/ex-caminhar-calcanhares.jpg',
  'img/ex-arco-pe.jpg',
  'img/ex-circulos-tornozelo.jpg',
  /* cartoes do upsell (nivel /mais/). O c.add falha em silencio enquanto
     o ficheiro nao existir, por isso isto pode entrar antes da folha. */
  'img/ex-ponte-um-pe.jpg',
  'img/ex-perna-lado.jpg',
  'img/ex-agachamento-parede.jpg',
  'img/ex-descer-degrau.jpg',
  'img/ex-calcanhar-toalha.jpg',
  'img/ex-rolar-planta.jpg',
  'img/ex-descida-dois-pes.jpg',
  'img/ex-descida-um-pe.jpg',
  'img/ex-descida-joelho-dobrado.jpg',
  'img/ex-abrir-joelho.jpg',
  'img/ex-passos-lado.jpg',
  'img/ex-equilibrio-toque.jpg',
  'img/favicon-32.png',
  'img/favicon-180.png',
  'img/icone-192.png',
  'img/icone-512.png'
].map(f => BASE + f);

self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open(VERSAO)
      /* addAll falha inteiro se UM ficheiro falhar, por isso vai um a um */
      .then(c => Promise.all(ESSENCIAIS.map(u => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', ev => {
  const req = ev.request;
  if (req.method !== 'GET') return;
  /* só tratamos o que é da nossa pasta */
  if (!req.url.startsWith(BASE)) return;

  ev.respondWith(
    caches.match(req).then(resp => {
      if (resp) return resp;
      return fetch(req).then(net => {
        /* guarda o que for nosso e tiver corrido bem */
        if (net && net.status === 200 && net.type === 'basic') {
          const copia = net.clone();
          caches.open(VERSAO).then(c => c.put(req, copia));
        }
        return net;
      }).catch(() => {
        /* sem rede e sem cache: devolve o index DA MESMA PASTA */
        if (req.mode === 'navigate') return caches.match(BASE + 'index.html');
      });
    })
  );
});
