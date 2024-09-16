// services/examService.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/exams';

export const examService = {
  createExam: createAsyncThunk(
    'exam/create',
    async (examData, { rejectWithValue }) => {
      try {
        const response = await axios.post(API_URL, examData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  ),

  getExams: createAsyncThunk(
    'exam/getAll',
    async (classId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${API_URL}/${classId}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  ),
};