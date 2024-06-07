import { configureStore } from '@reduxjs/toolkit'
import itemReducer from './itemSlice.js'

export default configureStore({
  reducer: {
    item: itemReducer
  },
})