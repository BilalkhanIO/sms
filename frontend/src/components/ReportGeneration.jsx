import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { generateReport } from '../slices/classSlice';

const ReportGeneration = ({ classId }) => {
  const dispatch = useDispatch();
  const [reportType, setReportType] = useState('roster');
  const [report, setReport] = useState(null);

  const handleGenerateReport = () => {
    dispatch(generateReport({ classId, reportType })).then((result) => {
      setReport(result.payload);
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Report Generation</h2>
      <div className="mb-4">
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="mr-2 px-2 py-1 border rounded"
        >
          <option value="roster">Class Roster</option>
          {/* Add more report types as needed */}
        </select>
        <button onClick={handleGenerateReport} className="bg-blue-500 text-white px-4 py-2 rounded">Generate Report</button>
      </div>
      {report && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Report</h3>
          <pre>{JSON.stringify(report, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ReportGeneration;
