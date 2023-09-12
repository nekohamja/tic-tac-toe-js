// UI
const buttonAIMode = document.querySelector("#ai-mode");
const buttonFriendMode = document.querySelector("#friend-mode");
const buttonX = document.querySelector("#X");
const buttonO = document.querySelector("#O");
const buttonBack = document.querySelector("#back");
const buttonMenu = document.querySelector("#menu");
const sectionMode = document.querySelector(".select-mode");
const sectionSide = document.querySelector(".select-side");
const sectionGame = document.querySelector(".game");

buttonAIMode.onclick = () => displayMode("select-side");
buttonFriendMode.onclick = () => displayMode("select-side");
buttonX.onclick = () => displayMode("game");
buttonO.onclick = () => displayMode("game");
buttonBack.onclick = () => displayMode("select-mode");
buttonMenu.onclick = () => displayMode("select-mode");

function displayMode(section) {
  sectionMode.classList.remove("active");
  sectionSide.classList.remove("active");
  sectionGame.classList.remove("active");
  if (section == "select-mode") sectionMode.classList.add("active");
  else if (section == "select-side") sectionSide.classList.add("active");
  else sectionGame.classList.add("active");
}
