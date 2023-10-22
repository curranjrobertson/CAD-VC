import React, { useState } from "react";
import axios from "axios";
const backendBaseUrl = 'http://localhost:3001';
const bucketName = 'cr-new-test-bucket';

function DownloadPreviousVersion() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [version, setVersion] = useState(null);
  const [folderName, setFolderName] = useState(null);
  
  const handleFolderNameInput = (event) => {
    setFolderName(event.target.value);
};
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    
  };
  const handleFileVersion = (event) => {
    setVersion(event.target.value);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("version", version);
    formData.append("folderName", folderName);
    console.log(formData)
   

    try {
      const response = await axios.post(`${backendBaseUrl}/downloadpreviousversion?bucket=${bucketName}`, formData, {
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
      <h1>Download Previous Version</h1>
      <input type="text" placeholder='Folder Name' onChange={handleFolderNameInput} />
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder='Number of Uploads to Revert' style={{width: "200px"}} onChange={handleFileVersion} />
      <button onClick={handleFileUpload}>Download Previous Version</button>
    </div>
  );
};

export default DownloadPreviousVersion;

