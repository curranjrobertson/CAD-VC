import React from "react";
import axios from "axios";
const backendBaseUrl = 'http://localhost:3001';

function CreateBucket() {
    const [bucketName, setBucketName] = React.useState("");
    
    const handleBucketNameChange = (event) => {
        setBucketName(event.target.value);
    };
    
    const handleCreateBucket = async () => {
        const formData = new FormData();
        formData.append("bucketName", bucketName);
        console.log(bucketName)

        try {
            const response = await axios.post(`${backendBaseUrl}/createBucket`, {bucketName}, {
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
        <h1>Create Project</h1>
        <input type="text" placeholder='Project Name' onChange={handleBucketNameChange} />
        <button onClick={handleCreateBucket}>Create Project</button>
        </div>
    );
};

export default CreateBucket;