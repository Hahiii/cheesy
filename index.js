const playground = document.querySelector('.playground');
const player = document.querySelector('.player');

document.addEventListener("keydown", movePlayer, false);

let playerSize = player.offsetWidth;
let movedHorizontal = 0;
let movedVertical = 0;
let randomePositionList = [];
let foodCount = 10;
let i = 0;


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
    if (movedHorizontal < Math.floor(window.innerWidth - playerSize)) {
        movedHorizontal += playerSize;
        player.classList.add("right");
        player.style.left = `${movedHorizontal}px`;
        checkFoodPosition();
        return;
    }
    return;
}

function moveDown() {
    if (movedVertical < Math.floor(window.innerHeight - playerSize * 2)) {
        movedVertical += playerSize;
        player.style.top = `${movedVertical}px`;
        checkFoodPosition();
        return;
    }
    return;
}

while (i < foodCount) {
    const food = document.createElement('img');
    food.id = `food-${i}`;
    food.classList.add('food');
    food.alt = 'food';
    food.srcset = './images/cheese.jpg';
    food.style.top = `${randomPosition(Math.floor(window.innerHeight / playerSize))}px`;
    food.style.left = `${randomPosition(Math.floor(window.innerWidth / playerSize))}px`;
    randomePositionList.push({
        top: food.style.top,
        left: food.style.left,
        id: `${food.id}`
    })
    playground.appendChild(food);
    i++;
}

function checkFoodPosition() {
    for (let i = 0; i < randomePositionList.length; i++) {
        if (randomePositionList[i].top === player.style.top &&
            randomePositionList[i].left === player.style.left) {
            eatFood(randomePositionList[i].id);
        }
    }
}

function eatFood(foodId) {
    let clearFood = document.querySelector(`#${foodId}`);
    playground.removeChild(clearFood);
    foodCount = document.querySelectorAll('.food').length;
    if (foodCount === 0) {
        congratulationsYouWon();
        return;
    }
}

function congratulationsYouWon() {
    playground.classList.add('congratulations');
}