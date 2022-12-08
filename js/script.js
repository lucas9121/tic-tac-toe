const squares = document.querySelectorAll('.square')

const game = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
let row, column

squares.forEach((square, idx) => {
    if(!square.childNodes.length){
        square.addEventListener('click', (evt) => {
            row = Math.floor(idx / 3)
            column = ((idx / 3) + (idx / 3) + (idx / 3)) - (row * 3)
            let event = evt.target;
            let span = document.createElement('span')
            span.classList.add('choice')
            span.innerHTML = 'X'
            event.appendChild(span)
            game[row][column]++
            console.log(game)
        })
    }
})


console.log(game)