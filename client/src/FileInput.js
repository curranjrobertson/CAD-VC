import React, { useState } from "react";

function FileInput() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div>
      <label htmlFor="fileInput">Select a file:</label>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
      />
      {selectedFile && (
        <p>Selected file: {selectedFile.name}</p>
      )}
    </div>
  );
}

export default FileInput;