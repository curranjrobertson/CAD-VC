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