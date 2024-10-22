import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseDetails, updateCourse } from '../slices/courseSlice';
import { Table, Modal, CourseForm, AssignTeachersForm, EnrollStudentsForm, CourseScheduleForm } from '../components';

const CourseManagement = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentCourse, isLoading, error } = useSelector(state => state.course);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignTeachersModalOpen, setIsAssignTeachersModalOpen] = useState(false);
  const [isEnrollStudentsModalOpen, setIsEnrollStudentsModalOpen] = useState(false);
  const [isEditScheduleModalOpen, setIsEditScheduleModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getCourseDetails(id));
  }, [dispatch, id]);

  const handleEditSubmit = (updatedCourseData) => {
    dispatch(updateCourse({ id, ...updatedCourseData }));
    setIsEditModalOpen(false);
  };

  const teacherColumns = [
    { header: 'Teacher Name', accessor: 'name' },
    { header: 'Teacher ID', accessor: 'teacherId' },
    {
      header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <button onClick={() => handleRemoveTeacher(row._id)} className="text-red-500">Remove</button>
      ),
    },
  ];

  const studentColumns = [
    { header: 'Student Name', accessor: 'name' },
    { header: 'Student ID', accessor: 'studentId' },
    {
      header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <button onClick={() => handleRemoveStudent(row._id)} className="text-red-500">Remove</button>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{currentCourse.courseName}</h1>
      <button onClick={() => setIsEditModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Edit Course</button>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Assigned Teachers</h2>
        <Table columns={teacherColumns} data={currentCourse.teachers} />
        <button onClick={() => setIsAssignTeachersModalOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded mt-4">Assign Teachers</button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Enrolled Students</h2>
        <Table columns={studentColumns} data={currentCourse.students} />
        <button onClick={() => setIsEnrollStudentsModalOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded mt-4">Enroll Students</button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Course Schedule</h2>
        {/* Display current schedule here */}
        <button onClick={() => setIsEditScheduleModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Edit Schedule</button>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <CourseForm
          courseData={currentCourse}
          onSubmit={handleEditSubmit}
          fields={[
            { name: 'courseName', label: 'Course Name', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'prerequisites', label: 'Prerequisites', type: 'text' },
            { name: 'credits', label: 'Number of Credits', type: 'number' },
          ]}
        />
      </Modal>

      <Modal isOpen={isAssignTeachersModalOpen} onClose={() => setIsAssignTeachersModalOpen(false)}>
        <AssignTeachersForm courseId={id} onSubmit={() => setIsAssignTeachersModalOpen(false)} />
      </Modal>

      <Modal isOpen={isEnrollStudentsModalOpen} onClose={() => setIsEnrollStudentsModalOpen(false)}>
        <EnrollStudentsForm courseId={id} onSubmit={() => setIsEnrollStudentsModalOpen(false)} />
      </Modal>

      <Modal isOpen={isEditScheduleModalOpen} onClose={() => setIsEditScheduleModalOpen(false)}>
        <CourseScheduleForm courseId={id} onSubmit={() => setIsEditScheduleModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default CourseManagement;
