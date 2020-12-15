const banana = {
    tileWidth: 34,
    tileHeight: 32,
    canvasWidth: 120 * (canvas.width / 1152),
    canvasHeight: 120 * ((canvas.height - display.topGap) / 648),
    x: - (120 * (canvas.width / 1152)) / 4.3,
    spawnX: - (120 * (canvas.width / 1152)) / 4.3,
    originalSpawnX: - (120 * (canvas.width / 1152)) / 4.3,
    xVelocity: 0,
    y: 7 * world.tileHeight - (120 * ((canvas.height - display.topGap) / 648)) / 1.35 + display.topGap,
    oldY: 7 * world.tileHeight - (120 * ((canvas.height - display.topGap) / 648)) / 1.35 + display.topGap,
    spawnY: 7 * world.tileHeight - (120 * ((canvas.height - display.topGap) / 648)) / 1.35 + display.topGap,
    originalSpawnY: 7 * world.tileHeight - (120 * ((canvas.height - display.topGap) / 648)) / 1.35 + display.topGap,
    yVelocity: 0,
    gravity: 3,
    friction: .7,
    invincible: 0,
    top: - (120 * ((canvas.height - display.topGap) / 648))/ 1.35 + .2 * (120 * ((canvas.height - display.topGap) / 648)) + display.topGap,
    bottom: 7 * world.tileHeight + display.topGap,
    left: 0,
    right: (120 * (canvas.width / 1152)) / 4.3 + (120 * (canvas.width / 1152)) / 1.7,
    inWater: false,
    climbing: false,
    attack: false,
};

const controller = {

  left: false,
  right: false,
  up: false,

  keyListener(event) {
    let keyState = (event.type == 'keydown')? true : false;  
    switch(event.keyCode) {

      case 37: 
        controller.left = keyState;
        break;
      case 38:
        controller.up = keyState;
        break;
      case 39:
        controller.right = keyState;
        break; 
      case 32:
        if (game.onIntro) {
    
          game.onIntro = false;
          
          game.requestLevel('Levels/Level' + game.level + '.json', (level) => {
            
          game.setUp(level);
          
          game.start();
          
        })

        } else if (display.instructions.text[display.instructions.number + 1] !== undefined && display.instructions.cooldown <= 0) {
        
          display.instructions.number ++; 
          display.instructions.cooldown = 1

        } else if (display.instructions.cooldown > 0) {

          display.instructions.cooldown --;

        } else if (display.instructions.text[display.instructions.number + 1] === undefined) {
    
          display.instructions.present = false;

          if (game.reversible || game.goBack) {
            display.instructions.read[game.level] = true;
          };

        };

        break;

      case 65:
        if (game.question.answering) {
          game.question.checkanswer('a')
        } 
        break;

      case 66:
        if (game.question.answering) {
          game.question.checkanswer('b')
        };
        break;
      
      case 67:
        if (game.question.answering) {
          game.question.checkanswer('c')
        };
        break;
      
      case 68:
        if (game.question.answering) {
          game.question.checkanswer('d')
        };
        break;
      
    }

  },
 
};

const update = () => {
    

    if (controller.up && (banana.yVelocity === 0 || banana.inWater || banana.climbing)) {

      banana.yVelocity = -20

    };

    if (controller.left) {
      
      banana.xVelocity -= 6;

    };

    if (controller.right) {

      banana.xVelocity += 6;

    };

    banana.x += banana.xVelocity;
    banana.oldY = banana.y;
    banana.y += banana.yVelocity;
  

    banana.xVelocity *= banana.friction;

    
    banana.yVelocity += banana.gravity;
  
    
    banana.bottom = banana.y + banana.canvasHeight / 1.35;
    banana.top = banana.y + .2 * banana.canvasHeight;
    banana.left = banana.x + banana.canvasWidth / 4.3;
    banana.right = banana.x + banana.canvasWidth / 1.7;
    
    if (banana.bottom >= world.rows * world.tileHeight + display.topGap) {
      if (!(game.checkLevelCompletion())) {
        
        banana.y = world.rows * world.tileHeight + display.topGap - banana.canvasHeight / 1.35;

        banana.yVelocity = 0;

      } 
    };

    if (banana.left < 0 || banana.right > canvas.width) {
      if (!(game.checkLevelCompletion())) {

        if (banana.left < 0) {
          banana.x = - banana.canvasWidth / 4.3;
        } else {
          banana.x = canvas.width - banana.canvasWidth / 1.7;
        } 
        
      }
    };
     

    banana.bottom = banana.y + banana.canvasHeight / 1.35;
    banana.top = banana.y + .2 * banana.canvasHeight;
    banana.left = banana.x + banana.canvasWidth / 4.3;
    banana.right = banana.x + banana.canvasWidth / 1.7;
   
  
  enemies.update();

  collision.checkLock(collision.lockCoordinates, collision.lockIndexes);

  collision.react(collision.collisionCoordinates, banana);

  if (typeof collision.checkDisappear(collision.keyCoordinates) !== 'undefined') {
    collision.makeDisappear(collision.keyCoordinates, collision.checkDisappear(collision.keyCoordinates), collision.keyIndexes, items.map);
  }

  if (typeof collision.checkDisappear(collision.coinCoordinates) !== 'undefined') {
    collision.makeDisappear(collision.coinCoordinates, collision.checkDisappear(collision.coinCoordinates), collision.coinIndexes, items.map)
  }

  collision.checkDamage(); 

  collision.checkAttack();

  collision.checkWater(collision.waterCoordinates);
  
  collision.checkJump(collision.jumpCoordinates, collision.jumpIndexes);

  collision.checkClimb(collision.climbCoordinates);

  let currentRequest = window.requestAnimationFrame(display.animate);

  game.checkNextLevel(currentRequest);


  };



 