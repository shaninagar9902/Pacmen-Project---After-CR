'use strict'

const GHOST = '👻'
// const GHOST = '0'
var gGhosts = []
var gIntervalGhosts = -1
var gRemovedGhosts = []

function createGhosts(board) {
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    if (gIntervalGhosts) clearInterval(gIntervalGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    const ghost = {
        location: {
            i: 3,
            j: 3
        },
        color: getRandomColor(),
        currCellContent: FOOD,
        icon: GHOST,
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}


function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    const moveDiff = getMoveDiff();
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (nextCell === SUPERFOOD) return
    if (nextCell === CHERRY) return
    if (nextCell === PACMAN && gPacman.isSuper) return
    if (nextCell === PACMAN && !gPacman.isSuper) {
        gameOver('LOSER!!!')
        renderCell(gPacman.location, '💀')
        return
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // DOM
    renderCell(ghost.location, ghost.currCellContent)


    ghost.location = nextLocation
    ghost.currCellContent = nextCell

    // model
    gBoard[ghost.location.i][ghost.location.j] = GHOST

    // DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function removeGhost(location) {
    var ghostIdx = -1

    for (var i = 0; i < gGhosts.length; i++) {
        const currGhost = gGhosts[i]
        if (location.i === currGhost.location.i &&
            location.j === currGhost.location.j) {
            ghostIdx = i
            break
        }
    }
    if (ghostIdx === -1) return
    var removedGhosts = gGhosts.splice(ghostIdx, 1)
    gRemovedGhosts.push(removedGhosts[0])
    if (removedGhosts[0].currCellContent === FOOD) {
        updateScore(1)
        if (!gFoodCount--) {
            gameOver('VICTORY!!!')
        }
    }

    // add in case ghost was on food to decrise food--
    // console.log('removedGhost', gRemovedGhosts)
}

function renderGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const currGhost = gGhosts[i]
        renderCell(currGhost.location, getGhostHTML(currGhost))
    }
}

function reviveGhosts() {
    gGhosts.push(...gRemovedGhosts)
    gRemovedGhosts = []
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    const icon = (gPacman.isSuper) ? '🦋' : ghost.icon
    const color = (gPacman.isSuper) ? 'blue' : ghost.color

    return `<span style="color: ${color}">${icon}</span>`
}