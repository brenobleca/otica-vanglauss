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

/* ---------- DADOS DOS PRODUTOS ----------
   Estrutura de cada item — mantenha este formato ao adicionar novos óculos:
   {
     id: número único,
     nome, marca, categoria: 'solar' | 'grau', genero: 'masculino'|'feminino'|'unissex'|'infantil',
     preco: number,
     imagem: foto principal do card/detalhe,
     imagens: [opcional] galeria de fotos do produto,
     imagemProvador: PNG com fundo transparente para o provador (frontal),
     provadorAngulos: [opcional] { esquerda, frontal, direita } — PNGs por ângulo
     descricao
   }
   ATENÇÃO: os produtos abaixo (preços, descrições, algumas imagens via
   placeholder) são DADOS DE TESTE e precisam ser substituídos pelos
   dados reais da loja antes da publicação.
------------------------------------------------ */
const produtos = [
  {
    id: 1,
    nome: 'Óculos Teste 1',
    marca: 'Vanglauss',
    categoria: 'solar',
    genero: 'unissex',
    preco: 349.90,
    imagem: 'img/oculos-t-1.jpg',
    imagemProvador: 'img/oculos-t-1-provador.png',
    descricao: 'Modelo de teste com design moderno e confortável, ideal para o dia a dia.'
  },
  {
    id: 7,
    nome: 'Óculos Teste 2',
    marca: 'Vanglauss',
    categoria: 'solar',
    genero: 'unissex',
    preco: 399.90,
    imagem: 'img/oculos-t-2-1.png',
    imagens: ['img/oculos-t-2-1.png', 'img/oculos-t-2-2.png', 'img/oculos-t-2-3.png'],
    imagemProvador: 'img/oculos-t-2-provador.png',
    modelo3D: 'img/oculos-t-2.glb',
    descricao: 'Óculos solar metálico com lentes degradê e design contemporâneo.'
  },
  {
    id: 2,
    nome: 'Vogue VO5436 Feminino',
    marca: 'Vogue',
    categoria: 'grau',
    genero: 'feminino',
    preco: 459.90,
    imagem: 'https://via.placeholder.com/600x600/f5f2ec/6b675f?text=Vogue+VO5436',
    imagemProvador: 'img/oculos-t-1-provador.png',
    descricao: 'Armação fashion com design sofisticado, perfeita para uso diário.'
  },
  {
    id: 3,
    nome: 'Oakley Holbrook',
    marca: 'Oakley',
    categoria: 'solar',
    genero: 'masculino',
    preco: 499.90,
    imagem: 'https://via.placeholder.com/600x600/f5f2ec/6b675f?text=Oakley+Holbrook',
    imagemProvador: 'img/oculos-t-1-provador.png',
    descricao: 'Óculos de sol esportivo com tecnologia Plutonite e armação resistente.'
  },
  {
    id: 4,
    nome: 'Prada VPR12W',
    marca: 'Prada',
    categoria: 'grau',
    genero: 'feminino',
    preco: 799.90,
    imagem: 'https://via.placeholder.com/600x600/f5f2ec/6b675f?text=Prada+VPR12W',
    imagemProvador: 'img/oculos-t-1-provador.png',
    descricao: 'Óculos de grau premium com design italiano refinado.'
  },
  {
    id: 5,
    nome: 'Ray-Ban Wayfarer',
    marca: 'Ray-Ban',
    categoria: 'solar',
    genero: 'feminino',
    preco: 369.90,
    imagem: 'https://via.placeholder.com/600x600/f5f2ec/6b675f?text=Ray-Ban+Wayfarer',
    imagemProvador: 'img/oculos-t-1-provador.png',
    descricao: 'Clássico icônico com armação em acetato de inspiração vintage.'
  },
  {
    id: 6,
    nome: 'Infantil Divertido',
    marca: 'Vanglauss Kids',
    categoria: 'solar',
    genero: 'infantil',
    preco: 179.90,
    imagem: 'https://via.placeholder.com/600x600/f5f2ec/6b675f?text=Infantil',
    imagemProvador: 'img/oculos-t-1-provador.png',
    descricao: 'Óculos infantil leve, resistente e com proteção UV400.'
  }
];

// Marcas em destaque na home. Placeholders claramente identificados —
// substitua pelos logos/nomes reais das marcas trabalhadas pela loja.
const marcasDestaque = ['Vanglauss', 'Ray-Ban', 'Oakley', 'Vogue', 'Prada'];

/* ---------- ESTADO ---------- */
const state = {
  search: '',
  categoria: 'all',
  genero: 'all',
  marca: 'all',
  ordenar: 'relevancia'
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
  el.toastContainer = document.getElementById('toast-container');
  el.navToggle = document.getElementById('nav-toggle');
  el.navMenu = document.getElementById('navbar-menu');
  el.brandsRow = document.getElementById('marcas-row');
}

/* ---------- UTIL ---------- */
function formatPrice(value) {
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
    const nomeMatch = !termo || p.nome.toLowerCase().includes(termo) || p.marca.toLowerCase().includes(termo);
    const categoriaMatch = state.categoria === 'all' || p.categoria === state.categoria;
    const generoMatch = state.genero === 'all' || p.genero === state.genero;
    const marcaMatch = state.marca === 'all' || p.marca.toLowerCase() === state.marca;
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

function renderProducts() {
  if (!el.produtos) return;
  const lista = getFilteredProducts();

  if (el.resultsCount) {
    el.resultsCount.textContent = lista.length === 1
      ? '1 modelo encontrado'
      : `${lista.length} modelos encontrados`;
  }
  if (el.clearFilters) {
    el.clearFilters.hidden = !hasActiveFilters();
  }

  if (!lista.length) {
    el.produtos.innerHTML = '';
    if (el.emptyState) el.emptyState.hidden = false;
    return;
  }
  if (el.emptyState) el.emptyState.hidden = true;

  el.produtos.innerHTML = lista.map(productCardTemplate).join('');

  el.produtos.querySelectorAll('.product-card').forEach((card) => {
    const id = Number(card.dataset.id);
    card.querySelector('[data-action="detail"]').addEventListener('click', () => showProductDetail(id, card));
    card.querySelector('[data-action="tryon"]').addEventListener('click', () => openTryOn(id, card));
  });
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
    thumbs: document.getElementById('tryon-thumbs'),
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

function openTryOn(productId = null, triggerEl = null) {
  currentProduct = produtos.find((p) => p.id === productId) || currentProduct || produtos[0];
  closeModal('product-modal');
  openModal('tryon-modal', triggerEl);
  renderTryOnThumbs();
  startTryOn();
}

function renderTryOnThumbs() {
  const { thumbs } = tryOnEls();
  if (!thumbs) return;
  thumbs.innerHTML = produtos.map((p) => `
    <button type="button" class="tryon-thumb ${currentProduct?.id === p.id ? 'is-active' : ''}" data-id="${p.id}" aria-label="Experimentar ${p.nome}">
      <img src="${p.imagem}" alt="" loading="lazy" onerror="this.style.opacity=0.15" />
    </button>`).join('');
  thumbs.querySelectorAll('.tryon-thumb').forEach((btn) => {
    btn.addEventListener('click', () => {
      currentProduct = produtos.find((p) => p.id === Number(btn.dataset.id));
      thumbs.querySelectorAll('.tryon-thumb').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      tryOn.smoothed = null;
      loadOverlaysForCurrentProduct();
      ensureThreeModel();
    });
  });
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

  document.querySelectorAll('[data-open-tryon]').forEach((btn) =>
    btn.addEventListener('click', () => openTryOn())
  );
  document.querySelectorAll('[data-scroll-to]').forEach((btn) =>
    btn.addEventListener('click', () => {
      document.querySelector(btn.dataset.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
    })
  );
});