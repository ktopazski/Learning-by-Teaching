const enemySprites = new Image();
enemySprites.src = 'Images/enemiesSpritesheet.png';

const enemySpritesFlipped = new Image();
enemySpritesFlipped.src = 'Images/enemiesSpritesheetFlipped.png';

const enemySpritesHit = new Image();
enemySpritesHit.src = 'Images/enemiesSpritesheetHIT.png';

const enemySpritesFlippedHit = new Image();
enemySpritesFlippedHit.src = 'Images/enemiesSpritesheetFlippedHIT.png';

const enemies = {

  list: [],

  savedLists: {},

  update() {

    for (let i = 0; i < enemies.list.length; i ++) {

      let enemy = enemies.list[i];

      if (!(enemy.dead)) {
        enemy.oldY = enemy.y;

        if (enemy.forward) {

          enemy.x += enemy.xVelocity;

          if (enemy.hit) {
            enemy.source = enemySpritesFlippedHit;
          } else {
            enemy.source = enemySpritesFlipped;
          }

        } else {
          if (enemy.xVelocity !== enemy.originalXVelocity) {
            enemy.x += enemy.xVelocity;
          } else {
            enemy.x -= enemy.xVelocity;
          };

          if (enemy.hit) {
            enemy.source = enemySpritesHit;
          } else {
            enemy.source = enemySprites;
          }
          
        };

        if (enemy.upward) {
          if (enemy.yVelocity < 0) {
            enemy.y += enemy.yVelocity;
          } else {
            enemy.y -= enemy.yVelocity;
          }
        } else {
          enemy.y += enemy.yVelocity; 
        };
        
        if (enemy.x > enemy.xLimitHigher) {
          enemy.forward = false;
          enemy.xVelocity = enemy.originalXVelocity;
          enemy.x = enemy.xLimitHigher
        } else if (enemy.x < enemy.xLimitLower) {
          enemy.forward = true;
          enemy.xVelocity = enemy.originalXVelocity;
          enemy.x = enemy.xLimitLower
        };

        if (Math.abs(enemy.xVelocity) > enemy.originalXVelocity) {
          if (enemy.xVelocity < 0) {
            enemy.xVelocity ++;
          } else {
            enemy.xVelocity --;
          }
        } else {
          enemy.xVelocity = enemy.originalXVelocity;
        }

        if (enemy.y > enemy.yLimitLower) {
          enemy.upward = true;
          enemy.yVelocity = enemy.originalYVelocity;
          enemy.y = enemy.yLimitLower;
        } else if (enemy.y < enemy.yLimitHigher) {
          enemy.upward = false;
          enemy.yVelocity = enemy.originalYVelocity;
        };

        if (enemy.y < enemy.yLimitLower) {
          if (enemy.originalYVelocity !== 0) {
            enemy.yVelocity = enemy.originalYVelocity;
          } else {
            enemy.yVelocity += enemy.gravity;
          }
        };

        let collisionCoordinates = [...collision.collisionCoordinates];

        let enemycollisionCoordinates = collisionCoordinates.concat(collision.lockCoordinates);

        collision.react(enemycollisionCoordinates, enemy);
      
        enemy.coordinates = [enemy.x, enemy.x + Math.min(...enemy.width), enemy.y, enemy.y + Math.min(...enemy.height), ['enemy']];

      }

    }

  },

  currentLoopIndex: 0,
  flag: 0,

  draw() {

    for (let i = 0; i < enemies.list.length; i ++) {

      let enemy = enemies.list[i];
  
      c.drawImage(enemy.source, enemy.spriteX[this.currentLoopIndex], enemy.spriteY[this.currentLoopIndex], enemy.width[this.currentLoopIndex], enemy.height[this.currentLoopIndex], enemy.x, enemy.y, enemy.width[this.currentLoopIndex], enemy.height[this.currentLoopIndex])
      

    }

  },

  recoil(enemy) {
    
    enemy.health --;

    enemy.xVelocity = Math.sign(banana.xVelocity) * 8;
    
    enemy.yVelocity = -5;

  }
}
  
  

