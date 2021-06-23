import { canvas } from './index';

export const KEY_LEFT_ARROW = 37;
export const KEY_UP_ARROW = 38;
export const KEY_RIGHT_ARROW = 39;
export const KEY_DOWN_ARROW = 40;

export let keyHeld_Gas = false;
export let keyHeld_Reverse = false;
export let keyHeld_TurnLeft = false;
export let keyHeld_TurnRight = false;

export let mouseX = 0;
export let mouseY = 0;

export const setupInput = () => {
  canvas.addEventListener('mousemove', updateMousePos);

  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
};

export const updateMousePos = (evt: MouseEvent) => {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;
};

export const keyPressed = (evt: KeyboardEvent) => {
  switch (evt.keyCode) {
    case KEY_LEFT_ARROW:
      keyHeld_TurnLeft = true;
      break;
    case KEY_RIGHT_ARROW:
      keyHeld_TurnRight = true;
      break;
    case KEY_UP_ARROW:
      keyHeld_Gas = true;
      break;
    case KEY_DOWN_ARROW:
      keyHeld_Reverse = true;
      break;
    default:
      break;
  }

  evt.preventDefault();
};

export const keyReleased = (evt: KeyboardEvent) => {
  switch (evt.keyCode) {
    case KEY_LEFT_ARROW:
      keyHeld_TurnLeft = false;
      break;
    case KEY_RIGHT_ARROW:
      keyHeld_TurnRight = false;
      break;
    case KEY_UP_ARROW:
      keyHeld_Gas = false;
      break;
    case KEY_DOWN_ARROW:
      keyHeld_Reverse = false;
      break;
    default:
      break;
  }
};
