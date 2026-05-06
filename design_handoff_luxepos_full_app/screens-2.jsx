// LuxePOS — Lumi full screen, Reports, Settings, Login

function LumiFullScreen() {
  const [input, setInput] = React.useState('');
  const messages = [
    { role: 'bot', text: 'Bonjour Maëlle ✨ Tu veux qu\'on regarde ensemble pourquoi c\'est calme cette semaine ?' },
    { role: 'user', text: 'Pourquoi 0 ventes aujourd\'hui ?' },
    { role: 'bot', text: 'Sur les 5 derniers lundis de printemps, la moyenne était 1240 CHF avec un pic vers 16 h. Aujourd\'hui : 0 vente, 47 visiteurs sur ton site. Trois pistes :' },
    { role: 'card', title: 'Hypothèse · Stock visible', body: 'Tes 3 dernières ruptures touchent la collection "Aria" — la plus consultée. Les visiteurs partent sans alternative claire.' },
    { role: 'card', title: 'Hypothèse · Présence', body: 'Aucun post Instagram depuis 8 jours. Tes pics de vente suivent en général les stories à 11h et 17h.' },
    { role: 'card', title: 'Hypothèse · DM en attente', body: '12 DM non lus, dont 3 demandes de prix. Réponses moyennes en moins d\'1h → conversion 38%.' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', height: '100%' }}>
      <aside style={{ background: 'var(--surface-2)', borderRight: '1px solid var(--line)', padding: 20, overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div className="ds-avatar" style={{ width: 44, height: 44, fontSize: 18, fontFamily: 'var(--serif)', fontStyle: 'italic' }}>L</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 500 }}>Lumi</div>
            <div className="ds-meta">Compagnon boutique · en ligne</div>
          </div>
        </div>
        <div className="ds-eyebrow" style={{ marginBottom: 10 }}>Conversations récentes</div>
        {['Pourquoi 0 ventes ?', 'Top 5 à pousser cette semaine', 'Récap fin de mois', 'Idées de post · collection Aria'].map((c, i) => (
          <button key={i} className="ds-btn-reset" style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 'var(--r-2)', fontSize: 13, color: 'var(--ink-2)', cursor: 'pointer', marginBottom: 2, background: i === 0 ? 'var(--surface)' : 'transparent', border: i === 0 ? '1px solid var(--line)' : 'none' }}>{c}</button>
        ))}
      </aside>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 32px', borderBottom: '1px solid var(--line)' }}>
          <div className="ds-eyebrow">Conversation · 27 avr.</div>
          <h2 className="ds-h3" style={{ marginTop: 4 }}>Pourquoi 0 ventes aujourd'hui ?</h2>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 32, display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 760, margin: '0 auto', width: '100%' }}>
          {messages.map((m, i) => {
            if (m.role === 'card') return (
              <div key={i} className="ds-card" style={{ padding: 18, alignSelf: 'flex-start', maxWidth: '100%' }}>
                <div className="ds-eyebrow" style={{ color: 'var(--accent)' }}>{m.title}</div>
                <div style={{ fontSize: 14, marginTop: 8, lineHeight: 1.5 }}>{m.body}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}><button className="ds-btn ds-btn-sm ds-btn-accent">Approfondir</button><button className="ds-btn ds-btn-sm">Plus tard</button></div>
              </div>
            );
            return (
              <div key={i} style={{
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '75%',
                background: m.role === 'user' ? 'var(--accent)' : 'var(--surface-2)',
                color: m.role === 'user' ? '#fff' : 'var(--ink)',
                border: m.role === 'user' ? 'none' : '1px solid var(--line)',
                padding: '12px 16px',
                borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                fontSize: 14, lineHeight: 1.5
              }}>{m.text}</div>
            );
          })}
        </div>
        <div style={{ padding: 24, borderTop: '1px solid var(--line)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', gap: 8 }}>
            <input className="ds-input" placeholder="Demande à Lumi…" value={input} onChange={e => setInput(e.target.value)} style={{ padding: '14px 16px', fontSize: 14 }} />
            <button className="ds-btn ds-btn-accent ds-btn-lg"><Ico.Send /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportsScreen() {
  return (
    <div style={{ padding: 28 }}>
      <PageHeader eyebrow="Boutique · Compta" title="Rapports & comptabilité" sub="Avril 2026"
        actions={<><button className="ds-btn">Période</button><button className="ds-btn ds-btn-primary">Exporter PDF</button></>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 14 }}>
        {[
          { l: 'CA mois', v: '18\'420', u: 'CHF', d: '+12% vs mars' },
          { l: 'Ventes', v: '23', u: 'pièces', d: 'panier moy. 800 CHF' },
          { l: 'TVA collectée', v: '1\'418', u: 'CHF', d: '7,7%' },
          { l: 'Marge brute', v: '52', u: '%', d: 'objectif 55%' },
        ].map(s => (
          <div key={s.l} className="ds-card ds-card-pad">
            <div className="ds-eyebrow">{s.l}</div>
            <div style={{ display: 'baseline', marginTop: 6 }}>
              <span className="ds-num" style={{ fontSize: 36 }}>{s.v}</span>
              <span style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 6 }}>{s.u}</span>
            </div>
            <div className="ds-body" style={{ fontSize: 11, marginTop: 4 }}>{s.d}</div>
          </div>
        ))}
      </div>
      <div className="ds-card" style={{ marginTop: 18, padding: 24 }}>
        <div className="ds-eyebrow">Évolution du CA · 30 derniers jours</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 160, marginTop: 18 }}>
          {Array.from({ length: 30 }).map((_, i) => {
            const h = 20 + Math.abs(Math.sin(i * 0.7)) * 120;
            return <div key={i} style={{ flex: 1, height: h, background: i === 26 ? 'var(--accent)' : 'var(--line-2)', borderRadius: 3 }} />;
          })}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
        <div className="ds-card ds-card-pad">
          <div className="ds-eyebrow">Top catégories</div>
          {[
            { c: 'Bagues', p: 42, v: '7\'736 CHF' },
            { c: 'Colliers', p: 31, v: '5\'710 CHF' },
            { c: 'Boucles', p: 27, v: '4\'974 CHF' },
          ].map(c => (
            <div key={c.c} style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span style={{ fontSize: 13 }}>{c.c}</span><span className="ds-meta">{c.v}</span></div>
              <div style={{ height: 4, background: 'var(--surface-2)', borderRadius: 2 }}><div style={{ width: c.p + '%', height: '100%', background: 'var(--accent)', borderRadius: 2 }} /></div>
            </div>
          ))}
        </div>
        <div className="ds-card ds-card-pad">
          <div className="ds-eyebrow">Échéances fiscales</div>
          {[
            { l: 'Décompte TVA Q1', d: '31 mai · dans 34 jours', tone: 'warn' },
            { l: 'Acompte impôt boutique', d: '15 juin · dans 49 jours', tone: 'good' },
          ].map(e => (
            <div key={e.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--line)' }}>
              <div><div style={{ fontSize: 13, fontWeight: 500 }}>{e.l}</div><div className="ds-meta" style={{ fontSize: 11, marginTop: 2 }}>{e.d}</div></div>
              <span className={'ds-status-dot ' + e.tone} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsScreen() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', height: '100%' }}>
      <aside style={{ borderRight: '1px solid var(--line)', padding: '20px 12px' }}>
        <div className="ds-eyebrow" style={{ paddingLeft: 12, marginBottom: 8 }}>Réglages</div>
        {['Boutique', 'Équipe', 'Paiements', 'Notifications', 'Lumi & IA', 'Intégrations', 'Sécurité', 'Facturation'].map((s, i) => (
          <button key={s} className={'ds-btn-reset ds-sb-item' + (i === 0 ? ' active' : '')} style={{ marginBottom: 2 }}>{s}</button>
        ))}
      </aside>
      <div style={{ padding: 32, overflowY: 'auto' }}>
        <h1 className="ds-h2">Boutique</h1>
        <div className="ds-body" style={{ marginTop: 4, marginBottom: 28 }}>Informations affichées sur tes reçus, tes factures et tes communications.</div>
        <div className="ds-card ds-card-pad">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="ds-field"><label className="ds-label">Nom commercial</label><input className="ds-input" defaultValue="LuxePOS · Maëlle" /></div>
            <div className="ds-field"><label className="ds-label">Raison sociale</label><input className="ds-input" defaultValue="Maison Maëlle Sàrl" /></div>
            <div className="ds-field"><label className="ds-label">Adresse</label><input className="ds-input" defaultValue="Place du Molard 12" /></div>
            <div className="ds-field"><label className="ds-label">Ville</label><input className="ds-input" defaultValue="1204 Genève" /></div>
            <div className="ds-field"><label className="ds-label">N° TVA</label><input className="ds-input" defaultValue="CHE-114.293.857 TVA" /></div>
            <div className="ds-field"><label className="ds-label">IBAN</label><input className="ds-input" defaultValue="CH93 0076 2011 6238 5295 7" /></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 14 }}>
            <button className="ds-btn ds-btn-ghost">Annuler</button>
            <button className="ds-btn ds-btn-accent">Enregistrer</button>
          </div>
        </div>
        <div className="ds-card ds-card-pad" style={{ marginTop: 18 }}>
          <div className="ds-eyebrow">Horaires d'ouverture</div>
          {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map((d, i) => (
            <div key={d} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr 32px', gap: 14, alignItems: 'center', padding: '12px 0', borderBottom: i < 5 ? '1px solid var(--line)' : 0 }}>
              <span style={{ fontSize: 13 }}>{d}</span>
              <input className="ds-input" defaultValue="10:00" />
              <input className="ds-input" defaultValue="19:00" />
              <button className="ds-btn ds-btn-sm ds-btn-ghost"><Ico.X /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoginScreen() {
  return (
    <div style={{ width: 1280, height: 820, background: 'var(--bg)', display: 'grid', gridTemplateColumns: '1fr 480px' }}>
      <div style={{ padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(160deg, var(--accent-soft), var(--bg))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Logo /> <span style={{ fontFamily: 'var(--serif)', fontSize: 22 }}>LuxePOS</span></div>
        <div>
          <div className="ds-eyebrow" style={{ color: 'var(--accent-ink)' }}>Caisse · gestion · clientèle</div>
          <h1 className="ds-h1" style={{ marginTop: 12, fontSize: 56, color: 'var(--accent-ink)' }}>L'outil <em style={{ fontStyle: 'italic' }}>artisan</em><br/>de votre boutique.</h1>
          <div className="ds-body" style={{ fontSize: 16, maxWidth: 380, marginTop: 16 }}>Encaissez, gérez votre stock, parlez à vos client·e·s — accompagné·e par Lumi.</div>
        </div>
        <div className="ds-meta">© 2026 LuxePOS · Genève</div>
      </div>
      <div style={{ background: 'var(--surface)', padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="ds-eyebrow">Connexion</div>
        <h2 className="ds-h2" style={{ marginTop: 8, marginBottom: 28 }}>Bon retour, Maëlle.</h2>
        <div className="ds-field"><label className="ds-label">Email</label><input className="ds-input" defaultValue="maelle@maison-maelle.ch" /></div>
        <div className="ds-field"><label className="ds-label">Mot de passe</label><input className="ds-input" type="password" defaultValue="••••••••••" /></div>
        <button className="ds-btn ds-btn-accent ds-btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>Entrer en boutique <Ico.Arrow /></button>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <button className="ds-btn ds-btn-ghost ds-btn-sm">Mot de passe oublié ?</button>
          <button className="ds-btn ds-btn-ghost ds-btn-sm">Nouvelle boutique →</button>
        </div>
      </div>
    </div>
  );
}

function OnboardingScreen() {
  const [step, setStep] = React.useState(2);
  const steps = ['Boutique', 'Stock', 'Lumi', 'Prêt·e'];
  return (
    <div style={{ width: 1280, height: 820, background: 'var(--bg)', padding: 56, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Logo /> <span style={{ fontFamily: 'var(--serif)', fontSize: 22 }}>LuxePOS</span></div>
        <button className="ds-btn ds-btn-ghost ds-btn-sm">Reprendre plus tard</button>
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 36 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ flex: 1 }}>
            <div style={{ height: 3, background: i <= step ? 'var(--accent)' : 'var(--line-2)', borderRadius: 2 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: i <= step ? 'var(--accent)' : 'var(--muted)' }}>{String(i + 1).padStart(2, '0')} · {s}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 720, margin: '0 auto', width: '100%' }}>
        <div className="ds-eyebrow">Étape 3 sur 4</div>
        <h1 className="ds-h1" style={{ marginTop: 12, marginBottom: 12, fontSize: 56 }}>Présentez-vous à <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Lumi</em>.</h1>
        <div className="ds-body" style={{ fontSize: 16, marginBottom: 32 }}>Lumi est votre compagnon. Plus elle vous connaît, plus ses suggestions sont justes.</div>
        <div className="ds-card ds-card-pad">
          <div className="ds-field"><label className="ds-label">Personnalité de votre boutique</label><textarea className="ds-input" rows="3" placeholder="Bijouterie artisanale, pièces uniques, clientèle locale fidèle…"></textarea></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="ds-field"><label className="ds-label">Ton préféré pour les DM</label><select className="ds-input"><option>Chaleureux & soigné</option><option>Direct</option><option>Très formel</option></select></div>
            <div className="ds-field"><label className="ds-label">Lumi peut publier sur Instagram ?</label><select className="ds-input"><option>Brouillons uniquement</option><option>Avec validation</option><option>Autonomie totale</option></select></div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="ds-btn" onClick={() => setStep(s => Math.max(0, s - 1))}>← Retour</button>
        <button className="ds-btn ds-btn-accent ds-btn-lg" onClick={() => setStep(s => Math.min(3, s + 1))}>Continuer <Ico.Arrow /></button>
      </div>
    </div>
  );
}

window.LumiFullScreen = LumiFullScreen;
window.ReportsScreen = ReportsScreen;
window.SettingsScreen = SettingsScreen;
window.LoginScreen = LoginScreen;
window.OnboardingScreen = OnboardingScreen;
