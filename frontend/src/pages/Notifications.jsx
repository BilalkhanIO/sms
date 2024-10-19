// src/pages/Notifications.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, markAsRead } from '../slices/notificationSlice';

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications, isLoading, error } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const handleMarkAsRead = (id) => {
    dispatch(markAsRead(id));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Notifications</h2>
      {notifications.map((notification) => (
        <div key={notification._id} className={`bg-white p-4 rounded shadow mb-4 ${notification.read ? 'opacity-50' : ''}`}>
          <h3 className="text-lg font-semibold">{notification.title}</h3>
          <p>{notification.message}</p>
          <p className="text-sm text-gray-500">
            Sent by: {notification.sender.name} | {new Date(notification.createdAt).toLocaleString()}
          </p>
          {!notification.read && (
            <button
              onClick={() => handleMarkAsRead(notification._id)}
              className="mt-2 bg-blue-600 text-white py-1 px-2 rounded text-sm hover:bg-blue-700"
            >
              Mark as Read
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
