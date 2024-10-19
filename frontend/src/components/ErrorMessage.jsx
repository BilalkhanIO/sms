import React from 'react';

const ErrorMessage = ({ message }) => {
  const errorMessage = typeof message === 'object' ? message.message : message;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{errorMessage}</span>
    </div>
  );
};

export default ErrorMessage;
