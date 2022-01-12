// ==UserScript==
// @name         Join Data Copier
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Enderspearl184
// @match        https://*.brick-hill.com/play/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==
setTimeout(function(){
const stuff = {
    address: window.BH.apps.SetPage.$children[0].setIp,
    id: window.BH.apps.SetPage.$children[0].setId,
    port: window.BH.apps.SetPage.$children[0].setPort
}
const playButton = document.getElementsByClassName('play-button')[0];
const copyButton = playButton.cloneNode();

copyButton.className = copyButton.className.replace('play-button ', '').replace('green', 'red');
copyButton.textContent = 'Copy Join Data';
copyButton.onclick = () => {
    window.axios.get(window.BH.apiUrl('v1/auth/generateToken?set='.concat(stuff.id)))
        .then(function({data}){
            document.execCommand('copy'); navigator.clipboard.writeText(`{"token":"${data.token}","id":"${stuff.id}","port":"${stuff.port}","ip":"${stuff.address}"}`)
        });
}

playButton.parentNode.append(copyButton);
},500)


function copyToClipboard(el) {

    // resolve the element
    el = (typeof el === '`{"token":"${data.token}","id":"${stuff.id}","port":"${stuff.port}","ip":"${stuff.address}"}`') ? document.querySelector(el) : el;

    // handle iOS as a special case
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {

        // save current contentEditable/readOnly status
        var editable = el.contentEditable;
        var readOnly = el.readOnly;

        // convert to editable with readonly to stop iOS keyboard opening
        el.contentEditable = true;
        el.readOnly = true;

        // create a selectable range
        var range = document.createRange();
        range.selectNodeContents(el);

        // select the range
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        el.setSelectionRange(0, 999999);

        // restore contentEditable/readOnly to original state
        el.contentEditable = editable;
        el.readOnly = readOnly;
    }
    else {
        el.select();
    }

    // execute copy command
   
}
