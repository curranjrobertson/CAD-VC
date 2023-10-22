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