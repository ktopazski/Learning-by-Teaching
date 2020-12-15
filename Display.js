const canvas = document.getElementById('myCanvas');

const c = canvas.getContext('2d');

const thoughtBubble = new Image();
thoughtBubble.src = 'Images/pixelthoughtbubble.png';

const flippedThoughtBubble = new Image();
flippedThoughtBubble.src = 'Images/flippedpixelthoughtbubble.png';

const shopIcon = new Image();
shopIcon.src = 'Images/shopicon.png';

const shopIconHovered = new Image();
shopIconHovered.src = 'Images/shopiconhovered.png';

const shop = new Image();
shop.src = 'Images/Store.png';

const bananaRegular = new Image();
bananaRegular.src = 'Images/BananaMan.png';

const bananaFire = new Image();
bananaFire.src = 'Images/BananaManFire.png';

const bananaWater = new Image();
bananaWater.src = 'Images/BananaManWater.png';

const bananaPink = new Image();
bananaPink.src = 'Images/BananaManPink.png';

const bananaRainbow = new Image();
bananaRainbow.src = 'Images/BananaManRainbow.png';

const bananaShadow = new Image();
bananaShadow.src = 'Images/BananaManShadow.png';

const bananaGreen = new Image();
bananaGreen.src = 'Images/BananaManGreen.png';

const areYouSure = new Image();
areYouSure.src = 'Images/AreYouSure.png';

const question = new Image();
question.src = 'Images/Question.png';


const display = {

  bananaSprite: bananaRegular,

  sprites: [bananaGreen, bananaRainbow, bananaFire, bananaWater, bananaPink, bananaShadow],

  widthRatio: .67486819, 
  widthToHeightRatio: .5625,
  topGap: 50,
  
  nightMode: false,

  bgColor: '#87cbf5',

  drawFrame(frameX, frameY, canvasX, canvasY) {
  
  c.clearRect(0, 0, canvas.width, canvas.height);
  hud.coinDisplay();
  hud.healthDisplay();
  hud.bubbleDisplay();
  draw(world, this.bgColor);
  draw(items);
  draw(hudTiles);

  
  let startX = frameX * banana.tileWidth;

  if (frameY === 3 && frameX === 2) {
    startX = 60
    canvasX = canvasX - 50
  } 
  
  enemies.draw();

  c.drawImage(display.bananaSprite, startX, frameY * banana.tileHeight, banana.tileWidth, banana.tileHeight, canvasX, canvasY, banana.canvasWidth, banana.canvasHeight);
  
  if (display.instructions.present) {
    display.instructions.show(display.instructions.text[display.instructions.number]);
    
  };

  if (display.shop.hover) {
    display.shop.showIcon(shopIconHovered);
  } else {
    display.shop.showIcon(shopIcon);
  };

  if (game.settings.hover) {
      game.settings.showIcon(settingsIconClicked);
  } else {
      game.settings.showIcon(settingsIcon);
  };  

  if (display.shop.view) {
    display.shop.showShop()
    if (display.shop.xHover) {

      display.hoverRectangle(1023, 60, 43, 45);

    } else {

      if (display.shop.boxHover >= 0) {
        c.fillStyle = '#88001b';
        c.fillRect(display.shop.boxes.coordinates[display.shop.boxHover][0], display.shop.boxes.coordinates[display.shop.boxHover][1], display.shop.boxes.width, display.shop.boxes.height)
      };

    };
    
    c.font = '30px Trebuchet MS', '40px sans-serif';
    c.fillStyle = '#000000'; 
    c.fillText('Revert to original?', 448, 630);

    if (display.shop.revertHover) {
      c.globalAlpha = 0.5;
      c.fillStyle = '#88001b';
      c.fillRect(438, 600, 262, 50);
      c.globalAlpha = 1;
    }

    for (let i = 0; i < display.sprites.length; i++) {

        c.drawImage(display.sprites[i], 0, 0, banana.tileWidth, banana.tileHeight, 170 + 328 * (i % 3), 130 + 300 * (i % 2), 150, 150)

      };

    if (display.shop.boxClick >= 0) {
  
      if (hud.coin >= display.shop.costs[display.shop.boxClick] || display.shop.bought[display.shop.boxClick]) {
        display.bananaSprite = display.shop.boxClicked;
        if (hud.coin >= display.shop.costs[display.shop.boxClick] && !(display.shop.bought[display.shop.boxClick])) {
          display.shop.bought[display.shop.boxClick] = true;
          hud.coin -= display.shop.costs[display.shop.boxClick];
          hud.coinDisplay();
        }
      }
    }

    for (let i = 0; i < display.shop.bought.length; i++) {
      if (display.shop.bought[i]) {
        c.globalAlpha = 0.5;
        c.fillStyle = '#826644'; 
        c.fillRect(display.shop.boxes.coordinates[i][0], display.shop.boxes.coordinates[i][1], display.shop.boxes.width, display.shop.boxes.height);
        c.globalAlpha = 1;
        c.font = '40px Trebuchet MS', '40px sans-serif';
        c.fillStyle = '#FFFFFF'; 
        c.fillText('B o u g h t', display.shop.boxes.coordinates[i][0] + 35, display.shop.boxes.coordinates[i][1] + 110);
    
      }
    }
  } else {

    if (game.settings.view) {
    
      if (game.music) {
        game.settings.show(settings)
      } else {
        game.settings.show(settingsWithoutMusic)
      };

      if (game.areYouSure.view) {
      
        c.drawImage(areYouSure, 0, 0, 1125, 705, 280, 150, 600, 400);

        if (game.areYouSure.yesHover) {
          display.hoverRectangle(352, 352, 194, 120)
        } else if (game.areYouSure.noHover) {
          display.hoverRectangle(613, 352, 194, 120)
        }    

    
      } else {

        if (game.settings.xHover) {
          display.hoverRectangle(793, 85, 30, 30)
        } else if (game.settings.musicHover) {
          display.hoverRectangle(700, 110, 86, 96)
        } else if (game.settings.restartLevelHover) {
          display.hoverRectangle(368, 233, 417, 106)
        } else if (game.settings.restartGameHover) {
          display.hoverRectangle(368, 368, 417, 106)
        } else if (game.settings.nightModeHover) {
          display.hoverRectangle(368, 503, 417, 106)
        };

      }

    }

  }
  },

  currentLoopIndex: 0,
  currentFrame: 0,

  animate() {   

  if (display.currentFrame < 6) {
    display.currentFrame ++;
  
    window.requestAnimationFrame(display.animate);
    return;
  };
  
  display.currentFrame = 0;

  let spriteIndex = 0;
  
  
  
  if (banana.attack && banana.xVelocity >= 0) {

    spriteIndex = 5

  } else if (banana.attack && banana.xVelocity < 0) {

    spriteIndex = 3

  } else if (banana.invincible > 0 && banana.xVelocity >= 0) {

    spriteIndex = 4

  } else if (banana.invincible > 0 && banana.xVelocity < 0) {

    spriteIndex = 7

  } else if (banana.xVelocity < .95 && banana.xVelocity >= 0 && banana.yVelocity === 0) { 

    spriteIndex = 0

  } else if (banana.xVelocity < -.95) {

    spriteIndex = 6
    
  } else if (banana.xVelocity < 0) {

    if (banana.yVelocity !== 0) {

      spriteIndex = 6

    } else {

      spriteIndex = 2

    }
    
  } else {

    spriteIndex = 1

  };
  

  display.drawFrame(display.currentLoopIndex, spriteIndex, banana.x, banana.y);

  display.currentLoopIndex ++;

  enemies.currentLoopIndex ++;

  if (display.currentLoopIndex === 4) {
    display.currentLoopIndex = 0;
    banana.attack = false;
  };

  if (enemies.currentLoopIndex === 2) {
    enemies.currentLoopIndex = 0
  };

  if (game.question.display) {
    display.question.draw(game.question.displaycolor)
  };

  if (game.question.yes && game.question.yescountdown > 0) {
    display.question.yesDisplay();
    game.question.yescountdown --;
  } else if (game.question.yes) {
    game.question.yescountdown = 4;
    game.question.yes = false;
  }

  let currentRequest = window.requestAnimationFrame(update);

  game.checkGameOver();

  if (game.over) {
    if (game.gameOver.yesHover) {
      game.gameOver.drawScreen(gameOverYes);
    } else if (game.gameOver.noHover) {
      game.gameOver.drawScreen(gameOverNo);
    } else {
      game.gameOver.drawScreen(screens)
    }
  };

  if (game.levelRestart) {
    game.restart(currentRequest, 'level');
    game.levelRestart = false;
  }; 
  
  if (game.gameRestart) {
    game.restart(currentRequest, 'game')
    game.gameRestart = false;
  };

  },


  instructions: {

    number: 0,

    cooldown: 1,

    text: [],

    read: {},

    present: false,

    writeText(instructions) {
      for (let i = 0; i < instructions.length; i++) {
      c.fillText(instructions[i], this.x + 10, this.y + 20 + 15*i, this.width - 25)
      }
    },

    show(instructions) {
      this.y = banana.top - 130;
      this.width = 170;
      this.height = 120;

      c.font = '12px Trebuchet MS', '12px sans-serif';
      c.fillStyle = '#232c54'; 

      if (banana.xVelocity < 0) {   
        this.x = banana.left - 140; 
        c.drawImage(flippedThoughtBubble, 0, 0, 624, 485, this.x, this.y, this.width, this.height);
        c.fillText('(Spacebar to continue)', this.x + 120, this.y + 110);

      } else {

        this.x = banana.right - 30;
        c.drawImage(thoughtBubble, 0, 0, 624, 485, this.x, this.y, this.width, this.height);
        c.fillText('(Spacebar to continue)', this.x + 90, this.y + 110);

      }

      c.clearRect(this.x + 10, this.y + 10, this.width - 20, this.height - 45)
      
      c.font = '14px Trebuchet MS', '14px sans-serif';
      c.fillStyle = '#291a05'; 
      
      
      if (display.instructions.present) {
        this.writeText(instructions)
      } 

    }
  },

  
  clickable: [[250, 150, 686, 619, 'shopicon'], [143, 8, 686, 619, 'settings']],

  mouseTouch(event) {

      let mouseX = event.pageX - canvas.offsetLeft;
      let mouseY = event.pageY - canvas.offsetTop;
      let clickable = [];

      if (display.shop.view) {
      
        clickable = display.shop.clickable;

      } else if (game.areYouSure.view) {
      
        clickable = game.areYouSure.clickable;

      } else if (game.settings.view) {

        clickable = game.settings.clickable;

      } else if (game.over) {

       clickable = game.gameOver.clickable; 
        
      }
        else {

        clickable = display.clickable;

      }

      for (let i = 0; i < clickable.length; i++) {
      
        if (mouseX < clickable[i][0] && mouseX > clickable[i][1] && mouseY < clickable[i][2] && mouseY > clickable[i][3]
        
        ) {
      
          return (clickable[i][4])

        }
      
      }
  },

  hoverRectangle(xStart, yStart, width, height) {
    c.globalAlpha = 0.5;
    c.fillStyle = '#88001b';
    c.fillRect(xStart, yStart, width, height);
    c.globalAlpha = 1;
  },

  shop: {

    boxes: {
      coordinates: [[113, 97], [439, 97], [758, 97], [113, 402], [439, 402], [758, 402]],
      width: 261,
      height: 199
    },

    clickable: [[1077, 1020, 100, 50, 'shopX'], [374, 113, 296, 97, 'firstBox'], [700, 439, 296, 97, 'secondBox'], [1019, 758, 296, 97, 'thirdBox'], [374, 113, 601, 402, 'fourthBox'], [700, 439, 601, 402, 'fifthBox'], [1019, 758, 601, 402, 'sixthBox'], [700, 440, 650, 600, 'revert']],

    costs: [3, 3, 4, 4, 4, 5],

    bought: [false, false, false, false, false, false],

    showIcon(image) {
      
      c.drawImage(image, 0, 0, 717, 437, 150, 619, 100, 67)

    },

    

    showShop() {

      c.drawImage(shop, 0, 0, 1125, 705, 77, 50, 1000, 600)

    }

  },

  question: {
    box: {
      width: 800,
      height: 500,
      xstart: canvas.width / 2 - 400,
      ystart: canvas.height / 2 - 250,
      textstartx: canvas.width / 2 - 400 + 60,
      textstarty: canvas.height / 2 - 250 + 80,
      coordinates: [canvas.width / 2 - 400, canvas.height / 2 - 250]
      },

    draw(color) {
      c.drawImage(question, this.box.coordinates[0], this.box.coordinates[1], this.box.width, this.box.height)

      c.font = 'bold 28px Trebuchet MS', 'bold 40px sans-serif';
      c.fillStyle = '#000000'; 
      
      for (let i = 0; i < game.question[color].length; i++) {
        c.fillText(game.question[color][i], this.box.textstartx, this.box.textstarty + 50 * i, this.box.width - 120);
      }
    },

    yesDisplay() {
      c.fillStyle = '#FFFFFF';
      c.fillRect(canvas.width / 2 - 30, canvas.height / 2 - 50, 80, 40);
      c.font = 'bold 28px Trebuchet MS', 'bold 40px sans-serif';
      c.fillStyle = '#10a33c'; 
      c.fillText('Yes!', canvas.width / 2 - 20, canvas.height / 2 - 20);
    }
  }
}
  
  /*
  oldWidth: 1152,'
  oldHeight: 648,

  resize() {
    if (window.innerWidth * display.widthRatio >= 800) {
      
    canvas.width = window.innerWidth * display.widthRatio;

    } else {

      canvas.width = 800;

    } 

    canvas.height = canvas.width * display.widthToHeightRatio;

    world.tileHeight = canvas.height / 9;
    world.tileWidth = canvas.width / 16;

    banana.canvasWidth = banana.canvasWidth * (canvas.width / display.oldWidth);
    banana.canvasHeight = banana.canvasHeight * (canvas.height / display.oldHeight);

    banana.oldY = banana.y
    
    banana.x = (banana.x / display.oldWidth) * canvas.width;
    banana.y = (banana.y / display.oldHeight) * canvas.height;

    banana.bottom = banana.y + banana.canvasHeight / 1.35;
    banana.top = banana.y + .4 * banana.canvasHeight;
    banana.left = banana.x + banana.canvasWidth / 4.3;
    banana.right = banana.x + banana.canvasWidth / 1.7;

    display.oldWidth = canvas.width;
    display.oldHeight = canvas.height
  } */


