



// Start game on PLAY
document.getElementById("play-button").addEventListener("click", function () {

    const difficulty = parseInt(document.getElementById("level-select").value)
    const bombNum = parseInt(document.getElementById("bomb-number").value)
    let gridSize
    !difficulty ? gridSize = 100 : difficulty === 1 ? gridSize = 81 : gridSize = 49

    generateGrid(gridSize)
    initializeGameLogic(gridSize, bombNum)

})


// Generate grid based on difficulty chosen
function generateGrid(gridSize) {

    const gridWrapper = document.getElementById("grid-wrapper")
    const scoreBoard = document.getElementById("scoreboard")
    scoreBoard.style.display = "flex"
    gridWrapper.className = "grid-wrapper grid-" + gridSize
    gridWrapper.innerHTML = ""

    for (i = 0; i < gridSize; i++) {
        const box = document.createElement("div")
        gridWrapper.append(box)
        box.className = "tile"
        box.innerHTML = i + 1
    }
}


// Initialize game, add bombs, set score to 0
function initializeGameLogic(gridSize, bombNum) {

    const tiles = document.querySelectorAll(".tile")
    const scoreValue = document.getElementById("score-value")
    const tileValue = document.getElementById("tile-value")
    const bombValue = document.getElementById("bomb-value")
    const bombTiles = randArray(1, gridSize, bombNum)

    let score = 0
    let remainingTiles = gridSize - bombNum
    let gameState

    scoreValue.innerHTML = score
    tileValue.innerHTML = remainingTiles
    bombValue.innerHTML = bombNum

    bombTiles.forEach(function (element) {
        tiles[element - 1].classList.add("bomb-tile-debug")
    })

    tiles.forEach(function (tile, i) {
        tile.addEventListener("click", function checkTile() {

            if (!gameState) {

                const tileNum = i + 1

                if (!bombTiles.includes(tileNum)) {

                    if (!tile.classList.contains("selected")) {

                        tile.classList.add("selected")
                        score++
                        remainingTiles--
                        scoreValue.innerHTML = score
                        tileValue.innerHTML = remainingTiles
                        console.log(tileNum, score, remainingTiles)

                        if (remainingTiles === 0) {

                            bombTiles.forEach(function (element) {
                                tiles[element - 1].classList.remove("bomb-tile-debug")
                                tiles[element - 1].classList.add("bomb-tile")
                            })

                            gameState = "win"
                            gameEnd()

                        }
                    }

                } else {

                    bombTiles.forEach(function (element) {
                        tiles[element - 1].classList.remove("bomb-tile-debug")
                        tiles[element - 1].classList.add("bomb-tile")
                    })

                    gameState = "lose"
                    gameEnd()

                }

            }
        })

    })

    function gameEnd() {

        const gameResult = document.createElement("div")
        gameResult.className = "game-result"

        if (gameState === "win") {

            console.log("you win!")
            console.log("Final Score = ", score)
            gameResult.innerHTML = `
            <h1 class = "display-1 fw-semibold">VICTORY</h1>
            <h2 class = "display-4 fw-semibold">All ${score} tiles cleared!</h2>
            `

        } else if (gameState === "lose") {

            console.log("you lose!")
            console.log("Final Score = ", score)
            gameState = "lose"
            gameResult.innerHTML = `
            <h1 class = "display-1 fw-semibold">GAME OVER</h1>
            <h2 class = "display-4 fw-semibold">Final Score: ${score}</h2>
            `
        }

        document.getElementById("grid-wrapper").append(gameResult)




    }

}


// Generate random array
function randArray(rangeMin, rangeMax, length) {
    const randArrayNums = []

    while (randArrayNums.length < length) {
        n = rand(rangeMin, rangeMax)

        if (!randArrayNums.includes(n)) {
            randArrayNums.push(n)
        }
    }

    return randArrayNums
}


// Random number function
function rand(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}