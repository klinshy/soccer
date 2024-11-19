/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
const colors = [
    { red: 255, green: 0, blue: 0 },
    { red: 0, green: 0, blue: 255 }
];
let colorIndex = 0;

WA.onInit().then(async () => {
    WA.room.area.onEnter("aFeld").subscribe(() => {
        const selectedColor = colors[colorIndex];
        WA.player.setOutlineColor(selectedColor.red, selectedColor.green, selectedColor.blue);
        colorIndex = (colorIndex + 1) % colors.length; // Toggle between 0 and 1
    });

    WA.room.area.onLeave("aFeld").subscribe(() => {
        WA.player.removeOutlineColor();
    });
});
export {};
