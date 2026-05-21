import { useEffect, useRef } from 'react';

export default function ParticleLogo() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const size = Math.min(canvas.parentElement?.clientWidth || 470, 470);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = size / 2;
    const cy = size / 2;

    const outerRx = size * 0.47;
    const outerRy = size * 0.41;
    const innerRx = size * 0.28;
    const innerRy = size * 0.22;

    const gapHalf = Math.PI / 22;
    const gapCenters = [
      Math.PI / 4,
      (3 * Math.PI) / 4,
      (5 * Math.PI) / 4,
      (7 * Math.PI) / 4,
    ];

    function isGap(angle) {
      for (const g of gapCenters) {
        let d = Math.abs(angle - g);
        if (d > Math.PI) d = 2 * Math.PI - d;
        if (d < gapHalf) return true;
      }
      return false;
    }

    const particles = [];
    for (let a = 0; a < Math.PI * 2; a += 0.035) {
      if (isGap(a)) continue;
      for (let t = 0; t <= 1; t += 0.15) {
        const rx = innerRx + (outerRx - innerRx) * t + (Math.random() - 0.5) * 2.5;
        const ry = innerRy + (outerRy - innerRy) * t + (Math.random() - 0.5) * 2.5;
        particles.push({
          x: cx + (Math.random() - 0.5) * size * 2.2,
          y: cy + (Math.random() - 0.5) * size * 2.2,
          angle: a,
          rx,
          ry,
          tx: cx + rx * Math.cos(a),
          ty: cy + ry * Math.sin(a),
          vx: 0,
          vy: 0,
          size: Math.random() * 1.6 + 0.8,
          alpha: Math.random() * 0.4 + 0.6,
          phase: Math.random() * Math.PI * 2,
          speed: 0.018 + Math.random() * 0.04,
        });
      }
    }

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    canvas.addEventListener('mousemove', onMouse);
    canvas.addEventListener('mouseleave', onLeave);

    const REPEL_RADIUS = 90;
    const REPEL_FORCE = 7;
    const ROTATION_SPEED = 0.25;
    const ASSEMBLY_TIME = 2.5;
    const startTime = performance.now();

    function animate() {
      const elapsed = (performance.now() - startTime) / 1000;
      ctx.clearRect(0, 0, size, size);

      const progress = Math.min(elapsed / ASSEMBLY_TIME, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      const rotOffset = progress >= 1 ? (elapsed - ASSEMBLY_TIME) * ROTATION_SPEED : 0;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        const rotAngle = p.angle + rotOffset;
        let goalX = cx + p.rx * Math.cos(rotAngle);
        let goalY = cy + p.ry * Math.sin(rotAngle);

        if (progress >= 1) {
          goalX += Math.sin(elapsed * 0.6 + p.phase) * 1.4;
          goalY += Math.cos(elapsed * 0.4 + p.phase) * 1.1;
        }

        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        if (progress < 1) {
          p.vx *= 0.8;
          p.vy *= 0.8;
          p.x += (p.tx - p.x) * p.speed * (1 + eased * 4) + p.vx * 0.3;
          p.y += (p.ty - p.y) * p.speed * (1 + eased * 4) + p.vy * 0.3;
        } else {
          p.vx = (p.vx + (goalX - p.x) * 0.07) * 0.88;
          p.vy = (p.vy + (goalY - p.y) * 0.07) * 0.88;
          p.x += p.vx;
          p.y += p.vy;
        }

        const a = p.alpha * (0.12 + eased * 0.88);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(3, 247, 181, ${a})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', onMouse);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-logo" />;
}
