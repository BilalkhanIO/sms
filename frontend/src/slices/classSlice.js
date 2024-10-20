// slices/classSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import classService from '../services/classService';
import { logout } from './authSlice';
import axios from 'axios';

const initialState = {
  classes: [],
  selectedClass: null,
  isLoading: false,
  error: null,
};

export const getClasses = createAsyncThunk(
  'class/getClasses',
  async (_, { rejectWithValue }) => {
    try {
      return await classService.getClasses();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getClassDetails = createAsyncThunk(
  'class/getClassDetails',
  async (classId, { rejectWithValue }) => {
    try {
      return await classService.getClassDetails(classId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createClass = createAsyncThunk(
  'class/createClass',
  async (classData, thunkAPI) => {
    try {
      return await classService.createClass(classData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addStudent = createAsyncThunk(
  'class/addStudent',
  async ({ classId, studentId }, { rejectWithValue }) => {
    try {
      return await classService.addStudent(classId, studentId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeStudent = createAsyncThunk(
  'class/removeStudent',
  async ({ classId, studentId }, { rejectWithValue }) => {
    try {
      return await classService.removeStudent(classId, studentId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addSubject = createAsyncThunk(
  'class/addSubject',
  async ({ classId, subject }, { rejectWithValue }) => {
    try {
      return await classService.addSubject(classId, subject);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeSubject = createAsyncThunk(
  'class/removeSubject',
  async ({ classId, subjectId }, { rejectWithValue }) => {
    try {
      return await classService.removeSubject(classId, subjectId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSubject = createAsyncThunk(
  'class/updateSubject',
  async ({ classId, subjectId, updates }, { rejectWithValue }) => {
    try {
      return await classService.updateSubject(classId, subjectId, updates);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const assignTeacher = createAsyncThunk(
  'class/assignTeacher',
  async ({ classId, subjectId, teacherId }, { rejectWithValue }) => {
    try {
      return await classService.assignTeacher(classId, subjectId, teacherId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeTeacher = createAsyncThunk(
  'class/removeTeacher',
  async ({ classId, subjectId }, { rejectWithValue }) => {
    try {
      return await classService.removeTeacher(classId, subjectId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSchedule = createAsyncThunk(
  'class/updateSchedule',
  async ({ classId, schedule }, { rejectWithValue }) => {
    try {
      return await classService.updateSchedule(classId, schedule);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getStudentDetails = createAsyncThunk(
  'class/getStudentDetails',
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/classes/student/${studentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching student details:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch student details');
    }
  }
);

export const updateClassStudents = createAsyncThunk(
  'class/updateClassStudents',
  async ({ classId, students }, { getState, dispatch }) => {
    const { selectedClass } = getState().class;
    if (selectedClass && selectedClass._id === classId) {
      return { ...selectedClass, students };
    }
    return null;
  }
);

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClasses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getClasses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classes = action.payload;
      })
      .addCase(getClasses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getClassDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getClassDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedClass = action.payload;
      })
      .addCase(getClassDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classes.push(action.payload);
      })
      .addCase(createClass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classes.push(action.payload);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(removeStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classes = action.payload;
      })
      .addCase(removeStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addSubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedClass = action.payload;
      })
      .addCase(addSubject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(removeSubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedClass = action.payload;
      })
      .addCase(removeSubject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateClassStudents.fulfilled, (state, action) => {
        if (action.payload) {
          state.selectedClass = action.payload;
        }
      })
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled') && action.type !== 'class/getClassDetails/fulfilled',
        (state, action) => {
          state.selectedClass = action.payload;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected') && action.type !== 'class/getClassDetails/rejected',
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export default classSlice.reducer;
