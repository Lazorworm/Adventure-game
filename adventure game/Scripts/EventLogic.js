import {deleteProfile, profile, saveProfile} from "./Serialization.js";
import {STAT_TYPES, statUp, statDown, statReset} from "./Player.js";

// Map of all option activate implementations where key is a logic id string and value is a function
export const OPTION_LOGIC = new Map();

// Map of all event additionalPreProcess implementations where key is a logic id string and value is a function
export const EVENT_PROCESS_LOGIC = new Map();

// -- OPTION LOGIC FUNCTIONS GO HERE --
OPTION_LOGIC.set("TEST", function() {
    console.log("TESTING HAHAHAHAHAHAHA");
});

OPTION_LOGIC.set("FUN", function() {
    console.log("SO MUCH FUN! YAAAAAAAY!!!");
});

OPTION_LOGIC.set("SAVE_DATA", saveProfile);
OPTION_LOGIC.set("DELETE_GAME", deleteProfile);

Object.freeze(OPTION_LOGIC);

// -- EVENT LOGIC FUNCTIONS GO HERE --

EVENT_PROCESS_LOGIC.set("NONE", function() {});

EVENT_PROCESS_LOGIC.set("MAIN_MENU", function() {
    document.getElementById("Level-tag").textContent = `Level: ${profile.level}`;
    document.getElementById("Name-tag").textContent = `Name: ${profile.name}`;
    document.getElementById("Points-tag").textContent = `Available Points: ${profile.points}`;

    const stat_names = Object.keys(STAT_TYPES);
    const stat_indices = Object.values(STAT_TYPES);
    for (let i = 0; i < 5; i++) {
        const stat_name = stat_names[i];
        const stat_index = stat_indices[i];
        document.getElementById(stat_name + "-tag").textContent = stat_name + `: ${profile.stats[i]}`;
        document.getElementById(stat_name + "-up-button").addEventListener("click", function() {statUp(stat_index, 1)});
        document.getElementById(stat_name + "-down-button").addEventListener("click", function() {statDown(stat_index, 1)});
    }

    document.getElementById("Reset-button").addEventListener("click", statReset);
});

Object.freeze(EVENT_PROCESS_LOGIC);