import React from 'react';

const NoticesList = ({ notices }) => {
  return (
    <div className="notices-list">
      <h3 className="text-lg font-semibold mb-4">School Notices</h3>
      <ul className="space-y-2">
        {notices.map((notice) => (
          <li key={notice._id} className="bg-gray-100 p-2 rounded">
            <h4 className="font-medium">{notice.title}</h4>
            <p className="text-sm">{notice.content}</p>
            <span className="text-sm text-gray-500">
              Posted on: {new Date(notice.createdAt).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticesList;

