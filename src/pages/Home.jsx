import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Bot, Play, HelpCircle, Trophy, Volume2, VolumeX, Sparkles, Flame } from "lucide-react";
import { AppContext } from "../contexts/AppContext";
import { DIFFICULTY_LEVELS } from "../constants/gameConstants";
import logo from "../assets/logo.png";
import { HowToPlayModal } from "../components/HowToPlayModal";
import { playSound } from "../utils/soundEffects";

export const Home = () => {
    const {
        gameMode,
        setGameMode,
        aiDifficulty,
        setAiDifficulty,
        playerPiece,
        setPlayerPiece,
        soundEnabled,
        toggleSound,
        scores,
    } = useContext(AppContext);

    const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
    const navigate = useNavigate();

    const handleStartGame = () => {
        playSound("click", soundEnabled);
        navigate("/game");
    };

    // Calculate AI stats
    const totalAiGames = scores.p1 + scores.ai;
    const aiWinRate = totalAiGames > 0 ? Math.round((scores.p1 / totalAiGames) * 100) : 0;

    return (
        <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-x-hidden selection:bg-rose-500 selection:text-white">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-md flex flex-col items-center">
                {/* Sound toggle & Guide shortcut in top right */}
                <div className="w-full flex items-center justify-end gap-2 mb-2">
                    <button
                        onClick={toggleSound}
                        title={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
                        className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all cursor-pointer shadow-md active:scale-95"
                    >
                        {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                    </button>
                    <button
                        onClick={() => setIsHowToPlayOpen(true)}
                        title="Xem luật chơi"
                        className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all cursor-pointer shadow-md active:scale-95"
                    >
                        <HelpCircle size={18} />
                    </button>
                </div>

                {/* Logo and Game Title */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={logo}
                        alt="Connect 4 Logo"
                        className="w-48 sm:w-60 h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] transform hover:scale-105 transition-transform duration-300"
                    />
                    <p className="text-xs sm:text-sm font-semibold tracking-widest text-cyan-400 uppercase mt-2">
                        Kinh Điển • Chiến Thuật • Đỉnh Cao
                    </p>
                </div>

                {/* Game Mode Selection */}
                <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl mb-4 backdrop-blur-sm">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">
                        Chọn chế độ chơi
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {/* 2 Players */}
                        <button
                            onClick={() => {
                                playSound("click", soundEnabled);
                                setGameMode(0);
                            }}
                            className={`p-3.5 rounded-xl flex flex-col items-center justify-center gap-2 border transition-all cursor-pointer active:scale-95 ${
                                gameMode === 0
                                    ? "bg-gradient-to-b from-emerald-600/30 to-emerald-950/40 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                                    : "bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                            }`}
                        >
                            <Users size={28} />
                            <div className="text-center">
                                <div className="text-sm font-bold">2 Người chơi</div>
                                <div className="text-[10px] text-slate-400">Trên cùng thiết bị</div>
                            </div>
                        </button>

                        {/* Vs AI */}
                        <button
                            onClick={() => {
                                playSound("click", soundEnabled);
                                setGameMode(1);
                            }}
                            className={`p-3.5 rounded-xl flex flex-col items-center justify-center gap-2 border transition-all cursor-pointer active:scale-95 ${
                                gameMode === 1
                                    ? "bg-gradient-to-b from-cyan-600/30 to-cyan-950/40 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                                    : "bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                            }`}
                        >
                            <Bot size={28} />
                            <div className="text-center">
                                <div className="text-sm font-bold">Đấu với AI</div>
                                <div className="text-[10px] text-slate-400">Minimax thông minh</div>
                            </div>
                        </button>
                    </div>

                    {/* AI Configuration (When gameMode === 1) */}
                    {gameMode === 1 && (
                        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-200">
                            {/* AI Difficulty Selector */}
                            <div>
                                <div className="text-[11px] font-semibold text-slate-300 mb-2 flex items-center justify-between">
                                    <span>Độ khó AI:</span>
                                    <span className="text-amber-400 font-bold">
                                        {DIFFICULTY_LEVELS.find((d) => d.id === aiDifficulty)?.name} (
                                        {DIFFICULTY_LEVELS.find((d) => d.id === aiDifficulty)?.stars})
                                    </span>
                                </div>
                                <div className="grid grid-cols-4 gap-1.5">
                                    {DIFFICULTY_LEVELS.map((diff) => (
                                        <button
                                            key={diff.id}
                                            onClick={() => {
                                                playSound("click", soundEnabled);
                                                setAiDifficulty(diff.id);
                                            }}
                                            className={`py-2 px-1 rounded-lg text-xs font-bold border transition-all cursor-pointer active:scale-95 text-center ${
                                                aiDifficulty === diff.id
                                                    ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm"
                                                    : "bg-slate-800/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                                            }`}
                                        >
                                            {diff.name}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-[10px] text-slate-400 mt-1.5 italic text-center">
                                    {DIFFICULTY_LEVELS.find((d) => d.id === aiDifficulty)?.desc}
                                </p>
                            </div>

                            {/* Turn Order Selection */}
                            <div>
                                <div className="text-[11px] font-semibold text-slate-300 mb-2">
                                    Chọn phe và thứ tự đi:
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => {
                                            playSound("click", soundEnabled);
                                            setPlayerPiece(1);
                                        }}
                                        className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
                                            playerPiece === 1
                                                ? "bg-red-950/40 border-red-500 text-red-300 shadow-sm"
                                                : "bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800"
                                        }`}
                                    >
                                        <div className="w-5 h-5 rounded-full chip-3d-red shadow-sm" />
                                        <div className="text-xs font-bold">Đi trước (Đỏ)</div>
                                    </button>

                                    <button
                                        onClick={() => {
                                            playSound("click", soundEnabled);
                                            setPlayerPiece(2);
                                        }}
                                        className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
                                            playerPiece === 2
                                                ? "bg-amber-950/40 border-yellow-400 text-yellow-300 shadow-sm"
                                                : "bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800"
                                        }`}
                                    >
                                        <div className="w-5 h-5 rounded-full chip-3d-yellow shadow-sm" />
                                        <div className="text-xs font-bold">Đi sau (Vàng)</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Score Stats Summary Card */}
                {(scores.p1 > 0 || scores.p2 > 0 || scores.ai > 0 || scores.draws > 0) && (
                    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-3 mb-4 backdrop-blur-sm">
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                            <span className="flex items-center gap-1 font-semibold">
                                <Trophy size={14} className="text-amber-400" />
                                <span>Thành tích của bạn</span>
                            </span>
                            {scores.streak > 1 && (
                                <span className="flex items-center gap-1 text-[11px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full">
                                    <Flame size={12} className="text-amber-400" />
                                    <span>Chuỗi {scores.streak} trận thắng!</span>
                                </span>
                            )}
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                            <div className="bg-slate-800/50 p-1.5 rounded-lg">
                                <div className="text-slate-400 text-[10px]">Thắng AI</div>
                                <div className="text-emerald-400 font-bold text-sm">{scores.p1}</div>
                            </div>
                            <div className="bg-slate-800/50 p-1.5 rounded-lg">
                                <div className="text-slate-400 text-[10px]">Thua AI</div>
                                <div className="text-rose-400 font-bold text-sm">{scores.ai}</div>
                            </div>
                            <div className="bg-slate-800/50 p-1.5 rounded-lg">
                                <div className="text-slate-400 text-[10px]">Tỉ lệ thắng</div>
                                <div className="text-cyan-400 font-bold text-sm">{aiWinRate}%</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Start Game Button */}
                <button
                    onClick={handleStartGame}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-500 text-white font-black text-lg sm:text-xl shadow-[0_10px_25px_rgba(16,185,129,0.35)] flex items-center justify-center gap-3 cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-98"
                >
                    <Play size={24} fill="currentColor" />
                    <span>Bắt Đầu Ván Đấu</span>
                </button>
            </div>

            {/* How to Play Modal */}
            <HowToPlayModal
                isOpen={isHowToPlayOpen}
                onClose={() => setIsHowToPlayOpen(false)}
            />
        </div>
    );
};
