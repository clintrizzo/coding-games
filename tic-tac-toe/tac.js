const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

// game constants
const xSymbol = '×';
const oSymbol = '○';

// game variables
let gameIsLive = true;
let xIsNext = true;


// functions
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin = (letter) => {
    gameIsLive = false;
    if (letter === 'x') {
        statusDiv.innerHTML = `${letterToSymbol(letter)} has won!`;
    } else {
        statusDiv.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
    }
};

const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[1];
    const topMiddle = cellDivs[1].classList[1];
    const topMiddleOne = cellDivs[2].classList[1];
    const topRight = cellDivs[3].classList[1];
    const middleLeft = cellDivs[4].classList[1];
    const middleMiddle = cellDivs[5].classList[1];
    const middleMiddleOne = cellDivs[6].classList[1];
    const middleRight = cellDivs[7].classList[1];
    const middleLeftOne = cellDivs[8].classList[1];
    const middleMiddleTwo = cellDivs[9].classList[1];
    const middleMiddleThree = cellDivs[10].classList[1];
    const middleRightOne = cellDivs[11].classList[1];
    const bottomLeft = cellDivs[12].classList[1];
    const bottomMiddle = cellDivs[13].classList[1];
    const bottomMiddleOne = cellDivs[14].classList[1];
    const bottomRight = cellDivs[15].classList[1];

    // check winner
    if (topLeft && topLeft === topMiddle && topMiddleOne && topLeft === topRight) {
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');
        cellDivs[3].classList.add('won');
    } else if (middleLeft && middleLeft === middleMiddle && middleMiddleOne && middleLeft === middleRight) {
        handleWin(middleLeft);
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
    } else if (middleLeftOne && middleLeftOne === middleMiddleTwo && middleMiddleThree && middleLeftOne === middleRightOne) {
        handleWin(middleLeftOne);
        cellDivs[8].classList.add('won');
        cellDivs[9].classList.add('won');
        cellDivs[10].classList.add('won');
        cellDivs[11].classList.add('won');
    } else if (bottomLeft && bottomLeft === bottomMiddle && bottomMiddleOne && bottomLeft === bottomRight) {
        handleWin(bottomLeft);
        cellDivs[12].classList.add('won');
        cellDivs[13].classList.add('won');
        cellDivs[14].classList.add('won');
        cellDivs[15].classList.add('won');
        //else statements for the across section completed
    } else if (topLeft && topLeft === middleLeft && middleLeftOne && topLeft === bottomLeft) {
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
        cellDivs[12].classList.add('won');
    } else if (topMiddle && topMiddle === middleMiddle && middleMiddleTwo && topMiddle === bottomMiddle) {
        handleWin(topMiddle);
        cellDivs[1].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[9].classList.add('won');
        cellDivs[13].classList.add('won');
    } else if (topMiddleOne && topMiddleOne === middleMiddleOne && middleMiddleThree && topMiddleOne === bottomMiddleOne) {
        handleWin(topMiddleOne);
        cellDivs[2].classList.add('won');
        cellDivs[6].classList.add('won');
        cellDivs[10].classList.add('won');
        cellDivs[14].classList.add('won');
    } else if (topRight && topRight === middleRight && middleRightOne && topRight === bottomRight) {
        handleWin(topRight);
        cellDivs[3].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[11].classList.add('won');
        cellDivs[15].classList.add('won');
        //top to bottom has been completed
    } else if (topLeft && topLeft === middleMiddle && middleMiddleThree && topLeft === bottomRight) {
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[10].classList.add('won');
        cellDivs[15].classList.add('won');
    } else if (topRight && topRight === middleMiddleOne && middleMiddleTwo && topRight === bottomLeft) {
        handleWin(topRight);
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
        cellDivs[9].classList.add('won');
        cellDivs[12].classList.add('won');
    } else if (topLeft && topMiddle && topMiddleOne && topRight && middleLeft && middleMiddle && middleMiddleOne && middleRight && middleLeftOne && middleMiddleTwo && middleMiddleThree && middleRightOne && bottomLeft && bottomMiddle && bottomMiddleOne && bottomRight) {
        gameIsLive = false;
        statusDiv.innerHTML = 'Game is tied!';
    } else {
        xIsNext = !xIsNext;
        if (xIsNext) {
            statusDiv.innerHTML = `${xSymbol} is next`;
        } else {
            statusDiv.innerHTML = `<span>${oSymbol} is next</span>`;
        }
    }
};


// event Handlers
const handleReset = () => {
    xIsNext = true;
    statusDiv.innerHTML = `${xSymbol} is next`;
    for (const cellDiv of cellDivs) {
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }
    gameIsLive = true;
};

const handleCellClick = (e) => {
    const classList = e.target.classList;

    if (!gameIsLive || classList[1] === 'x' || classList[1] === 'o') {
        return;
    }

    if (xIsNext) {
        classList.add('x');
        checkGameStatus();
    } else {
        classList.add('o');
        checkGameStatus();
    }
};


// event listeners
resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellDivs) {
    cellDiv.addEventListener('click', handleCellClick)
}

let i = 45;

function draw() {
    document.documentElement.style.setProperty('--direction', i++ + 'deg');
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);