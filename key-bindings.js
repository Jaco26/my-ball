const KEY_BINDINGS = (function() {

  function arrowKeyControl() {
    document.addEventListener('keydown', (e) => {    
      const key = e.key.toLowerCase()
      if (key.endsWith('up')) {
        this.arrowDirections.up = true;
      }
      if (key.endsWith('down')) {
        this.arrowDirections.down = true;
      }
      if (key.endsWith('right')) {
        this.arrowDirections.right = true;
      } 
      if (key.endsWith('left')) {
        this.arrowDirections.left = true;
      }
  
      if (key == 'w') {
        this.letterDirections.up = true;
      }
      if (key == 's') {
        this.letterDirections.down = true;
      }
      if (key == 'd') {
        this.letterDirections.right = true;
      } 
      if (key == 'a') {
        this.letterDirections.left = true;
      }
    });
  
    document.addEventListener('keyup', (e) => {
      const key = e.key.toLowerCase();
      if (key.endsWith('up')) {
        this.arrowDirections.up = false;
      }
      if (key.endsWith('down')) {
        this.arrowDirections.down = false;
      }
      if (key.endsWith('right')) {
        this.arrowDirections.right = false;
      } 
      if (key.endsWith('left')) {
        this.arrowDirections.left = false;
      }
  
      if (key == 'w') {
        this.letterDirections.up = false;
      }
      if (key == 's') {
        this.letterDirections.down = false;
      }
      if (key == 'd') {
        this.letterDirections.right = false;
      }
      if (key == 'a') {
        this.letterDirections.left = false;
      }
    })
  }

  return {
    arrowKeyControl,
  }

})();

