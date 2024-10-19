import React from 'react';
import { ClassSchedule, AssignmentList, Chart, Notifications, RecentActivity } from '../components';

const StudentDashboard = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <ClassSchedule schedule={data.schedule} />
    <AssignmentList assignments={data.assignments} />
    <Chart title="Your Performance" data={data.performance} />
    <Notifications notifications={data.notifications} />
    <RecentActivity activities={data.recentActivities} />
  </div>
);

export default StudentDashboard;

