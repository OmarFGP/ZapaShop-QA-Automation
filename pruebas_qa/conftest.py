import os
import pytest
import pytest_html
from selenium import webdriver

def _crear_navegador():
    os.makedirs("pruebas_qa/evidencias", exist_ok=True)
    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    return webdriver.Chrome(options=options)

@pytest.fixture
def driver():
    browser = _crear_navegador()
    yield browser
    browser.quit()

@pytest.fixture(scope="module")
def driver_sesion():
    browser = _crear_navegador()
    yield browser
    browser.quit()

def pytest_html_results_table_header(cells):
    cells.insert(2, "<th>Descripción del Escenario</th>")

def pytest_html_results_table_row(report, cells):
    descripcion = getattr(report, "description", "Sin descripción")
    cells.insert(2, f"<td>{descripcion}</td>")

@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()
    report.description = str(item.function.__doc__ or "").strip()
    extras = getattr(report, "extras", [])

    if report.when == "call":
        browser = item.funcargs.get("driver") or item.funcargs.get("driver_sesion")
        if browser:
            es_evidencia_clave = (
                report.failed
                or "compra_e2e" in item.name
                or "fuzz_01" in item.name
                or "fuzz_11" in item.name
                or "filtros_cruzados" in item.name
            )
            if es_evidencia_clave:
                nombre_limpio = item.name.replace("[", "_").replace("]", "").replace("/", "_")
                browser.save_screenshot(f"pruebas_qa/evidencias/{nombre_limpio}_{report.outcome}.png")
                captura_b64 = browser.get_screenshot_as_base64()
                extras.append(pytest_html.extras.image(captura_b64, mime_type="image/png"))
        report.extras = extras