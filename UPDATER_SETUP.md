# Tauri Auto-Updater — Setup à activer plus tard

L'auto-updater Tauri permet de pousser des nouvelles versions sans reinstall manuel : l'app vérifie au démarrage s'il y a une mise à jour, propose à l'utilisatrice de la télécharger, et redémarre proprement.

**Prérequis** : repo GitHub public OU privé + workflow CI qui publie un `latest.json` + le binaire.

## Étape 1 — Générer les clés de signature

```powershell
npx tauri signer generate -w "C:\Users\mouni\.tauri\luxepos.key"
```

→ Ça produit 2 fichiers :
- `luxepos.key` (privée — **NE JAMAIS COMMITTER**, garder en lieu sûr)
- `luxepos.key.pub` (publique — à mettre dans tauri.conf.json)

## Étape 2 — Activer le plugin updater

### `src-tauri/Cargo.toml`
```toml
[dependencies]
# ... lignes existantes ...
tauri-plugin-updater = "2"
```

### `src-tauri/src/lib.rs`
Dans `pub fn run()` :
```rust
tauri::Builder::default()
    .plugin(tauri_plugin_updater::Builder::new().build())  // <- ajouter
    .plugin(tauri_plugin_fs::init())
    // ... reste inchangé
```

### `src-tauri/tauri.conf.json`
Dans la section `"plugins": {}`, remplacer par :
```json
"plugins": {
    "updater": {
        "active": true,
        "endpoints": [
            "https://github.com/<TON_USER>/LuxePOS-Web/releases/latest/download/latest.json"
        ],
        "dialog": true,
        "pubkey": "<COPIER LE CONTENU DE luxepos.key.pub>"
    }
}
```

### `src-tauri/capabilities/default.json`
Ajouter aux permissions :
```json
"permissions": [
    "updater:default",
    // ... permissions existantes
]
```

## Étape 3 — Workflow CI qui génère latest.json

Modifier `.github/workflows/build-windows.yml` (et build-mac.yml) pour :
1. Build le .exe / .dmg signé
2. Générer un `latest.json` qui pointe vers le binaire
3. Créer une release GitHub avec les artefacts

Exemple snippet à ajouter :
```yaml
- name: Sign update
  env:
    TAURI_SIGNING_PRIVATE_KEY: ${{ secrets.TAURI_PRIVATE_KEY }}
    TAURI_SIGNING_PRIVATE_KEY_PASSWORD: ${{ secrets.TAURI_KEY_PASSWORD }}
  run: npx tauri build --target ${{ matrix.target }}
  # → produit aussi un .sig à côté du binaire

- name: Generate latest.json
  run: |
    cat > latest.json << EOF
    {
      "version": "${{ github.ref_name }}",
      "notes": "Voir CHANGELOG.md",
      "pub_date": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
      "platforms": {
        "windows-x86_64": {
          "signature": "$(cat src-tauri/target/release/bundle/nsis/*.sig)",
          "url": "https://github.com/<USER>/LuxePOS-Web/releases/download/${{ github.ref_name }}/LuxePOS_${{ github.ref_name }}_x64-setup.exe"
        },
        "darwin-universal": {
          "signature": "$(cat src-tauri/target/universal-apple-darwin/release/bundle/macos/*.sig)",
          "url": "https://github.com/<USER>/LuxePOS-Web/releases/download/${{ github.ref_name }}/LuxePOS_${{ github.ref_name }}_universal.dmg"
        }
      }
    }
    EOF

- name: Create GitHub Release
  uses: softprops/action-gh-release@v2
  with:
    files: |
      src-tauri/target/release/bundle/nsis/*.exe
      src-tauri/target/release/bundle/nsis/*.sig
      latest.json
```

## Étape 4 — Secrets GitHub

Dans le repo GitHub → Settings → Secrets → Actions → Add :
- `TAURI_PRIVATE_KEY` : contenu de `luxepos.key`
- `TAURI_KEY_PASSWORD` : password choisi à l'étape 1 (ou vide si non défini)

## Étape 5 — Tester

1. Push un tag : `git tag v5.14.11 && git push origin v5.14.11`
2. Le workflow build → release
3. Lance ton app actuelle (v5.14.10) → elle te propose la mise à jour à v5.14.11

## Notes

- L'auto-updater est désactivé tant que `tauri.conf.json` a `"plugins": {}`. Ne pas activer sans avoir préparé l'endpoint.
- Si jamais on perd la clé privée → impossible de pusher des updates aux apps existantes (elles ne valideront plus la signature). Faire un backup chiffré quelque part de sûr (pas OneDrive seul).
- Estimation totale du setup : 2h une fois GitHub configuré.
