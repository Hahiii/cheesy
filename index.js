const playground = document.querySelector('.playground');
const player = document.querySelector('.player');
console.log(playground);
console.log(player);
document.addEventListener("keydown", movePlayer, false);

let playerSize = player.offsetWidth;
let movedHorizontal = 0;
let movedVertical = 0;


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
    if (movedVertical < Math.floor(window.innerHeight - playerSize)) {
        movedVertical += playerSize;
        player.style.top = `${movedVertical}px`
        return;
    }
    return;
}
