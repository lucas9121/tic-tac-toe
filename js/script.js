const squares = document.querySelectorAll('.square')

const game = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
let row, column
let playerTurn = true
let turnCopy
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
    let available = checkSquares(game)
    row = Math.floor(idx / 3)
    column = ((idx / 3) * 3) - (row * 3)
    let span = document.createElement('span')
    span.classList.add('choice')
    span.innerHTML = playerChoice
    span.style.color = 'blue'
    game[row][column]--  
    event.appendChild(span)
    // check if someone won
    let winner = checkWinner(game, -1)
    if(winner === -10){
        console.log('you won')
        document.querySelector('.screen').style.display = 'block'
        return
    } else if( winner === 10){
        console.log('Computer won')
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
    let available = checkSquares(game)
    if (available) {
        let bestScore = -Infinity
        let bestMove = { row: -1, col: -1 }
    
        // Try all possible moves and pick the one with the best score
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (game[i][j] === 0) {
              game[i][j] = 1
              let score = minimax(game, 5, false)
              game[i][j] = 0
              if (score > bestScore) {
                bestScore = score
                bestMove.row = i
                bestMove.col = j
              }
            }
          }
        }
        row = bestMove.row
        column = bestMove.col
        game[row][column]++
        let span = document.createElement('span')
        span.classList.add('choice')
        span.innerHTML = computerChoice
        squares[((row * 3) + column)].appendChild(span)
    }
    let winner = checkWinner(game, 1)
    if( winner === 10){
        console.log('Computer won')
        document.querySelector('.screen').style.display = 'block'
        return
    } else if(winner === -10){
        console.log('you won')
        document.querySelector('.screen').style.display = 'block'
        return
    } else if(!available){
        console.log('tie')
        document.querySelector('.screen').style.display = 'block'
        return
    }
    playerTurn = !playerTurn
}


const checkSquares = (board) => {
  let flattened = board.flatMap(el => el)
    if(flattened.some((el) => el === 0)) return true
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
const minimax = (board, depth, isMaximizing) => {
  let evaluateBoard = checkSquares(board)
    let score = checkWinner(board, 1) || checkWinner(board, -1)
    // Base case: return the score if the game is over or the depth limit has been reached
    if (score !== 0 || depth === 0) {
      return score
    }

    // There are no more moves left to make the score is a tie
    if(!evaluateBoard) return 0
  
    if (isMaximizing) {
      let bestScore = -Infinity
  
      // Try all possible moves and pick the one that maximizes the score
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === 0) {
            board[i][j] = 1
            let score = minimax(board, depth - 1, false)
            board[i][j] = 0
            bestScore = Math.max(score, bestScore)
          }
        }
      }
      return bestScore
    } else {
      let bestScore = Infinity
  
      // Try all possible moves and pick the one that minimizes the score
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === 0) {
            board[i][j] = -1
            let score = minimax(board, depth - 1, true)
            board[i][j] = 0
            bestScore = Math.min(score, bestScore)
          }
        }
      }
  
      return bestScore
    }
}