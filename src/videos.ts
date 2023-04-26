import goal from './video/goal.mp4';
import random from './video/random.mp4';
import soccer from './video/soccer.mp4';
import obstacles from './video/obstacles.mp4';

export const videos: Record<string, string> = {
  goalOnly: goal as string,
  random: random as string,
  soccer: soccer as string,
  obstacles: obstacles as string,
}
