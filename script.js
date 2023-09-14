"use strict";
// if one copy, use module. else use a factory function

const display = (() => {
  const sectionMode = document.querySelector(".select-mode");
  const sectionSide = document.querySelector(".select-side");
  const sectionGame = document.querySelector(".game");

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

  return { screen, sides };
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
    const _mode = mode;
    if (_mode == "ai-mode") {
      game.playerTwo("AI");
      document.querySelector("#opponent").textContent = "AI";
    } else {
      game.playerTwo("Friend");
      document.querySelector("#opponent").textContent = "Friend";
    }
    display.screen("select-side");
    return _mode;
  };

  const setSide = (side) => {
    const _side = side;
    game.playerOne(_side);
    display.sides(_side);
    display.screen("game");
    return _side;
  };

  return { setMode, setSide };
})();

const goBack = (() => {
  const buttonBack = document.querySelector("#back");
  const buttonMenu = document.querySelector("#menu");
  buttonBack.onclick = () => display.screen("select-mode");
  buttonMenu.onclick = () => display.screen("select-mode");
})();

const game = (() => {
  const playerOne = (side) => {
    const _side = side;
    return _side;
  };

  const playerTwo = (type) => {
    const _type = type;
    return _type;
  };
  return { playerOne, playerTwo };
})();
