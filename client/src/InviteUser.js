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