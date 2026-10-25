import {Event, Option} from "./Events.js";

export var profile = null;

export async function loadGame() {
    await Event.retrieveEvent("../Data/Events/Home_Page.json");
    await Event.retrieveEvent("../Data/Events/Main_Menu.json");
    await loadProfile();

    await Event.retrieveEvent("../Data/Events/" + profile.current_menu_event_name + ".json");
    (await Event.retrieveEvent("../Data/Events/" + profile.current_game_event_name + ".json")).loadEvent();
}

export async function loadProfile() {
    if (localStorage.getItem("Profile") !== null) {
        profile = JSON.parse(localStorage.getItem("Profile"));
        console.log("Profile loaded from local storage:", profile);
    } else {
        const template_profile = await fetch("../Data/Player/template_profile.json");
        localStorage.setItem("Profile", JSON.stringify(await template_profile.json()));
        console.log("No profile found in local storage.");
    }
}

export async function saveProfile() {
    localStorage.setItem("Profile", JSON.stringify(profile));
    console.log("Profile Saved!");
}

export async function deleteProfile() {
    const template_profile = await fetch("../Data/Player/template_profile.json");
    localStorage.setItem("Profile", JSON.stringify(await template_profile.json()));
    console.log("Profile Deleted!");
}