'use strict'

const CHERRY = '🍒'
var gCherryInterval
var gCherryLocation = null
var gCherryContent = FOOD

function getEmptyCell(gBoard) {
    if (gCherryLocation) return;
    const emptyLocations = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === FOOD || gBoard[i][j] === EMPTY) {
                emptyLocations.push({ i, j })
            }
        }
    }
    if (!emptyLocations.length) return null
    return emptyLocations[getRandomIntInclusive(0, emptyLocations.length - 1)]
}

function addCherry(){
    var location = getEmptyCell(gBoard)
    if (!location) return
    gCherryContent = gBoard[location.i][location.j]
    gCherryLocation = location
    gBoard[location.i][location.j] = CHERRY
    renderCell(location, CHERRY)
    setTimeout(removeCherry, 3000)
}

function removeCherry() {
    if (!gCherryLocation) return
    if (gBoard[gCherryLocation.i][gCherryLocation.j] !== CHERRY) {
        gCherryLocation = null
        return
    }
    gBoard[gCherryLocation.i][gCherryLocation.j] = gCherryContent
    renderCell(gCherryLocation, gCherryContent)
    gCherryLocation = null
}