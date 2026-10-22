export async function loadProfile() {
    if (localStorage.getItem("Profile") !== null) {
        const profile = JSON.parse(localStorage.getItem("Profile"));
        console.log("Profile loaded from local storage:", profile);

        document.getElementById("Level-tag").textContent = `Level: ${profile.level}`;
        document.getElementById("Name-tag").textContent = `Name: ${profile.name}`;
        document.getElementById("Points-tag").textContent = `Available Points: ${profile.points}`;
        document.getElementById("Intelligence-tag").textContent = `Intelligence: ${profile.stats.Intelligence}`;
        document.getElementById("Constitution-tag").textContent = `Constitution: ${profile.stats.Constitution}`;
        document.getElementById("Charisma-tag").textContent = `Charisma: ${profile.stats.Charisma}`;
        document.getElementById("Dexterity-tag").textContent = `Dexterity: ${profile.stats.Dexterity}`;
        document.getElementById("MEAT!-tag").textContent = `MEAT!: ${profile.stats.MEAT}`;

    } else {
        const template_profile = await fetch("../Data/Player/template_profile.json");
        localStorage.setItem("Profile", JSON.stringify(await template_profile.json()));
        console.log("No profile found in local storage.");
    }
}