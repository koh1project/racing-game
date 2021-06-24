import { carReset, carMove, carDraw } from './Car';
import { setupInput } from './Input';
import { carTrackHandling, drawTracks } from './Track';
import { loadImages } from './ImageLoading';

export type Canvas = HTMLCanvasElement | null;
export type CanvasContext = CanvasRenderingContext2D | null;

export let canvas: Canvas = null;
export let canvasContext: CanvasContext = null;

window.onload = () => {
  canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  canvasContext = canvas.getContext('2d');

  loadImages();
};

export const imageLoadingDoneSoStartGame = () => {
  let framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  setupInput();

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
  drawTracks();
  carDraw();
};
