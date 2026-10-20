import React from "react";
import { User, Bot, Clock, Swords } from "lucide-react";

export const ScoreBoard = ({
    gameMode,
    playerPiece,
    currentTurn, // 1 (Red) or 2 (Yellow)
    scores,
    timerSeconds,
    moveCount,
    isThinking,
    gameOver,
    aiDifficulty,
}) => {
    // Format seconds to mm:ss
    const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    // Player 1 details (Red, piece = 1)
    const isP1Human = gameMode === 0 || playerPiece === 1;
    const p1Name = gameMode === 0 ? "Người chơi 1" : playerPiece === 1 ? "Bạn (Đỏ)" : "AI (Đỏ)";
    const p1Score = gameMode === 0 ? scores.p1 : playerPiece === 1 ? scores.p1 : scores.ai;
    const isP1Turn = currentTurn === 1 && !gameOver;

    // Player 2 details (Yellow, piece = 2)
    const isP2Human = gameMode === 0 || playerPiece === 2;
    const p2Name = gameMode === 0 ? "Người chơi 2" : playerPiece === 2 ? "Bạn (Vàng)" : "AI (Vàng)";
    const p2Score = gameMode === 0 ? scores.p2 : playerPiece === 2 ? scores.p1 : scores.ai;
    const isP2Turn = currentTurn === 2 && !gameOver;

    return (
        <div className="w-full max-w-4xl px-3 py-2 sm:px-4">
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-2xl p-3 sm:p-4 shadow-xl flex items-center justify-between gap-2 sm:gap-4">
                {/* Player 1 Card (Red) */}
                <div
                    className={`flex-1 flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                        isP1Turn
                            ? "bg-red-950/50 border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.35)] scale-[1.02]"
                            : "bg-slate-800/40 border border-slate-700/40 opacity-80"
                    }`}
                >
                    <div className="relative">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full chip-3d-red flex items-center justify-center text-white shadow-md">
                            {isP1Human ? (
                                <User size={20} className="sm:w-6 sm:h-6" />
                            ) : (
                                <Bot size={20} className="sm:w-6 sm:h-6" />
                            )}
                        </div>
                        {isP1Turn && (
                            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-900 rounded-full animate-ping" />
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs sm:text-sm font-bold text-red-400 truncate">
                                {p1Name}
                            </span>
                            {isP1Turn && (
                                <span className="hidden md:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-red-500/20 text-red-300">
                                    Lượt đi
                                </span>
                            )}
                        </div>
                        <div className="text-lg sm:text-2xl font-black text-white font-mono">
                            {p1Score} <span className="text-xs font-normal text-slate-400">điểm</span>
                        </div>
                    </div>
                </div>

                {/* Center Match Info (Timer, Turn info, Moves) */}
                <div className="flex flex-col items-center justify-center px-1 sm:px-3 text-center min-w-[90px] sm:min-w-[130px]">
                    <div className="flex items-center gap-1.5 text-slate-300 text-xs sm:text-sm font-mono font-semibold bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
                        <Clock size={13} className="text-cyan-400" />
                        <span>{formatTime(timerSeconds)}</span>
                    </div>

                    <div className="text-[11px] sm:text-xs font-medium text-slate-400 mt-1.5">
                        Nước đi: <span className="font-bold text-white">{moveCount}</span>
                    </div>

                    {isThinking ? (
                        <div className="flex items-center gap-1 text-[11px] text-amber-300 font-medium mt-1 animate-pulse">
                            <Bot size={13} />
                            <span>AI đang tính...</span>
                        </div>
                    ) : (
                        <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                            <Swords size={12} className="text-slate-500" />
                            <span>{gameMode === 0 ? "2 Người" : `vs AI (${aiDifficulty})`}</span>
                        </div>
                    )}
                </div>

                {/* Player 2 Card (Yellow) */}
                <div
                    className={`flex-1 flex items-center justify-end gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl transition-all duration-300 text-right ${
                        isP2Turn
                            ? "bg-amber-950/50 border-2 border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.35)] scale-[1.02]"
                            : "bg-slate-800/40 border border-slate-700/40 opacity-80"
                    }`}
                >
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-end gap-1.5">
                            {isP2Turn && (
                                <span className="hidden md:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-300">
                                    Lượt đi
                                </span>
                            )}
                            <span className="text-xs sm:text-sm font-bold text-yellow-400 truncate">
                                {p2Name}
                            </span>
                        </div>
                        <div className="text-lg sm:text-2xl font-black text-white font-mono">
                            {p2Score} <span className="text-xs font-normal text-slate-400">điểm</span>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full chip-3d-yellow flex items-center justify-center text-slate-900 shadow-md">
                            {isP2Human ? (
                                <User size={20} className="sm:w-6 sm:h-6" />
                            ) : (
                                <Bot size={20} className="sm:w-6 sm:h-6" />
                            )}
                        </div>
                        {isP2Turn && (
                            <span className="absolute -bottom-1 -left-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-900 rounded-full animate-ping" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
