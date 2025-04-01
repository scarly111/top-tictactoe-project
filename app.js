// Gameboard
function Gameboard() {

    this.gameboard = [" ", " ", " ", " ", " ", " ", " ", " ", " "]

    this.displayBoard = () => {
        console.log(`
            ${this.gameboard[0]} | ${this.gameboard[1]} | ${this.gameboard[2]}
            ---------
            ${this.gameboard[3]} | ${this.gameboard[4]} | ${this.gameboard[5]}
            ---------
            ${this.gameboard[6]} | ${this.gameboard[7]} | ${this.gameboard[8]}
          `);
    }

    this.updateBoard = (index, marker) => {
        if (this.gameboard[index] === " ") {
            this.gameboard[index] = marker;
            return true;
        }
        return false;
    }

    this.resetBoard = () => {
        this.gameboard = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
    }

}

// Create player
function Player(name, marker) {
    this.name = name
    this.marker = marker
}

// Game Controller
function Game() {
    this.winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    this.checkWinner = (board, marker) => {
        return this.winConditions.some(condition => {
            return condition.every(index => board[index] === marker);
        });
    }
    this.isTie = (board) => {
        return board.every(cell => cell !== " ");
    }
}

// Play the game
function playGame() {

    const gameboard = new Gameboard();
    const player1 = new Player('Player X', 'X');
    const player2 = new Player('Player O', 'O');
    const game = new Game();

    let currentPlayer = player1;

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function takeTurn() {
        gameboard.displayBoard();
        readline.question(`${currentPlayer.name}, enter a position (0-8): `, input => {
            const position = parseInt(input);

            if (position >= 0 && position <= 8 && gameboard.updateBoard(position, currentPlayer.marker)) {
                if (game.checkWinner(gameboard.gameboard, currentPlayer.marker)) {
                    gameboard.displayBoard();
                    console.log(`${currentPlayer.name} wins!`);
                    readline.close();
                    return;
                }

                if (game.isTie(gameboard.gameboard)) {
                    gameboard.displayBoard();
                    console.log("It's a tie!");
                    readline.close();
                    return;
                }

                currentPlayer = currentPlayer === player1 ? player2 : player1;
                takeTurn();
            } else {
                console.log("Invalid move, try again.");
                takeTurn();
            }
        });
    }

    takeTurn();
    
}

playGame()
