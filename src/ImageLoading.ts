import { imageLoadingDoneSoStartGame } from './index';

export let carPic = document.createElement('img');
export const roadPic = document.createElement('img');
export const wallPic = document.createElement('img');

let picsToLoad = 0;

export const countLoadedImagesAndLaunchIfReady = () => {
  picsToLoad--;
  if (picsToLoad === 0) {
    imageLoadingDoneSoStartGame();
  }
};

const beginLoadingImage = (imgVar: HTMLImageElement, fileName: string) => {
  picsToLoad++;
  imgVar.onload = countLoadedImagesAndLaunchIfReady;
  imgVar.src = `./images/${fileName}`;
};

export const loadImages = () => {
  beginLoadingImage(carPic, 'player1car.png');
  beginLoadingImage(roadPic, 'track_road.png');
  beginLoadingImage(wallPic, 'track_wall.png');
};
