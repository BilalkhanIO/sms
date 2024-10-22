import axios from 'axios';

const API_URL = '/api/classes/';

const getClasses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const deleteClass = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const createClass = async (classData) => {
  const response = await axios.post(API_URL, classData);
  return response.data;
};

const classService = {
  getClasses,
  deleteClass,
  createClass,
};

export default classService;
