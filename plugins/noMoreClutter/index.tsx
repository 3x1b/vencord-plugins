import { OptionType } from "@utils/types";
import { definePluginSettings } from "@api/Settings";
import definePlugin from "@utils/types";

const cssTexts = {
    // On by default
    "noGiftButton": `button[aria-label="Send a gift"] * { display: none !important; }`,
    "noShopButton": `a[href="/shop"] * { display: none !important; }`,
    "noProfileDecorations": `svg[class^="avatarDecoration"] { display: none !important; }`,
    "noPlayAgainTab": `ul[aria-label="Direct Messages"] div[class^="container"] { display: none !important; }`,
    "noBadges": `div[aria-label="User Badges"] * { display: none !important; }`,

    // Off by default
    "noPronouns": `div[aria-label="Pronouns"] * { display: none !important; } div[class^=dotSpacer] { display: none !important; }`,
    "noNitroButton": `a[href="/store"] * { display: none !important; }`,
    "noQuests": `section[aria-label="User area"] { display: none !important; }`
}

const settings = definePluginSettings({
    // On by default
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
    },
    noBadges: {
        type: OptionType.BOOLEAN,
        default: true
    },

    // Off by default
    noPronouns: {
        type: OptionType.BOOLEAN,
        default: false
    },
    noNitroButton: {
        type: OptionType.BOOLEAN,
        default: false
    },
    noQuests : {
        type: OptionType.BOOLEAN,
        default: false
    }
});

export default definePlugin({
    name: "NoMoreClutter",
    description: "Removes useless clutter from discord, like the shop page, and profile decorations!",
    authors: [{ name: "3x1b", id: 800108516626661396n }],
    settings: settings,

    start() {
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
