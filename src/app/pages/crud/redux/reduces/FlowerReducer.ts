import {
  FLOWER_FAIL,
  FLOWER_LOADING,
  FLOWER_SUCCESS,
  FlowerDispatchTypes,
} from '../actions/asyncActions'

import {flowerModel} from '../models/FlowerModel'

export interface FlowerState {
  loading: boolean
  flowers: flowerModel[]
}

const defaultState: FlowerState = {
  loading: false,
  flowers: [],
}
//
export const flowerReducer = (state = defaultState, action: FlowerDispatchTypes): FlowerState => {
  switch (action.type) {
    case FLOWER_LOADING:
      return {loading: true, flowers: []}
    case FLOWER_SUCCESS:
      return {loading: false, flowers: action.flowers}
    case FLOWER_FAIL:
      return {loading: false, flowers: []}
    default:
      return state
  }
}
