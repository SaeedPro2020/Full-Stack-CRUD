import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'
import * as auth from '../../app/modules/auth'
import {flowerReducer} from '../../app/pages/crud/redux/reduces/FlowerReducer'
import {sliceName} from '../../app/pages/crud/slice/Slice'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  flowerReducer,
  sliceName: sliceName.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga()])
}
