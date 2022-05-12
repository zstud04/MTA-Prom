const fs=require('fs');
const readline = require('readline')
const {google} = require('googleapis')
const request = require('request')
const {GoogleSpreadsheet} = require('google-spreadsheet')
const creds = require('./service.json')

const writeToSheet=async(fileName)=>{
  var doc= new GoogleSpreadsheet(fileName);
  await doc.useServiceAccountAuth(creds, function (err){
    doc.addRow(4, {date:"=today()", progress:"1"}, callback)
    
    function callback(err){
      if(err) {
        console.log(err);
      } else {
        console.log('You added your progress for the day.') 
        
        // Rendering test page
        res.render('test')
      }
    }
    
  });
}
module.exports = writeToSheet;