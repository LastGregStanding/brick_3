"use strict";

const grid = document.querySelector(".grid");
const cells = [];
const width = 50;

for (let i = 0; i < 2500; i++) {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  grid.appendChild(cell);
  cells.push(cell);
}

let paddle = [0, 1, 2, 3, 4, 5, 6, 7];
let paddleIndex = 2221;

const drawPaddle = function () {
  paddle.forEach((e) => cells[e + paddleIndex].classList.add("player"));
};
const erasePaddle = function () {
  paddle.forEach((e) => cells[e + paddleIndex].classList.remove("player"));
};

drawPaddle();

// Move Player
document.addEventListener("keydown", function (key) {
  switch (key.keyCode) {
    case 65:
      if (paddleIndex % width === 0) {
        paddleIndex++;
      }
      erasePaddle();
      paddleIndex--;
      drawPaddle();
      break;
    case 68:
      if (paddleIndex % (width + 6) === 2) {
        paddleIndex--;
      }
      erasePaddle();
      paddleIndex++;
      drawPaddle();
      break;
  }
});

//
