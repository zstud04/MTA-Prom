const fs=require('fs');


const { google } = require('googleapis');
const {GoogleAuth} = require('google-auth-library');
const path = require('path');
const authentication=require('./auth.js');

const getDriveService = () => {
  const KEYFILEPATH = path.join(__dirname, 'service.json');
  const SCOPES = ['https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/spreadsheets' ];

  const auth = new GoogleAuth ({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });
  const driveService = google.drive({ version: 'v3', auth });
  return driveService;
};

const drive= getDriveService();


const uploadSingleFile = async(fileName, filePath)=>{
  
    const folderId= '1o-r9-JsvJp00WOCJ5O-L4CTWsVJf2mEP';
    const {data: {id, name} = {} }=await drive.files.create({
        resource:{
            name:fileName,
            parents:[folderId],
        },
        media:{
            mimeType: 'image/png',
            body: fs.createReadStream(filePath),
        },
        fields:'id,name',
    });
    console.log('File Uploaded', name,id);

    
};

//remove file to trash after it's been uploaded
const scanFolderForFiles = async (folderPath, email_id) => {
    const folder = await fs.promises.opendir(folderPath);
    for await (const dirent of folder) {
      if (dirent.isFile()) {
        await uploadSingleFile(email_id, path.join(folderPath, dirent.name));
        await fs.promises.rm(path.join(folderPath, dirent.name));
      }
    }
  };
  

  module.exports = scanFolderForFiles;


