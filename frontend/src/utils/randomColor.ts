export const colorOptions = [
  "bg-red-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-purple-500",
];

export function randomColor(): string {
  const max = colorOptions.length;
  const randomInt = Math.floor(Math.random() * max);
  return colorOptions[randomInt];
}
