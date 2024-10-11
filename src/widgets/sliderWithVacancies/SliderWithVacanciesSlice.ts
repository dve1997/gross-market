import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import useHttp, { AddressesRequests } from 'src/shared/hooks/hookHTTP';

const initialState = {
  statusLoadingDataForSliderWithVacancies: 'idle',
  dataForSliderWithVacancies: {},
};

// Request to receive data for a slider with vacancies
export const fetchRespForSliderWithVacancies = createAsyncThunk(
  'fetchrespforsliderwithvacancies/fetchRespForSliderWithVacancies',
  async () => {
    const { request } = useHttp();
    return request(AddressesRequests.VACANCIES, 'GET', {
      'Content-Type': 'application/json',
    });
  },
);

// Getting data for a slider with vacancies
const respDataForSliderWithVacancies = createSlice({
  name: 'respdataforsliderwithvacancies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRespForSliderWithVacancies.pending, state => {
        state.statusLoadingDataForSliderWithVacancies = 'idle';
      })
      .addCase(fetchRespForSliderWithVacancies.fulfilled, (state, action) => {
        state.statusLoadingDataForSliderWithVacancies = 'loaded';
        state.dataForSliderWithVacancies = action.payload!;
      })
      .addCase(fetchRespForSliderWithVacancies.rejected, state => {
        state.statusLoadingDataForSliderWithVacancies = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { reducer } = respDataForSliderWithVacancies;
// export const {} = actions;
export default reducer;
