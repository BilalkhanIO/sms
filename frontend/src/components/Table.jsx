import React from 'react';

const Table = ({ columns, data }) => {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="border p-2">{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="border p-2">
                {column.Cell ? column.Cell({ row }) : row[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

