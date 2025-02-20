import { OptionType } from "@utils/types";
import { definePluginSettings } from "@api/Settings";
import definePlugin from "@utils/types";

const cssTexts = {
    "noGiftButton": `button[aria-label="Send a gift"] * { display: none !important; }`,
    "noShopButton": `a[href="/shop"] * { display: none !important; }`,
    "noProfileDecorations": `svg[class^="avatarDecoration"] { display: none !important; }`,
    "noPlayAgainTab": `ul[aria-label="Direct Messages"] div[class^="container"] { display: none !important; }`
}

const settings = definePluginSettings({
    noGiftButton: {
        type: OptionType.BOOLEAN,
        default: true
    },
    noShopButton: {
        type: OptionType.BOOLEAN,
        default: true
    },
    noProfileDecorations: {
        type: OptionType.BOOLEAN,
        default: true
    },
    noPlayAgainTab: {
        type: OptionType.BOOLEAN,
        default: true
    }
});

export default definePlugin({
    name: "NoMoreClutter",
    description: "Removes useless clutter from discord, like the shop page, and profile decorations!",
    authors: [{ name: "3x1b", id: 800108516626661396n }],
    settings: settings,

    start() {
        /* const style = document.createElement('style');
        style.classList.add("NoMoreClutter");
        style.textContent = '';
        document.head.appendChild(style); */
        for (const [i, v] of Object.entries(cssTexts)) {
            if (!settings.store[i]) {
                continue;
            }
            const style = document.createElement('style');
            style.classList.add("NoMoreClutter");
            style.textContent = v;
            document.head.appendChild(style);
        }
    },
    
    stop() {
        document.querySelectorAll(".NoMoreClutter").forEach(function(style) {
            style.remove();
        })
    }
});