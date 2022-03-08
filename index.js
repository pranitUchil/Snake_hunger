
// Gae constants & variables
let inputDir = { x: 0, y: 0 };

let foodsound = new Audio('eatSound.mp3')
let gameOverSound = new Audio('dead.audio.mp3')
let musicSound = new Audio('bg.audio.mp3')
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {  x: 13, y: 15}
]
let food = {
    x: 6, y: 7
}

// Gam function

function main(ctime) {
    window.requestAnimationFrame(main)
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake) {
   for(let i = 1; i < snakeArr.length; i++){
       if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
           return true;
       }
    }
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
}
function gameEngine() {
    // Part 1: Updating the snake array
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again! ")
        snakeArr = [{x:13,y:14}];
       
        score = 0;

    }
    // if you have eaten the food increment the score and regenerate the food

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodsound.play();
        score +=1;

        if(score>hiscoreval){
            hiscoreval = score
            localStorage.setItem('hiscore',JSON.stringify(hiscoreval))
    hiscoreBox.innerHTML ="HiScore:" + hiscoreval;

        }

        scorebox.innerText = "Score"+score
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let a =2;
        let b = 16;
        food= {x: Math.round(a + (b-a)* Math.random()),y: Math.round(a + (b-a)*Math.random())}
    }
    // Moving th snake
    for (let i = snakeArr.length - 2; i>=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
        
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // Part 2: Display the snake and food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        sankeElement = document.createElement('div');
        sankeElement.style.gridRowStart = e.y;
        sankeElement.style.gridColumnStart = e.x;
        if (index === 0) {

            sankeElement.classList.add('head');
        }
        else {

            sankeElement.classList.add('snake');
        }
        board.appendChild(sankeElement);
    });
    // Display the snake


    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}

// main logic starts here
let hiscore = localStorage.getItem('hiscore');
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem('hiscore',JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML ="HiScore:" + hiscore;
}


window.requestAnimationFrame(main)
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});