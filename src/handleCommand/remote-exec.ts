import { mouse, left, right, up, down, Point, Button, straightTo, Region, screen, FileType } from "@nut-tree/nut-js";


//export const DIRECTIONS_SET = new Set([ 'left', 'right', 'up', 'down']);
export enum DIRECTIONS {
  left = "left",
  right = "right",
  up = "up",
  down = "down",
}

export const POSITION = 'position';

const regionToPrntScrSize = 200;


export const moveMouse = async (dir: string, value: string) => {
  const shift = Number(value);
  if (!isNaN(shift)) {
    switch (dir) {
      case DIRECTIONS.left:
        await mouse.move(left(shift));
        break;
      case DIRECTIONS.right:
        await mouse.move(right(shift));
        break;
      case DIRECTIONS.up:
        await mouse.move(up(shift));
        break;
      case DIRECTIONS.down:
        await mouse.move(down(shift));
        break;

    }
  }
};
export const getMousePosition = async () => {
  const position = await mouse.getPosition();
  return `${position.x},${position.y}`;
};

export const drawCircle = async (value: string) => {
  const radius = Number(value);
  if (isNaN(radius)) throw new Error('Invalid args');
  
  const origin = await mouse.getPosition();
  const x0 = origin.x;
  const y0 = origin.y;
  
 
  await mouse.pressButton(Button.LEFT);

  for (let x = 0; x <= radius; x+=1) {
    const x1 = radius - x;
    const nextY = Math.round(Math.sqrt(radius *radius - x1 * x1));    
    await mouse.move(straightTo(new Point(x+ x0, y0 + nextY)));
    
  }

  for (let x = 0; x <= radius; x+=1) {
    const x1 = radius - x;
    const nextY = Math.round(Math.sqrt(radius *radius - x * x));
    await mouse.move(straightTo(new Point(x+ x0 + radius, nextY + y0)));
    
  }


  for (let x = radius; x >= 0; x-=1) {
    const nextY = Math.round(Math.sqrt(radius *radius - x * x));
    await mouse.move(straightTo(new Point(x+ x0 +radius ,  y0 - nextY)));
  }

  for (let x = radius; x >= 0; x-=1) {
    const x1 = radius - x;
    const nextY = Math.round(Math.sqrt(radius *radius - x1 * x1));
    await mouse.move(straightTo(new Point(x+ x0 ,  y0 - nextY)));
  }

  await mouse.releaseButton(Button.LEFT);
};



export const drawRect = async(value1: string, value2: string) => {
  const width = Number(value1);
  const height = Number(value2);
  if (isNaN(width) || isNaN(height)) throw new Error('Invalid args');
  const origin = await mouse.getPosition();
  const x0 = origin.x;
  const y0 = origin.y;
  
  await mouse.pressButton(Button.LEFT);
  await mouse.move(straightTo(new Point(width + x0 ,  y0)));
  await mouse.move(straightTo(new Point(width + x0 ,  y0 + height)));
  await mouse.move(straightTo(new Point(x0 ,  y0 + height)));
  await mouse.move(straightTo(new Point(x0 ,  y0)));

  await mouse.releaseButton(Button.LEFT);
}

export const prntScr = async () => {
  const scrnShotFile = 'screen-shot.png';
  const origin = await mouse.getPosition();
  const x0 = origin.x;
  const y0 = origin.y;

  const region = new Region(
    x0 - Math.round(regionToPrntScrSize / 2),
    y0 - Math.round(regionToPrntScrSize / 2),
    regionToPrntScrSize,
    regionToPrntScrSize
    );
  //const img = screen.grabRegion(region);
  return await screen.captureRegion(scrnShotFile, region,FileType.PNG);
  

}
