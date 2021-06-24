import { drawBitmapCenteredWithRotation } from './GraphicsCommon';
import {
  rowColToArrayIndex,
  trackGrid,
  TRACK_COLS,
  TRACK_H,
  TRACK_ROWS,
  TRACK_W,
  TRACK_PLAYERSTART,
  carTrackHandling,
  TRACK_ROAD,
} from './Track';

const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;

export class Car {
  public x: number;
  public y: number;
  public speed: number;
  public ang: number;
  public myCarPic: HTMLImageElement;

  keyHeld_Gas: boolean;
  keyHeld_Reverse: boolean;
  keyHeld_TurnLeft: boolean;
  keyHeld_TurnRight: boolean;

  controlKeyUp: number;
  controlKeyRight: number;
  controlKeyDown: number;
  controlKeyLeft: number;

  constructor() {
    this.x = 75;
    this.y = 75;
    this.speed = 0;
    this.ang = 0;

    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;

  
  }

  setUpInput = (upKey:number, rightKey: number, downKey: number, leftKey: number) => {
    this.controlKeyUp = upKey;
    this.controlKeyRight = rightKey;
    this.controlKeyDown = downKey;
    this.controlKeyLeft = leftKey;
  }

  changeCarSpeed = () => {
    this.x -= Math.cos(this.ang) * this.speed;
    this.y -= Math.sin(this.ang) * this.speed;
    this.speed *= -0.5;
  };

  carReset = (image: HTMLImageElement) => {
    this.myCarPic = image;
    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
      for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
        var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
        if (trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
          trackGrid[arrayIndex] = TRACK_ROAD;
          this.ang = -Math.PI / 2;
          this.x = eachCol * TRACK_W + TRACK_W / 2;
          this.y = eachRow * TRACK_H + TRACK_H / 2;
          return;
        } // end of player start if
      } // end of col for
    } // end of row for
  };

  carMove = () => {
    this.speed *= GROUNDSPEED_DECAY_MULT;

    const SPEED_RANGE = 0.3;
    if (this.keyHeld_Gas) {
      this.speed += DRIVE_POWER;
    }
    if (this.keyHeld_Reverse) {
      this.speed = this.speed - REVERSE_POWER <= 0 ? 0 : this.speed - REVERSE_POWER;
    }
    if (Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
      if (this.keyHeld_TurnLeft) {
        this.ang -= TURN_RATE;
      }
      if (this.keyHeld_TurnRight) {
        this.ang += TURN_RATE;
      }
    }
    this.x += Math.cos(this.ang) * this.speed;
    this.y += Math.sin(this.ang) * this.speed;

    carTrackHandling(this);
  };

  carDraw = () => {
    drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.ang);
  };

  getX = () => {
    return this.x;
  };
  getY = () => {
    return this.y;
  };
  getAng = () => {
    return this.ang;
  };
  getSpeed = () => {
    return this.speed;
  };
}
