import React from 'react';

const RecentActivity = ({ activities }) => {
  return (
    <div className="recent-activity">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <ul className="space-y-2">
        {activities.map((activity, index) => (
          <li key={index} className="bg-gray-100 p-2 rounded">
            {activity.description}
            <span className="text-sm text-gray-500 ml-2">
              {new Date(activity.timestamp).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;

