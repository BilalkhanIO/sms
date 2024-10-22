import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateAttendanceReport, generatePerformanceReport } from '../slices/reportSlice';
import { Chart } from '../components';

const ReportingAndAnalytics = () => {
  const dispatch = useDispatch();
  const { attendanceReport, performanceReport, isLoading, error } = useSelector(state => state.report);
  const [reportType, setReportType] = useState('attendance');
  const [reportParams, setReportParams] = useState({
    startDate: '',
    endDate: '',
    classId: '',
    courseId: '',
    studentId: '',
  });

  const handleGenerateReport = () => {
    if (reportType === 'attendance') {
      dispatch(generateAttendanceReport(reportParams));
    } else {
      dispatch(generatePerformanceReport(reportParams));
    }
  };

  const handleExport = (format) => {
    // Implement export logic here
    console.log(`Exporting ${reportType} report as ${format}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Reporting and Analytics</h1>
      <div className="mb-4">
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="attendance">Attendance Report</option>
          <option value="performance">Performance Report</option>
        </select>
        {/* Add input fields for report parameters */}
        <button onClick={handleGenerateReport} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">Generate Report</button>
      </div>
      {attendanceReport && reportType === 'attendance' && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Attendance Report</h2>
          <Chart title="Attendance Trends" data={attendanceReport.trends} />
          {/* Display other attendance report data */}
        </div>
      )}
      {performanceReport && reportType === 'performance' && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Performance Report</h2>
          <Chart title="Grade Distribution" data={performanceReport.gradeDistribution} />
          {/* Display other performance report data */}
        </div>
      )}
      <div className="mt-4">
        <button onClick={() => handleExport('csv')} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Export as CSV</button>
        <button onClick={() => handleExport('pdf')} className="bg-red-500 text-white px-4 py-2 rounded">Export as PDF</button>
      </div>
    </div>
  );
};

export default ReportingAndAnalytics;
