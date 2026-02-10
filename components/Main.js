"use client";
import React, { useState, useEffect } from "react";

import BackgroundCanvas from './BackgroundCanvas';
import Image from "next/image";

const Main = () => {
  const [screen, setScreen] = useState(1);

  // NO button position
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  // MOVE NO BUTTON ONLY ON CLICK
  const moveButton = () => {
    const step = 100; 

    const directions = [
      { x: step, y: 0 },    
      { x: -step, y: 0 },   
      { x: 0, y: step },   
      { x: 0, y: -step },  
    ];

    const randomDir =
      directions[Math.floor(Math.random() * directions.length)];

    setNoPos(prev => ({
      x: prev.x + randomDir.x,
      y: prev.y + randomDir.y,
    }));
  };

  // CONFETTI (UNCHANGED)
  useEffect(() => {
    if (screen === 3) {
      const canvas = document.createElement("canvas");
      Object.assign(canvas.style, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1000,
        pointerEvents: "none",
      });
      document.body.appendChild(canvas);

      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const colors = [
        "#fcf403","#62fc03","#f4fc03","#03e7fc",
        "#03fca5","#a503fc","#fc03ad","#fc03c2"
      ];

      const confetti = [];
      for (let i = 0; i < 100; i++) {
        confetti.push({
          x: Math.random() * canvas.width,
          y: canvas.height,
          r: Math.random() * 6 + 4,
          c: colors[Math.floor(Math.random() * colors.length)],
          vx: Math.random() * 6 - 3,
          vy: -(Math.random() * 6 + 4),
        });
      }

      let frames = 0;
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.15;
          ctx.fillStyle = p.c;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });
        frames++;
        frames < 120 ? requestAnimationFrame(animate) : canvas.remove();
      };
      animate();
    }
  }, [screen]);

  return (
    <>
    <section className="main-sec">
        <div className="container">
             {/* SCREEN 1 */}
                <section className={`screen-1 screen ${screen === 1 ? "active" : ""}`}>
                    <div className="heart" onClick={() => setScreen(2)}>
                    ❤️
                    <span className="heart-text">Touch Me</span> 
                   
                    </div>
                     
                </section>

                {/* SCREEN 2 */}
                <section className={`screen-2 screen ${screen === 2 ? "active" : ""}`}>
                      <BackgroundCanvas />
                   <div className="inner">
                     
                            <Image className="flower-image" src="/images/Gemini_Generated.png" alt="women holding flowers" width={320} height={400} role="img" />
                        <div className="content">
                                <h1>Will you be mine? 💖</h1>
                                
                                <div className="buttons" style={{ position: "relative" }}>
                                    <button className="btn-yes" onClick={() => setScreen(3)}>
                                        Yes
                                        
                                    </button>

                                    <button
                                        className="btn-no"
                                        onClick={moveButton}
                                        style={{
                                        transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                                        transition: "transform 0.25s ease",
                                        position: "relative",
                                        }}
                                    >
                                        No
                                    </button>
                                </div>
                        </div>
                   </div>
                </section>

                {/* SCREEN 3 */}
                <section className={`screen-3 screen ${screen === 3 ? "active" : ""}`}>
                  
                    <h1>🎉 Congratulations 🎉</h1>
                    <p>“You made the right ✅ choice, babe! 😄💕”</p>
                    <img
                    src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExenM5bXpubG52bzFsdW85YXlzOG94N2Fzc2xpZ3ZuNHJwd3lxeHA0ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aQYR1p8saOQla/giphy.gif"
                    alt="celebration gif"
                    />
                </section>
        </div>
      </section>
    </>
  );
};

export default Main;
