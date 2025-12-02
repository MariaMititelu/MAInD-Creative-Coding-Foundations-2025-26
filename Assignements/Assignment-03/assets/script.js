const firstStep = document.getElementById('first-step')
const leftAvatarSelector = document.getElementById('avatar-left')
const rightAvatarSelector = document.getElementById('avatar-right')
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

const playerAliasLeft = document.getElementById('first-player-alias')
const playerAliasRight = document.getElementById('second-player-alias')

let gameGoing = false

var winSound = new Audio('assets/sound/erwin-smith-shinzou-wo-sasageyo_trim.mp3');

//player information

const firstPlayer = {
    username: "",
    avatar: "",
    points: 0,
    turn: -1 //X player
}

const secondPlayer = {
    username: "",
    avatar: "",
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

    if (firstPlayer.username.trim() == "") {
        alert("First-player username required!")
        return;
    }

    if (secondPlayer.username.trim() == "") {
        alert("Second-player username required!")
        return;
    }

    firstPlayerUsername.innerText = firstPlayer.username;
    secondPlayerUsername.innerText = secondPlayer.username;

    let leftAvatarId = leftAvatarSelector.value
    let rightAvatarId = rightAvatarSelector.value

    fetch('https://api.attackontitanapi.com/characters/' + leftAvatarId + ',' + rightAvatarId)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            firstStep.classList.toggle('hidden', true)
            gameStep.classList.toggle('hidden', false)
            resetScore()
            playerMove.innerText = "move: " + firstPlayer.username
            firstPlayerAvatar.src = res[0].img;
            secondPlayerAvatar.src = res[1].img;
            playerAliasLeft.innerText = res[0].alias[0];
            playerAliasRight.innerText = res[1].alias[1];
            resetTable()
            firstPlayerSymbol.innerText = "❌"
            secondPlayerSymbol.innerText = "⭕"
            gameGoing = true
        })
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
            turn = -1;
            if (firstPlayer.turn == 1) {
                playerMove.innerText = "move: " + secondPlayer.username
            }
            else {
                playerMove.innerText = "move: " + firstPlayer.username
            }
            document.getElementById("cell-" + (row * 3 + column + 1)).innerText = "⭕"
        }
        checkWin()
    }

}

document.addEventListener("keydown", (event) => {
    if (event.key >= "1" && event.key <= "9") {
        const n = Number(event.key)
        let row = Math.trunc((n - 1) / 3);
        let column = (n - 1) % 3;
        move(row, column);
    }
});

function resetGame() {
    firstStep.classList.toggle('hidden', false)
    gameStep.classList.toggle('hidden', true)
    firstUsernameInput.value = ''
    secondUsernameInput.value = ''
}

function resetScore() {
    firstPlayer.points = 0
    secondPlayer.points = 0
    firstPlayerPoints.innerText = 0
    secondPlayerPoints.innerText = 0
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





