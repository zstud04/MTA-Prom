const { google } = require("googleapis")
const {GoogleAuth} = require('google-auth-library');
const path = require('path');

const authentication = async() => {
    const KEYFILEPATH = path.join(__dirname, 'service.json');
    const SCOPES = ['https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/spreadsheets','https://www.googleapis.com/auth/spreadsheets.readonly' ];
  
    const auth = new GoogleAuth ({
      keyFile: KEYFILEPATH,
      scopes: SCOPES,
    });
    const driveService = google.drive({ version: 'v3', auth });

    const client = await auth.getClient();
    const sheets = google.sheets({
        version:'v4',
        auth:client
    });
    return {sheets};
    
    
  };

module.exports=authentication;