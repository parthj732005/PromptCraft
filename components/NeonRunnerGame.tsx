"use client";

import React, { useRef, useEffect, useState, FC } from "react";

type Obstacle = { x: number; lane: number; type: "block" | "tag"; id: number };

interface NeonRunnerGameProps {
  onComplete: (score: number, timeSurvived: number) => void;
}

export const NeonRunnerGame: FC<NeonRunnerGameProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [lane, setLane] = useState(1); // 0:left,1:center,2:right
  const obRef = useRef<Obstacle[]>([]);
  const lastSpawn = useRef<number>(0);
  const idCounter = useRef<number>(0);
  const speedRef = useRef<number>(300); // px per second for obstacles
  const startTime = useRef<number>(Date.now());
  const animationFrameId = useRef<number>();

  // Input handlers
  useEffect(() => {
    const handlePointer = (e: PointerEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const w = rect.width;
      const third = w / 3;
      const newLane = Math.floor(x / third);
      setLane(Math.max(0, Math.min(2, newLane)));
    };
    window.addEventListener("pointerdown", handlePointer);
    return () => window.removeEventListener("pointerdown", handlePointer);
  }, []);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let last = Date.now();
    let isRunning = true;

    const spawnObstacle = (w: number) => {
        const now = Date.now();
        const since = now - lastSpawn.current;
        const spawnInterval = Math.max(200, 600 - (now - startTime.current) / 200);
        if (since > spawnInterval - 150 + Math.random() * 300) {
            lastSpawn.current = now;
            const newLane = Math.floor(Math.random() * 3);
            const r = Math.random();
            const type: Obstacle["type"] = r < 0.7 ? "block" : "tag";

            const lastObstacle = obRef.current[obRef.current.length - 1];
            if (type === 'block' && lastObstacle && lastObstacle.type === 'block' && Math.abs(newLane - lastObstacle.lane) === 1 && now - lastSpawn.current < 100) {
                return;
            }

            obRef.current.push({ x: w + 50, lane: newLane, type, id: idCounter.current++ });
        }
    };

    const draw = () => {
      if (!isRunning) return;

      const now = Date.now();
      const dt = (now - last) / 1000;
      last = now;
      
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      
      speedRef.current = 300 + (now - startTime.current) / 150;

      spawnObstacle(w);

      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      ctx.clearRect(0, 0, w, h);
      
      const laneW = w / 3;
      
      const playerX = lane * laneW + laneW / 2;
      const playerY = h - 60;
      ctx.fillStyle = "#00f6ff";
      ctx.shadowColor = '#00f6ff';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.moveTo(playerX, playerY - 20);
      ctx.lineTo(playerX - 15, playerY + 15);
      ctx.lineTo(playerX + 15, playerY + 15);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;

      for (let i = obRef.current.length - 1; i >= 0; i--) {
        const ob = obRef.current[i];
        ob.x -= speedRef.current * dt;

        const obY = h - 60;
        const obX = ob.lane * laneW + laneW / 2;

        if (ob.type === "block") {
          ctx.fillStyle = "#ff004c";
          ctx.shadowColor = '#ff004c';
          ctx.shadowBlur = 15;
          ctx.fillRect(obX - 20, obY - 25, 40, 50);
        } else {
          ctx.fillStyle = "#ffd500";
          ctx.shadowColor = '#ffd500';
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(obX, obY, 12, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;

        if (ob.lane === lane && ob.x < playerX + 30 && ob.x > playerX - 30) {
          if (ob.type === "tag") {
            setScore((s) => s + 10);
            obRef.current.splice(i, 1);
          } else {
            isRunning = false;
            const timeSurvived = (Date.now() - startTime.current) / 1000;
            onComplete(score, timeSurvived);
            return;
          }
        }

        if (ob.x < -50) obRef.current.splice(i, 1);
      }

      animationFrameId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      isRunning = false;
    };
  }, [lane, score, onComplete]);

  return (
    <div className="w-full h-full pointer-events-auto" role="application">
        <div className="absolute top-4 left-4 text-white font-orbitron text-2xl bg-black/50 p-2 rounded-md z-10">
            SCORE: {score}
        </div>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-label="Neon Runner game canvas"
      />
    </div>
  );
};

export default NeonRunnerGame;