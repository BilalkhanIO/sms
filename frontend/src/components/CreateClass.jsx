// src/pages/CreateClass.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createClass } from '../slices/classSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CreateClass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [classData, setClassData] = useState({
    name: '',
    description: '',
    batchStartYear: '',
    batchEndYear: '',
    subjects: [],
    students: []
  });
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchTeachersAndStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const [teachersResponse, studentsResponse] = await Promise.all([
          axios.get('/api/users?role=teacher', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/users?role=student', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setTeachers(teachersResponse.data);
        setStudents(studentsResponse.data);
      } catch (error) {
        console.error('Failed to fetch teachers or students:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };
    fetchTeachersAndStudents();
  }, [navigate]);

  const handleInputChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...classData.subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setClassData({ ...classData, subjects: newSubjects });
  };

  const addSubject = () => {
    setClassData({
      ...classData,
      subjects: [...classData.subjects, { name: '', teacher: '', schedule: [] }],
    });
  };

  const removeSubject = (index) => {
    const newSubjects = classData.subjects.filter((_, i) => i !== index);
    setClassData({ ...classData, subjects: newSubjects });
  };

  const addScheduleItem = (subjectIndex) => {
    const newSubjects = [...classData.subjects];
    newSubjects[subjectIndex].schedule.push({ day: '', startTime: '', endTime: '' });
    setClassData({ ...classData, subjects: newSubjects });
  };

  const updateScheduleItem = (subjectIndex, scheduleIndex, field, value) => {
    const newSubjects = [...classData.subjects];
    newSubjects[subjectIndex].schedule[scheduleIndex][field] = value;
    setClassData({ ...classData, subjects: newSubjects });
  };

  const handleStudentChange = (selectedStudents) => {
    setClassData({ ...classData, students: selectedStudents });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!classData.name || !classData.batchStartYear || !classData.batchEndYear || classData.subjects.length === 0) {
      alert('Please fill in all required fields and add at least one subject');
      return;
    }

    for (const subject of classData.subjects) {
      if (!subject.name || !subject.teacher || subject.schedule.length === 0) {
        alert('Each subject must have a name, a teacher assigned, and at least one schedule');
        return;
      }
    }

    try {
      const result = await dispatch(createClass(classData)).unwrap();
      navigate(`/classes/${result._id}`);
    } catch (error) {
      console.error('Failed to create class:', error);
      alert(`Failed to create class: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create New Class</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Class Name</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={classData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <Textarea
              id="description"
              name="description"
              value={classData.description}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="batchStartYear" className="block text-sm font-medium text-gray-700">Batch Start Year</label>
              <Input
                type="number"
                id="batchStartYear"
                name="batchStartYear"
                value={classData.batchStartYear}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="batchEndYear" className="block text-sm font-medium text-gray-700">Batch End Year</label>
              <Input
                type="number"
                id="batchEndYear"
                name="batchEndYear"
                value={classData.batchEndYear}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Subjects</h3>
            {classData.subjects.map((subject, subjectIndex) => (
              <div key={subjectIndex} className="mb-4 p-4 border rounded">
                <Input
                  type="text"
                  placeholder="Subject Name"
                  value={subject.name}
                  onChange={(e) => handleSubjectChange(subjectIndex, 'name', e.target.value)}
                  className="mb-2"
                  required
                />
                <Select
                  value={subject.teacher}
                  onValueChange={(value) => handleSubjectChange(subjectIndex, 'teacher', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher._id} value={teacher._id}>{teacher.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-2">
                  <h4 className="text-sm font-medium mb-1">Schedule</h4>
                  {subject.schedule.map((scheduleItem, scheduleIndex) => (
                    <div key={scheduleIndex} className="flex space-x-2 mb-2">
                      <Input
                        type="text"
                        placeholder="Day"
                        value={scheduleItem.day}
                        onChange={(e) => updateScheduleItem(subjectIndex, scheduleIndex, 'day', e.target.value)}
                        className="flex-grow"
                      />
                      <Input
                        type="time"
                        value={scheduleItem.startTime}
                        onChange={(e) => updateScheduleItem(subjectIndex, scheduleIndex, 'startTime', e.target.value)}
                      />
                      <Input
                        type="time"
                        value={scheduleItem.endTime}
                        onChange={(e) => updateScheduleItem(subjectIndex, scheduleIndex, 'endTime', e.target.value)}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => addScheduleItem(subjectIndex)}
                    variant="outline"
                    className="mt-1"
                  >
                    Add Schedule Item
                  </Button>
                </div>
                <Button
                  type="button"
                  onClick={() => removeSubject(subjectIndex)}
                  variant="destructive"
                  className="mt-2"
                >
                  Remove Subject
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={addSubject}
              variant="outline"
              className="mt-2"
            >
              Add Subject
            </Button>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Students</h3>
            <Select
              multiple
              value={classData.students}
              onValueChange={handleStudentChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select students" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student._id} value={student._id}>{student.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Create Class
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateClass;
