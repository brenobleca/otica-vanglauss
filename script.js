const CONFIG = {
  whatsappPhone: '5513999985388',
  mapsUrl: 'https://www.google.com/maps/search/Av.+Francisco+Glicerio,+189,+Santos'
};

const produtos = [
  { id: 1, nome: 'Oculos Teste 1', marca: 'Vanglauss', categoria: 'solar', genero: 'unissex', preco: 349.90, imagem: 'img/oculos-t-1.jpg', imagemProvador: 'img/oculos-t-1-provador.png', descricao: 'Modelo de teste com design moderno e confortavel.' },
  { id: 7, nome: 'Oculos Teste 2', marca: 'Vanglauss', categoria: 'solar', genero: 'unissex', preco: 399.90, imagem: 'img/oculos-t-2-1.png', imagemProvador: 'img/oculos-t-2-2.png', imagens: ['img/oculos-t-2-1.png', 'img/oculos-t-2-2.png', 'img/oculos-t-2-3.png'], descricao: 'Oculos solar metalico com lentes degrade e design contemporaneo.' },
  { id: 2, nome: 'Vogue VO5436 Feminino', marca: 'Vogue', categoria: 'grau', genero: 'feminino', preco: 459.90, imagem: 'https://via.placeholder.com/280x280?text=Vogue+VO5436', imagemProvador: 'img/oculos-t-1-provador.png', descricao: 'Armacao fashion com design sofisticado.' },
  { id: 3, nome: 'Oakley Holbrook', marca: 'Oakley', categoria: 'solar', genero: 'masculino', preco: 499.90, imagem: 'https://via.placeholder.com/280x280?text=Oakley+Holbrook', imagemProvador: 'img/oculos-t-1-provador.png', descricao: 'Oculos de sol esportivo com tecnologia Plutonite.' },
  { id: 4, nome: 'Prada VPR12W Mulher', marca: 'Prada', categoria: 'grau', genero: 'feminino', preco: 799.90, imagem: 'https://via.placeholder.com/280x280?text=Prada+VPR12W', imagemProvador: 'img/oculos-t-1-provador.png', descricao: 'Oculos de grau premium com design italiano refinado.' },
  { id: 5, nome: 'Ray-Ban Wayfarer', marca: 'Ray-Ban', categoria: 'solar', genero: 'feminino', preco: 369.90, imagem: 'https://via.placeholder.com/280x280?text=Ray-Ban+Wayfarer', imagemProvador: 'img/oculos-t-1-provador.png', descricao: 'Classico iconico com armacao acetato vintage.' },
  { id: 6, nome: 'Infantil Mickey Mouse', marca: 'Disney', categoria: 'solar', genero: 'infantil', preco: 179.90, imagem: 'https://via.placeholder.com/280x280?text=Mickey+Kids', imagemProvador: 'img/oculos-t-1-provador.png', descricao: 'Oculos infantis com design divertido e protecao UV.' }
];

const elementos = {
  produtos: document.getElementById('produtos'),
  productSearch: document.getElementById('product-search'),
  categoryFilter: document.getElementById('category-filter'),
  genderFilter: document.getElementById('gender-filter'),
  brandFilter: document.getElementById('brand-filter'),
  toastContainer: document.getElementById('toast-container')
};

let currentProduct = null;
let cameraStream = null;
let faceLandmarker = null;
let trackingFrame = null;
let overlayImage = null;
let overlayCanvases = {};

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  elementos.toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3300);
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  if (modalId === 'tryon-modal') stopCamera();
  document.body.style.overflow = '';
}

function setupModalClosers() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.querySelector('.modal-close')?.addEventListener('click', () => closeModal(modal.id));
    modal.querySelector('.modal-overlay')?.addEventListener('click', () => closeModal(modal.id));
  });
}

function filterProducts() {
  const termo = elementos.productSearch.value.trim().toLowerCase();
  return produtos.filter(produto => {
    const nomeMatch = produto.nome.toLowerCase().includes(termo) || produto.marca.toLowerCase().includes(termo);
    const categoriaMatch = elementos.categoryFilter.value === 'all' || produto.categoria === elementos.categoryFilter.value;
    const generoMatch = elementos.genderFilter.value === 'all' || produto.genero === elementos.genderFilter.value;
    const marcaMatch = elementos.brandFilter.value === 'all' || produto.marca.toLowerCase() === elementos.brandFilter.value;
    return nomeMatch && categoriaMatch && generoMatch && marcaMatch;
  });
}

function renderProducts(listaProdutos = filterProducts()) {
  elementos.produtos.innerHTML = '';
  if (!listaProdutos.length) {
    elementos.produtos.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">Nenhum oculos encontrado.</div>';
    return;
  }
  listaProdutos.forEach(produto => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image-wrapper">
        <span class="product-badge badge-new">Novo</span>
        <img src="${produto.imagem}" alt="${produto.nome}" class="product-image" loading="lazy">
      </div>
      <div class="product-content">
        <div class="product-brand">${produto.marca}</div>
        <h3 class="product-name">${produto.nome}</h3>
        <p class="product-category">${produto.categoria === 'solar' ? 'Oculos de Sol' : 'Oculos de Grau'}</p>
        <div class="product-price">${formatPrice(produto.preco)}</div>
        <div class="product-actions">
          <button type="button" class="btn-view">Ver detalhes</button>
          <button type="button" class="btn-try-on">Experimentar</button>
        </div>
      </div>`;
    card.querySelector('.btn-view').addEventListener('click', () => showProductDetail(produto.id));
    card.querySelector('.btn-try-on').addEventListener('click', () => openTryOn(produto.id));
    elementos.produtos.appendChild(card);
  });
}

function showProductDetail(productId) {
  currentProduct = produtos.find(produto => produto.id === productId);
  if (!currentProduct) return;
  document.getElementById('detail-name').textContent = currentProduct.nome;
  document.getElementById('detail-brand').textContent = currentProduct.marca;
  document.getElementById('detail-category').textContent = currentProduct.categoria === 'solar' ? 'Oculos de Sol' : 'Oculos de Grau';
  document.getElementById('detail-gender').textContent = currentProduct.genero;
  document.getElementById('detail-description').textContent = currentProduct.descricao;
  document.getElementById('detail-image').src = currentProduct.imagem;
  document.getElementById('detail-price').textContent = formatPrice(currentProduct.preco);
  openModal('product-modal');
}

function updateTryOnOverlay() {
  if (!currentProduct) return;
  overlayCanvases = {};
  const imagens = currentProduct.imagens || [currentProduct.imagemProvador];
  imagens.forEach((path, index) => loadOverlayImage(path, index));
}

function loadOverlayImage(path, index) {
  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    for (let pixel = 0; pixel < pixels.data.length; pixel += 4) {
      if (pixels.data[pixel] > 242 && pixels.data[pixel + 1] > 242 && pixels.data[pixel + 2] > 242) pixels.data[pixel + 3] = 0;
    }
    context.putImageData(pixels, 0, 0);
    overlayCanvases[index] = canvas;
  };
  image.src = path;
}

function openTryOn(productId = null) {
  currentProduct = produtos.find(produto => produto.id === productId) || currentProduct || produtos[0];
  updateTryOnOverlay();
  const models = document.getElementById('tryon-models');
  models.innerHTML = '';
  produtos.forEach(produto => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `tryon-model-btn${produto.id === currentProduct.id ? ' active' : ''}`;
    button.textContent = `${produto.marca} - ${produto.nome}`;
    button.addEventListener('click', () => {
      currentProduct = produto;
      document.querySelectorAll('.tryon-model-btn').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      updateTryOnOverlay();
    });
    models.appendChild(button);
  });
  openModal('tryon-modal');
  startCamera();
}

async function startCamera() {
  if (cameraStream) return;
  if (!navigator.mediaDevices?.getUserMedia) {
    showToast('A camera precisa ser usada em HTTPS ou localhost.', 'error');
    return;
  }
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
    const video = document.getElementById('camera-feed');
    video.srcObject = cameraStream;
    document.querySelector('[data-camera-toggle]').textContent = 'Desativar camera';
    await initializeFaceTracking();
    if (video.readyState >= 2) startFaceTracking();
    else video.addEventListener('loadeddata', startFaceTracking, { once: true });
  } catch (error) {
    showToast('Nao foi possivel acessar a camera. Verifique a permissao.', 'error');
  }
}

function stopCamera() {
  cameraStream?.getTracks().forEach(track => track.stop());
  cameraStream = null;
  document.getElementById('camera-feed').srcObject = null;
  const button = document.querySelector('[data-camera-toggle]');
  if (button) button.textContent = 'Ativar camera';
  if (trackingFrame) cancelAnimationFrame(trackingFrame);
  trackingFrame = null;
}

async function initializeFaceTracking() {
  if (faceLandmarker) return;
  try {
    const vision = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/vision_bundle.mjs');
    const filesetResolver = await vision.FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm');
    const options = {
      baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
        delegate: 'GPU'
      },
      runningMode: 'VIDEO',
      numFaces: 1
    };

    try {
      faceLandmarker = await vision.FaceLandmarker.createFromOptions(filesetResolver, options);
    } catch (gpuError) {
      faceLandmarker = await vision.FaceLandmarker.createFromOptions(filesetResolver, {
        ...options,
        baseOptions: { ...options.baseOptions, delegate: 'CPU' }
      });
    }
  } catch (error) {
    console.error('Falha ao carregar o rastreamento facial:', error);
    showToast('Rastreamento facial indisponivel. A camera continua funcionando.', 'error');
  }
}

function startFaceTracking() {
  const video = document.getElementById('camera-feed');
  const canvas = document.getElementById('face-canvas');
  const context = canvas.getContext('2d');
  const track = () => {
    if (!cameraStream) return;
    if (video.videoWidth && faceLandmarker && Object.keys(overlayCanvases).length) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.clearRect(0, 0, canvas.width, canvas.height);
      const result = faceLandmarker.detectForVideo(video, performance.now());
      const landmarks = result.faceLandmarks?.[0];
      if (landmarks) drawTrackedGlasses(context, landmarks, canvas.width, canvas.height);
    }
    trackingFrame = requestAnimationFrame(track);
  };
  track();
}

function drawTrackedGlasses(context, landmarks, width, height) {
  const leftEye = landmarks[33];
  const rightEye = landmarks[263];
  const nose = landmarks[168] || landmarks[6];
  if (!leftEye || !rightEye || !nose) return;
  const centerX = ((leftEye.x + rightEye.x) / 2) * width;
  const centerY = nose.y * height;
  const eyeDistance = Math.hypot((rightEye.x - leftEye.x) * width, (rightEye.y - leftEye.y) * height);
  const glassesWidth = eyeDistance * 2.45;
  const faceTilt = Math.abs(rightEye.y - leftEye.y);
  const faceTurn = nose.x - ((leftEye.x + rightEye.x) / 2);
  const angle = faceTurn > 0.055 ? 0 : faceTurn < -0.055 ? 2 : 1;
  const selectedCanvas = overlayCanvases[angle] || overlayCanvases[1] || overlayCanvases[0];
  if (!selectedCanvas) return;
  const glassesHeight = glassesWidth * (selectedCanvas.height / selectedCanvas.width);
  const rotation = Math.atan2((rightEye.y - leftEye.y) * height, (rightEye.x - leftEye.x) * width);
  context.save();
  context.translate(centerX, centerY);
  context.rotate(rotation);
  context.globalAlpha = 0.98;
  context.drawImage(selectedCanvas, -glassesWidth / 2, -glassesHeight * (0.46 + faceTilt * 0.2), glassesWidth, glassesHeight);
  context.restore();
}

function toggleCamera() {
  if (cameraStream) stopCamera();
  else startCamera();
}

function capturePhoto() {
  const video = document.getElementById('camera-feed');
  if (!video.videoWidth) {
    showToast('Ative a camera antes de capturar a foto.', 'error');
    return;
  }
  const canvas = document.getElementById('face-canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0);
  if (Object.keys(overlayCanvases).length) {
    const landmarks = faceLandmarker?.detectForVideo(video, performance.now()).faceLandmarks?.[0];
    if (landmarks) drawTrackedGlasses(context, landmarks, canvas.width, canvas.height);
  }
  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `oculos-${currentProduct?.id || 'vanglauss'}.png`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Foto capturada!', 'success');
  }, 'image/png');
}

function openWhatsApp() {
  const message = 'Ola! Tenho interesse nos oculos da Otica Vanglauss.';
  window.open(`https://wa.me/${CONFIG.whatsappPhone}?text=${encodeURIComponent(message)}`, '_blank');
}

function contactViasWhatsApp() {
  const message = currentProduct ? `Tenho interesse no modelo "${currentProduct.nome}".` : 'Ola! Tenho interesse nos oculos da Otica Vanglauss.';
  window.open(`https://wa.me/${CONFIG.whatsappPhone}?text=${encodeURIComponent(message)}`, '_blank');
}

function openMaps() {
  window.open(CONFIG.mapsUrl, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  elementos.productSearch.addEventListener('input', () => renderProducts());
  elementos.categoryFilter.addEventListener('change', () => renderProducts());
  elementos.genderFilter.addEventListener('change', () => renderProducts());
  elementos.brandFilter.addEventListener('change', () => renderProducts());
  setupModalClosers();
  document.querySelectorAll('.hero-buttons button')[0]?.addEventListener('click', () => document.getElementById('oculos').scrollIntoView({ behavior: 'smooth' }));
  document.querySelectorAll('.hero-buttons button')[1]?.addEventListener('click', () => openTryOn());
  document.querySelector('.btn-highlight')?.addEventListener('click', () => openTryOn());
});
