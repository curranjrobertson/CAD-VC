import React, { useState } from "react";
import axios from "axios";

function FileDownload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileDownload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("/api/upload", formData)
      .then((response) => {
        // Handle the response from the backend
        console.log(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

  return (
    <div>
      <h1>File Download</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileDownload}>Download File</button>
    </div>
  );
};

export default FileDownload;