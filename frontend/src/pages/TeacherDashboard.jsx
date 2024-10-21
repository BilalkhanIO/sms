import React from 'react';
import {  Chart } from '../components';

const TeacherDashboard = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Chart title="Class Performance" data={data.classPerformance} />
    
  </div>
);

export default TeacherDashboard;

