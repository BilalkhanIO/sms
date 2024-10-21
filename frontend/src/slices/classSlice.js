// slices/classSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import classService from '../services/classService';
import { logout } from './authSlice';
import axios from 'axios';
import api from '../utils/api';

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
      return await classService.getStudentDetails(studentId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateClassStudents = createAsyncThunk(
  'class/updateClassStudents',
  async ({ classId, students }, { dispatch }) => {
    const updatedStudents = await Promise.all(
      students.map(async (studentId) => {
        const studentDetails = await dispatch(getStudentDetails(studentId)).unwrap();
        return studentDetails;
      })
    );
    return { classId, students: updatedStudents };
  }
);

export const addCourse = createAsyncThunk(
  'class/addCourse',
  async ({ classId, course }, { rejectWithValue }) => {
    try {
      return await classService.addCourse(classId, course);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeCourse = createAsyncThunk(
  'class/removeCourse',
  async ({ classId, courseId }, { rejectWithValue }) => {
    try {
      return await classService.removeCourse(classId, courseId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCourse = createAsyncThunk(
  'class/updateCourse',
  async ({ classId, courseId, updates }, { rejectWithValue }) => {
    try {
      return await classService.updateCourse(classId, courseId, updates);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const enrollStudent = createAsyncThunk(
  'class/enrollStudent',
  async ({ classId, studentId }, { rejectWithValue }) => {
    try {
      return await classService.enrollStudent(classId, studentId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const unenrollStudent = createAsyncThunk(
  'class/unenrollStudent',
  async ({ classId, studentId }, { rejectWithValue }) => {
    try {
      return await classService.unenrollStudent(classId, studentId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const generateReport = createAsyncThunk(
  'class/generateReport',
  async ({ classId, reportType }, { rejectWithValue }) => {
    try {
      return await classService.generateReport(classId, reportType);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    updateClassStudentsSuccess: (state, action) => {
      state.selectedClass = action.payload;
    },
  },
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
        state.selectedClass = action.payload;
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
        state.selectedClass = action.payload;
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
        if (state.selectedClass && state.selectedClass._id === action.payload.classId) {
          state.selectedClass.students = action.payload.students;
        }
      })
      .addCase(getStudentDetails.fulfilled, (state, action) => {
        if (state.selectedClass && state.selectedClass.students) {
          const index = state.selectedClass.students.findIndex(student => student._id === action.payload._id);
          if (index !== -1) {
            state.selectedClass.students[index] = action.payload;
          }
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
      )
      .addCase(addCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedClass = action.payload;
      })
      .addCase(removeCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedClass = action.payload;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedClass = action.payload;
      })
      .addCase(enrollStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedClass = action.payload;
      })
      .addCase(unenrollStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedClass = action.payload;
      })
      .addCase(generateReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedClass = action.payload;
      });
  },
});

export default classSlice.reducer;
