document.addEventListener('DOMContentLoaded', () => {
  const player = document.getElementById('player');
  const obstacle = document.getElementById('obstacle');
  let gameSpeed = 5;
  let gravity = 0.9;
  
  let isJumping = false;
  let isGameOver = false;

  function jump() {
    if (isJumping) return;
    isJumping = true;
    let jumpCount = 0;
    const jumpInterval = setInterval(() => {
      let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
      if (playerBottom >= 200) {
        clearInterval(jumpInterval);
        isJumping = false;
        jumpCount = 0;
      }
      player.style.bottom = (playerBottom + 30) + 'px';
      jumpCount++;
      if (jumpCount >= 5) {
        clearInterval(jumpInterval);
        isJumping = false;
        jumpCount = 0;
      }
    }, 30);
  }

  function gameOver() {
    clearInterval(gameInterval);
    isGameOver = true;
    document.removeEventListener('keyup', handleKeyPress);
  }

  function handleKeyPress(event) {
    if (event.code === 'Space') {
      if (isGameOver) {
        location.reload();
      } else {
        jump();
      }
    }
  }

  document.addEventListener('keyup', handleKeyPress);

  const gameInterval = setInterval(() => {
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
    let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));

    if (isGameOver) {
      gameOver();
    }

    obstacle.style.left = (obstacleLeft - gameSpeed) + 'px';
    player.style.bottom = (playerBottom - gravity) + 'px';

    if (obstacleLeft <= -50) {
      obstacle.style.left = '400px';
      obstaclePosition = Math.random() * 1 + 10 + 40;
      obstacle.style.bottom = obstaclePosition + 'px';
    }

    if (
      (playerBottom <= obstaclePosition + 50) &&
      (playerBottom >= obstaclePosition) &&
      (obstacleLeft >= playerLeft) &&
      (obstacleLeft <= playerLeft + 50)
    ) {
      gameOver();
    }
  }, 20);

function moveObstacles() {
  obstacles.forEach((obstacle) => {
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    let obstacleWidth = parseInt(window.getComputedStyle(obstacle).getPropertyValue('width'));
    let obstacleTop = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));
    obstacle.style.left = (obstacleLeft - gameSpeed) + 'px';

    if (obstacleLeft <= -100) {
      obstacle.style.top = '200px';
      obstacle.style.left = getRandomPosition() + 'px';
    }
    
    let playerRight = playeroffsetLeft + playeroffsetWidth;
    let obstacleRight = obstacleoffsetLeft + obstacleoffsetWidth;

    if (
      (playerRight >= obstacle.offsetLeft && playerRight <= obstacleRight) &&
      (player.offsetTop + player.offsetLeft >= obstacle.offsetTop)
    ) {
      player.style.left = (obstacle.offsetLeft - player.offsetWidth) + 'px';
    }
  });
    if (
      (obstacleLeft >= 200 && obstacleLeft <= 250) &&
      (playerBottom <= obstacleHeight)
    ) {
      gameOver();
    }
  

  if (!isGameOver) {
    requestAnimationFrame(moveObstacles);
  }
}

function getRandomHeight() {
  return Math.floor(Math.random()*350);


}
// Restante do código do jogo...

moveObstacles();



});