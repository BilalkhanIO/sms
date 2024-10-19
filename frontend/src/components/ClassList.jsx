// components/ClassList.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClasses } from '../slices/classSlice';

const ClassList = () => {
  const dispatch = useDispatch();
  const { classes, isLoading, isError, message } = useSelector((state) => state.class);

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {message}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Class List</h2>
      <ul className="space-y-2">
        {classes.map((cls) => (
          <li key={cls._id} className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold">{cls.name}</h3>
            <p>Teacher: {cls.teacher.name}</p>
            <p>Students: {cls.students.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
