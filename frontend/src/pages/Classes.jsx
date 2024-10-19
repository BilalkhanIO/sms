// src/pages/Classes.js
import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getClasses } from '../slices/classSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ClassCard from '../components/ClassCard';

const Classes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes, isLoading, error } = useSelector((state) => state.class);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Classes</h2>
        {user && (user.role === 'admin' || user.role === 'teacher') && (
          <Link
            to="/create-class"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create New Class
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <Link to={`/class/${cls._id}`}>
            <ClassCard key={cls._id} cls={cls} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Classes;
