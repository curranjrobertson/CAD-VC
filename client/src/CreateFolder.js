import React from "react";
import axios from "axios";
const backendBaseUrl = 'http://localhost:3001';

function CreateFolder() {
    const [folderName, setFolderName] = React.useState("");
    
    const handleFolderNameChange = (event) => {
        setFolderName(event.target.value);
    };
    
    const handleCreateFolder = async () => {
        console.log(folderName)

        try {
            const response = await axios.post(`${backendBaseUrl}/createFolder`, {folderName}, {
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
        <h1>Create Folder</h1>
        <input type="text" placeholder='Folder Name' onChange={handleFolderNameChange} />
        <button onClick={handleCreateFolder}>Create Folder</button>
        </div>
    );
};

export default CreateFolder;