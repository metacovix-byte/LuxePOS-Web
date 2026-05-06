# Génère photo-map.json : map référence-produit → chemin(s) photo
# Scanne le dossier "Z0. STOCK 2026" et son sous-dossier "Vendu 2026"
# Extrait la référence canonique de chaque nom de fichier

Set-Location -Path 'C:\Users\mouni\OneDrive\Documents\SB\LuxePOS-Web'

$rootDir = 'Z0. STOCK 2026'
$soldDir = 'Z0. STOCK 2026\Vendu 2026'

# Extrait la référence principale d'un nom de fichier
# Ex: "B179.a.jpg" → "B179"
# Ex: "B244a.jpg" → "B244"
# Ex: "B267'..jpg" → "B267"
# Ex: "B391.1.jpg" → "B391"
# Ex: "CO100 5-6-7-8.jpg" → "CO100"
# Ex: "B37+ CO63.jpg" → 2 refs : "B37" ET "CO63"
function Extract-Refs {
    param([string]$filename)
    # Retire l'extension
    $name = [System.IO.Path]::GetFileNameWithoutExtension($filename)
    # Pattern : 2 lettres majuscules + chiffres (ex: B123, CO45, BC1, CM30, PC68, BCB346)
    $matches = [regex]::Matches($name, '\b([A-Z]{1,3}\d+)\b')
    $refs = @()
    foreach ($m in $matches) {
        $refs += $m.Groups[1].Value
    }
    return ,$refs
}

$photoMap = @{}

# Scanner stock principal
Get-ChildItem -Path $rootDir -File -Filter '*.jpg' | ForEach-Object {
    $refs = Extract-Refs $_.Name
    foreach ($ref in $refs) {
        if (-not $photoMap.ContainsKey($ref)) { $photoMap[$ref] = @() }
        $relativePath = "$rootDir/$($_.Name)"
        $photoMap[$ref] += @{ path = $relativePath; status = 'stock'; filename = $_.Name }
    }
}

# Scanner sous-dossier "Vendu 2026"
if (Test-Path $soldDir) {
    Get-ChildItem -Path $soldDir -File -Filter '*.jpg' | ForEach-Object {
        $refs = Extract-Refs $_.Name
        foreach ($ref in $refs) {
            if (-not $photoMap.ContainsKey($ref)) { $photoMap[$ref] = @() }
            # Normaliser slashes (Windows \ → / pour URL)
            $relativePath = "Z0. STOCK 2026/Vendu 2026/$($_.Name)"
            $photoMap[$ref] += @{ path = $relativePath; status = 'sold'; filename = $_.Name }
        }
    }
}

# Stats
$totalRefs = $photoMap.Count
$totalPhotos = ($photoMap.Values | ForEach-Object { $_.Count } | Measure-Object -Sum).Sum

Write-Host "Total references uniques : $totalRefs" -ForegroundColor Green
Write-Host "Total photos indexees    : $totalPhotos" -ForegroundColor Green

# Conversion en JSON pour export
$jsonOutput = @{
    generated = (Get-Date -Format 'yyyy-MM-ddTHH:mm:ss')
    totalReferences = $totalRefs
    totalPhotos = $totalPhotos
    photos = $photoMap
}

$jsonOutput | ConvertTo-Json -Depth 5 -Compress | Out-File -FilePath 'photo-map.json' -Encoding utf8

Write-Host ""
Write-Host "[OK] photo-map.json genere ($totalPhotos photos pour $totalRefs references)" -ForegroundColor Cyan

# Aperçu de quelques entrées
Write-Host ""
Write-Host "Apercu (5 premieres references) :" -ForegroundColor Yellow
$photoMap.GetEnumerator() | Sort-Object Name | Select-Object -First 5 | ForEach-Object {
    Write-Host "  $($_.Key) -> $($_.Value.Count) photo(s)"
    foreach ($p in $_.Value) {
        Write-Host "    - $($p.path) [$($p.status)]"
    }
}
