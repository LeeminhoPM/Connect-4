import React, { useEffect, useState } from "react";
import { Bot, House, Pause, Users, X } from "lucide-react";

const ROW_COUNT = 6;
const COLUMN_COUNT = 7;

const App = () => {
    const [board, setBoard] = useState(
        Array.from({ length: ROW_COUNT }, () =>
            Array.from({ length: COLUMN_COUNT }, () => 0),
        ),
    );
    const [turn, setTurn] = useState(0);
    const [pause, setPause] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const handleMouseEnter = (e) => {
        e.preventDefault();
        if (!gameOver) {
            let [x, y] = e.target.id.split("_");
            y = parseInt(y);

            if (board[0][y] === 0) {
                for (let i = ROW_COUNT - 1; i >= 0; i--) {
                    for (let j = 0; j < COLUMN_COUNT; j++) {
                        if (j === y && board[i][j] === 0) {
                            const element = document.getElementById(
                                `${i}_${j}`,
                            );
                            element.classList.add(
                                `${turn % 2 === 0 ? "bg-red-300" : "bg-yellow-300"}`,
                            );
                            return;
                        }
                    }
                }
            }
        }
    };

    const handleMouseLeave = (e) => {
        e.preventDefault();
        if (!gameOver) {
            let [x, y] = e.target.id.split("_");
            y = parseInt(y);

            if (board[0][y] === 0) {
                for (let i = ROW_COUNT - 1; i >= 0; i--) {
                    for (let j = 0; j < COLUMN_COUNT; j++) {
                        if (j === y && board[i][j] === 0) {
                            const element = document.getElementById(
                                `${i}_${j}`,
                            );
                            element.classList.remove(
                                `${turn % 2 === 0 ? "bg-red-300" : "bg-yellow-300"}`,
                            );
                        }
                    }
                }
            }
        }
    };

    const handleMove = (e) => {
        e.preventDefault();
        if (!gameOver) {
            let [x, y] = e.target.id.split("_");
            y = parseInt(y);

            if (board[0][y] === 0) {
                setBoard((row) => {
                    const newBoard = row.map((col) => [...col]);

                    for (let i = ROW_COUNT - 1; i >= 0; i--) {
                        for (let j = 0; j < COLUMN_COUNT; j++) {
                            if (j === y && board[i][j] === 0) {
                                turn === 0
                                    ? (newBoard[i][j] = 1)
                                    : (newBoard[i][j] = 2);
                                checkWinMove(newBoard);
                                return newBoard;
                            }
                        }
                    }
                });
                setTurn((prev) => (prev + 1) % 2);
            }
        }
    };

    const checkWinMove = (newBoard) => {
        for (let i = 0; i < ROW_COUNT; i++) {
            for (let j = 0; j < COLUMN_COUNT - 3; j++) {
                if (
                    newBoard[i][j] === newBoard[i][j + 1] &&
                    newBoard[i][j] === newBoard[i][j + 2] &&
                    newBoard[i][j] === newBoard[i][j + 3] &&
                    newBoard[i][j] !== 0
                ) {
                    setPause(true);
                    setGameOver(true);
                    return;
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
                    setPause(true);
                    setGameOver(true);
                    return;
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
                    setPause(true);
                    setGameOver(true);
                    return;
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
                    setPause(true);
                    setGameOver(true);
                    return;
                }
            }
        }
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
    };

    useEffect(() => {
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
                            {gameOver
                                ? (turn - 1) % 2 === 0
                                    ? "Người chơi 1 thắng"
                                    : "Người chơi 2 thắng"
                                : "Tạm dừng"}
                        </h5>
                        <button className="p-5 m-4 bg-green-500 rounded-lg cursor-pointer hover:bg-green-400 transition-colors duration-200">
                            <House />
                        </button>
                        <button
                            onClick={handleNewGame}
                            className="p-5 m-4 bg-green-500 rounded-lg cursor-pointer hover:bg-green-400 transition-colors duration-200"
                        >
                            <Users />
                        </button>
                        <button className="p-5 m-4 bg-green-500 rounded-lg cursor-pointer hover:bg-green-400 transition-colors duration-200">
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
                                onClick={handleMove}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                key={`tile_${i}_${j}`}
                                id={`${i}_${j}`}
                                className={`border border-black rounded-full p-2 ${!gameOver ? "cursor-pointer" : ""} ${board[i][j] !== 0 ? (board[i][j] === 1 ? "bg-red-500" : "bg-yellow-500") : ""}`}
                            ></div>
                        );
                    }),
                )}
            </div>
        </div>
    );
};

export default App;
