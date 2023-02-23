const squares = document.querySelectorAll('.square')

const game = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
let row, column
let playerTurn = true
let playerChoice = 'X'
let computerChoice = playerChoice === 'X' ? 'O' : 'X';

console.log((5/3) * 3)
console.log((5/3) + (5/3) + (5/3))
console.log(Math.pow(2, (2/3)))

squares.forEach((square, idx) => {
        square.addEventListener('click', (evt) => {
            let event = evt.target;
            if(!event.childNodes.length && playerTurn){
                row = Math.floor(idx / 3)
                column = ((idx / 3) * 3) - (row * 3)
                let span = document.createElement('span')
                span.classList.add('choice')
                span.innerHTML = playerChoice
                span.style.color = 'blue'
                game[row][column]++  
                event.appendChild(span)
                playerTurn = !playerTurn
                if(checkWinner(1)){
                    console.log('you won')
                    return
                }
                setTimeout(() => {
                    computer()
                }, 0500);
                console.log(game)

            }
        })
})

const computer = () => {
    row = Math.floor(Math.random() * 3)
    column = Math.floor(Math.random() * 3)
    let available = checkSquares()
    while(available){
        row = Math.floor(Math.random() * 3)
        column = Math.floor(Math.random() * 3)
        if(game[row][column] === 0){
            game[row][column]--
            let span = document.createElement('span')
            span.classList.add('choice')
            span.innerHTML = computerChoice
            squares[((row * 3) + column)].appendChild(span)
            if(checkWinner(-1)){
                console.log('Computer won')
                return
                break
            }
            playerTurn = !playerTurn
            console.log(game)
            break
        }
        console.log('Computer didn\'t go')
    }
}

const checkSquares = () => {
    for(let square of squares){
        if(!square.childNodes.length) return true
    }
    return false
}

const checkWinner = (piece) => {
    console.log(game)
    // horizontal victory
    if(game[0][0] === piece && game[0][1] === piece && game[0][2] === piece) return true
    if(game[1][0] === piece && game[1][1] === piece && game[1][2] === piece) return true
    if(game[2][0] === piece && game[2][1] === piece && game[2][2] === piece) return true

    //vertical victory
    if(game[0][0] === piece && game[1][0] === piece && game[2][0] === piece) return true
    if(game[0][1] === piece && game[1][1] === piece && game[2][1] === piece) return true
    if(game[0][2] === piece && game[1][2] === piece && game[2][2] === piece) return true

    //diagoanal victory
    if(game[0][0] === piece && game[1][1] === piece && game[2][2] === piece) return true
    if(game[0][2] === piece && game[1][1] === piece && game[2][0] === piece) return true

    //no winner yet
    return false
}



/*

function print_board(board) {
    console.log("\n");
    for (let row of board) {
        console.log(row);
    }
}

function evaluate(board) {
    // check rows for winner
    for (let row of board) {
        if (new Set(row).size == 1) {
            if (row[0] == 'X') {
                return 10;
            } else if (row[0] == 'O') {
                return -10;
            }
        }
    }

    // check columns for winner
    for (let col = 0; col < 3; col++) {
        let column = [board[row][col] for (let row = 0; row < 3; row++)];
        if (new Set(column).size == 1) {
            if (board[0][col] == 'X') {
                return 10;
            } else if (board[0][col] == 'O') {
                return -10;
            }
        }
    }

    // check diagonals for winner
    if (new Set([board[i][i] for (let i = 0; i < 3; i++)]).size == 1) {
        if (board[0][0] == 'X') {
            return 10;
        } else if (board[0][0] == 'O') {
            return -10;
        }
    }
    if (new Set([board[i][2-i] for (let i = 0; i < 3; i++)]).size == 1) {
        if (board[0][2] == 'X') {
            return 10;
        } else if (board[0][2] == 'O') {
            return -10;
        }
    }

    // if no winner
    return 0;
}

function minimax(board, depth, alpha, beta, is_maximizing) {
    let score = evaluate(board);

    if (score == 10) {
        return score - depth;
    }
    if (score == -10) {
        return score + depth;
    }
    if (!board.some(sublist => sublist.includes(null))) {
        return 0;
    }

    if (is_maximizing) {
        let best_score = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == null) {
                    board[i][j] = 'X';
                    let score = minimax(board, depth+1, alpha, beta, false);
                    board[i][j] = null;
                    best_score = Math.max(best_score, score);
                    alpha = Math.max(alpha, score);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }
        return best_score;

    } else {
        let best_score = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == null) {
                    board[i][j] = 'O';
                    let score = minimax(board, depth+1, alpha, beta, true);
                    board[i][j] = null;
                    best_score = Math.min(best_score, score);
                    beta = Math.min(beta, score);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }
        return best_score;
    }
}


*/


console.log(game)