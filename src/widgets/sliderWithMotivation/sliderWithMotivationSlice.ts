import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import useHttp, { AddressesRequests } from 'src/shared/hooks/hookHTTP';

const initialState = {
  statusLoadingDataForSliderWithMotivation: 'idle',
  dataForSliderWithMotivation: {},
};

// Request to receive data for a slider with motivation
export const fetchRespForSliderWithMotivation = createAsyncThunk(
  'fetchrespforsliderwithmotivation/fetchRespForSliderWithMotivation',
  async () => {
    const { request } = useHttp();
    return request(AddressesRequests.MOTIVATION, 'GET', {
      'Content-Type': 'application/json',
    });
  },
);

// Getting data for a slider with motivation
const respDataForSliderWithMotivation = createSlice({
  name: 'respdataforsliderwithmotivation',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRespForSliderWithMotivation.pending, state => {
        state.statusLoadingDataForSliderWithMotivation = 'idle';
      })
      .addCase(fetchRespForSliderWithMotivation.fulfilled, (state, action) => {
        state.statusLoadingDataForSliderWithMotivation = 'loaded';
        state.dataForSliderWithMotivation = action.payload!;
      })
      .addCase(fetchRespForSliderWithMotivation.rejected, state => {
        state.statusLoadingDataForSliderWithMotivation = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { reducer } = respDataForSliderWithMotivation;
// export const {} = actions;
export default reducer;
