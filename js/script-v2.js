"use strict"


// Initialize Game loop
document.addEventListener("load", gameLoop())


// Game Loop Function
function gameLoop() {

    
    // Variables
    const gridWrapper = document.getElementById("grid-wrapper")
    const playButton = document.getElementById("play-button")
    const scoreBoard = document.getElementById("scoreboard")
    const scoreValue = document.getElementById("score-value")
    const tileValue = document.getElementById("tile-value")
    const bombValue = document.getElementById("bomb-value")


    let gameOver
    let score
    let remainingTiles
    let bombNumber
    let bombTiles


    // Start Game
    playButton.addEventListener("click", () => {

        // Reset Game Values
        gameReset()

        // Generate Grid
        generateGrid(gameDifficulty())

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
        gridWrapper.addEventListener("mousedown", gameStateOnClick)
        gridWrapper.style.pointerEvents = "auto"

        scoreBoard.style.display = "flex"

        for (let i = 0; i < gridSize; i++) {
            let tileNumber = i + 1
            const tile = document.createElement("div")
            gridWrapper.append(tile)
            tile.className = "tile"
            tile.id = tileNumber
        }
    }


    // Tile Check onClick Function
    function bombHitCheck(tile) {

        let bombHit = false

        if (!bombTiles.includes(parseInt(tile.id))) {

            if (!tile.classList.contains("selected")) {

                tile.classList.add("selected")
                score++
                remainingTiles--
                console.log(score, remainingTiles)

                scoreValue.innerHTML = score
                tileValue.innerHTML = remainingTiles
                bombValue.innerHTML = bombNumber

            }

        } else {

            tile.classList.add("bomb-tile")
            bombHit = true
        }

        return bombHit

    }


    // Win Loss Function
    function winLossCheck(bombHit) {
        let gameState = "ongoing"

        if (!bombHit && !remainingTiles) {
            console.log("VICTORY", score)
            gameState = "win"

        } if (bombHit) {
            console.log("DEFEAT", score)
            gameState = "lose"
        }

        return gameState
    }


    // Reveal Bomb Tiles
    function revealBombTiles() {

        const tiles = document.querySelectorAll(".tile")
        tiles.forEach((tile, index) => {

            if (bombTiles.includes(index + 1)) {

                tile.classList.add("bomb-tile")
            }
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


    // Game State on Click
    function gameStateOnClick(event) {

        if (winLossCheck(bombHitCheck(event.target)) !== "ongoing") {

            gameEnd(winLossCheck(bombHitCheck(event.target)))
            revealBombTiles()

            gridWrapper.removeEventListener("mousedown", gameStateOnClick)
            gridWrapper.style.pointerEvents = "none"

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