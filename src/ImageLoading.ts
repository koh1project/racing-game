import { imageLoadingDoneSoStartGame } from './index';

export const carPic = document.createElement('img');
export const roadPic = document.createElement('img');
export const wallPic = document.createElement('img');
export const goalPic = document.createElement('img');
export const treePic = document.createElement('img');
export const flagPic = document.createElement('img');

let picsToLoad = 0; // set automatically based on imageList in loadImages

export const countLoadedImagesAndLaunchIfReady = () => {
  picsToLoad--;
  if (picsToLoad === 0) {
    imageLoadingDoneSoStartGame();
  }
};

const beginLoadingImage = (imgVar: HTMLImageElement, fileName: string) => {
  imgVar.onload = countLoadedImagesAndLaunchIfReady;
  imgVar.src = `./images/${fileName}`;
};

type ImageListItem = { varName: HTMLImageElement; theFile: string };

export const loadImages = () => {
  const imageList: ImageListItem[] = [
    { varName: carPic, theFile: 'player1car.png' },
    { varName: roadPic, theFile: 'track_road.png' },
    { varName: wallPic, theFile: 'track_wall.png' },
    { varName: goalPic, theFile: 'track_goal.png' },
    { varName: treePic, theFile: 'track_tree.png' },
    { varName: flagPic, theFile: 'track_flag.png' },
  ];

  picsToLoad = imageList.length;

  for (let i = 0, length = imageList.length; i < length; i++) {
    beginLoadingImage(imageList[i].varName, imageList[i].theFile);
  }
};
