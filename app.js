

document.addEventListener("DOMContentLoaded", () => {
  const checkBox = document.getElementById("ToggleSlider");

  // Laden
  chrome.storage.sync.get({ checkBoxState: false }, (result) => {
    checkBox.checked = result.checkBoxState;
    
  });

  // Speichern
  checkBox.addEventListener('change', () => {
    chrome.storage.sync.set({ checkBoxState: checkBox.checked });
    // If checkboxState goes from unchecked to checked, reload page:     
    if(checkBox.checked){
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){ // Only if current tab is reddit 
        const activeTab = tabs[0]; 
        if(activeTab && activeTab.url.includes("reddit.com")){
          chrome.tabs.reload(activeTab.id, {bypassCache: true});
        }
      });      
    };     
  });

  const dropdown = document.getElementById("langCode"); 
  dropdown.addEventListener('change', (e) => {
      chrome.storage.sync.set({ selection: e.target.value});  
      // if lang gets changed --> reload page if reddit 
      chrome.tabs.query({ active: true, currentWindow: true}, function(tabs){
        const active = tabs[0]; 
        if(active && active.url.includes("reddit.com") && active.url.includes("?tl=")){
          chrome.tabs.reload(active.id, {bypassCache: true});
        }
      });
    });
  // load current selected 
  chrome.storage.sync.get(['selection'], (result) => {
      dropdown.value = result.selection; 
    });

});



chrome.runtime.onInstalled.addListener((detail) => {
  if(details.reason == "install"){
    chrome.tabs.create({
      url: "welcome.html"
    });
  }
});







