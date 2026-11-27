/* ============================================================
   ÓTICA VANGLAUSS — script.js
   Catálogo, filtros, modais, WhatsApp e provador virtual (MediaPipe)
   ============================================================ */

/* ---------- CONFIGURAÇÃO CENTRAL ---------- */
// Todas as informações de contato/negócio ficam aqui. Para trocar
// telefone, endereço, Instagram etc., edite apenas este objeto.
const CONFIG = {
  empresa: 'Ótica Vanglauss',
  whatsappPhone: '5513996985388', // formato: DDI+DDD+numero, apenas dígitos
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
  [14, 'SL1795', 'Balgrif SL1795', 'VG', 'grau', 'unissex', 'Tamanho 53; armação bronze; hastes de alumínio.'],
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
  [35, 'HL-5004', 'Balgrif HL 5004', 'VG', 'grau', 'feminino', 'Tamanho 52; armação dourada.'],
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
const fotosSemEtiqueta = {
  23: [1, 3, 4],
  29: [1, 2, 3, 'extra'],
  32: ['extra-1', 'extra-2', 'extra-3'],
  35: ['extra-1', 'extra-2', 'extra-3'],
  36: ['extra-1', 'extra-2', 'extra-3']
};
const assetsProvador = {
  1: { modelo3D: 'modelos-3d/01-VG-BG7618.glb' },
  2: { modelo3D: 'modelos-3d/02-VG-H00135.glb' },
  3: { modelo3D: 'modelos-3d/03-OXFOUR-LUX-SDM2018.glb' },
  5: { modelo3D: 'modelos-3d/05-VG-JC-84026.glb' },
  6: { modelo3D: 'modelos-3d/06-VG-JC-1201.glb' },
  10: { modelo3D: 'modelos-3d/10-OXFOUR-LUX-HR-MM-1007.glb' },
  25: { modelo3D: 'modelos-3d/25-KAZUALY-LUX-SDA-3018.glb' },
  26: { modelo3D: 'modelos-3d/26-VG-ZS-1162.glb' },
  29: { modelo3D: 'modelos-3d/29-VG-YY-6131.glb' },
  30: { modelo3D: 'modelos-3d/30-VG-LQC0347.glb' },
  47: { modelo3D: 'modelos-3d/t2.glb' },
  48: { modelo3D: 'modelos-3d/t-1211-4.glb' },
  49: { modelo3D: 'modelos-3d/t-1211-2.glb' }
};
const precosPorModelo = {
  1: 320, 2: 290, 3: 490, 4: 290, 5: 290, 6: 450, 7: 470, 8: 380,
  9: 360, 10: 450, 11: 360, 12: 360, 13: 360, 14: 360, 15: 320,
  16: 290, 17: 360, 18: 360, 20: 360, 21: 360, 23: 360, 24: 360,
  26: 360, 27: 390, 28: 290, 29: 470, 31: 360, 32: 360, 33: 360,
  34: 360, 35: 390, 36: 360, 37: 390, 38: 360, 39: 360, 40: 360,
  41: 360, 42: 390, 43: 390, 44: 450, 45: 360, 46: 450, 47: 450,
  48: 360, 49: 450, 50: 360
};
const produtos = modelosCatalogo.map(([id, codigo, nome, marca, categoria, genero, descricao]) => {
  const marcaArquivo = [14, 35].includes(id) ? 'BALGRIF' : marca.toUpperCase().replace(/\s+/g, '-');
  const quantidadeFotos = quantidadeFotosExtra[id] || 3;
  const indicesSemEtiqueta = fotosSemEtiqueta[id];
  const imagens = indicesSemEtiqueta
    ? indicesSemEtiqueta.map((indice) =>
        `img/oculos/${String(id).padStart(2, '0')}-${marcaArquivo}-${codigo}-${indice}.png`
      )
    : Array.from({ length: quantidadeFotos }, (_, indice) =>
        `img/oculos/${String(id).padStart(2, '0')}-${marcaArquivo}-${codigo}-${indice + 1}.png`
      );
  return { id, codigo, nome, marca, categoria, genero, preco: precosPorModelo[id] ?? null, imagem: imagens[0], imagens, descricao, ...assetsProvador[id] };
});

const marcasDestaque = ['VG', 'OXFOUR LUX', 'Kazualy Lux'];

/* ---------- ESTADO ---------- */
const state = {
  search: '',
  categoria: 'all',
  genero: 'all',
  marca: 'all',
  ordenar: 'relevancia',
  visibleCount: 0,
  hasExpandedCatalog: false
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
  el.catalogMore = document.querySelector('.catalog-more');
  el.productsWrap = document.getElementById('products-grid-wrap');
  el.catalogSection = document.getElementById('oculos');
  el.toastContainer = document.getElementById('toast-container');
  el.navToggle = document.getElementById('nav-toggle');
  el.navMenu = document.getElementById('navbar-menu');
  el.brandsRow = document.getElementById('marcas-row');
  el.searchToggle = document.getElementById('search-toggle');
}

/* ---------- UTIL ---------- */
function formatPrice(value) {
  if (value == null) return 'Consulte valores';
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function categoriaLabel(cat) {
  return cat === 'solar' ? 'Óculos de Sol' : 'Óculos de Grau';
}

// Remove acentos e caixa para que "acetato", "Acetáto" e "ÓCULOS" encontrem o mesmo.
function normalizeText(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function scrollToTarget(selector) {
  const target = document.querySelector(selector);
  if (!target) return;
  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
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

function getGridColumnCount() {
  if (window.matchMedia('(max-width: 640px)').matches) return 2;
  if (window.matchMedia('(max-width: 1024px)').matches) return 3;
  return 4;
}

function getInitialVisibleCount() {
  return getGridColumnCount() * 3;
}

function whatsappLink(message) {
  return `https://wa.me/${CONFIG.whatsappPhone}?text=${encodeURIComponent(message)}`;
}

/* ---------- MODAIS (genérico, acessível) ---------- */
// Enquanto um modal está aberto, o restante da página fica "inert":
// o foco do teclado e leitores de tela não escapam para trás do modal.
const INERT_SELECTOR = 'header.navbar, main, footer.footer, .whatsapp-float, .skip-link';

function setPageInert(isInert) {
  document.querySelectorAll(INERT_SELECTOR).forEach((node) => {
    if (isInert) node.setAttribute('inert', '');
    else node.removeAttribute('inert');
  });
}

function openModal(modalId, triggerEl = null) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  lastFocusedElement = triggerEl || document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  setPageInert(true);
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn?.focus();
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  if (!document.querySelector('.modal.open')) {
    document.body.classList.remove('no-scroll');
    setPageInert(false);
  }
  if (modalId === 'tryon-modal') stopTryOn();
  lastFocusedElement?.focus?.();
}

function setupModalClosers() {
  document.querySelectorAll('.modal').forEach((modal) => {
    modal.querySelector('.modal-close')?.addEventListener('click', () => closeModal(modal.id));
    modal.querySelector('.modal-overlay')?.addEventListener('click', () => closeModal(modal.id));
  });
  document.addEventListener('keydown', (e) => {
    const openModalEl = document.querySelector('.modal.open');
    if (!openModalEl) return;
    if (e.key === 'Escape') {
      closeModal(openModalEl.id);
    } else if (openModalEl.id === 'product-modal' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      stepGallery(e.key === 'ArrowRight' ? 1 : -1);
    }
  });
}

/* ---------- NAV MOBILE ---------- */
function setupMobileNav() {
  if (!el.navToggle || !el.navMenu) return;
  el.navToggle.addEventListener('click', () => {
    const isOpen = el.navMenu.classList.toggle('is-open');
    el.navToggle.setAttribute('aria-expanded', String(isOpen));
    el.navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('no-scroll', isOpen);
  });
  el.navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      el.navMenu.classList.remove('is-open');
      el.navToggle.setAttribute('aria-expanded', 'false');
      el.navToggle.setAttribute('aria-label', 'Abrir menu');
      document.body.classList.remove('no-scroll');
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !el.navMenu.classList.contains('is-open')) return;
    el.navMenu.classList.remove('is-open');
    el.navToggle.setAttribute('aria-expanded', 'false');
    el.navToggle.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('no-scroll');
    el.navToggle.focus();
  });
}

function setupMobileSearch() {
  const searchBox = el.search?.closest('.search-box');
  if (!searchBox || !el.searchToggle) return;

  const closeSearch = () => {
    searchBox.classList.remove('is-open');
    el.searchToggle.setAttribute('aria-expanded', 'false');
    el.searchToggle.setAttribute('aria-label', 'Abrir busca');
  };

  el.searchToggle.addEventListener('click', () => {
    const isOpen = searchBox.classList.toggle('is-open');
    el.searchToggle.setAttribute('aria-expanded', String(isOpen));
    el.searchToggle.setAttribute('aria-label', isOpen ? 'Fechar busca' : 'Abrir busca');
    if (isOpen) el.search.focus();
  });

  document.addEventListener('click', (event) => {
    if (!searchBox.contains(event.target)) closeSearch();
  });

  el.search.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeSearch();
      el.searchToggle.focus();
    }
  });
}

/* ---------- MARCAS ---------- */
function brandSlug(marca) {
  return marca.toLowerCase().replace(/\s+/g, '-');
}

function renderBrandsStrip() {
  if (!el.brandsRow) return;
  el.brandsRow.innerHTML = marcasDestaque
    .map((marca) => `<button type="button" class="brand-chip" data-brand="${brandSlug(marca)}" aria-label="Ver modelos da marca ${marca}">${marca}</button>`)
    .join('');
  el.brandsRow.addEventListener('click', (event) => {
    const chip = event.target.closest('.brand-chip');
    if (chip) filterByBrand(chip.dataset.brand);
  });
}

function filterByBrand(slug) {
  state.marca = slug;
  if (el.brandFilter) {
    el.brandFilter.value = slug;
    syncFilterControl(el.brandFilter);
  }
  renderProducts();
  scrollToTarget('#oculos');
}

/* ---------- FILTROS / CATÁLOGO ---------- */
// Texto pesquisável de cada produto, calculado uma única vez.
produtos.forEach((p) => {
  p.busca = normalizeText(
    [p.nome, p.codigo, p.marca, categoriaLabel(p.categoria), p.genero, p.descricao].join(' ')
  );
});

function compareByPrice(direction) {
  // Produtos sem preço ("Consulte valores") sempre ficam no final.
  return (a, b) => {
    if (a.preco == null && b.preco == null) return 0;
    if (a.preco == null) return 1;
    if (b.preco == null) return -1;
    return direction * (a.preco - b.preco);
  };
}

function getFilteredProducts() {
  // Cada palavra digitada precisa aparecer em algum campo do produto
  // (ex.: "solar feminino" ou "acetato azul").
  const termos = normalizeText(state.search).split(/\s+/).filter(Boolean);
  let lista = produtos.filter((p) => {
    const nomeMatch = termos.every((termo) => p.busca.includes(termo));
    const categoriaMatch = state.categoria === 'all' || p.categoria === state.categoria;
    const generoMatch = state.genero === 'all' || p.genero === state.genero;
    const marcaMatch = state.marca === 'all' || brandSlug(p.marca) === state.marca;
    return nomeMatch && categoriaMatch && generoMatch && marcaMatch;
  });

  switch (state.ordenar) {
    case 'preco-asc': lista = lista.sort(compareByPrice(1)); break;
    case 'preco-desc': lista = lista.sort(compareByPrice(-1)); break;
    case 'nome': lista = lista.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { numeric: true })); break;
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
        <button type="button" class="product-image-nav product-image-prev" data-action="previous-image" aria-label="Foto anterior de ${produto.nome}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button type="button" class="product-image-nav product-image-next" data-action="next-image" aria-label="Próxima foto de ${produto.nome}">
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
          <button type="button" class="btn-view" data-action="detail" aria-label="Ver detalhes de ${produto.nome}">Detalhes</button>
          <button type="button" class="btn-try-on" data-action="tryon" aria-label="Experimentar ${produto.nome} virtualmente">Experimentar</button>
        </div>
      </div>
    </article>`;
}

function renderProducts(resetVisibleCount = true) {
  if (!el.produtos) return;
  if (resetVisibleCount) {
    state.visibleCount = getInitialVisibleCount();
    state.hasExpandedCatalog = false;
  }
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
    if (el.catalogMore) el.catalogMore.hidden = true;
    el.productsWrap?.classList.remove('has-more');
    if (el.emptyState) el.emptyState.hidden = false;
    return;
  }
  if (el.emptyState) el.emptyState.hidden = true;

  const produtosVisiveis = lista.slice(0, state.visibleCount);
  el.produtos.innerHTML = produtosVisiveis.map(productCardTemplate).join('');
  const hasMore = lista.length > state.visibleCount;
  if (el.showMore) el.showMore.hidden = !hasMore;
  if (el.catalogMore) el.catalogMore.hidden = !hasMore;
  el.productsWrap?.classList.toggle('has-more', hasMore);

  el.produtos.querySelectorAll('.product-card').forEach((card) => {
    const id = Number(card.dataset.id);
    const produto = produtos.find((item) => item.id === id);
    const image = card.querySelector('.product-image');
    const imageWrapper = card.querySelector('.product-image-wrapper');
    let imageIndex = 0;
    const showImage = (direction) => {
      if (!produto?.imagens?.length) return;
      imageIndex = (imageIndex + direction + produto.imagens.length) % produto.imagens.length;
      // Se uma foto anterior falhou ao carregar, tenta de novo com a nova.
      imageWrapper?.classList.remove('img-error');
      image.style.display = '';
      image.src = produto.imagens[imageIndex];
      image.alt = `${produto.nome} — ${produto.marca}, foto ${imageIndex + 1}`;
    };
    const imageControls = card.querySelectorAll('.product-image-nav');
    imageControls.forEach((control) => {
      control.hidden = !produto?.imagens || produto.imagens.length <= 1;
    });
    card.querySelector('[data-action="previous-image"]')?.addEventListener('click', () => showImage(-1));
    card.querySelector('[data-action="next-image"]')?.addEventListener('click', () => showImage(1));
    let swipeStart = null;
    imageWrapper?.addEventListener('touchstart', (event) => {
      el.produtos.querySelectorAll('.product-card.is-image-controls-visible').forEach((activeCard) => {
        activeCard.classList.remove('is-image-controls-visible');
      });
      card.classList.add('is-image-controls-visible');

      const touch = event.changedTouches[0];
      swipeStart = event.target.closest('button') ? null : { x: touch.clientX, y: touch.clientY };
    }, { passive: true });
    imageWrapper?.addEventListener('touchend', (event) => {
      if (!swipeStart) return;
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - swipeStart.x;
      const deltaY = touch.clientY - swipeStart.y;
      swipeStart = null;
      if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
      showImage(deltaX < 0 ? 1 : -1);
    }, { passive: true });
    imageWrapper?.addEventListener('touchcancel', () => {
      swipeStart = null;
    }, { passive: true });
    // Tocar/clicar na foto abre os detalhes (o botão "Detalhes" continua para teclado).
    imageWrapper?.addEventListener('click', (event) => {
      if (event.target.closest('button')) return;
      showProductDetail(id, card.querySelector('[data-action="detail"]'));
    });
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
  document.querySelectorAll('.filters-bar .filter-select').forEach(syncFilterControl);
  renderProducts();
}

function closeFilterControl(control, restoreFocus = false) {
  const trigger = control.querySelector('.filter-trigger');
  const options = control.querySelector('.filter-options');
  if (!trigger || !options || options.hidden) return;
  options.hidden = true;
  trigger.setAttribute('aria-expanded', 'false');
  control.classList.remove('opens-up');
  if (restoreFocus) trigger.focus();
}

function openFilterControl(control) {
  document.querySelectorAll('.filter-control').forEach((otherControl) => {
    if (otherControl !== control) closeFilterControl(otherControl);
  });
  const trigger = control.querySelector('.filter-trigger');
  const options = control.querySelector('.filter-options');
  if (!trigger || !options) return;
  options.hidden = false;
  trigger.setAttribute('aria-expanded', 'true');
  const triggerBounds = trigger.getBoundingClientRect();
  const menuMaxHeight = Math.min(288, window.innerHeight * 0.55);
  const menuHeight = Math.min(options.scrollHeight, menuMaxHeight);
  const spaceBelow = window.innerHeight - triggerBounds.bottom;
  const spaceAbove = triggerBounds.top;
  control.classList.toggle('opens-up', spaceBelow < menuHeight + 8 && spaceAbove > spaceBelow);
  const selectedOption = options.querySelector('[aria-selected="true"]') || options.querySelector('[role="option"]');
  selectedOption?.focus();
}

function syncFilterControl(select) {
  const control = select.closest('.filter-control');
  if (!control) return;
  const trigger = control.querySelector('.filter-trigger');
  const value = control.querySelector('.filter-trigger-value');
  const selectedOption = select.options[select.selectedIndex];
  if (!trigger || !value || !selectedOption) return;

  const label = select.labels?.[0]?.textContent.trim() || select.getAttribute('aria-label') || '';
  const optionLabel = selectedOption.textContent.trim();
  const valueLabel = optionLabel.replace(new RegExp(`^${label}:\\s*`, 'i'), '');
  value.textContent = valueLabel;
  trigger.setAttribute('aria-label', `${label}: ${valueLabel}`);
  control.querySelectorAll('[role="option"]').forEach((option) => {
    const isSelected = option.dataset.value === select.value;
    option.setAttribute('aria-selected', String(isSelected));
  });
}

function enhanceFilterControl(select) {
  const label = select.labels?.[0]?.textContent.trim() || select.getAttribute('aria-label') || '';
  const control = document.createElement('div');
  control.className = 'filter-control';
  select.parentNode.insertBefore(control, select);
  control.appendChild(select);
  select.tabIndex = -1;
  select.setAttribute('aria-hidden', 'true');

  const trigger = document.createElement('button');
  trigger.className = 'filter-trigger';
  trigger.type = 'button';
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', `${select.id}-options`);
  trigger.innerHTML = `<span class="filter-trigger-copy"><span class="filter-control-label"></span><span class="filter-trigger-value"></span></span><span class="filter-trigger-chevron" aria-hidden="true"></span>`;
  trigger.querySelector('.filter-control-label').textContent = label;

  const options = document.createElement('div');
  options.id = `${select.id}-options`;
  options.className = 'filter-options';
  options.setAttribute('role', 'listbox');
  options.setAttribute('aria-label', label);
  options.hidden = true;

  Array.from(select.options).forEach((option) => {
    const button = document.createElement('button');
    button.className = 'filter-option';
    button.type = 'button';
    button.dataset.value = option.value;
    button.setAttribute('role', 'option');
    button.tabIndex = -1;
    button.textContent = option.textContent.replace(new RegExp(`^${label}:\\s*`, 'i'), '');
    button.addEventListener('click', () => {
      select.value = option.value;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      closeFilterControl(control, true);
    });
    button.addEventListener('keydown', (event) => {
      const optionButtons = Array.from(options.querySelectorAll('[role="option"]'));
      const index = optionButtons.indexOf(button);
      let nextIndex = index;
      if (event.key === 'ArrowDown') nextIndex = (index + 1) % optionButtons.length;
      else if (event.key === 'ArrowUp') nextIndex = (index - 1 + optionButtons.length) % optionButtons.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = optionButtons.length - 1;
      else if (event.key === 'Escape') {
        event.preventDefault();
        closeFilterControl(control, true);
        return;
      } else if (event.key === 'Tab') {
        closeFilterControl(control);
        return;
      } else {
        return;
      }
      event.preventDefault();
      optionButtons[nextIndex]?.focus();
    });
    options.appendChild(button);
  });

  trigger.addEventListener('click', () => {
    if (options.hidden) openFilterControl(control);
    else closeFilterControl(control);
  });
  trigger.addEventListener('keydown', (event) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
      event.preventDefault();
      openFilterControl(control);
    } else if (event.key === 'Escape') {
      closeFilterControl(control);
    }
  });
  select.addEventListener('change', () => syncFilterControl(select));

  control.append(trigger, options);
  syncFilterControl(select);
}

// Ao buscar pelo menu (que fica no topo), leva a pessoa até os resultados.
function revealCatalogIfOffscreen() {
  if (!el.catalogSection) return;
  const rect = el.catalogSection.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight * 0.5 && rect.bottom > 80;
  if (!isVisible) scrollToTarget('#oculos');
}

function setupFilters() {
  // Enquanto nenhum produto tiver preço cadastrado, ordenar por preço não
  // faz sentido: as opções são ocultadas e voltam sozinhas quando houver preços.
  if (el.sortFilter && !produtos.some((p) => p.preco != null)) {
    Array.from(el.sortFilter.options).forEach((option) => {
      if (option.value.startsWith('preco')) option.remove();
    });
  }

  document.querySelectorAll('.filters-bar .filter-select').forEach(enhanceFilterControl);
  document.addEventListener('click', (event) => {
    if (event.target.closest('.filter-control')) return;
    document.querySelectorAll('.filter-control').forEach((control) => closeFilterControl(control));
  });
  let searchScrollTimer;
  el.search?.addEventListener('input', (e) => {
    state.search = e.target.value;
    renderProducts();
    window.clearTimeout(searchScrollTimer);
    if (state.search.trim()) searchScrollTimer = window.setTimeout(revealCatalogIfOffscreen, 350);
  });
  el.categoryFilter?.addEventListener('change', (e) => { state.categoria = e.target.value; renderProducts(); });
  el.genderFilter?.addEventListener('change', (e) => { state.genero = e.target.value; renderProducts(); });
  el.brandFilter?.addEventListener('change', (e) => { state.marca = e.target.value; renderProducts(); });
  el.sortFilter?.addEventListener('change', (e) => { state.ordenar = e.target.value; renderProducts(); });
  el.clearFilters?.addEventListener('click', clearAllFilters);
  el.showMore?.addEventListener('click', () => {
    state.hasExpandedCatalog = true;
    state.visibleCount += getGridColumnCount() * 2;
    renderProducts(false);
  });
  let resizeTimer;
  window.addEventListener('resize', () => {
    if (state.hasExpandedCatalog) return;
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => renderProducts(), 150);
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

  const nav = document.getElementById('gallery-nav');
  if (nav) nav.innerHTML = ''; // força recriar os pontos para o novo produto
  renderGallery();
  openModal('product-modal', triggerEl);
}

function capitalize(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
}

function getCurrentGalleryImages() {
  if (!currentProduct) return [];
  return currentProduct.imagens?.length ? currentProduct.imagens : [currentProduct.imagem];
}

function renderGallery() {
  const imagens = getCurrentGalleryImages();
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
  // Os pontos são criados uma vez por produto; depois só trocamos o estado,
  // assim o foco do teclado não se perde ao navegar pelas fotos.
  if (nav.children.length !== imagens.length) {
    nav.innerHTML = imagens.map((_, i) =>
      `<button type="button" class="gallery-dot" data-index="${i}" aria-label="Ver foto ${i + 1} de ${imagens.length}"></button>`
    ).join('');
    nav.querySelectorAll('.gallery-dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        currentGalleryIndex = Number(dot.dataset.index);
        renderGallery();
      });
    });
  }
  nav.querySelectorAll('.gallery-dot').forEach((dot, i) => {
    const isActive = i === currentGalleryIndex;
    dot.classList.toggle('is-active', isActive);
    if (isActive) dot.setAttribute('aria-current', 'true');
    else dot.removeAttribute('aria-current');
  });
}

function stepGallery(direction) {
  const total = getCurrentGalleryImages().length;
  if (total <= 1) return;
  currentGalleryIndex = (currentGalleryIndex + direction + total) % total;
  renderGallery();
}

function setupGallerySwipe() {
  const area = document.querySelector('.product-detail-image');
  if (!area) return;
  let start = null;
  area.addEventListener('touchstart', (event) => {
    const touch = event.changedTouches[0];
    start = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });
  area.addEventListener('touchend', (event) => {
    if (!start) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    start = null;
    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    stepGallery(deltaX < 0 ? 1 : -1);
  }, { passive: true });
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
const TRYON_SMOOTHING = 0.35;
const GLASSES_EYE_SPAN_RATIO = 1.92;
const TRYON_FORWARD_DEPTH_RATIO = 0.9;

const tryOn = {
  stream: null,
  faceLandmarker: null,
  landmarkerLoading: null,
  rafId: null,
  session: 0,            // incrementa a cada abrir/fechar; cancela inícios assíncronos obsoletos
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
  threeLibrary: null,
  glassesModel: null,
  glassesModelPath: null,
  faceOccluder: null,
  faceOccluderGeometry: null,
  faceOccluderTriangles: null,
  faceOccluderInitialized: false,
  faceOccluderWidth: 0,
  faceOccluderHeight: 0,
  nearSideDirection: 0,
  visibleTempleSide: 0,
  threeLoading: null,
  threeLoadingPath: null,
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
  // Evita reescrever o mesmo texto a cada frame (a região é aria-live).
  if (status.textContent === message && status.dataset.kind === kind) return;
  status.textContent = message;
  status.dataset.kind = kind;
}

function openTryOn(productId, triggerEl = null) {
  currentProduct = produtos.find((p) => p.id === productId);
  if (!currentProduct) return;
  tryOn.smoothed = null;
  tryOn.angleHistory = [];
  tryOn.faceOccluderInitialized = false;
  tryOn.nearSideDirection = 0;
  tryOn.visibleTempleSide = 0;
  closeModal('product-modal');
  document.getElementById('tryon-product-name').textContent = currentProduct.nome;
  openModal('tryon-modal', triggerEl);
  startTryOn();
}

async function startTryOn() {
  const { video, canvas, threeCanvas, permissionPanel } = tryOnEls();
  if (tryOn.stream) stopTryOn();
  const session = ++tryOn.session;
  const isStale = () => session !== tryOn.session || !tryOn.active;
  if (permissionPanel) permissionPanel.hidden = true;
  tryOn.video = video;
  tryOn.canvas = canvas;
  tryOn.threeCanvas = threeCanvas;
  tryOn.ctx = canvas.getContext('2d');
  tryOn.active = true;

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

  tryOn.overlays = {};
  setTryOnStatus(
    currentProduct?.modelo3D
      ? 'Solicitando acesso à câmera…'
      : 'Modelo 3D não disponível ainda.',
    currentProduct?.modelo3D ? 'loading' : 'warn'
  );

  try {
    const stream = await requestCameraStream();
    // Se o provador foi fechado enquanto o navegador pedia permissão,
    // a câmera precisa ser desligada — senão ela ficaria ligada em segundo plano.
    if (isStale()) {
      stream.getTracks().forEach((track) => track.stop());
      return;
    }
    tryOn.stream = stream;
    if (permissionPanel) permissionPanel.hidden = true;
    video.srcObject = stream;
    await video.play().catch(() => {});
    setTryOnStatus(
      currentProduct?.modelo3D
        ? 'Carregando o reconhecimento facial…'
        : 'Modelo 3D não disponível ainda.',
      currentProduct?.modelo3D ? 'loading' : 'warn'
    );
    ensureThreeModel();
    await ensureFaceLandmarker();
    if (isStale()) return; // usuário fechou durante o carregamento
    setTryOnStatus(
      currentProduct?.modelo3D
        ? 'Posicione seu rosto dentro da área indicada.'
        : 'Modelo 3D não disponível ainda.',
      currentProduct?.modelo3D ? 'info' : 'warn'
    );
    runTrackingLoop(session);
  } catch (error) {
    if (session !== tryOn.session) return;
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
  tryOn.session += 1;
  tryOn.stream?.getTracks().forEach((track) => track.stop());
  tryOn.stream = null;
  if (tryOn.video) tryOn.video.srcObject = null;
  if (tryOn.rafId) cancelAnimationFrame(tryOn.rafId);
  tryOn.rafId = null;
  tryOn.smoothed = null;
  tryOn.angleHistory = [];
  tryOn.faceOccluderInitialized = false;
  tryOn.nearSideDirection = 0;
  tryOn.visibleTempleSide = 0;
  if (tryOn.ctx && tryOn.canvas) tryOn.ctx.clearRect(0, 0, tryOn.canvas.width, tryOn.canvas.height);
  tryOn.threeRenderer?.clear();
}

function createTempleIndexVariants(mesh, three, size) {
  const geometry = mesh.geometry;
  if (!geometry.index || geometry.groups.length) return null;

  const sourceIndices = geometry.index.array;
  const positions = geometry.attributes.position.array;
  const matrix = mesh.matrixWorld.elements;
  const frameIndices = [];
  const leftTempleIndices = [];
  const rightTempleIndices = [];
  const halfWidth = Math.max(size.x / 2, 0.001);
  const halfDepth = Math.max(size.z / 2, 0.001);

  for (let index = 0; index < sourceIndices.length; index += 3) {
    let centerX = 0;
    let centerZ = 0;
    for (let vertex = 0; vertex < 3; vertex += 1) {
      const positionIndex = sourceIndices[index + vertex] * 3;
      const x = positions[positionIndex];
      const y = positions[positionIndex + 1];
      const z = positions[positionIndex + 2];
      centerX += x * matrix[0] + y * matrix[4] + z * matrix[8] + matrix[12];
      centerZ += x * matrix[2] + y * matrix[6] + z * matrix[10] + matrix[14];
    }
    centerX /= 3;
    centerZ /= 3;

    const behindFront = -centerZ / (halfDepth * 2);
    const isTemple = Math.abs(centerX) / halfWidth > 0.55 && behindFront > 0.2;
    const destination = !isTemple
      ? frameIndices
      : centerX < 0
        ? leftTempleIndices
        : rightTempleIndices;
    destination.push(sourceIndices[index], sourceIndices[index + 1], sourceIndices[index + 2]);
  }

  if (!leftTempleIndices.length || !rightTempleIndices.length) return null;
  const IndexArray = sourceIndices.constructor;
  return {
    full: new IndexArray(sourceIndices),
    left: new IndexArray([...frameIndices, ...leftTempleIndices]),
    right: new IndexArray([...frameIndices, ...rightTempleIndices]),
    currentSide: null
  };
}

function updateVisibleTempleSide(model, yaw, nearSideDirection) {
  const turn = Math.abs(yaw);
  if (turn < 0.16) {
    tryOn.visibleTempleSide = 0;
  } else if (turn > 0.24 && nearSideDirection) {
    tryOn.visibleTempleSide = nearSideDirection;
  }

  model.traverse((object) => {
    const variants = object.userData.templeIndexVariants;
    if (!variants) return;
    if (variants.currentSide === tryOn.visibleTempleSide) return;
    const indices = tryOn.visibleTempleSide < 0
      ? variants.left
      : tryOn.visibleTempleSide > 0
        ? variants.right
        : variants.full;
    object.geometry.index.array.set(indices);
    object.geometry.index.needsUpdate = true;
    object.geometry.setDrawRange(0, indices.length);
    variants.currentSide = tryOn.visibleTempleSide;
  });
}

async function ensureThreeModel() {
  const modelPath = currentProduct?.modelo3D;
  if (!modelPath) return false;
  if (tryOn.modelReady && tryOn.glassesModelPath === modelPath) return true;
  if (tryOn.threeLoading && tryOn.threeLoadingPath === modelPath) return tryOn.threeLoading;

  tryOn.threeLoadingPath = modelPath;
  tryOn.threeLoading = (async () => {
    const three = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
    const { GLTFLoader } = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js');
    const { threeCanvas } = tryOnEls();
    if (!threeCanvas) return false;

    if (!tryOn.threeRenderer) {
      tryOn.threeRenderer = new three.WebGLRenderer({ canvas: threeCanvas, alpha: true, antialias: true });
      tryOn.threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      tryOn.threeRenderer.setClearColor(0x000000, 0);
      tryOn.threeScene = new three.Scene();
      tryOn.threeScene.add(new three.HemisphereLight(0xffffff, 0x555555, 2.2));
      const keyLight = new three.DirectionalLight(0xffffff, 2.5);
      keyLight.position.set(0, 1, 3);
      tryOn.threeScene.add(keyLight);
      tryOn.threeCamera = new three.OrthographicCamera(-1, 1, 1, -1, 1, 2000);
      tryOn.threeCamera.position.z = 1000;
    }
    tryOn.threeLibrary = three;

    const gltf = await new Promise((resolve, reject) => {
      new GLTFLoader().load(modelPath, resolve, undefined, reject);
    });
    if (!tryOn.active || currentProduct?.modelo3D !== modelPath) return false;
    const model = gltf.scene;
    const bounds = new three.Box3().setFromObject(model);
    const size = bounds.getSize(new three.Vector3());
    const center = bounds.getCenter(new three.Vector3());
    model.position.sub(new three.Vector3(center.x, center.y, bounds.max.z));
    model.updateMatrixWorld(true);
    model.rotation.order = 'YXZ';
    model.traverse((object) => {
      if (!object.isMesh) return;
      object.renderOrder = 1;
      object.userData.templeIndexVariants = createTempleIndexVariants(object, three, size);
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => {
        material.clippingPlanes = [];
      });
    });
    const anchor = new three.Group();
    anchor.add(model);
    anchor.visible = false;
    anchor.userData.baseWidth = Math.max(size.x, 0.001);
    anchor.userData.baseDepth = Math.max(size.z, 0.001);
    if (tryOn.glassesModel) {
      tryOn.threeScene.remove(tryOn.glassesModel);
      tryOn.glassesModel.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material?.dispose();
      });
    }
    tryOn.glassesModel = anchor;
    tryOn.glassesModelPath = modelPath;
    tryOn.threeScene.add(anchor);
    tryOn.modelReady = true;
    resizeThreeCanvas();
    return true;
  })().catch((error) => {
    console.warn('Modelo 3D indisponível.', error);
    setTryOnStatus('Modelo 3D não disponível ainda.', 'warn');
    return false;
  }).finally(() => {
    if (tryOn.threeLoadingPath === modelPath) {
      tryOn.threeLoading = null;
      tryOn.threeLoadingPath = null;
    }
  });

  return tryOn.threeLoading;
}

function resizeThreeCanvas() {
  if (!tryOn.threeRenderer || !tryOn.threeCamera || !tryOn.video) return;
  const stage = tryOnEls().stage;
  const width = stage?.clientWidth || tryOn.video.videoWidth || 720;
  const height = stage?.clientHeight || tryOn.video.videoHeight || 720;
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
      // Permite nova tentativa na próxima abertura do provador.
      tryOn.landmarkerLoading = null;
      return null;
    }
  })();

  return tryOn.landmarkerLoading;
}

/* ---- Loop de rastreamento ---- */
function runTrackingLoop(session) {
  const loop = () => {
    if (!tryOn.active || !tryOn.stream || session !== tryOn.session) return;
    const { video, canvas, ctx } = tryOn;
    if (video.videoWidth && tryOn.faceLandmarker) {
      const stage = tryOnEls().stage;
      const stageWidth = stage?.clientWidth || video.videoWidth;
      const stageHeight = stage?.clientHeight || video.videoHeight;
      if (canvas.width !== stageWidth) canvas.width = stageWidth;
      if (canvas.height !== stageHeight) canvas.height = stageHeight;
      resizeThreeCanvas();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const result = tryOn.faceLandmarker.detectForVideo(video, performance.now());
      const landmarks = chooseClosestFace(result.faceLandmarks, canvas.width, canvas.height);

      if (landmarks) {
        if (!currentProduct?.modelo3D) {
          setTryOnStatus('Modelo 3D não disponível ainda.', 'warn');
        } else {
          setTryOnStatus('Rosto detectado — mova a cabeça devagar para ver de outros ângulos.', 'success');
          drawGlasses(ctx, landmarks, canvas.width, canvas.height);
        }
      } else {
        if (tryOn.glassesModel) tryOn.glassesModel.visible = false;
        if (tryOn.faceOccluder) tryOn.faceOccluder.visible = false;
        tryOn.threeRenderer?.clear();
        setTryOnStatus(
          currentProduct?.modelo3D
            ? 'Não foi possível detectar seu rosto. Ajuste a iluminação e centralize o rosto.'
            : 'Modelo 3D não disponível ainda.',
          'warn'
        );
      }
    }
    tryOn.rafId = requestAnimationFrame(loop);
  };
  loop();
}

function chooseClosestFace(faceLandmarks, width, height) {
  if (!faceLandmarks?.length) return null;
  if (faceLandmarks.length === 1) return faceLandmarks[0];

  return faceLandmarks.reduce((closest, landmarks) => {
    const nose = landmarks[1];
    if (!nose) return closest;
    if (!closest) return landmarks;
    const closestNose = closest[1];
    const distance = Math.hypot((nose.x - 0.5) * width, (nose.y - 0.5) * height);
    const closestDistance = Math.hypot((closestNose.x - 0.5) * width, (closestNose.y - 0.5) * height);
    return distance < closestDistance ? landmarks : closest;
  }, null);
}

function updateFaceOccluder(landmarks, width, height, videoToStage) {
  const three = tryOn.threeLibrary;
  const count = Math.min(468, landmarks.length);
  const glassesModel = tryOn.glassesModel;
  if (!three || !glassesModel || count < 3) return;

  if (!tryOn.faceOccluder) {
    const geometry = new three.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const connections = tryOn.faceLandmarker.constructor.FACE_LANDMARKS_TESSELATION;
    if (!connections?.length || connections.length % 3 !== 0) {
      throw new Error('A topologia facial do MediaPipe está indisponível.');
    }
    const indices = [];
    for (let index = 0; index < connections.length; index += 3) {
      const first = connections[index];
      const second = connections[index + 1];
      const third = connections[index + 2];
      if (
        first.end !== second.start ||
        second.end !== third.start ||
        third.end !== first.start
      ) {
        throw new Error('A topologia facial do MediaPipe está inconsistente.');
      }
      indices.push(first.start, first.end, second.end);
    }
    geometry.setAttribute('position', new three.BufferAttribute(positions, 3));
    geometry.setIndex(new three.BufferAttribute(new Uint16Array(indices), 1));

    const material = new three.MeshBasicMaterial({
      colorWrite: false,
      depthTest: true,
      depthWrite: true,
      side: three.DoubleSide
    });
    const mesh = new three.Mesh(geometry, material);
    mesh.renderOrder = 0;
    mesh.frustumCulled = false;
    tryOn.threeScene.add(mesh);
    tryOn.faceOccluder = mesh;
    tryOn.faceOccluderGeometry = geometry;
    tryOn.faceOccluderTriangles = indices;
  }

  if (tryOn.faceOccluderWidth !== width || tryOn.faceOccluderHeight !== height) {
    tryOn.faceOccluderInitialized = false;
    tryOn.faceOccluderWidth = width;
    tryOn.faceOccluderHeight = height;
  }

  const videoWidth = tryOn.video?.videoWidth || width;
  const videoHeight = tryOn.video?.videoHeight || height;
  const videoScale = Math.max(width / videoWidth, height / videoHeight);
  const eyeDepth = ((landmarks[33]?.z || 0) + (landmarks[263]?.z || 0)) / 2;
  const yaw = tryOn.smoothed?.yaw || 0;
  const modelDepth = glassesModel.userData.baseDepth * glassesModel.scale.z;
  const positions = tryOn.faceOccluderGeometry.attributes.position.array;
  const initialized = tryOn.faceOccluderInitialized;

  for (let index = 0; index < count; index += 1) {
    const mapped = videoToStage(landmarks[index]);
    const targetX = mapped.x - width / 2;
    const targetY = height / 2 - mapped.y;
    if (initialized) {
      positions[index * 3] += (targetX - positions[index * 3]) * TRYON_SMOOTHING;
      positions[index * 3 + 1] += (targetY - positions[index * 3 + 1]) * TRYON_SMOOTHING;
    } else {
      positions[index * 3] = targetX;
      positions[index * 3 + 1] = targetY;
    }
  }

  const getMaskPoint = (index) => ({
    x: positions[index * 3] + width / 2,
    y: height / 2 - positions[index * 3 + 1]
  });
  const screenLeftEye = getMaskPoint(263);
  const screenRightEye = getMaskPoint(33);
  const leftInnerEye = getMaskPoint(362);
  const rightInnerEye = getMaskPoint(133);
  const eyeCenterX = (
    screenLeftEye.x + screenRightEye.x + leftInnerEye.x + rightInnerEye.x
  ) / 4;
  const eyeDistance = Math.max(
    Math.hypot(screenRightEye.x - screenLeftEye.x, screenRightEye.y - screenLeftEye.y),
    1
  );
  const templeDepthBias = Math.max(eyeDistance, modelDepth * 0.65);
  const leftCheek = landmarks[234];
  const rightCheek = landmarks[454];
  const cheekDepthDifference = (leftCheek?.z || 0) - (rightCheek?.z || 0);
  const nearCheek = getMaskPoint(cheekDepthDifference < 0 ? 234 : 454);
  const cheekSide = Math.sign(nearCheek.x - eyeCenterX);
  if (Math.abs(cheekDepthDifference) > 0.025 && cheekSide) {
    tryOn.nearSideDirection = cheekSide;
  } else if (!tryOn.nearSideDirection) {
    tryOn.nearSideDirection = yaw >= 0 ? -1 : 1;
  }
  const nearSideDirection = tryOn.nearSideDirection;
  updateVisibleTempleSide(glassesModel, yaw, nearSideDirection);
  const turnStrength = Math.max(0, Math.min(1, (Math.abs(yaw) - 0.08) / 0.42));

  for (let index = 0; index < count; index += 1) {
    const point = landmarks[index];
    const sideDistance = (positions[index * 3] + width / 2 - eyeCenterX) / eyeDistance;
    const templeWeight = Math.max(0, Math.min(1, (Math.abs(sideDistance) - 0.4) / 0.5)) * turnStrength;
    const nearSide = sideDistance * nearSideDirection > 0;
    const pointDepth = Number.isFinite(point.z) ? point.z : eyeDepth;
    const depth = (eyeDepth - pointDepth) * videoWidth * videoScale;
    const depthBias = templeDepthBias * (nearSide ? -1 : 1) * templeWeight;
    const targetDepth = depth + depthBias;
    if (initialized) {
      positions[index * 3 + 2] += (targetDepth - positions[index * 3 + 2]) * TRYON_SMOOTHING;
    } else {
      positions[index * 3 + 2] = targetDepth;
    }
  }

  tryOn.faceOccluderInitialized = true;
  const geometry = tryOn.faceOccluderGeometry;
  const indexAttribute = geometry.index;
  const triangleIndices = tryOn.faceOccluderTriangles;
  const lensRadiusX = eyeDistance * 0.47;
  const lensRadiusY = eyeDistance * 0.26;
  const leftLensCenter = {
    x: (screenLeftEye.x + leftInnerEye.x) / 2,
    y: (screenLeftEye.y + leftInnerEye.y) / 2
  };
  const rightLensCenter = {
    x: (screenRightEye.x + rightInnerEye.x) / 2,
    y: (screenRightEye.y + rightInnerEye.y) / 2
  };
  const bridgePoint = getMaskPoint(6);
  const protectedAreas = [
    {
      x: leftLensCenter.x,
      y: leftLensCenter.y,
      radiusX: lensRadiusX,
      radiusY: lensRadiusY
    },
    {
      x: rightLensCenter.x,
      y: rightLensCenter.y,
      radiusX: lensRadiusX,
      radiusY: lensRadiusY
    },
    {
      x: eyeCenterX,
      y: bridgePoint.y,
      radiusX: eyeDistance * 0.13,
      radiusY: eyeDistance * 0.1
    }
  ];
  const isInProtectedArea = (x, y) => protectedAreas.some((area) =>
    ((x - area.x) / area.radiusX) ** 2 + ((y - area.y) / area.radiusY) ** 2 < 1
  );
  let visibleIndexCount = 0;
  for (let index = 0; index < triangleIndices.length; index += 3) {
    const a = triangleIndices[index];
    const b = triangleIndices[index + 1];
    const c = triangleIndices[index + 2];
    const points = [a, b, c].map((pointIndex) => ({
      x: positions[pointIndex * 3] + width / 2,
      y: height / 2 - positions[pointIndex * 3 + 1]
    }));
    const centerX = (points[0].x + points[1].x + points[2].x) / 3;
    const centerY = (points[0].y + points[1].y + points[2].y) / 3;
    if (
      points.some((point) => isInProtectedArea(point.x, point.y)) ||
      isInProtectedArea(centerX, centerY)
    ) continue;
    indexAttribute.array[visibleIndexCount++] = a;
    indexAttribute.array[visibleIndexCount++] = b;
    indexAttribute.array[visibleIndexCount++] = c;
  }

  tryOn.faceOccluderGeometry.attributes.position.needsUpdate = true;
  indexAttribute.needsUpdate = true;
  geometry.setDrawRange(0, visibleIndexCount);
  geometry.computeBoundingSphere();
  tryOn.faceOccluder.visible = true;
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
  const leftEyeInner = landmarks[133] || leftEye;
  const rightEyeInner = landmarks[362] || rightEye;
  const noseBridge = landmarks[6] || landmarks[168];
  const noseTip = landmarks[1] || noseBridge;
  const leftCheek = landmarks[234];
  const rightCheek = landmarks[454];
  if (!leftEye || !rightEye || !noseBridge || !noseTip) return;

  const videoToStage = (point) => {
    const videoWidth = tryOn.video?.videoWidth || width;
    const videoHeight = tryOn.video?.videoHeight || height;
    const scale = Math.max(width / videoWidth, height / videoHeight);
    const renderedWidth = videoWidth * scale;
    const renderedHeight = videoHeight * scale;
    const offsetX = (width - renderedWidth) / 2;
    const offsetY = (height - renderedHeight) / 2;
    return {
      x: width - (offsetX + point.x * renderedWidth),
      y: offsetY + point.y * renderedHeight
    };
  };

  const left = videoToStage(rightEye);
  const right = videoToStage(leftEye);
  const leftInner = videoToStage(rightEyeInner);
  const rightInner = videoToStage(leftEyeInner);
  const bridge = videoToStage(noseBridge);
  const tip = videoToStage(noseTip);
  const leftCheekPoint = leftCheek ? videoToStage(leftCheek) : null;
  const rightCheekPoint = rightCheek ? videoToStage(rightCheek) : null;

  const eyeDistance = Math.hypot(right.x - left.x, right.y - left.y);
  const eyeCenterX = ((left.x + right.x + leftInner.x + rightInner.x) / 4);
  const eyeCenterY = ((left.y + right.y + leftInner.y + rightInner.y) / 4);
  const centerX = eyeCenterX;
  const centerY = eyeCenterY + (bridge.y - eyeCenterY) * 0.12;
  const targetWidth = eyeDistance * GLASSES_EYE_SPAN_RATIO;
  const rotation = Math.atan2(right.y - left.y, right.x - left.x);
  const videoWidth = tryOn.video?.videoWidth || width;
  const videoHeight = tryOn.video?.videoHeight || height;
  const depthScale = Math.max(width / videoWidth, height / videoHeight) * videoWidth;
  const leftEyeDepth = -(rightEye.z || 0) * depthScale;
  const rightEyeDepth = -(leftEye.z || 0) * depthScale;
  const yaw = -Math.atan2(rightEyeDepth - leftEyeDepth, Math.max(right.x - left.x, 1));
  const faceWidth = leftCheekPoint && rightCheekPoint
    ? Math.abs(rightCheekPoint.x - leftCheekPoint.x)
    : eyeDistance * 2.2;
  const faceTurn = (tip.x - eyeCenterX) / Math.max(faceWidth, 0.001);
  const angleKey = pickAngleKey(faceTurn);
  const overlay = tryOn.overlays[angleKey];
  const has3DModel = tryOn.modelReady && tryOn.glassesModel &&
    currentProduct?.modelo3D === tryOn.glassesModelPath;
  if (!overlay && !has3DModel) return;

  const targetHeight = overlay ? targetWidth * (overlay.height / overlay.width) : targetWidth * 0.42;
  const target = {
    x: centerX,
    y: centerY,
    w: targetWidth,
    h: targetHeight,
    rot: rotation,
    yaw: Math.max(-0.65, Math.min(0.65, yaw)),
    pitch: 0
  };

  // Suavização (interpolação exponencial) para evitar tremor entre frames.
  if (!tryOn.smoothed) {
    tryOn.smoothed = { ...target };
  } else {
    tryOn.smoothed.x += (target.x - tryOn.smoothed.x) * TRYON_SMOOTHING;
    tryOn.smoothed.y += (target.y - tryOn.smoothed.y) * TRYON_SMOOTHING;
    tryOn.smoothed.w += (target.w - tryOn.smoothed.w) * TRYON_SMOOTHING;
    tryOn.smoothed.h += (target.h - tryOn.smoothed.h) * TRYON_SMOOTHING;
    tryOn.smoothed.rot += (target.rot - tryOn.smoothed.rot) * TRYON_SMOOTHING;
    tryOn.smoothed.yaw += (target.yaw - tryOn.smoothed.yaw) * TRYON_SMOOTHING;
    tryOn.smoothed.pitch += (target.pitch - tryOn.smoothed.pitch) * TRYON_SMOOTHING;
  }
  const s = tryOn.smoothed;

  if (has3DModel) {
    const model = tryOn.glassesModel;
    const scale = (s.w * 0.88) / model.userData.baseWidth;
    const smoothedEyeDistance = s.w / GLASSES_EYE_SPAN_RATIO;
    model.visible = true;
    model.scale.setScalar(scale);
    model.position.set(
      s.x - width / 2,
      height / 2 - s.y,
      smoothedEyeDistance * TRYON_FORWARD_DEPTH_RATIO
    );
    model.rotation.set(s.pitch, s.yaw, -s.rot);
    updateFaceOccluder(landmarks, width, height, videoToStage);
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
    shotCtx.drawImage(canvas, 0, 0);
  }
  if (tryOn.threeCanvas && tryOn.modelReady) {
    shotCtx.drawImage(tryOn.threeCanvas, 0, 0, shot.width, shot.height);
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
  setupGallerySwipe();
  setupMobileNav();
  setupMobileSearch();

  document.getElementById('detail-tryon-btn')?.addEventListener('click', () => openTryOn(currentProduct?.id));
  document.getElementById('detail-whatsapp-btn')?.addEventListener('click', contactViaWhatsApp);
  document.getElementById('contact-whatsapp-btn')?.addEventListener('click', openWhatsAppGeral);
  document.getElementById('contact-maps-btn')?.addEventListener('click', openMaps);
  document.getElementById('hero-whatsapp-btn')?.addEventListener('click', openWhatsAppGeral);
  document.getElementById('empty-whatsapp')?.addEventListener('click', openWhatsAppGeral);
  document.getElementById('empty-clear')?.addEventListener('click', clearAllFilters);
  document.getElementById('tryon-capture')?.addEventListener('click', capturePhoto);
  document.getElementById('tryon-retry')?.addEventListener('click', startTryOn);

  // O link do botão flutuante usa o mesmo telefone/mensagem definidos em CONFIG.
  const whatsappFloat = document.getElementById('whatsapp-float');
  if (whatsappFloat) whatsappFloat.href = whatsappLink(CONFIG.mensagens.geral);

  document.querySelectorAll('[data-scroll-to]').forEach((btn) =>
    btn.addEventListener('click', () => scrollToTarget(btn.dataset.scrollTo))
  );
});