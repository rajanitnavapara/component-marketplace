(() => {
  const $ = (s) => document.querySelector(s);
  const grid = $('#grid'), cats = $('#cats'), search = $('#search');
  let cat = 'All', current = null, tab = 'preview', lastFocus = null;

  const doc = (c) => '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif;padding:16px}' + c.css + '</style></head><body>' + c.html + '<script>' + (c.js || '') + '<\/script></body></html>';
  const full = (c) => '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>' + c.name + '</title>\n<style>\n' + c.css + '\n</style>\n</head>\n<body>\n' + c.html + '\n' + (c.js ? '<script>\n' + c.js + '\n<\/script>\n' : '') + '</body>\n</html>';

  const categories = ['All', ...new Set(COMPONENTS.map((c) => c.category))];
  cats.innerHTML = categories.map((c) => '<button class="' + (c === cat ? 'on' : '') + '" aria-pressed="' + (c === cat) + '">' + c + '</button>').join('');
  cats.onclick = (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    cat = e.target.textContent;
    [...cats.children].forEach((b) => { const on = b.textContent === cat; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
    render();
  };

  function render() {
    const q = search.value.trim().toLowerCase();
    const list = COMPONENTS.filter((c) => (cat === 'All' || c.category === cat) && (c.name + c.description + c.category).toLowerCase().includes(q));
    grid.innerHTML = '';
    list.forEach((c) => {
      const el = document.createElement('article');
      el.className = 'item';
      el.tabIndex = 0;
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', 'Open ' + c.name);
      el.innerHTML = '<div class="thumb"><iframe loading="lazy" sandbox="allow-scripts" tabindex="-1" title="' + c.name + '"></iframe></div><div class="meta"><span>' + c.category + '</span><b>' + c.name + '</b></div>';
      el.querySelector('iframe').srcdoc = doc(c);
      el.onclick = () => open(c);
      el.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(c); } };
      grid.appendChild(el);
    });
    $('#empty').hidden = list.length > 0;
  }

  function show() {
    const isP = tab === 'preview';
    $('#pv').hidden = !isP;
    $('#code').hidden = isP;
    [...$('#tabs').children].forEach((b) => b.classList.toggle('on', b.dataset.tab === tab));
    if (!isP) {
      const txt = tab === 'all' ? full(current) : (current[tab] || '/* No ' + tab.toUpperCase() + ' needed for this component */');
      $('#code-text').textContent = txt;
    }
  }

  function open(c) {
    lastFocus = document.activeElement;
    current = c; tab = 'preview';
    $('#m-title').textContent = c.name;
    $('#m-desc').textContent = c.description;
    $('#frame').srcdoc = doc(c);
    $('#frame').style.width = '100%';
    [...$('#sizes').children].forEach((b, i) => b.classList.toggle('on', i === 2));
    $('#modal').hidden = false;
    document.body.style.overflow = 'hidden';
    show();
    $('#close').focus();
  }
  const close = () => {
    $('#modal').hidden = true; document.body.style.overflow = ''; $('#frame').srcdoc = '';
    if (lastFocus) lastFocus.focus();
  };

  $('#tabs').onclick = (e) => { if (e.target.dataset.tab) { tab = e.target.dataset.tab; show(); } };
  $('#sizes').onclick = (e) => {
    if (!e.target.dataset.w) return;
    const w = e.target.dataset.w;
    $('#frame').style.width = w === '100%' ? '100%' : w + 'px';
    [...$('#sizes').children].forEach((b) => b.classList.toggle('on', b === e.target));
  };
  $('#close').onclick = close;
  $('#modal').onclick = (e) => { if (e.target.id === 'modal') close(); };
  document.addEventListener('keydown', (e) => {
    if ($('#modal').hidden) return;
    if (e.key === 'Escape') return close();
    if (e.key !== 'Tab') return;
    const f = [...$('#modal').querySelectorAll('button')].filter((b) => b.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    else if (!$('#modal').contains(document.activeElement)) { e.preventDefault(); first.focus(); }
  });

  $('#copy').onclick = async () => {
    const text = $('#code-text').textContent;
    try { await navigator.clipboard.writeText(text); }
    catch { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); }
    const btn = $('#copy'); btn.textContent = 'Copied ✓';
    const t = $('#toast'); t.classList.add('show');
    setTimeout(() => { t.classList.remove('show'); btn.textContent = 'Copy'; }, 1400);
  };

  const root = document.documentElement;
  const setTheme = (t) => { root.dataset.theme = t; $('#theme').setAttribute('aria-pressed', t === 'dark'); };
  setTheme(localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  $('#theme').onclick = () => { const n = root.dataset.theme === 'dark' ? 'light' : 'dark'; setTheme(n); localStorage.setItem('theme', n); };

  search.oninput = render;
  render();
})();
