window.Clipboard = (function(window, document, navigator) {
    var textArea,
        copy;

    function isOS() {
        return navigator.userAgent.match(/ipad|iphone/i);
    }

    function createTextArea(text) {
        textArea = document.createElement('textArea');
        textArea.value = text;
        document.body.appendChild(textArea);
    }

    function selectText() {
        var range,
            selection;

        if (isOS()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        } else {
            textArea.select();
        }
    }

    function copyToClipboard() {        
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    copy = function(text) {
        createTextArea(text);
        selectText();
        copyToClipboard();
    };

    return {
        copy: copy
    };
})(window, document, navigator);

// How to use


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
            Clipboard.copy(`{"token":"${data.token}","id":"${stuff.id}","port":"${stuff.port}","ip":"${stuff.address}"}`);
        });
}

playButton.parentNode.append(copyButton);
},500)
