import React from 'react';
import { Chart,  RecentActivity } from '../components';

const StudentDashboard = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Chart title="Your Performance" data={data.performance} />
    <RecentActivity activities={data.recentActivities} />
  </div>
);

export default StudentDashboard;

