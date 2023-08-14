"use strict";

const grid = document.querySelector(".grid");
const cells = [];
const width = 50;
let direction = "left";
let gravity = "up";

for (let i = 0; i < 2500; i++) {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  grid.appendChild(cell);
  cells.push(cell);
}

//#region Targets
const targets = [
  [0, 1, 2, 3, 4, 5],
  [10, 11, 12, 13, 14, 15],
  [20, 21, 22, 23, 24, 25],
  [30, 31, 32, 33, 34, 35],
  [40, 41, 42, 43, 44, 45],
  [152, 153, 154, 155, 156, 157],
  [162, 163, 164, 165, 166, 167],
  [172, 173, 174, 175, 176, 177],
  [182, 183, 184, 185, 186, 187],
  [192, 193, 194, 195, 196, 197],
  [300, 301, 302, 303, 304, 305],
  [310, 311, 312, 313, 314, 315],
  [320, 321, 322, 323, 324, 325],
  [330, 331, 332, 333, 334, 335],
  [340, 341, 342, 343, 344, 345],
];

const drawTargets = function () {
  targets.forEach((array) => {
    array.forEach((index) => cells[index].classList.add("target"));
  });
};
drawTargets();
//#endregion

//#region Paddle
let paddle = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let paddleIndex = 2221;
// cells[2249].style.backgroundColor = "red";

const drawPaddle = function () {
  paddle.forEach((e) => cells[e + paddleIndex].classList.add("player"));
};
const erasePaddle = function () {
  paddle.forEach((e) => cells[e + paddleIndex].classList.remove("player"));
};
drawPaddle();
//#endregion

// Move Player
document.addEventListener("keydown", function (key) {
  switch (key.keyCode) {
    case 65:
      if (paddleIndex % width === 0) {
        paddleIndex += 5;
      }
      erasePaddle();
      paddleIndex -= 5;
      drawPaddle();
      break;
    case 68:
      if ((paddleIndex + 9) % width === 0) {
        paddleIndex -= 5;
      }
      erasePaddle();
      paddleIndex += 5;
      drawPaddle();
      break;
  }
});

//#region Ball Directions
const downLeft = function () {
  eraseBall();
  ballIndex += 49;
  drawBall();
};
const downRight = function () {
  eraseBall();
  ballIndex += 51;
  drawBall();
};
const upRight = function () {
  eraseBall();
  ballIndex -= 49;
  drawBall();
};
const upLeft = function () {
  eraseBall();
  ballIndex -= 51;
  drawBall();
};
//#endregion

//#region Ball info
let ballIndex = 2174;

const drawBall = function () {
  cells[ballIndex].classList.add("ball");
};
const eraseBall = function () {
  cells[ballIndex].classList.remove("ball");
};
drawBall();
//#endregion

let ballMove = function () {
  // Up left
  if (direction === "left" && gravity === "up") {
    upLeft();
    if (ballIndex - 49 < 0 || ballIndex % width === 0) {
      direction = "right";
    }
  }

  // Up Right
  if (direction === "right" && gravity === "up") {
    upRight();
    if (ballIndex - 49 < 0) {
      gravity = "down";
    } else if ((ballIndex + 1) % width === 0) {
      direction = "left";
    }
  }

  // Down Right
  if (direction === "right" && gravity === "down") {
    downRight();
    if ((ballIndex + 51) % width === 0) {
      direction = "left";
      gravity = "down";
    }
  }

  // Down Left
  if (direction === "left" && gravity === "down") {
    downLeft();
    if (ballIndex % width === 0) {
      direction = "right";
      gravity = "down";
    }
  }

  // Hits player
  if (
    cells[ballIndex + width].classList.contains("player") &&
    gravity === "down"
  ) {
    gravity = "up";
  }

  // If ball hits target
  targets.forEach((target) => {
    target.forEach((index) => {
      if (cells[index].classList.contains("ball")) {
        cells[index].classList.remove("target");
        gravity = "down";
        direction === "left" ? "right" : "left ";
      }
    });
  });
};

// Hit space bar to start game
document.addEventListener("keydown", function (key) {
  if (key.keyCode === 32) {
    setInterval(ballMove, 50);
  }
});

console.log(targets);

/*

Trying to figure out how to eliminate the entire target once hit.

*/
