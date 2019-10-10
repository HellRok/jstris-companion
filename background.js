chrome.runtime.onInstalled.addListener(function() {
  const keys = ['skin', 'skinPixels', 'ghost', 'ghostPixels', 'background',
    'left', 'right', 'soft', 'hard', 'rotateLeft', 'rotateRight',
    'rotate180', 'hold', 'customCss', 'customJs'];

  chrome.storage.sync.get(keys, (result) => {
    let opts = {}
    keys.forEach((key) => {
      if (result[key] === undefined) {
        opts[key] = '';
      }
      chrome.storage.sync.set(opts);
    });
  });
});
