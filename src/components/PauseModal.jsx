import React from "react";
import { Play, RotateCcw, Home, Volume2, VolumeX, HelpCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PauseModal = ({
    isOpen,
    onResume,
    onRestart,
    onOpenHowToPlay,
    soundEnabled,
    onToggleSound,
}) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
            <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl text-center">
                <button
                    onClick={onResume}
                    aria-label="Đóng"
                    className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                    <X size={20} />
                </button>

                <h3 className="text-xl font-bold text-white mb-6">Tạm dừng</h3>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={onResume}
                        className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all active:scale-95"
                    >
                        <Play size={18} />
                        <span>Tiếp tục chơi</span>
                    </button>

                    <button
                        onClick={onRestart}
                        className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer border border-slate-700 transition-all active:scale-95"
                    >
                        <RotateCcw size={18} />
                        <span>Chơi lại ván này</span>
                    </button>

                    <button
                        onClick={onToggleSound}
                        className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer border border-slate-700 transition-all active:scale-95"
                    >
                        {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                        <span>Âm thanh: {soundEnabled ? "Bật" : "Tắt"}</span>
                    </button>

                    <button
                        onClick={onOpenHowToPlay}
                        className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer border border-slate-700 transition-all active:scale-95"
                    >
                        <HelpCircle size={18} />
                        <span>Xem luật chơi & Mẹo</span>
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="w-full py-3 px-4 rounded-xl bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer border border-rose-800/40 transition-all active:scale-95"
                    >
                        <Home size={18} />
                        <span>Về trang chủ</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
