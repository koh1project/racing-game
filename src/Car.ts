import { drawBitmapCenteredWithRotation } from './GraphicsCommon';
import { keyHeld_Gas, keyHeld_Reverse, keyHeld_TurnLeft, keyHeld_TurnRight } from './Input';
import { rowColToArrayIndex, trackGrid, TRACK_COLS, TRACK_H, TRACK_ROWS, TRACK_W } from './Track';

export let carPic = document.createElement('img');
let carPicLoaded = false; // image loaded asynchronously

export let carX = 75;
export let carY = 75;
export let carSpeed = 0;
export let carAng = 0;

export const changeCarSpeed = () => {
  carX -= Math.cos(carAng) * carSpeed;
  carY -= Math.sin(carAng) * carSpeed;
  carSpeed *= -0.5;
};

export const carReset = () => {
  for (let eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
    for (let eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
      let arrayIndex = rowColToArrayIndex(eachCol, eachRow);

      if (trackGrid[arrayIndex] === 2) {
        trackGrid[arrayIndex] = 0;
        carAng = (-90 * Math.PI) / 180.0;
        carX = eachCol * TRACK_W + TRACK_W / 2;
        carY = eachRow * TRACK_H + TRACK_H / 2;
      } // end of if this track here
    } // end of for each track
  }
};

export const carMove = () => {
  carSpeed *= 0.97;

  const SPEED_RANGE = 0.3;
  if (keyHeld_Gas) {
    carSpeed += SPEED_RANGE;
  }
  if (keyHeld_Reverse) {
    carSpeed = carSpeed - SPEED_RANGE <= 0 ? 0 : carSpeed - SPEED_RANGE;
  }
  if (keyHeld_TurnLeft) {
    carAng += 0.04;
  }
  if (keyHeld_TurnRight) {
    carAng -= 0.04;
  }

  carX += Math.cos(carAng) * carSpeed;
  carY += Math.sin(carAng) * carSpeed;
};

export const carImageLoad = () => {
  carPic.onload = function () {
    carPicLoaded = true;
  };
  carPic.src = './images/player1car.png';
};

export const carDraw = () => {
  if (carPicLoaded) {
    drawBitmapCenteredWithRotation(carPic, carX, carY, carAng);
  }
};
