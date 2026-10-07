/* ============================================================
   ÓTICA VANGLAUSS — script.js
   Catálogo, filtros, modais, WhatsApp e provador virtual (MediaPipe)
   ============================================================ */

/* ---------- CONFIGURAÇÃO CENTRAL ---------- */
// Todas as informações de contato/negócio ficam aqui. Para trocar
// telefone, endereço, Instagram etc., edite apenas este objeto.
const CONFIG = {
  empresa: 'Ótica Vanglauss',
  whatsappPhone: '5513999985388', // formato: DDI+DDD+numero, apenas dígitos
  mapsUrl: 'https://www.google.com/maps/search/Av.+Francisco+Glicerio,+189,+Santos',
  instagramUrl: 'https://instagram.com/oticavanglauss',
  instagramHandle: '@oticavanglauss',
  endereco: 'Av. Francisco Glicério, 189 — Santos, SP · 11065-401',
  horario: 'Seg–Sex 09h–18h · Sáb 09h–13h',
  mensagens: {
    geral: 'Olá! Gostaria de saber mais sobre os óculos da Ótica Vanglauss.',
    produto: (nome) => `Olá! Tenho interesse no modelo ${nome}. Gostaria de saber mais informações.`
  }
};

/* ---------- CATÁLOGO DE PRODUTOS ---------- */
const modelosCatalogo = [
  [1, 'BG7618', 'Solar BG7618', 'VG', 'solar', 'unissex', 'Tamanho 50; armação de metal; lentes cinza.'],
  [2, 'H00135', 'Solar H00135', 'VG', 'solar', 'unissex', 'Tamanho 56; armação de metal; lentes cinza polarizadas.'],
  [3, 'SDM2018', 'Solar SDM2018', 'OXFOUR LUX', 'solar', 'masculino', 'Tamanho 60; armação de metal; lentes azuis polarizadas.'],
  [4, 'LQ-2002', 'Solar LQ 2002', 'VG', 'solar', 'masculino', 'Tamanho único; armação TR90; lentes cinza.'],
  [5, 'JC-84026', 'Solar JC 84026', 'VG', 'solar', 'masculino', 'Tamanho 56; modelo esportivo; lentes cinza polarizadas.'],
  [6, 'JC-1201', 'Clip-on JC 1201', 'VG', 'grau', 'masculino', 'Tamanho 54; armação TR90; clip-on com lentes cinza polarizadas.'],
  [7, 'OM2511', 'Clip-on OM2511', 'VG', 'grau', 'masculino', 'Tamanho 56; armação de alumínio; clip-on com lentes cinza polarizadas.'],
  [8, 'HG59008', 'Nylon HG59008', 'VG', 'grau', 'masculino', 'Tamanho 55; armação de alumínio na cor azul.'],
  [9, 'ZY5902', 'Metal Nylon ZY5902', 'VG', 'grau', 'masculino', 'Tamanho 55; armação preta.'],
  [10, 'HR-MM-1007', 'Metal fechado HR-MM-1007', 'OXFOUR LUX', 'grau', 'masculino', 'Tamanho 59; armação na cor grafite.'],
  [11, 'HG59012', 'Alumínio fechado HG59012', 'VG', 'grau', 'masculino', 'Tamanho 56; armação de alumínio na cor azul.'],
  [12, '91226', 'Alumínio fechado 91226', 'VG', 'grau', 'masculino', 'Tamanho 60; armação de alumínio cinza fosco.'],
  [13, '59213', 'Metal fechado 59213', 'VG', 'grau', 'masculino', 'Tamanho 52; armação verde; hastes de alumínio.'],
  [14, 'SL1795', 'Balgrif SL1795', 'Balgrif', 'grau', 'unissex', 'Tamanho 53; armação bronze; hastes de alumínio.'],
  [15, 'ISA163', 'Metal Nylon ISA163', 'VG', 'grau', 'masculino', 'Tamanho 58; armação preta.'],
  [16, '5845', 'Metal Nylon 5845', 'VG', 'grau', 'masculino', 'Tamanho 47; armação prata; hastes de alumínio.'],
  [17, 'J31086', 'Metal fechado J31086', 'VG', 'grau', 'masculino', 'Tamanho 57; armação cinza fosco.'],
  [18, 'HL-8002', 'Metal fechado HL 8002', 'VG', 'grau', 'masculino', 'Tamanho 59; armação cinza.'],
  [19, 'ULF-7713', 'Acetato fechado ULF 7713', 'VG', 'grau', 'masculino', 'Tamanho 54; armação azul.'],
  [20, 'ISA-3260', 'Acetato fechado ISA 3260', 'VG', 'grau', 'masculino', 'Tamanho 54; armação azul.'],
  [21, 'BW9003', 'TR90 BW9003', 'VG', 'grau', 'unissex', 'Tamanho 52; armação cinza.'],
  [22, 'T91220', 'Acetato fechado T91220', 'VG', 'grau', 'masculino', 'Tamanho 56; armação preta.'],
  [23, 'BR-77109', 'Acetato fechado BR 77109', 'VG', 'grau', 'masculino', 'Tamanho 54; armação cinza.'],
  [24, 'LH-1013', 'Acetato fechado LH 1013', 'VG', 'grau', 'masculino', 'Tamanho 52; armação azul.'],
  [25, 'SDA-3018', 'Solar SDA 3018', 'Kazualy Lux', 'solar', 'feminino', 'Tamanho 55; armação de acetato tartaruga; lentes cinza degradê polarizadas.'],
  [26, 'ZS-1162', 'Solar ZS 1162', 'VG', 'solar', 'feminino', 'Tamanho único; armação de acetato verde; lentes cinza.'],
  [27, 'XW-79', 'Solar XW 79', 'VG', 'solar', 'feminino', 'Tamanho 54; armação de acetato tartaruga; lentes na cor doce.'],
  [28, 'OM-50412', 'Solar OM 50412', 'VG', 'solar', 'feminino', 'Tamanho 49; armação de acetato tartaruga; lentes marrom degradê.'],
  [29, 'YY-6131', 'Clip-on YY 6131', 'VG', 'grau', 'feminino', 'Tamanho 53; armação de acetato bordô; clip-on com lentes cinza.'],
  [30, 'LQC0347', 'Clip-on LQC0347', 'VG', 'grau', 'feminino', 'Tamanho 53; armação de acetato marrom; clip-on com lentes marrons.'],
  [31, 'ISA61019', 'Metal ISA61019', 'VG', 'grau', 'feminino', 'Tamanho 51; armação rosa claro.'],
  [32, 'R-20573', 'Metal Nylon R 20573', 'VG', 'grau', 'feminino', 'Tamanho 55; armação dourada.'],
  [33, 'ISA-17027', 'Metal ISA 17027', 'VG', 'grau', 'feminino', 'Tamanho 53; armação preta.'],
  [34, 'BR-22353', 'Metal BR 22353', 'VG', 'grau', 'feminino', 'Tamanho 52; armação dourada.'],
  [35, 'HL-5004', 'Balgrif HL 5004', 'Balgrif', 'grau', 'feminino', 'Tamanho 52; armação dourada.'],
  [36, '5096', 'Metal 5096', 'VG', 'grau', 'feminino', 'Tamanho 52; armação preta.'],
  [37, 'BX96045', 'Metal BX96045', 'VG', 'grau', 'feminino', 'Tamanho 52; armação dourada de titânio.'],
  [38, 'BW-9062', 'Acetato BW 9062', 'VG', 'grau', 'feminino', 'Tamanho 48; armação na cor uva.'],
  [39, 'LG1025', 'Acetato LG1025', 'VG', 'grau', 'feminino', 'Tamanho 52; armação marrom.'],
  [40, 'BR-98363', 'Acetato BR 98363', 'VG', 'grau', 'feminino', 'Tamanho 51; armação tartaruga.'],
  [41, 'ISA-3210', 'Acetato ISA 3210', 'VG', 'grau', 'feminino', 'Tamanho 53; armação cinza e azul.'],
  [42, 'YY-4411', 'Acetato YY 4411', 'VG', 'grau', 'feminino', 'Tamanho 52; armação azul claro.'],
  [43, 'HF-3317', 'Acetato HF 3317', 'VG', 'grau', 'feminino', 'Tamanho 55; armação tartaruga.'],
  [44, 'HR-Z-805', 'Acetato HR Z 805', 'Kazualy Lux', 'grau', 'feminino', 'Tamanho 47; armação cinza.'],
  [45, 'BW-9004', 'Acetato BW 9004', 'VG', 'grau', 'feminino', 'Tamanho 51; armação bordô.'],
  [46, 'HR-2910', 'Acetato HR-2910', 'Kazualy Lux', 'grau', 'feminino', 'Tamanho 55; armação nude.'],
  [47, 'HR-Z-658', 'Acetato HR-Z 658', 'Kazualy Lux', 'grau', 'feminino', 'Tamanho 52.'],
  [48, 'LG-1017', 'Acetato LG 1017', 'VG', 'grau', 'feminino', 'Tamanho 54; armação tartaruga.'],
  [49, 'HR-Z870', 'Acetato HR Z870', 'Kazualy Lux', 'grau', 'feminino', 'Tamanho 52; armação preta.'],
  [50, '68675', 'Acetato 68675', 'VG', 'grau', 'feminino', 'Tamanho 49; armação caramelo.']
];

const quantidadeFotosExtra = { 6: 4, 7: 4, 29: 4, 30: 4 };
const produtos = modelosCatalogo.map(([id, codigo, nome, marca, categoria, genero, descricao]) => {
  const marcaArquivo = marca.toUpperCase().replace(/\s+/g, '-');
  const quantidadeFotos = quantidadeFotosExtra[id] || 3;
  const imagens = Array.from({ length: quantidadeFotos }, (_, indice) =>
    `img/oculos-webp/${String(id).padStart(2, '0')}-${marcaArquivo}-${codigo}-${indice + 1}.webp`
  );
  return { id, nome, marca, categoria, genero, preco: null, imagem: imagens[0], imagens, descricao };
});

const marcasDestaque = ['VG', 'OXFOUR LUX', 'Kazualy Lux', 'Balgrif'];

/* ---------- ESTADO ---------- */
const state = {
  search: '',
  categoria: 'all',
  genero: 'all',
  marca: 'all',
  ordenar: 'relevancia',
  visibleCount: 8,
  carouselTimer: null
};

let currentProduct = null;
let currentGalleryIndex = 0;
let lastFocusedElement = null;

/* ---------- ELEMENTOS ---------- */
const el = {};

function cacheElements() {
  el.produtos = document.getElementById('produtos');
  el.resultsCount = document.getElementById('results-count');
  el.emptyState = document.getElementById('empty-state');
  el.search = document.getElementById('product-search');
  el.categoryFilter = document.getElementById('category-filter');
  el.genderFilter = document.getElementById('gender-filter');
  el.brandFilter = document.getElementById('brand-filter');
  el.sortFilter = document.getElementById('sort-filter');
  el.clearFilters = document.getElementById('clear-filters');
  el.showMore = document.getElementById('show-more-products');
  el.toastContainer = document.getElementById('toast-container');
  el.navToggle = document.getElementById('nav-toggle');
  el.navMenu = document.getElementById('navbar-menu');
  el.brandsRow = document.getElementById('marcas-row');
}

/* ---------- UTIL ---------- */
function formatPrice(value) {
  if (value == null) return 'Consulte valores';
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function categoriaLabel(cat) {
  return cat === 'solar' ? 'Óculos de Sol' : 'Óculos de Grau';
}

function showToast(message, type = 'success') {
  if (!el.toastContainer) return;
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', 'status');
  toast.textContent = message;
  el.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast--out');
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

function whatsappLink(message) {
  return `https://wa.me/${CONFIG.whatsappPhone}?text=${encodeURIComponent(message)}`;
}

/* ---------- MODAIS (genérico, acessível) ---------- */
function openModal(modalId, triggerEl = null) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  lastFocusedElement = triggerEl || document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn?.focus();
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  if (modalId === 'tryon-modal') stopTryOn();
  lastFocusedElement?.focus?.();
}

function setupModalClosers() {
  document.querySelectorAll('.modal').forEach((modal) => {
    modal.querySelector('.modal-close')?.addEventListener('click', () => closeModal(modal.id));
    modal.querySelector('.modal-overlay')?.addEventListener('click', () => closeModal(modal.id));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const openModalEl = document.querySelector('.modal.open');
    if (openModalEl) closeModal(openModalEl.id);
  });
}

/* ---------- NAV MOBILE ---------- */
function setupMobileNav() {
  if (!el.navToggle || !el.navMenu) return;
  el.navToggle.addEventListener('click', () => {
    const isOpen = el.navMenu.classList.toggle('is-open');
    el.navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('no-scroll', isOpen);
  });
  el.navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      el.navMenu.classList.remove('is-open');
      el.navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    });
  });
}

/* ---------- MARCAS ---------- */
function renderBrandsStrip() {
  if (!el.brandsRow) return;
  el.brandsRow.innerHTML = marcasDestaque
    .map((marca) => `<span class="brand-chip">${marca}</span>`)
    .join('');
}

/* ---------- FILTROS / CATÁLOGO ---------- */
function getFilteredProducts() {
  const termo = state.search.trim().toLowerCase();
  let lista = produtos.filter((p) => {
    const nomeMatch = !termo || p.nome.toLowerCase().includes(termo) || p.marca.toLowerCase().includes(termo) || p.descricao.toLowerCase().includes(termo);
    const categoriaMatch = state.categoria === 'all' || p.categoria === state.categoria;
    const generoMatch = state.genero === 'all' || p.genero === state.genero;
    const marcaMatch = state.marca === 'all' || p.marca.toLowerCase().replace(/\s+/g, '-') === state.marca;
    return nomeMatch && categoriaMatch && generoMatch && marcaMatch;
  });

  switch (state.ordenar) {
    case 'preco-asc': lista = lista.sort((a, b) => a.preco - b.preco); break;
    case 'preco-desc': lista = lista.sort((a, b) => b.preco - a.preco); break;
    case 'nome': lista = lista.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')); break;
    default: break;
  }
  return lista;
}

function hasActiveFilters() {
  return state.search || state.categoria !== 'all' || state.genero !== 'all' || state.marca !== 'all';
}

function productCardTemplate(produto) {
  const imgSrc = produto.imagem || '';
  return `
    <article class="product-card" data-id="${produto.id}">
      <div class="product-image-wrapper">
        <img
          src="${imgSrc}"
          alt="${produto.nome} — ${produto.marca}"
          class="product-image"
          loading="lazy"
          decoding="async"
          onerror="this.closest('.product-image-wrapper').classList.add('img-error'); this.style.display='none';"
        />
        <button type="button" class="product-image-next" data-action="next-image" aria-label="Próxima foto de ${produto.nome}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </button>
        <div class="product-image-fallback" aria-hidden="true">Imagem indisponível</div>
      </div>
      <div class="product-content">
        <span class="product-brand">${produto.marca}</span>
        <h3 class="product-name">${produto.nome}</h3>
        <p class="product-category">${categoriaLabel(produto.categoria)}</p>
        <div class="product-price">${formatPrice(produto.preco)}</div>
        <div class="product-actions">
          <button type="button" class="btn-view" data-action="detail" aria-label="Ver detalhes de ${produto.nome}">Ver detalhes</button>
          <button type="button" class="btn-try-on" data-action="tryon" aria-label="Experimentar ${produto.nome} virtualmente">Experimentar</button>
        </div>
      </div>
    </article>`;
}

function renderProducts(resetVisibleCount = true) {
  if (!el.produtos) return;
  if (resetVisibleCount) state.visibleCount = 8;
  const lista = getFilteredProducts();

  if (el.resultsCount) {
    el.resultsCount.textContent = `Mostrando ${Math.min(state.visibleCount, lista.length)} de ${lista.length} modelos`;
  }
  if (el.clearFilters) {
    el.clearFilters.hidden = !hasActiveFilters();
  }

  if (!lista.length) {
    el.produtos.innerHTML = '';
    if (el.showMore) el.showMore.hidden = true;
    if (state.carouselTimer) window.clearInterval(state.carouselTimer);
    if (el.emptyState) el.emptyState.hidden = false;
    return;
  }
  if (el.emptyState) el.emptyState.hidden = true;

  const produtosVisiveis = lista.slice(0, state.visibleCount);
  el.produtos.innerHTML = produtosVisiveis.map(productCardTemplate).join('');
  if (el.showMore) el.showMore.hidden = lista.length <= state.visibleCount;

  if (state.carouselTimer) window.clearInterval(state.carouselTimer);

  el.produtos.querySelectorAll('.product-card').forEach((card) => {
    const id = Number(card.dataset.id);
    const produto = produtos.find((item) => item.id === id);
    const image = card.querySelector('.product-image');
    let imageIndex = 0;
    const showNextImage = () => {
      if (!produto?.imagens?.length) return;
      imageIndex = (imageIndex + 1) % produto.imagens.length;
      image.src = produto.imagens[imageIndex];
      image.alt = `${produto.nome} — ${produto.marca}, foto ${imageIndex + 1}`;
    };
    card.querySelector('[data-action="next-image"]')?.addEventListener('click', showNextImage);
    card.querySelector('[data-action="detail"]').addEventListener('click', () => showProductDetail(id, card));
    card.querySelector('[data-action="tryon"]').addEventListener('click', () => openTryOn(id, card));
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    state.carouselTimer = window.setInterval(() => {
      el.produtos.querySelectorAll('.product-card').forEach((card) => {
        const bounds = card.getBoundingClientRect();
        const isVisible = bounds.bottom > 0 && bounds.top < window.innerHeight;
        if (!isVisible || !card.matches(':hover')) return;
        card.querySelector('[data-action="next-image"]')?.click();
      });
    }, 5000);
  }
}

function clearAllFilters() {
  state.search = '';
  state.categoria = 'all';
  state.genero = 'all';
  state.marca = 'all';
  state.ordenar = 'relevancia';
  if (el.search) el.search.value = '';
  if (el.categoryFilter) el.categoryFilter.value = 'all';
  if (el.genderFilter) el.genderFilter.value = 'all';
  if (el.brandFilter) el.brandFilter.value = 'all';
  if (el.sortFilter) el.sortFilter.value = 'relevancia';
  renderProducts();
}

function setupFilters() {
  el.search?.addEventListener('input', (e) => { state.search = e.target.value; renderProducts(); });
  el.categoryFilter?.addEventListener('change', (e) => { state.categoria = e.target.value; renderProducts(); });
  el.genderFilter?.addEventListener('change', (e) => { state.genero = e.target.value; renderProducts(); });
  el.brandFilter?.addEventListener('change', (e) => { state.marca = e.target.value; renderProducts(); });
  el.sortFilter?.addEventListener('change', (e) => { state.ordenar = e.target.value; renderProducts(); });
  el.clearFilters?.addEventListener('click', clearAllFilters);
  el.showMore?.addEventListener('click', () => {
    state.visibleCount += 8;
    renderProducts(false);
  });
}

/* ---------- DETALHE DO PRODUTO ---------- */
function showProductDetail(productId, triggerEl) {
  currentProduct = produtos.find((p) => p.id === productId);
  if (!currentProduct) return;
  currentGalleryIndex = 0;

  document.getElementById('detail-name').textContent = currentProduct.nome;
  document.getElementById('detail-brand').textContent = currentProduct.marca;
  document.getElementById('detail-category').textContent = categoriaLabel(currentProduct.categoria);
  document.getElementById('detail-gender').textContent = capitalize(currentProduct.genero);
  document.getElementById('detail-description').textContent = currentProduct.descricao;
  document.getElementById('detail-price').textContent = formatPrice(currentProduct.preco);

  renderGallery();
  openModal('product-modal', triggerEl);
}

function capitalize(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
}

function renderGallery() {
  const imagens = currentProduct.imagens?.length ? currentProduct.imagens : [currentProduct.imagem];
  const img = document.getElementById('detail-image');
  img.src = imagens[currentGalleryIndex] || imagens[0];
  img.alt = `${currentProduct.nome} — foto ${currentGalleryIndex + 1} de ${imagens.length}`;

  const nav = document.getElementById('gallery-nav');
  if (!nav) return;
  if (imagens.length <= 1) {
    nav.hidden = true;
    return;
  }
  nav.hidden = false;
  nav.innerHTML = imagens.map((_, i) =>
    `<button type="button" class="gallery-dot ${i === currentGalleryIndex ? 'is-active' : ''}" data-index="${i}" aria-label="Ver foto ${i + 1}"></button>`
  ).join('');
  nav.querySelectorAll('.gallery-dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      currentGalleryIndex = Number(dot.dataset.index);
      renderGallery();
    });
  });
}

/* ---------- WHATSAPP ---------- */
function openWhatsAppGeral() {
  window.open(whatsappLink(CONFIG.mensagens.geral), '_blank', 'noopener');
}

function contactViaWhatsApp() {
  const message = currentProduct
    ? CONFIG.mensagens.produto(currentProduct.nome)
    : CONFIG.mensagens.geral;
  window.open(whatsappLink(message), '_blank', 'noopener');
}

function openMaps() {
  window.open(CONFIG.mapsUrl, '_blank', 'noopener');
}

/* ============================================================
   PROVADOR VIRTUAL
   ============================================================ */
const tryOn = {
  stream: null,
  faceLandmarker: null,
  landmarkerLoading: null,
  rafId: null,
  overlays: {},          // { esquerda, frontal, direita } -> canvas com transparência
  overlaysLoading: false,
  smoothed: null,        // último estado suavizado {x,y,w,h,rot,angleKey}
  angleHistory: [],      // pequeno histórico p/ evitar flicker de ângulo
  active: false,         // provador aberto e câmera deve rodar
  video: null,
  canvas: null,
  ctx: null,
  threeCanvas: null,
  threeRenderer: null,
  threeScene: null,
  threeCamera: null,
  glassesModel: null,
  threeLoading: null,
  modelReady: false
};

function tryOnEls() {
  return {
    video: document.getElementById('camera-feed'),
    canvas: document.getElementById('face-canvas'),
    threeCanvas: document.getElementById('glasses-canvas'),
    status: document.getElementById('tryon-status'),
    permissionPanel: document.getElementById('tryon-permission'),
    retryBtn: document.getElementById('tryon-retry'),
    captureBtn: document.getElementById('tryon-capture'),
    stage: document.getElementById('tryon-stage')
  };
}

function setTryOnStatus(message, kind = 'info') {
  const { status } = tryOnEls();
  if (!status) return;
  status.textContent = message;
  status.dataset.kind = kind;
}

function openTryOn(productId, triggerEl = null) {
  currentProduct = produtos.find((p) => p.id === productId);
  if (!currentProduct) return;
  closeModal('product-modal');
  document.getElementById('tryon-product-name').textContent = currentProduct.nome;
  openModal('tryon-modal', triggerEl);
  startTryOn();
}

async function startTryOn() {
  const { video, canvas, threeCanvas, permissionPanel } = tryOnEls();
  if (tryOn.stream) stopTryOn();
  if (permissionPanel) permissionPanel.hidden = true;
  tryOn.video = video;
  tryOn.canvas = canvas;
  tryOn.threeCanvas = threeCanvas;
  tryOn.ctx = canvas.getContext('2d');
  tryOn.active = true;
  if (permissionPanel) permissionPanel.hidden = true;

  if (!window.isSecureContext) {
    setTryOnStatus('O provador virtual exige uma conexão segura (HTTPS). Acesse o site via HTTPS para usar a câmera.', 'error');
    showPermissionPanel('O acesso à câmera só funciona em conexões seguras (HTTPS).');
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    setTryOnStatus('Seu navegador não tem suporte à câmera.', 'error');
    showPermissionPanel('Seu navegador não permite acesso à câmera. Tente outro navegador atualizado.');
    return;
  }

  loadOverlaysForCurrentProduct();
  setTryOnStatus('Solicitando acesso à câmera…', 'loading');

  try {
    tryOn.stream = await requestCameraStream();
    if (permissionPanel) permissionPanel.hidden = true;
    video.srcObject = tryOn.stream;
    await video.play().catch(() => {});
    setTryOnStatus('Carregando o reconhecimento facial…', 'loading');
    // O GLB é carregado em paralelo; o PNG continua disponível enquanto isso.
    ensureThreeModel();
    await ensureFaceLandmarker();
    if (!tryOn.active) return; // usuário fechou durante o carregamento
    setTryOnStatus('Posicione seu rosto dentro da área indicada.', 'info');
    runTrackingLoop();
  } catch (error) {
    console.error('Erro ao acessar a câmera:', error);
    if (error?.name === 'NotAllowedError' || error?.name === 'PermissionDeniedError') {
      showPermissionPanel('Para usar o provador virtual, permita o acesso à câmera nas configurações do navegador.');
    } else if (error?.name === 'NotFoundError') {
      showPermissionPanel('Nenhuma câmera foi encontrada neste dispositivo.');
    } else if (error?.name === 'NotReadableError' || error?.name === 'TrackStartError') {
      showPermissionPanel('A câmera está sendo usada por outro aplicativo. Feche Zoom, Meet ou outro provador e tente novamente.');
    } else if (error?.name === 'OverconstrainedError') {
      showPermissionPanel('A câmera não suporta a configuração solicitada. Tente novamente usando outra câmera.');
    } else if (error?.name === 'SecurityError') {
      showPermissionPanel('O navegador bloqueou a câmera. Abra o site em HTTPS ou em http://localhost.');
    } else {
      showPermissionPanel(`Não foi possível acessar a câmera${error?.name ? ` (${error.name})` : ''}. Verifique a permissão e tente novamente.`);
    }
    setTryOnStatus('Não foi possível acessar a câmera. Verifique a mensagem abaixo.', 'error');
  }
}

async function requestCameraStream() {
  try {
    return await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 720 } },
      audio: false
    });
  } catch (error) {
    // Alguns dispositivos rejeitam constraints opcionais mesmo tendo câmera.
    if (error?.name !== 'OverconstrainedError') throw error;
    return navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  }
}

function showPermissionPanel(message) {
  const { permissionPanel } = tryOnEls();
  if (!permissionPanel) return;
  permissionPanel.hidden = false;
  const text = permissionPanel.querySelector('.tryon-permission-text');
  if (text) text.textContent = message;
}

function stopTryOn() {
  tryOn.active = false;
  tryOn.stream?.getTracks().forEach((track) => track.stop());
  tryOn.stream = null;
  if (tryOn.video) tryOn.video.srcObject = null;
  if (tryOn.rafId) cancelAnimationFrame(tryOn.rafId);
  tryOn.rafId = null;
  tryOn.smoothed = null;
  tryOn.angleHistory = [];
  if (tryOn.ctx && tryOn.canvas) tryOn.ctx.clearRect(0, 0, tryOn.canvas.width, tryOn.canvas.height);
  tryOn.threeRenderer?.clear();
}

async function ensureThreeModel() {
  if (!currentProduct?.modelo3D) return false;
  if (tryOn.modelReady) return true;
  if (tryOn.threeLoading) return tryOn.threeLoading;

  tryOn.threeLoading = (async () => {
    const three = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
    const { GLTFLoader } = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js');
    const { threeCanvas } = tryOnEls();
    if (!threeCanvas) return false;

    tryOn.threeRenderer = new three.WebGLRenderer({ canvas: threeCanvas, alpha: true, antialias: true });
    tryOn.threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    tryOn.threeRenderer.setClearColor(0x000000, 0);
    tryOn.threeScene = new three.Scene();
    tryOn.threeScene.add(new three.HemisphereLight(0xffffff, 0x555555, 2.2));
    const keyLight = new three.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(0, 1, 3);
    tryOn.threeScene.add(keyLight);
    tryOn.threeCamera = new three.OrthographicCamera(-1, 1, 1, -1, -1000, 1000);

    const gltf = await new Promise((resolve, reject) => {
      new GLTFLoader().load(currentProduct.modelo3D, resolve, undefined, reject);
    });
    const model = gltf.scene;
    const bounds = new three.Box3().setFromObject(model);
    const size = bounds.getSize(new three.Vector3());
    const center = bounds.getCenter(new three.Vector3());
    model.position.sub(center);
    model.rotation.x = 0;
    model.rotation.y = 0;
    model.rotation.order = 'YXZ';
    model.visible = false;
    model.userData.baseWidth = Math.max(size.x, size.z, 0.001);
    tryOn.glassesModel = model;
    tryOn.threeScene.add(model);
    tryOn.modelReady = true;
    resizeThreeCanvas();
    return true;
  })().catch((error) => {
    console.warn('Modelo 3D indisponível; usando imagem de fallback.', error);
    return false;
  });

  return tryOn.threeLoading;
}

function resizeThreeCanvas() {
  if (!tryOn.threeRenderer || !tryOn.threeCamera || !tryOn.video) return;
  const width = tryOn.video.videoWidth || 720;
  const height = tryOn.video.videoHeight || 720;
  tryOn.threeRenderer.setSize(width, height, false);
  tryOn.threeCamera.left = -width / 2;
  tryOn.threeCamera.right = width / 2;
  tryOn.threeCamera.top = height / 2;
  tryOn.threeCamera.bottom = -height / 2;
  tryOn.threeCamera.updateProjectionMatrix();
}

async function ensureFaceLandmarker() {
  if (tryOn.faceLandmarker) return tryOn.faceLandmarker;
  if (tryOn.landmarkerLoading) return tryOn.landmarkerLoading;

  tryOn.landmarkerLoading = (async () => {
    try {
      const vision = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs');
      const filesetResolver = await vision.FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
      );
      const baseOptions = {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
        delegate: 'GPU'
      };
      try {
        tryOn.faceLandmarker = await vision.FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions, runningMode: 'VIDEO', numFaces: 1
        });
      } catch {
        tryOn.faceLandmarker = await vision.FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: { ...baseOptions, delegate: 'CPU' }, runningMode: 'VIDEO', numFaces: 1
        });
      }
      return tryOn.faceLandmarker;
    } catch (error) {
      console.error('Falha ao carregar o reconhecimento facial:', error);
      setTryOnStatus('O reconhecimento facial não pôde ser carregado. Você ainda pode ver a câmera.', 'error');
      return null;
    }
  })();

  return tryOn.landmarkerLoading;
}

/* ---- Overlays (imagens dos óculos com transparência) ---- */
function loadOverlaysForCurrentProduct() {
  tryOn.overlays = {};
  if (!currentProduct) return;

  const angulos = currentProduct.provadorAngulos;
  if (angulos) {
    Object.entries(angulos).forEach(([chave, src]) => loadOverlayImage(src, chave));
  } else if (currentProduct.imagens?.length > 1) {
    // Sem marcação explícita de ângulo: usa a primeira imagem como frontal.
    loadOverlayImage(currentProduct.imagens[0], 'frontal');
  } else {
    loadOverlayImage(currentProduct.imagemProvador || currentProduct.imagem, 'frontal');
  }
}

function loadOverlayImage(path, chave) {
  if (!path) return;
  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    // Se o PNG já possui canal alfa real (bordas transparentes), não mexemos
    // nos pixels — é a forma correta e segura de recortar os óculos.
    // Só aplicamos uma remoção conservadora de fundo branco quando o asset
    // claramente não tem transparência (todos os cantos opacos e muito claros).
    if (!hasRealAlpha(ctx, canvas.width, canvas.height)) {
      stripNearWhiteBackgroundSafely(ctx, canvas.width, canvas.height);
    }
    tryOn.overlays[chave] = canvas;
  };
  image.onerror = () => {
    console.warn(`Não foi possível carregar o asset do provador: ${path}`);
  };
  image.src = path;
}

function hasRealAlpha(ctx, w, h) {
  // Amostra os 4 cantos: se algum já for transparente, o PNG tem alfa real.
  const corners = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]];
  return corners.some(([x, y]) => {
    const [, , , a] = ctx.getImageData(x, y, 1, 1).data;
    return a < 250;
  });
}

function stripNearWhiteBackgroundSafely(ctx, w, h) {
  // Remoção conservadora: só torna transparente um pixel muito próximo do
  // branco (>250 em todos os canais) E com baixíssima diferença entre canais
  // (fundo neutro), reduzindo o risco de apagar partes brancas da própria
  // armação. Assets sem transparência real ainda são a exceção — o ideal é
  // sempre usar PNG com alfa.
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    if (r > 250 && g > 250 && b > 250 && (max - min) < 4) {
      data[i + 3] = 0;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

/* ---- Loop de rastreamento ---- */
function runTrackingLoop() {
  const loop = () => {
    if (!tryOn.active || !tryOn.stream) return;
    const { video, canvas, ctx } = tryOn;
    if (video.videoWidth && tryOn.faceLandmarker) {
      if (canvas.width !== video.videoWidth) canvas.width = video.videoWidth;
      if (canvas.height !== video.videoHeight) canvas.height = video.videoHeight;
      resizeThreeCanvas();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const result = tryOn.faceLandmarker.detectForVideo(video, performance.now());
      const landmarks = result.faceLandmarks?.[0];

      if (landmarks) {
        setTryOnStatus('Rosto detectado — mova a cabeça devagar para ver de outros ângulos.', 'success');
        drawGlasses(ctx, landmarks, canvas.width, canvas.height);
      } else {
        setTryOnStatus('Não foi possível detectar seu rosto. Ajuste a iluminação e centralize o rosto.', 'warn');
      }
    }
    tryOn.rafId = requestAnimationFrame(loop);
  };
  loop();
}

function pickAngleKey(faceTurn) {
  // faceTurn > 0 => rosto virado para a própria esquerda dele (direita na tela)
  const THRESHOLD = 0.05;
  let raw = 'frontal';
  if (faceTurn > THRESHOLD) raw = 'direita';
  else if (faceTurn < -THRESHOLD) raw = 'esquerda';

  // Pequeno histórico para evitar troca de ângulo a cada frame (flicker).
  tryOn.angleHistory.push(raw);
  if (tryOn.angleHistory.length > 6) tryOn.angleHistory.shift();
  const counts = tryOn.angleHistory.reduce((acc, key) => (acc[key] = (acc[key] || 0) + 1, acc), {});
  const stable = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];

  if (tryOn.overlays[stable]) return stable;
  if (tryOn.overlays.frontal) return 'frontal';
  return Object.keys(tryOn.overlays)[0];
}

function drawGlasses(ctx, landmarks, width, height) {
  const leftEye = landmarks[33];
  const rightEye = landmarks[263];
  const noseBridge = landmarks[168] || landmarks[6];
  const noseTip = landmarks[1] || noseBridge;
  const leftCheek = landmarks[234];
  const rightCheek = landmarks[454];
  if (!leftEye || !rightEye || !noseBridge || !noseTip) return;

  const eyeDistance = Math.hypot((rightEye.x - leftEye.x) * width, (rightEye.y - leftEye.y) * height);
  const centerX = ((leftEye.x + rightEye.x) / 2) * width;
  const centerY = noseBridge.y * height - eyeDistance * 0.08;
  const targetWidth = eyeDistance * 2.18;
  const rotation = Math.atan2((rightEye.y - leftEye.y) * height, (rightEye.x - leftEye.x) * width);
  const eyeCenterX = (leftEye.x + rightEye.x) / 2;
  const eyeCenterY = (leftEye.y + rightEye.y) / 2;
  const faceWidth = leftCheek && rightCheek
    ? Math.abs(rightCheek.x - leftCheek.x)
    : Math.abs(rightEye.x - leftEye.x) * 2.2;
  const faceTurn = (noseTip.x - eyeCenterX) / Math.max(faceWidth, 0.001);
  const facePitch = noseBridge.y - eyeCenterY;
  const angleKey = pickAngleKey(faceTurn);
  const overlay = tryOn.overlays[angleKey];
  if (!overlay) return;

  const targetHeight = overlay ? targetWidth * (overlay.height / overlay.width) : targetWidth * 0.42;
  const target = {
    x: centerX,
    y: centerY,
    w: targetWidth,
    h: targetHeight,
    rot: rotation,
    yaw: Math.max(-0.65, Math.min(0.65, faceTurn * 4.5)),
    pitch: Math.max(-0.45, Math.min(0.45, facePitch * 4.5))
  };

  // Suavização (interpolação exponencial) para evitar tremor entre frames.
  const SMOOTHING = 0.35;
  if (!tryOn.smoothed) {
    tryOn.smoothed = { ...target };
  } else {
    tryOn.smoothed.x += (target.x - tryOn.smoothed.x) * SMOOTHING;
    tryOn.smoothed.y += (target.y - tryOn.smoothed.y) * SMOOTHING;
    tryOn.smoothed.w += (target.w - tryOn.smoothed.w) * SMOOTHING;
    tryOn.smoothed.h += (target.h - tryOn.smoothed.h) * SMOOTHING;
    tryOn.smoothed.rot += (target.rot - tryOn.smoothed.rot) * SMOOTHING;
    tryOn.smoothed.yaw += (target.yaw - tryOn.smoothed.yaw) * SMOOTHING;
    tryOn.smoothed.pitch += (target.pitch - tryOn.smoothed.pitch) * SMOOTHING;
  }
  const s = tryOn.smoothed;

  if (tryOn.modelReady && tryOn.glassesModel && currentProduct?.modelo3D) {
    const model = tryOn.glassesModel;
    const scale = s.w / model.userData.baseWidth;
    model.visible = true;
    model.scale.setScalar(scale);
    model.position.set(s.x - width / 2, height / 2 - s.y, 0);
    model.rotation.set(s.pitch, s.yaw, -s.rot);
    tryOn.threeRenderer.render(tryOn.threeScene, tryOn.threeCamera);
    return;
  }
  tryOn.threeRenderer?.clear();
  if (!overlay) return;

  ctx.save();
  ctx.translate(s.x, s.y);
  ctx.rotate(s.rot);
  ctx.globalAlpha = 0.98;
  ctx.drawImage(overlay, -s.w / 2, -s.h * 0.42, s.w, s.h);
  ctx.restore();
}

/* ---- Captura de foto ---- */
function capturePhoto() {
  const { video, canvas } = tryOn;
  if (!video || !video.videoWidth) {
    showToast('Ative a câmera antes de capturar a foto.', 'error');
    return;
  }
  const shot = document.createElement('canvas');
  shot.width = video.videoWidth;
  shot.height = video.videoHeight;
  const shotCtx = shot.getContext('2d');
  // A imagem final é composta: vídeo espelhado (como o usuário vê) + óculos.
  shotCtx.save();
  shotCtx.translate(shot.width, 0);
  shotCtx.scale(-1, 1);
  shotCtx.drawImage(video, 0, 0, shot.width, shot.height);
  shotCtx.restore();
  if (canvas.width === shot.width && canvas.height === shot.height) {
    shotCtx.save();
    shotCtx.translate(shot.width, 0);
    shotCtx.scale(-1, 1);
    shotCtx.drawImage(canvas, 0, 0);
    shotCtx.restore();
  }
  if (tryOn.threeCanvas && tryOn.modelReady) {
    shotCtx.save();
    shotCtx.translate(shot.width, 0);
    shotCtx.scale(-1, 1);
    shotCtx.drawImage(tryOn.threeCanvas, 0, 0, shot.width, shot.height);
    shotCtx.restore();
  }
  shot.toBlob((blob) => {
    if (!blob) {
      showToast('Não foi possível gerar a foto. Tente novamente.', 'error');
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vanglauss-${currentProduct?.id || 'oculos'}.png`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Foto capturada e baixada!', 'success');
  }, 'image/png');
}

/* ---------- INICIALIZAÇÃO ---------- */
document.addEventListener('DOMContentLoaded', () => {
  cacheElements();
  renderBrandsStrip();
  renderProducts();
  setupFilters();
  setupModalClosers();
  setupMobileNav();

  document.getElementById('detail-tryon-btn')?.addEventListener('click', () => openTryOn(currentProduct?.id));
  document.getElementById('detail-whatsapp-btn')?.addEventListener('click', contactViaWhatsApp);
  document.getElementById('contact-whatsapp-btn')?.addEventListener('click', openWhatsAppGeral);
  document.getElementById('contact-maps-btn')?.addEventListener('click', openMaps);
  document.getElementById('tryon-capture')?.addEventListener('click', capturePhoto);
  document.getElementById('tryon-retry')?.addEventListener('click', startTryOn);

  document.querySelectorAll('[data-scroll-to]').forEach((btn) =>
    btn.addEventListener('click', () => {
      document.querySelector(btn.dataset.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
    })
  );
});