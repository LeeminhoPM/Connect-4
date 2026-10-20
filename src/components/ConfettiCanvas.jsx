import React, { useEffect, useRef } from "react";

export const ConfettiCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        const colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#facc15"];
        const particleCount = 80;
        const particles = Array.from({ length: particleCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * -height * 0.5,
            w: Math.random() * 10 + 6,
            h: Math.random() * 8 + 4,
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 3 + 2.5,
            rot: Math.random() * 360,
            vRot: (Math.random() - 0.5) * 10,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));

        let animId;
        const render = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.rot += p.vRot;

                if (p.y > height + 20) {
                    p.y = -20;
                    p.x = Math.random() * width;
                }

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rot * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });

            animId = requestAnimationFrame(render);
        };

        animId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-50 w-full h-full"
        />
    );
};
