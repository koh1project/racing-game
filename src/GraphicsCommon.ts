import { canvasContext } from './index';

export const drawBitmapCenteredWithRotation = (useBitmap, atX, atY, withAng) => {
  canvasContext.save();
  canvasContext.translate(atX, atY);
  canvasContext.rotate(withAng);
  canvasContext.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);
  canvasContext.restore();
};

export const colorRect = (
  topLeftX: number,
  topLeftY: number,
  boxWidth: number,
  boxHeight: number,
  fillColor: string,
) => {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
};

export const colorCircle = (centerX: number, centerY: number, radius: number, fillColor: string): void => {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
};

export const colorText = (showWords: string, textX: number, textY: number, fillColor: string) => {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX, textY);
};
