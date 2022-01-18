const canvas = document.getElementById("myCanvas");
const scoreContainer = document.getElementById("score");
const ctx = canvas.getContext("2d");
const ballRadius = 10;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = 2;
var paddleHeight = 20;
var paddleWidth = 75;
var paddlex = (canvas.width - paddleWidth)/2;
var bricks = [];
var brickHeight = 20;
var brickWidth = 75;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var numberofRows = 3;
var numberofColumns = 5;
const color = "#FF6C00";


function generateBricks(){
    for (var row=0; row < numberofRows; row++){
        bricks[row] = [];
        for (var col=0; col< numberofColumns; col++){
            bricks[row][col] = {x:row, y:col, status:1}; //If status 1 brick is alive
        }
    }
};
generateBricks();
// console.log(bricks);

function drawAllBricks(){
    for(var row=0; row<numberofRows; row++){
        for(var col=0; col<numberofColumns; col++){
            const brick = bricks[row][col];
            const brickX = col * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = row * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[row][col].x = brickX;
            bricks[row][col].y = brickY;
            if (brick.status) {
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
};

function checkBoundaryCollision(){
    if(x <= ballRadius || x+ballRadius >=canvasWidth) dx = -dx;
    else if(y <= ballRadius) dy = -dy;
    else if(y>=canvasHeight - paddleHeight){
        //Check paddile bounce
        if(x>paddlex && x<paddlex + paddleWidth) dy = -dy;
        else handleGameOver();
    }
};

function handleGameOver(){
    alert(`Game Over!, Your SCORE is ${getScore()}`);
    clearInterval(interval);
    window.location.reload();
}

function collisionDetection(){
    for(var row=0; row<numberofRows; row++){
        for(var col=0; col<numberofColumns; col++){
            const brick = bricks[row][col]
            //Is brick alive
            if(brick.status && 
                x>=brick.x && x<=brick.x + brickWidth &&
                y>=brick.y && y<=brick.y + brickHeight){
                    dy = -dy;
                    brick.status = 0;
                    updateScore();
            }
        }
    }
};

//This will draw all bricks in our canvas
function draw(){ 
    ctx.beginPath();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
    checkBoundaryCollision();
    drawPaddle();
    drawAllBricks();
    collisionDetection();
    x += dx;
    y += dy;
};

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddlex, canvasHeight-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = color; 
    ctx.fill();
    ctx.closePath();
};

function getScore(){
    var score = 0;
    for(var row=0; row<numberofRows; row++){
        for(var col=0; col<numberofColumns; col++){
            const brick = bricks[row][col]
            if(brick.status === 0) score++;
        }
    }
    return score;
};

function updateScore(){
    scoreContainer.textContent = `Score : ${getScore()}`
};

window.onkeydown = function(e){
    console.log(e);
    if(e.key == "Left" || e.key == "ArrowLeft"){
        if (paddlex - 10 >= 0) paddlex = paddlex - 10;
    }else if(e.key == "Right" || e.key == "ArrowRight"){
        if (paddlex + 10 + paddleWidth <= canvasWidth) paddlex = paddlex + 10;
    }
};

const interval = setInterval(draw, 20);