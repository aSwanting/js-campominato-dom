



// Start game on PLAY
document.getElementById("play-button").addEventListener("click", function () {

    const difficulty = parseInt(document.getElementById("level-select").value)
    let gridSize
    !difficulty ? gridSize = 100 : difficulty === 1 ? gridSize = 81 : gridSize = 49

    generateGrid(gridSize)
    cliccableTiles()
    addBombs(gridSize)

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


// Make tiles cliccable
function cliccableTiles() {
    
    const tiles = document.querySelectorAll(".tile")
    
    tiles.forEach(function (tile, i) {
        tile.addEventListener("click", function () {
            tile.classList.toggle("selected")
            console.log(i + 1)
        })
    })
    
}


// Add bomb tiles to grid
function addBombs(gridSize) {
    
    const tiles = document.querySelectorAll(".tile")
    const bombTiles = randArray(1, gridSize, 16)
    console.log(bombTiles)
    
    bombTiles.forEach(function (element, index) {
        tiles[element - 1].classList.add("bomb-tile")
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