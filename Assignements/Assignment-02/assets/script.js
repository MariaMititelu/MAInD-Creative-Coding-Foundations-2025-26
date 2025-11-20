const firstStep = document.getElementById('first-step')
const avatar01 = document.getElementById('avatar-01')
const avatar02 = document.getElementById('avatar-02')
const avatar03 = document.getElementById('avatar-03')
const avatar11 = document.getElementById('avatar-11')
const avatar12 = document.getElementById('avatar-12')
const avatar13 = document.getElementById('avatar-13')
const firstUsernameInput = document.getElementById('first-username-input')
const secondUsernameInput = document.getElementById('second-username-input')
const startGameButton = document.getElementById('start-game-btn')

const gameStep = document.getElementById('game-step')
const firstPlayerAvatar = document.getElementById('first-player-avatar')
const firstPlayerUsername = document.getElementById('first-player-username')
const firstPlayerSymbol = document.getElementById('first-player-symbol')
const firstPlayerPoints = document.getElementById('first-player-points')

const secondPlayerAvatar = document.getElementById('second-player-avatar')
const secondPlayerUsername = document.getElementById('second-player-username')
const secondPlayerSymbol = document.getElementById('second-player-symbol')
const secondPlayerPoints = document.getElementById('second-player-points')

const playerMove = document.getElementById('player-move')

const cell1 = document.getElementById('cell-1')
const cell2 = document.getElementById('cell-2')
const cell3 = document.getElementById('cell-3')
const cell4 = document.getElementById('cell-4')
const cell5 = document.getElementById('cell-5')
const cell6 = document.getElementById('cell-6')
const cell7 = document.getElementById('cell-7')
const cell8 = document.getElementById('cell-8')
const cell9 = document.getElementById('cell-9')

const restartGameButton = document.getElementById('restart-game')
const restartScoreButton = document.getElementById('restart-score')

const overlay = document.getElementById('overlay')
const dialogContent = document.getElementById('dialog-content')
const continueButton = document.getElementById('continue-btn')

let gameGoing = false

var winSound = new Audio('assets/sound/winner-game-sound-404167.mp3');

//player information

const firstPlayer = {
    username: "",
    avatar: "images/capibara 2.jpg",
    points: 0,
    turn: -1 //X player
}

const secondPlayer = {
    username: "",
    avatar: "images/cat.jpg",
    points: 0,
    turn: 1 //O player
}

let turn = -1;

let table = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]


// first step of the game
function startGame() {
    firstPlayer.username = firstUsernameInput.value;
    secondPlayer.username = secondUsernameInput.value;
    firstPlayerUsername.innerText = firstPlayer.username;
    secondPlayerUsername.innerText = secondPlayer.username;
    firstStep.classList.toggle('hidden', true)
    gameStep.classList.toggle('hidden', false)
    resetScore()
    playerMove.innerText = "move: " + firstPlayer.username
    firstPlayerAvatar.src = firstPlayer.avatar
    secondPlayerAvatar.src = secondPlayer.avatar
    resetTable()
    firstPlayerSymbol.innerText = "❌"
    secondPlayerSymbol.innerText = "⭕"
    gameGoing = true
}

function resetAvatars(side) {
    if (side == 'left') {
        avatar01.classList.toggle('selected', false)
        avatar02.classList.toggle('selected', false)
        avatar03.classList.toggle('selected', false)
    }
    if (side == 'right') {
        avatar11.classList.toggle('selected', false)
        avatar12.classList.toggle('selected', false)
        avatar13.classList.toggle('selected', false)
    }
}

function selectAvatar(side, elementId) {
    resetAvatars(side)
    const element = document.getElementById(elementId)
    if (side == 'left') {
        firstPlayer.avatar = element.src
    }
    if (side == 'right') {
        secondPlayer.avatar = element.src
    }
    element.classList.toggle('selected', true)
}

// second step of the game

function move(row, column) {
    if (table[row][column] == 0 && gameGoing == true) {
        table[row][column] = turn
        if (turn == -1) {
            turn = 1;
            if (firstPlayer.turn == -1) {
                playerMove.innerText = "move: " + secondPlayer.username
            }
            else {
                playerMove.innerText = "move: " + firstPlayer.username
            }
            document.getElementById("cell-" + (row * 3 + column + 1)).innerText = "❌"
        }
        else if (turn == 1) {
            if (firstPlayer.turn == 1) {
                playerMove.innerText = "move: " + secondPlayer.username
            }
            else {
                playerMove.innerText = "move: " + firstPlayer.username
            }
            turn = -1;
            document.getElementById("cell-" + (row * 3 + column + 1)).innerText = "⭕"
        }
        checkWin()
    }

}

document.addEventListener("keydown", (event) => {
  if (event.key >= "0" && event.key <= "9") {
    const n = Number(event.key)
    let row = Math.trunc((n-1)/3);
    let column = (n-1)%3;
    move(row, column);
  }
});

function resetGame() {
    firstStep.classList.toggle('hidden', false)
    gameStep.classList.toggle('hidden', true)
    firstUsernameInput.value = ''
    secondUsernameInput.value = ''
    selectAvatar('left', 'avatar-01')
    selectAvatar('right', 'avatar-11')
}

function resetScore() {
    firstPlayer.points = 0
    secondPlayer.points = 0
    firstPlayerPoints.innerText = 0
    secondPlayerPoints.innerText = 0
}

function continueGame() {
    overlay.classList.toggle('hidden', true)
    resetTable()
    if (firstPlayer.turn == -1) {
        firstPlayer.turn = 1
        secondPlayer.turn = -1
        firstPlayerSymbol.innerText = "⭕"
        secondPlayerSymbol.innerText = "❌"
    }
    else if (firstPlayer.turn == 1) {
        firstPlayer.turn = -1
        secondPlayer.turn = 1
        firstPlayerSymbol.innerText = "❌"
        secondPlayerSymbol.innerText = "⭕"
    }
    if (turn == 1) {
        turn = 1;
        if (firstPlayer.turn == -1) {
            playerMove.innerText = "move: " + secondPlayer.username
        }
        else {
            playerMove.innerText = "move: " + firstPlayer.username
        }
    }
    else if (turn == -1) {
        if (firstPlayer.turn == 1) {
            playerMove.innerText = "move: " + secondPlayer.username
        }
        else {
            playerMove.innerText = "move: " + firstPlayer.username
        }
        turn = -1;
    }
    gameGoing = true
}

function checkWin() {
    let firstRow = table[0][0] + table[0][1] + table[0][2]
    let secondRow = table[1][0] + table[1][1] + table[1][2]
    let thirdRow = table[2][0] + table[2][1] + table[2][2]

    let firstColumn = table[0][0] + table[1][0] + table[2][0]
    let secondColumn = table[0][1] + table[1][1] + table[2][1]
    let thirdColumn = table[0][2] + table[1][2] + table[2][2]

    let firstDiagonal = table[0][0] + table[1][1] + table[2][2]
    let secondDiagonal = table[0][2] + table[1][1] + table[2][0]

    if (
        firstRow == 3 ||
        secondRow == 3 ||
        thirdRow == 3 ||
        firstColumn == 3 ||
        secondColumn == 3 ||
        thirdColumn == 3 ||
        firstDiagonal == 3 ||
        secondDiagonal == 3
    ) {
        if (firstPlayer.turn == 1) {
            openDialog(firstPlayer.username + ' won!')
            firstPlayer.points++
            firstPlayerPoints.innerText = firstPlayer.points
        }
        else {
            openDialog(secondPlayer.username + ' won!')
            secondPlayer.points++
            secondPlayerPoints.innerText = secondPlayer.points
        }
        winSound.play();
    }

    if (
        firstRow == -3 ||
        secondRow == -3 ||
        thirdRow == -3 ||
        firstColumn == -3 ||
        secondColumn == -3 ||
        thirdColumn == -3 ||
        firstDiagonal == -3 ||
        secondDiagonal == -3
    ) {
        if (firstPlayer.turn == -1) {
            openDialog(firstPlayer.username + ' won!')
            firstPlayer.points++
            firstPlayerPoints.innerText = firstPlayer.points
        }
        else {
            openDialog(secondPlayer.username + ' won!')
            secondPlayer.points++
            secondPlayerPoints.innerText = secondPlayer.points
        }
        winSound.play();
    }

    if (
        table[0][0] != 0 &&
        table[0][1] != 0 &&
        table[0][2] != 0 &&
        table[1][0] != 0 &&
        table[1][1] != 0 &&
        table[1][2] != 0 &&
        table[2][0] != 0 &&
        table[2][1] != 0 &&
        table[2][2] != 0
    ) {
        openDialog('tie');
    }
}

// dialog text-box

function openDialog(message) {
    overlay.classList.toggle('hidden', false)
    dialogContent.innerText = message
    gameGoing = false
}

function resetTable() {
    table = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    cell1.innerText = '';
    cell2.innerText = '';
    cell3.innerText = '';
    cell4.innerText = '';
    cell5.innerText = '';
    cell6.innerText = '';
    cell7.innerText = '';
    cell8.innerText = '';
    cell9.innerText = '';
}

