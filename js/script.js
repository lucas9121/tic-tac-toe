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



console.log(game)