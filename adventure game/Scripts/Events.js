import {OPTION_LOGIC, EVENT_PROCESS_LOGIC} from "./EventLogic.js";
import { profile } from "./Serialization.js";

// Map of all Options loaded where key is a name string and value is an option
export const OPTIONS = new Map();

// Map of all Options loaded where key is a name string and value is an event
export const EVENTS = new Map();

// A drop down Option object, usually associated with a specific event
export class Option {
    static numOptions = 0;

    constructor(logic_id, name) {
        this.logic_id = logic_id;
        this.name = name;
        OPTIONS.set(name, this);
        Option.numOptions++;

        this.activate = OPTION_LOGIC.get(logic_id);
    }

    // Call the activate method for an option, given it's id
    static useOptionByName(name) {
        for (const name in OPTIONS.keys()) {
            console.log(name);
        }

        if (OPTIONS.has(name)) {
            OPTIONS.get(name).activate();
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
    constructor(name, logic_id, is_menu_event, options, html, image_path) {
        this.name = name;
        this.logic_id = logic_id;
        this.is_menu_event = is_menu_event;
        this.options = options;
        this.html = html;
        this.image_path = image_path;
        EVENTS.set(name, this);
        Event.numEvents++;

        this.additionalPreprocess = EVENT_PROCESS_LOGIC.get(logic_id);
    }

    // function for loading a event from a json
    static async retrieveEvent(path) {
        const name = path.split("/")[3].split(".")[0];
        if (EVENTS.has(name)) {
            return EVENTS.get(name);
        }

        const event_file = await fetch(path);
        const pseudo_event = await event_file.json();

        const options = [];
        for (let i = 0; i < pseudo_event.options.length; i++) {
            const pseudo_option = pseudo_event.options[i];
            const option = new Option(pseudo_option.logic_id, pseudo_option.name);
            options[i] = option;
        }

        var event;
        if (pseudo_event.html_path) {
            const html_file = await fetch(pseudo_event.html_path);
            event = new Event(pseudo_event.name, pseudo_event.logic_id, pseudo_event.is_menu_event, options, await html_file.text(), pseudo_event.image_path);
        } else {
            event = new Event(pseudo_event.name, pseudo_event.logic_id, pseudo_event.is_menu_event, options, null, pseudo_event.image_path);
        }
        
        return event;
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
        profile.current_event_name = this.name;

        const old_inserts = document.getElementsByClassName("Event-Insert");
        for (const insert of old_inserts) {
            insert.remove();
        }

        const option_select = document.getElementById("Event-select");
        option_select.innerHTML = "";
        if (this.options) {
            for (const option of this.options) {
                option_select.innerHTML += '<option value="' + option.name + '">' + option.name + '</option>';
            }
        }

        const display = document.getElementById("Game-Picture");
        if (this.image_path) {
            display.classList.remove("hide");
            display.src = this.image_path;
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