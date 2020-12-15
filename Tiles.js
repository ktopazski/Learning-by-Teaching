const tilesImg = new Image();

tilesImg.src = 'Images/tiles_spritesheet.png';

const hudImg = new Image();

hudImg.src = 'Images/hud_spritesheet.png';

const itemsImg = new Image();

itemsImg.src = 'Images/items_spritesheet.png';



const world = {
  
  rows: 9,
  cols: 16,

  tileSheet: {

  tileCols: 13,

  tileHeight: 72,
  tileWidth: 72,

  },

  tileHeight: (canvas.height - display.topGap) / 9,
  tileWidth: canvas.width / 16,

  image: tilesImg,

  savedMap: [],
  
};

const hudTiles = {

  map: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 26, -1, -1, 
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],

  tileSheet: {

    tileCols: 5,

    tileHeight: 48,
    tileWidth: 53

  },

  image: hudImg

};

const items = {

  tileSheet: {

    tileCols: 8,

    tileHeight: 72,
    tileWidth: 70

  },
  
  image: itemsImg,

  savedMap: [],

};


const draw = (tileObject, fillStyle) => {

  if (tileObject === world) {

    c.fillStyle = fillStyle;

    c.fillRect(0, 0, canvas.width, canvas.height)};

  for (let i = 0; i < tileObject.map.length; i++) {
    
    let spriteIndex = tileObject.map[i];

    let cropLeft = cropRight = cropUp = cropDown = 0;

    if (tileObject === world) {

      cropLeft = 2;
      cropRight = 2 * cropLeft;
      cropUp = 2;
      cropDown = 2 * cropUp;
      
      if (spriteIndex === 134 || spriteIndex === 141 || spriteIndex === 142 || spriteIndex === 3 || spriteIndex === 104 || spriteIndex === 86 || spriteIndex === 28 || spriteIndex === 120) {
        cropUp = 0;
        cropLeft = 0;
        cropRight = 2;
        cropDown = 2;
      } else if (spriteIndex === 137 || spriteIndex === 97 || spriteIndex === 71 || spriteIndex === 105 || spriteIndex % 13 === 0 || spriteIndex === 84) {
        cropLeft = 0;
        cropRight = 2;
        cropUp = 0;
        cropDown = 2;
      } else if (spriteIndex === 167) {
        cropLeft = cropUp = 0;
        cropDown = 5;
        cropRight = 24;
      } else if (spriteIndex === 154) {
        cropLeft = 0;
        cropRight = 24;
        cropUp = cropDown = 35;
      } else if (spriteIndex === 35) {
        cropLeft = 0;
        cropRight = 2;
      } else if (spriteIndex === 73 || spriteIndex === 60 || spriteIndex === 47 || spriteIndex === 15 || spriteIndex === 2 || spriteIndex === 157 || spriteIndex === 86 || spriteIndex === 107 || spriteIndex === 94 || spriteIndex === 81) {
        cropLeft = 0;
        cropRight = 2;
        cropUp = 0;
      } else if (spriteIndex === 46 || spriteIndex === 110) {
        cropLeft = cropUp = 0;
        cropRight = cropDown = 3;
      } else if (spriteIndex === 98 || spriteIndex === 111 || spriteIndex === 79 || spriteIndex === 124 || spriteIndex === 112 || spriteIndex === 164 ||spriteIndex === 54 || spriteIndex === 80 || spriteIndex === 145 || spriteIndex === 166) {
        cropLeft = cropUp = 0;
        cropRight = 2;
      } else if (spriteIndex === 8 || spriteIndex === 32 || spriteIndex === 42) {
        cropLeft = cropUp = 0;
      } else if (spriteIndex === 163 || spriteIndex === 131 || spriteIndex === 29) {
        cropLeft = 1;
        cropUp = 0;
        cropRight = 3;
      } else if (spriteIndex === 45 || spriteIndex === 68) {
        cropUp = 0;
      } else if (spriteIndex === 144 || spriteIndex === 55) {
        cropLeft = cropUp = 0;
      } 
    } else if (tileObject === items) {
      if (spriteIndex === 0 || spriteIndex === 8 || spriteIndex === 16) {
        cropRight = 8;
      } else if (spriteIndex === 25) {
        cropLeft = 6;
        cropRight = 12;
      }
    }

    if (spriteIndex !== -1) {
      let xGap = 0;
      let yGap = 0;
      let canvasWidth = world.tileWidth;
      let canvasHeight = world.tileHeight;
      
      let spriteX = (spriteIndex % tileObject.tileSheet.tileCols) * tileObject.tileSheet.tileWidth + cropLeft;

      let spriteY = (Math.floor(spriteIndex/tileObject.tileSheet.tileCols)) * tileObject.tileSheet.tileHeight + cropUp;

      let canvasX = (i % world.cols) * world.tileWidth; 

      let canvasY = (Math.floor(i/world.cols)) * world.tileHeight + display.topGap;

      if (tileObject === hudTiles) {
        yGap = -20;

        if (spriteIndex === 0 || spriteIndex === 5 || spriteIndex === 10) {
          xGap = 40;
        } else if (spriteIndex === 27 || spriteIndex === 28) {
          xGap = 50
        }

        canvasWidth = 45;
        canvasHeight = 40;
        
      } else { 
        if (spriteIndex === 167 || spriteIndex === 154) {
          canvasWidth = 60;
        }
      };

      c.drawImage(tileObject.image, spriteX, spriteY, tileObject.tileSheet.tileWidth - cropRight, tileObject.tileSheet.tileHeight - cropDown, canvasX + xGap, canvasY + yGap, canvasWidth, canvasHeight)
    }
    
  }

}



 

