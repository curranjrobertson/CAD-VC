import React, { useState } from "react";
import axios from "axios";
const backendBaseUrl = 'http://localhost:3001';

function FolderSync() {
  const [folderName, setFolderName] = useState(null);

  const handleFolderNameInput = (event) => {
    setFolderName(event.target.value);
};

  const handleFolderSync = async () => {
    try {

      const response = await axios.post(
        `${backendBaseUrl}/folderSync`, { folderName },
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Folder Sync</h1>
      <input type="text" placeholder='Folder Name' onChange={handleFolderNameInput} />
      <button onClick={handleFolderSync}>Sync Folder</button>
    </div>
  );
}

export default FolderSync;
