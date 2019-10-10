class JstrisCompanionPopup {
  constructor() {
    this.keys = ['skin', 'skinPixels', 'ghost', 'ghostPixels', 'background',
      'left', 'right', 'soft', 'hard', 'rotateLeft', 'rotateRight',
      'rotate180', 'hold', 'customCss', 'customJs'];
  }

  setup() {
    this.defineAttributes();
    this.populateForm();
    this.setupListeners();
  }

  defineAttributes() {
    const _this = this;
    this.keys.forEach((key) => {
      _this[key] = document.getElementById(key);
    });
  }

  populateForm() {
    const _this = this;
    chrome.storage.sync.get(this.keys, (result) => {
      _this.keys.forEach((key) => {
        _this[key].value = result[key];
      });
    });
  }

  setupListeners() {
    const _this = this;
    document.getElementById('save').addEventListener('click', () => { _this.persistValues() });

    document.querySelectorAll('.key').forEach((elem) => {
      elem.addEventListener('keydown', (event) => {
        event.target.value = event.keyCode;
      });
    });
  }

  persistValues() {
    let opts = {}
    this.keys.forEach((key) => {
      opts[key] = this[key].value;
    });

    chrome.storage.sync.set(opts);
    document.getElementById('restartInfo').classList.remove('hide');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const popup = new JstrisCompanionPopup();
  popup.setup();
});
