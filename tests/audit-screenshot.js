// Capture screenshots multi-viewport multi-page de LuxePOS-Web pour audit
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/tmp/luxepos-audit';
const URL = 'http://localhost:8765/luxepos-final.html';

const VIEWPORTS = {
    desktop: { width: 1280, height: 800 },
    tablet:  { width: 768,  height: 1024 },
    mobile:  { width: 375,  height: 812 }
};

const PAGES = [
    { route: 'dashboard',  name: 'dashboard'  },
    { route: 'inventory',  name: 'inventory'  },
    { route: 'clients',    name: 'clients'    },
    { route: 'settings',   name: 'settings'   },
    { route: 'atelier',    name: 'atelier'    },
];

(async () => {
    const browser = await chromium.launch({ headless: true });
    for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
        const ctx = await browser.newContext({ viewport: vp });
        const page = await ctx.newPage();
        await page.goto(URL, { waitUntil: 'load' });
        await page.waitForTimeout(1500);
        // dismiss onboarding/modals
        await page.evaluate(() => {
            window.store?.updateSettings({ onboardingDone: true, whatsNewSeenVersion: window.APP_CONFIG?.VERSION });
            document.querySelectorAll('.fixed.inset-0, [id*="onboarding"], [id*="whatsnew"], [id*="astuce"]').forEach(el => el.remove());
        });
        for (const p of PAGES) {
            try {
                await page.evaluate(r => window.router.navigate(r), p.route);
                await page.waitForTimeout(600);
                await page.evaluate(() => document.querySelectorAll('.fixed.inset-0, [id*="onboarding"], [id*="whatsnew"], [id*="astuce"]').forEach(el => el.remove()));
                const outDir = path.join(OUT, vpName);
                if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
                const outPath = path.join(outDir, `${p.name}.png`);
                await page.screenshot({ path: outPath, fullPage: true });
                console.log(`✓ ${vpName}/${p.name}.png`);
            } catch (e) {
                console.log(`✗ ${vpName}/${p.name}: ${e.message}`);
            }
        }
        // Bonus : product modal in inventory (desktop only — too tall mobile)
        if (vpName === 'desktop') {
            try {
                await page.evaluate(() => window.router.navigate('inventory'));
                await page.waitForTimeout(500);
                await page.evaluate(() => {
                    const p = window.store.state.products?.[0];
                    if (p) window.ui.openProductModal(p.id);
                });
                await page.waitForTimeout(800);
                await page.screenshot({ path: path.join(OUT, vpName, 'product-modal.png'), fullPage: true });
                console.log(`✓ ${vpName}/product-modal.png`);
            } catch (e) {
                console.log(`✗ ${vpName}/product-modal: ${e.message}`);
            }
        }
        await ctx.close();
    }
    await browser.close();
    console.log('Done. Files in', OUT);
})();
