import { ChessGame } from './game/chess.js';
import { Board } from './ui/board.js';
import AI from './ai/ai.js';

const BOARD_ELEMENT_ID = 'chessboard';
const chessGame = new ChessGame();
const board = new Board(BOARD_ELEMENT_ID);
const ai = new AI();

let selected: [number, number] | null = null;
let playerSide: 'white' = 'white';

function init() {
    // Näytä lauta heti, ei sivun valintaa
    document.getElementById(BOARD_ELEMENT_ID)!.style.display = '';
    chessGame.startGame();
    board.render(chessGame.getBoard());
    setupEventListeners();
}

function getPossibleMoves(from: [number, number]): [number, number][] {
    const piece = chessGame.getBoard()[from[0]][from[1]];
    if (!piece) return [];
    if (chessGame['currentPlayer'] === 'white' && piece !== piece.toUpperCase()) return [];
    if (chessGame['currentPlayer'] === 'black' && piece !== piece.toLowerCase()) return [];

    const moves: [number, number][] = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (chessGame.isValidMove(from, [i, j])) {
                moves.push([i, j]);
            }
        }
    }
    return moves;
}

function clearHighlights() {
    document.querySelectorAll('.selected').forEach(sq => (sq as HTMLElement).classList.remove('selected'));
    document.querySelectorAll('.possible-move').forEach(sq => (sq as HTMLElement).classList.remove('possible-move'));
}

function checkGameEnd() {
    const player = chessGame['currentPlayer'] as 'white' | 'black';
    if (!chessGame.hasAnyLegalMoves(player)) {
        if (chessGame.isKingInCheck(player)) {
            alert('Shakkimatti! ' + (player === 'white' ? 'Musta' : 'Valkoinen') + ' voitti!');
        } else {
            alert('Pattitilanne!');
        }
        document.getElementById(BOARD_ELEMENT_ID)!.style.pointerEvents = 'none';
        return true;
    }
    if (chessGame.isKingInCheck(player)) {
        setTimeout(() => alert('Shakki!'), 10);
    }
    return false;
}

function aiMoveIfNeeded() {
    if (playerSide !== chessGame['currentPlayer']) {
        setTimeout(() => {
            const move = ai.calculateMove(chessGame.getBoard());
            if (move) {
                chessGame.makeMove(move.from, move.to);
                board.render(chessGame.getBoard());
                clearHighlights();
                checkGameEnd();
            }
        }, 400);
    }
}

function setupEventListeners() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = board.squares[i][j];
            square.onclick = null;
        }
    }
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = board.squares[i][j];
            square.onclick = () => {
                if (playerSide !== chessGame['currentPlayer']) return;
                clearHighlights();
                if (!selected) {
                    selected = [i, j];
                    square.classList.add('selected');
                    const moves = getPossibleMoves(selected);
                    moves.forEach(([toRow, toCol]) => {
                        board.squares[toRow][toCol].classList.add('possible-move');
                    });
                } else {
                    const moved = chessGame.makeMove(selected, [i, j]);
                    selected = null;
                    board.render(chessGame.getBoard());
                    clearHighlights();
                    if (!checkGameEnd()) aiMoveIfNeeded();
                }
            };
        }
    }
}

init();