import { imageLoadingDoneSoStartGame } from './index';

export let carPic = document.createElement('img');
export const roadPic = document.createElement('img');
export const wallPic = document.createElement('img');

let picsToLoad = 3;

export const countLoadedImagesAndLaunchIfReady = () => {
  picsToLoad--;
  if (picsToLoad === 0) {
    imageLoadingDoneSoStartGame();
  }
};

export const carImageLoad = () => {
  carPic.onload = countLoadedImagesAndLaunchIfReady;
  carPic.src = './images/player1car.png';
};

export const trackLoadImages = (): void => {
  roadPic.onload = countLoadedImagesAndLaunchIfReady;
  wallPic.onload = countLoadedImagesAndLaunchIfReady;
  roadPic.src = './images/track_road.png';
  wallPic.src = './images/track_wall.png';
};

export const loadImages = () => {
  carImageLoad();
  trackLoadImages();
};
