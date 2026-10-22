import { loadProfile } from "./Serialization.js";

let menu_open = false;

console.log("main.js loaded");

loadProfile();

function toggleMenu() {
    const game_picture = document.getElementById("Game-Picture");
    const menu = document.getElementById("Menu");

    if (menu_open) {
        menu_open = false;
        game_picture.classList.remove("hide");
        menu.classList.add("hide");
    } else {
        menu_open = true;
        game_picture.classList.add("hide");
        menu.classList.remove("hide");
    }
}   

document.getElementById("Menu-button").addEventListener("click", toggleMenu);