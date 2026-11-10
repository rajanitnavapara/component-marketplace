(() => {
  const $ = (s) => document.querySelector(s);
  const grid = $('#grid'), cats = $('#cats'), search = $('#search');
  let cat = 'All', current = null, tab = 'preview';

  const doc = (c) => '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif;padding:16px}' + c.css + '</style></head><body>' + c.html + '<script>' + (c.js || '') + '<\/script></body></html>';
  const full = (c) => '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>' + c.name + '</title>\n<style>\n' + c.css + '\n</style>\n</head>\n<body>\n' + c.html + '\n' + (c.js ? '<script>\n' + c.js + '\n<\/script>\n' : '') + '</body>\n</html>';

  const categories = ['All', ...new Set(COMPONENTS.map((c) => c.category))];
  cats.innerHTML = categories.map((c) => '<button class="' + (c === cat ? 'on' : '') + '">' + c + '</button>').join('');
  cats.onclick = (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    cat = e.target.textContent;
    [...cats.children].forEach((b) => b.classList.toggle('on', b.textContent === cat));
    render();
  };

  function render() {
    const q = search.value.trim().toLowerCase();
    const list = COMPONENTS.filter((c) => (cat === 'All' || c.category === cat) && (c.name + c.description + c.category).toLowerCase().includes(q));
    grid.innerHTML = '';
    list.forEach((c) => {
      const el = document.createElement('article');
      el.className = 'item';
      el.innerHTML = '<div class="thumb"><iframe loading="lazy" sandbox="allow-scripts" tabindex="-1" title="' + c.name + '"></iframe></div><div class="meta"><span>' + c.category + '</span><b>' + c.name + '</b></div>';
      el.querySelector('iframe').srcdoc = doc(c);
      el.onclick = () => open(c);
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
    current = c; tab = 'preview';
    $('#m-title').textContent = c.name;
    $('#m-desc').textContent = c.description;
    $('#frame').srcdoc = doc(c);
    $('#frame').style.width = '100%';
    [...$('#sizes').children].forEach((b, i) => b.classList.toggle('on', i === 2));
    $('#modal').hidden = false;
    document.body.style.overflow = 'hidden';
    show();
  }
  const close = () => { $('#modal').hidden = true; document.body.style.overflow = ''; $('#frame').srcdoc = ''; };

  $('#tabs').onclick = (e) => { if (e.target.dataset.tab) { tab = e.target.dataset.tab; show(); } };
  $('#sizes').onclick = (e) => {
    if (!e.target.dataset.w) return;
    const w = e.target.dataset.w;
    $('#frame').style.width = w === '100%' ? '100%' : w + 'px';
    [...$('#sizes').children].forEach((b) => b.classList.toggle('on', b === e.target));
  };
  $('#close').onclick = close;
  $('#modal').onclick = (e) => { if (e.target.id === 'modal') close(); };
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  $('#copy').onclick = async () => {
    const text = $('#code-text').textContent;
    try { await navigator.clipboard.writeText(text); }
    catch { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); }
    const t = $('#toast'); t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 1400);
  };

  const root = document.documentElement;
  root.dataset.theme = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  $('#theme').onclick = () => { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('theme', root.dataset.theme); };

  search.oninput = render;
  render();
})();
