import React, { useState } from "react";
import axios from "axios";
const backendBaseUrl = 'http://localhost:3001';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [folderName, setFolderName] = useState(null);
  

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    
  };
  const handleFolderNameChange = (event) => {
    setFolderName(event.target.value);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("folderName", folderName);
    console.log(formData)
   

    try {
      const response = await axios.post(`${backendBaseUrl}/upload`, formData, {
      });
      // Handle response from the server, e.g., show success message
      console.log(response);
      
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder='Folder Name' onChange={handleFolderNameChange} />
      <button onClick={handleFileUpload}>Upload File to Folder</button>
    </div>
  );
};

export default FileUpload;

