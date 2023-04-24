import { useState, useEffect, useRef } from 'react';

type BackgroundProps = {
    bpm: number;
    notas: [number, number][];
};

const Background = ({ bpm, notas }: BackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasWidth, setCanvasWidth] = useState<number>(0);

    const drawBackground = (ctx: CanvasRenderingContext2D) => {
        const canvasHeight = ctx.canvas.height;
        const pixelsPerBeat = (60 / bpm) * canvasWidth;
        const pixelsPerSemiQuaver = pixelsPerBeat / 8;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.beginPath();
        for (let i = 0; i < canvasWidth / pixelsPerSemiQuaver; i++) {
            ctx.moveTo(i * pixelsPerSemiQuaver + 0.5, 0);
            ctx.lineTo(i * pixelsPerSemiQuaver + 0.5, canvasHeight);
        }
        ctx.strokeStyle = '#ddd';
        ctx.stroke();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                setCanvasWidth(canvas.offsetWidth);
                drawBackground(ctx);
            }
        }
    }, [canvasRef, bpm]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                notas.forEach(([x, y]) => {
                    const canvasHeight = ctx.canvas.height;
                    const pixelsPerBeat = (60 / bpm) * canvasWidth;
                    const pixelsPerSemiQuaver = pixelsPerBeat / 8;
                    const centerX = x * pixelsPerSemiQuaver;
                    const centerY = (7 - y) * (canvasHeight / 8);
                    const radius = pixelsPerSemiQuaver / 2;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = '#2196f3';
                    ctx.fill();
                });
            }
        }
    }, [canvasRef, bpm, notas]);

    return (
        <canvas
            ref={canvasRef}
            className="background"
            width={canvasWidth}
            height={200}
        ></canvas>
    );
};

export default Background;
