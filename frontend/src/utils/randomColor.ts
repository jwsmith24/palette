import { COLORS } from "./constants.ts";

export const colorOptions = [
  COLORS.RED,
  COLORS.YELLOW,
  COLORS.GREEN,
  COLORS.BLUE,
  COLORS.PURPLE,
];

export function randomColor(): string {
  const max = colorOptions.length;
  const randomInt = Math.floor(Math.random() * max);
  return colorOptions[randomInt];
}
