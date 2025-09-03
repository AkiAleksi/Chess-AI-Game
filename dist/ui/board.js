export class Board {
    constructor(boardElementId) {
        const el = document.getElementById(boardElementId);
        if (!el) {
            throw new Error(`Element with id "${boardElementId}" not found`);
        }
        this.boardElement = el;
        this.squares = this.createBoard();
    }
    createBoard() {
        const squares = [];
        this.boardElement.innerHTML = '';
        for (let i = 0; i < 8; i++) {
            const row = [];
            const rowDiv = document.createElement('div');
            rowDiv.style.display = 'flex';
            for (let j = 0; j < 8; j++) {
                const square = document.createElement('div');
                square.className = `square ${this.getSquareColor(i, j)}`;
                square.dataset.position = `${i},${j}`;
                rowDiv.appendChild(square);
                row.push(square);
            }
            this.boardElement.appendChild(rowDiv);
            squares.push(row);
        }
        return squares;
    }
    render(boardState) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = boardState[i][j];
                this.squares[i][j].textContent = this.getPieceSymbol(piece);
                this.squares[i][j].className = `square ${this.getSquareColor(i, j)}`;
                // Lisää nappulan väri selkeästi
                if (piece) {
                    if (piece === piece.toUpperCase()) {
                        this.squares[i][j].classList.add('white-piece');
                        this.squares[i][j].classList.remove('black-piece');
                    }
                    else {
                        this.squares[i][j].classList.add('black-piece');
                        this.squares[i][j].classList.remove('white-piece');
                    }
                }
                else {
                    this.squares[i][j].classList.remove('white-piece', 'black-piece');
                }
            }
        }
    }
    getPieceSymbol(piece) {
        switch (piece) {
            case 'K': return '♔';
            case 'Q': return '♕';
            case 'R': return '♖';
            case 'B': return '♗';
            case 'N': return '♘';
            case 'P': return '♙';
            case 'k': return '♚';
            case 'q': return '♛';
            case 'r': return '♜';
            case 'b': return '♝';
            case 'n': return '♞';
            case 'p': return '♟';
            default: return '';
        }
    }
    getSquareColor(row, col) {
        return (row + col) % 2 === 0 ? 'white' : 'black';
    }
}
