export let carPic = document.createElement('img');
export let carPicLoaded = false; // image loaded asynchronously

export const roadPic = document.createElement('img');
export const wallPic = document.createElement('img');

export const carImageLoad = () => {
  carPic.onload = function () {
    carPicLoaded = true;
  };
  carPic.src = './images/player1car.png';
};

export const trackLoadImages = (): void => {
  roadPic.src = './images/track_road.png';
  wallPic.src = './images/track_wall.png';
};

export const loadImages = () => {
  carImageLoad();
  trackLoadImages();
};
