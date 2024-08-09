import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../axiosApi';
import type { CipherText, DecodedMessage, EncodedMessage } from '../../types';

export const encodeMessage = createAsyncThunk<EncodedMessage, CipherText>(
  'main/encode',
  async (message) => {
    const { data: apiMessage } = await axiosApi.post<EncodedMessage>(
      'http://localhost:8000/encode',
      message
    );

    return apiMessage;
  }
);

export const decodeMessage = createAsyncThunk<DecodedMessage, CipherText>(
  'main/decode',
  async (message) => {
    const { data: apiMessage } = await axiosApi.post<DecodedMessage>(
      'http://localhost:8000/decode',
      message
    );

    return apiMessage;
  }
);
