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
import "./App.css";
import FileUpload from "./FileUpload.js";
import LockFolder from "./LockFolder.js";
import UnlockFolder from "./UnlockFolder.js";
import CreateFolder from "./CreateFolder.js";
import FolderSync from "./FolderSync.js";
import DownloadPreviousVersion from "./DownloadPreviousVersion.js";
import CreateBucket from "./CreateBucket.js";
import InviteUser from "./InviteUser.js";
import SetWorkingBucket from "./SetWorkingBucket.js";


export default function App() {
  const [data, setData] = useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.text())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "CAD Version Control App" : data}</p>
        <section id="revision-management">
          <h2>Revision Management:</h2>
          <form>
            <CreateBucket />
            <SetWorkingBucket />
            <InviteUser />
            <CreateFolder />
            <FolderSync />
            <FileUpload />
            <DownloadPreviousVersion />
          </form>
          <hr></hr>
          <br></br>
          <LockFolder />
          <UnlockFolder />
        </section>
      </header>
    </div>
  );
}