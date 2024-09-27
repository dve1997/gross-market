import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import useHttp, { AddressesRequests } from '../hooks/hookHTTP';

const initialState = {
  statusLoadingDataForBanner: 'idle',
  dataForBaner: null,
};

// Request to receive data for a banner
export const fetchRespDataBaner = createAsyncThunk(
  'respdatabaner/fetchRespDataBaner',
  async () => {
    const { request } = useHttp();
    return request(AddressesRequests.BANER, 'GET', {
      'Content-Type': 'application/json',
    });
  },
);

// Getting data for a banner
const respDataBaner = createSlice({
  name: 'respdatabaner',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRespDataBaner.pending, state => {
        state.statusLoadingDataForBanner = 'idle';
      })
      .addCase(fetchRespDataBaner.fulfilled, (state: any, action: any) => {
        state.statusLoadingDataForBanner = 'loaded';
        state.dataForBaner = action.payload;
      })
      .addCase(fetchRespDataBaner.rejected, state => {
        state.statusLoadingDataForBanner = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { reducer } = respDataBaner;
// export const {} = actions;
export default reducer;
