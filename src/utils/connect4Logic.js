// Pure game logic and optimized AI minimax for Connect 4

export const ROW_COUNT = 6;
export const COLUMN_COUNT = 7;
export const EMPTY = 0;
export const PLAYER_1 = 1; // Red
export const PLAYER_2 = 2; // Yellow

// Priority order for move exploration (center column first for maximum pruning efficiency)
const MOVE_ORDER = [3, 2, 4, 1, 5, 0, 6];

/**
 * Creates an empty 6x7 grid
 */
export const createEmptyBoard = () => {
    return Array.from({ length: ROW_COUNT }, () =>
        Array.from({ length: COLUMN_COUNT }, () => EMPTY),
    );
};

/**
 * Finds the lowest available row in a given column, or -1 if full
 */
export const getLowestEmptyRow = (board, col) => {
    if (col < 0 || col >= COLUMN_COUNT || board[0][col] !== EMPTY) {
        return -1;
    }
    for (let r = ROW_COUNT - 1; r >= 0; r--) {
        if (board[r][col] === EMPTY) {
            return r;
        }
    }
    return -1;
};

/**
 * Checks if a column has space for a chip
 */
export const isValidMove = (board, col) => {
    return col >= 0 && col < COLUMN_COUNT && board[0][col] === EMPTY;
};

/**
 * Returns available columns sorted by center-priority
 */
export const getPossibleMoves = (board) => {
    return MOVE_ORDER.filter((col) => isValidMove(board, col));
};

/**
 * Makes a simulated move and returns a new board
 */
export const makeMove = (board, col, player) => {
    const row = getLowestEmptyRow(board, col);
    if (row === -1) return null;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = player;
    return { newBoard, row, col };
};

/**
 * Checks for a 4-in-a-row win on the board.
 * Returns { winner, winningCells } or null.
 */
export const checkWin = (board) => {
    // 1. Horizontal
    for (let r = 0; r < ROW_COUNT; r++) {
        for (let c = 0; c <= COLUMN_COUNT - 4; c++) {
            const piece = board[r][c];
            if (
                piece !== EMPTY &&
                piece === board[r][c + 1] &&
                piece === board[r][c + 2] &&
                piece === board[r][c + 3]
            ) {
                return {
                    winner: piece,
                    winningCells: [
                        { r, c },
                        { r, c: c + 1 },
                        { r, c: c + 2 },
                        { r, c: c + 3 },
                    ],
                };
            }
        }
    }

    // 2. Vertical
    for (let r = 0; r <= ROW_COUNT - 4; r++) {
        for (let c = 0; c < COLUMN_COUNT; c++) {
            const piece = board[r][c];
            if (
                piece !== EMPTY &&
                piece === board[r + 1][c] &&
                piece === board[r + 2][c] &&
                piece === board[r + 3][c]
            ) {
                return {
                    winner: piece,
                    winningCells: [
                        { r, c },
                        { r: r + 1, c },
                        { r: r + 2, c },
                        { r: r + 3, c },
                    ],
                };
            }
        }
    }

    // 3. Diagonal (down-right \)
    for (let r = 0; r <= ROW_COUNT - 4; r++) {
        for (let c = 0; c <= COLUMN_COUNT - 4; c++) {
            const piece = board[r][c];
            if (
                piece !== EMPTY &&
                piece === board[r + 1][c + 1] &&
                piece === board[r + 2][c + 2] &&
                piece === board[r + 3][c + 3]
            ) {
                return {
                    winner: piece,
                    winningCells: [
                        { r, c },
                        { r: r + 1, c: c + 1 },
                        { r: r + 2, c: c + 2 },
                        { r: r + 3, c: c + 3 },
                    ],
                };
            }
        }
    }

    // 4. Diagonal (down-left /)
    for (let r = 0; r <= ROW_COUNT - 4; r++) {
        for (let c = 3; c < COLUMN_COUNT; c++) {
            const piece = board[r][c];
            if (
                piece !== EMPTY &&
                piece === board[r + 1][c - 1] &&
                piece === board[r + 2][c - 2] &&
                piece === board[r + 3][c - 3]
            ) {
                return {
                    winner: piece,
                    winningCells: [
                        { r, c },
                        { r: r + 1, c: c - 1 },
                        { r: r + 2, c: c - 2 },
                        { r: r + 3, c: c - 3 },
                    ],
                };
            }
        }
    }

    return null;
};

/**
 * Checks if the game is drawn (top row is completely filled and no winner)
 */
export const checkDraw = (board) => {
    for (let c = 0; c < COLUMN_COUNT; c++) {
        if (board[0][c] === EMPTY) {
            return false;
        }
    }
    return true;
};

/**
 * Evaluates a set of 4 cells for tactical scoring
 */
const evaluateWindow = (w, aiPiece, playerPiece) => {
    let score = 0;
    let aiCount = 0;
    let playerCount = 0;
    let emptyCount = 0;

    for (let i = 0; i < 4; i++) {
        if (w[i] === aiPiece) aiCount++;
        else if (w[i] === playerPiece) playerCount++;
        else emptyCount++;
    }

    if (aiCount === 4) {
        score += 100000;
    } else if (aiCount === 3 && emptyCount === 1) {
        score += 120;
    } else if (aiCount === 2 && emptyCount === 2) {
        score += 15;
    }

    if (playerCount === 3 && emptyCount === 1) {
        score -= 100;
    } else if (playerCount === 2 && emptyCount === 2) {
        score -= 12;
    }

    return score;
};

/**
 * Heuristic evaluation function for non-terminal game state
 */
export const evaluateBoard = (board, aiPiece, playerPiece) => {
    let score = 0;

    // Center column preference
    const centerCol = 3;
    let centerCount = 0;
    for (let r = 0; r < ROW_COUNT; r++) {
        if (board[r][centerCol] === aiPiece) centerCount++;
        else if (board[r][centerCol] === playerPiece) centerCount--;
    }
    score += centerCount * 6;

    // Inner columns preference (cols 2 and 4)
    let innerCount = 0;
    for (let r = 0; r < ROW_COUNT; r++) {
        if (board[r][2] === aiPiece) innerCount += 2;
        if (board[r][4] === aiPiece) innerCount += 2;
        if (board[r][2] === playerPiece) innerCount -= 2;
        if (board[r][4] === playerPiece) innerCount -= 2;
    }
    score += innerCount;

    // Horizontal windows
    for (let r = 0; r < ROW_COUNT; r++) {
        for (let c = 0; c <= COLUMN_COUNT - 4; c++) {
            const w = [board[r][c], board[r][c + 1], board[r][c + 2], board[r][c + 3]];
            score += evaluateWindow(w, aiPiece, playerPiece);
        }
    }

    // Vertical windows
    for (let c = 0; c < COLUMN_COUNT; c++) {
        for (let r = 0; r <= ROW_COUNT - 4; r++) {
            const w = [board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c]];
            score += evaluateWindow(w, aiPiece, playerPiece);
        }
    }

    // Positive diagonal
    for (let r = 0; r <= ROW_COUNT - 4; r++) {
        for (let c = 0; c <= COLUMN_COUNT - 4; c++) {
            const w = [
                board[r][c],
                board[r + 1][c + 1],
                board[r + 2][c + 2],
                board[r + 3][c + 3],
            ];
            score += evaluateWindow(w, aiPiece, playerPiece);
        }
    }

    // Negative diagonal
    for (let r = 0; r <= ROW_COUNT - 4; r++) {
        for (let c = 3; c < COLUMN_COUNT; c++) {
            const w = [
                board[r][c],
                board[r + 1][c - 1],
                board[r + 2][c - 2],
                board[r + 3][c - 3],
            ];
            score += evaluateWindow(w, aiPiece, playerPiece);
        }
    }

    return score;
};

/**
 * Minimax algorithm with Alpha-Beta Pruning
 */
const minimax = (
    board,
    depth,
    alpha,
    beta,
    isMaximizing,
    aiPiece,
    playerPiece,
) => {
    const winResult = checkWin(board);
    if (winResult) {
        if (winResult.winner === aiPiece) {
            return 1000000 + depth; // Prefer quicker wins
        }
        return -1000000 - depth; // Opponent win
    }

    if (checkDraw(board)) {
        return 0;
    }

    if (depth <= 0) {
        return evaluateBoard(board, aiPiece, playerPiece);
    }

    const validMoves = getPossibleMoves(board);

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (const col of validMoves) {
            const moveResult = makeMove(board, col, aiPiece);
            if (!moveResult) continue;

            const score = minimax(
                moveResult.newBoard,
                depth - 1,
                alpha,
                beta,
                false,
                aiPiece,
                playerPiece,
            );
            maxEval = Math.max(maxEval, score);
            alpha = Math.max(alpha, score);
            if (beta <= alpha) break; // Beta cutoff
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const col of validMoves) {
            const moveResult = makeMove(board, col, playerPiece);
            if (!moveResult) continue;

            const score = minimax(
                moveResult.newBoard,
                depth - 1,
                alpha,
                beta,
                true,
                aiPiece,
                playerPiece,
            );
            minEval = Math.min(minEval, score);
            beta = Math.min(beta, score);
            if (beta <= alpha) break; // Alpha cutoff
        }
        return minEval;
    }
};

/**
 * Determines the best AI move based on difficulty
 * @param {Array<Array<number>>} board
 * @param {number} aiPiece
 * @param {number} playerPiece
 * @param {string|number} difficulty - 'easy', 'medium', 'hard', 'expert' or numeric depth
 * @returns {number|null} Column index (0..6)
 */
export const getBestAiMove = (board, aiPiece, playerPiece, difficulty = "medium") => {
    const validMoves = getPossibleMoves(board);
    if (validMoves.length === 0) return null;

    // Map difficulty to depth & blunder chance
    let depth = 4;
    let blunderChance = 0;

    if (typeof difficulty === "number") {
        depth = Math.min(Math.max(difficulty, 1), 6);
    } else {
        switch (difficulty) {
            case "easy":
                depth = 2;
                blunderChance = 0.35; // 35% random pick
                break;
            case "medium":
                depth = 4;
                blunderChance = 0.05;
                break;
            case "hard":
                depth = 5;
                blunderChance = 0;
                break;
            case "expert":
                depth = 6;
                blunderChance = 0;
                break;
            default:
                depth = 4;
                break;
        }
    }

    // Blunder: Pick random valid move for easy mode occasionally
    if (blunderChance > 0 && Math.random() < blunderChance) {
        return validMoves[Math.floor(Math.random() * validMoves.length)];
    }

    // 1. Immediate Win Check: Can AI win this turn?
    for (const col of validMoves) {
        const move = makeMove(board, col, aiPiece);
        if (move && checkWin(move.newBoard)?.winner === aiPiece) {
            return col;
        }
    }

    // 2. Immediate Block Check: Can opponent win on next turn?
    if (difficulty !== "easy" || Math.random() > 0.3) {
        for (const col of validMoves) {
            const move = makeMove(board, col, playerPiece);
            if (move && checkWin(move.newBoard)?.winner === playerPiece) {
                return col; // Must block!
            }
        }
    }

    // 3. Minimax with Alpha-Beta
    let bestScore = -Infinity;
    let bestMoves = [];

    for (const col of validMoves) {
        const move = makeMove(board, col, aiPiece);
        if (!move) continue;

        const score = minimax(
            move.newBoard,
            depth - 1,
            -Infinity,
            Infinity,
            false,
            aiPiece,
            playerPiece,
        );

        if (score > bestScore) {
            bestScore = score;
            bestMoves = [col];
        } else if (score === bestScore) {
            bestMoves.push(col);
        }
    }

    // If multiple equally optimal moves, choose one randomly for variety
    if (bestMoves.length > 0) {
        return bestMoves[Math.floor(Math.random() * bestMoves.length)];
    }

    return validMoves[0];
};
