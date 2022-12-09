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



console.log(game)