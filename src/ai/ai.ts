import { ChessGame } from '../game/chess.js';

export default class AI {
    calculateMove(board: (string | null)[][], currentPlayer?: 'white' | 'black') {
        // Selvitä vuorossa oleva väri, jos ei annettu parametrina
        if (!currentPlayer) {
            currentPlayer = 'white';
            outer: for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    const piece = board[i][j];
                    if (piece) {
                        currentPlayer = piece === piece.toUpperCase() ? 'white' : 'black';
                        break outer;
                    }
                }
            }
        }

        // Kerää kaikki lailliset siirrot, jotka eivät jätä omaa kuningasta shakkiin
        const moves: { from: [number, number], to: [number, number] }[] = [];
        const chessGame = new ChessGame();
        chessGame['board'] = board.map(row => row.slice());
        chessGame['currentPlayer'] = currentPlayer;

        for (let fromRow = 0; fromRow < 8; fromRow++) {
            for (let fromCol = 0; fromCol < 8; fromCol++) {
                const piece = board[fromRow][fromCol];
                if (!piece) continue;
                if (currentPlayer === 'white' && piece !== piece.toUpperCase()) continue;
                if (currentPlayer === 'black' && piece !== piece.toLowerCase()) continue;
                for (let toRow = 0; toRow < 8; toRow++) {
                    for (let toCol = 0; toCol < 8; toCol++) {
                        if (chessGame.isValidMove([fromRow, fromCol], [toRow, toCol])) {
                            // Testaa, ettei siirto jätä kuningasta shakkiin
                            const backupFrom = board[fromRow][fromCol];
                            const backupTo = board[toRow][toCol];
                            board[toRow][toCol] = board[fromRow][fromCol];
                            board[fromRow][fromCol] = null;
                            chessGame['board'] = board.map(row => row.slice());
                            const inCheck = chessGame.isKingInCheck(currentPlayer);
                            // Peruuta siirto
                            board[fromRow][fromCol] = backupFrom;
                            board[toRow][toCol] = backupTo;
                            chessGame['board'] = board.map(row => row.slice());
                            if (!inCheck) {
                                moves.push({ from: [fromRow, fromCol], to: [toRow, toCol] });
                            }
                        }
                    }
                }
            }
        }

        if (moves.length === 0) return null;
        // Syö ensin jos mahdollista
        const captureMoves = moves.filter(move => {
            const target = board[move.to[0]][move.to[1]];
            return target !== null;
        });
        const chosen = (captureMoves.length > 0 ? captureMoves : moves)[Math.floor(Math.random() * (captureMoves.length > 0 ? captureMoves.length : moves.length))];
        return chosen;
    }
}