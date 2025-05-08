import { BackgroundColor } from '@/interfaces/assistant.interface';

export const getValidColor = (color: string): BackgroundColor => {
  const ValidColors: string[] = Object.values(BackgroundColor);
  return ValidColors.includes(color) ? (color as BackgroundColor) : BackgroundColor.Björnstigen;
};
