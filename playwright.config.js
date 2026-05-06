// LuxePOS — Configuration Playwright
// Tests fonctionnels qui interagissent avec l'app via le serveur local 8765.

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    timeout: 30 * 1000,           // 30s par test
    expect: { timeout: 5000 },
    fullyParallel: false,         // Tests séquentiels (un seul state partagé)
    workers: 1,                   // Évite les conflits de state
    retries: 0,
    reporter: [['list'], ['html', { open: 'never' }]],
    use: {
        baseURL: 'http://localhost:8765',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure'
    },
    projects: [
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
                viewport: { width: 1280, height: 820 }
            }
        }
    ]
});
