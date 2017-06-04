'use strict';

// inspector_gadget.js

// reads the window keys/variables on the page and performs the 'heavy lifting'

// window.console.log(_smtr);

// BULK OF THE OPERATIONAL CODE IS HERE!!! don't worry about the other files.. unless you want to


//                                                            _..__
//                                                          .'     '.
//                                                          |.-"""-.|
//                                                         _;.-"""-.;_
//                                                     _.-' _..-.-.._ '-._
//                                                    ';--.-(_o_I_o_)-.--;'
//                                                     `. | |  | |  | | .`
//                                                       `-\|  | |  |/-'
//                                                          |  | |  |
//                                                          |  \_/  |
//                                                       _.'; ._._. ;'._
//                                                  _.-'`; | \  -  / | ;'-.
//                                                .' :  /  |  |   |  |  \  '.
//                                               /   : /__ \  \___/  / __\ : `.
//                                              /    |   /  '._/_\_.'  \   :   `\
//                                             /     .  `---;"""""'-----`  .     \


// local storage to check and preserve hide/show state of the button
const gogoGadget = window.localStorage.getItem(`gogoGadget`) ? `block` : `none`;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONTROLS --------------------------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.body.insertAdjacentHTML(`afterbegin`, `
    <style>
        #ig_controls {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 1000000;
            width: 256px;
            background-color: whitesmoke;
            font-size: 16px;
            border: 4px solid violet;
            border-top: none;
            border-right: none;
            border-bottom-left-radius: 8px;
            overflow: hidden;
            transition: transform .33s linear;
        }
        /*
        .ig_controls_showing {
            transform: translateY(100%);
        } 
        */
        #ig_controls ul {
            margin: 0;
            padding: 0;
        }

        #ig_controls ul li {
            list-style: none;
            padding: 8px;
            padding-top: 9px;
            width: 100%;
            background-color: whitesmoke;
            color: #111;
            cursor: pointer;
            transition: background-color .1s, color .15s;
        }

        #ig_controls ul li:hover, #ig_controls ul .ig_controls_selected {
            background-color: violet;
            color: whitesmoke;
        }

        #ig_controls ul .ig_controls_selected {
            font-weight: bold;
        }
    </style>

    <div id="ig_controls" style="transform: translateY(-100%);">
        <ul>
            <li id="ig_on_off">Toggle On/Off</li>
            <li id="insert_shq_script" style="border-top: 1px solid #111">Insert SHQ Script</li>
        </ul>
    </div>
`);

const controls = document.querySelectorAll(`#ig_controls li`),
    [on_off, insert_shq_script] = controls;

// depending on local storage, toggle on/off state color
on_off.className = gogoGadget !== `none` ? `ig_controls_selected` : ``;

// switch on/off state colors on click
controls.forEach(ea => ea.addEventListener(`click`, ev => ev.target.classList.toggle(`ig_controls_selected`)));

// script handling ----------------------------------------------------------------------------------------------------------------------

const shq_on_page = [...document.scripts].filter(script => script.src && script.src.includes(`d1n00d49gkbray.cloudfront.net/js/`) || script.src.includes(`dhxtx5wtu812h.cloudfront.net/js/`)).length ? true : false;

insert_shq_script.className = shq_on_page ? `ig_controls_selected` : ``;
// if (insert_shq_script) insert_shq_script.textContent = insert_shq_script.className.includes(`selected`) ? `Insert SHQ Script` : `SHQ Script is ON`;

// check content.js for logic for initial check for if the script has been forced on page before and how to handle

insert_shq_script.addEventListener(`click`, ev => {
    const client_script = window.prompt(`Which script to inject?`);

    if (client_script) {
        let shq_script = "(function(w,d,s,sr,c){w[sr]=w[sr]||[]; var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src= d.location.protocol+'//d1n00d49gkbray.cloudfront.net/js/'+c+'.js';f.parentNode.insertBefore(j,f); })(window,document,'script','_smtr','" + client_script + "')";
        window.eval(shq_script);
        window.localStorage.setItem(`shq_injected_script`, "(function(w,d,s,sr,c){w[sr]=w[sr]||[]; var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src= d.location.protocol+'//d1n00d49gkbray.cloudfront.net/js/'+c+'.js';f.parentNode.insertBefore(j,f); })(window,document,'script','_smtr','" + client_script + "')");
        window.location = window.location;
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BUTTON -------------------------------------------------------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// insert button at bottom left of page
document.body.insertAdjacentHTML(`beforeend`, `
    <div 
        id ="inspector_gadget"
        style=" 
                display: ${gogoGadget};       
                position: fixed;
                bottom: 12px;
                left: -36px;
                transform: scale(1) translate(-36px);
                z-index: 1000000;
                width: 64px;
                height: 64px;
                background-color: #ad62cc;
                color: whitesmoke;
                font-size: 8px;
                font-weight: bold;
                line-height: 62px;
                text-align: center;
                border: 4px solid violet;
                border-radius: 16px;
                cursor: pointer;
                transform: rotate(0deg);
                transition: .1s linear;">

                SmarterHQ

        <div 
            style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%) translateY(-50%);
                width: 95%;
                height: 95%;
                background: url('https://is5-ssl.mzstatic.com/image/thumb/Purple/v4/06/87/bb/0687bbca-b1d1-62fa-2013-7cea558ab01c/source/256x256bb.jpg') no-repeat center / cover;
                border-radius: 8px">
        </div>

        <!-- SECRET SONG -->
        <iframe
            id="secret_song"
            style="display: none;"
            width="1" 
            height="1" 
            src="https://www.youtube.com/embed/d1wdMrpj_p8">
        </iframe>
    </div>
`);

// -------------------------------------------------------------------------------------------------

// SECRET SONG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! :)
// click in window, hover over icon, type "i", "g" to activate
const seq = [`i`, `g`];
let i_seq = 0;

function listen4Seq(ev) {
    const secret_song = document.getElementById(`secret_song`);

    if (ev.key.toLowerCase() === seq[i_seq]) {
        i_seq++;
        //console.log(i_seq, seq.length);
        if (i_seq === seq.length) {
            secret_song.src = `https://www.youtube.com/embed/d1wdMrpj_p8?autoplay=1`;
        }
    } else { i_seq = 0; }
}

// -------------------------------------------------------------------------------------------------

// get button and assign to variable
const ig = document.getElementById(`inspector_gadget`);

// for the secret song referenced above
ig.addEventListener(`mouseover`, ev => window.addEventListener(`keypress`, listen4Seq));
ig.addEventListener(`mouseleave`, ev => window.removeEventListener(`keypress`, listen4Seq));

// add transition effects
ig.addEventListener(`mouseover`, ev => {
    ig.style.left = '12px'
    ig.style.transform = `rotate(${rot}deg) scale(1.05)`; // might redo this in css up above...
});
ig.addEventListener(`mousedown`, ev => ig.style.transform = `rotate(${rot}deg) scale(.95)`);
[`mouseup`, `mouseleave`].forEach(ea => ig.addEventListener(ea, ev => ig.style.transform = `rotate(${rot}deg) scale(1)`));

let rot = 0;

// _smtr.push() functionality
ig.addEventListener(`click`, ev => {
    // transition effect
    rot -= 360;
    ig.style.transform = `rotate(${rot}deg) scale(.95)`;

    // pushing to the console
    const srObjList = window._smtr && typeof window._smtr.push === `function` && window._smtr.push([`getSrObjList`]) || undefined,
        visitorObj = window._smtr && typeof window._smtr.push === `function` && window._smtr.push([`getVisitorObj`]) || undefined;

    if (srObjList) {
        // visitor obj
        console.log(` `);
        console.log(visitorObj);

        // each item of the obj list 
        srObjList.forEach(ea => {
            console.log(ea.passed || `no objects passed`);
        });
        console.log(` `);
    } else {
        console.log(` `);
        console.log(`%cERROR: %c!!! _smtr not found !!!`, `color: red; font-weight: bold;`, `color: violet;`);
        console.log(` `);
    }
});