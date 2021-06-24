import { carX, carY, changeCarSpeed } from './Car';
import { colorRect } from './GraphicsCommon';
import { canvasContext } from './index';
import { trackPics } from './ImageLoading';

export const TRACK_W = 40;
export const TRACK_H = 40;
export const TRACK_GAP = 2;
export const TRACK_COLS = 20;
export const TRACK_ROWS = 15;

export // prettier-ignore
let trackGrid = [ 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
                  4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                  4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                  1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                  1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                  1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
                  1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                  1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                  1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
                  1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                  0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
                  0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                  1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 4];

export const TRACK_ROAD = 0;
export const TRACK_WALL = 1;
export const TRACK_PLAYERSTART = 2;
export const TRACK_GOAL = 3;
export const TRACK_TREE = 4;
export const TRACK_FLAG = 5;

export const isObstacleAtColRow = (col: number, row: number): boolean => {
  if (col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS) {
    let trackIndexUnderCoord = rowColToArrayIndex(col, row);
    return trackGrid[trackIndexUnderCoord] != TRACK_ROAD;
  } else {
    return false;
  }
};

export const carTrackHandling = () => {
  let carTrackCol = Math.floor(carX / TRACK_W);
  let carTrackRow = Math.floor(carY / TRACK_H);

  if (carTrackCol >= 0 && carTrackCol < TRACK_COLS && carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {
    if (isObstacleAtColRow(carTrackCol, carTrackRow)) {
      changeCarSpeed();
    } // end of track found
  } // end of valid col and row
}; // end of carTrackHandling function

export const rowColToArrayIndex = (col: number, row: number) => {
  return col + TRACK_COLS * row;
};

export const drawTracks = () => {
  let arrayIndex = 0;
  let drawTileX = 0;
  let drawTileY = 0;

  for (let eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
    for (let eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
      const tileKindHere = trackGrid[arrayIndex];
      const useImg = trackPics[tileKindHere];
      canvasContext.drawImage(useImg, drawTileX, drawTileY);

      drawTileX += TRACK_W;
      arrayIndex++;
    }
    drawTileX = 0;
    drawTileY += TRACK_H;
  }
};
