import confetti from 'canvas-confetti';

export const fireRealisticConfetti = (x = 0.5, y = 0.5) => {
  const count = 200;
  
  // Base settings: High z-index to ensure it pops OVER everything (modals, cards, headers)
  const defaults = {
    origin: { x, y },
    zIndex: 9999,
    ticks: 300 // Longer hang time
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  // "Realistic" preset burst
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};