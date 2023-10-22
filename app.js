/* <one line to give the program's name and a brief idea of what it does.>
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
// Importing the required modules
import * as fs from 'fs';
import express from 'express';
process.env.GOOGLE_APPLICATION_CREDENTIALS = '';
import {Storage} from '@google-cloud/storage';
import path from 'path';
import multer from 'multer';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
// import { os } from 'node:os';

// constants
const router = express();
const port = 3001;
const storage = new Storage();
let bucketName = null;
const file = 'drawing.html';
const filePath = "./documents/drawing.html";
const lock_File = "./documents/drawing.html";
const __dirname = path.resolve();
// const homeDir = os.homedir();
// const desktopDir = `${homeDir}/Desktop`;
// console.log(desktopDir);

router.use(cors({
  origin: '*'
}));

router.use(bodyParser.json());

const upload = multer({ storage: multer.memoryStorage() });

router.listen(port, function(error){
  if (error) {
    console.log('Error', error)
  } else {
      console.log('Server is listening on port ' + port)
    }
});

router.post('/createbucket', async (req, res) => {
  var bucketName = req.body.bucketName;
  console.log('Recieved bucket name: ', bucketName);
  const location = 'us-central1';
  const storageClass = 'COLDLINE';
  try {
    const [bucket] = await storage.createBucket(bucketName, {
      location,
      [storageClass]: true,
    });
    console.log(`Bucket ${bucketName} created successfully.`);
    const versioning = await storage.bucket(bucketName).setMetadata({versioning: {enabled: true}});
    console.log(`Versioning is disabled for bucket ${bucketName}`);
  } catch (error) {
    console.error('Error creating bucket:', error);
  }
});

router.post('/setworkingbucket', async (req, res) => {
  try {
    bucketName = req.body.bucketName;
    console.log('Recieved bucket name: ', bucketName);
    const bucket = storage.bucket(bucketName);
    console.log('Bucket set successfully.');
  } catch (error) {
    console.error('Error setting bucket:', error);
  }
});

router.post('/adduser', async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    console.log('Received user email: ', userEmail);
    const bucket = storage.bucket(bucketName);
    console.log('Bucket Name: ', bucketName);

    // Get the current IAM policy of the bucket
    const [policy] = await bucket.iam.getPolicy({ requestedPolicyVersion: 3 });
    console.log('Current IAM Policy: ', policy)

    // Add the user's email to the policy with a desired role
    const updatedBindings = [
      ...policy.bindings,
      {
        role: 'roles/storage.objectAdmin', // Modify the appropriate role as needed
        members: [`user:${userEmail}`] // Add the user with the provided email
      }
    ];

    // Update the policy with the new bindings
    const updatedIamPolicy = {
      bindings: updatedBindings
    };

    // Set the updated policy for the bucket
    await bucket.iam.setPolicy(updatedIamPolicy);

    console.log(`User ${userEmail} added to bucket ${bucketName} with objectAdmin role.`);

    // // Send an email to the user
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.tempmail.com',
    //   port: 465,
    //   secure: false,
    //   requireTLS: true,
    //   ignoreTLS: false
    // });

    // const mailOptions = {
    //   from: 'pogeter335@cwtaa.com',
    //   to: userEmail,
    //   subject: 'You have been added to a Google Cloud Storage bucket',
    //   text: `You have been added to the Google Cloud Storage bucket ${bucketName} with objectAdmin role.`
    // };

    // transporter.sendMail(mailOptions, function(error, info){ 
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });


  } catch (error) {
    console.error('Error adding user to bucket:', error);
  }
});

router.post('/createFolder', (req, res) => {
  try {
    console.log("Recieved bucket name: " + bucketName);
    const folderName = req.body.folderName;
    console.log("Recieved folder name: ", folderName);  

    const bucket = storage.bucket(bucketName);
    const emptyFilePath = folderName + '/';
    const file = bucket.file(emptyFilePath);
    
    file.save('');

    res.status(200).send('Folder created successfully');
    console.log('Folder created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating folder');
    console.log('Error creating folder');
  }
});

router.post('/folderSync', async (req, res) => {
  try {
    console.log("Received bucket name: " + bucketName);
    const folderName = req.body.folderName;
    console.log("Received folder name: ", folderName);

    const bucket = storage.bucket(bucketName);
    const filePath = folderName + '/';
    console.log("FilePath: ", filePath);

    const localFolderPath = './documents/' + folderName + '/'; // Specify the local folder path

    fs.mkdirSync(localFolderPath, { recursive: true }); // Create the local folder if it doesn't exist

    const [cloudFiles] = await bucket.getFiles({ prefix: filePath }); // Get cloud files

    for (const cloudFile of cloudFiles) {
      const localFileName = path.basename(cloudFile.name);
      const localFilePath = path.join(localFolderPath, localFileName);

      try {
        const localStat = fs.existsSync(localFilePath) ? fs.statSync(localFilePath) : null;
        const cloudUpdatedTimestamp = new Date(cloudFile.metadata.updated);
        const timestampThreshold = 1000; // Threshold in milliseconds

        if (localStat) {
          const localTimestamp = localStat.mtime.getTime(); // Convert to timestamp in milliseconds
          console.log('Local Time Stamp: ', localStat.mtime.getTime());
          const cloudTimestamp = new Date(cloudUpdatedTimestamp).getTime();
          console.log('Cloud Time Stamp: ', cloudTimestamp);

          const timestampDifference = (localTimestamp - cloudTimestamp);
          console.log('Timestamp Difference: ', timestampDifference);

          if (timestampDifference > timestampThreshold) {
            console.log(`Local file ${localFileName} is newer. Uploading to cloud.`);
            await cloudFile.save(filePath + localFileName);
          } else {
            console.log(`Cloud file ${localFileName} is newer or timestamps are the same. Downloading from cloud.`);
            await cloudFile.download({ destination: localFilePath });
          }
        } else {
          console.log(`Local file ${localFileName} does not exist. Downloading from cloud.`);
          await cloudFile.download({ destination: localFilePath });
        }
        
      } catch (error) {
        console.error(`Error processing file ${localFileName}:`, error);
      }
    }

    res.status(200).send('Folder synced successfully');
    console.log('Folder synced successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error syncing folder');
    console.log('Error syncing folder');
  }
});

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filename = req.file.originalname;
    console.log("Recieved file name: ", filename);
    const folderName = req.body.folderName;

    const bucket = storage.bucket(bucketName);
    const emptyFilePath = folderName + '/';
    console.log("EmptyFilePath: ", emptyFilePath);
    const file = bucket.file(emptyFilePath + filename);
    const stream = file.createWriteStream();

    stream.end(req.file.buffer); 

    res.status(200).send('File uploaded successfully');
    console.log('File uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading file');
    console.log('Error uploading file');
  }
});

router.post('/downloadpreviousversion', upload.single('file'), async (req, res) => {
  try {
    const fileName = req.file.originalname;
    console.log("Recieved file name: ", fileName);
    const version = req.body.version;
    console.log("Recieved version: ", version);
    const folderName = req.body.folderName;

    const bucket = storage.bucket(bucketName);
    const filePath = folderName + '/';

    const filen = bucket.file(filePath + fileName);

    async function listGenerations(bucket, filePath, fileName, version) {
      const [files] = await bucket.getFiles({ prefix: filePath + fileName, versions: true });
      console.log('Files:');
      files.forEach(file => {
        console.log(file.name, file.generation);
      });
      const generationNumbers = files.map((file) => file.metadata.generation);
      
      return generationNumbers;
    }
    
    const generationNumbers = await listGenerations(bucket, filePath, fileName);
    console.log('Generation Numbers: ', generationNumbers);

    const previousGeneration = generationNumbers[version];
    console.log('Previous Generation: ', previousGeneration); 
    const file = bucket.file(filePath + fileName, {generation: previousGeneration});
    const localFolderPath = './documents/' + folderName + '/'; 
    

    const localFilePath = path.join(localFolderPath, fileName);
    const fileExists = await file.exists();
    if (!fileExists) {
      console.log('File does not exist');
    return;
}
    await file.download({ destination: localFilePath });
    console.log(`Previous version downloaded to ${localFilePath}`);
  } catch (error) {
    console.error('Error downloading previous version:', error);
  }
});

router.post('/lockfolder', async (req, res) => {
  try {
    const bucket = storage.bucket(bucketName);
    console.log("Received bucket name: ", bucketName);
    const folderName = req.body.folderName;
    console.log("Received folder name: ", folderName);
    const retentionPeriod = 3600;

    // Turn off versioning
    const versioning = await storage.bucket(bucketName).setMetadata({versioning: {enabled: false}});
    console.log(`Versioning is enabled for bucket ${bucketName}`);

    // Construct the folder path
    const folderPath = folderName + '/';
    const [metadata] = await storage.bucket(bucketName).setRetentionPeriod(retentionPeriod);
    console.log(`Bucket ${bucketName} retention period set for ${metadata.retentionPolicy.retentionPeriod} seconds.`);
  }
  catch (error) {
    console.log(error);
  }
});

router.post('/unlockfolder', async (req, res) => {
  try {
    const bucket = storage.bucket(bucketName);
    console.log("Received bucket name: ", bucketName);
    const folderName = req.body.folderName;
    console.log("Received folder name: ", folderName);

    // Construct the folder path
    const folderPath = folderName + '/';
    const [metaData] = await storage.bucket(bucketName).getMetadata();
    console.log(metaData)
    if (metaData.retentionPolicy && metaData.retentionPolicy.isLocked) {
      console.log(`Unable to remove retention period as retention policy is locked for bucket ${bucketName}.`);
    } else {
      const results = await storage.bucket(bucketName).removeRetentionPeriod();
      console.log(`Removed retention period for bucket ${bucketName}.`)
      const versioning = await storage.bucket(bucketName).setMetadata({versioning: {enabled: true}});
      console.log(`Versioning is enabled for bucket ${bucketName}`);
    }
  }
  catch (error) {
    console.log(error);
  }
});