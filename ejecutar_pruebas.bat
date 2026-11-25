@echo off
chcp 65001 > nul
title Suite de Pruebas Automatizadas - ZapaShop QA

echo ========================================================
echo   EJECUTANDO SUITE QA CON PYTEST Y REPORTE HTML
echo ========================================================
echo.

python -m pytest pruebas_qa/test_zapashop.py -v --html=pruebas_qa/reporte_qa.html --self-contained-html

echo.
echo ========================================================
echo   REPORTE GENERADO EN: pruebas_qa\reporte_qa.html
echo   CAPTURAS EN:         pruebas_qa\evidencias\
echo ========================================================
pause