import React, { useEffect, useRef } from 'react';
import { soundManager } from '../utils/audioEngine';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  fade: number;
  type: 'spark' | 'petal' | 'firework';
  color: string;
  rotation?: number;
  rotationSpeed?: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
}

export const FestiveParticleCanvas: React.FC<{
  intensity?: 'gentle' | 'vibrant';
  interactiveClick?: boolean;
}> = ({ intensity = 'gentle', interactiveClick = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };
    window.addEventListener('resize', handleResize);

    const maxParticles = intensity === 'vibrant' ? 60 : 42;
    const particles: Particle[] = [];
    let stars: Star[] = [];

    const sparkColors = ['#FFD700', '#FFC46B', '#FF9D38', '#FFF3B0', '#F3E5AB'];
    const petalColors = ['#8E1729', '#B81D36', '#DC2626', '#E63946', '#9B111E'];
    const fireworkColors = ['#FFD700', '#FF9D38', '#FF6B81', '#38BDF8', '#F472B6', '#FCD34D'];

    // Initialize serene starry sky
    const initStars = () => {
      stars = [];
      const starCount = Math.floor((width * height) / 12000);
      for (let i = 0; i < Math.min(starCount, 90); i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.7), // Concentrate in upper night sky
          size: 0.6 + Math.random() * 1.4,
          baseAlpha: 0.15 + Math.random() * 0.45,
          twinkleSpeed: 0.02 + Math.random() * 0.04,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };
    initStars();

    // Spawn initial floating particles
    for (let i = 0; i < maxParticles; i++) {
      const isPetal = Math.random() > 0.65;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: isPetal ? 0.5 + Math.random() * 0.7 : -0.3 - Math.random() * 0.6,
        size: isPetal ? 5 + Math.random() * 4 : 1.2 + Math.random() * 2.2,
        alpha: 0.2 + Math.random() * 0.55,
        fade: 0.002 + Math.random() * 0.004,
        type: isPetal ? 'petal' : 'spark',
        color: isPetal
          ? petalColors[Math.floor(Math.random() * petalColors.length)]
          : sparkColors[Math.floor(Math.random() * sparkColors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.025,
      });
    }

    const triggerDistantFirework = () => {
      // Periodic subtle distant firework in upper sky
      const originX = width * 0.15 + Math.random() * (width * 0.7);
      const originY = height * 0.1 + Math.random() * (height * 0.35);
      const count = 18;
      const palette = fireworkColors;

      for (let j = 0; j < count; j++) {
        const angle = (Math.PI * 2 * j) / count + (Math.random() - 0.5) * 0.3;
        const speed = 1.2 + Math.random() * 2.4;
        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.5 + Math.random() * 2,
          alpha: 0.85,
          fade: 0.016 + Math.random() * 0.012,
          type: 'firework',
          color: palette[Math.floor(Math.random() * palette.length)],
        });
      }
    };

    let lastFireworkTime = Date.now();
    const fireworkInterval = 4500; // Distant fireworks burst softly every 4.5s

    const drawPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      alpha: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();
      context.ellipse(0, 0, size * 0.45, size, Math.PI / 4, 0, Math.PI * 2);
      context.fillStyle = color;
      context.globalAlpha = alpha;
      context.shadowBlur = 6;
      context.shadowColor = 'rgba(142, 23, 41, 0.4)';
      context.fill();
      context.restore();
    };

    const drawSpark = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number
    ) => {
      context.save();
      context.beginPath();
      context.arc(x, y, size, 0, Math.PI * 2);
      context.fillStyle = color;
      context.globalAlpha = alpha;
      context.shadowBlur = size * 2.5;
      context.shadowColor = color;
      context.fill();
      context.restore();
    };

    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Render subtle twinkling stars
      const now = Date.now() * 0.001;
      for (let s = 0; s < stars.length; s++) {
        const star = stars[s];
        const twinkle = Math.sin(now * star.twinkleSpeed * 10 + star.phase);
        const currentAlpha = Math.max(0.05, Math.min(0.8, star.baseAlpha + twinkle * 0.25));
        ctx.save();
        ctx.fillStyle = '#FFF1C5';
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Periodic gentle distant firework
      if (Date.now() - lastFireworkTime > fireworkInterval) {
        triggerDistantFirework();
        lastFireworkTime = Date.now();
      }

      // 3. Render and update festive particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (p.type === 'petal') {
          p.x += p.vx + Math.sin(p.y * 0.01) * 0.5;
          p.y += p.vy;
          if (p.rotation !== undefined && p.rotationSpeed !== undefined) {
            p.rotation += p.rotationSpeed;
          }
          drawPetal(ctx, p.x, p.y, p.size, p.rotation || 0, p.color, p.alpha);

          // Recycle petals reaching bottom
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
        } else if (p.type === 'spark') {
          p.x += p.vx + Math.cos(p.y * 0.02) * 0.25;
          p.y += p.vy;
          p.alpha += Math.sin(Date.now() * 0.0025 + i) * 0.008;
          p.alpha = Math.max(0.12, Math.min(0.8, p.alpha));
          drawSpark(ctx, p.x, p.y, p.size, p.color, p.alpha);

          // Recycle sparks floating up
          if (p.y < -20) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
        } else if (p.type === 'firework') {
          // Burst particle
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.04; // gravity
          p.alpha -= p.fade;
          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }
          drawSpark(ctx, p.x, p.y, p.size, p.color, p.alpha);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Interactive festive spark burst on click
    const handleClick = (e: MouseEvent) => {
      if (!interactiveClick) return;
      const target = e.target as HTMLElement;
      // Do not obstruct clicks on buttons or inputs
      const isInteractiveElement = target.closest('button, input, textarea, a, select, [role="button"]');
      
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const burstCount = isInteractiveElement ? 10 : 20;
      for (let j = 0; j < burstCount; j++) {
        const angle = (Math.PI * 2 * j) / burstCount + (Math.random() - 0.5) * 0.5;
        const speed = 1.8 + Math.random() * 3.2;
        particles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.8 + Math.random() * 2.2,
          alpha: 0.95,
          fade: 0.02 + Math.random() * 0.015,
          type: 'firework',
          color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
        });
      }

      if (!isInteractiveElement) {
        soundManager.playFireworkBurst();
      }
    };

    if (interactiveClick) {
      window.addEventListener('click', handleClick);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (interactiveClick) {
        window.removeEventListener('click', handleClick);
      }
    };
  }, [intensity, interactiveClick]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 h-full w-full opacity-85"
      aria-hidden="true"
    />
  );
};
