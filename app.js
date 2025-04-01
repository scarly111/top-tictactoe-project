// Gameboard
function Gameboard() {
    this.gameboard = [" ", " ", " ", " ", " ", " ", " ", " ", " ",]
}

// Create player
function Player(name, marker){
    this.name = name
    this.marker = marker
}

// Play the game
function playGame(){
    const player1 = new Player('Player X', 'x')
    const player2 = new Player('Player O', 'o')
}