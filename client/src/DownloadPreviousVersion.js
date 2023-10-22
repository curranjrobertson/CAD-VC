/* <.>
Copyright (C) <2023>  <Curran Robertson> 

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>. */
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

