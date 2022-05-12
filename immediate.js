const scanFolderForFiles = require('./upload.js');


scanFolderForFiles('./uploads/').then(() => {
    console.log('🔥 All files have been uploaded to Google Drive successfully!');
  });
//   writeData().then(()=>{
//         console.log('Data written successfully');
//     })