import { TRACK_ROAD, TRACK_WALL, TRACK_GOAL, TRACK_TREE, TRACK_FLAG } from './Track';
import { imageLoadingDoneSoStartGame } from './index';

export const carPic = document.createElement('img');
export const otherCarPic = document.createElement('img');

let picsToLoad = 0; // set automatically based on imageList in loadImages
export const trackPics: HTMLImageElement[] = [];
trackPics[2] = carPic;

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

type ImageListItem = {
  varName?: HTMLImageElement;
  trackType?: number;
  theFile: string;
};

const loadImageForTrackCode = (trackCode: number, fileName: string) => {
  trackPics[trackCode] = document.createElement('img');
  beginLoadingImage(trackPics[trackCode], fileName);
};

export const loadImages = () => {
  const imageList: ImageListItem[] = [
    { varName: carPic, theFile: 'player1car.png' },
    { varName: otherCarPic, theFile: 'player2car.png' },
    { trackType: TRACK_ROAD, theFile: 'track_road.png' },
    { trackType: TRACK_WALL, theFile: 'track_wall.png' },
    { trackType: TRACK_GOAL, theFile: 'track_goal.png' },
    { trackType: TRACK_TREE, theFile: 'track_tree.png' },
    { trackType: TRACK_FLAG, theFile: 'track_flag.png' },
  ];

  picsToLoad = imageList.length;

  for (var i = 0; i < imageList.length; i++) {
    if (imageList[i].varName != undefined) {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    } else {
      loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
    }
  }
};
