const myCanvas = document.getElementById('myCanvas');
const context = myCanvas.getContext('2d');

const SIZE = 20;

const head = { x:0, y:0 };
const body = [];

let food = null;

let dx = 0;
let dy = 0;

let lastAxis;


drawObject(head);

setInterval(main ,150);

function drawObject(obj, color) { context.fillStyle = color; context.fillRect(obj.x,obj.y,SIZE,SIZE); }

function main() {
	update();
	draw();
}

function checkFoodCollision() {

 	for (let i = 0; i < body.length; ++i ) {
		if (position.x == body[i].x && position.y == body[i].y ) {
			return true;
		}

		if (position.x == body[i].x && position.y == body[i].y) {
			return true;
		}

		return false;
}



function getRandomX() { return 20 * parseInt(Math.random() * 30 );}
function getRandomY() { return 20 * parseInt(Math.random() * 33 );}

function update() {

	const gameOvercheck = checkSnakeCollision();
	if (gameOvercheck) {
		gameOver();
		return;
	}

	//movimiento del cuerpo
	let prevX , prevY;
	if (body.length >= 1) {
		prevX = body[body.length-1].x;
		prevY = body[body.length-1].y;
	}else{
		 prevX = head.x;
		 prevY = head.y;
	}

	for (let i=body.length-1; i>=1; --i) {
		body[i].x = body[i-1].x;
		body[i].y = body[i-1].y;
	}
 
 	if (body.length >= 1) {
 	body[0].x = head.x;
	body[0].y = head.y;
 	}
	
	//movimiento de la cabeza
	head.x += dx ;
	head.y += dy ;

	if (dx !== 0) {
		lastAxis = 'X';
	}else if (dy !== 0) {
		lastAxis = 'Y';
	}
	

	//hacer que coma y cresca la serpiente
	if ( food && head.x === food.x && head.y === food.y) { 
		food = null;  
		increaseSnakeSize(prevX, prevY);
	} 

	if (!food) { food = randomFoodPosition(); };

}

function randomFoodPosition() {
	let position; 

	do {

	position = { x: getRandomX(), y: getRandomY() };

	} while(checkFoodCollision(position));

	return position;
}

function checkSnakeCollision() {

	for (let i = 0; i < body.length; ++i ) {
		if (head.x == body[i].x && head.y == body[i].y ) {
			return true;
		}
	}

	const topCollision = head.y < 0;

	const bottomCollision = head.y > 640;

	const rightCollision = head.x > 580;

	const leftCollision = head.x < 0;

	if (topCollision || bottomCollision || rightCollision || leftCollision ) {	
		return true;
	}
	return false;

}


function gameOver() {
	alert('GAME OVERRRRRRRR /Sytem32/delete');
		head.x = 0; head.y = 0;
		dy = 0;     dx = 0;
		body.length = 0;
}

function increaseSnakeSize(prevX, prevY) {
	body.push({
		 x:prevX, y:prevY 
	});
}

function draw() {
	//fondo
	context.fillStyle = 'black';
	context.fillRect(0,0,myCanvas.width,myCanvas.height);
	//cabeza
	drawObject(head,'red');
	//cuerpo
	body.forEach( elem => drawObject(elem,'red'));
	//comida
	drawObject(food,'white');
}


document.addEventListener('keydown', moveSnake);
function moveSnake(event) {
	switch(event.key) { 
		case 'ArrowUp':
			if (lastAxis !== 'Y') {
				dx = 0;
			 	dy = -SIZE;
			}
			break;
		case 'ArrowDown':
			if (lastAxis !== 'Y') {
				dx = 0;
			 	dy = +SIZE;
			}
			break;
		case 'ArrowRight':
			if ( lastAxis !== 'X' ) {
				dx = +SIZE;
			 	dy = 0;
			}
			break;
		case 'ArrowLeft':
			if ( lastAxis !== 'X') {
				dx = -SIZE;
				dy = 0;
			}
			break;
	}
}




