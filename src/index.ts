import { carReset, carMove, carImageLoad, carDraw } from './Car';
import { colorRect } from './GraphicsCommon';
import { setupInput } from './Input';
import { carTrackHandling, drawTracks } from './Track';

export type Canvas = HTMLCanvasElement | null;
export type CanvasContext = CanvasRenderingContext2D | null;

export let canvas: Canvas = null;
export let canvasContext: CanvasContext = null;

window.onload = () => {
  canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  canvasContext = canvas.getContext('2d');

  let framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  setupInput();

  carImageLoad();

  carReset();
};

const updateAll = () => {
  moveAll();
  drawAll();
};

const moveAll = () => {
  carMove();

  carTrackHandling();
};

const drawAll = () => {
  colorRect(0, 0, canvas.width, canvas.height, 'black'); // clear screen

  carDraw();

  drawTracks();
};
