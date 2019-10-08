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

  setSecondCCW(keyCode) {
    const duplicateCCW = (e) => {
      if (e.keyCode !== keyCode) { return };
      const event = new KeyboardEvent(e.type, {keyCode : 67});
      document.dispatchEvent(event);
    }
    window.addEventListener("keydown", duplicateCCW, true);
    window.addEventListener("keyup", duplicateCCW, true);
  }

  injectJavascript(code) {
    const script = document.createElement('script');
    script.appendChild(document.createTextNode(code));
    this.append(script);
  }

  injectStylesheet(code) {
    const style = document.createElement('style');
    style.type = 'text/css'
    style.appendChild(document.createTextNode(`
        ${code}
    `));
    this.append(style);
  }

  append(element) {
    (document.body || document.head || document.documentElement).appendChild(element);
  }
}

window.addEventListener('load', function(){
  const jstrisCompanion = new JstrisCompanion();
  jstrisCompanion.setBackground('https://i.imgur.com/hwL7ZsY.png');
  jstrisCompanion.setSkin("https://i.imgur.com/8eIewoR.png", 32);
  jstrisCompanion.setSecondCCW(221);
});
