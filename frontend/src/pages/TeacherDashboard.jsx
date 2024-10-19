import React from 'react';
import { ClassSchedule, AssignmentList, Chart, RecentCommunication, QuickActions } from '../components';

const TeacherDashboard = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <ClassSchedule schedule={data.schedule} />
    <AssignmentList assignments={data.assignments} />
    <Chart title="Class Performance" data={data.classPerformance} />
    <RecentCommunication messages={data.recentMessages} />
    <QuickActions actions={data.quickActions} />
  </div>
);

export default TeacherDashboard;

