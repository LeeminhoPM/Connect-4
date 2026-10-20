import React, { useState } from "react";
import { ROW_COUNT, COLUMN_COUNT, EMPTY, getLowestEmptyRow } from "../utils/connect4Logic";
import { ChevronDown, Sparkles } from "lucide-react";

export const GameBoard = ({
    board,
    currentTurn, // 1 (Red) or 2 (Yellow)
    onColumnClick,
    winningCells = [],
    lastMove = null,
    isThinking = false,
    gameOver = false,
    disabled = false,
}) => {
    const [hoverCol, setHoverCol] = useState(null);

    const isWinningCell = (r, c) => {
        return winningCells.some((cell) => cell.r === r && cell.c === c);
    };

    const isLastMove = (r, c) => {
        return lastMove && lastMove.row === r && lastMove.col === c;
    };

    const handleMouseEnterCol = (c) => {
        if (!gameOver && !isThinking && !disabled) {
            setHoverCol(c);
        }
    };

    const handleMouseLeave = () => {
        setHoverCol(null);
    };

    const handleColClick = (c) => {
        if (gameOver || isThinking || disabled) return;
        onColumnClick(c);
    };

    const hoverTargetRow = hoverCol !== null ? getLowestEmptyRow(board, hoverCol) : -1;

    return (
        <div className="w-full flex flex-col items-center select-none px-2">
            {/* Top Column Drop Indicators */}
            <div className="w-full max-w-[min(92vw,560px)] grid grid-cols-7 gap-1 sm:gap-2 mb-1.5 px-2.5 sm:px-4 h-7 sm:h-9">
                {Array.from({ length: COLUMN_COUNT }).map((_, c) => {
                    const isAvailable = board[0][c] === EMPTY;
                    const isHovered = hoverCol === c && isAvailable && !gameOver && !isThinking && !disabled;

                    return (
                        <div
                            key={`col-indicator-${c}`}
                            className="flex items-center justify-center cursor-pointer"
                            onClick={() => handleColClick(c)}
                            onMouseEnter={() => handleMouseEnterCol(c)}
                        >
                            {isHovered && (
                                <div
                                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg transition-transform animate-bounce ${
                                        currentTurn === 1 ? "chip-3d-red text-white" : "chip-3d-yellow text-slate-900"
                                    }`}
                                >
                                    <ChevronDown size={18} strokeWidth={3} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Main Connect 4 Board Shell */}
            <div
                onMouseLeave={handleMouseLeave}
                className="w-full max-w-[min(92vw,560px)] aspect-[7/6] board-shell p-2 sm:p-3.5 rounded-2xl sm:rounded-3xl relative overflow-hidden"
            >
                {/* 6 Rows x 7 Columns Grid */}
                <div className="w-full h-full grid grid-cols-7 grid-rows-6 gap-1.5 sm:gap-2.5">
                    {board.map((row, r) =>
                        row.map((cellValue, c) => {
                            const isWin = isWinningCell(r, c);
                            const isRecent = isLastMove(r, c);
                            const isGhost =
                                hoverCol === c &&
                                hoverTargetRow === r &&
                                cellValue === EMPTY &&
                                !gameOver &&
                                !isThinking &&
                                !disabled;

                            return (
                                <div
                                    key={`cell-${r}-${c}`}
                                    onClick={() => handleColClick(c)}
                                    onMouseEnter={() => handleMouseEnterCol(c)}
                                    className="relative flex items-center justify-center cursor-pointer group"
                                    role="button"
                                    aria-label={`Ô hàng ${r + 1}, cột ${c + 1}`}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            handleColClick(c);
                                        }
                                    }}
                                >
                                    {/* Slot background hole */}
                                    <div className="w-full h-full rounded-full slot-empty relative flex items-center justify-center overflow-hidden">
                                        {/* Filled Piece */}
                                        {cellValue !== EMPTY && (
                                            <div
                                                style={
                                                    isRecent
                                                        ? {
                                                              "--drop-offset": `-${(r + 1) * 115}%`,
                                                              "--drop-duration": `${0.22 + r * 0.045}s`,
                                                          }
                                                        : undefined
                                                }
                                                className={`w-full h-full rounded-full flex items-center justify-center relative ${
                                                    cellValue === 1 ? "chip-3d-red" : "chip-3d-yellow"
                                                } ${isRecent ? "animate-chip-drop" : ""} ${
                                                    isWin ? "animate-winning-chip ring-4 ring-white" : ""
                                                }`}
                                            >
                                                {isWin && (
                                                    <Sparkles
                                                        size={22}
                                                        className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-spin"
                                                        style={{ animationDuration: "3s" }}
                                                    />
                                                )}
                                            </div>
                                        )}

                                        {/* Ghost Preview Piece when hovering */}
                                        {isGhost && (
                                            <div
                                                className={`w-[90%] h-[90%] rounded-full animate-ghost border-2 border-dashed ${
                                                    currentTurn === 1
                                                        ? "bg-red-500/40 border-red-300"
                                                        : "bg-yellow-400/40 border-yellow-200"
                                                }`}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        }),
                    )}
                </div>
            </div>
        </div>
    );
};
