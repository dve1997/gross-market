import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import useHttp, { AddressesRequests } from '../hooks/hookHTTP';

const initialState = {
  statusLoadingDataForFormVacancies: 'idle',
  statusLoadingCandidatesForEmployment: 'idle',
  dataForSelectWithVacancies: null,
  submittingCandidatesForEmployment: null,
  toggleDisplayFormOrThanks: false,
};

// Request to get a list of vacancies for a form
export const fetchRespDataForSelectWithVacancies = createAsyncThunk(
  'respdataforselectwithvacancies/fetchRespDataForSelectWithVacancies',
  async () => {
    const { request } = useHttp();
    return request(AddressesRequests.VACANCIES, 'GET', {
      'Content-Type': 'application/json',
    });
  },
);

// Request to add job candidates to the server
export const fetchRespSubmittingCandidatesForEmployment = createAsyncThunk(
  'respsubmittingcandidatesforemployment/fetchRespSubmittingCandidatesForEmployment',
  async (values: any) => {
    const { request } = useHttp();
    return request(
      AddressesRequests.CANDIDATESFOREMPLOYMENT,
      'POST',
      {
        'Content-Type': 'application/json',
      },
      '',
      values,
    );
  },
);

// Getting data for the slider
const respDataForSelectWithVacancies = createSlice({
  name: 'respdataslider',
  initialState,
  reducers: {
    updateDisplayFormOrThanks: (state: any, action: any) => {
      state.toggleDisplayFormOrThanks = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRespDataForSelectWithVacancies.pending, state => {
        state.statusLoadingDataForFormVacancies = 'idle';
      })
      .addCase(
        fetchRespDataForSelectWithVacancies.fulfilled,
        (state: any, action: any) => {
          state.statusLoadingDataForFormVacancies = 'loaded';
          state.dataForSelectWithVacancies = action.payload;
        },
      )
      .addCase(fetchRespDataForSelectWithVacancies.rejected, state => {
        state.statusLoadingDataForFormVacancies = 'error';
      })
      .addCase(fetchRespSubmittingCandidatesForEmployment.pending, state => {
        state.statusLoadingCandidatesForEmployment = 'idle';
      })
      .addCase(
        fetchRespSubmittingCandidatesForEmployment.fulfilled,
        (state: any, action: any) => {
          state.statusLoadingCandidatesForEmployment = 'loaded';
          state.submittingCandidatesForEmployment = action.payload;
        },
      )
      .addCase(fetchRespSubmittingCandidatesForEmployment.rejected, state => {
        state.statusLoadingCandidatesForEmployment = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = respDataForSelectWithVacancies;
export const { updateDisplayFormOrThanks } = actions;
export default reducer;
