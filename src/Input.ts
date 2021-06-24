import { Car } from './Car';
import { blueCar, canvas, greenCar } from './index';

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

export let mouseX = 0;
export let mouseY = 0;

export const setupInput = () => {
  canvas.addEventListener('mousemove', updateMousePos);

  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  greenCar.setUpInput(KEY_W, KEY_D, KEY_S, KEY_A);
  blueCar.setUpInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
};

export const updateMousePos = (evt: MouseEvent) => {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;
};

export const keySet = (evt: KeyboardEvent, car: Car, setTo: boolean) => {
  switch (evt.keyCode) {
    case car.controlKeyLeft:
      car.keyHeld_TurnLeft = setTo;
      break;
    case car.controlKeyRight:
      car.keyHeld_TurnRight = setTo;
      break;
    case car.controlKeyUp:
      car.keyHeld_Gas = setTo;
      break;
    case car.controlKeyDown:
      car.keyHeld_Reverse = setTo;
      break;
    default:
      break;
  }
};

export const keyPressed = (evt: KeyboardEvent) => {
  keySet(evt, blueCar, true);
  keySet(evt, greenCar, true);
  evt.preventDefault();
};

export const keyReleased = (evt: KeyboardEvent) => {
  keySet(evt, greenCar, false);
  keySet(evt, blueCar, false);
};
