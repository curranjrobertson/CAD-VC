import React from "react";
import axios from "axios";
const backendBaseUrl = 'http://localhost:3001';

function LockFolder() {
  // const [folderName, setFolderName] = useState(null);

//   const handleFolderNameInput = (event) => {
//     setFolderName(event.target.value);
// };
  
  const lockFolder = async () => {
    try {
      // console.log(folderName);
      const response = await axios.post(`${backendBaseUrl}/lockFolder`);
    // Handle response from the server
    // eslint-disable-next-line
    console.log(response);

} catch (error) {
  // Handle error
  console.log(error);
}
  };

  return (
    <div>
      <h1>Project Lock</h1>
      {/* <input type="text" placeholder='Folder Name' onChange={handleFolderNameInput} /> */}
      <button onClick={lockFolder}>Lock Project</button>
    </div>
  );
}

export default LockFolder;
