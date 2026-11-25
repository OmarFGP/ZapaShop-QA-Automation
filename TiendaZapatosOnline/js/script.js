/* ====================================================
   ZapaShop - Lógica de la tienda
   Proyecto UDES - Curso de Bootstrap
   Funciones: catálogo, filtros, carrito y factura
   ==================================================== */

// -------- 1. BASE DE DATOS DE PRODUCTOS --------
const productos = [
  // DEPORTIVOS
  { id: 1, nombre: "Runner Pro X", marca: "Nike", categoria: "deportivo", precio: 289900, precioAnterior: 349900,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    descripcion: "Diseñadas para corredores exigentes. Suela con amortiguación responsiva, malla transpirable y peso ultraligero para máximo rendimiento en cada zancada.",
    tallas: [37, 38, 39, 40, 41, 42, 43], colores: ["Rojo", "Negro", "Blanco"], rating: 4.7, resenas: 128, stock: 12, oferta: true },

  { id: 2, nombre: "Air Classic", marca: "Adidas", categoria: "deportivo", precio: 349900,
    img: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80",
    descripcion: "Ícono atemporal con cámara de aire visible, cuero premium y diseño clásico. La fusión perfecta entre confort, tecnología y estilo urbano.",
    tallas: [38, 39, 40, 41, 42, 43, 44], colores: ["Blanco", "Negro"], rating: 4.8, resenas: 245, stock: 8, nuevo: true },

  { id: 5, nombre: "Boost Trainer", marca: "Adidas", categoria: "deportivo", precio: 319900,
    img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
    descripcion: "Tecnología Boost de rebote energético, ideal para entrenamientos diarios. Diseño moderno con upper Primeknit que se adapta al pie.",
    tallas: [38, 39, 40, 41, 42, 43], colores: ["Gris", "Negro", "Azul"], rating: 4.6, resenas: 89, stock: 20 },

  { id: 9, nombre: "Marathon Elite", marca: "Asics", categoria: "deportivo", precio: 459900,
    img: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
    descripcion: "El máximo rendimiento para maratonistas. Placa de carbono, espuma supercrítica y diseño aerodinámico. Tu mejor récord te está esperando.",
    tallas: [39, 40, 41, 42, 43, 44], colores: ["Naranja", "Negro"], rating: 4.9, resenas: 56, stock: 5, nuevo: true },

  { id: 10, nombre: "Track Speed", marca: "Puma", categoria: "deportivo", precio: 229900, precioAnterior: 279900,
    img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
    descripcion: "Velocidad pura en pista y calle. Suela de goma con tracción multidireccional, perfecta para entrenamientos cortos y explosivos.",
    tallas: [37, 38, 39, 40, 41, 42], colores: ["Verde", "Blanco"], rating: 4.4, resenas: 73, stock: 15, oferta: true },

  // CASUALES
  { id: 3, nombre: "Urban Sneaker", marca: "Vans", categoria: "casual", precio: 199900,
    img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
    descripcion: "El sneaker urbano por excelencia. Lona resistente, suela vulcanizada y un estilo que combina con todo tu guardarropa.",
    tallas: [36, 37, 38, 39, 40, 41, 42, 43], colores: ["Morado", "Negro", "Blanco"], rating: 4.5, resenas: 312, stock: 30 },

  { id: 6, nombre: "Canvas Daily", marca: "Converse", categoria: "casual", precio: 149900,
    img: "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?auto=format&fit=crop&w=800&q=80",
    descripcion: "Clásico inmortal. Caña baja, lona de algodón y comodidad para todo el día. El básico que no puede faltar en tu colección.",
    tallas: [36, 37, 38, 39, 40, 41, 42], colores: ["Amarillo", "Blanco", "Negro"], rating: 4.3, resenas: 198, stock: 25 },

  { id: 8, nombre: "Street Low", marca: "Nike", categoria: "casual", precio: 179900,
    img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    descripcion: "Sneaker de caña baja con diseño minimalista. Plantilla acolchada y suela de goma para uso diario sin sacrificar estilo.",
    tallas: [37, 38, 39, 40, 41, 42], colores: ["Blanco", "Beige"], rating: 4.4, resenas: 145, stock: 18 },

  { id: 11, nombre: "Court Classic", marca: "Tommy", categoria: "casual", precio: 269900,
    img: "https://images.unsplash.com/photo-1465479423260-c4afc24172c6?auto=format&fit=crop&w=800&q=80",
    descripcion: "Sneaker clásico de caña baja con suela vulcanizada. Cuero genuino y diseño limpio que combina con todo. Atemporal.",
    tallas: [38, 39, 40, 41, 42, 43], colores: ["Blanco", "Beige"], rating: 4.6, resenas: 87, stock: 10 },

  { id: 12, nombre: "Slip-on Sport", marca: "Skechers", categoria: "casual", precio: 159900,
    img: "https://images.unsplash.com/photo-1605408499391-6368c628ef42?auto=format&fit=crop&w=800&q=80",
    descripcion: "Sneaker negro de perfil bajo con tecnología de amortiguación. Plantilla memory foam y diseño moderno. Comodidad sin complicaciones.",
    tallas: [36, 37, 38, 39, 40, 41, 42], colores: ["Gris", "Negro"], rating: 4.5, resenas: 167, stock: 22, nuevo: true },

  // FORMALES
  { id: 4, nombre: "Oxford Elegance", marca: "Clarks", categoria: "formal", precio: 259900,
    img: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&w=800&q=80",
    descripcion: "Oxford de cuero genuino con acabado pulido. Detalles cosidos a mano y horma elegante. La opción ideal para ocasiones especiales.",
    tallas: [38, 39, 40, 41, 42, 43, 44], colores: ["Café", "Negro"], rating: 4.7, resenas: 92, stock: 14 },

  { id: 7, nombre: "Derby Premium", marca: "Hush Puppies", categoria: "formal", precio: 289900,
    img: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80",
    descripcion: "Estilo Derby con cuero italiano. Construcción Goodyear welt para durabilidad excepcional. Comodidad y elegancia en cada paso.",
    tallas: [38, 39, 40, 41, 42, 43], colores: ["Negro", "Café"], rating: 4.6, resenas: 64, stock: 9 },

  { id: 13, nombre: "Court Vintage", marca: "Nike", categoria: "casual", precio: 329900, precioAnterior: 399900,
    img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80",
    descripcion: "Sneaker icónico con paneles bicolor y silueta clásica de basketball. Cuero premium y cordones reforzados. Estilo de cancha en la calle.",
    tallas: [39, 40, 41, 42, 43], colores: ["Rojo", "Negro", "Blanco"], rating: 4.8, resenas: 41, stock: 6, oferta: true },

  { id: 14, nombre: "Air Force Premium", marca: "Adidas", categoria: "casual", precio: 309900,
    img: "https://images.unsplash.com/photo-1518894781321-630e638d0742?auto=format&fit=crop&w=800&q=80",
    descripcion: "Zapatilla de caña baja con tres rayas características. Cuero perforado y entresuela acolchada. Versatilidad pura para uso diario.",
    tallas: [38, 39, 40, 41, 42, 43, 44], colores: ["Blanco", "Negro"], rating: 4.5, resenas: 78, stock: 11 },

  // BOTAS
  { id: 15, nombre: "Combat Ranger", marca: "Timberland", categoria: "botas", precio: 419900,
    img: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?auto=format&fit=crop&w=800&q=80",
    descripcion: "Bota militar resistente. Cuero impermeable, suela de goma con tracción agresiva y cordones reforzados. Lista para cualquier aventura.",
    tallas: [39, 40, 41, 42, 43, 44], colores: ["Negro", "Café"], rating: 4.7, resenas: 134, stock: 17 },

  { id: 16, nombre: "Hiking Trail", marca: "Columbia", categoria: "botas", precio: 389900, precioAnterior: 449900,
    img: "https://images.unsplash.com/photo-1610398752800-146f269dfcc8?auto=format&fit=crop&w=800&q=80",
    descripcion: "Bota de senderismo todoterreno. Membrana impermeable, soporte de tobillo y plantilla de absorción de impactos. Conquista la montaña.",
    tallas: [38, 39, 40, 41, 42, 43, 44], colores: ["Beige", "Gris"], rating: 4.8, resenas: 102, stock: 13, oferta: true },

  { id: 17, nombre: "Chelsea Boot", marca: "Dr. Martens", categoria: "botas", precio: 359900,
    img: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80",
    descripcion: "Chelsea Boot con elásticos laterales y tracción dual. Cuero suave que se adapta al pie. Versatilidad y rebeldía en una sola pieza.",
    tallas: [37, 38, 39, 40, 41, 42, 43], colores: ["Negro", "Café"], rating: 4.9, resenas: 187, stock: 8, nuevo: true },

  // SANDALIAS
  { id: 18, nombre: "Beach Slide", marca: "Havaianas", categoria: "sandalias", precio: 89900,
    img: "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=800&q=80",
    descripcion: "Sandalia tipo slide ultraligera. Plantilla anatómica y suela antideslizante. Perfecta para piscina, playa y casa.",
    tallas: [36, 37, 38, 39, 40, 41, 42], colores: ["Azul", "Negro", "Rosa"], rating: 4.3, resenas: 256, stock: 50 },

  { id: 19, nombre: "Platform Slide", marca: "Teva", categoria: "sandalias", precio: 169900,
    img: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=800&q=80",
    descripcion: "Sandalia de plataforma con tiras ajustables. Plantilla acolchada y suela técnica. Estilo moderno para verano.",
    tallas: [37, 38, 39, 40, 41, 42], colores: ["Rojo", "Negro"], rating: 4.5, resenas: 94, stock: 21 },

  // INFANTIL
  { id: 20, nombre: "Kids Runner", marca: "Nike", categoria: "infantil", precio: 129900,
    img: "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?auto=format&fit=crop&w=800&q=80",
    descripcion: "Zapatilla infantil con cierre fácil y suela flexible. Diseño colorido pensado para niños activos. Disponible en tallas de 25 a 35.",
    tallas: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], colores: ["Azul", "Rosa", "Verde"], rating: 4.7, resenas: 178, stock: 35 },

  { id: 21, nombre: "Kids Velcro", marca: "Adidas", categoria: "infantil", precio: 109900,
    img: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=800&q=80",
    descripcion: "Tenis con velcro para los más pequeños. Material transpirable, plantilla acolchada y diseño divertido. Comodidad para jugar todo el día.",
    tallas: [24, 25, 26, 27, 28, 29, 30, 31, 32], colores: ["Rojo", "Azul"], rating: 4.6, resenas: 142, stock: 28, nuevo: true },
];

// Categorías disponibles con su ícono y etiqueta
const categorias = [
  { key: "todos",      label: "Todos",       icono: "bi-grid-3x3-gap-fill" },
  { key: "deportivo",  label: "Deportivos",  icono: "bi-lightning-charge-fill" },
  { key: "casual",     label: "Casuales",    icono: "bi-emoji-smile-fill" },
  { key: "formal",     label: "Formales",    icono: "bi-briefcase-fill" },
  { key: "botas",      label: "Botas",       icono: "bi-tree-fill" },
  { key: "sandalias",  label: "Sandalias",   icono: "bi-sun-fill" },
  { key: "infantil",   label: "Infantil",    icono: "bi-balloon-heart-fill" },
];

// -------- 2. ESTADO DEL CARRITO --------
let carrito = []; // cada item: { id, nombre, precio, img, cantidad }
const IVA = 0.19; // 19% Colombia

// -------- 3. UTILIDADES --------
// Formatea un número como pesos colombianos: "$ 289.900 COP"
const formatoCOP = (valor) => {
  const numero = new Intl.NumberFormat("es-CO", { minimumFractionDigits: 0 }).format(valor);
  return `$ ${numero} COP`;
};

// Muestra un toast de Bootstrap con un mensaje
function mostrarToast(mensaje) {
  document.getElementById("toastTexto").textContent = mensaje;
  const toast = new bootstrap.Toast(document.getElementById("toastAviso"), { delay: 1800 });
  toast.show();
}

// Genera HTML de estrellas para un rating (0-5)
function estrellasHTML(rating) {
  const enteras = Math.floor(rating);
  const media = rating - enteras >= 0.5;
  let html = "";
  for (let i = 0; i < 5; i++) {
    if (i < enteras) html += '<i class="bi bi-star-fill"></i>';
    else if (i === enteras && media) html += '<i class="bi bi-star-half"></i>';
    else html += '<i class="bi bi-star"></i>';
  }
  return html;
}

// Imagen de fallback en caso de que la URL falle (muestra el nombre del producto)
const FALLBACK_IMG = (nombre = "ZapaShop") =>
  `https://placehold.co/600x600/1a1a2e/ffc107?text=${encodeURIComponent(nombre)}`;
const FALLBACK_THUMB = "https://placehold.co/56x56/1a1a2e/ffc107?text=Z";

// Mapeo de nombres de color a códigos hex para los swatches
const COLORES = {
  "Rojo":    "#dc3545",
  "Negro":   "#1a1a1a",
  "Blanco":  "#f8f9fa",
  "Azul":    "#0d6efd",
  "Verde":   "#198754",
  "Amarillo":"#ffc107",
  "Gris":    "#6c757d",
  "Café":    "#795548",
  "Beige":   "#d2b48c",
  "Naranja": "#fd7e14",
  "Morado":  "#6f42c1",
  "Rosa":    "#e83e8c",
  "Vino":    "#722f37",
};

// -------- 4. RENDERIZAR FILTROS DINÁMICAMENTE --------
function renderFiltros() {
  const cont = document.getElementById("filtros");
  cont.innerHTML = categorias.map((c, i) => `
    <button class="btn btn-sm filtro-btn ${i === 0 ? "active btn-dark" : "btn-outline-dark"}"
            data-categoria="${c.key}">
      <i class="bi ${c.icono} me-1"></i>${c.label}
    </button>`).join("");
}

// -------- 5. RENDERIZAR CATÁLOGO --------
function renderProductos(categoria = "todos", busqueda = "") {
  const contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = "";

  const termino = busqueda.toLowerCase().trim();
  const lista = productos.filter((p) => {
    const okCat = categoria === "todos" || p.categoria === categoria;
    const okBusca = !termino ||
      p.nombre.toLowerCase().includes(termino) ||
      p.marca.toLowerCase().includes(termino);
    return okCat && okBusca;
  });

  if (lista.length === 0) {
    contenedor.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="bi bi-search display-3 text-muted"></i>
        <p class="mt-3 text-muted">No encontramos productos con esos criterios.</p>
      </div>`;
    return;
  }

  lista.forEach((p) => {
    const tieneOferta = p.oferta && p.precioAnterior;
    const descuento = tieneOferta ? Math.round((1 - p.precio / p.precioAnterior) * 100) : 0;
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4 col-xl-3";
    col.innerHTML = `
      <div class="card card-producto h-100" onclick="abrirDetalle(${p.id})" role="button">
        <div class="img-wrapper position-relative">
          ${p.nuevo ? '<span class="badge-producto badge-nuevo"><i class="bi bi-stars me-1"></i>NUEVO</span>' : ""}
          ${tieneOferta ? `<span class="badge-producto badge-oferta">-${descuento}%</span>` : ""}
          <div class="img-tilt-card">
            <img src="${p.img}" alt="${p.nombre}" loading="lazy"
                 onerror="this.onerror=null;this.src='${FALLBACK_IMG(p.nombre)}'">
          </div>
          <button class="btn-vista-rapida" onclick="event.stopPropagation();abrirDetalle(${p.id})">
            <i class="bi bi-eye me-1"></i>Vista rápida
          </button>
        </div>
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge bg-light text-dark badge-categoria">${p.categoria}</span>
            <small class="text-muted">${p.marca}</small>
          </div>
          <h5 class="card-title mb-1">${p.nombre}</h5>
          <div class="rating small mb-2">
            ${estrellasHTML(p.rating)}
            <span class="text-muted ms-1">(${p.resenas})</span>
          </div>
          <div class="mt-auto">
            <div class="d-flex align-items-baseline gap-2 mb-2">
              <span class="precio">${formatoCOP(p.precio)}</span>
              ${tieneOferta ? `<span class="precio-anterior small">${formatoCOP(p.precioAnterior)}</span>` : ""}
            </div>
            <button class="btn btn-dark w-100" onclick="event.stopPropagation();agregarAlCarrito(${p.id})">
              <i class="bi bi-cart-plus me-1"></i>Agregar al carrito
            </button>
          </div>
        </div>
      </div>`;
    contenedor.appendChild(col);
  });
}

// Estado del filtro activo
let filtroActivo = "todos";
let busquedaActiva = "";

// -------- Parallax 3D para las tarjetas del catálogo (delegado) --------
let tiltActualCard = null;
const contenedorProds = document.getElementById("contenedorProductos");
contenedorProds.addEventListener("mousemove", (e) => {
  const wrapper = e.target.closest(".card-producto .img-wrapper");
  if (!wrapper) {
    if (tiltActualCard) { tiltActualCard.style.transform = ""; tiltActualCard = null; }
    return;
  }
  const tilt = wrapper.querySelector(".img-tilt-card");
  if (!tilt) return;
  if (tiltActualCard && tiltActualCard !== tilt) tiltActualCard.style.transform = "";
  tiltActualCard = tilt;
  const rect = wrapper.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const rotateY = ((x - cx) / cx) * 10;
  const rotateX = -((y - cy) / cy) * 10;
  tilt.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
});
contenedorProds.addEventListener("mouseleave", () => {
  if (tiltActualCard) { tiltActualCard.style.transform = ""; tiltActualCard = null; }
});

// -------- 6. FILTROS POR CATEGORÍA --------
document.getElementById("filtros").addEventListener("click", (e) => {
  const btn = e.target.closest(".filtro-btn");
  if (!btn) return;
  document.querySelectorAll(".filtro-btn").forEach((b) => {
    b.classList.remove("active", "btn-dark");
    b.classList.add("btn-outline-dark");
  });
  btn.classList.add("active", "btn-dark");
  btn.classList.remove("btn-outline-dark");
  filtroActivo = btn.dataset.categoria;
  renderProductos(filtroActivo, busquedaActiva);
});

// Buscador
document.getElementById("inputBusqueda")?.addEventListener("input", (e) => {
  busquedaActiva = e.target.value;
  renderProductos(filtroActivo, busquedaActiva);
});

// -------- 7. MODAL DE DETALLE DEL PRODUCTO --------
let productoActual = null;
let tallaSeleccionada = null;
let colorSeleccionado = null;
let cantidadSeleccionada = 1;

function abrirDetalle(id) {
  const p = productos.find((x) => x.id === id);
  if (!p) return;
  productoActual = p;
  tallaSeleccionada = null;
  colorSeleccionado = null;
  cantidadSeleccionada = 1;

  const tieneOferta = p.oferta && p.precioAnterior;
  const descuento = tieneOferta ? Math.round((1 - p.precio / p.precioAnterior) * 100) : 0;

  document.getElementById("detalleContenido").innerHTML = `
    <div class="row g-4">
      <div class="col-md-6">
        <div class="detalle-img-wrapper" id="detalleImgWrapper">
          ${p.nuevo ? '<span class="badge-producto badge-nuevo"><i class="bi bi-stars me-1"></i>NUEVO</span>' : ""}
          ${tieneOferta ? `<span class="badge-producto badge-oferta">-${descuento}%</span>` : ""}
          <div class="img-tilt" id="detalleImgTilt">
            <img src="${p.img}" alt="${p.nombre}" id="detalleImg"
                 onerror="this.onerror=null;this.src='${FALLBACK_IMG(p.nombre)}'">
            <div class="color-overlay" id="colorOverlay"></div>
          </div>
          <div class="hint-3d"><i class="bi bi-arrows-move me-1"></i>Mueve el mouse para ver en 3D</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge bg-warning text-dark text-uppercase">${p.categoria}</span>
          <small class="text-muted"><i class="bi bi-tag-fill me-1"></i>${p.marca}</small>
        </div>
        <h3 class="fw-bold mb-2">${p.nombre}</h3>
        <div class="rating mb-3">
          ${estrellasHTML(p.rating)}
          <span class="text-muted ms-2">${p.rating} · ${p.resenas} reseñas</span>
        </div>
        <div class="d-flex align-items-baseline gap-2 mb-3">
          <span class="precio fs-3">${formatoCOP(p.precio)}</span>
          ${tieneOferta ? `<span class="precio-anterior">${formatoCOP(p.precioAnterior)}</span>` : ""}
        </div>
        <p class="text-muted">${p.descripcion}</p>

        <div class="mb-3">
          <strong class="d-block mb-2">Talla:</strong>
          <div class="d-flex flex-wrap gap-2" id="selectorTallas">
            ${p.tallas.map((t) => `
              <button type="button" class="btn-talla" data-talla="${t}">${t}</button>
            `).join("")}
          </div>
          <small class="text-danger d-none" id="errorTalla">
            <i class="bi bi-exclamation-circle me-1"></i>Selecciona una talla
          </small>
        </div>

        <div class="mb-3">
          <strong class="d-block mb-2">Color: <span id="colorActual" class="text-muted fw-normal">(elige uno)</span></strong>
          <div class="d-flex flex-wrap gap-2" id="selectorColores">
            ${p.colores.map((c) => `
              <button type="button" class="btn-color" data-color="${c}" title="${c}"
                      style="background-color: ${COLORES[c] || '#999'};">
                <i class="bi bi-check-lg"></i>
              </button>
            `).join("")}
          </div>
          <small class="text-danger d-none" id="errorColor">
            <i class="bi bi-exclamation-circle me-1"></i>Selecciona un color
          </small>
        </div>

        <div class="d-flex align-items-center gap-3 mb-3">
          <strong>Cantidad:</strong>
          <div class="btn-group" role="group">
            <button class="btn btn-outline-dark" id="cantMenos">-</button>
            <span class="btn btn-light disabled px-3" id="cantValor">1</span>
            <button class="btn btn-outline-dark" id="cantMas">+</button>
          </div>
          <small class="text-muted">${p.stock} disponibles</small>
        </div>

        <button class="btn btn-dark btn-lg w-100" id="btnAgregarDetalle">
          <i class="bi bi-cart-plus me-2"></i>Agregar al carrito
        </button>
      </div>
    </div>`;

  // Listeners de tallas
  document.querySelectorAll("#selectorTallas .btn-talla").forEach((b) => {
    b.addEventListener("click", () => {
      document.querySelectorAll("#selectorTallas .btn-talla").forEach((x) => x.classList.remove("activa"));
      b.classList.add("activa");
      tallaSeleccionada = b.dataset.talla;
      document.getElementById("errorTalla").classList.add("d-none");
    });
  });

  // Parallax 3D: rotar la imagen siguiendo el mouse
  const wrapperImg = document.getElementById("detalleImgWrapper");
  const tiltImg = document.getElementById("detalleImgTilt");
  if (wrapperImg && tiltImg) {
    wrapperImg.addEventListener("mousemove", (e) => {
      const rect = wrapperImg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateY = ((x - cx) / cx) * 14;   // máx 14°
      const rotateX = -((y - cy) / cy) * 14;
      tiltImg.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.03)`;
      wrapperImg.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
      wrapperImg.style.setProperty("--my", `${(y / rect.height) * 100}%`);
    });
    wrapperImg.addEventListener("mouseleave", () => {
      tiltImg.style.transform = "";
    });
  }

  // Listeners de colores
  document.querySelectorAll("#selectorColores .btn-color").forEach((b) => {
    b.addEventListener("click", () => {
      document.querySelectorAll("#selectorColores .btn-color").forEach((x) => x.classList.remove("activa"));
      b.classList.add("activa");
      colorSeleccionado = b.dataset.color;
      document.getElementById("colorActual").textContent = colorSeleccionado;
      document.getElementById("colorActual").classList.remove("text-muted");
      document.getElementById("errorColor").classList.add("d-none");

      // Teñir la imagen del zapato con el color seleccionado
      const overlay = document.getElementById("colorOverlay");
      const hex = COLORES[colorSeleccionado] || "#999";
      const tonosClaros = ["Blanco", "Beige", "Amarillo"];
      const tonosOscuros = ["Negro"];
      // Tonos extremos usan multiply (más suave); tonos vivos usan blend "color" (tinte fuerte)
      const usaMultiply = tonosClaros.includes(colorSeleccionado) || tonosOscuros.includes(colorSeleccionado);
      overlay.style.backgroundColor = hex;
      overlay.style.mixBlendMode = usaMultiply ? "multiply" : "color";
      overlay.style.opacity = usaMultiply ? "0.6" : "0.85";
    });
  });

  // Listeners de cantidad
  document.getElementById("cantMenos").addEventListener("click", () => {
    if (cantidadSeleccionada > 1) {
      cantidadSeleccionada--;
      document.getElementById("cantValor").textContent = cantidadSeleccionada;
    }
  });
  document.getElementById("cantMas").addEventListener("click", () => {
    if (cantidadSeleccionada < p.stock) {
      cantidadSeleccionada++;
      document.getElementById("cantValor").textContent = cantidadSeleccionada;
    }
  });

  // Agregar al carrito desde el detalle
  document.getElementById("btnAgregarDetalle").addEventListener("click", () => {
    let hayError = false;
    if (!tallaSeleccionada) {
      document.getElementById("errorTalla").classList.remove("d-none");
      hayError = true;
    }
    if (!colorSeleccionado) {
      document.getElementById("errorColor").classList.remove("d-none");
      hayError = true;
    }
    if (hayError) return;
    agregarAlCarrito(p.id, cantidadSeleccionada, tallaSeleccionada, colorSeleccionado);
    bootstrap.Modal.getInstance(document.getElementById("modalDetalle")).hide();
  });

  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("modalDetalle"));
  modal.show();
}

// -------- 8. AGREGAR / QUITAR DEL CARRITO --------
function agregarAlCarrito(id, cantidad = 1, talla = null, color = null) {
  const prod = productos.find((p) => p.id === id);
  // Identificamos items por id+talla+color para diferenciar variantes
  const claveItem = (i) => i.id === id &&
    (i.talla || null) === (talla || null) &&
    (i.color || null) === (color || null);
  const item = carrito.find(claveItem);
  if (item) {
    item.cantidad += cantidad;
  } else {
    carrito.push({ ...prod, cantidad, talla, color });
  }
  actualizarCarrito();
  const variante = [talla && `talla ${talla}`, color].filter(Boolean).join(", ");
  mostrarToast(`${prod.nombre}${variante ? ` (${variante})` : ""} agregado al carrito`);
}

function cambiarCantidad(id, delta, talla = null, color = null) {
  const claveItem = (i) => i.id === id &&
    (i.talla || null) === (talla || null) &&
    (i.color || null) === (color || null);
  const item = carrito.find(claveItem);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) {
    carrito = carrito.filter((i) => !claveItem(i));
  }
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

// -------- 7. ACTUALIZAR VISTA DEL CARRITO --------
function actualizarCarrito() {
  const cont = document.getElementById("itemsCarrito");
  const contador = document.getElementById("contadorCarrito");
  const btnFacturar = document.getElementById("btnFacturar");

  // Contador del navbar
  const totalItems = carrito.reduce((acc, i) => acc + i.cantidad, 0);
  contador.textContent = totalItems;

  // Lista de items
  if (carrito.length === 0) {
    cont.innerHTML = `
      <div class="carrito-vacio">
        <i class="bi bi-cart-x display-4"></i>
        <p class="mt-2">Tu carrito está vacío</p>
      </div>`;
    btnFacturar.disabled = true;
  } else {
    cont.innerHTML = carrito.map((i) => {
      const tallaArg = i.talla ? `'${i.talla}'` : "null";
      const colorArg = i.color ? `'${i.color}'` : "null";
      const variante = [
        i.talla && `<span class="me-2">Talla: <strong>${i.talla}</strong></span>`,
        i.color && `<span class="d-inline-flex align-items-center gap-1">Color: <span class="swatch-mini" style="background:${COLORES[i.color] || '#999'}"></span><strong>${i.color}</strong></span>`,
      ].filter(Boolean).join("");
      return `
      <div class="item-carrito">
        <img src="${i.img}" alt="${i.nombre}"
             onerror="this.onerror=null;this.src='${FALLBACK_THUMB}'">
        <div class="flex-grow-1">
          <div class="fw-semibold small">${i.nombre}</div>
          ${variante ? `<div class="text-muted small">${variante}</div>` : ""}
          <div class="text-success small fw-semibold">${formatoCOP(i.precio)}</div>
        </div>
        <div class="btn-group btn-group-sm" role="group">
          <button class="btn btn-outline-secondary" onclick="cambiarCantidad(${i.id}, -1, ${tallaArg}, ${colorArg})">-</button>
          <span class="btn btn-light disabled">${i.cantidad}</span>
          <button class="btn btn-outline-secondary" onclick="cambiarCantidad(${i.id}, 1, ${tallaArg}, ${colorArg})">+</button>
        </div>
      </div>`;
    }).join("");
    btnFacturar.disabled = false;
  }

  // Totales
  const subtotal = carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
  const iva = subtotal * IVA;
  document.getElementById("subtotalCarrito").textContent = formatoCOP(subtotal);
  document.getElementById("ivaCarrito").textContent = formatoCOP(iva);
  document.getElementById("totalCarrito").textContent = formatoCOP(subtotal + iva);
}

document.getElementById("btnVaciar").addEventListener("click", vaciarCarrito);

// -------- 8. ABRIR MODAL DE FACTURA (cerrando primero el offcanvas) --------
const carritoOffcanvasEl = document.getElementById("carritoOffcanvas");
const modalFacturaEl = document.getElementById("modalFactura");

document.getElementById("btnFacturar").addEventListener("click", () => {
  if (carrito.length === 0) return;

  const offcanvas = bootstrap.Offcanvas.getInstance(carritoOffcanvasEl);
  const modal = bootstrap.Modal.getOrCreateInstance(modalFacturaEl);

  // Si el offcanvas está abierto, esperar a que termine de cerrarse antes de abrir el modal
  if (offcanvas && carritoOffcanvasEl.classList.contains("show")) {
    carritoOffcanvasEl.addEventListener("hidden.bs.offcanvas", () => modal.show(), { once: true });
    offcanvas.hide();
  } else {
    modal.show();
  }
});

// -------- 9. VALIDACIONES POR CAMPO --------
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_SOLO_LETRAS = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

const validaciones = {
  clienteNombre: (v) => {
    if (!v) return "Ingresa el nombre completo del cliente.";
    if (v.length < 3) return "El nombre debe tener al menos 3 caracteres.";
    if (!REGEX_SOLO_LETRAS.test(v)) return "El nombre solo puede contener letras y espacios.";
    return null;
  },
  clienteCedula: (v) => {
    if (!v) return "Ingresa la cédula o NIT.";
    if (!/^\d+$/.test(v)) return "La cédula solo puede contener números.";
    if (v.length < 6) return "La cédula debe tener al menos 6 dígitos.";
    if (v.length > 15) return "La cédula no puede tener más de 15 dígitos.";
    return null;
  },
  clienteEmail: (v) => {
    if (!v) return "Ingresa el correo electrónico.";
    if (!REGEX_EMAIL.test(v)) return "El correo no tiene un formato válido (ej: nombre@correo.com).";
    return null;
  },
  clienteDireccion: (v) => {
    if (!v) return "Ingresa la dirección de envío.";
    if (v.length < 5) return "La dirección debe tener al menos 5 caracteres.";
    return null;
  },
};

const erroresPorCampo = {
  clienteNombre: "errorNombre",
  clienteCedula: "errorCedula",
  clienteEmail: "errorEmail",
  clienteDireccion: "errorDireccion",
};

// Validación en vivo: al escribir, limpia el error si ya está OK
Object.keys(validaciones).forEach((idCampo) => {
  const input = document.getElementById(idCampo);
  input?.addEventListener("input", () => {
    const err = validaciones[idCampo](input.value.trim());
    if (!err) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      document.getElementById(erroresPorCampo[idCampo]).textContent = "";
    } else {
      // Solo limpiar el mensaje sin marcar inválido mientras escribe la primera vez
      if (input.classList.contains("is-invalid")) {
        document.getElementById(erroresPorCampo[idCampo]).textContent = err;
      }
    }
  });
});

// -------- 10. GENERAR FACTURA --------
document.getElementById("btnConfirmarFactura").addEventListener("click", () => {
  const nombre = document.getElementById("clienteNombre").value.trim();
  const cedula = document.getElementById("clienteCedula").value.trim();
  const email = document.getElementById("clienteEmail").value.trim();
  const direccion = document.getElementById("clienteDireccion").value.trim();
  const errorGeneral = document.getElementById("errorFormulario");

  // Validar todos los campos
  let hayError = false;
  const valores = { clienteNombre: nombre, clienteCedula: cedula, clienteEmail: email, clienteDireccion: direccion };
  for (const [idCampo, valor] of Object.entries(valores)) {
    const input = document.getElementById(idCampo);
    const err = validaciones[idCampo](valor);
    const errEl = document.getElementById(erroresPorCampo[idCampo]);
    if (err) {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      errEl.textContent = err;
      hayError = true;
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      errEl.textContent = "";
    }
  }

  if (hayError) {
    errorGeneral.classList.remove("d-none");
    return;
  }
  errorGeneral.classList.add("d-none");

  // Cálculos
  const subtotal = carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
  const iva = subtotal * IVA;
  const total = subtotal + iva;
  const numFactura = "FV-" + Date.now().toString().slice(-6);
  const fecha = new Date().toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" });

  // Filas de la tabla
  const filas = carrito.map((i) => `
    <tr>
      <td>${i.nombre}</td>
      <td class="text-center">${i.cantidad}</td>
      <td class="text-end">${formatoCOP(i.precio)}</td>
      <td class="text-end">${formatoCOP(i.precio * i.cantidad)}</td>
    </tr>`).join("");

  // HTML de la factura
  document.getElementById("seccionFactura").innerHTML = `
    <div class="factura-header d-flex justify-content-between align-items-start pb-3 mb-3">
      <div>
        <h4 class="fw-bold mb-0">ZapaShop</h4>
        <small class="text-muted">NIT 900.123.456-7 · Bucaramanga, Colombia</small>
      </div>
      <div class="text-end">
        <div class="fw-bold">FACTURA</div>
        <div class="small">N° ${numFactura}</div>
        <div class="small text-muted">${fecha}</div>
      </div>
    </div>

    <div class="row small mb-3">
      <div class="col-6">
        <strong>Cliente:</strong> ${nombre}<br>
        <strong>C.C/NIT:</strong> ${cedula}
      </div>
      <div class="col-6">
        <strong>Correo:</strong> ${email}<br>
        <strong>Dirección:</strong> ${direccion}
      </div>
    </div>

    <table class="table table-bordered table-sm">
      <thead class="table-dark">
        <tr>
          <th>Producto</th>
          <th class="text-center">Cant.</th>
          <th class="text-end">Precio unit.</th>
          <th class="text-end">Subtotal</th>
        </tr>
      </thead>
      <tbody>${filas}</tbody>
      <tfoot>
        <tr><td colspan="3" class="text-end">Subtotal</td><td class="text-end">${formatoCOP(subtotal)}</td></tr>
        <tr><td colspan="3" class="text-end">IVA (19%)</td><td class="text-end">${formatoCOP(iva)}</td></tr>
        <tr class="table-success fw-bold">
          <td colspan="3" class="text-end">TOTAL A PAGAR</td>
          <td class="text-end">${formatoCOP(total)}</td>
        </tr>
      </tfoot>
    </table>

    <p class="text-center text-muted small mt-4 mb-0">
      ¡Gracias por tu compra! · ZapaShop © 2026
    </p>`;

  // Cambiar la vista: ocultar formulario, mostrar factura
  document.getElementById("seccionFormulario").classList.add("d-none");
  document.getElementById("seccionFactura").classList.remove("d-none");
  document.getElementById("btnConfirmarFactura").classList.add("d-none");
  document.getElementById("btnImprimir").classList.remove("d-none");
});

// -------- 11. REINICIAR EL MODAL AL CERRARLO --------
modalFacturaEl.addEventListener("hidden.bs.modal", () => {
  // Si la compra se confirmó (factura visible), vaciar el carrito al cerrar
  const facturaVisible = !document.getElementById("seccionFactura").classList.contains("d-none");
  const camposCliente = ["clienteNombre", "clienteCedula", "clienteEmail", "clienteDireccion"];
  if (facturaVisible) {
    vaciarCarrito();
    // Limpiar formulario
    camposCliente.forEach((id) => (document.getElementById(id).value = ""));
    mostrarToast("¡Compra registrada con éxito!");
  }
  // Limpiar clases de validación y mensajes de error de cada campo
  camposCliente.forEach((id) => {
    const input = document.getElementById(id);
    input.classList.remove("is-invalid", "is-valid");
    const errEl = document.getElementById(erroresPorCampo[id]);
    if (errEl) errEl.textContent = "";
  });
  // Restaurar vista de formulario para la próxima compra
  document.getElementById("seccionFormulario").classList.remove("d-none");
  document.getElementById("seccionFactura").classList.add("d-none");
  document.getElementById("btnConfirmarFactura").classList.remove("d-none");
  document.getElementById("btnImprimir").classList.add("d-none");
  document.getElementById("errorFormulario").classList.add("d-none");

  // Limpieza defensiva: eliminar cualquier backdrop residual y restaurar el scroll
  document.querySelectorAll(".modal-backdrop, .offcanvas-backdrop").forEach((b) => b.remove());
  document.body.classList.remove("modal-open", "offcanvas-open");
  document.body.style.removeProperty("overflow");
  document.body.style.removeProperty("padding-right");
});

// -------- 12. INICIALIZAR --------
renderFiltros();
renderProductos();
actualizarCarrito();

