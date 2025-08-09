// script.js
// Light parallax tilt effect for glass card
(() => {
  const card = document.getElementById('glassCard');
  if (!card) return;

  const maxTilt = 6;

  // Mouse move tilt effect
  window.addEventListener('mousemove', (e) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const x = e.clientX - w / 2;
    const y = e.clientY - h / 2;

    // normalize to -1..1
    const nx = (x / (w / 2));
    const ny = (y / (h / 2));

    // Calculate tilt
    const tiltY = nx * maxTilt;
    const tiltX = -ny * maxTilt;

    card.style.setProperty('--tiltX', tiltX.toFixed(2));
    card.style.setProperty('--tiltY', tiltY.toFixed(2));
  });

  // Optional: reset tilt when mouse leaves window
  window.addEventListener('mouseleave', () => {
    card.style.setProperty('--tiltX', 0);
    card.style.setProperty('--tiltY', 0);
  });

  // Smooth idle breathing motion for blobs
  const blobs = document.querySelectorAll('.blob');
  let t = 0;
  function idleLoop(){
    t += 0.005;
    blobs.forEach((b, i) => {
      const dx = Math.sin(t * (0.6 + i * 0.2)) * (6 + i*4);
      const dy = Math.cos(t * (0.4 + i * 0.15)) * (4 + i*3);
      b.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    });
    requestAnimationFrame(idleLoop);
  }
  idleLoop();
})();
