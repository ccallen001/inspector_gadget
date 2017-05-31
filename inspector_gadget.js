'use strict';

// inspector_gadget.js
// reads the window keys/variables on the page

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

// insert button at bottom left of page
document.body.insertAdjacentHTML(`beforeend`, `
    <div 
        id ="inspector_gadget"
        style="        
                position: fixed;
                bottom: 12px; 
                left: -32px;
                z-index: 1000000;
                width: 64px;
                height: 64px;
                background-color: #ad62cc;
                color: whitesmoke;
                font-size: 8px;
                font-weight: bold;
                line-height: 54px;
                text-align: center;
                border: 4px solid violet;
                border-radius: 16px;
                cursor: pointer;

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
    </div>
`);

// get button and assign to variable
const ig = document.getElementById(`inspector_gadget`);

// secret song
const seq = [`i`, `g`];
let i_seq = 0;

function listen4Seq(ev) {
    //console.log(ev.key.toLowerCase(), seq[i_seq]);

    if (ev.key.toLowerCase() === seq[i_seq]) {
        i_seq++;

        if (i_seq === seq.length) {
            document.body.insertAdjacentHTML(`beforeend`, `
                <iframe 
                    id="secret_song" 
                    src="https://www.youtube.com/embed/d1wdMrpj_p8?autoplay=1" 
                    style="display: none;" 
                    width="854" 
                    height="480" 
                    frameborder="0" 
                    allowfullscreen>
                </iframe>
            `);
        }
    } else { i_seq = 0; }
}

ig.addEventListener(`mouseover`, ev => window.addEventListener(`keypress`, listen4Seq));
ig.addEventListener(`mouseleave`, ev => window.removeEventListener(`keypress`, listen4Seq));


// add transition effects
ig.addEventListener(`mouseover`, ev => {
    ig.style.left = `16px`;
    ig.style.transform = `rotate(${rot}deg) scale(1.05)`;
});
ig.addEventListener(`mousedown`, ev => ig.style.transform = `rotate(${rot}deg) scale(.95)`);
[`mouseup`, `mouseleave`].forEach(ea => ig.addEventListener(ea, ev => ig.style.transform = `rotate(${rot}deg) scale(1)`));

// _smtr.push() functionality
let rot = 0; // <-- another transition effect variable
ig.addEventListener(`click`, ev => {
    // transition effect
    rot -= 360;
    ig.style.transform = `rotate(${rot}deg) scale(1.05)`;

    // pushing to the console
    const srObjList = window._smtr && typeof window._smtr.push === `function` && window._smtr.push([`getSrObjList`]) || undefined,
        visitorObj = window._smtr && typeof window._smtr.push === `function` && window._smtr.push([`getVisitorObj`]) || undefined;

    if (srObjList) {
        // visitor obj
        console.log(visitorObj);

        // each item of the obj list 
        srObjList.forEach(ea => {
            console.log(ea.passed || `no objects passed`);
        });
    } else {
        console.log(`%cERROR:`, `color: red;`, `!!! _smtr not found !!!`);
    }
});