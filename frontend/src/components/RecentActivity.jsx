import React from 'react';
import { useSelector } from 'react-redux';

const RecentActivity = () => {
  const { recentActivities } = useSelector((state) => state.dashboard);

  if (!recentActivities || recentActivities.length === 0) {
    return <div>No recent activities</div>;
  }

  return (
    <div>
      <h2>Recent Activities</h2>
      <ul>
        {recentActivities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
