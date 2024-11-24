let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-button");
let turnX = true;
let msg = document.querySelector("#msg");
let newButton = document.querySelector("#new-button");
let msgContainer = document.querySelector(".msg-container");
let isWinner = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnX = true;
  isWinner = false;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "" && !isWinner) {
      if (turnX) {
        box.innerHTML = "X";
        box.classList.add("player1");
        box.classList.remove("player2");
        turnX = false;
      } else {
        box.innerHTML = "O";
        box.classList.add("player2");
        box.classList.remove("player1");
        turnX = true;
      }
      box.disabled = true;

      checkWinner();
      checkDrawGame();
    }
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const showDraw = () => {
  msg.innerText = `It's a Draw! Play again`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;
    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        isWinner = true;
        showWinner(pos1);
        return;
      }
    }
  }
};

const checkDrawGame = () => {
  let allFilled = true;
  for (let box of boxes) {
    if (box.innerText === "") {
      allFilled = false;
      break;
    }
  }

  if (allFilled && !isWinner) {
    showDraw();
  }
};

newButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
