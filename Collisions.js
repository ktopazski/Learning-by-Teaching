const collision = {

  possibleCollisions: [143, 73, 60, 47, 0, 98, 156, 3, 111, 8, 34, 112, 164, 99,125, 138, 163, 21, 34, 9, 86, 52, 39, 91, 26, 134, 106, 79, 32, 131, 15, 2, 157, 28, 144, 45, 117, 137, 80, 54, 145, 166, 68, 55, 42, 29, 107, 94, 81, 120],

  collisionCoordinates: [],

  coinCollisions: [44],
  coinCoordinates: [],
  coinIndexes: [],

  keyCollisions: [2, 18, 49, 41],
  keyCoordinates: [],
  keyIndexes: [],

  possibleDamagingWorldTiles: [149, 7],
  possibleDamagingItemTiles: [5],
  damagingCoordinates: [],

  lockCollisions: [105, 71, 97],
  lockCoordinates: [],
  lockIndexes: [],

  waterCollisions: [46, 110, 123, 149, 7],
  waterCoordinates: [],

  jumpCollisions: [38],
  jumpCoordinates: [],
  jumpIndexes: [],

  climbCollisions: [161],
  climbCoordinates: [],


  check(coordinates, sprite, damageWhileAttacking) {
      let type = coordinates[4];
      
      let topGap = 0;
      let bottomGap = 0;
      let leftGap = 0;
      let rightGap = 0;
      let rampCondition = true;
      let right = banana.right;
      let left = banana.left;
      let bottom = banana.bottom;
      let top = banana.top;

      if (sprite !== banana) {
        bottom = sprite.y + Math.min(...sprite.height);
        top = sprite.y;
        left = sprite.x;
        right = sprite.x + Math.min(...sprite.width);
        topGap = 1;
        bottomGap = 1;
      }

      if (typeof type !== 'undefined') {
        if (type.includes('halfDown')) {
          topGap = 36;
        } else if (type.includes('logs')) {
          topGap = 45;
        } else if (type.includes('jump')) {
          topGap = 15;
        } else if (type.includes('halfUp')) {
          bottomGap = 30;
        } else if (type.includes('rope')) {
          leftGap = rightGap = 30;
        } else if (type.includes('ramp')) {
          rampCondition = (bottom - coordinates[2]) / (left - coordinates[0]) >= 1;
        } else if (type.includes('rightRamp')) {
          rampCondition = (bottom - coordinates[3]) / (right - coordinates[0]) >= -1;
        } else if (type.includes('enemy') && banana.attack && sprite === banana)
        {

          if (banana.xVelocity >= 0) {

            if (damageWhileAttacking) {

              right = banana.right - 50;

            } else {

              right = banana.right + 20;

            }
          } else {

            if (!damageWhileAttacking) { 

              left = banana.left - 20;

            }
          }
          
        }
      }
   
    return (right >= coordinates[0] + leftGap && left <= coordinates[1] - rightGap && bottom >= coordinates[2] + topGap && top < coordinates[3] - bottomGap && rampCondition)
    
  },


  create(collisionList, coordinates, map, indexes, enemySpawn) {
    for (i = 0; i < map.length; i++) {

      if (collisionList.includes(map[i])) {

        let xCoordStart = (i % world.cols) * world.tileSheet.tileWidth;

        let xCoordEnd = xCoordStart + world.tileSheet.tileWidth;

        let yCoordStart = (Math.floor(i / world.cols)) * world.tileSheet.tileHeight + display.topGap;

        let yCoordEnd = yCoordStart + world.tileSheet.tileHeight;

        let type = [];
        
        if (collisionList === this.possibleDamagingItemTiles && map[i] === 5) {
          type.push('halfDown');
        } else if (collisionList === this.waterCollisions) {
          if (map[i] === 7 || map[i] === 149) {
            type.push('lava');
          }
        } else {
          if (map[i] === 110 || map[i] === 123 || map[i] === 149) {
            type.push('halfDown');
          } else if (map[i] === 73 || map[i] === 60 || map[i] === 47 || map[i] === 86 || map[i] === 15 || map[i] === 2 || map[i] === 157 || map[i] === 28 || map[i] === 107 || map[i] === 94 || map[i] === 81 || map[i] === 120) {
            type.push('halfUp');
          } else if (map[i] === 134) {
            type.push('logs');
          } else if (map[i] === 161) {
            type.push('rope');
          };
        }

        if (collisionList === this.coinCollisions || collisionList === this.keyCollisions || collisionList === this.lockCollisions || collisionList === this.jumpCollisions || enemySpawn) {
    
          indexes.push(i);

          if (map === items.map) {
            switch (map[i]) {
              case 2:
                type.push('keyBlue');
                break;
              case 18:
                type.push('keyGreen');
                break;
              case 38:
                type.push('jump');
                break;
              case 41:
                type.push('keyGold');
                break;
              case 44:
                type.push('coin');
                break;
              case 49:
                type.push('keyRed');
                break;
            }
          } else {
            switch (map[i]) {
              case 105:
                type.push('lockGreen');
                break;
              case 71:
                type.push('lockRed');
                break;
              case 97:
                type.push('lockBlue');
                break;
            }
          }  

        } else {
          if (map === world.map) {
            if (map[i] === 32 || map[i] === 8 || map[i] === 42) {
              type.push('ramp');
            } else if (map[i] === 45 || map[i] === 68) {
              type.push('rightRamp')
            }
          }
        } 
      
        coordinates.push([xCoordStart, xCoordEnd, yCoordStart, yCoordEnd, type])

      }
    }
  },

  verticalCollisions(coordinates, i, sprite) {
    
    let bottomGap = 0;

    if (coordinates[i][4].includes('halfUp')) {
      bottomGap = 30;
    };

    let topHeight = .2 * banana.canvasHeight;

    if (sprite !== banana) {
      topHeight = 0;
      sprite.yVelocity = sprite.originalYVelocity;
      sprite.upward = !(sprite.upward)
    };

    sprite.y = coordinates[i][3] - topHeight - bottomGap;

    if (sprite === banana) {

      banana.bottom = banana.y + banana.canvasHeight / 1.35 - bottomGap;

      banana.top = banana.y + .2 * banana.canvasHeight - bottomGap;

    }

    sprite.yVelocity = 0.01;

  },

  horizontalCollisions(coordinates, i, sprite) {

    let left = banana.left;
    let width = banana.canvasWidth / 1.7;
    let leftWidth = banana.canvasWidth / 4.3;

    if (sprite !== banana) {
      left = sprite.x;
      width = Math.min(...sprite.width);
      leftWidth = 0;
      sprite.forward = !(sprite.forward);
    }

    if (left < coordinates[i][0]) {

      sprite.x = coordinates[i][0] - width;

      if (sprite === banana) {

        banana.left = banana.x + banana.canvasWidth / 4.3;

        banana.right = banana.x + banana.canvasWidth / 1.7;

      }

    } else {

      sprite.x = coordinates[i][1] - leftWidth;

      if (sprite === banana) {

        banana.left = banana.x + banana.canvasWidth / 4.3;

        banana.right = banana.x + banana.canvasWidth / 1.7;

      }
    };

  },

  topCollisions(coordinates, sprite) {
    let left = banana.left;
    let right = banana.right;
    let height = banana.canvasHeight / 1.35;
    sprite.yVelocity = 0;
    let type = coordinates[4];
    let leftGap = 10;
    let rightGap = 10;

    if (sprite !== banana) {
      left = sprite.x;
      right = sprite.x + Math.min(...sprite.width);
      leftGap = 9;
      height = Math.min(...sprite.height);
      sprite.yVelocity = sprite.originalYVelocity;
      sprite.upward = !(sprite.upward);
    };
  
    if (type.includes('ramp')) {
      if (sprite.xVelocity < 0) {
        sprite.y = left - coordinates[0] + coordinates[2] - height;
      } else {
        sprite.y = left - coordinates[0] + coordinates[2] - height + leftGap;
      }
    } else if (type.includes('rightRamp')) {
      if (sprite.xVelocity < 0) {
        if (right > coordinates[1]) {
          sprite.y = coordinates[2] - height;
        } else {
          sprite.y = coordinates[0] - right + coordinates[3] - height + rightGap;
        }
      } else {
        if (right > coordinates[1] - 5) {
          sprite.y = coordinates[2] - height;
        } else {
          sprite.y = coordinates[0] - right + coordinates[3] - height;
        }
      }
    } else if (type.includes('logs')) {
      sprite.y = coordinates[2] - height + 45;
    } else {
      sprite.y = coordinates[2] - height;
    };

    if (sprite === banana) {

      banana.bottom = banana.y + banana.canvasHeight / 1.35

      banana.top = banana.y + .2 * banana.canvasHeight;

    };
  },

  react(coordinates, sprite) {

    let enemy = false;
    let oldY = banana.oldY;
    let height = banana.canvasHeight / 1.35;
    let topHeight = .2 * banana.canvasHeight;

    if (sprite !== banana) {
      oldY = sprite.oldY;
      height = Math.min(...sprite.height);
      topHeight = 0;
      enemy = true;
    };
    
    for (let i = 0; i < coordinates.length; i++) {
      let type = coordinates[i][4];

      if (typeof type !== 'undefined') {
        if (this.check(coordinates[i], sprite)) {
          if (oldY + topHeight >= coordinates[i][3] || (type.includes('halfUp') && oldY + topHeight >= coordinates[i][3] - 30)) {
              
            this.verticalCollisions(coordinates, i, sprite);

          } else if (type.includes('ramp') || type.includes('rightRamp') || oldY + height <= coordinates[i][2] || (type.includes('logs') && oldY + height <= coordinates[i][2] + 45)) {

            this.topCollisions(coordinates[i], sprite);
            
          } else {

            this.horizontalCollisions(coordinates, i, sprite);

          } 
        }
      }
    };
  },

  checkDisappear(coordinates) {

    for (i = 0; i < coordinates.length; i ++) {
      if (this.check(coordinates[i], banana)) {
        return i
      }
    }
    
  },

  makeDisappear(coordinates, i, indexes, map) {
    let type = coordinates[i][4];

    if (!(game.level === 1 && display.instructions.number < 4 && type.includes('keyGold'))) {

      map[indexes[i]] = -1;

      coordinates[i] = [];

      if (type.includes('coin')) {
        
        if (game.level === 1 && display.instructions.number === 1) {
          display.instructions.number ++;
        }

        hud.coin ++;


      } else if (type.includes('keyGold') || type.includes('keyBlue') || type.includes('keyRed') || type.includes('keyGreen')) {
        game.question.display = true;
        game.question.answering = true;

        if (type.includes('keyGreen')) {
          game.question.displaycolor = 'Green';
        } else if (type.includes('keyBlue')) {
          game.question.displaycolor = 'Blue';
        } else if (type.includes('keyRed')) {
          game.question.displaycolor = 'Red';
        } else if (type.includes('keyGold')) {
          game.question.displaycolor = 'Gold';
        }

        hud.keyDisplay()

      }
    }
  },

  checkDamage() {

    banana.damageQueue = false;

    if (banana.invincible > 0) {

      banana.invincible --;

      return false;

    } else {

      for (let i = 0; i < this.damagingCoordinates.length; i++) {
     
        if (this.check(this.damagingCoordinates[i], banana)) {

          banana.damageQueue = true;

        } 
      };

      for (let i = 0; i < enemies.list.length; i++) {

        let enemy = enemies.list[i];

        if (this.check(enemy.coordinates, banana, true) && !(enemy.dead)) {
          
          banana.damageQueue = true;
          
        }
      };

      if (banana.damageQueue) {
        hud.health --;
        banana.invincible = 8;
      };

    }
  },

  checkLock(coordinates, indexes) {

    for (let i = 0; i < coordinates.length; i ++) {
      let type = coordinates[i][4];

      if (typeof type !== 'undefined') {

        if (this.check(coordinates[i], banana)) {

          if (type.includes('lockGreen')) {

            if (hud.keyGreen > 0) {
              hud.keyGreen --;
              c.fillStyle = '#68de70';
              c.fillRect(0, 0, canvas.width, canvas.height);
              this.makeDisappear(this.lockCoordinates, i, this.lockIndexes, world.map);
              hud.locks --;
            } else {
              this.react(coordinates, banana)
            };
          
          } else if (type.includes('lockRed')) {

            if (hud.keyRed > 0) {
              hud.keyRed --;
              c.fillStyle = '#de7668';
              c.fillRect(0, 0, canvas.width, canvas.height);
              this.makeDisappear(this.lockCoordinates, i, this.lockIndexes, world.map);
            } else {
              this.react(coordinates, banana)
            };

          } else if (type.includes('lockBlue')) {

            if (hud.keyBlue > 0) {
              hud.keyBlue --;
              c.fillStyle = '#40abed';
              c.fillRect(0, 0, canvas.width, canvas.height);
              this.makeDisappear(this.lockCoordinates, i, this.lockIndexes, world.map);
              hud.locks --;
            } else {
              this.react(coordinates, banana)
            };
            
          }
        }
      }

      hud.keyDisplay()

    } 
  },

  checkWater(coordinates) {

    banana.waterQueue = false;

    for (let i = 0; i < coordinates.length; i ++) {
      if (this.check(coordinates[i], banana)) {
        banana.waterQueue = true;
        if (coordinates[i][4].includes('lava')) {
          banana.lava = true;
        };
      };
    };

    if (banana.waterQueue) {
      banana.inWater = true;

      if (!banana.lava) {
        hud.bubbleRecoveryTimer = 0;
        hud.bubbleTimer ++;
        hud.bubbleDamage();
        hud.bubbleCalculate(hud.bubbleTimer);
      };

    } else {
      banana.inWater = false;
      hud.bubbleTimer = 0;

      if (hud.bubble < 3) {
        hud.bubbleRecoveryTimer ++;
        hud.bubbleCalculate(hud.bubbleRecoveryTimer);
      }
    }
  },

  checkJump(coordinates, indexes) {
    
    for (let i = 0; i < coordinates.length; i ++) {
      if (this.check(coordinates[i], banana)) {
        
        banana.yVelocity = -35;
        items.map[indexes[i]] = 30;
      

        setTimeout(() => {items.map[indexes[i]] = 38}, 500)
      }
    }
  },

  checkClimb(coordinates) {
    banana.climbingQueue = false;

    for (let i = 0; i < coordinates.length; i ++) {
      if (this.check(coordinates[i], banana)) {
        banana.climbingQueue = true;
      };
    };

    if (banana.climbingQueue) {
      banana.climbing = true;
    } else {
      banana.climbing = false;
    };
  },

  checkAttack() {

    if (banana.attack) {

    for (let i = 0; i < enemies.list.length; i ++) {

      let enemy = enemies.list[i];

      if (this.check(enemy.coordinates, banana)) {

        enemy.hit = true;
       
        setTimeout(() => {enemy.hit = false}, 500);

        enemies.recoil(enemy);

        if (enemy.health === 0) {

          enemy.dead = true;

          if (enemy.name !== 'demon') {
            enemy.y = enemy.yLimitLower + Math.min(...enemy.height) - Math.min(...enemy.deadHeight);
          };
          
          enemy.spriteX = enemy.spriteXDead;
          enemy.spriteY = enemy.spriteYDead;
          enemy.width = enemy.deadWidth;
          enemy.height = enemy.deadHeight;
          if (enemy.deathSpawn) {
            
            let itemLocationX = Math.round(enemy.x / world.tileWidth);
            let itemLocationY = Math.floor((enemy.y - display.topGap) / world.tileHeight);
            let itemLocation = itemLocationX + itemLocationY * world.cols;  
            items.map[itemLocation] = enemy.itemIndex;

            if (enemy.spawnType === 'key') {
              collision.create([enemy.itemIndex], collision.keyCoordinates, items.map, collision.keyIndexes, true);  
            } else {
              collision.create([enemy.itemIndex], collision.coinCoordinates, items.map, collision.coinIndexes, true);
            }
          }
          
        }
        }
      }
    }
  }
}



