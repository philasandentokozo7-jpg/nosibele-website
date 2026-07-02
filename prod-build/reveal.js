/* Nosibele — tasteful scroll reveal (soft fade-up).
   SAFE BY DESIGN: only sections that start BELOW the fold are ever hidden, so the
   first screen (hero) is always visible. Reveal is rect-based on scroll, with a
   blanket fail-safe + beforeprint guard, so content never stays hidden
   (print/PDF/reduced-motion/no-JS/backgrounded tab all show content). */
(function () {
  if (window.__nbReveal) return;
  window.__nbReveal = true;

  var ok = true;
  try { if (matchMedia('(prefers-reduced-motion: reduce)').matches) ok = false; } catch (e) {}
  if (!ok) return; // leave everything visible

  var style = document.createElement('style');
  style.textContent =
    '.nb-rv{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1);will-change:opacity,transform}' +
    '.nb-rv.is-in{opacity:1;transform:none}';
  document.head.appendChild(style);

  var watched = [];
  function vh() { return window.innerHeight || 800; }
  function scan() {
    var nodes = document.querySelectorAll('#root section');
    for (var i = 0; i < nodes.length; i++) {
      var s = nodes[i];
      if (s.__rv) continue;
      s.__rv = true;
      var top = s.getBoundingClientRect().top;
      if (top < Math.max(vh() * 0.9, 680)) continue;   // in/near top → leave fully visible
      s.classList.add('nb-rv');               // below fold → hide, reveal on scroll
      watched.push(s);
    }
    update();
  }
  function update() {
    for (var i = watched.length - 1; i >= 0; i--) {
      var r = watched[i].getBoundingClientRect();
      if (r.top < vh() * 0.9 && r.bottom > 0) { watched[i].classList.add('is-in'); watched.splice(i, 1); }
    }
  }
  function revealAll() {
    document.querySelectorAll('.nb-rv').forEach(function (e) { e.classList.add('is-in'); });
    watched = [];
  }

  function start() {
    var root = document.getElementById('root');
    if (root) new MutationObserver(scan).observe(root, { childList: true, subtree: true });
    scan();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    var ticks = 0;
    var iv = setInterval(function () { scan(); if (++ticks > 25) clearInterval(iv); }, 200);
    setTimeout(revealAll, 6000);
  }
  window.addEventListener('beforeprint', revealAll);

  if (document.readyState !== 'loading') start();
  else document.addEventListener('DOMContentLoaded', start);
})();
