import React from 'react';

const CourseList = ({ courses, onUpdateCourse, onRemoveCourse }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course._id} className="mb-4 p-4 border rounded">
          <input
            type="text"
            value={course.courseName}
            onChange={(e) => onUpdateCourse(course._id, { courseName: e.target.value })}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <textarea
            value={course.description}
            onChange={(e) => onUpdateCourse(course._id, { description: e.target.value })}
            className="w-full px-3 py-2 border rounded mb-2"
            placeholder="Course description"
          />
          {/* Add inputs for teachers, students, and schedule here */}
          <button
            onClick={() => onRemoveCourse(course._id)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Remove Course
          </button>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
