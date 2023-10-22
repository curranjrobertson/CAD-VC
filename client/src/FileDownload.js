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