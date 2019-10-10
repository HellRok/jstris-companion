class JstrisCompanion {
  setBackground(background) {
    // We need important here because I don't want to depend on the first style
    // tag always being the background like many other scripts do.
    this.injectStylesheet(`
      body {
        background-image: url('${background}') !important;
        background-size: 100% !important;
      }

      #app {
        background-color: rgba(0, 0, 0, 0,);
      }
    `);
  }

  setSkin(skin, size) {
    this.injectJavascript(`
      loadSkin('${skin}', ${size});
    `);
  }

  setGhost(ghost, size) {
    this.injectJavascript(`
      loadGhostSkin('${ghost}', ${size});
    `);
  }

  setSecondKey(newKey, oldKey) {
    const newKeyCode = parseInt(newKey);
    const oldKeyCode = this.settings()[oldKey];

    const duplicateKey = (e) => {
      if (e.keyCode !== newKeyCode) { return };
      const event = new KeyboardEvent(e.type, {keyCode : oldKeyCode});
      document.dispatchEvent(event);
    }
    window.addEventListener("keydown", duplicateKey, true);
    window.addEventListener("keyup", duplicateKey, true);
  }

  setSettings() {
    this.injectJavascript(`
      const dataDiv = document.createElement('div');
      // Set the defaults unless window.sts is defined.
      const settings = window.sts || {
        k0: 37, k1: 39, k2: 40, k3: 32, k4: 67, k5: 38, k7: 65, k6: 67
      }
      dataDiv.id = 'jstris_data';
      dataDiv.dataset['settings'] = JSON.stringify(settings);
      (document.body || document.head || document.documentElement).appendChild(dataDiv);
    `);
  }

  settings() {
    return JSON.parse(document.getElementById('jstris_data').dataset['settings']);
  }

  injectJavascript(code) {
    const script = document.createElement('script');
    script.appendChild(document.createTextNode(code));
    this.append(script);
  }

  injectStylesheet(code) {
    const style = document.createElement('style');
    style.type = 'text/css'
    style.appendChild(document.createTextNode(code));
    this.append(style);
  }

  append(element) {
    (document.body || document.head || document.documentElement).appendChild(element);
  }
}

const jstrisCompanion = new JstrisCompanion();
window.addEventListener('load', () => { jstrisCompanion.setSettings(); });

window.addEventListener('load', () => {
  const keys = ['skin', 'skinPixels', 'ghost', 'ghostPixels', 'background',
    'left', 'right', 'soft', 'hard', 'rotateLeft', 'rotateRight',
    'rotate180', 'hold', 'customCss', 'customJs'];
  const isSet = value => {
    return value !== null && value !== '' && typeof value !== 'undefined';
  };

  chrome.storage.sync.get(keys, (result) => {
    if (isSet(result.skin) && isSet(result.skinPixels)) {
      jstrisCompanion.setSkin(result.skin, result.skinPixels);
    }
    if (isSet(result.ghost) && isSet(result.ghostPixels)) {
      jstrisCompanion.setGhost(result.ghost, result.ghostPixels);
    }
    if (isSet(result.background)) {
      jstrisCompanion.setBackground(result.background);
    }

    if (isSet(result.left)) {
      jstrisCompanion.setSecondKey(result.left, 'k0');
    }
    if (isSet(result.right)) {
      jstrisCompanion.setSecondKey(result.right, 'k1');
    }
    if (isSet(result.soft)) {
      jstrisCompanion.setSecondKey(result.soft, 'k2');
    }
    if (isSet(result.hard)) {
      jstrisCompanion.setSecondKey(result.hard, 'k3');
    }
    if (isSet(result.rotateLeft)) {
      jstrisCompanion.setSecondKey(result.rotateLeft, 'k4');
    }
    if (isSet(result.rotateRight)) {
      jstrisCompanion.setSecondKey(result.rotateRight, 'k5');
    }
    if (isSet(result.rotate180)) {
      jstrisCompanion.setSecondKey(result.rotate180, 'k7');
    }
    if (isSet(result.hold)) {
      jstrisCompanion.setSecondKey(result.hold, 'k6');
    }

    if (isSet(result.customCss)) {
      jstrisCompanion.injectStylesheet(result.customCss);
    }
    if (isSet(result.customJs)) {
      jstrisCompanion.injectJavascript(result.customJs);
    }
  });
});
