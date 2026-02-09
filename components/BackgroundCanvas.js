'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');

    let min = 1;
    let max = 8;
    let particles = 200;
    let colors = ["64,32,0", "250,64,0", "64,0,0", "200,200,200"];

    const rand = (a, b) => Math.random() * (b - a) + a;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.radius = rand(min, max);
        this.x = rand(0, canvas.width);
        this.y = rand(-20, canvas.height * 0.5);
        this.vx = -5 + Math.random() * 10;
        this.vy = 0.7 * this.radius;
        this.valpha = rand(0.02, 0.09);
        this.opacity = 0;
        this.life = 0;
      }

      update() {
        this.x += this.vx / 3;
        this.y += this.vy / 3;

        if (this.opacity >= 1 && this.valpha > 0) this.valpha *= -1;
        this.opacity += this.valpha / 3;
        this.life += this.valpha / 3;

        this.opacity = Math.min(1, Math.max(0, this.opacity));

        if (this.life < 0 || this.radius <= 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw(ctx) {
        ctx.strokeStyle = `rgba(${this.color}, ${Math.min(this.opacity, 0.85)})`;
        ctx.fillStyle = `rgba(${this.color}, ${Math.min(this.opacity, 0.65)})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    const drawables = Array.from({ length: particles }, () => new Particle());

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawables.forEach(p => p.draw(context));
    };

    const update = () => {
      drawables.forEach(p => p.update());
    };

    const drawInterval = setInterval(draw, 1000 / 30);
    const updateInterval = setInterval(update, 1000 / 60);

    window.addEventListener('resize', resize);

    return () => {
      clearInterval(drawInterval);
      clearInterval(updateInterval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="bg" />;
}
