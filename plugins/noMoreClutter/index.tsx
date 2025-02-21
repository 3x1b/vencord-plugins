import { OptionType } from "@utils/types";
import { definePluginSettings } from "@api/Settings";
import definePlugin from "@utils/types";

const noMutualObserver = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const mutualRegex = /Mutual (Friends|Servers)/g;
            const h2Elements = document.querySelectorAll('h2');
            for (let h2 of h2Elements) {
                if (mutualRegex.test(h2.innerHTML.trim())) {
                    h2.parentElement?.parentElement?.parentElement?.remove()
                }
            }
        }
    }
});

const cssTexts = {
    "noGiftButton": `button[aria-label="Send a gift"] * { display: none !important; }`,
    "noShopButton": `a[href="/shop"] * { display: none !important; }`,
    "noProfileDecorations": `svg[class^="avatarDecoration"] { display: none !important; }`,
    "noPlayAgainTab": `ul[aria-label="Direct Messages"] div[class^="container"] { display: none !important; }`,
    "noBadges": `div[aria-label="User Badges"] * { display: none !important; }`,
    "noPronouns": `div[aria-label="Pronouns"] * { display: none !important; } div[class^=dotSpacer] { display: none !important; }`,
    "noNitroButton": `a[href="/store"] * { display: none !important; }`,
    "noMutuals": `div[aria-label$="Mutual Friends"] { display: none !important; } div[aria-label$="Mutual Servers"] { display: none !important; }`
}

const activateScripts = {
    "noGiftButton": function() { applyCSS("noGiftButton"); },
    "noShopButton": function() { applyCSS("noShopButton"); },
    "noProfileDecorations": function() { applyCSS("noProfileDecorations"); },
    "noPlayAgainTab": function() { applyCSS("noPlayAgainTab"); },
    "noBadges": function() { applyCSS("noBadges"); },
    "noPronouns": function() { applyCSS("noPronouns"); },
    "noNitroButton": function() { applyCSS("noNitroButton"); },
    "noMutuals": function() {
            applyCSS("noMutuals");
            noMutualObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
}

function applyCSS(id) {
    const style = document.createElement('style');
    style.classList.add("NoMoreClutter");
    style.textContent = cssTexts[id];
    document.head.appendChild(style);
}

function removeAllCSS() {
    document.querySelectorAll(".NoMoreClutter").forEach(function(style) {
        style.remove();
    })
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
    noMutuals: {
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
        for (const [i, _] of Object.entries(cssTexts)) {
            if (settings.store[i]) {
                activateScripts[i]();
            }
        }
    },
    
    stop() {
        removeAllCSS();
    }
});
