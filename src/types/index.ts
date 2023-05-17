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
