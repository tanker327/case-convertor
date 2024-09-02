if (window.chrome && chrome.devtools) {
  chrome.devtools.panels.create("Custom", "", "custom-panel.html", function(panel) {});
}

// Override Autofill methods
if (window.chrome && chrome.autofill) {
  chrome.autofill.enable = function() {};
  chrome.autofill.setAddresses = function() {};
}