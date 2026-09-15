import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
}

interface Packet {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

interface FloatingGlyph {
  x: number;
  y: number;
  vx: number;
  vy: number;
  symbol: string;
  opacity: number;
  size: number;
}

export const TechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isPaused = false;
    let isLight = document.documentElement.getAttribute('data-theme') === 'light';

    // Theme observer
    const themeObserver = new MutationObserver(() => {
      isLight = document.documentElement.getAttribute('data-theme') === 'light';
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 170,
      isActive: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isActive = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Nodes, Packets, Glyphs state
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let glyphs: FloatingGlyph[] = [];

    const techSymbols = ['λ', '01', '⚡', '{ }', '⬡', 'SQL', '0x', 'API', 'AWS', 'RDS'];

    const initNodes = () => {
      nodes = [];
      packets = [];
      glyphs = [];

      // Density based on viewport width
      const nodeCount = Math.floor(Math.min(width, 1920) / 26);

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.8 + 1.2,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      // Initialize floating tech glyphs
      const glyphCount = Math.floor(Math.min(width, 1920) / 100);
      for (let i = 0; i < glyphCount; i++) {
        glyphs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          symbol: techSymbols[Math.floor(Math.random() * techSymbols.length)],
          opacity: Math.random() * 0.12 + 0.08,
          size: Math.random() * 4 + 11,
        });
      }
    };

    initNodes();

    // Data packet dispatcher timer
    let packetTimer = 0;

    const render = () => {
      if (!isPaused && ctx) {
        ctx.clearRect(0, 0, width, height);

        const connectionDist = Math.min(width, height) > 768 ? 140 : 100;
        const baseColor = isLight ? 'rgba(79, 70, 229, ' : 'rgba(99, 102, 241, ';
        const cyanColor = isLight ? 'rgba(8, 145, 178, ' : 'rgba(6, 182, 212, ';
        const emeraldColor = isLight ? 'rgba(5, 150, 105, ' : 'rgba(16, 185, 129, ';

        // 1. Draw floating tech glyphs
        ctx.font = '600 13px "JetBrains Mono", monospace';
        for (let g = 0; g < glyphs.length; g++) {
          const glyph = glyphs[g];
          glyph.x += glyph.vx;
          glyph.y += glyph.vy;

          if (glyph.x < -30) glyph.x = width + 30;
          if (glyph.x > width + 30) glyph.x = -30;
          if (glyph.y < -30) glyph.y = height + 30;
          if (glyph.y > height + 30) glyph.y = -30;

          ctx.fillStyle = isLight
            ? `rgba(71, 85, 105, ${glyph.opacity * 0.9})`
            : `rgba(148, 163, 184, ${glyph.opacity})`;
          ctx.fillText(glyph.symbol, glyph.x, glyph.y);
        }

        // 2. Update and draw nodes
        const activeConnections: { i: number; j: number; dist: number }[] = [];

        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          node.x += node.vx;
          node.y += node.vy;

          // Gentle edge rebound
          if (node.x <= 0 || node.x >= width) node.vx *= -1;
          if (node.y <= 0 || node.y >= height) node.vy *= -1;

          node.pulsePhase += 0.02;
          const currentRadius = node.radius + Math.sin(node.pulsePhase) * 0.4;

          // Draw node core
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = isLight
            ? `${baseColor} 0.4)`
            : i % 3 === 0
            ? `${cyanColor} 0.65)`
            : i % 3 === 1
            ? `${baseColor} 0.65)`
            : `${emeraldColor} 0.65)`;
          ctx.fill();

          // Connect nodes
          for (let j = i + 1; j < nodes.length; j++) {
            const nodeB = nodes[j];
            const dx = node.x - nodeB.x;
            const dy = node.y - nodeB.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDist) {
              activeConnections.push({ i, j, dist });
              const alpha = (1 - dist / connectionDist) * (isLight ? 0.16 : 0.22);
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(nodeB.x, nodeB.y);
              ctx.strokeStyle = `${baseColor}${alpha})`;
              ctx.lineWidth = 0.9;
              ctx.stroke();
            }
          }

          // Mouse proximity connection
          if (mouse.isActive) {
            const mdx = node.x - mouse.x;
            const mdy = node.y - mouse.y;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

            if (mdist < mouse.radius) {
              const mAlpha = (1 - mdist / mouse.radius) * 0.45;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = `${cyanColor}${mAlpha})`;
              ctx.lineWidth = 1.2;
              ctx.stroke();

              // Subtle magnetic pull
              node.x -= (mdx / mdist) * 0.4;
              node.y -= (mdy / mdist) * 0.4;
            }
          }
        }

        // 3. Dispatch and animate data packets along connections
        packetTimer++;
        if (packetTimer % 18 === 0 && activeConnections.length > 0) {
          const randConn = activeConnections[Math.floor(Math.random() * activeConnections.length)];
          const colors = [
            cyanColor + '0.9)',
            baseColor + '0.9)',
            emeraldColor + '0.9)',
          ];
          packets.push({
            fromNode: randConn.i,
            toNode: randConn.j,
            progress: 0,
            speed: Math.random() * 0.02 + 0.015,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }

        // Draw and advance packets
        for (let p = packets.length - 1; p >= 0; p--) {
          const pkt = packets[p];
          pkt.progress += pkt.speed;

          if (pkt.progress >= 1) {
            packets.splice(p, 1);
            continue;
          }

          const nA = nodes[pkt.fromNode];
          const nB = nodes[pkt.toNode];
          if (!nA || !nB) {
            packets.splice(p, 1);
            continue;
          }

          const curX = nA.x + (nB.x - nA.x) * pkt.progress;
          const curY = nA.y + (nB.y - nA.y) * pkt.progress;

          // Packet glow dot
          ctx.beginPath();
          ctx.arc(curX, curY, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = pkt.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = pkt.color;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className="tech-background-container"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};
