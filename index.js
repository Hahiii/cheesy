const playground = document.querySelector('.playground');
const player = document.querySelector('.player');
const gameOverContainer = document.querySelector('#game-over');
const congratsContainer = document.querySelector('#congrats');
const scoreContainer = document.querySelectorAll('.score');
const timeContainer = document.querySelectorAll('.time');
const blueCheeseTimerContainer = document.querySelector('.blue-cheese-timer');
const buttons = document.querySelectorAll('.reset');
const startTimer = document.querySelector('.start-timer');
const controlContainer = document.querySelector('.control-container');
const points = document.querySelector('.points');

points.innerHTML = 0;

let blueCheese = false;
let blueCheeseArr = [];
let playerSize = player.offsetWidth;
let movedHorizontal = 0;
let movedVertical = 0;
let randomeFoodPositionList = [];
let randomeTrapPositionList = [];
let trapCount = 5;
let foodCount = 10;
let count = foodCount + trapCount;
let blueCheeseAmount = 1;
let score = 0; // one cheese has 2 point / a blue cheese has 5 point / food at trap has 10 points
let timer = 60;
let timePassed = 0;
let timeLeft;
let sec = 3
let blueCheeseTimer = sec * blueCheeseAmount;
let blueTimerInterval;
let combo = [];
let possiblePositionVertical = randomPosition(Math.floor((playground.clientHeight - playerSize) / playerSize));
let possiblePositionHorizontal = randomPosition(Math.floor((playground.clientWidth - playerSize) / playerSize));

startTimer.innerHTML = timer;


if (playground.clientWidth <= 800) {
    controlContainer.addEventListener('click', moveMouseByControl, true);
} // check is the screen is smaller then 800 so to add control buttons for small screens
// to be updated


for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", startNewGame, false);
}

document.addEventListener("keydown", moveMouseByKeys, true);


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
    return randomePositionArr;
}



for (let y = 0; y < possiblePositionVertical.length; y++) {
    for (let x = 0; x < possiblePositionHorizontal.length; x++) {
        combo.push({
            y: possiblePositionVertical[y],
            x: possiblePositionHorizontal[x]
        })
    }

}

function moveMouseByKeys(e) {
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

function moveMouseByControl(event) {
    player.classList = ""
    player.classList.add("player");
    let button = event.target.closest('button');
    switch (button.dataset.move) {
        case 'top':
            moveTop();
            break;
        case 'right':
            moveRight();
            break;
        case 'button':
            moveDown();
            break;
        case 'left':
            moveLeft();
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
        checkPosition();
        return;
    }
    return;
}

function moveTop() {
    if (player.style.top > "0px") {
        movedVertical -= playerSize;
        player.classList.add("top");
        player.style.top = `${movedVertical}px`;
        checkPosition();
        return;
    }
    return;
}

function moveRight() {
    if (movedHorizontal < Math.floor(playground.clientWidth - (playerSize * 2))) {
        console.log(Math.floor(playground.clientWidth - (playerSize * 2)));

        movedHorizontal += playerSize;
        player.classList.add("right");
        player.style.left = `${movedHorizontal}px`;
        checkPosition();
        return;
    }
    return;
}

function moveDown() {
    if (movedVertical < Math.floor(playground.clientHeight - (playerSize * 2))) {
        movedVertical += playerSize;
        player.style.top = `${movedVertical}px`;
        checkPosition();
        return;
    }
    return;
}

function setFood(src, count, sort, id, start) {
    let i = start;
    let food = "";
    while (i < count) {
        let position = combo[Math.floor(Math.random() * combo.length)];
        if (i < 10) {
            food = document.createElement('img');
            food.id = id ? `food-${id + i}` : `food-${i}`;
            id ? food.classList.add('blue-food') : food.classList.add('food');
            food.alt = 'food';
            food.srcset = src;
            food.style.top = `${position.y}px`;
            food.style.left = `${position.x}px`;

            randomeFoodPositionList.push({
                top: food.style.top,
                left: food.style.left,
                id: `${food.id}`,
                sort: sort,
            });

            playground.appendChild(food);
        } else {
            setTrap(i, position, "trap");
        }

        combo = combo.filter((obj) => {
            return combo.indexOf(obj) !== combo.indexOf(position);
        })
        i++;
    }
    if (id) {
        blueCheeseTimerContainer.innerHTML = blueCheeseTimer;
        blueCheeseArr.push({
            id: `${food.id}`,
            sort: sort
        })
    }
}

function setTrap(i, position, sort) {
    const trap = document.createElement('img');
    trap.id = `trap-${i}`;
    trap.classList.add('trap');
    trap.alt = 'trap';
    trap.srcset = './images/trap.png';
    trap.style.top = `${position.y}px`;
    trap.style.left = `${position.x}px`;

    randomeFoodPositionList.push({
        id: `${trap.id}`,
        top: trap.style.top,
        left: trap.style.left,
        sort: sort
    });

    playground.appendChild(trap);
}

function addBlueCheese() {
    // setFood('./images/bad-cheese.png', blueCheeseAmount, "blue", count + 1, 0);
    setFood('./images/blue-cheese2.png', blueCheeseAmount, "blue", count + 1, 0);
    blueCheese = true;
}




// checks and resets

function checkPosition() {
    for (let i = 0; i < randomeFoodPositionList.length; i++) {
        if (randomeFoodPositionList[i].top === player.style.top &&
            randomeFoodPositionList[i].left === player.style.left) {

            if (randomeFoodPositionList[i].sort === "trap") {
                gameOver();
                return;
            }
            if (randomeFoodPositionList[i].sort === "blue") {
                eatFood(randomeFoodPositionList[i].id, 5);
                resetBlueCheeseInput()
                cleanPosition(i);

            } else {
                eatFood(randomeFoodPositionList[i].id, 2);
                cleanPosition(i);
            }
        }
    }
}

function cleanPosition(i, blue) {
    if (blue) {
        randomeFoodPositionList.pop()
        return;
    }
    randomeFoodPositionList = randomeFoodPositionList.filter((position) => {
        if (randomeFoodPositionList[i].id !== position.id) {
            return position
        }
    });
}

function eatFood(foodId, foodScore) {
    score += foodScore
    let clearFood = document.querySelector(`#${foodId}`);
    playground.removeChild(clearFood);
    foodCount = document.querySelectorAll('.food').length;
    points.innerHTML = score;
    if (foodCount === 0) {
        congratulationsYouWon();
        return;
    }
}

function congratulationsYouWon() {
    congratsContainer.classList.remove('display');
    scoreContainer[1].innerHTML = score;
    timeContainer[1].innerHTML = ` ${timePassed} sec`
    removeEventListener();
}

function gameOver() {
    player.classList.add('traped-mouse')
    gameOverContainer.classList.remove('display')
    scoreContainer[0].innerHTML = score;
    timeContainer[0].innerHTML = ` ${timePassed} sec`
    removeEventListener();
}

function removeEventListener() {
    document.removeEventListener("keydown", moveMouseByKeys, true);
    controlContainer.removeEventListener('click', moveMouseByControl, true);
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
    if (timer % 2 === 0) {
        if (blueCheeseArr.length <= 0) {
            addBlueCheese()
            return;
        }
    }
}

function checkBlueCheese() {
    if (blueCheese && blueCheeseTimer > 0) {
        blueCheeseTimerContainer.innerHTML = blueCheeseTimer;
        blueCheeseTimer--;
        return;
    }

    if (blueCheeseTimer === 0 && blueCheese) {
        for (let i = 0; i < blueCheeseArr.length; i++) {
            eatFood(blueCheeseArr[i].id, 0);
            cleanPosition(0, true);
            resetBlueCheeseInput();
        }
    }
}

function resetBlueCheeseInput() {
    blueCheeseTimerContainer.innerHTML = "";
    blueCheeseArr = [];
    blueCheeseTimer = sec * blueCheeseAmount;
    blueCheese = false;
}


timeLeft = setInterval(() => {
    timer--;
    checkTimer();
    if (blueCheese) {
        checkBlueCheese()
    }
    return timePassed++
}, 1000);



setFood('./images/cheese.jpg', count, "food", 0, 0);