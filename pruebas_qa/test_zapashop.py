import re
import time
import random
import string
import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

URL_TIENDA = "http://localhost:8000/TiendaZapatosOnline/"

def clic_seguro(driver, elemento):
    driver.execute_script("arguments[0].scrollIntoView({block: 'center', behavior: 'instant'});", elemento)
    time.sleep(0.15)
    elemento.click()

def limpiar_y_escribir(elemento, texto):
    elemento.send_keys(Keys.CONTROL + "a")
    elemento.send_keys(Keys.BACKSPACE)
    if texto:
        elemento.send_keys(texto)

def extraer_pesos(texto):
    """Convierte '$ 289.900 COP' -> 289900"""
    digitos = re.sub(r"\D", "", texto)
    return int(digitos) if digitos else 0

def asegurar_carrito_vacio(driver):
    """Limpia el estado del carrito y fuerza el cierre inmediato de modales/offcanvas y backdrops."""
    driver.execute_script("""
        if (typeof vaciarCarrito === 'function') vaciarCarrito();
        document.querySelectorAll('.modal').forEach(m => {
            const inst = bootstrap.Modal.getInstance(m);
            if (inst) inst.hide();
            m.classList.remove('show');
            m.style.display = 'none';
        });
        document.querySelectorAll('.offcanvas').forEach(o => {
            const inst = bootstrap.Offcanvas.getInstance(o);
            if (inst) inst.hide();
            o.classList.remove('show');
        });
        document.querySelectorAll('.modal-backdrop, .offcanvas-backdrop').forEach(b => b.remove());
        document.body.classList.remove('modal-open', 'offcanvas-open');
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('padding-right');
    """)
    time.sleep(0.2)


# ==============================================================================
# CATEGORÍA 1: FLUJO FELIZ, REGLAS DE NEGOCIO Y CÁLCULOS FINANCIEROS (20 PRUEBAS)
# ==============================================================================

@pytest.fixture(scope="module")
def sesion_flujo_feliz(driver_sesion):
    driver_sesion.get(URL_TIENDA)
    WebDriverWait(driver_sesion, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "card-producto")))
    return driver_sesion


@pytest.mark.parametrize("talla1,color1,talla2,color2,items_esperados", [
    ("39", "Rojo", "40", "Rojo", 2),
    ("40", "Negro", "40", "Blanco", 2),
    ("38", "Rojo", "38", "Rojo", 1),   # Misma variante debe agruparse en 1 fila con cantidad 2
    ("41", "Blanco", "42", "Negro", 2),
    ("37", "Negro", "43", "Rojo", 2),
])
def test_CAT1_variantes_carrito(sesion_flujo_feliz, talla1, color1, talla2, color2, items_esperados):
    """CAT-1 (Flujo Feliz - Variantes): Verificar agrupación o separación de ítems según talla y color."""
    driver = sesion_flujo_feliz
    wait = WebDriverWait(driver, 10)
    asegurar_carrito_vacio(driver)

    for talla, color in [(talla1, color1), (talla2, color2)]:
        tarjeta = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".card-producto")))
        clic_seguro(driver, tarjeta)
        wait.until(EC.visibility_of_element_located((By.ID, "modalDetalle")))
        clic_seguro(driver, wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, f'.btn-talla[data-talla="{talla}"]'))))
        clic_seguro(driver, driver.find_element(By.CSS_SELECTOR, f'.btn-color[data-color="{color}"]'))
        clic_seguro(driver, driver.find_element(By.ID, "btnAgregarDetalle"))
        wait.until(EC.invisibility_of_element_located((By.ID, "modalDetalle")))

    assert driver.find_element(By.ID, "contadorCarrito").text == "2"
    clic_seguro(driver, driver.find_element(By.CSS_SELECTOR, '[data-bs-target="#carritoOffcanvas"]'))
    wait.until(EC.visibility_of_element_located((By.ID, "carritoOffcanvas")))
    time.sleep(0.2)

    filas_carrito = driver.find_elements(By.CLASS_NAME, "item-carrito")
    assert len(filas_carrito) == items_esperados, f"Se esperaban {items_esperados} filas en carrito, hay {len(filas_carrito)}"


@pytest.mark.parametrize("indices_productos", [
    [0],
    [0, 1],
    [2, 5, 8],
    [1, 1, 3],
    [4, 10, 14, 17],
    [0, 3, 6, 9, 12],
    [7, 15],
    [11, 18, 20],
    [19, 19, 19],
    [0, 5, 10, 15, 20],
])
def test_CAT1_matematica_iva_y_totales(sesion_flujo_feliz, indices_productos):
    """CAT-1 (Flujo Feliz - Finanzas): Comprobar cálculo exacto de Subtotal, IVA (19%) y Total en COP."""
    driver = sesion_flujo_feliz
    wait = WebDriverWait(driver, 10)
    asegurar_carrito_vacio(driver)

    botones_agregar = driver.find_elements(By.CSS_SELECTOR, ".card-producto .btn-dark")
    for idx in indices_productos:
        clic_seguro(driver, botones_agregar[idx])

    clic_seguro(driver, driver.find_element(By.CSS_SELECTOR, '[data-bs-target="#carritoOffcanvas"]'))
    wait.until(EC.visibility_of_element_located((By.ID, "carritoOffcanvas")))
    time.sleep(0.2)

    subtotal = extraer_pesos(driver.find_element(By.ID, "subtotalCarrito").text)
    iva = extraer_pesos(driver.find_element(By.ID, "ivaCarrito").text)
    total = extraer_pesos(driver.find_element(By.ID, "totalCarrito").text)

    assert subtotal > 0
    assert iva == round(subtotal * 0.19), f"IVA incorrecto: {iva} != {round(subtotal * 0.19)}"
    assert total == subtotal + iva, f"Total incorrecto: {total} != {subtotal + iva}"


@pytest.mark.parametrize("cliente,cedula,correo,direccion,cant_productos", [
    ("Carlos Mendoza", "1098765432", "carlos@correo.com", "Calle 45 # 12-34", 1),
    ("María Fernanda Ruiz", "52987412", "mafe.ruiz@udes.edu.co", "Carrera 27 # 10-50 Apto 301", 2),
    ("José Ángel Peña", "1005487963", "jose.pena@empresa.co", "Av. González Valencia # 54-12", 3),
    ("Sofía Álvarez Muñoz", "123456", "sofia@dominio.com", "Diagonal 15 # 40-20", 1),
    ("Andrés Felipe Gómez", "900123456789", "andres.gomez@outlook.es", "Transversal 93 # 120-05", 2),
])
def test_CAT1_compra_e2e_completa(sesion_flujo_feliz, cliente, cedula, correo, direccion, cant_productos):
    """CAT-1 (Flujo Feliz - E2E): Compra completa hasta generación de factura y limpieza de carrito."""
    driver = sesion_flujo_feliz
    wait = WebDriverWait(driver, 10)
    asegurar_carrito_vacio(driver)

    botones = driver.find_elements(By.CSS_SELECTOR, ".card-producto .btn-dark")
    for i in range(cant_productos):
        clic_seguro(driver, botones[i])

    clic_seguro(driver, driver.find_element(By.CSS_SELECTOR, '[data-bs-target="#carritoOffcanvas"]'))
    wait.until(EC.visibility_of_element_located((By.ID, "carritoOffcanvas")))
    time.sleep(0.3)

    wait.until(EC.element_to_be_clickable((By.ID, "btnFacturar"))).click()
    wait.until(EC.visibility_of_element_located((By.ID, "modalFactura")))
    time.sleep(0.3)

    driver.find_element(By.ID, "clienteNombre").send_keys(cliente)
    driver.find_element(By.ID, "clienteCedula").send_keys(cedula)
    driver.find_element(By.ID, "clienteEmail").send_keys(correo)
    driver.find_element(By.ID, "clienteDireccion").send_keys(direccion)
    driver.find_element(By.ID, "btnConfirmarFactura").click()

    factura = wait.until(EC.visibility_of_element_located((By.ID, "seccionFactura")))
    texto_factura = factura.text
    assert "FACTURA" in texto_factura and "FV-" in texto_factura
    assert cliente in texto_factura and cedula in texto_factura


# ==============================================================================
# CATEGORÍA 2: PRUEBAS NEGATIVAS, STOCK, LÍMITES Y FUZZING (50 PRUEBAS)
# ==============================================================================

@pytest.fixture(scope="module")
def sesion_negativas(driver_sesion):
    driver_sesion.get(URL_TIENDA)
    WebDriverWait(driver_sesion, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "card-producto")))
    return driver_sesion


@pytest.mark.parametrize("elegir_talla,elegir_color,espera_err_talla,espera_err_color", [
    (False, False, True, True),
    (True, False, False, True),
    (False, True, True, False),
    (False, False, True, True),
    (True, False, False, True),
])
def test_CAT2_bloqueo_sin_variantes(sesion_negativas, elegir_talla, elegir_color, espera_err_talla, espera_err_color):
    """CAT-2 (Negativa - Variantes): Impedir agregar al carrito desde detalle si falta talla o color."""
    driver = sesion_negativas
    wait = WebDriverWait(driver, 10)
    asegurar_carrito_vacio(driver)

    clic_seguro(driver, driver.find_element(By.CSS_SELECTOR, ".card-producto"))
    wait.until(EC.visibility_of_element_located((By.ID, "modalDetalle")))

    if elegir_talla:
        clic_seguro(driver, driver.find_element(By.CSS_SELECTOR, "#selectorTallas .btn-talla"))
    if elegir_color:
        clic_seguro(driver, driver.find_element(By.CSS_SELECTOR, "#selectorColores .btn-color"))

    clic_seguro(driver, driver.find_element(By.ID, "btnAgregarDetalle"))
    time.sleep(0.2)

    err_talla_visible = "d-none" not in driver.find_element(By.ID, "errorTalla").get_attribute("class")
    err_color_visible = "d-none" not in driver.find_element(By.ID, "errorColor").get_attribute("class")

    assert err_talla_visible == espera_err_talla
    assert err_color_visible == espera_err_color
    assert driver.find_element(By.ID, "contadorCarrito").text == "0"


@pytest.mark.parametrize("clics_menos,clics_mas,cantidad_esperada", [
    (5, 0, 1),    # No debe bajar de 1
    (1, 0, 1),
    (0, 20, 12),  # Producto 1 tiene stock = 12, no debe pasarse
    (0, 15, 12),
    (2, 3, 4),
])
def test_CAT2_topes_stock_detalle(sesion_negativas, clics_menos, clics_mas, cantidad_esperada):
    """CAT-2 (Negativa - Límites Stock): Verificar que el selector de cantidad respete mínimo 1 y stock máximo."""
    driver = sesion_negativas
    wait = WebDriverWait(driver, 10)
    asegurar_carrito_vacio(driver)

    clic_seguro(driver, driver.find_element(By.CSS_SELECTOR, ".card-producto"))
    wait.until(EC.visibility_of_element_located((By.ID, "modalDetalle")))

    for _ in range(clics_menos):
        driver.find_element(By.ID, "cantMenos").click()
    for _ in range(clics_mas):
        driver.find_element(By.ID, "cantMas").click()

    valor = int(driver.find_element(By.ID, "cantValor").text)
    assert valor == cantidad_esperada, f"Cantidad esperada: {cantidad_esperada}, obtenida: {valor}"


def generar_40_casos_fuzzing_factura():
    random.seed(2026)
    casos = []

    # 10 Casos de Valores Límite (Boundary Value Analysis)
    limites = [
        ("Ab", "123456", "a@b.co", "Calle 123", False, "BVA_nombre_2_chars"),
        ("Abc", "12345", "a@b.co", "Calle 123", False, "BVA_cedula_5_digitos"),
        ("Abc", "123456", "a@b.co", "Dir1", False, "BVA_direccion_4_chars"),
        ("Ana", "123456", "test@dominio.com", "Calle 10", True, "BVA_minimos_validos"),
        ("A" * 60, "1" * 15, "largo@dominio.com", "D" * 100, True, "BVA_maximos_validos"),
        ("   ", "123456", "test@dominio.com", "Calle 10 # 20", False, "BVA_nombre_espacios"),
        ("Juan Perez", "      ", "test@dominio.com", "Calle 10 # 20", False, "BVA_cedula_espacios"),
        ("Juan Perez", "123456", "test@dominio.com", "    ", False, "BVA_direccion_espacios"),
        ("", "", "", "", False, "BVA_todos_vacios"),
        ("Juan Perez", "000000", "a@b.c", "Calle 1", True, "BVA_ceros_validos"),
    ]
    for idx, (n, c, e, d, esp, tag) in enumerate(limites, start=1):
        casos.append(pytest.param(n, c, e, d, esp, id=f"fuzz_{idx:02d}_{tag}"))

    # 15 Casos Negativos y de Sanitización Automática (Inyecciones, formatos rotos, filtros oninput)
    negativos = [
        ("Juan123", "1098765432", "juan@mail.com", "Calle 10 # 20", False, "NEG_nombre_numeros"),
        ("Carlos@Perez", "1098765432", "carlos@mail.com", "Calle 10 # 20", False, "NEG_nombre_simbolo"),
        ("<script>alert(1)</script>", "1098765432", "xss@mail.com", "Calle 10 # 20", False, "NEG_xss_nombre"),
        ("' OR '1'='1", "1098765432", "sql@mail.com", "Calle 10 # 20", False, "NEG_sqli_nombre"),
        ("Pedro Gómez", "abcdef", "pedro@mail.com", "Calle 10 # 20", False, "NEG_cedula_letras"),
        ("Pedro Gómez", "123abc", "pedro@mail.com", "Calle 10 # 20", False, "NEG_cedula_mixta"),
        ("Pedro Gómez", "-1098765", "pedro@mail.com", "Calle 10 # 20", True, "SAN_cedula_signo_filtrado"),
        ("Pedro Gómez", "1098.765", "pedro@mail.com", "Calle 10 # 20", True, "SAN_cedula_punto_filtrado"),
        ("Pedro Gómez", "1098765432", "pedromail.com", "Calle 10 # 20", False, "NEG_email_sin_arroba"),
        ("Pedro Gómez", "1098765432", "pedro@", "Calle 10 # 20", False, "NEG_email_sin_dominio"),
        ("Pedro Gómez", "1098765432", "@mail.com", "Calle 10 # 20", False, "NEG_email_sin_usuario"),
        ("Pedro Gómez", "1098765432", "pedro@mail", "Calle 10 # 20", False, "NEG_email_sin_tld"),
        ("Pedro Gómez", "1098765432", "pedro @mail.com", "Calle 10 # 20", False, "NEG_email_espacio"),
        ("Pedro Gómez", "1098765432", "pedro@@mail.com", "Calle 10 # 20", False, "NEG_email_doble_arroba"),
        ("Pedro Gómez", "1098765432", "pedro@mail.com", "123", False, "NEG_direccion_corta"),
    ]
    for idx, (n, c, e, d, esp, tag) in enumerate(negativos, start=11):
        casos.append(pytest.param(n, c, e, d, esp, id=f"fuzz_{idx:02d}_{tag}"))

    # 15 Casos de Fuzzing Aleatorio Caótico
    for idx in range(26, 41):
        caos_n = "".join(random.choices(string.ascii_letters + string.digits + "!@#$%", k=10))
        caos_c = "".join(random.choices(string.ascii_lowercase + string.punctuation, k=8))
        caos_e = "".join(random.choices(string.ascii_lowercase, k=8))
        caos_d = "".join(random.choices(string.ascii_letters, k=3))
        casos.append(pytest.param(caos_n, caos_c, caos_e, caos_d, False, id=f"fuzz_{idx:02d}_caos_aleatorio"))

    return casos


@pytest.fixture(scope="module")
def modal_factura_listo(sesion_negativas):
    wait = WebDriverWait(sesion_negativas, 10)
    asegurar_carrito_vacio(sesion_negativas)
    clic_seguro(sesion_negativas, sesion_negativas.find_element(By.CSS_SELECTOR, ".card-producto .btn-dark"))
    clic_seguro(sesion_negativas, sesion_negativas.find_element(By.CSS_SELECTOR, '[data-bs-target="#carritoOffcanvas"]'))
    wait.until(EC.visibility_of_element_located((By.ID, "carritoOffcanvas")))
    time.sleep(0.3)
    wait.until(EC.element_to_be_clickable((By.ID, "btnFacturar"))).click()
    wait.until(EC.visibility_of_element_located((By.ID, "modalFactura")))
    time.sleep(0.3)
    return sesion_negativas


@pytest.mark.parametrize("nombre,cedula,email,direccion,debe_pasar", generar_40_casos_fuzzing_factura())
def test_CAT2_fuzzing_formulario_factura(modal_factura_listo, nombre, cedula, email, direccion, debe_pasar):
    """CAT-2 (Negativa - Fuzzing/Límites): Stress test de 40 combinaciones sobre el formulario de facturación."""
    driver = modal_factura_listo
    if "d-none" not in driver.find_element(By.ID, "seccionFactura").get_attribute("class"):
        driver.execute_script("""
            document.getElementById('seccionFormulario').classList.remove('d-none');
            document.getElementById('seccionFactura').classList.add('d-none');
            document.getElementById('btnConfirmarFactura').classList.remove('d-none');
            document.getElementById('btnImprimir').classList.add('d-none');
        """)

    limpiar_y_escribir(driver.find_element(By.ID, "clienteNombre"), nombre)
    limpiar_y_escribir(driver.find_element(By.ID, "clienteCedula"), cedula)
    limpiar_y_escribir(driver.find_element(By.ID, "clienteEmail"), email)
    limpiar_y_escribir(driver.find_element(By.ID, "clienteDireccion"), direccion)
    driver.find_element(By.ID, "btnConfirmarFactura").click()

    factura_visible = "d-none" not in driver.find_element(By.ID, "seccionFactura").get_attribute("class")
    assert factura_visible == debe_pasar, f"Fallo en caso ({nombre}, {cedula}, {email}, {direccion})"


# ==============================================================================
# CATEGORÍA 3: CATÁLOGO, FILTROS COMBINADOS Y BÚSQUEDA (20 PRUEBAS)
# ==============================================================================

@pytest.fixture(scope="module")
def sesion_catalogo(driver_sesion):
    driver_sesion.get(URL_TIENDA)
    WebDriverWait(driver_sesion, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "card-producto")))
    return driver_sesion


@pytest.mark.parametrize("categoria,cantidad_esperada", [
    ("todos", 21),
    ("deportivo", 5),
    ("casual", 7),
    ("formal", 2),
    ("botas", 3),
    ("sandalias", 2),
    ("infantil", 2),
])
def test_CAT3_filtros_todas_categorias(sesion_catalogo, categoria, cantidad_esperada):
    """CAT-3 (Catálogo - Categorías): Verificar conteo exacto de productos en cada una de las 7 categorías."""
    driver = sesion_catalogo
    limpiar_y_escribir(driver.find_element(By.ID, "inputBusqueda"), "")
    clic_seguro(driver, driver.find_element(By.CSS_SELECTOR, f'.filtro-btn[data-categoria="{categoria}"]'))
    time.sleep(0.25)

    tarjetas = driver.find_elements(By.CLASS_NAME, "card-producto")
    assert len(tarjetas) == cantidad_esperada, f"Categoría '{categoria}': esperados {cantidad_esperada}, encontrados {len(tarjetas)}"


@pytest.mark.parametrize("termino_busqueda,cantidad_esperada", [
    ("Nike", 4),
    ("nike", 4),
    ("NIKE", 4),
    ("  Adidas  ", 4),
    ("Runner", 2),
    ("Boot", 1),
    ("Slide", 2),
    ("Vans", 1),
])
def test_CAT3_busqueda_case_insensitive(sesion_catalogo, termino_busqueda, cantidad_esperada):
    """CAT-3 (Catálogo - Buscador): Validar búsqueda por marca/modelo ignorando mayúsculas y espacios."""
    driver = sesion_catalogo
    clic_seguro(driver, driver.find_element(By.CSS_SELECTOR, '.filtro-btn[data-categoria="todos"]'))
    buscador = driver.find_element(By.ID, "inputBusqueda")
    clic_seguro(driver, buscador)
    limpiar_y_escribir(buscador, termino_busqueda)
    time.sleep(0.25)

    tarjetas = driver.find_elements(By.CLASS_NAME, "card-producto")
    assert len(tarjetas) == cantidad_esperada, f"Búsqueda '{termino_busqueda}': esperados {cantidad_esperada}, encontrados {len(tarjetas)}"


@pytest.mark.parametrize("categoria,termino,cantidad_esperada", [
    ("botas", "Timberland", 1),
    ("deportivo", "Adidas", 2),
    ("infantil", "Nike", 1),
    ("formal", "Nike", 0),               # Combinación sin coincidencias -> estado vacío
    ("todos", "ZapatoInexistente99", 0), # Búsqueda inexistente -> estado vacío
])
def test_CAT3_filtros_cruzados_y_estado_vacio(sesion_catalogo, categoria, termino, cantidad_esperada):
    """CAT-3 (Catálogo - Filtros Cruzados): Combinar categoría + búsqueda y validar mensaje de catálogo vacío."""
    driver = sesion_catalogo
    clic_seguro(driver, driver.find_element(By.CSS_SELECTOR, f'.filtro-btn[data-categoria="{categoria}"]'))
    buscador = driver.find_element(By.ID, "inputBusqueda")
    limpiar_y_escribir(buscador, termino)
    time.sleep(0.25)

    tarjetas = driver.find_elements(By.CLASS_NAME, "card-producto")
    assert len(tarjetas) == cantidad_esperada
    if cantidad_esperada == 0:
        assert "No encontramos productos" in driver.find_element(By.ID, "contenedorProductos").text