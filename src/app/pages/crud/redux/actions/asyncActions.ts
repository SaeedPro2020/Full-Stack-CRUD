import {flowerModel} from '../models/FlowerModel'

export const FLOWER_LOADING = 'FLOWER_LOADING'
export const FLOWER_FAIL = 'FLOWER_FAIL'
export const FLOWER_SUCCESS = 'FLOWER_SUCCESS'

interface FlowerAsync {
  loading: boolean
  flowers: flowerModel[]
  error: string
}

interface FetchFlowersRequest extends FlowerAsync {
  type: typeof FLOWER_LOADING
}

interface FetchFlowersSuccess extends FlowerAsync {
  type: typeof FLOWER_SUCCESS
}

interface FetchFlowersFailure extends FlowerAsync {
  type: typeof FLOWER_FAIL
}

export type FlowerDispatchTypes = FetchFlowersRequest | FetchFlowersSuccess | FetchFlowersFailure
