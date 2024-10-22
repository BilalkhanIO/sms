import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses, deleteClass } from '../slices/classSlice';
import { SearchBar, Table, Pagination, ConfirmModal } from '../components';

const ClassDashboard = () => {
  const dispatch = useDispatch();
  const { classes, isLoading, error } = useSelector(state => state.class);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [gradeFilter, setGradeFilter] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  const filteredClasses = classes.filter(classItem =>
    classItem.className.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (gradeFilter === '' || classItem.gradeLevel === gradeFilter)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClasses = filteredClasses.slice(indexOfFirstItem, indexOfLastItem);

  const columns = [
    { header: 'Class Name', accessor: 'className' },
    { header: 'Grade Level', accessor: 'gradeLevel' },
    { header: 'Number of Students', accessor: 'studentCount' },
    { header: 'Number of Courses', accessor: 'courseCount' },
    {
      header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <>
          <Link to={`/classes/${row._id}`} className="text-blue-500 mr-2">View</Link>
          <Link to={`/classes/${row._id}/edit`} className="text-green-500 mr-2">Edit</Link>
          <button onClick={() => handleDeleteClick(row)} className="text-red-500">Delete</button>
        </>
      ),
    },
  ];

  const handleDeleteClick = (classItem) => {
    setClassToDelete(classItem);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteClass(classToDelete._id));
    setDeleteModalOpen(false);
    setClassToDelete(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Class Management</h1>
      <div className="flex justify-between items-center mb-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <select
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="">All Grades</option>
          {/* Add grade options dynamically based on your data */}
        </select>
        <Link to="/classes/create" className="bg-blue-500 text-white px-4 py-2 rounded">Add New Class</Link>
      </div>
      <Table columns={columns} data={currentClasses} />
      <Pagination
        currentPage={currentPage}
        totalItems={filteredClasses.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Class"
        message={`Are you sure you want to delete ${classToDelete?.className}?`}
      />
    </div>
  );
};

export { ClassDashboard };
