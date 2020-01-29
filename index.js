const playground = document.querySelector('.playground');
const player = document.querySelector('.player');
console.log(playground);
console.log(player);
document.addEventListener("keydown", movePlayer, false);

let playerSize = player.offsetWidth;
let movedHorizontal = 0;
let movedVertical = 0;
let i = 0


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
        player.style.left = `${movedHorizontal}px`;
        return;
    }
    return;
}

function moveTop() {
    if (player.style.top > "0px") {
        movedVertical -= playerSize;
        player.style.top = `${movedVertical}px`
        return;
    }
    return;
}

function moveRight() {
    if (movedHorizontal < Math.floor(window.innerWidth)) {
        movedHorizontal += playerSize;
        player.style.left = `${movedHorizontal}px`;
        return;
    }
    return;
}

function moveDown() {
    if (movedVertical < Math.floor(window.innerHeight - playerSize * 2)) {
        movedVertical += playerSize;
        player.style.top = `${movedVertical}px`
        return;
    }
    return;
}

while (i < 10) {
    const food = document.createElement('div');
    food.classList.add('food');
    food.style.top = `${randomPosition(Math.floor(window.innerHeight / playerSize))}px`;
    food.style.left = `${randomPosition(Math.floor(window.innerWidth / playerSize))}px`;
    playground.appendChild(food)
    i++
}