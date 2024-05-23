<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flappy Bird Game with Graphics</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
</head>
<body>
</body>
</html>
sketch.js:
let bird;
let gravity = 0.6;
let jump = -10;

let obstacles = [];
let obstacleWidth = 50;
let obstacleGap = 150;
let obstacleSpeed = 2;
let lastObstacleX = 0;
let score = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    bird = { x: 100, y: height/2, size: 20 };
}

function draw() {
    background(135, 206, 235);

    // Draw bird
    fill(255, 215, 0);
    ellipse(bird.x, bird.y, bird.size);

    // Apply gravity to bird
    bird.y += gravity;

    // Generate obstacles
    if (lastObstacleX <= width - obstacleGap * 2) {
        let obstacleHeight = random(height - 200) + 100;
        obstacles.push({ x: lastObstacleX + obstacleGap, y: 0, width: obstacleWidth, height: obstacleHeight });
        obstacles.push({ x: lastObstacleX + obstacleGap, y: obstacleHeight + obstacleGap, width: obstacleWidth, height: height - obstacleHeight - obstacleGap });
        lastObstacleX += obstacleGap * 2;
    }

    // Move obstacles
    for (let obstacle of obstacles) {
        obstacle.x -= obstacleSpeed;

        // Check collision
        if (bird.x < obstacle.x + obstacle.width && bird.x + bird.size > obstacle.x &&
        bird.y < obstacle.y + obstacle.height && bird.y + bird.size > obstacle.y) {
            resetGame();
        }

        // Score calculation
        if (bird.x > obstacle.x + obstacle.width && !obstacle.passed) {
            score++;
            obstacle.passed = true;
        }

        // Draw obstacles
        fill(0, 128, 0);
        rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }

    // Remove passed obstacles
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);

    // Draw score
    fill(0);
    textSize(24);
    text('Score: ' + score, 20, 30);
}

function keyPressed() {
    if (keyCode === 32) {
        bird.y += jump;
    }
}

function resetGame() {
    bird = { x: 100, y: height/2, size: 20 };
    obstacles = [];
    lastObstacleX = 0;
    score = 0;
}
