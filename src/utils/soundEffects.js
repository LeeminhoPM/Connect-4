// Web Audio API sound generator for Connect 4
// Generates clean, responsive synthesized sound effects without external audio files

let audioCtx = null;

const getAudioContext = () => {
    if (typeof window === "undefined") return null;
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
    }
    return audioCtx;
};

export const playSound = (type, enabled = true, meta = {}) => {
    if (!enabled) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const now = ctx.currentTime;

        switch (type) {
            case "drop": {
                // Pitch rises slightly for lower rows (higher row index = deeper in the grid)
                const row = meta.row !== undefined ? meta.row : 3;
                const baseFreq = 220 + (5 - row) * 45; // 220Hz - 445Hz

                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = "sine";
                osc.frequency.setValueAtTime(baseFreq * 1.5, now);
                osc.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.08);

                gain.gain.setValueAtTime(0.35, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now);
                osc.stop(now + 0.13);
                break;
            }

            case "win": {
                // Happy celebratory arpeggio: C5 - E5 - G5 - C6
                const notes = [523.25, 659.25, 783.99, 1046.5];
                notes.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();

                    osc.type = "triangle";
                    osc.frequency.setValueAtTime(freq, now + idx * 0.12);

                    gain.gain.setValueAtTime(0.25, now + idx * 0.12);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.35);

                    osc.connect(gain);
                    gain.connect(ctx.destination);

                    osc.start(now + idx * 0.12);
                    osc.stop(now + idx * 0.12 + 0.36);
                });
                break;
            }

            case "draw": {
                // Low draw tone
                const notes = [330, 293.66, 261.63];
                notes.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();

                    osc.type = "sawtooth";
                    osc.frequency.setValueAtTime(freq, now + idx * 0.15);

                    gain.gain.setValueAtTime(0.15, now + idx * 0.15);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.15 + 0.25);

                    osc.connect(gain);
                    gain.connect(ctx.destination);

                    osc.start(now + idx * 0.15);
                    osc.stop(now + idx * 0.15 + 0.26);
                });
                break;
            }

            case "undo": {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = "sine";
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(180, now + 0.1);

                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now);
                osc.stop(now + 0.11);
                break;
            }

            case "click": {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = "triangle";
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now);
                osc.stop(now + 0.05);
                break;
            }

            default:
                break;
        }
    } catch {
        // Audio error gracefully caught
    }
};
