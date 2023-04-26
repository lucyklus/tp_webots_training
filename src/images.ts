import deepbots from './images/deepbots.png'
import ppoagent from './images/ppoagent.png'
import obstacles from './images/worlds/obstacles.jpg'
import randomBall from './images/worlds/random_ball.png'
import twoRobotsWithBarrier from './images/worlds/2_robots_barrier.jpg'
import twoRobotsWithoutBarrier from './images/worlds/2_robots_without_barrier.jpg'
import ball_dist from './images/observations/ball_dist.png'
import ball_obs_sq from './images/observations/ball_obs_sq.png'
import current_lm from './images/observations/current_lm.png'
import current_rm from './images/observations/current_rm.png'
import goal_my_obs_sq from './images/observations/goal_my_obs_sq.png'
import goal_opp_obs_sq from './images/observations/goal_opp_obs_sq.png'
import my_goal_dist from './images/observations/my_goal_dist.png'
import obst_distance from './images/observations/obst_distance.png'
import obstacle_obs_sq from './images/observations/obstacle_obs_sq.png'
import opp_dist from './images/observations/opp_dist.png'
import opp_goal_dist from './images/observations/opp_goal_dist.png'
import opp_obs_sq from './images/observations/opp_obs_sq.png'

import goalOnly from './images/worlds/goal.jpg';
import random from './images/worlds/random.jpg';
import soccer from './images/worlds/soccer.jpg';

export const images: Record<string, string> = {

  goalOnly: goalOnly as string,
  random: random as string,
  soccer: soccer as string,

  deepbots: deepbots as string,
  ppoagent: ppoagent as string,
  obstacles: obstacles as string,
  randomBall: randomBall as string,
  twoRobotsWithBarrier: twoRobotsWithBarrier as string,
  twoRobotsWithoutBarrier: twoRobotsWithoutBarrier as string,
  ball_dist: ball_dist as string,
  ball_obs_sq: ball_obs_sq as string,
  current_lm: current_lm as string,
  current_rm: current_rm as string,
  goal_my_obs_sq: goal_my_obs_sq as string,
  goal_opp_obs_sq: goal_opp_obs_sq as string,
  my_goal_dist: my_goal_dist as string,
  obst_distance: obst_distance as string,
  obstacle_obs_sq: obstacle_obs_sq as string,
  opp_dist: opp_dist as string,
  opp_goal_dist: opp_goal_dist as string,
  opp_obs_sq: opp_obs_sq as string,
}
