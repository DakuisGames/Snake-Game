let blocksize = 20;
let total_row = 20;
let total_col = 20;
let board;
let context;

let snakeX = blocksize * 5;
let snakeY = blocksize * 5;

let speedX = 0;
let speedY = 0;

let SnakeBody = [];

let foodX;
let foodY;

let gameOver = false;

window.onload = function () {
    board = document.getElementById("board");
    board.height = total_row * blocksize;
    board.width = total_col * blocksize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10);
}

function update() {
    if(gameOver) {
        document.getElementById("game-over").style.display = "block";
        return;
    }

    snakeX += speedX * blocksize;
    snakeY += speedY * blocksize;
 

    if(snakeX < 0 || snakeX >= total_col * blocksize || snakeY < 0 || snakeY >= total_row * blocksize) {
        gameOver = true;
    }

    for (let i = 0; i < SnakeBody.length; i++) {
        if (snakeX === SnakeBody[i][0] && snakeY == SnakeBody[i][1]) {
            gameOver = true;
        }
    }

    if(snakeX === foodX && snakeY == foodY) {
        SnakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = SnakeBody.length - 1; i > 0; i--) {
        SnakeBody[i] = SnakeBody[i - 1];
    }
    if (SnakeBody.length) {
        SnakeBody[0] = [snakeX, snakeY];
    }

    draw();
}

function draw() {
    context.fillStyle = "#34495e";
    context.fillRect(0, 0, board.width, board.height);

    drawFood(foodX, foodY);
    drawSnake();
}

function drawSnake() {
    context.fillStyle = "#2ecc71";
    for (let i = 0; i < SnakeBody.length; i++) {
        context.fillRect(SnakeBody[i][0], SnakeBody[i][1], blocksize, blocksize);
    }

    context.fillStyle = "#2ecc71";
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
}

function drawFood(x,y) {
    context.beginPath();
    context.arc(x + blocksize / 2, y + blocksize / 2, blocksize / 2, 0, Math.PI * 2);
    context.fillStyle = "#e67e22";
    context.fill();
    context.closePath();
}

function changeDirection(e) {
    if(e.code === "ArrowUp" && speedY !==1) {
        speedX = 0;
        speedY = -1;
    }
    else if (e.code === "ArrowDown" && speedY !== -1) {
        speedX = 0;
        speedY = 1;
    }
    else if (e.code === "ArrowLeft" && speedX !== -1) {
        speedX = -1;
        speedY = 0;
    }
    else if(e.code === "ArrowRight" && speedX !== -1){
        speedX = 1;
        speedY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * total_col) * blocksize;
    foodY = Math.floor(Math.random() * total_row) * blocksize;

    for (let i = 0; i < SnakeBody.length; i++) {
        if (foodX === SnakeBody[i][0] && foodY === SnakeBody[i][1]) {
            placeFood();
        }
    }
}