import { createSlice } from '@reduxjs/toolkit';
import type { DecodedMessage, EncodedMessage } from '../../types';
import { decodeMessage, encodeMessage } from './mainThunks';

export interface mainState {
  encode: EncodedMessage | null;
  decode: DecodedMessage | null;
  isFetching: boolean;
}

const initialState: mainState = {
  encode: null,
  decode: null,
  isFetching: false,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(encodeMessage.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(encodeMessage.fulfilled, (state, { payload: ApiMessage }) => {
        state.encode = ApiMessage;
        state.isFetching = false;
      })
      .addCase(encodeMessage.rejected, (state) => {
        state.isFetching = false;
      });

    builder.addCase(
      decodeMessage.fulfilled,
      (state, { payload: ApiMessage }) => {
        state.decode = ApiMessage;
      }
    );
  },
  selectors: {
    selectEncode: (state) => state.encode,
    selectDecode: (state) => state.decode,
    selectIsFetching: (state) => state.isFetching,
  },
});

export const { selectIsFetching, selectDecode, selectEncode } =
  mainSlice.selectors;
