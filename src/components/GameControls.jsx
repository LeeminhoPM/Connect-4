import React from "react";
import { RotateCcw, RefreshCw, Volume2, VolumeX, HelpCircle } from "lucide-react";

export const GameControls = ({
    onUndo,
    canUndo,
    onRestartRound,
    soundEnabled,
    onToggleSound,
    onOpenHowToPlay,
    disabled = false,
}) => {
    return (
        <div className="w-full max-w-4xl px-3 py-3 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            {/* Undo Move */}
            <button
                onClick={onUndo}
                disabled={!canUndo || disabled}
                title="Đi lại nước trước"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all shadow-md active:scale-95 ${
                    canUndo && !disabled
                        ? "bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-600/80 cursor-pointer"
                        : "bg-slate-900/60 text-slate-500 border border-slate-800 cursor-not-allowed opacity-50"
                }`}
            >
                <RotateCcw size={16} />
                <span>Đi lại (Undo)</span>
            </button>

            {/* Restart Round */}
            <button
                onClick={onRestartRound}
                disabled={disabled}
                title="Chơi lại ván mới"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium text-xs sm:text-sm bg-indigo-600/90 text-white hover:bg-indigo-500 border border-indigo-400/30 transition-all shadow-md cursor-pointer active:scale-95"
            >
                <RefreshCw size={16} />
                <span>Ván mới</span>
            </button>

            {/* Sound Toggle */}
            <button
                onClick={onToggleSound}
                title={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
                className={`p-2 rounded-xl transition-all shadow-md cursor-pointer active:scale-95 border ${
                    soundEnabled
                        ? "bg-emerald-950/60 text-emerald-400 border-emerald-600/50 hover:bg-emerald-900/60"
                        : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
                }`}
            >
                {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>

            {/* How to play / Guide */}
            <button
                onClick={onOpenHowToPlay}
                title="Xem luật chơi"
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-all shadow-md cursor-pointer active:scale-95"
            >
                <HelpCircle size={18} />
            </button>
        </div>
    );
};
