const COMPONENTS = [
{
  id: 'gradient-button', name: 'Gradient Button', category: 'Buttons', description: 'Animated gradient button with hover lift.',
  html: '<button class="btn-grad">Get Started</button>',
  css: `.btn-grad{padding:12px 28px;border:0;border-radius:10px;color:#fff;font-weight:600;font-size:16px;cursor:pointer;background:linear-gradient(135deg,#6366f1,#ec4899);background-size:200% 200%;transition:transform .2s,box-shadow .2s,background-position .4s}
.btn-grad:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(99,102,241,.4);background-position:100% 0}
.btn-grad:active{transform:translateY(0)}`,
  js: ''
},
{
  id: 'ripple-button', name: 'Ripple Button', category: 'Buttons', description: 'Material-style click ripple effect.',
  html: '<button class="ripple">Click me</button>',
  css: `.ripple{position:relative;overflow:hidden;padding:12px 28px;border:0;border-radius:8px;background:#0ea5e9;color:#fff;font-size:16px;cursor:pointer}
.ripple span{position:absolute;border-radius:50%;background:rgba(255,255,255,.5);transform:scale(0);animation:rip .6s linear}
@keyframes rip{to{transform:scale(4);opacity:0}}`,
  js: `document.querySelectorAll('.ripple').forEach(b=>b.addEventListener('click',e=>{
  const r=b.getBoundingClientRect(),s=document.createElement('span'),d=Math.max(r.width,r.height);
  s.style.cssText='width:'+d+'px;height:'+d+'px;left:'+(e.clientX-r.left-d/2)+'px;top:'+(e.clientY-r.top-d/2)+'px';
  b.appendChild(s);setTimeout(()=>s.remove(),600);
}));`
},
{
  id: 'profile-card', name: 'Profile Card', category: 'Cards', description: 'Clean user card with avatar, stats and action.',
  html: `<div class="pcard"><div class="av">AK</div><h3>Aarav Kumar</h3><p>Full-stack Developer</p><div class="stats"><div><b>128</b><small>Posts</small></div><div><b>4.2k</b><small>Followers</small></div><div><b>312</b><small>Following</small></div></div><button>Follow</button></div>`,
  css: `.pcard{width:280px;padding:28px;text-align:center;background:#fff;border-radius:18px;box-shadow:0 10px 30px rgba(0,0,0,.1)}
.av{width:80px;height:80px;margin:0 auto 12px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#22d3ee);color:#fff;font-size:26px;font-weight:700;display:grid;place-items:center}
.pcard p{color:#667085;margin:4px 0 18px}
.stats{display:flex;justify-content:space-around;margin-bottom:20px}
.stats b{display:block;font-size:18px}.stats small{color:#667085}
.pcard button{width:100%;padding:10px;border:0;border-radius:10px;background:#111827;color:#fff;font-weight:600;cursor:pointer}`,
  js: ''
},
{
  id: 'pricing-card', name: 'Pricing Card', category: 'Cards', description: 'Highlighted pricing plan with feature list.',
  html: `<div class="price"><span class="tag">Popular</span><h3>Pro</h3><div class="amt">₹799<small>/mo</small></div><ul><li>Unlimited projects</li><li>Priority support</li><li>Custom domain</li></ul><button>Choose plan</button></div>`,
  css: `.price{position:relative;width:270px;padding:32px 26px;background:#fff;border:2px solid #6366f1;border-radius:18px;box-shadow:0 12px 32px rgba(99,102,241,.2)}
.tag{position:absolute;top:-12px;right:20px;background:#6366f1;color:#fff;font-size:12px;padding:4px 12px;border-radius:99px}
.amt{font-size:40px;font-weight:800;margin:8px 0 16px}.amt small{font-size:15px;color:#667085;font-weight:400}
.price ul{list-style:none;padding:0;margin:0 0 22px}.price li{padding:6px 0}.price li:before{content:'✓ ';color:#10b981;font-weight:700}
.price button{width:100%;padding:12px;border:0;border-radius:10px;background:#6366f1;color:#fff;font-weight:600;cursor:pointer}`,
  js: ''
},
{
  id: 'responsive-navbar', name: 'Responsive Navbar', category: 'Navigation', description: 'Navbar with hamburger menu on mobile.',
  html: `<nav class="nav"><b>Brand</b><button class="burger" aria-label="Menu">☰</button><ul class="links"><li><a href="#">Home</a></li><li><a href="#">Products</a></li><li><a href="#">About</a></li><li><a href="#">Contact</a></li></ul></nav>`,
  css: `body{align-items:flex-start!important;padding:0!important}
.nav{width:100%;display:flex;justify-content:space-between;align-items:center;padding:14px 24px;background:#111827;color:#fff;position:relative}
.links{display:flex;gap:24px;list-style:none;margin:0;padding:0}.links a{color:#cbd5e1;text-decoration:none}.links a:hover{color:#fff}
.burger{display:none;background:none;border:0;color:#fff;font-size:24px;cursor:pointer}
@media(max-width:640px){.burger{display:block}.links{display:none;position:absolute;top:100%;left:0;right:0;flex-direction:column;gap:0;background:#111827}.links.open{display:flex}.links a{display:block;padding:14px 24px}}`,
  js: `document.querySelector('.burger').onclick=()=>document.querySelector('.links').classList.toggle('open');`
},
{
  id: 'tabs', name: 'Tabs', category: 'Navigation', description: 'Accessible tab switcher.',
  html: `<div class="tabs"><div class="tab-list" role="tablist"><button role="tab" class="active" data-t="1">Overview</button><button role="tab" data-t="2">Specs</button><button role="tab" data-t="3">Reviews</button></div><div class="panel active" id="p1">Overview content goes here.</div><div class="panel" id="p2">Specifications content.</div><div class="panel" id="p3">Customer reviews.</div></div>`,
  css: `.tabs{width:340px}.tab-list{display:flex;border-bottom:2px solid #e5e7eb}
.tab-list button{flex:1;padding:10px;border:0;background:none;cursor:pointer;color:#667085;border-bottom:2px solid transparent;margin-bottom:-2px;font-size:15px}
.tab-list button.active{color:#6366f1;border-color:#6366f1;font-weight:600}
.panel{display:none;padding:18px 4px}.panel.active{display:block}`,
  js: `document.querySelectorAll('.tab-list button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.tab-list button,.panel').forEach(e=>e.classList.remove('active'));
  b.classList.add('active');document.getElementById('p'+b.dataset.t).classList.add('active');
});`
},
{
  id: 'accordion', name: 'Accordion', category: 'Navigation', description: 'FAQ accordion using native details element, no JS.',
  html: `<div class="acc"><details open><summary>What is this?</summary><p>A free component library.</p></details><details><summary>Can I use it commercially?</summary><p>Yes, copy and use anywhere.</p></details><details><summary>Is JS required?</summary><p>Not for this one.</p></details></div>`,
  css: `.acc{width:340px}.acc details{border:1px solid #e5e7eb;border-radius:10px;margin-bottom:8px;background:#fff;overflow:hidden}
.acc summary{padding:14px 16px;cursor:pointer;font-weight:600;list-style:none;display:flex;justify-content:space-between}
.acc summary::after{content:'+';font-size:20px;line-height:1}.acc details[open] summary::after{content:'−'}
.acc p{margin:0;padding:0 16px 16px;color:#667085}`,
  js: ''
},
{
  id: 'toggle-switch', name: 'Toggle Switch', category: 'Forms', description: 'Pure CSS iOS-style toggle.',
  html: `<label class="sw"><input type="checkbox" checked><span></span></label>`,
  css: `.sw{position:relative;width:56px;height:30px;display:inline-block}.sw input{opacity:0;width:0;height:0}
.sw span{position:absolute;inset:0;background:#cbd5e1;border-radius:99px;cursor:pointer;transition:.25s}
.sw span::before{content:'';position:absolute;width:24px;height:24px;left:3px;top:3px;background:#fff;border-radius:50%;transition:.25s;box-shadow:0 2px 4px rgba(0,0,0,.25)}
.sw input:checked+span{background:#22c55e}.sw input:checked+span::before{transform:translateX(26px)}`,
  js: ''
},
{
  id: 'floating-input', name: 'Floating Label Input', category: 'Forms', description: 'Input whose label floats on focus.',
  html: `<div class="fl"><input id="em" type="email" placeholder=" " required><label for="em">Email address</label></div>`,
  css: `.fl{position:relative;width:300px}
.fl input{width:100%;padding:18px 14px 8px;border:1.5px solid #cbd5e1;border-radius:10px;font-size:16px;outline:none;transition:border .2s}
.fl label{position:absolute;left:14px;top:14px;color:#667085;pointer-events:none;transition:.2s;transform-origin:left}
.fl input:focus{border-color:#6366f1}
.fl input:focus+label,.fl input:not(:placeholder-shown)+label{transform:translateY(-9px) scale(.75);color:#6366f1}`,
  js: ''
},
{
  id: 'modal-dialog', name: 'Modal Dialog', category: 'Overlays', description: 'Native <dialog> modal with backdrop.',
  html: `<button id="open" class="o">Open modal</button><dialog id="dlg"><h3>Confirm action</h3><p>Are you sure you want to continue?</p><div class="row"><button id="no">Cancel</button><button id="yes" class="o">Confirm</button></div></dialog>`,
  css: `.o{padding:10px 22px;border:0;border-radius:8px;background:#6366f1;color:#fff;cursor:pointer;font-size:15px}
dialog{border:0;border-radius:16px;padding:26px;width:320px;box-shadow:0 20px 60px rgba(0,0,0,.3)}
dialog::backdrop{background:rgba(0,0,0,.5);backdrop-filter:blur(3px)}
dialog p{color:#667085}.row{display:flex;gap:10px;justify-content:flex-end;margin-top:20px}
.row button:first-child{padding:10px 18px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;cursor:pointer}`,
  js: `const d=document.getElementById('dlg');
document.getElementById('open').onclick=()=>d.showModal();
document.getElementById('no').onclick=()=>d.close();
document.getElementById('yes').onclick=()=>d.close();`
},
{
  id: 'toast', name: 'Toast Notification', category: 'Overlays', description: 'Auto-dismissing toast message.',
  html: `<button id="t" class="tb">Show toast</button><div id="toast">✅ Saved successfully</div>`,
  css: `.tb{padding:10px 22px;border:0;border-radius:8px;background:#111827;color:#fff;cursor:pointer}
#toast{position:fixed;bottom:24px;right:24px;background:#111827;color:#fff;padding:14px 20px;border-radius:10px;transform:translateY(100px);opacity:0;transition:.35s}
#toast.show{transform:none;opacity:1}`,
  js: `document.getElementById('t').onclick=()=>{const e=document.getElementById('toast');e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200)};`
},
{
  id: 'spinner', name: 'Loading Spinner', category: 'Loaders', description: 'Lightweight CSS spinner and dots.',
  html: `<div class="spin"></div>`,
  css: `.spin{width:48px;height:48px;border:5px solid #e5e7eb;border-top-color:#6366f1;border-radius:50%;animation:s .8s linear infinite}
@keyframes s{to{transform:rotate(360deg)}}`,
  js: ''
},
{
  id: 'skeleton', name: 'Skeleton Loader', category: 'Loaders', description: 'Shimmer placeholder for loading content.',
  html: `<div class="sk"><div class="sk-img"></div><div class="sk-l"></div><div class="sk-l s"></div></div>`,
  css: `.sk{width:280px}.sk-img,.sk-l{background:linear-gradient(90deg,#eee 25%,#f8f8f8 50%,#eee 75%);background-size:200% 100%;animation:sh 1.3s infinite;border-radius:8px}
.sk-img{height:140px;margin-bottom:12px}.sk-l{height:14px;margin-bottom:10px}.sk-l.s{width:60%}
@keyframes sh{to{background-position:-200% 0}}`,
  js: ''
},
{
  id: 'hero', name: 'Hero Section', category: 'Sections', description: 'Centered hero with headline and two CTAs.',
  html: `<section class="hero"><h1>Build faster with <em>ready-made</em> UI</h1><p>Beautiful, responsive components you can copy and ship today.</p><div><a class="b1" href="#">Get started</a><a class="b2" href="#">Learn more</a></div></section>`,
  css: `.hero{text-align:center;max-width:600px}.hero h1{font-size:clamp(28px,6vw,46px);line-height:1.15;margin:0 0 14px}
.hero em{font-style:normal;background:linear-gradient(90deg,#6366f1,#ec4899);-webkit-background-clip:text;background-clip:text;color:transparent}
.hero p{color:#667085;margin:0 0 24px}.hero a{display:inline-block;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:600;margin:4px}
.b1{background:#6366f1;color:#fff}.b2{border:1px solid #cbd5e1;color:#111827}`,
  js: ''
},
{
  id: 'alert', name: 'Alert Banner', category: 'Feedback', description: 'Dismissible info alert.',
  html: `<div class="al" id="al"><span>ℹ️ A new version is available.</span><button id="x" aria-label="Dismiss">✕</button></div>`,
  css: `.al{display:flex;justify-content:space-between;align-items:center;gap:16px;width:360px;padding:14px 16px;background:#eff6ff;border:1px solid #bfdbfe;color:#1e40af;border-radius:10px}
.al button{background:none;border:0;color:inherit;cursor:pointer;font-size:16px}`,
  js: `document.getElementById('x').onclick=()=>document.getElementById('al').remove();`
}
];
