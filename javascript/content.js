'use strict';

// content.js

// YOU DON'T WANT THIS FILE... you want inspector_gadget.js.. probably

// window.alert(`Hello from Inspector Gadget`);

// this happens on page load
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "page_loaded") {
            if (window.localStorage.shq_injected_script) {
                window.eval(window.localStorage.shq_injected_script);
                document.getElementById(`insert_shq_script`).className = `ig_controls_selected`;
            }
        }
    }
);

let showing = window.localStorage.getItem(`gogoGadget`) ? true : false;

// this happens when the icon is clicked
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            const ig_controls = document.getElementById(`ig_controls`),
                controls = document.querySelectorAll(`#ig_controls li`),
                [on_off, insert_shq_script] = controls,
                ig = document.getElementById(`inspector_gadget`),
                secret_song = document.getElementById(`secret_song`);

            // hides and shows the controls
            /*
            ig_controls.classList.toggle(`ig_controls_showing`) // <-- :(
            */
            let style = ig_controls.style;

            style.transform = style.transform.includes(`-100%`) ? `translateY(0)` : `translateY(-100%)`; // <-- damn.. problem in the css in inspector_gadget.js

            on_off.addEventListener(`click`, ev => {
                // hides and shows the button
                if (showing) {
                    ig.style.display = `none`;
                    ig.style.left = `-36px`;

                    // stops music if playing
                    if (secret_song && secret_song.src) secret_song.src = secret_song.src.split(`?autoplay=1`)[0];

                    // local storage representing button's state
                    window.localStorage.removeItem(`gogoGadget`);
                } else {
                    ig.style.display = `block`;

                    // local storage representing button's state
                    window.localStorage.setItem(`gogoGadget`, true);
                }

                showing = !showing;
            });
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
injectScript(chrome.extension.getURL('javascript/inspector_gadget.js'), 'body');