import {deleteProfile, profile, saveProfile} from "./Serialization.js";
import {STAT_TYPES, statUp, statDown, statReset} from "./Player.js";

// Collection of Tags for each Event ID
export const EVENT_NAMES = {}

// Array of all Options created
export const OPTIONS = [];

// Array of all Events created
export const EVENTS = [];

// A drop down Option object, usually associated with a specific event
export class Option {
    static numOptions = 0;

    constructor(name) {
        this.id = Option.numOptions;
        this.name = name;
        OPTIONS[Option.numOptions] = this;
        Option.numOptions++;
    }

    // Call the activate method for an option, given it's id
    static useOptionByID(id) {
        id = Number(id);
        if (typeof id == "number") {
            OPTIONS[id].activate();
        }
    }

    // Override this for implementing functionality
    // of specific option objects   
    activate() {

    }
}

// A page event object, the main staging tool for the game
export class Event {
    static numEvents = 0;

    // Options should take the form of an array of Option objects
    // html should take the form of a string of properly formated html
    // image should take the form of a file path to the image file you want

    // Options are all of the drop down options you can select from
    // html is the html elements that will be inserted to the web page
    // relating to the event
    // image is the image that "Game-Picture"'s source will be set to
    // during the event
    constructor(options, html, image) {
        this.id = Event.numEvents;
        this.options = options;
        this.html = html;
        this.image = image;
        EVENTS[Event.numEvents] = this;
        Event.numEvents++;
    }

    // This should be overloaded when extra preparation of the even past
    // inserting the html, options, and image is necessary
    additionalPreprocess() {

    }

    // Basic event loading procedure, including adding drop down options
    // Inserting relevant html, and adding a new source to "Game-Picture"
    // All before calling additonalPreprocess in case of necessary secondary
    // loading steps
    loadEvent() {
        const old_inserts = document.getElementsByClassName("Event-Insert");
        for (const insert of old_inserts) {
            insert.remove();
        }

        const option_select = document.getElementById("Event-select");
        option_select.innerHTML = "";
        if (this.options) {
            for (const option of this.options) {
                option_select.innerHTML += '<option value="' + option.id + '">' + option.name + '</option>';
            }
        }

        const display = document.getElementById("Game-Picture");
        if (this.image) {
            display.classList.remove("hide");
            display.src = this.image;
        } else {
            display.classList.add("hide");
        }

        if (this.html) {
            const content = document.getElementById("Game-content");
            content.insertAdjacentHTML("afterbegin", this.html);
        }

        this.additionalPreprocess();
    }
}

// Place all Event and Option initialization here

// ALWAYS ADD A EVENT_NAMES ENTRY WITH THE NAME OF A NEW EVENT
// AND A VALUE OF THE CURRENT NUMBER OF EVENTS, BEFORE INITIALIZING
// A NEW EVENT!

EVENT_NAMES.HOME_PAGE = Event.numEvents;
const HOME_PAGE = new Event(null, null, "../Images/placeholder.png");

EVENT_NAMES.MAIN_MENU= Event.numEvents;
const Fun = new Option("Fun");
Fun.activate = function() {
    console.log("SO MUCH FUN! YAAAAAAAY!!!");
}
const Save = new Option("Save Data");
Save.activate = function() {
    saveProfile();
}
const Delete = new Option("Delete Data");
Delete.activate = function() {
    deleteProfile();
}
const MAIN_MENU_HTML = await fetch("../HTML/Main_Menu.html");
const MAIN_MENU = new Event([Fun, Save, Delete], await MAIN_MENU_HTML.text(), null);
MAIN_MENU.additionalPreprocess = function() {
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
}