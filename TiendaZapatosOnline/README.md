# 👟 ZapaShop — Tienda de Zapatos Online

Página web de venta de zapatos online construida con **HTML5, CSS3, JavaScript y Bootstrap 5**, con **catálogo dinámico, carrito de compras, modal de detalle por producto, validaciones y generación de factura**.

## ✨ Funcionalidades

### Catálogo
- **21 productos** en 6 categorías (deportivo, casual, formal, botas, sandalias, infantil)
- **Filtros dinámicos** por categoría con íconos
- **Buscador en vivo** por nombre o marca
- **Tarjetas interactivas** con badges de "NUEVO" y "OFERTA -%", calificación con estrellas, marca y precio anterior tachado
- **Efecto parallax 3D**: cada tarjeta se inclina siguiendo el cursor del mouse, con sombra dinámica y `perspective` CSS para sensación de profundidad
- **Botón "Vista rápida"** que aparece al pasar el mouse sobre cada tarjeta
- **Animación de entrada escalonada** para las tarjetas

### Modal de detalle de producto
- Imagen grande del producto **con efecto parallax 3D** (la imagen rota siguiendo el mouse con un brillo radial que la acompaña)
- Descripción completa, marca, categoría, rating y reseñas
- **Selector de tallas** clickeable
- **Selector de colores con vista previa en la imagen** (la foto se tiñe del color seleccionado mediante `mix-blend-mode`, el tinte rota junto con la imagen 3D)
- Selector de cantidad limitado por stock
- Validación que exige seleccionar talla y color antes de agregar al carrito

### Carrito de compras
- Offcanvas lateral de Bootstrap
- Muestra la **talla y color** seleccionados (con swatch del color)
- Items con diferente talla/color se cuentan por separado
- Aumentar / disminuir cantidades, vaciar carrito
- Cálculo automático de subtotal, IVA (19%) y total en pesos colombianos (COP)

### Generación de factura
- Modal con formulario de datos del cliente
- **Validaciones individuales por campo**:
  - Nombre: mínimo 3 caracteres, solo letras y espacios
  - Cédula/NIT: solo números, 6-15 dígitos (filtrado en tiempo real)
  - Correo: formato email válido
  - Dirección: mínimo 5 caracteres
- Mensajes de error específicos debajo de cada campo
- Bordes rojo/verde con íconos según validez
- Factura con número auto-generado, fecha y datos completos
- Botón **Imprimir / PDF** con CSS de impresión optimizado

### Diseño
- **Hero rediseñado** con badge promocional, estadísticas (20+ modelos, 10+ marcas, 24h envío) e imagen flotante animada
- **Sección de marcas** destacadas
- **4 cards de beneficios**: Envío rápido, Compra segura, Cambios fáciles, Soporte 24/7
- **100% responsive** (mobile, tablet, desktop)
- Gradientes, hover effects, transiciones suaves
- Favicon personalizado
- Toast de confirmación al agregar productos

## 🛠️ Tecnologías

| Tecnología | Uso |
|-----------|-----|
| HTML5 | Estructura semántica |
| CSS3 | Estilos personalizados, animaciones, `mix-blend-mode`, transformaciones 3D (`perspective`, `transform-style: preserve-3d`) |
| JavaScript (ES6) | Lógica de catálogo, filtros, carrito y factura |
| Bootstrap 5.3 | Grid, componentes (modal, offcanvas, toast, badges) |
| Bootstrap Icons | Iconografía |

## 📁 Estructura

```
tienda-zapatos/
├── index.html        # Página principal
├── css/
│   └── styles.css    # Estilos personalizados
├── js/
│   └── script.js     # Lógica de la tienda
├── img/
│   ├── Logo.png                    # Logo de ZapaShop
│   └── zapatos-para-correr.png     # Favicon e imagen del hero
├── vercel.json       # Configuración de despliegue
└── README.md
```

## 🚀 Ejecución local

No requiere instalación. Abre `index.html` en el navegador, o usa un servidor local:

```bash
# Con Python
python -m http.server 8000

# Con Node (npx)
npx serve
```

Luego abre [http://localhost:8000](http://localhost:8000) en tu navegador.

## 🌐 Despliegue en Vercel

1. Sube el proyecto a un repositorio en GitHub.
2. Entra a [vercel.com](https://vercel.com) e inicia sesión con GitHub.
3. Haz clic en **Add New → Project** e importa el repositorio.
4. Vercel detecta el sitio estático automáticamente → **Deploy**.
5. Obtendrás una URL pública (ej: `https://zapashop.vercel.app`).

## 🎮 Cómo usar

1. **Explora el catálogo**: usa los filtros por categoría o el buscador. Pasa el mouse sobre cualquier tarjeta para ver el efecto 3D.
2. **Ver detalles**: haz clic en cualquier tarjeta o en "Vista rápida" para abrir el modal con tallas, colores y descripción. Mueve el mouse sobre la imagen para verla en 3D.
3. **Personaliza**: selecciona talla y color (la imagen cambia de color en tiempo real, conservando la rotación 3D).
4. **Agrega al carrito**: el contador del navbar se actualiza automáticamente.
5. **Revisa el carrito**: clic en el botón **Carrito** del navbar para ver el resumen.
6. **Genera factura**: clic en "Generar factura", completa los datos del cliente y confirma la compra.
7. **Imprime o guarda como PDF**: usa el botón "Imprimir / PDF" después de generar la factura.

## 👤 Autor

Desarrollado por **Carlos Carrascal**
