import { drawBitmapCenteredWithRotation } from './GraphicsCommon';
import { keyHeld_Gas, keyHeld_Reverse, keyHeld_TurnLeft, keyHeld_TurnRight } from './Input';
import { rowColToArrayIndex, trackGrid, TRACK_COLS, TRACK_H, TRACK_ROWS, TRACK_W, TRACK_PLAYERSTART } from './Track';
import { carPic } from './ImageLoading';

export let carX = 75;
export let carY = 75;
export let carSpeed = 0;
export let carAng = 0;

const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;

export const changeCarSpeed = () => {
  carX -= Math.cos(carAng) * carSpeed;
  carY -= Math.sin(carAng) * carSpeed;
  carSpeed *= -0.5;
};

export const carReset = () => {
  for (let eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
    for (let eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
      let arrayIndex = rowColToArrayIndex(eachCol, eachRow);

      if (trackGrid[arrayIndex] === TRACK_PLAYERSTART) {
        trackGrid[arrayIndex] = 0;
        carAng = (-90 * Math.PI) / 180.0;
        carX = eachCol * TRACK_W + TRACK_W / 2;
        carY = eachRow * TRACK_H + TRACK_H / 2;
      } // end of if this track here
    } // end of for each track
  }
};

export const carMove = () => {
  carSpeed *= GROUNDSPEED_DECAY_MULT;

  const SPEED_RANGE = 0.3;
  if (keyHeld_Gas) {
    carSpeed += DRIVE_POWER;
  }
  if (keyHeld_Reverse) {
    carSpeed = carSpeed - REVERSE_POWER <= 0 ? 0 : carSpeed - REVERSE_POWER;
  }
  if (Math.abs(carSpeed) > MIN_SPEED_TO_TURN) {
    if (keyHeld_TurnLeft) {
      carAng -= TURN_RATE;
    }
    if (keyHeld_TurnRight) {
      carAng += TURN_RATE;
    }
  }
  carX += Math.cos(carAng) * carSpeed;
  carY += Math.sin(carAng) * carSpeed;
};

export const carDraw = () => {
  drawBitmapCenteredWithRotation(carPic, carX, carY, carAng);
};
