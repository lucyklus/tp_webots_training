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
  image: string
}

export type ObservationType =
  | 'camera-ball-distance'
  | 'camera-ball-orientation'
  | 'camera-op-goal-distance'
  | 'supervisor-op-player-distance'
  | 'input-data-5'
  | 'input-data-6'
  | 'input-data-7'
  | 'input-data-8'
  | 'input-data-9'
  | 'input-data-10'
  | 'input-data-11'
  | 'input-data-12'

export interface Observation {
  type: ObservationType
  description: string
  selected: boolean
  image: string
}

export interface IControllerGeneratorConfig {
  controller: ControllerType
  world: WorldType
  observations: ObservationType[]
  rewardFn: string
}
