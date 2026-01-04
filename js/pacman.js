'use strict'

const PACMAN = '🤩';
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    if (nextCell === WALL) return
    if (nextCell === SUPERFOOD && gPacman.isSuper) return
    if (nextCell === CHERRY) updateScore(10)

if (nextCell === FOOD) {
        updateScore(1)
        gFoodCount--
        if (gFoodCount === 0) {
            gameOver('VICTORY!!!')
            return
        }
    }

    // if (nextCell === FOOD || SUPERFOOD) {
    //     updateScore(1)
    //     if (--gFoodCount === 0) gameOver('VICTORY!!!')
    // }

    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            removeGhost(nextLocation)
            updateScore(1)
        } else {
            renderCell(gPacman.location, '💀')
            gameOver('LOSER!!!')
            return
        }
    }

    if (nextCell === SUPERFOOD) {
        gPacman.isSuper = true
        renderGhosts()
        setTimeout(() => {
            gPacman.isSuper = false
            reviveGhosts()
            renderGhosts()
        }, 5000)
         updateScore(1)
        if (--gFoodCount === 0) gameOver('VICTORY!!!')
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}