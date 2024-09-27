import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import useHttp, { AddressesRequests } from '../hooks/hookHTTP';

const initialState = {
  statusLoadingDataForSlider: 'idle',
  dataForSlider: null,
};

// Request to get images for slider
export const fetchRespDataSlider = createAsyncThunk(
  'respdataslider/fetchRespDataSlider',
  async () => {
    const { request } = useHttp();
    return request(AddressesRequests.SLIDER, 'GET', {
      'Content-Type': 'application/json',
    });
  },
);

// Getting data for the slider
const respDataSlider = createSlice({
  name: 'respdataslider',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRespDataSlider.pending, state => {
        state.statusLoadingDataForSlider = 'idle';
      })
      .addCase(fetchRespDataSlider.fulfilled, (state: any, action: any) => {
        state.statusLoadingDataForSlider = 'loaded';
        state.dataForSlider = action.payload;
      })
      .addCase(fetchRespDataSlider.rejected, state => {
        state.statusLoadingDataForSlider = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { reducer } = respDataSlider;
// export const {} = actions;
export default reducer;
