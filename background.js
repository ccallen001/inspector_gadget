'use strict'

// background.js

// YOU DON'T WANT THIS FILE... you want inspector_gadget.js.. probably

// called on page load
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == `complete` && tab.active) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { message: `page_loaded` });
        });
    }
})

// called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
    // send a message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { message: `clicked_browser_action` });
    });
});