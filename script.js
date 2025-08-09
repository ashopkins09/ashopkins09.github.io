// script.js
// Simple mouse-parallax tilt for the card + subtle movement of blobs when mouse moves
(() => {
  const card = document.getElementById('glassCard');
  const blobs = document.querySelectorAll('.blob');

  if (!card) return;

  // Limit tilt magnitude
  const maxTilt = 10;

  // Track mouse on document
  window.addEventListener('mousemove', (e) => {
    const { innerWidth: w, innerHeight: h } = window;
    const x = e.clientX - w / 2;
    const y = e.clientY - h / 2;

    // normalized -1..1
    const nx = (x / (w / 2));
    const ny = (y / (h / 2));

    // apply tilt - invert Y to make it feel natural
    const tiltY = nx * maxTilt;
    const tiltX = -ny * maxTilt;

    card.style.setProperty('--tiltX', tiltX.toFixed(2));
    card.style.setProperty('--tiltY', tiltY.toFixed(2));

    // move blobs subtly
    blobs.forEach((b, i) => {
      const mul = 10 + i * 6;
      const dx = -nx * mul;
      const dy = -ny * (mul * 0.6);
      b.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${1 + i*0.02})`;
    });
  });

  // subtle idle animation to prevent static look on mobile when there's no mousemove
  let t = 0;
  function idleLoop(){
    t += 0.006;
    blobs.forEach((b, i) => {
      const dx = Math.sin(t * (0.5 + i * 0.3)) * (8 + i*7);
      const dy = Math.cos(t * (0.4 + i * 0.25)) * (6 + i*4);
      // only apply if mouse not controlling heavily (quick check: tilt values near 0)
      const tiltX = parseFloat(getComputedStyle(card).getPropertyValue('--tiltX')) || 0;
      const tiltY = parseFloat(getComputedStyle(card).getPropertyValue('--tiltY')) || 0;
      const damp = (Math.abs(tiltX) + Math.abs(tiltY)) < 1 ? 1 : 0.08;
      b.style.transform = `translate3d(${dx * damp}px, ${dy * damp}px, 0)`;
    });
    requestAnimationFrame(idleLoop);
  }
  idleLoop();

  // Make card accessible with keyboard focus
  card.setAttribute('tabindex', '0');
  card.addEventListener('focus', () => card.classList.add('focused'));
  card.addEventListener('blur', () => card.classList.remove('focused'));

})();
