"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import BackgroundCanvas from "./BackgroundCanvas";

const Main = () => {
  const [screen, setScreen] = useState(1);
  const videoRef = useRef(null);

  // =============================
  // CONFETTI EFFECT (UNCHANGED)
  // =============================
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
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const colors = [
        "#fcf403",
        "#62fc03",
        "#f4fc03",
        "#03e7fc",
        "#03fca5",
        "#a503fc",
        "#fc03ad",
        "#fc03c2",
      ];

      const confetti = Array.from({ length: 100 }).map(() => ({
        x: Math.random() * canvas.width,
        y: canvas.height,
        r: Math.random() * 6 + 4,
        c: colors[Math.floor(Math.random() * colors.length)],
        vx: Math.random() * 6 - 3,
        vy: -(Math.random() * 6 + 4),
      }));

      let frames = 0;

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach((p) => {
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

  // =============================
  // VIDEO CONTROL FUNCTION
  // =============================
  useEffect(() => {
    if (screen === 21 && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });
    }
  }, [screen]);

  return (
    <section className="main-sec">
      <div className="container">

        {/* SCREEN 1 */}
        <section className={`screen screen-1 ${screen === 1 ? "active" : ""}`}>
          <div className="heart" onClick={() => setScreen(2)}>
            ❤️
            <span className="heart-text">Touch Me</span>
          </div>
        </section>

        {/* SCREEN 2 */}
        <section className={`screen screen-2 ${screen === 2 ? "active" : ""}`}>
          <BackgroundCanvas />

          <div className="inner">
            <Image
              src="/images/Gemini_Generated.png"
              alt="woman holding flowers"
              width={320}
              height={400}
              className="flower-image"
              priority
            />

            <div className="content">
              <h1>Will you be my Valentine? 💖</h1>

              <div className="buttons">
                <button
                  className="btn-yes"
                  onClick={() => setScreen(3)}
                >
                  Yes
                </button>

                <button
                  className="btn-no"
                  onClick={() => setScreen(21)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SCREEN 21 */}
        <section className={`screen screen-21 ${screen === 21 ? "active" : ""}`}>
          <BackgroundCanvas />

          <div className="inner">
            <video
              ref={videoRef}
              className="flower-image"
              width={320}
              height={400}
              playsInline
              preload="auto"
              controls={false}
              onEnded={(e) => {
                e.target.pause(); // stop after finishing
              }}
            >
              <source src="/images/broom.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="content">
              <div className="buttons">
                <button
                  className="btn-yes"
                  onClick={() => setScreen(3)}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SCREEN 3 */}
        <section className={`screen screen-3 ${screen === 3 ? "active" : ""}`}>
          <h1>🎉 Congratulations 🎉</h1>
          <p>“You made the right ✅ choice, babe! 😄💕”</p>

          {/* <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExenM5bXpubG52bzFsdW85YXlzOG94N2Fzc2xpZ3ZuNHJwd3lxeHA0ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aQYR1p8saOQla/giphy.gif"
            alt="celebration gif"
          /> */}
           <video
              ref={videoRef}
              className="flower-image"
              width={320}
              height={400}
              playsInline
              preload="auto"
              controls={false}
              onEnded={(e) => {
                e.target.pause(); 
              }}
            >
              <source src="/images/happy-dance.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
        </section>

      </div>
    </section>
  );
};

export default Main;
