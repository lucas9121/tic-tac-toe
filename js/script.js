const squares = document.querySelectorAll('.square')

const game = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
let scoreMove = [[...game[0]], [...game[1]], [...game[2]]]
let row, column
let playerTurn = true
let playerChoice = 'X'
let computerChoice = playerChoice === 'X' ? 'O' : 'X';

for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
        if(j === 2) break
        console.log(i, j)
    }
}

squares.forEach((square, idx) => {
        square.addEventListener('click', (evt) => {
            let event = evt.target;
            if(!event.childNodes.length && playerTurn){
                playerMove(idx, event)
            } else {
                setTimeout(() => {
                    computer()
                }, 0500);
                console.log(game)
            }
        })
})


const playerMove = (idx, event) => {
    let available = checkSquares()
    row = Math.floor(idx / 3)
    column = ((idx / 3) * 3) - (row * 3)
    let span = document.createElement('span')
    span.classList.add('choice')
    span.innerHTML = playerChoice
    span.style.color = 'blue'
    game[row][column]  
    event.appendChild(span)
    // scoreMove = game.slice(0)
    // check is someone won
    let winner = checkWinner(game, 1)
    if(winner === 10){
        console.log('you won')
        document.querySelector('.screen').style.display = 'block'
        return
    } else if(!available){
        console.log('tie')
        document.querySelector('.screen').style.display = 'block'
        return
    }
    
    // computer's turn
    playerTurn = !playerTurn
    setTimeout(() => {
        computer()
    }, 0500);
}

const computer = () => { 
    let available = checkSquares()
    // update shallow array
    scoreMove = [[...game[0]], [...game[1]], [...game[2]]]

    // keep finding empty row
    while(available){
        row = Math.floor(Math.random() * 3)
        column = Math.floor(Math.random() * 3)
        if(game[row][column] === 0) break
        console.log('Computer didn\'t go yet')
    }
    game[row][column]--
    let span = document.createElement('span')
    span.classList.add('choice')
    span.innerHTML = computerChoice
    squares[((row * 3) + column)].appendChild(span)
    let winner = checkWinner(game, -1)
    if( winner === -10){
        console.log('Computer won')
        document.querySelector('.screen').style.display = 'block'
        return
    } else if(!available){
        console.log('tie')
        document.querySelector('.screen').style.display = 'block'
        return
    }
    let ai = minimax(scoreMove, 0, -Infinity, Infinity, true)
    console.log(ai)
    // scoreMove = game.slice(0)  
    playerTurn = !playerTurn
    console.log(game)
    console.log(scoreMove)
}

const checkSquares = () => {
    for(let square of squares){
        if(!square.childNodes.length) return true
    }
    return false
}

const checkWinner = (board, piece) => {
    // Horizontal victory
    if(board[0][0] === piece && board[0][1] === piece && board[0][2] === piece) return 10 * piece
    if(board[1][0] === piece && board[1][1] === piece && board[1][2] === piece) return 10 * piece
    if(board[2][0] === piece && board[2][1] === piece && board[2][2] === piece) return 10 * piece

    // Vertical victory
    if(board[0][0] === piece && board[1][0] === piece && board[2][0] === piece) return 10 * piece
    if(board[0][1] === piece && board[1][1] === piece && board[2][1] === piece) return 10 * piece
    if(board[0][2] === piece && board[1][2] === piece && board[2][2] === piece) return 10 * piece

    // Diagoanal victory
    if(board[0][0] === piece && board[1][1] === piece && board[2][2] === piece) return 10 * piece
    if(board[0][2] === piece && board[1][1] === piece && board[2][0] === piece) return 10 * piece

    // Tie
    return 0
}

// my minimax

function newMinimax(board, playerTurn){

}

function minimax(board, depth, alpha, beta, is_maximizing) {
    if (checkWinner(board, -1) === -10) {
        // console.log('computer won')
        // console.log('depth is ', depth)
        return 10 - depth;
    } 
    if (checkWinner(board, 1) === 10) {
        // console.log('player won')
        // console.log('depth is ', depth) 
        return depth - 10;
    }
    if (!board.some(sublist => sublist.includes(0))) {
        return 0;
    }
    // if (checkWinner(board, 1) !== 10 || checkWinner(board, -1) !== -10) {
    //     return 0;
    // }

    // computer score
    if (is_maximizing) {
        let best_score = -Infinity;
        const bestMove = {
            row: -1, 
            column: -1
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === 0) {
                        bestMove.row = i;
                        bestMove.column = j;
                    // console.log(i, j)    
                    board[i][j] = -1;
                    // console.log(board)
                    let score = minimax(board, alpha, beta, depth+1, false);
                    board[i][j] = 0;
                    if (score > best_score) {
                        console.log('computer score is higher ', i, j)
                        console.log(board)
                        bestMove.row = i;
                        bestMove.column = j;
                    }
                    alpha = Math.max(alpha, score);
                    if (beta <= alpha) {
                        bestMove.row = i;
                        bestMove.column = j;
                        break;
                    }
                }
            }
        }
        // console.log(bestMove)
        // console.log(scoreMove)
        // console.log(game)
        // scoreMove = [...game]
        return bestMove;

    // player score
    } else {
        let best_score = Infinity;
        const bestMove = {row: -1, column: -1}
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === 0) {
                    board[i][j] = 1;
                    let score = minimax(board, alpha, beta, depth+1, true);
                    board[i][j] = 0;
                    // if (score < best_score) {
                    //     best_score = score;
                    //     bestMove.column = i;
                    //     bestMove.row = j;
                    // }
                    beta = Math.min(beta, score);
                    // if (beta <= alpha) {
                    //     bestMove.column = i;
                    //     bestMove.row = j;
                    //     break;
                    // }
                }
            }
        }
        // scoreMove = [...game]
        return bestMove;
    }
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