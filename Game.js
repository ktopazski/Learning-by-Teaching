 const screens = new Image();
screens.src = 'Images/banana man2.png';

const settingsIcon = new Image();
settingsIcon.src = 'Images/SettingsIcon.png';

const settingsIconClicked = new Image();
settingsIconClicked.src = 'Images/SettingsIconClicked.png';

const settings = new Image();
settings.src = 'Images/Settings.png';

const settingsWithoutMusic = new Image();
settingsWithoutMusic.src = 'Images/SettingsNoMusic.png';

const gameOverYes = new Image();
gameOverYes.src = 'Images/GameOverYes.png';

const gameOverNo = new Image();
gameOverNo.src = 'Images/GameOverNo.png';

const congratulations = new Image();
congratulations.src = 'Images/Congratulations.png'


const game = {

  level: 1,

  music: true,

  requestLevel: async(level, callback) => {
    try {
      let response = await fetch(level);

      if (response.ok) {
        let jsonResponse = await response.json();
      
        callback(jsonResponse)

      } 
    } catch(error) {
      console.log(error)
    }
  },

  onIntro: true,

  intro() {

    c.drawImage(screens, 0, 0, 4804, 2910, 0, 0, canvas.width, canvas.height);
    
    window.removeEventListener('keydown', controller.keyListener);
    window.addEventListener('keydown', controller.keyListener);

  },

  setUp(level) {

    this.doors = level.doors;

    display.instructions.text = level.text;
    display.instructions.present = level.instructionsPresent;

    this.question['Green'] = level.questions.Green !== undefined ? level.questions.Green : undefined
    this.question['Blue'] = level.questions.Blue !== undefined ? level.questions.Blue : undefined
    this.question['Red'] = level.questions.Red !== undefined ? level.questions.Red : undefined
    this.question['Gold'] = level.questions.Gold !== undefined ? level.questions.Gold : undefined

    this.question['Greenanswer'] = level.questions.Greenanswer !== undefined ? level.questions.Greenanswer : undefined
    this.question['Blueanswer'] = level.questions.Blueanswer !== undefined ? level.questions.Blueanswer : undefined
    this.question['Redanswer'] = level.questions.Redanswer !== undefined ? level.questions.Redanswer : undefined
    this.question['Goldanswer'] = level.questions.Goldanswer !== undefined ? level.questions.Goldanswer : undefined

    if (game.reversible || game.goBack) {

      let levelChange = 1;

      if (game.goBack) {
        levelChange = -1;
      };

      if (display.instructions.read[game.level]) {
        display.instructions.present = false;
      };

      world.savedMap[game.level - levelChange] = [...world.map];
      items.savedMap[game.level - levelChange] = [...items.map];

      if (typeof world.savedMap[game.level] === 'undefined') {
        world.map = level.worldMap;
      } else {
        world.map = world.savedMap[game.level]
      };

      if (typeof items.savedMap[game.level] === 'undefined') {
        items.map = level.itemsMap;
      } else {
        items.map = items.savedMap[game.level]
      };

      enemies.savedLists[game.level - levelChange] = _.cloneDeep(enemies.list);

      if (typeof enemies.savedLists[game.level] === 'undefined') {
        enemies.list = level.enemies;
      } else {
        enemies.list = enemies.savedLists[game.level];
      };

    } else {
      world.startMap = [...level.worldMap];
      world.map = level.worldMap;
      items.startMap = [...level.itemsMap];
      items.map = level.itemsMap;
      hud.startCoin = hud.coin;

      enemies.list = level.enemies;
      enemies.savedLists = {};
      game.savedLevel = game.level;
    };

  if (!(game.reversible)) {
    enemies.startList = _.cloneDeep(level.enemies);
  };

  },

  start() {

  if (game.level < 8 || game.level > 14) {
    display.bgColor = '#87cbf5';
  } else {
    display.bgColor = '#87868f';
  }
  
  tilesImg.removeEventListener('load', draw(world, display.bgColor));
  tilesImg.removeEventListener('load', draw(items));
  tilesImg.removeEventListener('load', draw(hudTiles));

  tilesImg.addEventListener('load', draw(world, display.bgColor));
  tilesImg.addEventListener('load', draw(items));
  tilesImg.addEventListener('load', draw(hudTiles));

  collision.collisionCoordinates = [];
  collision.coinCoordinates = [];
  collision.coinIndexes = [];
  collision.keyCoordinates = [];
  collision.keyIndexes = [];
  collision.damagingCoordinates = [];
  collision.lockCoordinates = [];
  collision.lockIndexes = [];
  collision.waterCoordinates = [];
  collision.jumpCoordinates = [];
  collision.jumpIndexes = [];
  collision.climbCoordinates = [];

  collision.create(collision.possibleCollisions, collision.collisionCoordinates, world.map);

  collision.create(collision.coinCollisions, collision.coinCoordinates, items.map, collision.coinIndexes);

  collision.create(collision.keyCollisions, collision.keyCoordinates, items.map,collision.keyIndexes)

  collision.create(collision.possibleDamagingItemTiles, collision.damagingCoordinates, items.map);

  collision.create(collision.possibleDamagingWorldTiles, collision.damagingCoordinates, world.map);

  collision.create(collision.lockCollisions, collision.lockCoordinates, world.map,collision.lockIndexes);

  collision.create(collision.waterCollisions, collision.waterCoordinates, world.map);
  
  collision.create(collision.jumpCollisions, collision.jumpCoordinates, items.map, collision.jumpIndexes);
  
  collision.create(collision.climbCollisions, collision.climbCoordinates, world.map);

  if (!(game.reversible || game.goBack)) {
    hud.keyRed = 0;
    hud.keyBlue = 0;
    hud.keyGreen = 0;
    hud.keyGold = 0;

    display.instructions.number = 0;

    hud.health = 6;
    hud.bubbleTimer = 0;
    hud.bubbleRecoveryTimer = 0;
    hud.bubble = 3;
  };

  hud.coinDisplay();
  hud.healthDisplay();
  hud.keyDisplay();
  hud.bubbleDisplay();

  if (!(game.goBack || game.reversible)) {
    banana.xVelocity = 0;
    banana.yVelocity = 0;
    banana.invincible = 0;
  };

  banana.inWater = banana.climbing = banana.attack = false;

  window.removeEventListener('keydown', controller.keyListener);
  window.removeEventListener('keyup', controller.keyListener);
  canvas.removeEventListener('mousemove', game.hovering);
  canvas.removeEventListener('click', game.clicking);

  window.addEventListener('keydown', controller.keyListener);
  window.addEventListener('keyup', controller.keyListener);
  canvas.addEventListener('mousemove', game.hovering);
  canvas.addEventListener('click', game.clicking);

  game.question.answering = false
  game.question.display = false
 
  /*
  window.addEventListener("resize", display.resize);
  */

  window.requestAnimationFrame(update);

  },

  checkLevelCompletion() {
    for (let i = 0; i < this.doors.length; i ++) {

      if (collision.check(this.doors[i].coordinates, banana)) {

        if (this.doors[i].needKey && hud.keyGold === 1 || !(this.doors[i].needKey)) { 
          this.doors = [this.doors[i]]
          return true;
        } else {
          return false;
        }
      }
    }
  },

  checkNextLevel(currentRequest) {
    if (this.checkLevelCompletion()) {
      window.cancelAnimationFrame(currentRequest);

      if (this.level < 4) {
        if (typeof this.doors[0].spawnX !== 'undefined') {
          banana.x = banana.spawnX = this.doors[0].spawnX;
          banana.y = banana.oldY = banana.spawnY = this.doors[0].spawnY;
        } else {
          if (this.doors[0].up) {
            banana.y = 609.11111111;
          } else if (this.doors[0].down) {
            banana.y = -120
          } else if (this.doors[0].right) {
            banana.x = -27.9069767;
          } else if (this.doors[0].left) {
            banana.x = 1081.41176471;
          }
        };

        this.level = this.doors[0].level;

        this.requestLevel('Levels/Level' + game.level + '.json', (level) => {
    
        this.setUp(level);
        
        this.start();

        })
      } else {

        c.drawImage(congratulations, 0, 0, 4804, 2910, 0, 0, canvas.width, canvas.height)
      }     
    

    }
  },

  clicking(event) {
    let click = display.mouseTouch(event)
    if (click === 'shopicon') {
      display.shop.view = true;
    } else if (click === 'shopX') {
      display.shop.view = false;
    } else if (click === 'revert') {
      display.shop.boxClicked = bananaRegular;
    } else if (click === 'settings') {
      game.settings.view = true;
    } else if (click === 'settingsX') {
      game.settings.view = false;
    } else if (click === 'music') {
      game.music = !(game.music);
    } else if (click === 'restartLevel') {
      game.requestRestartLevel = true;
      game.areYouSure.view = true;
    } else if (click === 'restartGame') {
      game.requestRestartGame = true;
      game.areYouSure.view = true;
    } else if (click === 'nightMode') {
      display.nightMode = !(display.nightMode);
      if (display.nightMode) {
        display.bgColor = '#2A1379';
      } else {
        display.bgColor = '#87cbf5';
      }
    } else if (click === 'yes') {
      if (game.requestRestartLevel) {
        game.levelRestart = true;
        game.requestRestartLevel = false;
      } else {
        game.gameRestart = true;
      };
      game.areYouSure.view = false;
      game.settings.view = false;
    } else if (click === 'no') {
      game.areYouSure.view = false;
    } else if (click === 'yesRestart') {
      hud.health = 6;
      game.levelRestart = true;
    } else if (click === 'noRestart') {
      hud.health = 6;
      game.gameRestart = true;
    }
     else {
      switch(click) {

          case 'firstBox':
            display.shop.boxClick = 0;
            display.shop.boxClicked = bananaGreen;
            break;
          case 'secondBox':
            display.shop.boxClick = 1;
            display.shop.boxClicked = bananaPink;
            break;
          case 'thirdBox':
            display.shop.boxClick = 2;
            display.shop.boxClicked = bananaFire;
            break;
          case 'fourthBox':
            display.shop.boxClick = 3;
            display.shop.boxClicked = bananaWater;
            break;
          case 'fifthBox':
            display.shop.boxClick = 4;
            display.shop.boxClicked = bananaRainbow;
            break;
          case 'sixthBox': 
            display.shop.boxClick = 5;
            display.shop.boxClicked = bananaShadow;
            break;
          default:
            display.shop.boxClick = -1;

    }
    }
  }, 

  hovering(event) {
    let hover = display.mouseTouch(event);

    if (hover === 'shopicon') {
      display.shop.hover = true;
    } else {
      display.shop.hover = false;
    };

    if (hover === 'shopX') {
      display.shop.xHover = true;
    } else {
      display.shop.xHover = false
    };

    if (hover === 'revert') {
      display.shop.revertHover = true;
    } else {
      display.shop.revertHover = false;
    };

    if (hover === 'settings') {
      game.settings.hover = true;
    } else {
      game.settings.hover = false;
    };

    if (hover === 'settingsX') {
      game.settings.xHover = true;
    } else {
      game.settings.xHover = false;
    };

    if (hover === 'music') {
      game.settings.musicHover = true;
    } else {
      game.settings.musicHover = false;
    };

    if (hover === 'restartLevel') {
      game.settings.restartLevelHover = true;
    } else {
      game.settings.restartLevelHover = false;
    };

    if (hover === 'restartGame') {
      game.settings.restartGameHover = true;
    } else {
      game.settings.restartGameHover = false;
    };

    if (hover === 'nightMode') {
      game.settings.nightModeHover = true;
    } else {
      game.settings.nightModeHover = false;
    };

    if (hover === 'yes') {
      game.areYouSure.yesHover = true;
    } else {
      game.areYouSure.yesHover = false;
    };

    if (hover === 'no') {
      game.areYouSure.noHover = true;
    } else {
      game.areYouSure.noHover = false;
    };

    if (hover === 'yesRestart') {
      game.gameOver.yesHover = true;
    } else {
      game.gameOver.yesHover = false;
    };

    if (hover === 'noRestart') {
      game.gameOver.noHover = true;
    } else {
      game.gameOver.noHover = false;
    };
    
    switch(hover) {

      case 'firstBox':
        display.shop.boxHover = 0;
        break;
      case 'secondBox':
        display.shop.boxHover = 1;
        break;
      case 'thirdBox':
        display.shop.boxHover = 2;
        break;
      case 'fourthBox':
        display.shop.boxHover = 3;
        break;
      case 'fifthBox':
        display.shop.boxHover = 4;
        break;
      case 'sixthBox': 
        display.shop.boxHover = 5;
        break;
      default:
        display.shop.boxHover = -1;
    }
    
    },

  gameOver: {

    clickable: [[820, 690, 640, 530, 'yesRestart'], [920, 830, 640, 530, 'noRestart']],

    drawScreen(image) {

      c.drawImage(image, 4887, 0, 4804, 2910, 0, 0, canvas.width, canvas.height);

    }

  },

  checkGameOver() {

    if (hud.health <= 0) {
      
      game.over = true;

    } else {

      game.over = false;
      
    }
  },

  settings: {

    clickable: [[823, 793, 115, 85, 'settingsX'], [788, 700, 207, 110, 'music'], [788, 360, 345, 230, 'restartLevel'], [788, 360, 478, 363, 'restartGame'], [788, 360, 611, 496, 'nightMode']],

    showIcon(image) {

      c.drawImage(image, 0, 0, 717, 437, 8, 619, 135, 67);

    },

    show(image) {

      c.drawImage(image, 0, 0, 1310, 1459, 330, 80, 500, 550)

    }


  },

  restart(request, stage) {

    hud.coin = hud.startCoin;
    world.map = [...world.startMap];
    items.map = [...items.startMap];
    
    window.cancelAnimationFrame(request);

    if (stage === 'level') {
      banana.x = banana.spawnX;
      banana.y = banana.spawnY;
      game.level = game.savedLevel;

      game.requestLevel('Levels/Level' + game.level + '.json', (level) => {
      
        game.setUp(level);
          
        game.start();

      });

    } else {
      banana.x = banana.originalSpawnX;
      banana.y = banana.originalSpawnY;
      game.level = 1;
      game.onIntro = true;
      game.intro();
    }
  },

  areYouSure: {
    clickable: [[547, 352, 472, 352, 'yes'], [807, 613, 472, 352, 'no']]
  },

  question: {
    answering: false,
    display: false,
    displaycolor: '',
    'Green': [],
    'Blue': [],
    'Red': [],
    'Gold': [],
    'Greenanswer' : '',
    'Blueanswer': '',
    'Redanswer': '',
    'Goldanswer': '',
    yes: false,
    yescountdown: 4,

    checkanswer(attempt) {
      if (attempt === this[this.displaycolor + 'answer']) {
        this.yes = true;
        this.display = false;
        this.answering = false;
        hud.coin += 2;
        hud['key' + this.displaycolor] ++;
        hud.keyDisplay()
      } else {
        hud.health -= 1;
      } 
    }

  }
  
}
