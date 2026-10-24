export var profile = null;

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