import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fileService } from '../services/fileService';

const Files = () => {
  const dispatch = useDispatch();
  const { files, loading, error } = useSelector((state) => state.file);

  useEffect(() => {
    dispatch(fileService.getFiles());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Files</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file) => (
          <div key={file._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{file.name}</h3>
            <p>Type: {file.fileType}</p>
            <p>Size: {file.size} bytes</p>
            <p>Uploaded by: {file.uploadedBy.name}</p>
            <button 
              onClick={() => dispatch(fileService.downloadFile(file._id))}
              className="text-blue-600 hover:underline"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Files;
