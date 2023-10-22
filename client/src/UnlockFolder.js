import React from "react";
import axios from "axios";
const backendBaseUrl = 'http://localhost:3001';

function UnlockFolder() {
  // const [folderName, setFolderName] = useState(null);

//   const handleFolderNameInput = (event) => {
//     setFolderName(event.target.value);
// };
  
  const unlockFolder = async () => {
    try {
      // console.log(folderName);
      const response = await axios.post(`${backendBaseUrl}/unlockfolder`);
    // Handle response from the server, e.g., show success message
    // eslint-disable-next-line
    console.log(response);

} catch (error) {
  // Handle error
  console.log(error);
}
  };

  return (
    <div>
      <h1>Project Unlock</h1>
      {/* <input type="text" placeholder='Folder Name' onChange={handleFolderNameInput} /> */}
      <button onClick={unlockFolder}>Unlock Project</button>
    </div>
  );
}

export default UnlockFolder;
