// LuxePOS — Desktop screens

// === POS / Caisse ===
const PRODUCTS = [
  { id: 'AR-001', name: 'Bague Aria', mat: 'Or rose 18k', price: 1850, cat: 'Bagues' },
  { id: 'LN-014', name: 'Collier Lin', mat: 'Perles eau douce', price: 540, cat: 'Colliers' },
  { id: 'PV-022', name: 'Boucles Pavé', mat: 'Diamants 0,3 ct', price: 2200, cat: 'Boucles' },
  { id: 'VL-007', name: 'Collier Velia', mat: 'Or jaune 18k', price: 1180, cat: 'Colliers' },
  { id: 'SR-031', name: 'Bague Solar', mat: 'Saphir', price: 950, cat: 'Bagues' },
  { id: 'TM-018', name: 'Bracelet Tamise', mat: 'Argent', price: 320, cat: 'Bracelets' },
];

function POSScreen() {
  const [cart, setCart] = React.useState([{ ...PRODUCTS[0], qty: 1 }]);
  const [search, setSearch] = React.useState('');
  const filtered = PRODUCTS.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()));
  const total = cart.reduce((s, p) => s + p.price * p.qty, 0);
  const add = (p) => setCart(c => { const ex = c.find(x => x.id === p.id); return ex ? c.map(x => x.id === p.id ? { ...x, qty: x.qty + 1 } : x) : [...c, { ...p, qty: 1 }]; });
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', height: '100%' }}>
      <div style={{ padding: 28, overflowY: 'auto' }}>
        <div className="ds-bread"><span>Boutique</span><span className="sep">›</span><span>Caisse</span></div>
        <h1 className="ds-h1" style={{ marginTop: 8, marginBottom: 18 }}>Encaisser une vente</h1>
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          <div className="ds-topbar-search" style={{ flex: 1, maxWidth: 'unset' }}>
            <Ico.Search />
            <input placeholder="Rechercher une pièce, scanner SKU…" value={search} onChange={e => setSearch(e.target.value)} />
            <span className="ds-kbd">⌘F</span>
          </div>
          <button className="ds-btn">Toutes les catégories</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {filtered.map(p => (
            <button key={p.id} className="ds-btn-reset" onClick={() => add(p)}
                    style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-4)', padding: 14, textAlign: 'left', cursor: 'pointer', transition: 'all .15s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = 'none'; }}>
              <div className="ds-thumb" style={{ marginBottom: 12, width: '100%' }} />
              <div className="ds-meta" style={{ fontSize: 9 }}>{p.id}</div>
              <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>{p.name}</div>
              <div className="ds-body" style={{ fontSize: 11, marginTop: 2 }}>{p.mat}</div>
              <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="ds-num" style={{ fontSize: 18 }}>{p.price.toLocaleString('fr-CH')}</span>
                <span className="ds-meta">CHF</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <aside style={{ background: 'var(--surface)', borderLeft: '1px solid var(--line)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 24px 14px', borderBottom: '1px solid var(--line)' }}>
          <div className="ds-eyebrow">Panier · client de passage</div>
          <h2 className="ds-h3" style={{ marginTop: 6 }}>{cart.length} {cart.length > 1 ? 'pièces' : 'pièce'}</h2>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px' }}>
          {cart.map(p => (
            <div key={p.id} style={{ display: 'flex', gap: 12, padding: '12px 8px', borderBottom: '1px solid var(--line)', alignItems: 'center' }}>
              <div className="ds-thumb" style={{ width: 44, height: 44 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                <div className="ds-meta" style={{ fontSize: 10 }}>{p.id} · ×{p.qty}</div>
              </div>
              <div className="ds-num" style={{ fontSize: 14 }}>{(p.price * p.qty).toLocaleString('fr-CH')}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: 20, background: 'var(--surface-2)', borderTop: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span className="ds-meta">Sous-total</span><span style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>{total.toLocaleString('fr-CH')} CHF</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}><span className="ds-meta">TVA 7,7%</span><span style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>{Math.round(total * 0.077).toLocaleString('fr-CH')} CHF</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 14, borderTop: '1px dashed var(--line-2)' }}>
            <span className="ds-eyebrow">Total</span>
            <span className="ds-num" style={{ fontSize: 32 }}>{total.toLocaleString('fr-CH')} <span style={{ fontSize: 14, color: 'var(--muted)', fontFamily: 'var(--sans)' }}>CHF</span></span>
          </div>
          <button className="ds-btn ds-btn-accent ds-btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>Encaisser <Ico.Arrow /></button>
          <button className="ds-btn ds-btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}>Mettre en attente</button>
        </div>
      </aside>
    </div>
  );
}

// === Catalog ===
function CatalogScreen({ onPick }) {
  return (
    <div style={{ padding: 28 }}>
      <PageHeader
        eyebrow="Boutique · Catalogue"
        title="Catalogue"
        sub="408 pièces référencées · 102 en rupture"
        actions={<><button className="ds-btn"><Ico.Search /> Filtrer</button><button className="ds-btn ds-btn-primary"><Ico.Plus /> Nouvelle pièce</button></>}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 12 }}>
        {[...PRODUCTS, ...PRODUCTS].slice(0, 8).map((p, i) => (
          <div key={i} className="ds-card" style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => onPick && onPick(p)}>
            <div className="ds-thumb" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, aspectRatio: '4/5' }} />
            <div style={{ padding: 14 }}>
              <div className="ds-meta" style={{ fontSize: 9 }}>{p.id} · {p.cat}</div>
              <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>{p.name}</div>
              <div className="ds-body" style={{ fontSize: 11 }}>{p.mat}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 12 }}>
                <span className="ds-num" style={{ fontSize: 18 }}>{p.price.toLocaleString('fr-CH')} <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--sans)' }}>CHF</span></span>
                {i % 3 === 0 ? <span className="ds-pill ds-pill-down">rupture</span> : <span className="ds-pill ds-pill-up">en stock</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// === Add Product (with photo) ===
function AddProductScreen() {
  const [step, setStep] = React.useState(1);
  return (
    <div style={{ padding: 28, maxWidth: 1080, margin: '0 auto' }}>
      <div className="ds-bread"><span>Catalogue</span><span className="sep">›</span><span>Nouvelle pièce</span></div>
      <h1 className="ds-h1" style={{ marginTop: 8, marginBottom: 4 }}>Ajouter une pièce</h1>
      <div className="ds-body">Importe une photo. Lumi pré-remplit la fiche.</div>
      <div style={{ display: 'flex', gap: 8, marginTop: 22, marginBottom: 22 }}>
        {['Photo', 'Détails', 'Prix & stock'].map((t, i) => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: i + 1 <= step ? 'var(--accent)' : 'var(--surface-2)', border: '1px solid ' + (i + 1 <= step ? 'var(--accent)' : 'var(--line)'), color: i + 1 <= step ? '#fff' : 'var(--muted)', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 600, fontFamily: 'var(--mono)' }}>{i + 1}</div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: i + 1 === step ? 'var(--accent)' : 'var(--muted)' }}>{t}</span>
            {i < 2 && <span style={{ width: 28, height: 1, background: 'var(--line-2)', margin: '0 4px' }} />}
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <div className="ds-card" style={{ aspectRatio: '4/5', display: 'grid', placeItems: 'center', cursor: 'pointer', borderStyle: 'dashed' }}>
          <div style={{ textAlign: 'center', padding: 24 }}>
            <div className="ds-thumb" style={{ width: 96, height: 96, margin: '0 auto 16px' }} />
            <div style={{ fontSize: 14, fontWeight: 500 }}>Glisser une photo</div>
            <div className="ds-body" style={{ fontSize: 12, marginTop: 4 }}>JPEG, PNG · max 10 Mo</div>
            <button className="ds-btn ds-btn-sm" style={{ marginTop: 14 }}>Parcourir</button>
            <div style={{ marginTop: 14, padding: '10px 12px', background: 'var(--accent-soft)', borderRadius: 'var(--r-2)', display: 'flex', gap: 8, alignItems: 'flex-start', textAlign: 'left' }}>
              <Ico.Sparkle style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
              <div style={{ fontSize: 12, color: 'var(--accent-ink)' }}>Lumi détecte type, matière, pierres et propose un nom + prix.</div>
            </div>
          </div>
        </div>
        <div>
          <div className="ds-field"><label className="ds-label">Référence (auto)</label><input className="ds-input" placeholder="AR-042" defaultValue="AR-042" /></div>
          <div className="ds-field"><label className="ds-label">Nom</label><input className="ds-input" placeholder="Bague Aria" /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="ds-field"><label className="ds-label">Catégorie</label><input className="ds-input" placeholder="Bagues" /></div>
            <div className="ds-field"><label className="ds-label">Matière</label><input className="ds-input" placeholder="Or rose 18k" /></div>
          </div>
          <div className="ds-field"><label className="ds-label">Description</label><textarea className="ds-input" rows="3" placeholder="Notes sur la pièce, histoire, provenance…"></textarea></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
            <button className="ds-btn ds-btn-ghost">Annuler</button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="ds-btn">Sauvegarder en brouillon</button>
              <button className="ds-btn ds-btn-accent" onClick={() => setStep(s => Math.min(3, s + 1))}>Continuer <Ico.Arrow /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// === Stock ===
function StockScreen() {
  const rows = [
    { id: 'AR-001', name: 'Bague Aria', cat: 'Bagues', stock: 0, status: 'rupture', value: 0 },
    { id: 'LN-014', name: 'Collier Lin', cat: 'Colliers', stock: 3, status: 'faible', value: 1620 },
    { id: 'PV-022', name: 'Boucles Pavé', cat: 'Boucles', stock: 8, status: 'ok', value: 17600 },
    { id: 'VL-007', name: 'Collier Velia', cat: 'Colliers', stock: 2, status: 'faible', value: 2360 },
    { id: 'SR-031', name: 'Bague Solar', cat: 'Bagues', stock: 12, status: 'ok', value: 11400 },
    { id: 'TM-018', name: 'Bracelet Tamise', cat: 'Bracelets', stock: 0, status: 'rupture', value: 0 },
  ];
  return (
    <div style={{ padding: 28 }}>
      <PageHeader
        eyebrow="Boutique · Stock"
        title="Stock & inventaire"
        sub="400 références · valeur estimée 142'400 CHF"
        actions={<><button className="ds-btn"><Ico.Box /> Inventaire</button><button className="ds-btn ds-btn-primary">Réassortir</button></>}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 14, marginBottom: 22 }}>
        {[
          { l: 'Rupture', v: '102', tone: 'bad', s: 'À réassortir d\'urgence' },
          { l: 'Stock faible', v: '298', tone: 'warn', s: 'Sous le seuil défini' },
          { l: 'En stock', v: '0', tone: 'good', s: 'Tout va bien' },
        ].map(s => (
          <div key={s.l} className="ds-card ds-card-pad">
            <div className="ds-eyebrow">{s.l}</div>
            <div className="ds-num" style={{ fontSize: 36, marginTop: 6, color: 'var(--' + s.tone + ')' }}>{s.v}</div>
            <div className="ds-body" style={{ fontSize: 11, marginTop: 4 }}>{s.s}</div>
          </div>
        ))}
      </div>
      <div className="ds-card">
        <table className="ds-table">
          <thead><tr><th style={{ width: 60 }}>Réf.</th><th>Pièce</th><th>Catégorie</th><th className="num">Stock</th><th>Statut</th><th className="num">Valeur</th><th></th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td className="ds-meta">{r.id}</td>
                <td style={{ fontWeight: 500, color: 'var(--ink)' }}>{r.name}</td>
                <td>{r.cat}</td>
                <td className="num">{r.stock}</td>
                <td><span className={'ds-pill ds-pill-' + (r.status === 'rupture' ? 'down' : r.status === 'faible' ? 'warn' : 'up')}>{r.status}</span></td>
                <td className="num">{r.value.toLocaleString('fr-CH')} CHF</td>
                <td><button className="ds-btn ds-btn-sm ds-btn-ghost"><Ico.More /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// === Customers ===
function CustomersScreen() {
  const customers = [
    { name: 'Clara Rivière', tag: 'VIP', last: '14 mars · Bague Solar', total: 4380, msgs: 3 },
    { name: 'Élodie Marchand', tag: 'Régulière', last: '02 avril · Boucles Pavé', total: 2200, msgs: 0 },
    { name: 'Anne-Sophie Vidal', tag: 'Nouvelle', last: '22 avril · 1ère visite', total: 0, msgs: 1 },
    { name: 'Sophie Bernard', tag: 'VIP', last: '11 mars · Collier Velia', total: 8940, msgs: 0 },
    { name: 'Camille Lefèvre', tag: 'Régulière', last: '28 février', total: 1180, msgs: 2 },
  ];
  return (
    <div style={{ padding: 28 }}>
      <PageHeader
        eyebrow="Boutique · Clientèle"
        title="Clientèle"
        sub="184 client·e·s · 12 VIP · 8 nouveaux ce mois"
        actions={<><button className="ds-btn"><Ico.Search /> Rechercher</button><button className="ds-btn ds-btn-primary"><Ico.Plus /> Nouveau client</button></>}
      />
      <div className="ds-card" style={{ marginTop: 14 }}>
        <table className="ds-table">
          <thead><tr><th>Client</th><th>Statut</th><th>Dernière interaction</th><th className="num">Total dépensé</th><th></th><th></th></tr></thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.name}>
                <td><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div className="ds-avatar" style={{ width: 30, height: 30, fontSize: 11 }}>{c.name[0]}</div><div style={{ fontWeight: 500, color: 'var(--ink)' }}>{c.name}</div></div></td>
                <td><span className={'ds-pill ' + (c.tag === 'VIP' ? 'ds-pill-accent' : '')}>{c.tag}</span></td>
                <td className="ds-meta" style={{ fontSize: 12 }}>{c.last}</td>
                <td className="num">{c.total.toLocaleString('fr-CH')} CHF</td>
                <td>{c.msgs > 0 && <span className="ds-pill ds-pill-warn"><Ico.Chat /> {c.msgs}</span>}</td>
                <td><button className="ds-btn ds-btn-sm">Ouvrir <Ico.Arrow /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// === Sales History ===
function SalesScreen() {
  const sales = [
    { id: '#2104', date: '27 avr. 14:02', client: 'Clara Rivière', items: 'Bague Solar', amt: 950, pay: 'twint' },
    { id: '#2103', date: '27 avr. 11:18', client: 'Passage', items: 'Bracelet Tamise', amt: 320, pay: 'carte' },
    { id: '#2102', date: '26 avr. 17:42', client: 'Sophie Bernard', items: 'Collier Velia ×2', amt: 2360, pay: 'virement' },
    { id: '#2101', date: '26 avr. 15:30', client: 'Passage', items: 'Boucles Pavé', amt: 2200, pay: 'carte' },
    { id: '#2100', date: '25 avr. 12:08', client: 'Camille Lefèvre', items: 'Bague Solar', amt: 950, pay: 'twint' },
  ];
  return (
    <div style={{ padding: 28 }}>
      <PageHeader
        eyebrow="Boutique · Ventes"
        title="Historique des ventes"
        sub="Avril 2026 · 23 ventes · 18'420 CHF"
        actions={<><button className="ds-btn"><Ico.Chart /> Rapport</button><button className="ds-btn">Exporter</button></>}
      />
      <div className="ds-card" style={{ marginTop: 14 }}>
        <table className="ds-table">
          <thead><tr><th>N°</th><th>Date</th><th>Client</th><th>Pièces</th><th>Paiement</th><th className="num">Montant</th><th></th></tr></thead>
          <tbody>
            {sales.map(s => (
              <tr key={s.id}>
                <td className="ds-meta">{s.id}</td>
                <td className="ds-meta" style={{ fontSize: 12 }}>{s.date}</td>
                <td style={{ fontWeight: 500, color: 'var(--ink)' }}>{s.client}</td>
                <td>{s.items}</td>
                <td><span className="ds-pill">{s.pay}</span></td>
                <td className="num" style={{ fontFamily: 'var(--serif)', fontSize: 16 }}>{s.amt.toLocaleString('fr-CH')}</td>
                <td><button className="ds-btn ds-btn-sm ds-btn-ghost">Reçu</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// === Inbox (DM) ===
function InboxScreen() {
  const dms = [
    { who: '@clarariv', name: 'Clara Rivière', ch: 'Instagram', preview: 'Bonjour ! Est-ce que la Bague Aria est encore disponible en taille 52 ?', t: '12 min', unread: true },
    { who: '+41 79 …', name: 'Élodie Marchand', ch: 'WhatsApp', preview: 'Merci beaucoup pour les boucles, elles sont splendides 🤍', t: '1 h', unread: true },
    { who: '@anne_sv', name: 'Anne-Sophie Vidal', ch: 'Instagram', preview: 'Vous faites des ajustements sur mesure ?', t: '2 h', unread: true },
    { who: '@sophiebrn', name: 'Sophie Bernard', ch: 'Instagram', preview: 'Je passerai jeudi vers 15h pour la finalisation', t: 'Hier', unread: false },
  ];
  const [active, setActive] = React.useState(0);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr 280px', height: '100%' }}>
      <div style={{ borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 20px 12px' }}>
          <div className="ds-eyebrow">Boîte de réception</div>
          <h2 className="ds-h3" style={{ marginTop: 4 }}>12 messages</h2>
        </div>
        <div style={{ overflowY: 'auto' }}>
          {dms.map((d, i) => (
            <button key={i} className="ds-btn-reset" onClick={() => setActive(i)}
                    style={{ display: 'block', width: '100%', textAlign: 'left', padding: '14px 20px', borderBottom: '1px solid var(--line)', background: active === i ? 'var(--accent-soft)' : 'transparent', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <div className="ds-avatar" style={{ width: 28, height: 28, fontSize: 11 }}>{d.name[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, display: 'flex', justifyContent: 'space-between' }}><span>{d.name}</span><span className="ds-meta">{d.t}</span></div>
                  <div className="ds-meta" style={{ fontSize: 10 }}>{d.who} · {d.ch}</div>
                </div>
                {d.unread && <span className="ds-status-dot" style={{ background: 'var(--accent)' }} />}
              </div>
              <div className="ds-body" style={{ fontSize: 12, marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{d.preview}</div>
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 500 }}>{dms[active].name}</div>
            <div className="ds-meta">{dms[active].who} · {dms[active].ch} · client·e VIP</div>
          </div>
          <button className="ds-btn ds-btn-sm">Voir fiche client</button>
        </div>
        <div style={{ flex: 1, padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ alignSelf: 'flex-start', maxWidth: '70%', background: 'var(--surface-2)', border: '1px solid var(--line)', padding: '10px 14px', borderRadius: '14px 14px 14px 4px', fontSize: 13 }}>{dms[active].preview}</div>
          <div className="ds-meta" style={{ alignSelf: 'center' }}>il y a {dms[active].t}</div>
        </div>
        <div style={{ padding: 16, borderTop: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <textarea className="ds-input" rows="2" placeholder="Écrire une réponse…" style={{ resize: 'none' }}></textarea>
            <button className="ds-btn ds-btn-accent" style={{ alignSelf: 'flex-end' }}><Ico.Send /></button>
          </div>
        </div>
      </div>
      <aside style={{ background: 'var(--surface-2)', borderLeft: '1px solid var(--line)', padding: 20 }}>
        <div className="ds-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Ico.Sparkle /> Lumi suggère</div>
        <div className="ds-card" style={{ marginTop: 12, padding: 14, borderColor: 'var(--accent)', background: 'var(--surface)' }}>
          <div className="ds-eyebrow" style={{ color: 'var(--accent)' }}>Réponse rapide</div>
          <div style={{ fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>Bonjour Clara ! Oui, l'Aria est disponible en 52. Je vous la réserve jusqu'à demain ?</div>
          <button className="ds-btn ds-btn-accent ds-btn-sm" style={{ width: '100%', marginTop: 10, justifyContent: 'center' }}>Utiliser cette réponse</button>
        </div>
        <div className="ds-card" style={{ marginTop: 10, padding: 14 }}>
          <div className="ds-eyebrow">Contexte client</div>
          <div className="ds-body" style={{ fontSize: 12, marginTop: 6 }}>4 380 CHF dépensés · 3 visites · taille bague 52 · préfère l'or rose</div>
        </div>
      </aside>
    </div>
  );
}

window.POSScreen = POSScreen;
window.CatalogScreen = CatalogScreen;
window.AddProductScreen = AddProductScreen;
window.StockScreen = StockScreen;
window.CustomersScreen = CustomersScreen;
window.SalesScreen = SalesScreen;
window.InboxScreen = InboxScreen;
