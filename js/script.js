var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var totalDucks = 10; // Número total de patos
var ducks = [];
var ducksClicked = 0;

var gameActive = true; 
var generateDucks = true; 



// Clase para los patos
class Duck {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.image = new Image();
        this.image.src = "./assets/images/istockphoto-1146670231-612x612-removebg-preview.png";
        this.speed = Math.random() * 2 + 1;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.clicked = false; 
    }

    // Dibujar los patos
    draw() {
        if (!this.clicked) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    // Que se muevan los patos
    move() {
        this.x += this.speed;
        if (this.x > canvas.width) {
            this.reset();
        }
    }

    // Reiniciar los patos
    reset() {
        this.x = -this.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.speed = Math.random() * 2 + 1;
        this.clicked = false; // Reiniciar el estado del clic al reposicionar
    }
}

// Crear un array de patos
for (let i = 0; i < totalDucks; i++) {
    ducks.push(new Duck());
}

function drawDucks() {
    ducks.forEach((duck) => duck.draw());
}

// Comprobar si hay patos en el canva o no
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameActive) {
        ducks.forEach((duck) => {
            duck.move();
            duck.draw();
        });

        // Verificar si no hay patos restantes
        if (ducks.every((duck) => duck.clicked)) {
            gameActive = false; // Desactivar el juego
            let info = document.getElementById("text__game");
            info.textContent = "¡Has ganado!";
        }

        requestAnimationFrame(gameLoop);
    }
}

// Listener para cada pato y saber si se ha eliminado
canvas.addEventListener("click", function (event) {
    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - canvas.getBoundingClientRect().top;

    ducks.forEach((duck) => {
        if (
            gameActive && 
            !duck.clicked && 
            mouseX >= duck.x &&
            mouseX <= duck.x + duck.width &&
            mouseY >= duck.y &&
            mouseY <= duck.y + duck.height
        ) {
            duck.clicked = true;
            ducksClicked++;
        }
    });
});

gameLoop();