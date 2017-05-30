'use strict';

// inspector_gadget.js
// reads the window keys/variables on the page

// window.console.log(_smtr);

// BULK OF THE OPERATIONAL CODE IS HERE!!! don't worry about the other files

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

// apply button to page
document.body.insertAdjacentHTML(`beforeend`, `
    <div 
        id ="inspector_gadget"
        style="        
                position: fixed;
                bottom: 24px; 
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

// assign button to variable
let ig = document.getElementById(`inspector_gadget`),
    rot = 0;

// add transition effects
ig.addEventListener(`mouseover`, ev => {
    ig.style.left = `32px`;
    ig.style.transform = `rotate(${rot}deg) scale(1.05)`;
});
ig.addEventListener(`mousedown`, ev => ig.style.transform = `rotate(${rot}deg) scale(.95)`);
[`mouseup`, `mouseleave`].forEach(ea => ig.addEventListener(ea, ev => ig.style.transform = `rotate(${rot}deg) scale(1)`));

// _smtr.push()
let deg = 0;
ig.addEventListener(`click`, ev => {
    rot -= 360;
    ig.style.transform = `rotate(${rot}deg) scale(1.05)`;

    let srObjList = window._smtr && typeof window._smtr.push === `function` && window._smtr.push([`getSrObjList`]) || undefined,
        visitorObj = window._smtr && typeof window._smtr.push === `function` && window._smtr.push([`getVisitorObj`]) || undefined;

    if (srObjList) {
        // visitor obj
        console.log(visitorObj);

        //each one
        srObjList.forEach(ea => {
            console.log(ea.passed || `no objects passed`);
        });
    } else {
        console.log(`%cERROR:`, `color: red; font-weight: bold;`, `!!! _smtr not found !!!`);
    }
});