export type WorldType = 'goal-only' | 'goal-random-ball' | 'goal-and-obstacles' | 'soccer'

export interface World {
  type: WorldType
  title: string
  description: string
  image: string
}

export type ControllerType = 'pure' | 'deepbots'

export interface Controller {
  type: ControllerType
  title: string
  description: string
  image: string,
  disabled: boolean
}

export type ObservationType =
  | 'current_lm'
  | 'current_rm'
  | 'ball_in_sight'
  | 'ball_distance'
  | 'ball_x'
  | 'ball_size_x'
  | 'ball_y'
  | 'ball_size_y'
  | 'my_goal_in_sight'
  | 'my_goal_distance'
  | 'my_goal_x'
  | 'my_goal_size_x'
  | 'my_goal_y'
  | 'my_goal_size_y'
  | 'opp_goal_in_sight'
  | 'opp_goal_distance'
  | 'opp_goal_x'
  | 'opp_goal_size_x'
  | 'opp_goal_y'
  | 'opp_goal_size_y'
  | 'opp_in_sight'
  | 'opp_distance'
  | 'opp_x'
  | 'opp_size_x'
  | 'opp_y'
  | 'opp_size_y'
  | 'obst_in_sight'
  | 'obst_distance'
  | 'obst_x'
  | 'obst_size_x'
  | 'obst_y'
  | 'obst_size_y'

export interface Observation {
  type: ObservationType
  description: string
  selected: boolean
  image: string
  title: string
}

export interface IControllerGeneratorConfig {
  controller: ControllerType
  world: WorldType
  observations: ObservationType[]
  rewardFn: string
}
