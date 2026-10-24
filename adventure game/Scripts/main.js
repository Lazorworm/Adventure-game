import {EVENTS, EVENT_NAMES, Option} from "./Events.js";
import {loadProfile, profile} from "./Serialization.js";


let menu_open = false;

await loadProfile();

function toggleMenu() {
    if (menu_open) {
        menu_open = false;
        EVENTS[EVENT_NAMES.HOME_PAGE].loadEvent();
    } else {
        menu_open = true;
        EVENTS[EVENT_NAMES.MAIN_MENU].loadEvent();
    }
}   

function useDropDownOption() {
    const drop_down = document.getElementById("Event-select");
    Option.useOptionByID(drop_down.value);
}

document.getElementById("Menu-button").addEventListener("click", toggleMenu);
document.getElementById("Confirm-button").addEventListener("click", useDropDownOption);