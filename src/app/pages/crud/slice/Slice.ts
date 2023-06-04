import {createSlice} from '@reduxjs/toolkit'

export const sliceName = createSlice({
  name: 'sliceName',
  initialState: {
    flowerUrl: '',
  },
  reducers: {
    addData: (state, action) => {
      // Update the state based on the action payload
      state.flowerUrl = action.payload
    },
  },
})
