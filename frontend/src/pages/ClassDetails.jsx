import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClassDetails, updateClass } from '../slices/classSlice';
import { Table, Modal, Tabs, EditClassForm } from '../components';

const ClassDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentClass, isLoading, error } = useSelector(state => state.class);
  const [activeTab, setActiveTab] = useState('students');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getClassDetails(id));
  }, [dispatch, id]);

  const handleEditSubmit = (updatedClassData) => {
    dispatch(updateClass({ id, ...updatedClassData }));
    setIsEditModalOpen(false);
  };

  const studentColumns = [
    { header: 'Student Name', accessor: 'name' },
    { header: 'Student ID', accessor: 'studentId' },
    { header: 'Grade Level', accessor: 'gradeLevel' },
    {
      header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <>
          <Link to={`/students/${row._id}`} className="text-blue-500 mr-2">View Profile</Link>
          <button onClick={() => handleRemoveStudent(row._id)} className="text-red-500">Remove</button>
        </>
      ),
    },
  ];

  const courseColumns = [
    { header: 'Course Name', accessor: 'courseName' },
    { header: 'Number of Teachers', accessor: 'teacherCount' },
    { header: 'Number of Students', accessor: 'studentCount' },
    { header: 'Schedule', accessor: 'schedule' },
    {
      header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <>
          <Link to={`/courses/${row._id}`} className="text-blue-500 mr-2">View Details</Link>
          <Link to={`/courses/${row._id}/edit`} className="text-green-500 mr-2">Edit</Link>
          <button onClick={() => handleRemoveCourse(row._id)} className="text-red-500">Remove</button>
        </>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{currentClass.className}</h1>
      <p>Grade Level: {currentClass.gradeLevel}</p>
      <button onClick={() => setIsEditModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Edit Class</button>

      <Tabs
        tabs={[
          { label: 'Students', id: 'students' },
          { label: 'Courses', id: 'courses' },
          { label: 'Schedule', id: 'schedule' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === 'students' && (
        <div>
          <Table columns={studentColumns} data={currentClass.students} />
          <button onClick={() => handleAddStudents()} className="bg-green-500 text-white px-4 py-2 rounded mt-4">Add Students</button>
        </div>
      )}

      {activeTab === 'courses' && (
        <div>
          <Table columns={courseColumns} data={currentClass.courses} />
          <button onClick={() => handleAddCourse()} className="bg-green-500 text-white px-4 py-2 rounded mt-4">Add Course</button>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div>
          <WeeklySchedule courses={currentClass.courses} />
          <button onClick={() => handleEditSchedule()} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Edit Schedule</button>
        </div>
      )}

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditClassForm classData={currentClass} onSubmit={handleEditSubmit} />
      </Modal>
    </div>
  );
};

export default ClassDetails;
