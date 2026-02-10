import React, { useEffect, useState } from "react";
import { Bot, House, Pause, Users, X } from "lucide-react";

const ROW_COUNT = 6;
const COLUMN_COUNT = 7;
const MAX_DEPTH = 3;

const App = () => {
    const [board, setBoard] = useState(
        Array.from({ length: ROW_COUNT }, () =>
            Array.from({ length: COLUMN_COUNT }, () => 0),
        ),
    );
    const [turn, setTurn] = useState(0);
    const [pause, setPause] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [hoverTile, setHoverTile] = useState(null);
    const [draw, setDraw] = useState(false);
    const [aiPlayer, setAiPlayer] = useState(false);

    const handleMouseEnter = (y) => {
        if (!gameOver) {
            y = parseInt(y);

            if (board[0][y] === 0) {
                for (let i = ROW_COUNT - 1; i >= 0; i--) {
                    for (let j = 0; j < COLUMN_COUNT; j++) {
                        if (j === y && board[i][j] === 0) {
                            setHoverTile({ x: i, y: j });
                            return;
                        }
                    }
                }
            }
        }
    };

    const handleMouseLeave = (y) => {
        if (!gameOver) {
            y = parseInt(y);

            if (board[0][y] === 0) {
                for (let i = ROW_COUNT - 1; i >= 0; i--) {
                    for (let j = 0; j < COLUMN_COUNT; j++) {
                        if (j === y && board[i][j] === 0) {
                            setHoverTile(null);
                            return;
                        }
                    }
                }
            }
        }
    };

    const handleMove = (y, player) => {
        if (!gameOver) {
            y = parseInt(y);
            if (board[0][y] === 0) {
                setBoard((prev) => {
                    const newBoard = prev.map((col) => [...col]);

                    for (let i = ROW_COUNT - 1; i >= 0; i--) {
                        if (prev[i][y] === 0) {
                            newBoard[i][y] = player;
                            checkWinMove(newBoard, true) ||
                                checkDrawMove(newBoard, true);
                            setHoverTile({
                                x: Math.max(0, i - 1),
                                y,
                            });
                            return newBoard;
                        }
                    }
                    return prev;
                });
            }
        }
    };

    const dropPiece = (checkBoard, y, checkTurn) => {
        let newBoard = checkBoard.map((r) => [...r]);
        if (newBoard[0][y] === 0) {
            for (let i = ROW_COUNT - 1; i >= 0; i--) {
                if (newBoard[i][y] === 0) {
                    newBoard[i][y] = checkTurn;
                    break;
                }
            }
        }
        return newBoard;
    };

    const checkWinMove = (newBoard, isPlace) => {
        for (let i = 0; i < ROW_COUNT; i++) {
            for (let j = 0; j < COLUMN_COUNT - 3; j++) {
                if (
                    newBoard[i][j] === newBoard[i][j + 1] &&
                    newBoard[i][j] === newBoard[i][j + 2] &&
                    newBoard[i][j] === newBoard[i][j + 3] &&
                    newBoard[i][j] !== 0
                ) {
                    if (isPlace) {
                        setPause(true);
                        setGameOver(true);
                    }
                    return true;
                }
            }
        }

        for (let i = 0; i < ROW_COUNT - 3; i++) {
            for (let j = 0; j < COLUMN_COUNT; j++) {
                if (
                    newBoard[i][j] === newBoard[i + 1][j] &&
                    newBoard[i][j] === newBoard[i + 2][j] &&
                    newBoard[i][j] === newBoard[i + 3][j] &&
                    newBoard[i][j] !== 0
                ) {
                    if (isPlace) {
                        setPause(true);
                        setGameOver(true);
                    }
                    return true;
                }
            }
        }

        for (let i = 0; i < ROW_COUNT - 3; i++) {
            for (let j = 0; j < COLUMN_COUNT - 3; j++) {
                if (
                    newBoard[i][j] === newBoard[i + 1][j + 1] &&
                    newBoard[i][j] === newBoard[i + 2][j + 2] &&
                    newBoard[i][j] === newBoard[i + 3][j + 3] &&
                    newBoard[i][j] !== 0
                ) {
                    if (isPlace) {
                        setPause(true);
                        setGameOver(true);
                    }
                    return true;
                }
            }
        }

        for (let i = 0; i < ROW_COUNT - 3; i++) {
            for (let j = 3; j < COLUMN_COUNT; j++) {
                if (
                    newBoard[i][j] === newBoard[i + 1][j - 1] &&
                    newBoard[i][j] === newBoard[i + 2][j - 2] &&
                    newBoard[i][j] === newBoard[i + 3][j - 3] &&
                    newBoard[i][j] !== 0
                ) {
                    if (isPlace) {
                        setPause(true);
                        setGameOver(true);
                    }
                    return true;
                }
            }
        }
        return false;
    };

    const checkDrawMove = (newBoard, isPlace) => {
        if (!newBoard[0].includes(0)) {
            if (isPlace) {
                setDraw(true);
                setPause(true);
                setGameOver(true);
            }
            return true;
        }
        return false;
    };

    const handleAiMove = () => {
        let bestScore = -Infinity;
        let bestMove = null;
        const checkBoard = board.map((row) => [...row]);
        console.log(checkBoard);

        for (let col of possibleMoves(checkBoard)) {
            const newBoard = dropPiece(checkBoard, col, 2);
            const score = minimax(false, 0, -Infinity, Infinity, newBoard);

            if (score > bestScore) {
                bestScore = score;
                bestMove = col;
            }
        }
        handleMove(bestMove, 2);
    };

    const possibleMoves = (checkBoard) => {
        let res = [];
        for (let i = 0; i < COLUMN_COUNT; i++) {
            if (checkBoard[0][i] === 0) {
                res.push(i);
            }
        }
        return res;
    };

    const minimax = (maximizing, depth, alpha, beta, predictBoard) => {
        if (checkWinMove(predictBoard, false)) {
            return maximizing ? -Infinity : Infinity;
        } else if (checkDrawMove(predictBoard, false)) {
            return 0;
        } else if (depth === MAX_DEPTH) {
            return scoreEvaluation(predictBoard, 2);
        }

        if (maximizing) {
            let maxEval = -Infinity;
            for (let col of possibleMoves(predictBoard)) {
                const score = minimax(
                    false,
                    depth + 1,
                    alpha,
                    beta,
                    dropPiece(predictBoard, col, 2),
                );
                maxEval = Math.max(maxEval, score);

                alpha = Math.max(maxEval, alpha);
                if (beta <= alpha) {
                    break;
                }
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (let col of possibleMoves(predictBoard)) {
                const score = minimax(
                    true,
                    depth + 1,
                    alpha,
                    beta,
                    dropPiece(predictBoard, col, 1),
                );
                minEval = Math.min(minEval, score);

                beta = Math.min(minEval, beta);
                if (beta <= alpha) {
                    break;
                }
            }
            return minEval;
        }
    };

    const scoreEvaluation = (checkBoard, aiPlayer) => {
        const evaluationBoard = [
            [3, 4, 5, 7, 5, 4, 3],
            [4, 6, 8, 10, 8, 6, 4],
            [5, 7, 11, 13, 11, 7, 5],
            [5, 7, 11, 13, 11, 7, 5],
            [4, 6, 8, 10, 8, 6, 4],
            [3, 4, 5, 7, 5, 4, 3],
        ];

        let aiScore = 0;
        let playerScore = 0;
        for (let i = 0; i < ROW_COUNT; i++) {
            for (let j = 0; j < COLUMN_COUNT; j++) {
                if (checkBoard[i][j] !== 0) {
                    checkBoard[i][j] === aiPlayer
                        ? (aiScore += evaluationBoard[i][j])
                        : (playerScore += evaluationBoard[i][j]);
                }
            }
        }
        return aiScore - playerScore;
    };

    const handleNewGame = () => {
        setGameOver(false);
        setBoard(
            Array.from({ length: ROW_COUNT }, () =>
                Array(COLUMN_COUNT).fill(0),
            ),
        );
        setTurn(0);
        setPause(false);
        setDraw(false);
    };

    const menuNotification = () => {
        if (draw && gameOver) {
            return "Hòa";
        } else if (gameOver && aiPlayer) {
            return (turn + 1) % 2 === 0 ? "Người chơi thắng" : "AI thắng";
        } else if (gameOver) {
            return (turn + 1) % 2 === 0
                ? "Người chơi 1 thắng"
                : "Người chơi 2 thắng";
        }
        return "Tạm dừng";
    };

    useEffect(() => {
        if (aiPlayer && !gameOver && turn % 2 === 1) {
            const timer = setTimeout(() => {
                handleAiMove();
                setTurn((prev) => (prev + 1) % 2);
            }, 300);
            return () => clearTimeout(timer);
        }
        return () => {};
    }, [board]);

    return (
        <div className="w-screen h-screen bg-black flex justify-center items-center relative">
            {pause ? (
                <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center">
                    <div className="absolute border border-gray-100 shadow-xl bg-white p-5 rounded-xl">
                        <button
                            onClick={() => setPause(false)}
                            className="absolute top-0 right-0 translate-x-[50%] translate-y-[-50%] p-1 text-sm font-semibold bg-gray-300 rounded-full cursor-pointer"
                        >
                            <X />
                        </button>
                        <h5 className="text-center mb-5 p-2 font-semibold text-xl border-b border-b-gray-100">
                            {menuNotification()}
                        </h5>
                        <button className="p-5 m-4 bg-green-500 rounded-lg cursor-pointer hover:bg-green-400 transition-colors duration-200">
                            <House />
                        </button>
                        <button
                            onClick={() => {
                                handleNewGame();
                                setAiPlayer(false);
                            }}
                            className="p-5 m-4 bg-green-500 rounded-lg cursor-pointer hover:bg-green-400 transition-colors duration-200"
                        >
                            <Users />
                        </button>
                        <button
                            onClick={() => {
                                handleNewGame();
                                setAiPlayer(true);
                            }}
                            className="p-5 m-4 bg-green-500 rounded-lg cursor-pointer hover:bg-green-400 transition-colors duration-200"
                        >
                            <Bot />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setPause((prev) => !prev)}
                    className="absolute top-2 right-2 text-white cursor-pointer rounded-full border-4 border-white p-2"
                >
                    <Pause size={30} />
                </button>
            )}
            <div className="h-150 w-175 bg-white grid grid-cols-7 gap-2 rounded-[48px] p-2">
                {board.map((row, i) =>
                    row.map((col, j) => {
                        return (
                            <div
                                onClick={() => {
                                    handleMove(j, turn === 0 ? 1 : 2);
                                    setTurn((prev) => (prev + 1) % 2);
                                }}
                                onMouseEnter={() => handleMouseEnter(j)}
                                onMouseLeave={() => handleMouseLeave(j)}
                                key={`tile_${i}_${j}`}
                                id={`${i}_${j}`}
                                className={`border border-black rounded-full p-2 ${!gameOver && hoverTile && hoverTile.x === i && hoverTile.y === j ? (turn % 2 === 0 ? "bg-red-200" : "bg-yellow-200") : ""} ${board[i][j] !== 0 ? (board[i][j] === 1 ? "bg-red-500" : "bg-yellow-500") : ""}`}
                            ></div>
                        );
                    }),
                )}
            </div>
        </div>
    );
};

export default App;
