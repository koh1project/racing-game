let ballX = 75;
let ballY = 75;
let ballSpeedX = 5;
let ballSpeedY = 7;

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

let canvas, canvasContext;

let mouseX = 0;
let mouseY = 0;

const updateMousePos = (evt: MouseEvent) => {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;

  // cheat / hack to test ball in any position
  // ballX = mouseX;
  // ballY = mouseY;
  // ballSpeedX = 4;
  // ballSpeedY = -4;
};

window.onload = () => {
  canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  canvasContext = canvas.getContext('2d');

  let framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  canvas.addEventListener('mousemove', updateMousePos);

  ballReset();
};

const updateAll = () => {
  // moveAll();
  drawAll();
};

const ballReset = () => {
  for (let eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
    for (let eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
      let arrayIndex = rowColToArrayIndex(eachCol, eachRow);

      if (trackGrid[arrayIndex] === 2) {
        trackGrid[arrayIndex] = 0;
        ballX = eachCol * TRACK_W + TRACK_W / 2;
        ballY = eachRow * TRACK_H + TRACK_H / 2;
      } // end of if this track here
    } // end of for each track
  }
};

const ballMove = () => {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX < 0 && ballSpeedX < 0.0) {
    // Left
    ballSpeedX *= -1;
  }
  if (ballX > canvas.width && ballSpeedX > 0.0) {
    // Right
    ballSpeedX *= -1;
  }

  if (ballY < 0 && ballSpeedY < 0.0) {
    // Top
    ballSpeedY *= -1;
  }
  if (ballY > canvas.height) {
    // Bottom
    ballReset();
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

const ballTrackHandling = () => {
  let ballTrackCol = Math.floor(ballX / TRACK_W);
  let ballTrackRow = Math.floor(ballY / TRACK_H);
  let trackIndexUnderBall = rowColToArrayIndex(ballTrackCol, ballTrackRow);

  if (ballTrackCol >= 0 && ballTrackCol < TRACK_COLS && ballTrackRow >= 0 && ballTrackRow < TRACK_ROWS) {
    if (isTrackAtColRow(ballTrackCol, ballTrackRow)) {
      let prevBallX = ballX - ballSpeedX;
      let prevBallY = ballY - ballSpeedY;
      let prevTrackCol = Math.floor(prevBallX / TRACK_W);
      let prevTrackRow = Math.floor(prevBallY / TRACK_H);

      let bothTestsFailed = true;

      if (prevTrackCol != ballTrackCol) {
        if (isTrackAtColRow(prevTrackCol, ballTrackRow) == false) {
          ballSpeedX *= -1;
          bothTestsFailed = false;
        }
      }
      if (prevTrackRow != ballTrackRow) {
        if (isTrackAtColRow(ballTrackCol, prevTrackRow) == false) {
          ballSpeedY *= -1;
          bothTestsFailed = false;
        }
      }

      if (bothTestsFailed) {
        // armpit case, prevents ball from going through
        ballSpeedX *= -1;
        ballSpeedY *= -1;
      }
    } // end of track found
  } // end of valid col and row
}; // end of ballTrackHandling function

const moveAll = () => {
  ballMove();

  ballTrackHandling();
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
  colorCircle(ballX, ballY, 10, 'white'); // draw ball

  drawTracks();
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
