document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-pause')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const width = 10
    let nextRandom = 0

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
    
    // move the tetrominoes appear every one second (1000 msec)
    timerId = setInterval(moveDown, 1000)

    // assign functions to keyCodes

    function control(e) {
        if(e.keyCode === 37){
            moveLeft()
        } else if(e.keyCode === 38){
            rotate()
        } else if(e.keyCode === 39){
            moveRight()
        } else if(e.keyCode === 40){
            moveDown()
        }

    }
    document.addEventListener('keyup', control)

    // move down function

    function moveDown() {
        undrawn()
        currentPosition += width
        drawn()
        freeze()
    }

    // freeze function

    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        // start a new tetromino falling
        random = nextRandom
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
        drawn()
        displayShape()
        }
    }

    // move the Tetraminoes left unless it is in the edge or there is a blockage

    function moveLeft() {
        undrawn()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if(!isAtLeftEdge) currentPosition -= 1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition += 1
        }
        drawn()
    }


    // move the Tetraminoes right unless it is in the edge or there is a blockage

    function moveRight() {
        undrawn()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)

        if(!isAtRightEdge) currentPosition += 1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -= 1
        }
        drawn()
    }

    // rotate the tetramino

    function rotate() {
        undrawn()
        currentRotation ++
        if(currentRotation === current.length) {
            currentRotation = 0 // if the current rotation gets 4, make it go back 0 again
        }
        current = theTetrominoes[random][currentRotation]
        drawn()
    }

    //Show up next tetromino in the mini-grid display
    
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0

    //The tetrominoes without rotations

    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], // lTetromino
        [0, displayWidth, displayWidth+1, displayWidth*2+1], // zTetromino
        [1, displayWidth, displayWidth+1, displayWidth+2], // tTetromino
        [0, 1, displayWidth, displayWidth+1 ], // oTetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] // iTetromino
    ]

    // display the shape in the mini-grid display

    function displayShape() {
        // remove any trace of a tetromino from the entire grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })
        upNextTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
        })
    }
})
