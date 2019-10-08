chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({
    skin: null,
    ghostSkin: null,
    background: null,
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'jstris.jezevec10.com' },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

