'use strict'

// background.js

// YOU DON'T WANT THIS FILE... you want inspector_gadget.js.. probably

// called on page load
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    //document.body.insertAdjacentHTML(`afterbegin`, `<script async='' src='https://d1n00d49gkbray.cloudfront.net/js/gopherperformance.js'></script>`)
    if (changeInfo.status == `complete` && tab.active) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { message: `page_loaded` });
        });
    }
})

// called when the user clicks on the browser action (the icon next to the url)
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { message: `clicked_browser_action` });
    });
});