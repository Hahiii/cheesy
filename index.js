const playground = document.querySelector('.playground');
const player = document.querySelector('.player');
const gameOverContainer = document.querySelector('#game-over');
const congratsContainer = document.querySelector('#congrats');
const scoreContainer = document.querySelectorAll('.score');
const timeContainer = document.querySelectorAll('.time');
const buttons = document.querySelectorAll('button');
const startTimer = document.querySelector('.start-timer');


for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", startNewGame, false);
}
console.log(playground.clientWidth);

document.addEventListener("keydown", movePlayer, false);

let playerSize = player.offsetWidth;
let movedHorizontal = 0;
let movedVertical = 0;
let randomeFoodPositionList = [];
let randomeTrapPositionList = [];
let foodCount = 10;
let trapCount = 5;
let score = 0; // one cheese has 2 point / a blue cheese has 5 point / food at trap has 10 points
let timer = 60; // one cheese has 2 point / a blue cheese has 5 point / food at trap has 10 points
let timePassed = 0; // one cheese has 2 point / a blue cheese has 5 point / food at trap has 10 points
let timeLeft;

startTimer.innerHTML = timer;



// functionality
function randomPosition(num) {
    let x = 0;
    let possiblePosition = 0;
    let randomePositionArr = [];
    while ((num - 1) > x) {
        possiblePosition += playerSize
        randomePositionArr.push(possiblePosition)
        x++;
    }
    return randomePositionArr[Math.floor(Math.random() * randomePositionArr.length)];
}

function movePlayer(e) {
    player.classList = ""
    player.classList.add("player");
    switch (e.keyCode) {
        case 37:
            moveLeft();
            break;
        case 38:
            moveTop();
            break;
        case 39:
            moveRight();
            break;
        case 40:
            moveDown();
            break;
        default:
            break;
    }
    return;
}

function moveLeft() {
    if (player.style.left > "0px") {
        movedHorizontal -= playerSize;
        player.classList.add("left");
        player.style.left = `${movedHorizontal}px`;
        checkFoodPosition();
        return;
    }
    return;
}

function moveTop() {
    if (player.style.top > "0px") {
        movedVertical -= playerSize;
        player.classList.add("top");
        player.style.top = `${movedVertical}px`;
        checkFoodPosition();
        return;
    }
    return;
}

function moveRight() {
    if (movedHorizontal < Math.floor(playground.clientWidth - (playerSize))) {
        movedHorizontal += playerSize;
        player.classList.add("right");
        player.style.left = `${movedHorizontal}px`;
        checkFoodPosition();
        return;
    }
    return;
}

function moveDown() {
    if (movedVertical < Math.floor(playground.clientHeight - (playerSize * 2))) {
        movedVertical += playerSize;
        player.style.top = `${movedVertical}px`;
        checkFoodPosition();
        return;
    }
    return;
}

function setFood() {
    let i = 0;
    while (i < foodCount) {
        const food = document.createElement('img');
        food.id = `food-${i}`;
        food.classList.add('food');
        food.alt = 'food';
        food.srcset = './images/cheese.jpg';
        food.style.top = `${randomPosition(Math.floor(playground.clientHeight / playerSize))}px`;
        food.style.left = `${randomPosition(Math.floor(playground.clientWidth / playerSize))}px`;
        randomeFoodPositionList.push({
            top: food.style.top,
            left: food.style.left,
            id: `${food.id}`
        })
        playground.appendChild(food);
        i++;
    }
}

function setTrap() {
    let i = 0;
    while (i < trapCount) {
        const trap = document.createElement('img');
        trap.id = `trap-${i}`;
        trap.classList.add('trap');
        trap.alt = 'trap';
        trap.srcset = './images/trap.png';
        trap.style.top = `${randomPosition(Math.floor(playground.clientHeight / playerSize))}px`;
        trap.style.left = `${randomPosition(Math.floor(playground.clientWidth / playerSize))}px`;
        randomeTrapPositionList.push({
            top: trap.style.top,
            left: trap.style.left,
            id: `${trap.id}`
        })
        playground.appendChild(trap);
        i++;
    }
}

function checkFoodPosition() {
    for (let i = 0; i < randomeFoodPositionList.length; i++) {
        if (randomeFoodPositionList[i].top === player.style.top &&
            randomeFoodPositionList[i].left === player.style.left) {
            eatFood(randomeFoodPositionList[i].id);
        }
    }
    for (let i = 0; i < randomeTrapPositionList.length; i++) {
        if (randomeTrapPositionList[i].top === player.style.top &&
            randomeTrapPositionList[i].left === player.style.left) {
            gameOver();
        }
    }
}

function eatFood(foodId) {
    score += 2
    let clearFood = document.querySelector(`#${foodId}`);
    playground.removeChild(clearFood);
    foodCount = document.querySelectorAll('.food').length;
    if (foodCount === 0) {
        congratulationsYouWon();
        return;
    }
}





// chekcs and resets
function congratulationsYouWon() {
    congratsContainer.classList.remove('display');
    scoreContainer[1].innerHTML = score;
    timeContainer[1].innerHTML = ` ${timePassed - 1} sec`
    removeEventListener();
    
}

function gameOver() {
    player.classList.add('traped-mouse')
    gameOverContainer.classList.remove('display')
    scoreContainer[0].innerHTML = score;
    timeContainer[0].innerHTML = ` ${timePassed - 1} sec`
    removeEventListener();
}

function removeEventListener() {
    document.removeEventListener("keydown", movePlayer, false);
    clearInterval(timeLeft);
}

function startNewGame() {
    window.location.reload()
}


function checkTimer() {
    startTimer.innerHTML = timer;
    if (timer === 0) {
        gameOver();
        return;
    }
}

timeLeft = setInterval(() => {
    console.log(timer);
    checkTimer();
    timer--;
    return timePassed++
}, 1000);



setFood();
setTrap();