import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import useHttp, { AddressesRequests } from '../hooks/hookHTTP';

const initialState = {
  statusLoadingDataForTableImagesInts: 'idle',
  statusLoadingDataForTableImagesIntsForLoading: 'idle',
  dataForTableImagesInts: null,
  dataForTableImagesIntsForLoading: null,
};

// Request to get images for faccordion
export const fetchRespDataTableImagesInts = createAsyncThunk(
  'respdatatableimagesints/fetchRespDataTableImagesInts',
  async (value: any) => {
    const { request } = useHttp();
    return request(
      AddressesRequests.INST,
      'GET',
      {
        'Content-Type': 'application/json',
      },
      value,
    );
  },
);

// Request to receive images for loading faccordion
export const fetchRespDataTableImagesIntsForLoading = createAsyncThunk(
  'respdatatableimagesintsforloading/fetchRespDataTableImagesIntsForLoading',
  async (value: any) => {
    const { request } = useHttp();
    return request(
      AddressesRequests.INST,
      'GET',
      {
        'Content-Type': 'application/json',
      },
      value,
    );
  },
);

// Getting data for a banner
const respDataBaner = createSlice({
  name: 'respdatabaner',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRespDataTableImagesInts.pending, state => {
        state.statusLoadingDataForTableImagesInts = 'idle';
      })
      .addCase(
        fetchRespDataTableImagesInts.fulfilled,
        (state: any, action: any) => {
          state.statusLoadingDataForTableImagesInts = 'loaded';
          state.dataForTableImagesInts = action.payload;
        },
      )
      .addCase(fetchRespDataTableImagesInts.rejected, state => {
        state.statusLoadingDataForTableImagesInts = 'error';
      })
      .addCase(fetchRespDataTableImagesIntsForLoading.pending, state => {
        state.statusLoadingDataForTableImagesIntsForLoading = 'idle';
      })
      .addCase(
        fetchRespDataTableImagesIntsForLoading.fulfilled,
        (state: any, action: any) => {
          state.statusLoadingDataForTableImagesIntsForLoading = 'loaded';
          state.dataForTableImagesIntsForLoading = action.payload;
        },
      )
      .addCase(fetchRespDataTableImagesIntsForLoading.rejected, state => {
        state.statusLoadingDataForTableImagesIntsForLoading = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { reducer } = respDataBaner;
// export const {} = actions;
export default reducer;
