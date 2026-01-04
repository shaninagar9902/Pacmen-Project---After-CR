'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '🌕'
const maxFoodCount = 60

var gGame = {
    score: 0,
    isOn: false
}

var gBoard;
var gFoodCount;

function init() {
    console.log('hello')
    gFoodCount = maxFoodCount
    gGame.isOn = true
    gGame.score = 0

    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    updateScore(0)

    gCherryInterval = setInterval(addCherry, 15000, gBoard)
}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            }

            if (i === 1 && j === 1 || i === 1 && j === SIZE - 2 ||
                j === 1 && i === SIZE - 2 || j === SIZE - 2 && i === SIZE - 2) {
                board[i][j] = SUPERFOOD
            }
        }
    }
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('.score').innerText = gGame.score
}

function gameOver(text) {
    console.log('Game Over')
    gGame.isOn = false
    document.querySelector('.title').innerText = text
    document.querySelector('.modal').classList.remove('hide')
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
}

function playAgain() {
    document.querySelector('.modal').classList.add('hide')
    init()
}