import {profile} from "./Serialization.js";

// list of all stat types associated with numbers
export const STAT_TYPES = Object.freeze({
    Intelligence: 0,
    Constitution: 1,
    Charisma: 2,
    Dexterity: 3,
    MEAT: 4
});

// Increase stat of the given type by num_up
export function statUp(type, num_up) {
    const stat_name = Object.keys(STAT_TYPES)[type];
    const stat_tag = document.getElementById(stat_name + "-tag");
    const points_tag = document.getElementById("Points-tag");

    if (profile.points >= num_up) {
        profile.points -= num_up;
        profile.stats[type] += num_up;
    } else {
        profile.stats[type] += profile.points;
        profile.points = 0;
    }

    stat_tag.textContent = stat_name + ": " + profile.stats[type];
    points_tag.textContent = "Available Points: " + profile.points
}

// Decrease stat of the given type by num_up
export function statDown(type, num_down) {
    const stat_name = Object.keys(STAT_TYPES)[type];
    const stat_tag = document.getElementById(stat_name + "-tag");
    const points_tag = document.getElementById("Points-tag");

    if (profile.stats[type] >= num_down) {
        profile.points += num_down;
        profile.stats[type] -= num_down;
    } else {
        profile.points += profile.stats[type];
        profile.stats[type] = 0;
    }

    stat_tag.textContent = stat_name + ": " + profile.stats[type];
    points_tag.textContent = "Available Points: " + profile.points
}

// Return all stat points to reserve
export function statReset() {
    const points_tag = document.getElementById("Points-tag");

    const stat_names = Object.keys(STAT_TYPES);
    for(let i = 0; i < 5; i++) {
        profile.points += profile.stats[i];
        document.getElementById(stat_names[i] + "-tag").textContent = stat_names[i] + ": 0";

        profile.stats[i] = 0;
    }

    points_tag.textContent = "Available Points: " + profile.points
}