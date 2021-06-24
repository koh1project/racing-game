import { Car } from './Car';
import { setupInput } from './Input';
import { drawTracks, levelOne, changeTrackGrid } from './Track';
import { carPic, loadImages, otherCarPic } from './ImageLoading';
import { colorRect, colorText } from './GraphicsCommon';

export type Canvas = HTMLCanvasElement | null;
export type CanvasContext = CanvasRenderingContext2D | null;

export let canvas: Canvas = null;
export let canvasContext: CanvasContext = null;

export const blueCar = new Car();
export const greenCar = new Car();

window.onload = () => {
  canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  canvasContext = canvas.getContext('2d');

  colorRect(0, 0, canvas.width, canvas.height, 'black');
  colorText('LOADING IMAGES', canvas.width / 2, canvas.height / 2, 'white');

  loadImages();
};

export const imageLoadingDoneSoStartGame = () => {
  let framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  setupInput();

  loadLevel(levelOne);
};

const updateAll = () => {
  moveAll();
  drawAll();
};

const moveAll = () => {
  blueCar.carMove();
  greenCar.carMove();
};

const drawAll = () => {
  drawTracks();
  blueCar.carDraw();
  greenCar.carDraw();
};

const loadLevel = (whichLevel) => {
  changeTrackGrid(whichLevel);
  greenCar.carReset(otherCarPic, 'Green Machine');
  blueCar.carReset(carPic, 'Blue Storm');
};
