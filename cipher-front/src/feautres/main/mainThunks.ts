import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../axiosApi';
import type { CipherText } from '../../types';

export const encodeMessage = createAsyncThunk<string, CipherText>(
  'main/encode',
  async (message) => {
    const { data: apiMessage } = await axiosApi.post(
      'http://localhost:8000/encode',
      message
    );

    return apiMessage;
  }
);

export const decodeMessage = createAsyncThunk<string, CipherText>(
  'main/decode',
  async (message) => {
    const { data: apiMessage } = await axiosApi.post(
      'http://localhost:8000/decode',
      message
    );

    return apiMessage;
  }
);
