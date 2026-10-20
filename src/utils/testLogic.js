/* global process */
import {
    createEmptyBoard,
    getLowestEmptyRow,
    isValidMove,
    makeMove,
    checkWin,
    checkDraw,
    getBestAiMove,
    PLAYER_1,
    PLAYER_2,
    ROW_COUNT,
    COLUMN_COUNT,
} from "./connect4Logic.js";

function assert(condition, message) {
    if (!condition) {
        console.error("FAIL:", message);
        process.exit(1);
    } else {
        console.log("PASS:", message);
    }
}

console.log("--- BẮT ĐẦU KIỂM TRA CONNECT 4 LOGIC ---");

// 1. Kiểm tra khởi tạo bàn cờ
const emptyBoard = createEmptyBoard();
assert(emptyBoard.length === ROW_COUNT, "Board có 6 hàng");
assert(emptyBoard[0].length === COLUMN_COUNT, "Board có 7 cột");

// 2. Kiểm tra hàng trống thấp nhất và tính hợp lệ của nước đi
assert(getLowestEmptyRow(emptyBoard, 3) === 5, "Cột rỗng phải rơi xuống hàng 5 (dưới cùng)");
assert(isValidMove(emptyBoard, 3) === true, "Cột rỗng là nước đi hợp lệ");

// 3. Kiểm tra thả cờ
const m1 = makeMove(emptyBoard, 3, PLAYER_1);
assert(m1.row === 5 && m1.col === 3, "Nước đi đầu vào cột 3 rơi xuống hàng 5");
assert(getLowestEmptyRow(m1.newBoard, 3) === 4, "Sau đó hàng trống của cột 3 là hàng 4");

// 4. Kiểm tra chiến thắng Hàng Ngang
let hBoard = createEmptyBoard();
hBoard[5][1] = PLAYER_1;
hBoard[5][2] = PLAYER_1;
hBoard[5][3] = PLAYER_1;
hBoard[5][4] = PLAYER_1;
const winH = checkWin(hBoard);
assert(winH && winH.winner === PLAYER_1 && winH.winningCells.length === 4, "Kiểm tra thắng Hàng Ngang chính xác");

// 5. Kiểm tra chiến thắng Hàng Dọc
let vBoard = createEmptyBoard();
vBoard[5][0] = PLAYER_2;
vBoard[4][0] = PLAYER_2;
vBoard[3][0] = PLAYER_2;
vBoard[2][0] = PLAYER_2;
const winV = checkWin(vBoard);
assert(winV && winV.winner === PLAYER_2 && winV.winningCells.length === 4, "Kiểm tra thắng Hàng Dọc chính xác");

// 6. Kiểm tra chiến thắng Đường Chéo \
let d1Board = createEmptyBoard();
d1Board[2][2] = PLAYER_1;
d1Board[3][3] = PLAYER_1;
d1Board[4][4] = PLAYER_1;
d1Board[5][5] = PLAYER_1;
const winD1 = checkWin(d1Board);
assert(winD1 && winD1.winner === PLAYER_1 && winD1.winningCells.length === 4, "Kiểm tra thắng Đường Chéo \\ chính xác");

// 7. Kiểm tra chiến thắng Đường Chéo /
let d2Board = createEmptyBoard();
d2Board[5][1] = PLAYER_2;
d2Board[4][2] = PLAYER_2;
d2Board[3][3] = PLAYER_2;
d2Board[2][4] = PLAYER_2;
const winD2 = checkWin(d2Board);
assert(winD2 && winD2.winner === PLAYER_2 && winD2.winningCells.length === 4, "Kiểm tra thắng Đường Chéo / chính xác");

// 8. Kiểm tra Hòa cờ
assert(checkDraw(emptyBoard) === false, "Bàn cờ trống không hòa");
let drawBoard = Array.from({ length: ROW_COUNT }, () =>
    Array.from({ length: COLUMN_COUNT }, () => 1),
);
assert(checkDraw(drawBoard) === true, "Bàn cờ kín ô trên cùng là hòa");

// 9. Kiểm tra AI nhận biết nước thắng ngay lập tức
let aiWinBoard = createEmptyBoard();
aiWinBoard[5][0] = PLAYER_2; // AI là PLAYER_2
aiWinBoard[5][1] = PLAYER_2;
aiWinBoard[5][2] = PLAYER_2;
const aiBestMoveWin = getBestAiMove(aiWinBoard, PLAYER_2, PLAYER_1, "hard");
assert(aiBestMoveWin === 3, "AI nhận biết nước đi quyết định thắng ở cột 3");

// 10. Kiểm tra AI chặn đối thủ thắng
let aiBlockBoard = createEmptyBoard();
aiBlockBoard[5][0] = PLAYER_1; // Player là PLAYER_1
aiBlockBoard[5][1] = PLAYER_1;
aiBlockBoard[5][2] = PLAYER_1;
const aiBestMoveBlock = getBestAiMove(aiBlockBoard, PLAYER_2, PLAYER_1, "hard");
assert(aiBestMoveBlock === 3, "AI chặn ngay lập tức đối thủ thắng ở cột 3");

console.log("--- TẤT CẢ 10 TEST ĐỀU THÀNH CÔNG RỰC RỠ! ---");
