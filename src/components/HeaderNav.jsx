import React from "react";
import { ArrowLeft, Users, Bot, Pause, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeaderNav = ({
    gameMode,
    aiDifficulty,
    onPause,
    onResetScores,
}) => {
    const navigate = useNavigate();

    return (
        <header className="w-full max-w-4xl px-3 sm:px-4 pt-3 pb-2 flex items-center justify-between">
            {/* Back to Home */}
            <button
                onClick={() => navigate("/")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all text-xs sm:text-sm font-medium shadow-md cursor-pointer active:scale-95"
            >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Trang chủ</span>
            </button>

            {/* Mode & Difficulty Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/70 shadow-inner">
                {gameMode === 0 ? (
                    <Users size={16} className="text-emerald-400" />
                ) : (
                    <Bot size={16} className="text-cyan-400" />
                )}
                <span className="text-xs sm:text-sm font-bold text-slate-200">
                    {gameMode === 0 ? "2 Người chơi" : `Đấu AI (${aiDifficulty})`}
                </span>
            </div>

            {/* Right actions: Reset Score & Pause */}
            <div className="flex items-center gap-1.5">
                <button
                    onClick={() => {
                        if (window.confirm("Bạn có chắc muốn đặt lại tỉ số về 0?")) {
                            onResetScores();
                        }
                    }}
                    title="Đặt lại tỉ số"
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700/80 transition-all text-xs shadow-md cursor-pointer active:scale-95"
                >
                    <Trash2 size={16} />
                </button>
                <button
                    onClick={onPause}
                    title="Tạm dừng"
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all text-xs shadow-md cursor-pointer active:scale-95"
                >
                    <Pause size={16} />
                </button>
            </div>
        </header>
    );
};
