import React from 'react';

const RecentCommunication = ({ messages }) => {
  return (
    <div className="recent-communication">
      <h3 className="text-lg font-semibold mb-4">Recent Messages</h3>
      <ul className="space-y-2">
        {messages.map((message) => (
          <li key={message._id} className="bg-gray-100 p-2 rounded">
            <span className="font-medium">{message.sender.name}</span>: {message.content}
            <span className="text-sm text-gray-500 ml-2">
              {new Date(message.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentCommunication;

