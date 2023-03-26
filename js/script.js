const gameOverScreen = document.querySelector('.screen')
const gameOverText = document.querySelector('.gameOver > p')
const startScreen = document.querySelector('.start')
const gameContainer = document.querySelector('.container')
const smGame = document.getElementById('3x3')
const mdGame = document.getElementById('4x4')
const lgGame = document.getElementById('5x5')
let squares


let game = []
const innerArr = []
let row, column
let playerTurn = true
let playerChoice = 'X'
let computerChoice = playerChoice === 'X' ? 'O' : 'X';


smGame.addEventListener('click', (evt) => {
  evt.preventDefault()
  game = [[0,0,0], [0,0,0], [0,0,0]]
  for(let i = 0; i < 9; i++){
    let div = document.createElement('div')
    div.classList.add('square')
    gameContainer.appendChild(div)
  }
  startGame()
  startScreen.style.display = 'none'
  gameContainer.classList.add('three')
  gameContainer.style.display = 'grid'
})

mdGame.addEventListener('click', (evt) => {
  evt.preventDefault()
  game = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]
  for(let i = 0; i < 16; i++){
    let div = document.createElement('div')
    div.classList.add('square')
    div.style.height = '150px'
    div.style.width = '150px'
    gameContainer.appendChild(div)
  }
  startGame()
  startScreen.style.display = 'none'
  gameContainer.classList.add('four')
  gameContainer.style.display = 'grid'
})

lgGame.addEventListener('click', (evt) => {
  evt.preventDefault()
  game = [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]]
  for(let i = 0; i < 25; i++){
    let div = document.createElement('div')
    div.classList.add('square')
    div.style.height = '120px'
    div.style.width = '120px'
    gameContainer.appendChild(div)
  }
  startGame()
  startScreen.style.display = 'none'
  gameContainer.classList.add('five')
  gameContainer.style.display = 'grid'
})



function startGame(){
  console.log(game)
  squares = document.querySelectorAll('.square')
  squares.forEach((square, idx) => {
    square.classList.add('free')
    square.addEventListener('click', (evt) => {
        let event = evt.target;
        if(!event.childNodes.length && playerTurn){
            playerMove(idx, event)
        } else {
            setTimeout(() => {
                computer()
            }, 0500);
        }
        console.log(game)
    })
  })
}



const playerMove = (idx, event) => {
  console.log(game)
    let available = checkSquares(game)
    length = game.length

    // converts front end tic tac tow to back end array
    row = Math.floor(idx / length)
    column = ((idx / length) * length) - (row * length)

    // front end choice and array update
    let span = document.createElement('span')
    span.classList.add('choice')
    span.innerHTML = playerChoice
    span.style.color = 'blue'
    game[row][column]--  
    event.appendChild(span)
    // check if someone won
    let winner = checkWinner(game, -1)
    console.log(winner)
    if(winner === -10){
        console.log('you won')
        gameOverScreen.style.display = 'flex';
        gameOverText.innerHTML = "You Won!"
        return
    } else if( winner === 10){
        console.log('Computer won')
        gameOverScreen.style.display = 'flex'
        gameOverText.innerHTML = "Computer Won"
        return
    } else if(!available){
        console.log('tie')
        gameOverScreen.style.display = 'flex'
        gameOverText.innerHTML = "It's a tie"
        return
    }
    
    // computer's turn
    playerTurn = !playerTurn
    setTimeout(() => {
        computer()
    }, 0500);
}

const computer = () => { 
  console.log('computer ', game)
    let available = checkSquares(game)
    length = game.length
    if (available) {
        let flattened = game.flatMap(ele => ele)
        let bestScore = -Infinity
        let bestMove = { row: -1, col: -1 }
        let i, j
    
        // Try all possible moves and pick the one with the best score
        for(let s = 0; s < flattened.length; s++){
          i = Math.floor(s / length)
          j = ((s / length) * length) - (i * length)
          // console.log('computer ', s, i, j)
          if (game[i][j] === 0) {
            game[i][j] = 1
            let score = minimax(game, (length * 2), false)
            game[i][j] = 0
            if (score > bestScore) {
              bestScore = score
              bestMove.row = i
              bestMove.col = j
            }
          }
        }
        row = bestMove.row
        column = bestMove.col
        game[row][column]++
        let span = document.createElement('span')
        span.classList.add('choice')
        span.innerHTML = computerChoice
        squares[((row * length) + column)].appendChild(span)
    }
    let winner = checkWinner(game, 1)
    if( winner === 10){
        console.log('Computer won')
        gameOverScreen.style.display = 'flex'
        gameOverText.innerHTML = "Computer Won"
        return
    } else if(winner === -10){
        console.log('you won')
        gameOverScreen.style.display = 'flex'
        gameOverText.innerHTML = "You Won!"
        return
    } else if(!available){
        console.log('tie')
        gameOverScreen.style.display = 'flex'
        gameOverText.innerHTML = "It's a tie"
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
  
  const flattened = board.flatMap(ele => ele)
  const rows = {}
  const columns = {}
  const diagonals = {
    1: 0,
    2: 0
  }

  let length = board.length
  for (let i = 0; i < board.length; i++) {
    // Add Rows
    rows[i + 1] = flattened[length * i]
    rows[i + 1] += flattened[length * i + 1]
    rows[i + 1] += flattened[length * i + 2]
    if(length > 3) rows[i + 1] += flattened[length * i + 3]
    if(length === 5) rows[i + 1] += flattened[length * i + 4]
    
    //Add Columns
    columns[i + 1] = flattened[i]
    columns[i + 1] += flattened[length + i]
    columns[i + 1] += flattened[length + length + i]
    if(length > 3) columns[i + 1] += flattened[length + length + length + i]
    if(length === 5) columns[i + 1] += flattened[length + length + length + length + i]

    //Add Diagonals
    diagonals[1] += board[i][i]
    diagonals[2] += flattened[(length - 1) * (i + 1)]
    
  }



  // Check if there is a winner
  // Row Win
  for (const value in columns) {
    if(columns[value] === piece * length) return 10 * piece
  }

  //Column Win
  for (const value in rows) {
    if(rows[value] === piece * length) return 10 * piece
  }

  //Diagonal Win
  for (const value in diagonals) {
    if(diagonals[value] === piece * length) return 10 * piece
  }

  return 0

}




// my minimax
const minimax = (board, depth, isMaximizing) => {
  let evaluateBoard = checkSquares(board)
  let length2 = board.length
  let flattened2 = board.flatMap(ele => ele)
  let score = checkWinner(board, 1) || checkWinner(board, -1)
  console.log('game is ', game)
  console.log('board is ', board)
  let i, j
  // Base case: return the score if the game is over or the depth limit has been reached
  if (score !== 0 || depth === 0) {
    return score
  }

  // There are no more moves left to make the score is a tie
  if(!evaluateBoard) return 0

  if (isMaximizing) {
    let bestScore = -Infinity

    // Try all possible moves and pick the one that maximizes the score
    for(let s = 0; s < flattened2.length; s++){
      i = Math.floor(s / length2)
      j = ((s / length2) * length2) - (i * length2)
      if (board[i][j] === 0) {
        board[i][j] = 1
        let score = minimax(board, depth - 1, false)
        board[i][j] = 0
        bestScore = Math.max(score, bestScore)
      }
    }
    return bestScore
  } else {
    let bestScore = Infinity

    // Try all possible moves and pick the one that minimizes the score
    for(let s = 0; s < flattened2.length; s++){
      i = Math.floor(s / length2)
      j = ((s / length2) * length2) - (i * length2)
      if (board[i][j] === 0) {
        board[i][j] = -1
        let score = minimax(board, depth - 1, true)
        board[i][j] = 0
        bestScore = Math.min(score, bestScore)
      }
    }
    return bestScore
  }
}