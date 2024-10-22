import React from 'react';
import { Card, Chart, RecentActivity } from '../components';
import { Link } from 'react-router-dom';

const AdminDashboard = ({ data }) => {
  if (!data) {
    return <div>No data available</div>; // Handle the case where data is null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card title="Total Students">
        <p className="text-3xl font-bold">{data.totalStudents}</p>
      </Card>
      <Card title="Total Teachers">
        <p className="text-3xl font-bold">{data.totalTeachers}</p>
      </Card>
      <Card title="Total Classes">
        <p className="text-3xl font-bold">{data.totalClasses}</p>
      </Card>
      <Card title="Total Courses">
        <p className="text-3xl font-bold">{data.totalCourses}</p>
      </Card>
      <Chart title="Attendance Trend" data={data.attendanceTrend} />
      <RecentActivity activities={data.recentActivities} />
      <div className="col-span-3">
        <h3 className="text-xl font-semibold mb-4">Performance Overview</h3>
        <Chart title="Top Performing Courses" data={data.performanceOverview} />
      </div>
      <div className="col-span-3">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/classes/create" className="bg-blue-500 text-white px-4 py-2 rounded text-center">
            Create New Class
          </Link>
          <Link to="/courses/create" className="bg-green-500 text-white px-4 py-2 rounded text-center">
            Create New Course
          </Link>
          <Link to="/attendance" className="bg-purple-500 text-white px-4 py-2 rounded text-center">
            Manage Attendance
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
