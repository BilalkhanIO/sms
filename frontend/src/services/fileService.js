// services/fileService.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/files';

export const fileService = {
  uploadFile: createAsyncThunk(
    'file/upload',
    async (fileData, { rejectWithValue }) => {
      try {
        const response = await axios.post(API_URL, fileData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  ),

  getFiles: createAsyncThunk(
    'file/getAll',
    async (classId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${API_URL}/${classId}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  ),

  downloadFile: createAsyncThunk(
    'file/download',
    async (fileId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${API_URL}/${fileId}/download`, {
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file');
        document.body.appendChild(link);
        link.click();
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  ),
};