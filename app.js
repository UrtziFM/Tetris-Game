document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    const width = 10
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-pause')
    let squares = Array.from(document.querySelectorAll('.grid div'))

    console.log(squares)

    // The Tetrominoes
    const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
    ]
    
    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
        ]

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
        ]

    const oTetromino = [
        [0, 1, width, width+1 ],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
        ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
        ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let currentPosition = 4
    let currentRotation = 0

    // randomly select a Tetromino and its first rotation
    let random = Math.floor(Math.random()*theTetrominoes.length)
    let current = theTetrominoes[random][0]

    // drawn the tetromino
    function drawn(){
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    // undrawn the tetromino
    function undrawn(){
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }
    
    drawn()
})