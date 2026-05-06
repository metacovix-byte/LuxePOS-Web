// LuxePOS — Mobile + Tablet screens

function MobileDash() {
  return (
    <div style={{ width: 393, height: 852, background: 'var(--bg)', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'var(--sans)' }}>
      <div style={{ height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 0', fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 600 }}>
        <span>14:23</span>
        <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>•••• ◉ ▪</span>
      </div>
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo size={36} />
          <button className="ds-btn-reset" style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--line)', display: 'grid', placeItems: 'center' }}><Ico.Sparkle /></button>
        </div>
        <div className="ds-eyebrow" style={{ marginTop: 18 }}>Lundi 27 avril</div>
        <h1 className="ds-h1" style={{ marginTop: 4, fontSize: 36 }}>Bonjour, <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Maëlle</em></h1>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 100px' }}>
        <div className="ds-card ds-card-pad" style={{ marginTop: 8 }}>
          <div className="ds-eyebrow">CA · Aujourd'hui</div>
          <div className="ds-num" style={{ fontSize: 56, marginTop: 4, lineHeight: 1 }}>0<span style={{ fontSize: 16, marginLeft: 6, color: 'var(--muted)', fontFamily: 'var(--sans)' }}>CHF</span></div>
          <span className="ds-pill ds-pill-down" style={{ marginTop: 6 }}>↓100% vs lundi</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
          <button className="ds-btn-reset ds-card" style={{ padding: 14, textAlign: 'left', cursor: 'pointer', background: 'var(--ink)', borderColor: 'var(--ink)', color: 'var(--surface)' }}>
            <Ico.Bolt />
            <div style={{ fontSize: 15, fontWeight: 500, marginTop: 12 }}>Vente éclair</div>
            <div style={{ fontSize: 11, opacity: .7, marginTop: 2 }}>Caisse rapide</div>
          </button>
          <button className="ds-btn-reset ds-card" style={{ padding: 14, textAlign: 'left', cursor: 'pointer' }}>
            <Ico.Plus style={{ color: 'var(--accent)' }} />
            <div style={{ fontSize: 15, fontWeight: 500, marginTop: 12 }}>Ajouter une pièce</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Photo + détails</div>
          </button>
        </div>
        <div style={{ marginTop: 22 }}>
          <div className="ds-eyebrow" style={{ marginBottom: 10 }}>Aujourd'hui · 3 actions</div>
          {[
            { i: 'Alert', t: '102 produits en rupture', m: '3 fournisseurs', tone: 'bad' },
            { i: 'Box', t: '298 produits en stock faible', m: '2 mois sans vérif', tone: 'warn' },
            { i: 'Chat', t: '12 DM en attente', m: 'Insta · WhatsApp', tone: 'neut' },
          ].map(t => {
            const I = Ico[t.i];
            return (
              <div key={t.t} className="ds-card" style={{ padding: 14, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 'var(--r-2)', background: t.tone === 'bad' ? 'var(--bad-soft)' : t.tone === 'warn' ? 'var(--warn-soft)' : 'var(--surface-2)', color: t.tone === 'bad' ? 'var(--bad)' : t.tone === 'warn' ? 'var(--warn)' : 'var(--ink-2)', display: 'grid', placeItems: 'center' }}><I /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{t.t}</div>
                  <div className="ds-meta" style={{ fontSize: 10 }}>{t.m}</div>
                </div>
                <Ico.Arrow style={{ color: 'var(--muted)' }} />
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'var(--surface)', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-around', padding: '10px 12px 28px' }}>
        {[{ k: 'home', i: 'Home', l: 'Accueil', a: true }, { k: 'pos', i: 'Bolt', l: 'Caisse' }, { k: 'inbox', i: 'Inbox', l: 'Boîte' }, { k: 'lumi', i: 'Sparkle', l: 'Lumi' }, { k: 'more', i: 'More', l: 'Plus' }].map(t => {
          const I = Ico[t.i];
          return <button key={t.k} className="ds-btn-reset" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, color: t.a ? 'var(--accent)' : 'var(--muted)', cursor: 'pointer' }}><I /><span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '.06em' }}>{t.l}</span></button>;
        })}
      </div>
    </div>
  );
}

function MobileAddProduct() {
  return (
    <div style={{ width: 393, height: 852, background: 'var(--bg)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ height: 54, padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 600 }}><span>14:23</span><span>•••• ◉ ▪</span></div>
      <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="ds-btn ds-btn-ghost ds-btn-sm">← Retour</button>
        <span className="ds-meta">2 / 3</span>
        <button className="ds-btn ds-btn-ghost ds-btn-sm" style={{ color: 'var(--accent)' }}>Sauver</button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px 24px' }}>
        <div style={{ aspectRatio: '4/5', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-4)', display: 'grid', placeItems: 'center', backgroundImage: 'repeating-linear-gradient(45deg, transparent 0 6px, rgba(184,92,62,.08) 6px 7px)', position: 'relative' }}>
          <button className="ds-btn ds-btn-accent" style={{ borderRadius: 999 }}>📷 Prendre la photo</button>
          <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, background: 'rgba(255,254,251,.95)', border: '1px solid var(--line)', borderRadius: 'var(--r-3)', padding: 12, display: 'flex', gap: 10, alignItems: 'flex-start', backdropFilter: 'blur(10px)' }}>
            <Ico.Sparkle style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontSize: 12 }}>Lumi détecte <strong>bague or rose</strong> avec <strong>1 saphir</strong>. Suggère "Bague Solar · 950 CHF".</div>
          </div>
        </div>
        <h2 className="ds-h3" style={{ marginTop: 22 }}>Détails</h2>
        <div className="ds-field" style={{ marginTop: 12 }}><label className="ds-label">Nom</label><input className="ds-input" defaultValue="Bague Solar" style={{ padding: '14px 14px', fontSize: 16 }} /></div>
        <div className="ds-field"><label className="ds-label">Matière</label><input className="ds-input" defaultValue="Or rose 18k · saphir 0,4 ct" style={{ padding: '14px', fontSize: 16 }} /></div>
        <div className="ds-field"><label className="ds-label">Prix</label><div style={{ position: 'relative' }}><input className="ds-input" defaultValue="950" style={{ padding: '14px', fontSize: 24, fontFamily: 'var(--serif)', fontWeight: 400 }} /><span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: 14 }}>CHF</span></div></div>
      </div>
      <div style={{ padding: '12px 20px 28px', borderTop: '1px solid var(--line)', background: 'var(--surface)' }}>
        <button className="ds-btn ds-btn-accent ds-btn-lg" style={{ width: '100%', justifyContent: 'center' }}>Continuer <Ico.Arrow /></button>
      </div>
    </div>
  );
}

function MobileLumi() {
  return (
    <div style={{ width: 393, height: 852, background: 'var(--bg)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ height: 54, padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 600 }}><span>14:23</span><span>•••• ◉ ▪</span></div>
      <div style={{ padding: '12px 20px 16px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="ds-avatar" style={{ width: 36, height: 36, fontSize: 14, fontFamily: 'var(--serif)', fontStyle: 'italic' }}>L</div>
        <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 500 }}>Lumi</div><div className="ds-meta" style={{ fontSize: 10 }}>● compagnon · en ligne</div></div>
        <button className="ds-btn ds-btn-ghost ds-btn-sm"><Ico.X /></button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ alignSelf: 'flex-start', maxWidth: '85%', background: 'var(--surface-2)', border: '1px solid var(--line)', padding: '10px 14px', borderRadius: '14px 14px 14px 4px', fontSize: 14 }}>Hello Maëlle ✨ Pas mal de DM en attente — je peux t'aider à les répondre ?</div>
        <div className="ds-card" style={{ padding: 14, alignSelf: 'flex-start', maxWidth: '90%' }}>
          <div className="ds-eyebrow" style={{ color: 'var(--accent)' }}>3 demandes de prix</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>Clara · Élodie · Anne-Sophie ont tous demandé des prix cette semaine.</div>
          <button className="ds-btn ds-btn-accent ds-btn-sm" style={{ marginTop: 10, width: '100%', justifyContent: 'center' }}>Préparer les réponses</button>
        </div>
        <div style={{ alignSelf: 'flex-end', maxWidth: '85%', background: 'var(--accent)', color: '#fff', padding: '10px 14px', borderRadius: '14px 14px 4px 14px', fontSize: 14 }}>Oui vas-y, prépare-moi les 3</div>
      </div>
      <div style={{ padding: '12px 16px 28px', borderTop: '1px solid var(--line)', display: 'flex', gap: 8 }}>
        <input className="ds-input" placeholder="Demander à Lumi…" style={{ padding: '12px 14px', fontSize: 14 }} />
        <button className="ds-btn ds-btn-accent" style={{ width: 44, justifyContent: 'center' }}><Ico.Send /></button>
      </div>
    </div>
  );
}

function TabletPOS() {
  const cart = [{ ...PRODUCTS[0], qty: 1 }, { ...PRODUCTS[2], qty: 1 }];
  const total = cart.reduce((s, p) => s + p.price * p.qty, 0);
  return (
    <div style={{ width: 1024, height: 768, background: 'var(--bg)', display: 'grid', gridTemplateColumns: '1fr 360px', overflow: 'hidden' }}>
      <div style={{ padding: 24, overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <div className="ds-eyebrow">Caisse mobile · iPad</div>
            <h2 className="ds-h2" style={{ marginTop: 4 }}>Catalogue</h2>
          </div>
          <div className="ds-topbar-search" style={{ width: 320, maxWidth: 'unset' }}><Ico.Search /><input placeholder="Scanner ou rechercher…" /></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {PRODUCTS.map(p => (
            <button key={p.id} className="ds-btn-reset ds-card" style={{ padding: 12, textAlign: 'left', cursor: 'pointer' }}>
              <div className="ds-thumb" style={{ marginBottom: 10, aspectRatio: 1 }} />
              <div className="ds-meta" style={{ fontSize: 9 }}>{p.id}</div>
              <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{p.name}</div>
              <div className="ds-num" style={{ fontSize: 16, marginTop: 6 }}>{p.price.toLocaleString('fr-CH')} <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--sans)' }}>CHF</span></div>
            </button>
          ))}
        </div>
      </div>
      <aside style={{ background: 'var(--surface)', borderLeft: '1px solid var(--line)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 22px 14px', borderBottom: '1px solid var(--line)' }}>
          <div className="ds-eyebrow">Vente en cours</div>
          <h3 className="ds-h3" style={{ marginTop: 4 }}>{cart.length} pièces</h3>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px' }}>
          {cart.map(p => (
            <div key={p.id} style={{ display: 'flex', gap: 10, padding: '12px 6px', borderBottom: '1px solid var(--line)', alignItems: 'center' }}>
              <div className="ds-thumb" style={{ width: 40, height: 40 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                <div className="ds-meta" style={{ fontSize: 10 }}>{p.id}</div>
              </div>
              <div className="ds-num" style={{ fontSize: 14 }}>{p.price.toLocaleString('fr-CH')}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: 18, background: 'var(--surface-2)', borderTop: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 12, borderBottom: '1px dashed var(--line-2)' }}><span className="ds-eyebrow">Total</span><span className="ds-num" style={{ fontSize: 32 }}>{total.toLocaleString('fr-CH')} <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--sans)' }}>CHF</span></span></div>
          <button className="ds-btn ds-btn-accent ds-btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 14 }}>Encaisser <Ico.Arrow /></button>
        </div>
      </aside>
    </div>
  );
}

window.MobileDash = MobileDash;
window.MobileAddProduct = MobileAddProduct;
window.MobileLumi = MobileLumi;
window.TabletPOS = TabletPOS;
