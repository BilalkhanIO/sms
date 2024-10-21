import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClassDetails, addStudent, removeStudent, addSubject, removeSubject, updateSubject, assignTeacher, removeTeacher, updateSchedule, getStudentDetails, updateClassStudents } from '../slices/classSlice';
import { logout } from '../slices/authSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SubjectCard from '../components/SubjectCard';
import StudentList from '../components/StudentList';

const ClassDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedClass, isLoading, error } = useSelector((state) => state.class);
  const [newStudentId, setNewStudentId] = useState('');
  const [newSubject, setNewSubject] = useState({ name: '', teacher: '', schedule: [] });
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);
  const [editedSchedule, setEditedSchedule] = useState([]);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const classDetails = await dispatch(getClassDetails(id)).unwrap();
        if (classDetails && classDetails.students) {
          const studentDetails = await Promise.all(
            classDetails.students.map(async (studentId) => {
              try {
                return await dispatch(getStudentDetails(studentId)).unwrap();
              } catch (error) {
                console.error(`Failed to fetch details for student ${studentId}:`, error);
                return { _id: studentId, name: 'Unknown Student' };
              }
            })
          );
          dispatch(updateClassStudents({ classId: id, students: studentDetails }));
        }
      } catch (error) {
        console.error('Failed to fetch class details:', error);
      }
    };
    fetchClassDetails();
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedClass) {
      console.log('Selected class:', selectedClass);
      console.log('Students in selected class:', selectedClass.students);
    }
  }, [selectedClass]);

  const handleAddStudent = async () => {
    if (newStudentId) {
      try {
        await dispatch(addStudent({ classId: id, studentId: newStudentId })).unwrap();
        setNewStudentId('');
        dispatch(getClassDetails(id)); // Refresh class details
      } catch (error) {
        alert(`Failed to add student: ${error.message}`);
      }
    }
  };

  const handleRemoveStudent = async (studentId) => {
    try {
      await dispatch(removeStudent({ classId: id, studentId })).unwrap();
      dispatch(getClassDetails(id)); // Refresh class details
    } catch (error) {
      alert(`Failed to remove student: ${error.message}`);
    }
  };

  const handleAddSubject = async () => {
    if (newSubject.name && newSubject.teacher) {
      try {
        await dispatch(addSubject({ classId: id, subject: newSubject })).unwrap();
        setNewSubject({ name: '', teacher: '', schedule: [] });
        dispatch(getClassDetails(id)); // Refresh class details
      } catch (error) {
        alert(`Failed to add subject: ${error.message}`);
      }
    }
  };

  const handleRemoveSubject = async (subjectId) => {
    try {
      await dispatch(removeSubject({ classId: id, subjectId })).unwrap();
      dispatch(getClassDetails(id)); // Refresh class details
    } catch (error) {
      alert(`Failed to remove subject: ${error.message}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleEditSchedule = () => {
    setIsEditingSchedule(true);
    setEditedSchedule(selectedClass.schedule || []);
  };

  const handleSaveSchedule = async () => {
    try {
      await dispatch(updateSchedule({ classId: id, schedule: editedSchedule })).unwrap();
      setIsEditingSchedule(false);
      dispatch(getClassDetails(id));
    } catch (error) {
      alert(`Failed to update schedule: ${error.message}`);
    }
  };

  const handleUpdateSubject = async (subjectId, updates) => {
    try {
      await dispatch(updateSubject({ classId: id, subjectId, updates })).unwrap();
      dispatch(getClassDetails(id));
    } catch (error) {
      alert(`Failed to update subject: ${error.message}`);
    }
  };

  const handleAssignTeacher = async (subjectId, teacherId) => {
    try {
      await dispatch(assignTeacher({ classId: id, subjectId, teacherId })).unwrap();
      dispatch(getClassDetails(id));
    } catch (error) {
      alert(`Failed to assign teacher: ${error.message}`);
    }
  };

  const handleRemoveTeacher = async (subjectId) => {
    try {
      await dispatch(removeTeacher({ classId: id, subjectId })).unwrap();
      dispatch(getClassDetails(id));
    } catch (error) {
      alert(`Failed to remove teacher: ${error.message}`);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    if (error === 'Authentication failed. Please log in again.') {
      return (
        <div className="text-center mt-8">
          <p>Your session has expired. Please log in again.</p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      );
    }
    return <ErrorMessage message={error} />;
  }

  if (!selectedClass) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">{selectedClass.name}</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4"><strong>Description:</strong> {selectedClass.description}</p>
        <p className="mb-4"><strong>Batch:</strong> {selectedClass.batchStartYear} - {selectedClass.batchEndYear}</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-4">Subjects</h3>
        {selectedClass.subjects && selectedClass.subjects.length > 0 ? (
          selectedClass.subjects.map((subject) => (
            <SubjectCard 
              key={subject._id} 
              subject={subject} 
              onRemove={() => handleRemoveSubject(subject._id)}
            />
          ))
        ) : (
          <p>No subjects available for this class.</p>
        )}
        
        <h3 className="text-xl font-semibold mt-6 mb-4">Add Subject</h3>
        <div className="flex mb-4">
          <input
            type="text"
            value={newSubject.name}
            onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
            placeholder="Subject Name"
            className="flex-grow px-3 py-2 border rounded-l"
          />
          <input
            type="text"
            value={newSubject.teacher}
            onChange={(e) => setNewSubject({ ...newSubject, teacher: e.target.value })}
            placeholder="Teacher ID"
            className="flex-grow px-3 py-2 border"
          />
          <button
            onClick={handleAddSubject}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Add Subject
          </button>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-4">Students</h3>
        {selectedClass.students && selectedClass.students.length > 0 ? (
          <>
            {console.log('Rendering StudentList with:', selectedClass.students)}
            <StudentList
              students={selectedClass.students}
              onRemoveStudent={handleRemoveStudent}
            />
          </>
        ) : (
          <p>No students enrolled in this class.</p>
        )}
        
        <h3 className="text-xl font-semibold mt-6 mb-4">Add Student</h3>
        <div className="flex mb-4">
          <input
            type="text"
            value={newStudentId}
            onChange={(e) => setNewStudentId(e.target.value)}
            placeholder="Student ID"
            className="flex-grow px-3 py-2 border rounded-l"
          />
          <button
            onClick={handleAddStudent}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
