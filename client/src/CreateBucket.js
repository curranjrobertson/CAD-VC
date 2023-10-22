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