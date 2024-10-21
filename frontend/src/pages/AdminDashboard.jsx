import React from 'react';
import { Card, Chart, RecentActivity } from '../components';

const AdminDashboard = ({ data }) => (
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
    <Chart title="Attendance Trend" data={data.attendanceTrend} />
    <RecentActivity activities={data.recentActivities} />
  
  </div>
);

export default AdminDashboard;

