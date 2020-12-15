const hud = {
  coin: 0,

  coinDisplay() {
    let tensPlace = Math.floor(this.coin / 10);
    let onesPlace = this.coin % 10;
    let onesPlaceIndex = 14;

    if (tensPlace > 0) {

      onesPlaceIndex = 15;

      if (tensPlace < 4) {

        hudTiles.map[onesPlaceIndex - 1] = 4 + (tensPlace * 5);

      } else {

        hudTiles.map[onesPlaceIndex - 1] = (tensPlace - 4) + 20;

      };

    } else {
    
      hudTiles.map[onesPlaceIndex + 1] = -1;

    }

    if (onesPlace < 4) {

     hudTiles.map[onesPlaceIndex] = 4 + (onesPlace * 5);

    } else {

     hudTiles.map[onesPlaceIndex] = (onesPlace - 4) + 20;
     
    };
  },

  health: 6,

  healthDisplay() {

    let fullHearts = Math.floor(this.health / 2);
    let halfHearts = this.health % 2;
    
    for (i = 0; i < 3; i++) {

      if (fullHearts > 0) {
        hudTiles.map[i] = 10; 
        fullHearts --;
      } else if (halfHearts > 0) {
        hudTiles.map[i] = 0;
        halfHearts --;
      } else {
        hudTiles.map[i] = 5;
      }

    }

  },

  keyRed: 0,
  keyBlue: 0,
  keyGreen: 0,
  keyGold: 0,

  keyDisplay() {
    
    if (this.keyRed === 1) {
      hudTiles.map[8] = 2
    } else {
      hudTiles.map[8] = 3
    };

    if (this.keyBlue === 1) {
      hudTiles.map[9] = 12
    } else {
      hudTiles.map[9] = 15
    };

    if (this.keyGreen === 1) {
      hudTiles.map[10] = 7
    } else {
      hudTiles.map[10] = 8
    };

    if (this.keyGold === 1) {
      hudTiles.map[7] = 17
    } else {
      hudTiles.map[7] = 18
    }

  },

  bubbleTimer: 0,
  bubbleRecoveryTimer: 0,
  bubble: 3,

  bubbleCalculate(timer) {
    if (timer === 15) {
      if (timer === this.bubbleTimer) {
        this.bubble --;
        this.bubbleTimer = 0;
      } else {
        this.bubble ++;
        this.bubbleRecoveryTimer = 0;
      }
    }
  },

  bubbleDamage() {
    if (this.bubble === 0 && this.bubbleTimer === 15) {
      this.health --;
      this.bubbleTimer = 0;
    }
  },

  bubbleDisplay() {
    if (this.bubble === 3) {
      hudTiles.map[3] = hudTiles.map[4] = hudTiles.map[5] = 27;
    } else if (this.bubble === 2) {
      hudTiles.map[4] = 27;
      hudTiles.map[5] = 28;
    } else if (this.bubble === 1) {
      hudTiles.map[3] = 27;
      hudTiles.map[4] = 28;
    } else {
      hudTiles.map[3] = 28
    }
  }
  
}


