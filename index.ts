let carPic = document.createElement('img');
let carPicLoaded = false; // image loaded asynchronously

let carX = 75;
let carY = 75;
// let carSpeedX = 5;
// let carSpeedY = 7;
let carSpeed = 2;
let carAng = 0;

const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

// prettier-ignore
let trackGrid = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                  1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                  1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                  1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                  1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                  1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                  1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                  1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                  1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ];

let tracksLeft = 0;

type Canvas = HTMLCanvasElement | null;
type CanvasContext = CanvasRenderingContext2D | null;

let canvas: Canvas = null;
let canvasContext: CanvasContext = null;

let mouseX = 0;
let mouseY = 0;

const updateMousePos = (evt: MouseEvent) => {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;

  // cheat / hack to test car in any position
  // carX = mouseX;
  // carY = mouseY;
  // carSpeedX = 4;
  // carSpeedY = -4;
};

window.onload = () => {
  canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  canvasContext = canvas.getContext('2d');

  let framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  canvas.addEventListener('mousemove', updateMousePos);

  carPic.onload = () => {
    carPicLoaded = true;
  };
  carPic.src = 'player1car.png';

  carReset();
};

const updateAll = () => {
  moveAll();
  drawAll();
};

const carReset = () => {
  for (let eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
    for (let eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
      let arrayIndex = rowColToArrayIndex(eachCol, eachRow);

      if (trackGrid[arrayIndex] === 2) {
        trackGrid[arrayIndex] = 0;
        carX = eachCol * TRACK_W + TRACK_W / 2;
        carY = eachRow * TRACK_H + TRACK_H / 2;
      } // end of if this track here
    } // end of for each track
  }
};

const carMove = () => {
  // carX += carSpeedX;
  // carY += carSpeedY;

  carX += Math.cos(carAng) * carSpeed;
  carY += Math.sin(carAng) * carSpeed;

  carAng += 0.02;

  if (carX < 0 && carSpeedX < 0.0) {
    // Left
    carSpeedX *= -1;
  }
  if (carX > canvas.width && carSpeedX > 0.0) {
    // Right
    carSpeedX *= -1;
  }

  if (carY < 0 && carSpeedY < 0.0) {
    // Top
    carSpeedY *= -1;
  }
  if (carY > canvas.height) {
    // Bottom
    carReset();
  }
};

const isTrackAtColRow = (col: number, row: number) => {
  if (col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS) {
    let trackIndexUnderCoord = rowColToArrayIndex(col, row);
    return trackGrid[trackIndexUnderCoord] === 1;
  } else {
    return false;
  }
};

const carTrackHandling = () => {
  let carTrackCol = Math.floor(carX / TRACK_W);
  let carTrackRow = Math.floor(carY / TRACK_H);
  let trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

  if (carTrackCol >= 0 && carTrackCol < TRACK_COLS && carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {
    if (isTrackAtColRow(carTrackCol, carTrackRow)) {
      let prevCarX = carX - carSpeedX;
      let prevCarY = carY - carSpeedY;
      let prevTrackCol = Math.floor(prevCarX / TRACK_W);
      let prevTrackRow = Math.floor(prevCarY / TRACK_H);

      let bothTestsFailed = true;

      if (prevTrackCol != carTrackCol) {
        if (isTrackAtColRow(prevTrackCol, carTrackRow) == false) {
          carSpeedX *= -1;
          bothTestsFailed = false;
        }
      }
      if (prevTrackRow != carTrackRow) {
        if (isTrackAtColRow(carTrackCol, prevTrackRow) == false) {
          carSpeedY *= -1;
          bothTestsFailed = false;
        }
      }

      if (bothTestsFailed) {
        // armpit case, prevents car from going through
        carSpeedX *= -1;
        carSpeedY *= -1;
      }
    } // end of track found
  } // end of valid col and row
}; // end of carTrackHandling function

const moveAll = () => {
  carMove();

  carTrackHandling();
};

const rowColToArrayIndex = (col: number, row: number) => {
  return col + TRACK_COLS * row;
};

const drawTracks = () => {
  for (let eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
    for (let eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
      let arrayIndex = rowColToArrayIndex(eachCol, eachRow);

      if (trackGrid[arrayIndex] === 1) {
        colorRect(TRACK_W * eachCol, TRACK_H * eachRow, TRACK_W - TRACK_GAP, TRACK_H - TRACK_GAP, 'blue');
      } // end of if this track here
    } // end of for each track
  }
}; // end of drawTracks func

const drawAll = () => {
  colorRect(0, 0, canvas.width, canvas.height, 'black'); // clear screen
  // colorCircle(carX, cariY, 10, 'white'); // draw car

  if (carPicLoaded) {
    drawBitmapCenteredWithRotation(carPic, carX, carY, withAng);
  }

  drawTracks();
};

const drawBitmapCenteredWithRotation = (useBitmap, atX, atY, withAng) => {
  canvasContext.save();
  canvasContext.translate(atX, atY);
  canvasContext.rotate(withAng);
  canvasContext.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);
  canvasContext.restore();
};

const colorText = (showWords: string, textX: number, textY: number, fillColor: string) => {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX, textY);
};

const colorRect = (topLeftX: number, topLeftY: number, boxWidth: number, boxHeight: number, fillColor: string) => {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
};

const colorCircle = (centerX: number, centerY: number, radius: number, fillColor: string): void => {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
};
