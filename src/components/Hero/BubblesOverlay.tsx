"use client";

import { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  vx: number; // base velocity x
  vy: number; // base velocity y
  radius: number;
  opacity: number;
  swaySpeed: number;
  swayRange: number;
  swayOffset: number;
  // Mouse push offset
  pushX: number;
  pushY: number;
}

export default function BubblesOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let isMounted = true;
    let width = 0;
    let height = 0;
    const bubbles: Bubble[] = [];
    const maxBubbles = 45; // Subtle amount of bubbles for premium feel

    const resizeCanvas = () => {
      if (!canvas || !isMounted) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * (window.devicePixelRatio || 1);
      canvas.height = height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    // Helper to create a single bubble
    const createBubble = (initialY = false): Bubble => {
      const radius = Math.random() * 8 + 3; // 3px to 11px radius
      return {
        x: Math.random() * width,
        y: initialY ? Math.random() * height : height + 20,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -(Math.random() * 0.8 + 0.4), // Float upwards
        radius,
        opacity: Math.random() * 0.4 + 0.15, // 0.15 to 0.55 opacity
        swaySpeed: Math.random() * 0.015 + 0.005,
        swayRange: Math.random() * 1.5 + 0.5,
        swayOffset: Math.random() * Math.PI * 2,
        pushX: 0,
        pushY: 0,
      };
    };

    // Initialize bubbles
    const initBubbles = () => {
      bubbles.length = 0;
      for (let i = 0; i < maxBubbles; i++) {
        bubbles.push(createBubble(true));
      }
    };

    resizeCanvas();
    initBubbles();

    window.addEventListener("resize", resizeCanvas);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    // Attach mouse listeners to the window so it tracks movement over the whole Hero area
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const animate = () => {
      if (!isMounted || !canvas || !ctx) return;

      // Performance Optimization: check if section is scrolled out of viewport
      const scrollY = window.scrollY;
      if (scrollY > height + 100) {
        // Skip rendering when scrolled away
        animationId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      time += 1;

      const mouse = mouseRef.current;

      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];

        // 1. Base upward floating movement
        b.y += b.vy;

        // 2. Horizontal sway (sine wave)
        const sway = Math.sin(time * b.swaySpeed + b.swayOffset) * b.swayRange;

        // 3. Mouse Interaction (Push Effect)
        if (mouse.active) {
          const dx = b.x - mouse.x;
          const dy = b.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const maxDist = 180; // Distance of mouse influence

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            const angle = Math.atan2(dy, dx);
            // Push target position away from mouse
            const targetPushX = Math.cos(angle) * force * 15;
            const targetPushY = Math.sin(angle) * force * 15;

            // Ease into the push
            b.pushX += (targetPushX - b.pushX) * 0.1;
            b.pushY += (targetPushY - b.pushY) * 0.1;
          } else {
            // Return to normal (decay push offset)
            b.pushX *= 0.95;
            b.pushY *= 0.95;
          }
        } else {
          b.pushX *= 0.92;
          b.pushY *= 0.92;
        }

        // Apply positions
        const currentX = b.x + sway + b.pushX;
        const currentY = b.y + b.pushY;

        // 4. Draw realistic water bubble
        ctx.save();
        ctx.beginPath();
        ctx.arc(currentX, currentY, b.radius, 0, Math.PI * 2);

        // Draw bubble shell glow/border
        ctx.strokeStyle = `rgba(180, 235, 255, ${b.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw subtle radial fill for bubble reflection
        const gradient = ctx.createRadialGradient(
          currentX - b.radius * 0.2,
          currentY - b.radius * 0.2,
          b.radius * 0.1,
          currentX,
          currentY,
          b.radius
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.05)");
        gradient.addColorStop(0.8, "rgba(0, 184, 255, 0.05)");
        gradient.addColorStop(1, `rgba(0, 184, 255, ${b.opacity * 0.3})`);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw highlight reflection (tiny white glint)
        ctx.beginPath();
        ctx.arc(
          currentX - b.radius * 0.35,
          currentY - b.radius * 0.35,
          b.radius * 0.15,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 1.5})`;
        ctx.fill();

        ctx.restore();

        // Reset bubble if it floats off-screen
        if (b.y < -20) {
          bubbles[i] = createBubble();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "screen", zIndex: 12 }}
    />
  );
}
