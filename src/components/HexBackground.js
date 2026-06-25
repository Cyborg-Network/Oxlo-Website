import { useEffect, useRef } from "react";

export default function HexBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);
  const dimRef = useRef({ w: 0, h: 0 });
  const hexRef = useRef([]);
  const tRef = useRef(0);
  const rippleRef = useRef([]);
  const scrollRef = useRef(0);

  useEffect(() => {
    // The hex grid is a mouse-driven decoration (ripples/lift follow the cursor),
    // so touch devices gain nothing from it while paying the full cost of a
    // full-page canvas redrawing every frame. Skip it on phones/tablets to keep
    // scrolling smooth and stop the calculator from lagging.
    const isTouch = window.matchMedia("(pointer: coarse)").matches
      || window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const HEX_SIZE = 28;
    const MOUSE_RADIUS = 200;
    const LIFT_RADIUS = 180;
    const MAX_LIFT = 10;
    const MAX_OFFSET = 7;

    const hexW = HEX_SIZE * 2;
    const hexH = Math.sqrt(3) * HEX_SIZE;

    const hexAngles = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      hexAngles.push({ cos: Math.cos(angle), sin: Math.sin(angle) });
    }

    const buildHex = (w, h) => {
      const cells = [];
      const totalH = Math.max(h, document.documentElement.scrollHeight);
      const cols = Math.ceil(w / (hexW * 0.75)) + 2;
      const rows = Math.ceil(totalH / hexH) + 2;

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const cx = col * hexW * 0.75;
          const cy = row * hexH + (col % 2 === 1 ? hexH * 0.5 : 0);
          cells.push({ cx, cy, glow: 0, lift: 0, offsetX: 0, offsetY: 0 });
        }
      }
      hexRef.current = cells;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimRef.current = { w, h };
      buildHex(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    // Rebuild the hex grid when the page content height changes (e.g. navigating to a
    // long blog post), so the animation covers the full scrollable height.
    let contentObserver;
    if (typeof ResizeObserver !== "undefined") {
      contentObserver = new ResizeObserver(() => buildHex(dimRef.current.w, dimRef.current.h));
      contentObserver.observe(document.body);
    }

    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let lastRipX = -9999;
    let lastRipY = -9999;
    let lastRipTime = 0;

    const onMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      const now = performance.now();
      const moved = Math.sqrt((e.clientX - lastRipX) ** 2 + (e.clientY - lastRipY) ** 2);
      if (moved > 140 && now - lastRipTime > 300) {
        const worldY = e.clientY + scrollRef.current;
        rippleRef.current.push({ x: e.clientX, y: worldY, t: 0 });
        if (rippleRef.current.length > 2) rippleRef.current.shift();
        lastRipX = e.clientX;
        lastRipY = e.clientY;
        lastRipTime = now;
      }
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    document.addEventListener("mousemove", onMouse);
    document.addEventListener("mouseleave", onLeave);

    const ss = (t) => t * t * (3 - 2 * t);

    let lastScroll = 0;
    let scrollVel = 0;

    const animate = () => {
      const { w, h } = dimRef.current;
      const scroll = scrollRef.current;
      tRef.current += 0.01;
      const time = tRef.current;

      scrollVel += (Math.min(Math.abs(scroll - lastScroll) * 0.08, 1) - scrollVel) * 0.1;
      lastScroll = scroll;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y + scroll;

      for (const r of rippleRef.current) r.t += 2.8;
      rippleRef.current = rippleRef.current.filter((r) => r.t < 320);

      ctx.clearRect(0, 0, w, h);

      const cells = hexRef.current;
      const viewTop = scroll - 80;
      const viewBottom = scroll + h + 80;

      for (const cell of cells) {
        if (cell.cy < viewTop || cell.cy > viewBottom) continue;

        const screenY = cell.cy - scroll;

        const wave1 = (Math.sin((cell.cx + cell.cy) * 0.006 + time * 0.8) + 1) * 0.5;
        const wave2 = (Math.sin((cell.cx - cell.cy) * 0.004 + time * 0.5) + 1) * 0.5;
        const ambient = wave1 * wave2 * (1 + scrollVel * 3);

        const dx = cell.cx - mx;
        const dy = cell.cy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseInf = dist < MOUSE_RADIUS ? ss(1 - dist / MOUSE_RADIUS) : 0;

        const liftInf = dist < LIFT_RADIUS ? ss(1 - dist / LIFT_RADIUS) : 0;

        let targetOX = 0;
        let targetOY = 0;
        if (dist > 0 && dist < LIFT_RADIUS) {
          targetOX = (dx / dist) * liftInf * MAX_OFFSET;
          targetOY = (dy / dist) * liftInf * MAX_OFFSET;
        }

        cell.lift += (liftInf - cell.lift) * 0.6;
        cell.offsetX += (targetOX - cell.offsetX) * 0.6;
        cell.offsetY += (targetOY - cell.offsetY) * 0.6;

        let rippleGlow = 0;
        for (const r of rippleRef.current) {
          const rdist = Math.sqrt((cell.cx - r.x) ** 2 + (cell.cy - r.y) ** 2);
          const ringDist = Math.abs(rdist - r.t);
          if (ringDist < 22) {
            const fade = 1 - r.t / 320;
            rippleGlow = Math.max(rippleGlow, (1 - ringDist / 22) * fade * 0.5);
          }
        }

        const targetGlow = Math.min(1, ambient * 0.2 + mouseInf * 0.9 + rippleGlow);
        cell.glow += (targetGlow - cell.glow) * 0.5;

        const g = cell.glow;
        const lift = cell.lift;

        const rx = cell.cx + cell.offsetX;
        const ry = screenY + cell.offsetY;

        const scale = 1 + lift * 0.2;
        const size = (HEX_SIZE - 1) * scale;

        if (lift > 0.05) {
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const sx = cell.cx + (size + 2) * hexAngles[i].cos;
            const sy = screenY + (size + 2) * hexAngles[i].sin + lift * MAX_LIFT;
            if (i === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
          }
          ctx.closePath();
          ctx.fillStyle = `rgba(0, 0, 0, ${lift * 0.35})`;
          ctx.fill();
        }

        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const hx = rx + size * hexAngles[i].cos;
          const hy = ry + size * hexAngles[i].sin;
          if (i === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();

        if (g > 0.02) {
          ctx.fillStyle = `rgba(3, 247, 181, ${g * 0.1 + lift * 0.08})`;
          ctx.fill();
        }

        ctx.strokeStyle = `rgba(3, 247, 181, ${0.045 + g * 0.35 + lift * 0.15})`;
        ctx.lineWidth = 0.5 + g * 0.5 + lift * 0.7;
        ctx.stroke();

        if (lift > 0.08) {
          ctx.beginPath();
          const h0x = rx + size * hexAngles[0].cos;
          const h0y = ry + size * hexAngles[0].sin;
          const h1x = rx + size * hexAngles[1].cos;
          const h1y = ry + size * hexAngles[1].sin;
          const h2x = rx + size * hexAngles[2].cos;
          const h2y = ry + size * hexAngles[2].sin;
          ctx.moveTo(h0x, h0y);
          ctx.lineTo(h1x, h1y);
          ctx.lineTo(h2x, h2y);
          ctx.strokeStyle = `rgba(3, 247, 181, ${lift * 0.55})`;
          ctx.lineWidth = 1 + lift * 1.2;
          ctx.stroke();
        }

        if (lift > 0.08) {
          ctx.beginPath();
          const h3x = rx + size * hexAngles[3].cos;
          const h3y = ry + size * hexAngles[3].sin;
          const h4x = rx + size * hexAngles[4].cos;
          const h4y = ry + size * hexAngles[4].sin;
          const h5x = rx + size * hexAngles[5].cos;
          const h5y = ry + size * hexAngles[5].sin;
          ctx.moveTo(h3x, h3y);
          ctx.lineTo(h4x, h4y);
          ctx.lineTo(h5x, h5y);
          ctx.strokeStyle = `rgba(0, 15, 10, ${lift * 0.4})`;
          ctx.lineWidth = 1 + lift * 1;
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mouseleave", onLeave);
      if (contentObserver) contentObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hex-bg-canvas"
    />
  );
}
