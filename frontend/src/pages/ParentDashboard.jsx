import React from 'react';
import { ChildrenList, Chart, Notifications, RecentCommunication } from '../components';

const ParentDashboard = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <ChildrenList children={data.children} />
    <Chart title="Children's Performance" data={data.childrenPerformance} />
    <Notifications notifications={data.notifications} />
    <RecentCommunication messages={data.recentMessages} />
  </div>
);

export default ParentDashboard;

