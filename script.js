const gameCanvas = document.getElementById("game-canvas");
const ctx = gameCanvas.getContext("2d");
const start = document.querySelector(".start");
const gameOver = document.querySelector(".game-over");
const scoreSign = document.querySelector(".score");
const topScore = document.querySelector(".top-score-number");
const loseAudio = document.getElementById("lose-audio");
const gameAudio = document.getElementById("game-audio");
const muteAndUnmute = document.querySelector(".button");

let isMuted = true;
let isGameStarted = false;
let fixNumber = 10;
let rectSpaceRL = 10;
let rectSpaceTB = 10;
let speed = 70;
let startOffsetHeight = 82;
const vw = window.innerWidth;

gameCanvas.width = Math.floor(gameCanvas.clientWidth / fixNumber) * fixNumber;
gameCanvas.height = Math.floor(gameCanvas.clientHeight / fixNumber) * fixNumber;

let highScore = localStorage.getItem("snakeHighScore")
  ? parseInt(localStorage.getItem("snakeHighScore"))
  : 0;
topScore.innerHTML = highScore;

ctx.lineWidth = 4;
ctx.fillStyle = "#54e9e4";
ctx.fillRect(
  rectSpaceRL,
  rectSpaceTB,
  gameCanvas.width - 2 * rectSpaceRL,
  gameCanvas.height - 2 * rectSpaceTB
);
ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);

start.style.top = `-${gameCanvas.offsetHeight / 2 + startOffsetHeight / 2}px`;

muteAndUnmute.addEventListener("click", function () {
  isMuted = !isMuted;

  if (isMuted) {
    muteAndUnmute.classList.remove("unmute");
    muteAndUnmute.classList.add("mute");
    muteAndUnmute.textContent = "🔇";
    gameAudio.pause();
  } else {
    muteAndUnmute.classList.remove("mute");
    muteAndUnmute.classList.add("unmute");
    muteAndUnmute.textContent = "🔊";
    if (isGameStarted) {
      gameAudio.currentTime = 0;
      gameAudio.play();
    }
  }
  gameCanvas.focus();
});

start.addEventListener("click", startFunc);

function startFunc() {
  isGameStarted = true;
  ctx.lineWidth = 1;
  let movementX = fixNumber;
  let movementY = 0;
  let score = 0;
  let foodX, foodY;
  const randomNumber = (max, min) =>
    Math.round((Math.random() * (max - min) + min) / 10) * 10;

  gameOver.style.display = "none";
  scoreSign.innerHTML = score;
  gameCanvas.setAttribute("tabindex", "0");
  gameCanvas.focus();

  gameAudio.currentTime = 0;
  if (!isMuted) gameAudio.play();

  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);

  setTimeout(() => {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    start.style.display = "none";
    delay();
  }, 1000);

  function delay() {
    let snake = Array.from({ length: 5 }, (_, i) => ({
      x: gameCanvas.width / 2 - i * fixNumber,
      y: gameCanvas.height / 2,
    }));

    const clearSnake = () => {
      ctx.fillStyle = "pink";
      ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
      ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
    };

    let changingKey = false;
    gameCanvas.addEventListener("keydown", function (event) {
      const key = event.code;
      event.preventDefault();
      if (changingKey) return;
      changingKey = true;

      if (key === "ArrowLeft" && movementX !== +10) {
        movementX = -10;
        movementY = 0;
      }
      if (key === "ArrowRight" && movementX !== -10) {
        movementX = +10;
        movementY = 0;
      }
      if (key === "ArrowUp" && movementY !== +10) {
        movementX = 0;
        movementY = -10;
      }
      if (key === "ArrowDown" && movementY !== -10) {
        movementX = 0;
        movementY = +10;
      }
    });

    let startX,
      startY,
      direction = null;
    gameCanvas.addEventListener("touchstart", function (event) {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      direction = null;
      event.preventDefault();
    });

    gameCanvas.addEventListener("touchmove", function (event) {
      if (direction) return;
      event.preventDefault();

      const dx = event.touches[0].clientX - startX;
      const dy = event.touches[0].clientY - startY;

      if (Math.abs(dx) > 10) direction = dx > 0 ? "right" : "left";
      else if (Math.abs(dy) > 10) direction = dy > 0 ? "down" : "up";

      if (direction === "right" && movementX !== -10) {
        movementX = +10;
        movementY = 0;
      }
      if (direction === "left" && movementX !== +10) {
        movementX = -10;
        movementY = 0;
      }
      if (direction === "down" && movementY !== -10) {
        movementY = +10;
        movementX = 0;
      }
      if (direction === "up" && movementY !== +10) {
        movementY = -10;
        movementX = 0;
      }
    });

    gameCanvas.addEventListener("touchend", () => {
      direction = null;
    });

    const advanceSnake = () => {
      const head = { x: snake[0].x + movementX, y: snake[0].y + movementY };
      if (head.x === foodX && head.y === foodY) {
        score += 10;
        scoreSign.textContent = score;
        createFood();
        topScoreRecord();
      } else {
        snake.pop();
      }
      snake.unshift(head);

      if (vw > 768) {
        if (score > 50) speed = 60;
        if (score > 100) speed = 50;
        if (score > 250) speed = 40;
        if (score > 500) speed = 30;
        if (score > 1000) speed = 20;
        if (score > 2000) speed = 10;
      } else {
        speed = 80;
        if (score > 100) speed = 70;
        if (score > 150) speed = 60;
        if (score > 200) speed = 50;
        if (score > 400) speed = 40;
        if (score > 500) speed = 30;
        if (score > 1000) speed = 20;
      }
    };

    const createFood = () => {
      let valid = false;
      while (!valid) {
        foodX = randomNumber(0, gameCanvas.width - 10);
        foodY = randomNumber(0, gameCanvas.height - 10);
        valid = !snake.some((part) => part.x === foodX && part.y === foodY);
      }
      drawFood();
    };

    const drawFood = () => {
      ctx.lineWidth = 1;
      ctx.fillStyle = "red";
      ctx.strokeStyle = "black";
      ctx.fillRect(foodX, foodY, 10, 10);
      ctx.strokeRect(foodX, foodY, 10, 10);
    };

    const drawSnake = () =>
      snake.forEach((part) => {
        ctx.strokeStyle = "black";
        ctx.fillStyle = "lightgreen";
        ctx.strokeRect(part.x, part.y, 10, 10);
        ctx.fillRect(part.x, part.y, 10, 10);
      });

    const restart = () => {
      ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
      start.style.display = "block";
      speed = 70;
      isGameStarted = true;
      ctx.fillStyle = "#54e9e4";
      ctx.fillRect(
        rectSpaceRL,
        rectSpaceTB,
        gameCanvas.width - 2 * rectSpaceRL,
        gameCanvas.height - 2 * rectSpaceTB
      );
      ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
      gameOver.style.display = "block";

      if (vw > 768) {
        gameOver.style.top = `-${
          gameCanvas.offsetHeight - 0.2 * gameCanvas.offsetHeight
        }px`;
      } else {
        gameOver.style.fontSize = `1.5rem`;
        gameOver.style.right = "-5px";
        gameOver.style.top = `-${
          gameCanvas.offsetHeight + gameOver.offsetHeight
        }px`;
      }
    };

    const topScoreRecord = () => {
      if (score > highScore) {
        highScore = score;
        topScore.textContent = highScore;
        localStorage.setItem("snakeHighScore", highScore);
      }
    };

    const lose = () => {
      if (
        snake[0].x >= gameCanvas.width ||
        snake[0].y >= gameCanvas.height ||
        snake[0].x < 0 ||
        snake[0].y < 0
      )
        return true;

      for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
          return true;
        }
      }
      return false;
    };

    function main() {
      setTimeout(() => {
        if (lose()) {
          isGameStarted = false;
          gameAudio.pause();
          if (!isMuted) {
            loseAudio.currentTime = 0;
            loseAudio.play();
          }
          setTimeout(() => {
            restart();
            start.addEventListener("click", startFunc);
          }, 1000);
          return;
        }

        changingKey = false;
        clearSnake();
        advanceSnake();
        drawSnake();
        drawFood();
        main();
      }, speed);
    }

    main();
  }
}
