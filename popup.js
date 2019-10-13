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

  load(settings) {
    this.keys.forEach((key) => {
      this[key].value = settings[key];
    });
    this.persistValues();
    document.getElementById('importContainer').classList.toggle('hide');
  }

  defineAttributes() {
    this.keys.forEach((key) => {
      this[key] = document.getElementById(key);
    });
  }

  populateForm() {
    chrome.storage.sync.get(this.keys, (result) => {
      this.keys.forEach((key) => {
        this[key].value = result[key];
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

    document.querySelector('#export').addEventListener('click', () => { _this.export() });
    document.querySelector('#import').addEventListener('click', () => { _this.import() });
    document.querySelector('#importData').addEventListener('paste', (event) => { _this.importData(event) });
  }

  persistValues() {
    chrome.storage.sync.set(this.attributes());
    document.getElementById('restartInfo').classList.remove('hide');
  }

  attributes() {
    let opts = {};
    this.keys.forEach((key) => {
      opts[key] = this[key].value;
    });
    return opts;
  }

  export() {
    document.getElementById('exportContainer').classList.toggle('hide');
    document.getElementById('exportData').value = JSON.stringify(this.attributes());
  }

  import() {
    document.getElementById('importContainer').classList.toggle('hide');
  }

  importData(event) {
    const paste = (event.clipboardData || window.clipboardData).getData('text');
    this.load(JSON.parse(paste));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const popup = new JstrisCompanionPopup();
  popup.setup();
});
