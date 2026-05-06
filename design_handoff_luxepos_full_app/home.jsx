// LuxePOS — Dashboard recap (refonte de l'écran initial dans le système)

function HomeScreen() {
  const [tasks, setTasks] = React.useState([
    { id: 1, i: 'Alert', tone: 'bad', t: '102 produits en rupture', m: '3 fournisseurs · 18 min', tag: 'rupture', cta: 'Réassortir', done: false },
    { id: 2, i: 'Box', tone: 'warn', t: '298 produits en stock faible', m: 'Seuils datés · 2 mois', tag: 'stock bas', cta: 'Voir', done: false },
    { id: 3, i: 'Archive', tone: 'neut', t: 'Archiver 102 pièces dormantes', m: 'Suggéré par Lumi · gain 8 400 CHF', tag: 'archive', cta: 'Voir', done: false },
  ]);
  const toggle = id => setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  return (
    <div style={{ padding: 28 }}>
      <PageHeader
        eyebrow="Lundi 27 avril · 14:23"
        title={<>Bonjour, <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Maëlle</em></>}
        sub="3 priorités à régler · météo calme en boutique"
        actions={<><button className="ds-btn"><Ico.Chart /> Analyse</button><button className="ds-btn ds-btn-primary"><Ico.Bolt /> Nouvelle vente</button></>}
      />
      <div className="ds-card ds-card-pad" style={{ margin: '14px 0', display: 'grid', gridTemplateColumns: '1fr auto', gap: 16 }}>
        <div>
          <div className="ds-eyebrow">CA · Aujourd'hui</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 6 }}>
            <span className="ds-num" style={{ fontSize: 56 }}>0</span>
            <span style={{ fontSize: 18, color: 'var(--ink-2)' }}>CHF</span>
            <span className="ds-pill ds-pill-down">↓100% vs lundi</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 56 }}>
          {Array.from({ length: 14 }).map((_, i) => <div key={i} style={{ width: 6, height: 8 + Math.abs(Math.sin(i * 1.3)) * 40, background: i === 13 ? 'var(--accent)' : 'var(--line-2)', borderRadius: 2 }} />)}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12, marginBottom: 18 }}>
        {[
          { p: true, i: 'Bolt', t: 'Vente éclair', s: 'Pièce → client → paiement', k: '⌘K' },
          { i: 'Plus', t: 'Ajouter au stock', s: 'Nouvelle pièce', k: '⌘N' },
          { i: 'Chat', t: 'Répondre · 12 DM', s: 'Insta · WhatsApp', k: '⌘M' },
        ].map(a => {
          const I = Ico[a.i];
          return (
            <button key={a.t} className="ds-btn-reset ds-card" style={{ padding: 18, textAlign: 'left', cursor: 'pointer', background: a.p ? 'var(--ink)' : 'var(--surface)', color: a.p ? 'var(--surface)' : 'var(--ink)', borderColor: a.p ? 'var(--ink)' : 'var(--line)', position: 'relative' }}>
              <div style={{ width: 36, height: 36, borderRadius: 'var(--r-3)', background: a.p ? 'var(--accent)' : 'var(--surface-2)', color: a.p ? '#fff' : 'var(--accent)', display: 'grid', placeItems: 'center' }}><I /></div>
              <div style={{ fontSize: 17, fontWeight: 600, marginTop: 14, letterSpacing: '-.01em' }}>{a.t}</div>
              <div style={{ fontSize: 12, opacity: a.p ? .8 : 1, color: a.p ? 'var(--surface)' : 'var(--muted)', marginTop: 4 }}>{a.s}</div>
              <div style={{ position: 'absolute', top: 16, right: 16, fontFamily: 'var(--mono)', fontSize: 9, opacity: .5 }}>{a.k}</div>
            </button>
          );
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 18 }}>
        {[
          { l: 'Ce mois', v: '295', u: 'CHF', d: 'objectif 50K · 0,6%', tone: 'up' },
          { l: 'Panier 7j', v: '31', u: 'CHF', d: 'vs 155 préc.', tone: 'down' },
          { l: 'Stock', v: '400', u: 'réf.', d: 'estimations à compléter', tone: 'warn' },
        ].map(k => (
          <div key={k.l} className="ds-card ds-card-pad">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="ds-eyebrow">{k.l}</span><span className={'ds-pill ds-pill-' + k.tone}>{k.tone === 'up' ? '+1%' : k.tone === 'down' ? '↓100%' : 'à comp.'}</span></div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8 }}><span className="ds-num" style={{ fontSize: 32 }}>{k.v}</span><span style={{ fontSize: 14, color: 'var(--ink-2)' }}>{k.u}</span></div>
            <div className="ds-meta" style={{ fontSize: 11, marginTop: 12 }}>{k.d}</div>
          </div>
        ))}
      </div>
      <div className="ds-card">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div><div style={{ fontSize: 15, fontWeight: 600 }}>Aujourd'hui</div><div className="ds-meta" style={{ fontSize: 11, marginTop: 2 }}>{tasks.filter(t => !t.done).length} actions · ~24 min</div></div>
          <span className="ds-pill">{tasks.filter(t => t.done).length}/{tasks.length}</span>
        </div>
        {tasks.map(t => {
          const I = Ico[t.i];
          return (
            <div key={t.id} onClick={() => toggle(t.id)} style={{ display: 'grid', gridTemplateColumns: '28px 1fr auto auto', gap: 14, alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid var(--line)', cursor: 'pointer', opacity: t.done ? .5 : 1 }}>
              <div style={{ width: 28, height: 28, borderRadius: 'var(--r-2)', background: t.tone === 'bad' ? 'var(--bad-soft)' : t.tone === 'warn' ? 'var(--warn-soft)' : 'var(--surface-2)', color: t.tone === 'bad' ? 'var(--bad)' : t.tone === 'warn' ? 'var(--warn)' : 'var(--ink-2)', display: 'grid', placeItems: 'center' }}><I /></div>
              <div><div style={{ fontSize: 13, fontWeight: 500, textDecoration: t.done ? 'line-through' : 'none' }}>{t.t}</div><div className="ds-meta" style={{ fontSize: 11, marginTop: 2 }}>{t.m}</div></div>
              <span className="ds-pill">{t.tag}</span>
              <button className="ds-btn ds-btn-sm">{t.cta} <Ico.Arrow /></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
window.HomeScreen = HomeScreen;
