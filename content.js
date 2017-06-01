'use strict';

// content.js

// YOU DON'T WANT THIS FILE... you want inspector_gadget.js.. probably

// alert(`Hello from Inspector Gadget`);

// this happens on page load
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "page_loaded") {
            //
        }
    }
);

let showing = window.localStorage.getItem(`gogoGadget`) ? true : false;

// this happens when the icon is clicked
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            const ig = document.getElementById(`inspector_gadget`),
                secret_song = document.getElementById(`secret_song`);
            // hides and shows the button
            if (showing) {
                ig.style.display = `none`;
                ig.style.left = `-32px`;

                // stops music if playing
                if (secret_song) document.body.removeChild(secret_song);

                // local storage representing button's state
                window.localStorage.removeItem(`gogoGadget`);
            } else {
                ig.style.display = `block`;

                // local storage representing button's state
                window.localStorage.setItem(`gogoGadget`, true);
            }

            showing = !showing;
        }
    }
);

// adds the inspector_gadget.js script for reading window keys/variables
function injectScript(file, node) {
    const n = document.getElementsByTagName(node)[0];
    const s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    n.appendChild(s);
}
injectScript(chrome.extension.getURL('inspector_gadget.js'), 'body');