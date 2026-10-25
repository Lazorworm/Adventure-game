import {EVENTS, Option} from "./Events.js";
import {deleteProfile, loadGame, profile} from "./Serialization.js";

await loadGame();

let menu_open = false;

function toggleMenu() {
    if (menu_open) {
        menu_open = false;
        EVENTS.get("Home_Page").loadEvent();
    } else {
        menu_open = true;
        EVENTS.get("Main_Menu").loadEvent();
    }
}   

function useDropDownOption() {
    const drop_down = document.getElementById("Event-select");
    Option.useOptionByName(drop_down.value);
}

document.getElementById("Menu-button").addEventListener("click", toggleMenu);
document.getElementById("Confirm-button").addEventListener("click", useDropDownOption);