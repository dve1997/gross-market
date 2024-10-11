import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import useHttp, { AddressesRequests } from 'src/shared/hooks/hookHTTP';

const initialState = {
  statusLoadingDataForListOfImagesInstagram: 'idle',
  dataForListOfImagesInstagram: {},
};

// Request to receive data for a list of images Instagram
export const fetchRespForListOfImagesInstagram = createAsyncThunk(
  'fetchrespforlistofimagesinstagram/fetchRespForListOfImagesInstagram',
  async (value: string) => {
    const { request } = useHttp();
    return request(
      AddressesRequests.INSTAGRAM,
      'GET',
      {
        'Content-Type': 'application/json',
      },
      {},
      value,
    );
  },
);

// Getting data for a list of images Instagram
const respDataForListOfImagesInstagram = createSlice({
  name: 'respdataforsliderwithvacancies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRespForListOfImagesInstagram.pending, state => {
        state.statusLoadingDataForListOfImagesInstagram = 'idle';
      })
      .addCase(fetchRespForListOfImagesInstagram.fulfilled, (state, action) => {
        state.statusLoadingDataForListOfImagesInstagram = 'loaded';
        state.dataForListOfImagesInstagram = action.payload!;
      })
      .addCase(fetchRespForListOfImagesInstagram.rejected, state => {
        state.statusLoadingDataForListOfImagesInstagram = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { reducer } = respDataForListOfImagesInstagram;
// export const {} = actions;
export default reducer;
