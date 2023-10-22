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
