import deepbots from './controllers/deepbotscontroller.png'
import ppoagent from './controllers/ppoagent.png'
import obstacles from './worlds/obstacles.jpg'
import randomBall from './worlds/random_ball.png'
import twoRobotsWithBarrier from './worlds/2_robots_barrier.jpg'
import twoRobotsWithoutBarrier from './worlds/2_robots_without_barrier.jpg'
import ball_dist from './observations/ball_dist.png'
import ball_obs_sq from './observations/ball_obs_sq.png'
import current_lm from './observations/current_lm.png'
import current_rm from './observations/current_rm.png'
import goal_my_obs_sq from './observations/goal_my_obs_sq.png'
import goal_opp_obs_sq from './observations/goal_opp_obs_sq.png'
import my_goal_dist from './observations/my_goal_dist.png'
import obst_distance from './observations/obst_distance.png'
import obstacle_obs_sq from './observations/obstacle_obs_sq.png'
import opp_dist from './observations/opp_dist.png'
import opp_goal_dist from './observations/opp_goal_dist.png'
import opp_obs_sq from './observations/opp_obs_sq.png'

import goalOnly from './worlds/goal.jpg'
import random from './worlds/random.jpg'
import soccer from './worlds/soccer.jpg'

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
