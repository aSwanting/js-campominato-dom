



// Start game on PLAY
document.getElementById("play-button").addEventListener("click", function () {

    const difficulty = parseInt(document.getElementById("level-select").value)
    let gridSize
    !difficulty ? gridSize = 100 : difficulty === 1 ? gridSize = 81 : gridSize = 49

    generateGrid(gridSize)
    startGame(gridSize)

})


// Generate grid based on difficulty chosen
function generateGrid(gridSize) {

    const gridWrapper = document.getElementById("grid-wrapper")
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
function startGame(gridSize) {

    const tiles = document.querySelectorAll(".tile")
    const bombTiles = randArray(1, gridSize, 16)
    let score = 0
    let gameState

    bombTiles.forEach(function (element) {
        tiles[element - 1].classList.add("bomb-tile-debug")
    })

    tiles.forEach(function (tile, i) {
        tile.addEventListener("click", function () {

            const tileNum = i + 1

            if (!bombTiles.includes(tileNum)) {

                if (!tile.classList.contains("selected")) {

                    tile.classList.add("selected")
                    score++
                    console.log(tileNum, score)

                    if (score === (gridSize - 16)) {

                        bombTiles.forEach(function (element) {
                            tiles[element - 1].classList.remove("bomb-tile-debug")
                            tiles[element - 1].classList.add("bomb-tile")
                        })
                        
                        console.log("you win!")
                        console.log("Final Score = ", score)
                        gameState = "win"
                    }
                }

            } else {

                bombTiles.forEach(function (element) {
                    tiles[element - 1].classList.remove("bomb-tile-debug")
                    tiles[element - 1].classList.add("bomb-tile")
                })

                console.log("you lose!")
                console.log("Final Score = ", score)
                gameState = "win"

            }
        })
    })



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