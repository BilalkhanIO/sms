import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosWithAuth from '../utils/axiosWithAuth';

 const assignTeachersToCourse = createAsyncThunk(
  'course/assignTeachers',
  async ({ courseId, teacherIds }, thunkAPI) => {
    try {
      const response = await axiosWithAuth.post(`/api/courses/${courseId}/teachers`, { teacherIds });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

 const enrollStudentsInCourse = createAsyncThunk(
  'course/enrollStudents',
  async ({ courseId, studentIds }, thunkAPI) => {
    try {
      const response = await axiosWithAuth.post(`/api/courses/${courseId}/students`, { studentIds });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
 const addScheduleToCourse = createAsyncThunk(
  'course/addSchedule',
  async ({ courseId, scheduleData }, thunkAPI) => {
    try {
      const response = await axiosWithAuth.post(`/api/courses/${courseId}/schedule`, { scheduleData });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

 const createCourse = createAsyncThunk(
  'course/createCourse',
  async (courseData, thunkAPI) => {
    try {
      const response = await axiosWithAuth.post('/api/courses', courseData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

 const updateCourse = createAsyncThunk(
  'course/updateCourse',
  async (courseData, thunkAPI) => {
    try {
      const response = await axiosWithAuth.put(`/api/courses/${courseData._id}`, courseData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

 const getCourses = createAsyncThunk(
  'course/getCourses',
  async (_, thunkAPI) => {
    try {
      const response = await axiosWithAuth.get('/api/courses');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    courses: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(assignTeachersToCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(assignTeachersToCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        const courseIndex = state.courses.findIndex(c => c._id === action.payload._id);
        if (courseIndex !== -1) {
          state.courses[courseIndex] = action.payload;
        }
      })
      .addCase(assignTeachersToCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(enrollStudentsInCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(enrollStudentsInCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        const courseIndex = state.courses.findIndex(c => c._id === action.payload._id);
        if (courseIndex !== -1) {
          state.courses[courseIndex] = action.payload;
        }
      })
      .addCase(enrollStudentsInCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addScheduleToCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addScheduleToCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        const courseIndex = state.courses.findIndex(c => c._id === action.payload._id);
        if (courseIndex !== -1) {
          state.courses[courseIndex] = action.payload;
        }
      })
      .addCase(addScheduleToCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.courses.findIndex(c => c._id === action.payload._id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;

export {
  assignTeachersToCourse,
  enrollStudentsInCourse,
  addScheduleToCourse,
  createCourse,
  updateCourse,
  getCourses
};
