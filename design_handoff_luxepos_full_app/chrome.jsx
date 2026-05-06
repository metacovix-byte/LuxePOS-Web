// LuxePOS — Shared chrome (Sidebar, Topbar, Page wrappers, Logo, Avatar)

const NavItems = [
  { section: 'principal', items: [
    { k: 'home', label: 'Tableau', icon: 'Home' },
    { k: 'pos', label: 'Caisse', icon: 'Bolt' },
    { k: 'inbox', label: 'Boîte', icon: 'Inbox', badge: 12 },
    { k: 'lumi', label: 'Lumi', icon: 'Sparkle' },
  ]},
  { section: 'boutique', items: [
    { k: 'catalog', label: 'Catalogue', icon: 'Bag' },
    { k: 'stock', label: 'Stock', icon: 'Box' },
    { k: 'customers', label: 'Clientèle', icon: 'Users' },
    { k: 'sales', label: 'Ventes', icon: 'Chart' },
  ]},
  { section: 'admin', items: [
    { k: 'reports', label: 'Compta', icon: 'Calc' },
    { k: 'settings', label: 'Réglages', icon: 'Settings' },
  ]},
];

function Logo({ size = 38 }) {
  return (
    <div className="ds-logo" style={{ width: size, height: size, fontSize: size * 0.58, borderRadius: size * 0.29 }}>L</div>
  );
}

function Sidebar({ active, onChange }) {
  return (
    <aside className="ds-sidebar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px 8px' }}>
        <Logo size={32} />
        <div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1 }}>LuxePOS</div>
          <div className="ds-meta" style={{ fontSize: 9, marginTop: 2 }}>Place du Molard</div>
        </div>
      </div>
      {NavItems.map(group => (
        <React.Fragment key={group.section}>
          <div className="ds-sb-section">{group.section}</div>
          {group.items.map(it => {
            const I = Ico[it.icon];
            return (
              <button key={it.k}
                      className={'ds-sb-item' + (active === it.k ? ' active' : '')}
                      onClick={() => onChange(it.k)}>
                {I && <I />} {it.label}
                {it.badge && <span className="ds-sb-badge">{it.badge}</span>}
              </button>
            );
          })}
        </React.Fragment>
      ))}
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, borderTop: '1px solid var(--line)' }}>
        <div className="ds-avatar" style={{ width: 32, height: 32, fontSize: 12 }}>M</div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 500 }}>Maëlle</div>
          <div className="ds-meta" style={{ fontSize: 9 }}>● en boutique</div>
        </div>
      </div>
    </aside>
  );
}

function WindowChrome({ title, children }) {
  return (
    <div className="ds-window">
      <div className="ds-titlebar">
        <div className="ds-titlebar-logo">L</div>
        <span style={{ opacity: .4 }}>|</span>
        <span>{title}</span>
        <div className="ds-titlebar-actions">
          <button className="ds-btn-reset ds-titlebar-btn"><Ico.Min /></button>
          <button className="ds-btn-reset ds-titlebar-btn"><Ico.Sq /></button>
          <button className="ds-btn-reset ds-titlebar-btn"><Ico.X /></button>
        </div>
      </div>
      <div className="ds-app-body">
        {children}
      </div>
    </div>
  );
}

function PageHeader({ eyebrow, title, sub, actions }) {
  return (
    <div className="ds-page-header">
      <div>
        {eyebrow && <div className="ds-eyebrow-line"><span className="dot" /><span className="ds-eyebrow">{eyebrow}</span></div>}
        <h1 className="ds-h1">{title}</h1>
        {sub && <div className="ds-body" style={{ marginTop: 8 }}>{sub}</div>}
      </div>
      {actions && <div style={{ display: 'flex', gap: 8 }}>{actions}</div>}
    </div>
  );
}

window.NavItems = NavItems;
window.Logo = Logo;
window.Sidebar = Sidebar;
window.WindowChrome = WindowChrome;
window.PageHeader = PageHeader;
