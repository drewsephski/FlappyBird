<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flappy Bird Game</title>
<style>
    body {
        margin: 0;
        overflow: hidden;
    }
    canvas {
        display: block;
        background-color: skyblue;
    }
</style>
</head>
<body>

<canvas id="gameCanvas"></canvas>

<script>
let canvas, ctx;
let bird, gravity, jump;

let obstacles = [];
let obstacleWidth = 50;
let obstacleGap = 150;
let obstacleSpeed = 2;
let lastObstacleX = 0;
let score = 0;

function setup() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    bird = { x: 100, y: canvas.height/2, size: 20 };
    gravity = 0.6;
    jump = -10;

    document.addEventListener('keydown', () => {
        bird.y += jump;
    });

    setInterval(gameLoop, 1000/60);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bird
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.size, 0, Math.PI * 2);
    ctx.fill();

    // Apply gravity to bird
    bird.y += gravity;

    // Generate obstacles
    if(lastObstacleX <= canvas.width - obstacleGap * 2) {
        let obstacleHeight = Math.random() * (canvas.height - 200) + 100;
        obstacles.push({ x: lastObstacleX + obstacleGap, y: 0, width: obstacleWidth, height: obstacleHeight });
        obstacles.push({ x: lastObstacleX + obstacleGap, y: obstacleHeight + obstacleGap, width: obstacleWidth, height: canvas.height - obstacleHeight - obstacleGap });
        lastObstacleX += obstacleGap * 2;
    }

    // Move obstacles
    for(let obstacle of obstacles) {
        obstacle.x -= obstacleSpeed;

        // Check collision
        if(bird.x < obstacle.x + obstacle.width && bird.x + bird.size > obstacle.x &&
           bird.y < obstacle.y + obstacle.height && bird.y + bird.size > obstacle.y) {
            resetGame();
        }

        // Score calculation
        if(bird.x > obstacle.x + obstacle.width && !obstacle.passed) {
            score++;
            obstacle.passed = true;
        }

        // Draw obstacles
        ctx.fillStyle = 'green';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }

    // Remove passed obstacles
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);

    // Draw score
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 20, 50);
}

function resetGame() {
    bird = { x: 100, y: canvas.height/2, size: 20 };
    obstacles = [];
    lastObstacleX = 0;
    score = 0;
}

setup();
</script>
</body>
</html>
