export interface IWorld {
  name: string
  title: string
  description: string
  image: string
}

export interface IObservation {
  name: string
  description: string
  image: string
  title: string
}

interface IControllerBase {
  name: string
  title: string
  description: string
  image: string
}

export type IController = (IControllerBase & {
  disabled: false
  observations: IObservation[]
}) | (IControllerBase & {
  disabled: true
})

export interface IControllerGeneratorConfig {
  controller: IController['name']
  world: IWorld['name']
  observations: Array<IObservation['name']>
  rewardFn: string
}

export type WebotsWorld =  'goal-only' | 'goal-random-ball' | 'goal-and-obstacles' | 'soccer';
export type TState = 'created' | 'in-queue' | 'in-progress' | 'finished' | 'error';

export interface WEBEApiControllerGetResponse {
  uuid: string,
  name: string,
  world: WebotsWorld,
  status: TState,
  score: number,
  meta: string // json like
}