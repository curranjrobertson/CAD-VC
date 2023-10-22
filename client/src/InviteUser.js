import React from "react";
import axios from "axios";
const backendBaseUrl = 'http://localhost:3001';

function InviteUser() {
    const [userEmail, setUserEmail] = React.useState("");
    
    const handleUserNameChange = (event) => {
        setUserEmail(event.target.value);
    };
    
    const handleInviteUser = async () => {
        const formData = new FormData();
        formData.append("userEmail", userEmail);
        console.log(userEmail)

        try {
            const response = await axios.post(`${backendBaseUrl}/adduser`, {userEmail}, {
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
        <h1>Add User To Project</h1>
        <input type="text" placeholder='User Email' style={{width: "200px"}} onChange={handleUserNameChange} />
        <button onClick={handleInviteUser}>Add User</button>
        </div>
    );
};

export default InviteUser;