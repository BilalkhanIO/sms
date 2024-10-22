import React from 'react';
import { Card, Chart, RecentActivity } from '../components';

const StudentDashboard = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Card title="Current GPA">
      <p className="text-3xl font-bold">{data.currentGPA}</p>
    </Card>
    <Card title="Attendance Percentage">
      <p className="text-3xl font-bold">{data.attendancePercentage}%</p>
    </Card>
    <Card title="Upcoming Assignments">
      <p className="text-3xl font-bold">{data.upcomingAssignments}</p>
    </Card>
    <Chart title="Grade Progress" data={data.gradeProgress} />
    <Chart title="Attendance Trend" data={data.attendanceTrend} />
    <RecentActivity activities={data.assignments} title="Recent Assignments" />
    <div className="col-span-3">
      <h3 className="text-xl font-semibold mb-4">Class Schedule</h3>
      {/* Add a component to display class schedule */}
    </div>
  </div>
);

export default StudentDashboard;
