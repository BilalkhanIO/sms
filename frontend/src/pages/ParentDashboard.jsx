import React from 'react';
import { Chart } from '../components';

const ParentDashboard = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Chart title="Children's Performance" data={data.childrenPerformance} />
  </div>
);

export default ParentDashboard;

