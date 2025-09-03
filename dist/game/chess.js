export class ChessGame {
    constructor() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'white';
    }
    initializeBoard() {
        return [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            Array(8).fill(null),
            Array(8).fill(null),
            Array(8).fill(null),
            Array(8).fill(null),
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
        ];
    }
    getBoard() {
        return this.board;
    }
    startGame() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'white';
    }
    makeMove(from, to) {
        const [fromRow, fromCol] = from;
        const [toRow, toCol] = to;
        if (this.isValidMove(from, to)) {
            this.board[toRow][toCol] = this.board[fromRow][fromCol];
            this.board[fromRow][fromCol] = null;
            this.switchPlayer();
            return true;
        }
        return false;
    }
    // TEE isValidMove JULKISEKSI!
    isValidMove(from, to) {
        const [fromRow, fromCol] = from;
        const [toRow, toCol] = to;
        const piece = this.board[fromRow][fromCol];
        if (!piece)
            return false;
        if (fromRow === toRow && fromCol === toCol)
            return false;
        if (this.currentPlayer === 'white' && piece !== piece.toUpperCase())
            return false;
        if (this.currentPlayer === 'black' && piece !== piece.toLowerCase())
            return false;
        const target = this.board[toRow][toCol];
        if (target && ((this.currentPlayer === 'white' && target === target.toUpperCase()) ||
            (this.currentPlayer === 'black' && target === target.toLowerCase()))) {
            return false;
        }
        // Estä kuninkaan syönti
        if (target && target.toLowerCase() === 'k') {
            return false;
        }
        // Sotilas
        if (piece === 'P') {
            if (fromCol === toCol && fromRow - 1 === toRow && !target)
                return true;
            if (fromCol === toCol && fromRow === 6 && toRow === 4 && !target && !this.board[5][fromCol])
                return true;
            if (Math.abs(fromCol - toCol) === 1 && fromRow - 1 === toRow && target && target === target.toLowerCase())
                return true;
            return false;
        }
        if (piece === 'p') {
            if (fromCol === toCol && fromRow + 1 === toRow && !target)
                return true;
            if (fromCol === toCol && fromRow === 1 && toRow === 3 && !target && !this.board[2][fromCol])
                return true;
            if (Math.abs(fromCol - toCol) === 1 && fromRow + 1 === toRow && target && target === target.toUpperCase())
                return true;
            return false;
        }
        // Torni
        if (piece.toLowerCase() === 'r') {
            if (fromRow !== toRow && fromCol !== toCol)
                return false;
            if (fromRow === toRow) {
                const dir = fromCol < toCol ? 1 : -1;
                for (let c = fromCol + dir; c !== toCol; c += dir) {
                    if (this.board[fromRow][c])
                        return false;
                }
            }
            else {
                const dir = fromRow < toRow ? 1 : -1;
                for (let r = fromRow + dir; r !== toRow; r += dir) {
                    if (this.board[r][fromCol])
                        return false;
                }
            }
            return true;
        }
        // Lähetti
        if (piece.toLowerCase() === 'b') {
            if (Math.abs(fromRow - toRow) !== Math.abs(fromCol - toCol))
                return false;
            const rowDir = fromRow < toRow ? 1 : -1;
            const colDir = fromCol < toCol ? 1 : -1;
            let r = fromRow + rowDir, c = fromCol + colDir;
            while (r !== toRow && c !== toCol) {
                if (this.board[r][c])
                    return false;
                r += rowDir;
                c += colDir;
            }
            return true;
        }
        // Kuningatar
        if (piece.toLowerCase() === 'q') {
            // Torni-liike
            if (fromRow === toRow || fromCol === toCol) {
                // Käytä tornin logiikkaa
                return this.isValidMoveAs(from, to, 'r');
            }
            // Lähetti-liike
            if (Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) {
                // Käytä lähetin logiikkaa
                return this.isValidMoveAs(from, to, 'b');
            }
            return false;
        }
        // Ratsut
        if (piece.toLowerCase() === 'n') {
            const dr = Math.abs(fromRow - toRow);
            const dc = Math.abs(fromCol - toCol);
            return (dr === 2 && dc === 1) || (dr === 1 && dc === 2);
        }
        // Kuningas
        if (piece.toLowerCase() === 'k') {
            const dr = Math.abs(fromRow - toRow);
            const dc = Math.abs(fromCol - toCol);
            return dr <= 1 && dc <= 1;
        }
        return false;
    }
    isValidMoveForPlayer(from, to, player) {
        const [fromRow, fromCol] = from;
        const [toRow, toCol] = to;
        const piece = this.board[fromRow][fromCol];
        if (!piece)
            return false;
        if (fromRow === toRow && fromCol === toCol)
            return false;
        if (player === 'white' && piece !== piece.toUpperCase())
            return false;
        if (player === 'black' && piece !== piece.toLowerCase())
            return false;
        const target = this.board[toRow][toCol];
        if (target && ((player === 'white' && target === target.toUpperCase()) ||
            (player === 'black' && target === target.toLowerCase()))) {
            return false;
        }
        // Estä kuninkaan syönti
        if (target && target.toLowerCase() === 'k') {
            return false;
        }
        // Sotilas
        if (piece === 'P') {
            if (fromCol === toCol && fromRow - 1 === toRow && !target)
                return true;
            if (fromCol === toCol && fromRow === 6 && toRow === 4 && !target && !this.board[5][fromCol])
                return true;
            if (Math.abs(fromCol - toCol) === 1 && fromRow - 1 === toRow && target && target === target.toLowerCase())
                return true;
            return false;
        }
        if (piece === 'p') {
            if (fromCol === toCol && fromRow + 1 === toRow && !target)
                return true;
            if (fromCol === toCol && fromRow === 1 && toRow === 3 && !target && !this.board[2][fromCol])
                return true;
            if (Math.abs(fromCol - toCol) === 1 && fromRow + 1 === toRow && target && target === target.toUpperCase())
                return true;
            return false;
        }
        // Torni
        if (piece.toLowerCase() === 'r') {
            if (fromRow !== toRow && fromCol !== toCol)
                return false;
            if (fromRow === toRow) {
                const dir = fromCol < toCol ? 1 : -1;
                for (let c = fromCol + dir; c !== toCol; c += dir) {
                    if (this.board[fromRow][c])
                        return false;
                }
            }
            else {
                const dir = fromRow < toRow ? 1 : -1;
                for (let r = fromRow + dir; r !== toRow; r += dir) {
                    if (this.board[r][fromCol])
                        return false;
                }
            }
            return true;
        }
        // Lähetti
        if (piece.toLowerCase() === 'b') {
            if (Math.abs(fromRow - toRow) !== Math.abs(fromCol - toCol))
                return false;
            const rowDir = fromRow < toRow ? 1 : -1;
            const colDir = fromCol < toCol ? 1 : -1;
            let r = fromRow + rowDir, c = fromCol + colDir;
            while (r !== toRow && c !== toCol) {
                if (this.board[r][c])
                    return false;
                r += rowDir;
                c += colDir;
            }
            return true;
        }
        // Kuningatar
        if (piece.toLowerCase() === 'q') {
            // Torni-liike
            if (fromRow === toRow || fromCol === toCol) {
                // Käytä tornin logiikkaa
                return this.isValidMoveAs(from, to, 'r');
            }
            // Lähetti-liike
            if (Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) {
                // Käytä lähetin logiikkaa
                return this.isValidMoveAs(from, to, 'b');
            }
            return false;
        }
        // Ratsut
        if (piece.toLowerCase() === 'n') {
            const dr = Math.abs(fromRow - toRow);
            const dc = Math.abs(fromCol - toCol);
            return (dr === 2 && dc === 1) || (dr === 1 && dc === 2);
        }
        // Kuningas
        if (piece.toLowerCase() === 'k') {
            const dr = Math.abs(fromRow - toRow);
            const dc = Math.abs(fromCol - toCol);
            return dr <= 1 && dc <= 1;
        }
        return false;
    }
    isValidMoveAs(from, to, type) {
        const [fromRow, fromCol] = from;
        const [toRow, toCol] = to;
        // Estä kuninkaan syönti myös apumetodissa
        const target = this.board[toRow][toCol];
        if (target && target.toLowerCase() === 'k') {
            return false;
        }
        if (type === 'r') {
            if (fromRow !== toRow && fromCol !== toCol)
                return false;
            if (fromRow === toRow) {
                const dir = fromCol < toCol ? 1 : -1;
                for (let c = fromCol + dir; c !== toCol; c += dir) {
                    if (this.board[fromRow][c])
                        return false;
                }
            }
            else {
                const dir = fromRow < toRow ? 1 : -1;
                for (let r = fromRow + dir; r !== toRow; r += dir) {
                    if (this.board[r][fromCol])
                        return false;
                }
            }
            return true;
        }
        if (type === 'b') {
            if (Math.abs(fromRow - toRow) !== Math.abs(fromCol - toCol))
                return false;
            const rowDir = fromRow < toRow ? 1 : -1;
            const colDir = fromCol < toCol ? 1 : -1;
            let r = fromRow + rowDir, c = fromCol + colDir;
            while (r !== toRow && c !== toCol) {
                if (this.board[r][c])
                    return false;
                r += rowDir;
                c += colDir;
            }
            return true;
        }
        return false;
    }
    isKingInCheck(player) {
        // Etsi kuninkaan sijainti
        let king = null;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = this.board[i][j];
                if (player === 'white' && piece === 'K')
                    king = [i, j];
                if (player === 'black' && piece === 'k')
                    king = [i, j];
            }
        }
        if (!king)
            return true; // Ei kuningasta = matti
        // Käy läpi kaikki vastustajan siirrot, uhkaako kuningasta
        const opponent = player === 'white' ? 'black' : 'white';
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = this.board[i][j];
                if (!piece)
                    continue;
                if (opponent === 'white' && piece !== piece.toUpperCase())
                    continue;
                if (opponent === 'black' && piece !== piece.toLowerCase())
                    continue;
                if (this.isValidMove([i, j], king))
                    return true;
            }
        }
        return false;
    }
    hasAnyLegalMoves(player) {
        for (let fromRow = 0; fromRow < 8; fromRow++) {
            for (let fromCol = 0; fromCol < 8; fromCol++) {
                const piece = this.board[fromRow][fromCol];
                if (!piece)
                    continue;
                if (player === 'white' && piece !== piece.toUpperCase())
                    continue;
                if (player === 'black' && piece !== piece.toLowerCase())
                    continue;
                for (let toRow = 0; toRow < 8; toRow++) {
                    for (let toCol = 0; toCol < 8; toCol++) {
                        if (this.isValidMoveForPlayer([fromRow, fromCol], [toRow, toCol], player)) {
                            // Testaa siirto
                            const backupFrom = this.board[fromRow][fromCol];
                            const backupTo = this.board[toRow][toCol];
                            this.board[toRow][toCol] = backupFrom;
                            this.board[fromRow][fromCol] = null;
                            const inCheck = this.isKingInCheck(player);
                            this.board[fromRow][fromCol] = backupFrom;
                            this.board[toRow][toCol] = backupTo;
                            if (!inCheck)
                                return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
    }
}
