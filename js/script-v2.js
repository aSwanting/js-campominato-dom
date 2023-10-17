"use strict"


// Initialize Game loop
document.addEventListener("load", gameLoop())


// Game Loop Function
function gameLoop() {


    // Variables
    const gridWrapper = document.getElementById("grid-wrapper")
    const scoreBoard = document.getElementById("scoreboard")
    const scoreValue = document.getElementById("score-value")
    const tileValue = document.getElementById("tile-value")
    const bombValue = document.getElementById("bomb-value")

    let tiles
    let gameOver
    let score
    let remainingTiles
    let bombNumber
    let bombTiles


    // Start Game
    document.getElementById("play-button").addEventListener("click", () => {

        // Reset Game Values
        gameReset()

        // Generate Grid
        generateGrid(gameDifficulty())

    })


    // Debug button
    document.getElementById("debug-button").addEventListener("click", () => {

        document.body.classList.toggle("debug")

    })


    /* ---------------------------------------- GAME LOOP FUNCTIONS ---------------------------------------- */


    // Reset Game Function
    function gameReset() {

        gameOver = false
        score = 0
        bombNumber = parseInt(document.getElementById("bomb-number").value)
        remainingTiles = gameDifficulty() - bombNumber
        bombTiles = randArray(1, gameDifficulty(), bombNumber)

        scoreValue.innerHTML = score
        tileValue.innerHTML = remainingTiles
        bombValue.innerHTML = bombNumber

    }


    // Grid Size Function
    function gameDifficulty() {

        const level = parseInt(document.getElementById("level-select").value)

        let gridSize
        !level ? gridSize = 100 : level === 1 ? gridSize = 81 : gridSize = 49

        return gridSize
    }


    // Grid Generation Function
    function generateGrid(gridSize) {

        gridWrapper.innerHTML = ""
        gridWrapper.className = "grid-wrapper grid-" + gridSize

        scoreBoard.style.display = "flex"

        for (let i = 0; i < gridSize; i++) {
            let tileNumber = i + 1
            const tile = document.createElement("div")
            gridWrapper.append(tile)
            tile.className = "tile"
            tile.id = tileNumber
            tile.addEventListener("mousedown", gameStateOnClick)
        }

        tiles = document.querySelectorAll(".tile")

        tiles.forEach((tile, index) => {

            if (bombTiles.includes(index + 1)) {

                tile.classList.add("bomb-tile-debug")
            }
        })
    }


    // Tile Check onClick Function
    function bombHitCheck(tile) {

        let bombHit = false

        if (!bombTiles.includes(parseInt(tile.id))) {

            tile.removeEventListener("mousedown", gameStateOnClick)
            tile.classList.add("selected")
            tile.style.pointerEvents = "none"
            score++
            remainingTiles--

            scoreValue.innerHTML = score
            tileValue.innerHTML = remainingTiles
            bombValue.innerHTML = bombNumber

            surroundBombsCount(tile)

        } else {

            tile.classList.add("bomb-tile")
            bombHit = true
        }

        return bombHit

    }



    // Count Surrounding Bombs Function
    function surroundBombsCount(tile) {

        const tileNumber = parseInt(tile.id)

        // Square root of grid size, for position calculation
        const gridRoot = Math.sqrt(gameDifficulty())

        const neighbouringTiles = []
        const leftTiles = []
        const rightTiles = []

        let tileTop, tileBottom, tileTopLeft, tileLeft, tileBottomLeft, tileTopRight, tileRight, tileBottomRight
        let surroundingBombCounter = 0

        // Find Tiles in first and last column
        for (let i = 0; i < gridRoot; i++) {

            let leftTile = i * gridRoot
            leftTiles.push(leftTile)

            let rightTile = leftTile + gridRoot - 1
            rightTiles.push(rightTile)

        }

        // Get Tile above and below
        tileTop = tileNumber - gridRoot
        tileBottom = tileNumber + gridRoot

        // If clicked tile is not in first column, get left tile positions
        leftTiles.forEach(element => {
            if (!leftTiles.includes(tileNumber - 1)) {

                tileTopLeft = tileNumber - gridRoot - 1
                tileLeft = tileNumber - 1
                tileBottomLeft = tileNumber + gridRoot - 1
            }
        });

        // If clicked tile is not in last column, get right tile positions
        rightTiles.forEach(element => {
            if (!rightTiles.includes(tileNumber - 1)) {

                tileTopRight = tileNumber - gridRoot + 1
                tileRight = tileNumber + 1
                tileBottomRight = tileNumber + gridRoot + 1
            }
        });

        // Push surrounding tile values to array
        neighbouringTiles.push(tileTop, tileBottom, tileTopLeft, tileLeft, tileBottomLeft, tileTopRight, tileRight, tileBottomRight)


        // Check each surrounding tile for a bomb
        neighbouringTiles.forEach(element => {

            if (element > 0 && element < gameDifficulty() + 1) {

                if (!bombTiles.includes(element)) {

                    // Color for debugging
                    tiles[element - 1].classList.add("surrounding-tiles")

                } else {

                    // Color for debugging
                    tiles[element - 1].classList.add("surrounding-bomb-tiles")

                    surroundingBombCounter++
                }
            }

            tile.innerHTML = surroundingBombCounter

        });
    }



    // Win Loss Function
    function winLossCheck(bombHit) {
        let gameState = "ongoing"

        if (!bombHit && !remainingTiles) {
            gameState = "win"

        } if (bombHit) {
            gameState = "lose"
        }

        return gameState
    }


    // Reveal Bomb Tiles
    function revealBombTiles() {

        tiles.forEach((tile, index) => {

            if (bombTiles.includes(index + 1)) {

                tile.classList.remove("bomb-tile-debug")
                tile.classList.add("bomb-tile")
            }

            tile.removeEventListener("mousedown", gameStateOnClick)
            tile.style.pointerEvents = "none"

        });
    }


    // Game End Function
    function gameEnd(gameState) {

        const gameResult = document.createElement("div")
        gameResult.className = "game-result"

        if (gameState === "win") {
            gameResult.innerHTML = `
        <h1 class = "display-1 fw-semibold">VICTORY</h1>
        <h2 class = "display-4 fw-semibold">All ${score} tiles cleared!</h2>`

        } else if (gameState === "lose") {
            gameResult.innerHTML = `
        <h1 class = "display-1 fw-semibold">GAME OVER</h1>
        <h2 class = "display-4 fw-semibold">Final Score: ${score}</h2>`
        }

        document.getElementById("grid-wrapper").append(gameResult)

    }


    // GameState check onClick Function
    function gameStateOnClick() {

        if (winLossCheck(bombHitCheck(this)) !== "ongoing") {

            gameEnd(winLossCheck(bombHitCheck(this)))
            revealBombTiles()

        }
    }


    // Random Array Function
    function randArray(rangeMin, rangeMax, length) {
        const randArrayOutput = []

        while (randArrayOutput.length < length) {
            let n = rand(rangeMin, rangeMax)

            if (!randArrayOutput.includes(n)) {
                randArrayOutput.push(n)
            }
        }

        return randArrayOutput
    }


    // Random Number Function
    function rand(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

}