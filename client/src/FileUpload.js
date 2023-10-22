/* <one line to give the program's name and a brief idea of what it does.>
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

