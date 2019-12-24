const canvas = document.getElementById('snake');
const context = canvas.getContext('2d');

const ground = new Image();
ground.src = './ground.png';

const foodImage = new Image();
foodImage.src = './food.png';

const eat = new Audio();
eat.src = './eat.mp3';

const dead = new Audio();
dead.src = './dead.mp3';

const cheat = new Audio();
cheat.src = './cheat.mp3';

const box = 32;

let snake = [];
snake[0] = {
	x: 9 * box,
	y: 10 * box
};

let food = {
	x: Math.floor(Math.random() * 17 + 1) * box,
	y: Math.floor(Math.random() * 15 + 3) * box
};

let score = 0;

let currentDirection;
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
	let key = event.keyCode;
	if(key == 37 && currentDirection != 'RIGHT') {
		currentDirection = 'LEFT';
	} else if (key == 38 && currentDirection != 'DOWN') {
		currentDirection = 'UP';
	} else if (key == 39 && currentDirection != 'LEFT') {
		currentDirection = 'RIGHT';
	} else if (key == 40 && currentDirection != 'UP') {
		currentDirection = 'DOWN';
	} else if (key == 84) {
		score = 2006;
		cheat.play();
	}
}

function checkCollision(head, array) {
	for(let i = 0; i < array.length; i++) {
		if(head.x == array[i].x && head.y == array[i].y) {
			return true;
		}
	}
	return false;
}

function draw() {
	context.drawImage(ground, 0, 0);
	for(let i=0; i<snake.length; i++) {
		context.fillStyle = (i == 0) ? 'navy' : 'maroon';
		context.fillRect(snake[i].x, snake[i].y, box, box);
	}
	
	context.drawImage(foodImage, food.x, food.y);
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	if(currentDirection == 'LEFT') { snakeX -= box; } 
	if(currentDirection == 'UP') { snakeY -= box; } 
	if(currentDirection == 'RIGHT') { snakeX += box; } 
	if(currentDirection == 'DOWN') { snakeY += box; } 
	
	if(snakeX == food.x && snakeY == food.y) {
		score++;
		eat.play();
		food = {
			x: Math.floor(Math.random() * 17 + 1) * box,
			y: Math.floor(Math.random() * 15 + 3) * box
		};
	} else {
		snake.pop();
	}
	let newHead = {
		x: snakeX,
		y: snakeY
	}
	
	if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || checkCollision(newHead, snake)) {
		dead.play(); 
		clearInterval(game);
	}
	
	snake.unshift(newHead);
	
	context.fillStyle = 'white'; 
	context.font = '45px Changa one';
	context.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 125);
