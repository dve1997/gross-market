import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import useHttp, { AddressesRequests } from 'src/shared/hooks/hookHTTP';

const initialState = {
  statusLoadingDataForFormVacancies: 'idle',
  statusLoadingCandidatesForEmployment: 'idle',
  dataForSelectWithVacancies: {},
  submittingCandidatesForEmployment: {},
  toggleDisplayFormOrThanks: false,
};

// Request to get a list of vacancies for a form
export const fetchRespDataForSelectWithVacancies = createAsyncThunk(
  'respdataforselectwithvacancies/fetchRespDataForSelectWithVacancies',
  async () => {
    const { request } = useHttp();
    return request(AddressesRequests.OPEN_VACANCIES, 'GET', {
      'Content-Type': 'application/json',
    });
  },
);

// Request to add job candidates to the server
export const fetchRespSubmittingCandidatesForEmployment = createAsyncThunk(
  'respsubmittingcandidatesforemployment/fetchRespSubmittingCandidatesForEmployment',
  async (values: object) => {
    const { request } = useHttp();
    return request(
      AddressesRequests.CANDIDATES_FOR_EMPLIYMENT,
      'POST',
      {
        'Content-Type': 'application/json',
      },
      values,
    );
  },
);

// Getting data for the slider
const respDataForSelectWithVacancies = createSlice({
  name: 'respdataslider',
  initialState,
  reducers: {
    updateDisplayFormOrThanks: (state, action) => {
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
        (state, action) => {
          state.statusLoadingDataForFormVacancies = 'loaded';
          state.dataForSelectWithVacancies = action.payload!;
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
        (state, action) => {
          state.statusLoadingCandidatesForEmployment = 'loaded';
          state.submittingCandidatesForEmployment = action.payload!;
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
