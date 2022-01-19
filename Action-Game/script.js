score = 0;
audio = new Audio('gameover.mp3');
cross = true;

document.onkeydown = (e) => {
    mario = document.querySelector('.mario');
    console.log(`Key code is ${e.keyCode}`);
    if(e.keyCode === 38){    
        mario.classList.add('animateMario');
        setTimeout(() => {
            mario.classList.remove('animateMario');
        },700);
    }
    if(e.keyCode === 39){
        marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue("left"));
        // console.log(marioX)
        mario.style.left = (marioX + 112)+"px";
    }
    if(e.keyCode === 37){
        marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue("left"));
        mario.style.left = (marioX - 112)+"px";
    }
};

setInterval(() => {
    mario = document.querySelector('.mario');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    //Mario Co-ordinates
    mx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
    my = parseInt(window.getComputedStyle(mario, null).getPropertyValue('top'));
    // console.log("mario",mx,my)

    //Dragon Co-ordinates
    dx = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));
    // console.log("dragon",dx,dy)

    offsetX = Math.abs(mx-dx);
    offsetY = Math.abs(my-dy);
    // console.log("X,Y =>",offsetX,offsetY);

    //Score calculation
    if(offsetX<73 && offsetY<52){
        gameOver.innerHTML = "Game Over - Reload to start over";
        obstacle.classList.remove('obstacleAni');
        audio.play();
        setTimeout(() => {
            audio.pause();
        },1000);
        return updateScore(score);
    }else if(offsetX<145 && cross){
        score +=1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        },1000);
        setTimeout(() => {
            aniDr = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDr = aniDr - 0.1;
            obstacle.style.animationDuration = newDr+'s';
        },500);
    }
}, 10);

function updateScore(score){
    scoreTot.innerHTML = `Your Score: ${score}`;
};