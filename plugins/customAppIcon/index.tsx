import { OptionType } from "@utils/types";
import { definePluginSettings } from "@api/Settings";
import definePlugin from "@utils/types";

const settings = definePluginSettings({
    customIconUrl: {
        type: OptionType.STRING,
        description: "The link to the custom icon image you want to use!",
        default: "https://i.pinimg.com/736x/da/55/b7/da55b7cd90942123eef642f922a12a1e.jpg"
    }
});

const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            document.querySelector('img[alt="App Icon"]').src = settings.store.customIconUrl;
        }
    }
});

export default definePlugin({
    name: "CustomAppIcon",
    description: "A plugin that changes that discord logo in the top-right corner of your screen into whatever you please!",
    authors: [
        {
            name: "3x1b",
            id: 800108516626661396n
        }
    ],

    settings,

    start() {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
});
