import React from 'react';

const QuickActions = ({ actions }) => {
  return (
    <div className="quick-actions">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => console.log(`Action: ${action}`)}
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;

