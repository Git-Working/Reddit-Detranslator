






chrome.runtime.onInstalled.addListener((details) => {
  if(details.reason == "install"){
    chrome.storage.sync.set({ 
      selection: "sel",
      checkBoxState: true 
    });

    // chrome.tabs.create({
    //   url: "welcome.html"
    // });
  }
});




// change current URL into new without translation 
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    chrome.storage.sync.get(['checkBoxState', 'selection'], (result) => {

      if(!result.selection || result.selection === "err"){
        console.warn("Test"); 
        return; 
      }

      if (String(result.checkBoxState) === "true" && tab.url.includes("reddit.com") && tab.url.includes(result.selection)) {
        let newWebUrl = tab.url.replace(result.selection, "");
        chrome.tabs.update(tabId, { url: newWebUrl });
        console.log("Redirect durchgeführt zu:", newWebUrl);    
      }
    });
  }
});


