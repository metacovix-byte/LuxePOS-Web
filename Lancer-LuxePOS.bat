@echo off
REM ============================================================
REM  Lancer-LuxePOS.bat — demarre LuxePOS dans le navigateur
REM  en servant TOUJOURS depuis le dossier racine, pour que les
REM  photos (Z0. STOCK 2026) et photo-map.json soient trouves.
REM  Double-cliquez sur ce fichier. Laissez la fenetre ouverte.
REM ============================================================
cd /d "%~dp0"

REM Regenere la carte des photos (au cas ou de nouvelles photos ont ete ajoutees)
echo [1/3] Mise a jour de la carte des photos...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0generate-photo-map.ps1" >nul 2>&1

REM Ouvre le navigateur apres 3s (le temps que le serveur demarre)
echo [2/3] Ouverture du navigateur...
start "" cmd /c "timeout /t 3 >nul & start http://localhost:8790/luxepos-final.html"

REM Demarre le serveur depuis la racine (cache desactive pour voir les photos a jour)
echo [3/3] Serveur LuxePOS lance sur http://localhost:8790/luxepos-final.html
echo.
echo  *** NE FERMEZ PAS CETTE FENETRE tant que vous utilisez LuxePOS ***
echo  Pour arreter : fermez cette fenetre.
echo.
npx http-server -p 8790 -c-1 "%~dp0"
