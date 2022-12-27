import { createSlice } from '@reduxjs/toolkit';

const statusSlice = createSlice({
  name: 'response',
  initialState: {status: 'LOADING', message: null, type: null, response: null},
  reducers: {
    showStatus(state, action) {
      
      state.status = action.payload.status
      state.message = action.payload.message
      state.type = action.payload.type
      state.response = action.payload.response

    }
  }
})

export const statusActions = statusSlice.actions;

export default statusSlice;