"use strict";

const game = (() => {
  const playerScore = document.querySelector("#player-score");
  const opponentScore = document.querySelector("#opponent-score");
  const opponent = document.querySelector("#opponent");
  const button = document.querySelector("#restart");
  const border = document.querySelector(".border");
  const scoreboard = document.querySelector(".scoreboard");
  const boxes = document.querySelectorAll("[box-index]");

  let playerTurn = true;
  let playerPoints = 0;
  let opponentPoints = 0;
  const SIDE_X = "X";
  const SIDE_O = "O";
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (e) => {
    const box = e.target;
    const currentTurn = playerTurn ? SIDE_X : SIDE_O;
    addTurn(box, currentTurn);
    if (checkWin(currentTurn)) {
      endRound(false, currentTurn);
      endGame(currentTurn);
    } else if (isDraw()) endRound(true);
    else swapTurn();

    //if opponent is AI, makes turn
    if (opponent.textContent == "AI") {
      if (button.classList.contains("active")) return;
      else {
        const currentTurn = playerTurn ? SIDE_X : SIDE_O;
        addTurn(ai.bestChoice(), currentTurn);
        if (checkWin(currentTurn)) {
          endRound(false, currentTurn);
          endGame(currentTurn);
        } else if (isDraw()) endRound(true);
        else swapTurn();
      }
    }
  };

  const addTurn = (box, currentTurn) => {
    box.textContent = currentTurn;
    box.classList.add(currentTurn);
    box.classList.add("disabled");
  };

  const swapTurn = () => {
    playerTurn = !playerTurn;
    const currentTurn = playerTurn ? SIDE_X : SIDE_O;
    display.msg(currentTurn, "turn!");
  };

  const checkWin = (currentTurn) => {
    return WINNING_COMBINATIONS.some((combination) => {
      return combination.every((i) => {
        return boxes[i].classList.contains(currentTurn);
      });
    });
  };

  const isDraw = () => {
    return [...boxes].every((box) => {
      return box.classList.contains(SIDE_X) || box.classList.contains(SIDE_O);
    });
  };

  const endRound = (draw, currentTurn) => {
    boxes.forEach((box) => box.classList.add("disabled"));
    button.disabled = false;
    button.innerHTML = "Next Round";
    button.classList.add("active");
    if (draw == true) {
      display.msg("", "Draw!");
    } else {
      border.classList.add(currentTurn);
      scoreboard.classList.add(currentTurn);
      display.msg(currentTurn, "won the round!");
      if (currentTurn == "X") {
        playerPoints++;
        playerScore.textContent = `${playerPoints}`;
      } else {
        opponentPoints++;
        opponentScore.textContent = `${opponentPoints}`;
      }
    }
  };

  const endGame = (currentTurn) => {
    if (playerPoints == 3 || opponentPoints == 3) {
      display.msg(currentTurn, "has won!!");
      button.innerHTML = "Restart";
    } else return;
  };

  const clear = () => {
    playerTurn = true;
    boxes.forEach((box) => {
      box.classList.remove(SIDE_X);
      box.classList.remove(SIDE_O);
      box.classList.remove("disabled");
      box.textContent = "";
      box.removeEventListener("click", handleClick);
      box.addEventListener("click", handleClick, { once: true });
    });
    if (playerPoints == 3 || opponentPoints == 3) {
      clearScore();
      button.innerHTML = "Next Round";
    }
    display.msg("X", "turn!");
    button.classList.remove("active");
    border.classList.remove(SIDE_O);
    border.classList.remove(SIDE_X);
    scoreboard.classList.remove(SIDE_O);
    scoreboard.classList.remove(SIDE_X);
  };

  const clearScore = () => {
    playerPoints = 0;
    opponentPoints = 0;
    playerScore.textContent = `0`;
    opponentScore.textContent = `0`;
  };

  boxes.forEach((box) =>
    box.addEventListener("click", handleClick, { once: true })
  );

  return { clear, clearScore };
})();

const gameSetting = (() => {
  const buttonAIMode = document.querySelector("#ai-mode");
  const buttonFriendMode = document.querySelector("#friend-mode");
  const buttonX = document.querySelector("#X");
  const buttonO = document.querySelector("#O");
  buttonAIMode.onclick = () => setMode("ai-mode");
  buttonFriendMode.onclick = () => setMode("friend-mode");
  buttonX.onclick = () => setSide("X");
  buttonO.onclick = () => setSide("O");

  const setMode = (mode) => {
    if (mode == "ai-mode") {
      document.querySelector("#opponent").textContent = "AI";
      display.screen("game");
      setSide("X");
    } else {
      document.querySelector("#opponent").textContent = "Friend";
      display.screen("select-side");
    }
  };

  const setSide = (side) => {
    display.sides(side);
    display.screen("game");
  };

  return { setMode, setSide };
})();

const display = (() => {
  const sectionMode = document.querySelector(".select-mode");
  const sectionSide = document.querySelector(".select-side");
  const sectionGame = document.querySelector(".game");
  const buttonBack = document.querySelector("#back");
  const buttonMenu = document.querySelector("#menu");
  const restartButton = document.querySelector("#restart");
  const notification = document.querySelector("#message");
  buttonBack.onclick = () => mainmenu();
  buttonMenu.onclick = () => mainmenu();
  restartButton.onclick = () => game.clear();

  const screen = (section) => {
    sectionMode.classList.remove("active");
    sectionSide.classList.remove("active");
    sectionGame.classList.remove("active");
    if (section == "select-mode") sectionMode.classList.add("active");
    else if (section == "select-side") sectionSide.classList.add("active");
    else sectionGame.classList.add("active");
  };

  const sides = (side) => {
    const _playerSide = document.querySelector(".player-side");
    const _opponentSide = document.querySelector(".opponent-side");
    _opponentSide.firstChild.classList.remove("X", "O");
    _playerSide.firstChild.classList.remove("X", "O");
    if (side == "X") {
      _playerSide.firstChild.classList.add("X");
      _opponentSide.firstChild.classList.add("O");
      _playerSide.firstChild.textContent = "X";
      _opponentSide.firstChild.textContent = "O";
    } else {
      _playerSide.firstChild.classList.add("O");
      _opponentSide.firstChild.classList.add("X");
      _playerSide.firstChild.textContent = "O";
      _opponentSide.firstChild.textContent = "X";
    }
  };

  const msg = (currentTurn, message) => {
    notification.textContent = `${currentTurn} ${message}`;
  };

  const mainmenu = () => {
    game.clear();
    game.clearScore();
    display.screen("select-mode");
  };

  return { screen, sides, msg, mainmenu };
})();

const ai = (() => {
  const findEmptyboxes = () => {
    return document.querySelectorAll(".board>div:not(.X):not(.O)");
  };

  const bestChoice = () => {
    return findEmptyboxes()[0];
    // return minimax(findEmptyboxes()).index;
  };

  const minimax = (newBoard, player) => {
    let availableSpots = findEmptyboxes();
  };

  return { bestChoice };
})();
