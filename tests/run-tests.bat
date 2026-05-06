@echo off
REM ============================================================
REM   LuxePOS — Lance les 30 tests smoke
REM   Pre-requis : Node.js + serveur LuxePOS qui tourne (port 8765)
REM ============================================================

title LuxePOS - Tests smoke
color 0B

cd /d "%~dp0\.."

echo.
echo  ============================================================
echo    LuxePOS - 30 tests smoke (Playwright)
echo  ============================================================
echo.

REM Verifie Node.js
where node >nul 2>&1
if errorlevel 1 (
    echo  [ERREUR] Node.js n'est pas installe.
    echo  Installe-le depuis https://nodejs.org puis relance.
    echo.
    pause
    exit /b 1
)

REM Premiere fois ? Installation
if not exist "node_modules\@playwright\test" (
    echo  Installation de Playwright (premiere execution, ~30s)...
    if not exist package.json (
        call npm init -y >nul 2>&1
    )
    call npm install -D @playwright/test
    call npx playwright install chromium
    if errorlevel 1 (
        echo  [ERREUR] Installation Playwright echouee.
        pause
        exit /b 1
    )
)

REM Verifie que le serveur tourne
curl -s http://localhost:8765/api/status >nul 2>&1
if errorlevel 1 (
    echo  [WARNING] Le serveur LuxePOS ne semble pas tourner sur localhost:8765.
    echo  Lance "LuxePOS Pro" depuis le bureau, puis relance ce script.
    echo.
    pause
    exit /b 1
)

echo  Serveur OK. Lancement des tests...
echo.
call npx playwright test tests/smoke.spec.js
set RESULT=%ERRORLEVEL%

echo.
echo  ============================================================
if %RESULT% EQU 0 (
    echo    Tous les tests passent !
) else (
    echo    Echecs detectes. Rapport HTML : npx playwright show-report
)
echo  ============================================================
echo.
pause
