// components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDashboardData } from '../slices/dashboardSlice';
import ClassList from './ClassList';
import AttendanceForm from './AttendanceForm';
import ExamList from './ExamList';
import UserManagement from './UserManagement';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, isError, message } = useSelector((state) => state.dashboard);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  useEffect(() => {
    if (data && data.classes && data.classes.length > 0) {
      setSelectedClass(data.classes[0]._id);
    }
  }, [data]);

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (isError) return <div className="text-red-500 text-center">Error: {message}</div>;

  const AdminDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Users" value={data.userCount} />
        <DashboardCard title="Total Classes" value={data.classCount} />
        <DashboardCard title="Total Teachers" value={data.teacherCount} />
        <DashboardCard title="Total Students" value={data.studentCount} />
      </div>
      <UserManagement />
      <ClassList />
    </div>
  );

  const TeacherDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="Your Classes" value={data.classes.length} />
        <DashboardCard title="Total Students" value={data.classes.reduce((acc, cls) => acc + cls.students.length, 0)} />
        <DashboardCard title="Upcoming Exams" value={data.upcomingExams} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Classes</h2>
          <ClassList />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>
          {selectedClass && <AttendanceForm classId={selectedClass} />}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Exams</h2>
        {selectedClass && <ExamList classId={selectedClass} />}
      </div>
    </div>
  );

  const StudentDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="Attendance Rate" value={`${(data.attendanceRate * 100).toFixed(2)}%`} />
        <DashboardCard title="Average Grade" value={data.averageGrade.toFixed(2)} />
        <DashboardCard title="Upcoming Exams" value={data.upcomingExams} />
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Grade Progress</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.gradeProgress}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="grade" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Classes</h2>
        <ClassList />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Upcoming Exams</h2>
        {selectedClass && <ExamList classId={selectedClass} />}
      </div>
    </div>
  );

  const DashboardCard = ({ title, value }) => (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user.name}!</h1>
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'teacher' && <TeacherDashboard />}
      {user.role === 'student' && <StudentDashboard />}
    </div>
  );
};

export default Dashboard;