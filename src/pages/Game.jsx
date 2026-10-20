import React, { useContext, useEffect, useState, useCallback } from "react";
import { AppContext } from "../contexts/AppContext";
import {
    createEmptyBoard,
    getLowestEmptyRow,
    isValidMove,
    checkWin,
    checkDraw,
    getBestAiMove,
    PLAYER_1,
    PLAYER_2,
} from "../utils/connect4Logic";
import { playSound } from "../utils/soundEffects";
import { HeaderNav } from "../components/HeaderNav";
import { ScoreBoard } from "../components/ScoreBoard";
import { GameBoard } from "../components/GameBoard";
import { GameControls } from "../components/GameControls";
import { GameOverModal } from "../components/GameOverModal";
import { PauseModal } from "../components/PauseModal";
import { HowToPlayModal } from "../components/HowToPlayModal";

export const Game = () => {
    const {
        gameMode,
        playerPiece,
        aiDifficulty,
        soundEnabled,
        toggleSound,
        scores,
        recordGameResult,
        resetScores,
    } = useContext(AppContext);

    const [board, setBoard] = useState(createEmptyBoard);
    const [currentTurn, setCurrentTurn] = useState(PLAYER_1); // 1 (Red) always moves first
    const [moveHistory, setMoveHistory] = useState([]);
    const [winningCells, setWinningCells] = useState([]);
    const [winner, setWinner] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [lastMove, setLastMove] = useState(null);
    const [timerSeconds, setTimerSeconds] = useState(0);

    // Modals
    const [isPaused, setIsPaused] = useState(false);
    const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);
    const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);

    // Derived AI turn state
    const aiPiece = playerPiece === PLAYER_1 ? PLAYER_2 : PLAYER_1;
    const isAiThinking = gameMode === 1 && !gameOver && !isPaused && currentTurn === aiPiece;

    // Timer effect
    useEffect(() => {
        if (gameOver || isPaused) return;

        const interval = setInterval(() => {
            setTimerSeconds((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [gameOver, isPaused]);

    // Handle game conclusion
    const handleGameEnd = useCallback(
        (winResult, isDrawn) => {
            setGameOver(true);

            if (winResult) {
                setWinner(winResult.winner);
                setWinningCells(winResult.winningCells);
                playSound("win", soundEnabled);
                recordGameResult(winResult.winner, gameMode);
            } else if (isDrawn) {
                setWinner(null);
                setWinningCells([]);
                playSound("draw", soundEnabled);
                recordGameResult(null, gameMode);
            }

            // Slight delay before opening modal to let player see the winning 4 chips connect
            setTimeout(() => {
                setIsGameOverModalOpen(true);
            }, 650);
        },
        [gameMode, recordGameResult, soundEnabled],
    );

    // Execute a move on the board
    const executeMove = useCallback(
        (col, player) => {
            const row = getLowestEmptyRow(board, col);
            if (row === -1) return false;

            const newBoard = board.map((r) => [...r]);
            newBoard[row][col] = player;

            setBoard(newBoard);
            setLastMove({ row, col, player });
            setMoveHistory((prev) => [
                { row, col, player, boardSnapshot: board },
                ...prev,
            ]);
            playSound("drop", soundEnabled, { row });

            const winResult = checkWin(newBoard);
            const isDrawn = !winResult && checkDraw(newBoard);

            if (winResult || isDrawn) {
                handleGameEnd(winResult, isDrawn);
                return true;
            }

            // Switch turn
            setCurrentTurn((prev) => (prev === PLAYER_1 ? PLAYER_2 : PLAYER_1));
            return true;
        },
        [board, soundEnabled, handleGameEnd],
    );

    // Human player interaction
    const handleColumnClick = useCallback(
        (col) => {
            if (gameOver || isAiThinking || isPaused) return;
            if (!isValidMove(board, col)) return;

            if (gameMode === 0) {
                // PvP 2 players
                executeMove(col, currentTurn);
            } else {
                // PvE vs AI: only allow move if it's human's piece turn
                if (currentTurn === playerPiece) {
                    executeMove(col, playerPiece);
                }
            }
        },
        [board, currentTurn, executeMove, gameMode, gameOver, isAiThinking, isPaused, playerPiece],
    );

    // AI Turn trigger
    useEffect(() => {
        if (!isAiThinking) return;

        // Natural thinking delay between 300ms and 600ms
        const delay = Math.floor(Math.random() * 250) + 350;
        const timer = setTimeout(() => {
            const bestCol = getBestAiMove(
                board,
                aiPiece,
                playerPiece,
                aiDifficulty,
            );

            if (bestCol !== null && isValidMove(board, bestCol)) {
                executeMove(bestCol, aiPiece);
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [isAiThinking, board, aiPiece, playerPiece, aiDifficulty, executeMove]);

    // Handle Undo
    const handleUndoMove = useCallback(() => {
        if (gameOver || isAiThinking || moveHistory.length === 0) return;

        playSound("undo", soundEnabled);

        if (gameMode === 0) {
            // In PvP, undo 1 move
            const last = moveHistory[0];
            setBoard(last.boardSnapshot);
            setMoveHistory((prev) => prev.slice(1));
            setCurrentTurn(last.player);
            setLastMove(moveHistory[1] || null);
            setWinningCells([]);
        } else {
            // In PvE vs AI:
            if (moveHistory.length >= 2) {
                const target = moveHistory[1];
                setBoard(target.boardSnapshot);
                setMoveHistory((prev) => prev.slice(2));
                setCurrentTurn(playerPiece);
                setLastMove(moveHistory[2] || null);
            } else if (moveHistory.length === 1 && moveHistory[0].player === playerPiece) {
                setBoard(moveHistory[0].boardSnapshot);
                setMoveHistory([]);
                setCurrentTurn(playerPiece);
                setLastMove(null);
            }
            setWinningCells([]);
        }
    }, [gameOver, isAiThinking, moveHistory, soundEnabled, gameMode, playerPiece]);

    // Restart the round
    const handleRestartRound = useCallback(() => {
        playSound("click", soundEnabled);
        setBoard(createEmptyBoard());
        setCurrentTurn(PLAYER_1);
        setMoveHistory([]);
        setWinningCells([]);
        setWinner(null);
        setGameOver(false);
        setLastMove(null);
        setTimerSeconds(0);
        setIsGameOverModalOpen(false);
        setIsPaused(false);
    }, [soundEnabled]);

    // Keyboard support: Press 1-7 to drop into column 1-7
    useEffect(() => {
        const handleKeyDown = (e) => {
            const keyNum = parseInt(e.key, 10);
            if (keyNum >= 1 && keyNum <= 7) {
                e.preventDefault();
                handleColumnClick(keyNum - 1);
            } else if (e.key === "u" || e.key === "U") {
                handleUndoMove();
            } else if (e.key === "Escape") {
                setIsPaused((prev) => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleColumnClick, handleUndoMove]);

    return (
        <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col items-center justify-between py-2 sm:py-4 relative overflow-x-hidden selection:bg-rose-500 selection:text-white">
            {/* Top Navigation Bar */}
            <HeaderNav
                gameMode={gameMode}
                aiDifficulty={aiDifficulty}
                onPause={() => setIsPaused(true)}
                onResetScores={resetScores}
            />

            {/* Scoreboard and Status */}
            <ScoreBoard
                gameMode={gameMode}
                playerPiece={playerPiece}
                currentTurn={currentTurn}
                scores={scores}
                timerSeconds={timerSeconds}
                moveCount={moveHistory.length}
                isThinking={isAiThinking}
                gameOver={gameOver}
                aiDifficulty={aiDifficulty}
            />

            {/* Interactive Connect 4 Game Board */}
            <main className="w-full flex-1 flex flex-col items-center justify-center my-1 sm:my-2">
                <GameBoard
                    board={board}
                    currentTurn={currentTurn}
                    onColumnClick={handleColumnClick}
                    winningCells={winningCells}
                    lastMove={lastMove}
                    isThinking={isAiThinking}
                    gameOver={gameOver}
                    disabled={isPaused}
                />
            </main>

            {/* Bottom Controls */}
            <footer className="w-full flex flex-col items-center">
                <GameControls
                    onUndo={handleUndoMove}
                    canUndo={
                        !gameOver &&
                        !isAiThinking &&
                        (gameMode === 0 ? moveHistory.length > 0 : moveHistory.length >= 1)
                    }
                    onRestartRound={handleRestartRound}
                    soundEnabled={soundEnabled}
                    onToggleSound={toggleSound}
                    onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
                    disabled={isAiThinking}
                />

                <p className="text-[11px] text-slate-500 hidden sm:block pb-1">
                    Mẹo: Bạn có thể nhấn phím số <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">1</kbd> - <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">7</kbd> để thả cờ nhanh, phím <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">U</kbd> để Undo.
                </p>
            </footer>

            {/* Modals */}
            <GameOverModal
                isOpen={isGameOverModalOpen}
                winner={winner}
                gameMode={gameMode}
                playerPiece={playerPiece}
                elapsedSeconds={timerSeconds}
                moveCount={moveHistory.length}
                scores={scores}
                onPlayAgain={handleRestartRound}
                onClose={() => setIsGameOverModalOpen(false)}
            />

            <PauseModal
                isOpen={isPaused}
                onResume={() => setIsPaused(false)}
                onRestart={handleRestartRound}
                onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
                soundEnabled={soundEnabled}
                onToggleSound={toggleSound}
            />

            <HowToPlayModal
                isOpen={isHowToPlayOpen}
                onClose={() => setIsHowToPlayOpen(false)}
            />
        </div>
    );
};
