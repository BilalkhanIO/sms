import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createClass, updateClass } from '../slices/classSlice';

const ClassForm = ({ classToEdit, onSubmit }) => {
  const [classData, setClassData] = useState({
    classId: '',
    className: '',
    gradeLevel: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (classToEdit) {
      setClassData(classToEdit);
    } else {
      setClassData({ classId: '', className: '', gradeLevel: '' });
    }
  }, [classToEdit]);

  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (classToEdit) {
      dispatch(updateClass(classData));
    } else {
      dispatch(createClass(classData));
    }
    setClassData({ classId: '', className: '', gradeLevel: '' });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">{classToEdit ? 'Edit Class' : 'Add New Class'}</h3>
      <div>
        <label htmlFor="classId" className="block mb-1">Class ID</label>
        <input
          type="text"
          id="classId"
          name="classId"
          value={classData.classId}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="className" className="block mb-1">Class Name</label>
        <input
          type="text"
          id="className"
          name="className"
          value={classData.className}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="gradeLevel" className="block mb-1">Grade Level</label>
        <input
          type="text"
          id="gradeLevel"
          name="gradeLevel"
          value={classData.gradeLevel}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {classToEdit ? 'Update Class' : 'Add Class'}
      </button>
    </form>
  );
};

export default ClassForm;
