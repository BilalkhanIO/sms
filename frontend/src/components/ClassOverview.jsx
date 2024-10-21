import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from '../slices/classSlice';
import { Link } from 'react-router-dom';

const ClassOverview = () => {
  const dispatch = useDispatch();
  const { classes, isLoading, error } = useSelector((state) => state.class);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Class Overview</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search classes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Class Name</th>
            <th>No. of Students</th>
            <th>No. of Courses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClasses.map(cls => (
            <tr key={cls._id}>
              <td>{cls.name}</td>
              <td>{cls.students.length}</td>
              <td>{cls.courses.length}</td>
              <td>
                <Link to={`/class/${cls._id}`} className="text-blue-500 hover:underline mr-2">View</Link>
                <Link to={`/class/edit/${cls._id}`} className="text-green-500 hover:underline mr-2">Edit</Link>
                <button className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/class/create" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add New Class
      </Link>
    </div>
  );
};

export default ClassOverview;

