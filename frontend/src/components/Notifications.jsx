import React from 'react';

const Notifications = ({ notifications }) => {
  return (
    <div className="notifications">
      <h3 className="text-xl font-semibold mb-4">Notifications</h3>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="mb-2">{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;

