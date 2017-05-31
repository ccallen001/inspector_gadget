'use strict';

// content.js

// YOU DON'T WANT THIS FILE... you want inspector_gadget.js.. probably

// alert(`Hello from your Inspector Gadget`);

// this happens on page load
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "page_loaded") {
            //
        }
    }
);

let showing = true;
// this happens when the icon is clicked
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            const ig = document.getElementById(`inspector_gadget`);
            // hides and shows the button
            if (showing) {
                ig.style.display = `none`;
                ig.style.left = `-32px`;
            } else {
                ig.style.display = `block`;
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