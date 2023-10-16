
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

function cliccableTiles() {

    const tiles = document.querySelectorAll(".tile")

    tiles.forEach(function (tile, i) {
        tile.addEventListener("click", function () {
            tile.classList.toggle("selected")
            console.log(i + 1)
        })
    })

}

document.getElementById("play-button").addEventListener("click", function () {

    const difficulty = parseInt(document.getElementById("level-select").value)

    let gridSize

    !difficulty ? gridSize = 100 : difficulty === 1 ? gridSize = 81 : gridSize = 49


    generateGrid(gridSize)
    cliccableTiles()

})

