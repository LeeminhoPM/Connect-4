import React from "react";
import { Trophy, RefreshCw, Home, Eye, Award, Frown, Equal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ConfettiCanvas } from "./ConfettiCanvas";

export const GameOverModal = ({
    isOpen,
    winner, // 1 (Red), 2 (Yellow), or null (Draw)
    gameMode,
    playerPiece,
    elapsedSeconds,
    moveCount,
    scores,
    onPlayAgain,
    onClose,
}) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const isDraw = winner === null;
    const isHumanWin = gameMode === 1 ? winner === playerPiece : true;

    // Winner title & subtitle
    let title = "";
    let subtitle = "";
    let badgeColor = "";

    if (isDraw) {
        title = "Trận đấu hòa!";
        subtitle = "Cả hai bên đều đã thi đấu rất xuất sắc và kín kẽ.";
        badgeColor = "from-slate-500 to-slate-700";
    } else if (gameMode === 1) {
        if (winner === playerPiece) {
            title = "Bạn đã chiến thắng!";
            subtitle = "Kỹ năng chiến thuật tuyệt vời trước trí tuệ nhân tạo!";
            badgeColor = "from-amber-400 to-yellow-600";
        } else {
            title = "AI đã giành chiến thắng!";
            subtitle = "Đừng nản lòng, hãy thử lại và tìm ra nước cờ đột phá!";
            badgeColor = "from-rose-500 to-red-700";
        }
    } else {
        if (winner === 1) {
            title = "Người chơi 1 (Đỏ) thắng!";
            subtitle = "Một chiến thắng thuyết phục với 4 quân thẳng hàng!";
            badgeColor = "from-rose-500 to-red-700";
        } else {
            title = "Người chơi 2 (Vàng) thắng!";
            subtitle = "Một chiến thắng thuyết phục với 4 quân thẳng hàng!";
            badgeColor = "from-amber-400 to-yellow-600";
        }
    }

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}p ${s}s`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            {/* Show celebratory confetti when human wins */}
            {!isDraw && isHumanWin && <ConfettiCanvas />}

            <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-center transform transition-all animate-in zoom-in-95 duration-200">
                {/* Top Glowing Icon */}
                <div className="flex justify-center -mt-14 mb-4">
                    <div
                        className={`w-20 h-20 rounded-full bg-gradient-to-tr ${badgeColor} flex items-center justify-center shadow-xl border-4 border-slate-900 text-white`}
                    >
                        {isDraw ? (
                            <Equal size={40} strokeWidth={2.5} />
                        ) : isHumanWin ? (
                            <Trophy size={40} className="animate-bounce" />
                        ) : (
                            <Frown size={40} />
                        )}
                    </div>
                </div>

                {/* Title & Subtitle */}
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                    {title}
                </h2>
                <p className="text-sm text-slate-400 mb-6 px-2">{subtitle}</p>

                {/* Match Stats Grid */}
                <div className="grid grid-cols-3 gap-2.5 bg-slate-800/60 border border-slate-700/50 rounded-2xl p-3.5 mb-6 text-center">
                    <div>
                        <div className="text-[11px] font-medium text-slate-400">Thời gian</div>
                        <div className="text-sm sm:text-base font-bold text-cyan-400 font-mono mt-0.5">
                            {formatTime(elapsedSeconds)}
                        </div>
                    </div>
                    <div>
                        <div className="text-[11px] font-medium text-slate-400">Tổng nước đi</div>
                        <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono mt-0.5">
                            {moveCount}
                        </div>
                    </div>
                    <div>
                        <div className="text-[11px] font-medium text-slate-400">Tỉ số tổng</div>
                        <div className="text-sm sm:text-base font-bold text-amber-400 font-mono mt-0.5">
                            {gameMode === 0
                                ? `${scores.p1} - ${scores.p2}`
                                : `${scores.p1} - ${scores.ai}`}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2.5">
                    <button
                        onClick={onPlayAgain}
                        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-base shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                    >
                        <RefreshCw size={18} />
                        <span>Chơi ván tiếp</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2.5">
                        <button
                            onClick={onClose}
                            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700 transition-all active:scale-95"
                        >
                            <Eye size={15} />
                            <span>Xem bàn cờ</span>
                        </button>

                        <button
                            onClick={() => navigate("/")}
                            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700 transition-all active:scale-95"
                        >
                            <Home size={15} />
                            <span>Trang chủ</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
