import React, { useState } from "react";
import axios from "axios";
const backendBaseUrl = 'http://localhost:3001';

function BucketName() {
  const [bucketName, setBucketName] = useState(null);
  
  const handleBucketNameChange = (event) => {
    setBucketName(event.target.value);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    console.log(bucketName);
    formData.append("bucketName", bucketName);
    console.log(formData)
   

    try {
      const response = await axios.post(`${backendBaseUrl}/setworkingbucket`, {bucketName}, {
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
      <h1>Set Working Project</h1>
      <input type="text" placeholder='Project Name' onChange={handleBucketNameChange} />
      <button onClick={handleFileUpload}>Set Working Project</button>
    </div>
  );
};

export default BucketName;