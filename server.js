

require('dotenv').config()

const stripeSecretKey =process.env.STRIPE_SECRET_KEY
const stripePublicKey =process.env.STRIPE_PUBLIC_KEY
const emailKey = process.env.EMAIL_KEY

const multer = require("multer");
// const upload=multer({dest:"uploads/"});
const stripe=require("stripe")(stripeSecretKey)
const express = require('express');
const router=express.Router();
const bodyParser= require("body-parser")
const app = express();
const port=4200;
const fs=require('fs')
const path = require('path')
const scanFolderForFiles= require('./upload.js');
const writeToSheet=require('./write.js')
const GoogleSpreadsheet= require('google-spreadsheet')
const request=require('request')
const readline = require('readline')
const authentication = require('./auth.js')
const quickSendMail = require('./mail.js')

const cors=require("cors");
const FormData = require('form-data');
const { identitytoolkit } = require('googleapis/build/src/apis/identitytoolkit');
app.use(cors());

const id='1wULyTZfyeYDUvPEs08Sa4JCxBCBsajTupJl0aiFTmMk';


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/",router);



app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'))
})

/*successful GET  REQUEST- USE THIS FORMAT!!!!!*/
router.post('/purchase', function(req, res){
    fs.readFile('items.json', function(error, data){
        if(error){
            res.status(500).end()
        }else{
            const itemsJson = JSON.parse(data)
            total= itemsJson.price
            //promise
            stripe.charges.create({
                amount:total,
                source: req.body.stripeTokenId,
                currency: 'usd'
            }).then(function(){
                
                // console.log(req.body.stripeTokenId)
                res.json({message: 'Thank you for your purchase! You will receive an email with your ticket shortly.'})

            }).catch(function(){
                console.log('Charge Fail')
                res.status(500).end()
            })
        }
        
    })
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+path.extname(file.originalname))
    }
})
  
var upload = multer({ storage: storage })

router.post('/log', async (req,res)=>{

})


router.post('/upload_files', upload.any(),async (req,res)=>{
    // console.log(req.body)
    // console.log(req.files)
    const {name, lname, email, grade, overnight}=req.body;

    scanFolderForFiles('uploads', req.body.email).then(()=>{
        console.log('Files uploaded successfully');
        
        
        
    });
    
    try{
        
        const {sheets}=await authentication();
        var list= [];
        list.push(name);
        list.push(lname);
        

        const writeReq=await sheets.spreadsheets.values.append({
            spreadsheetId: id,
            range: 'Sheet1',
            valueInputOption:'USER_ENTERED',
            resource:{
                
                values:[
                   
                    [name[0],lname[0],email[0], grade,overnight,name[1],lname[1],email[1]]
                    
                ],
            },
        })
        if(writeReq.status===200){
            console.log('Spreadsheet updated successfully')
        }else{
            console.log(res.json({msg:'Something went wrong while updating the spreadsheet'}))
        }
        
    }catch(e){
        console.log('ERROR UPDATING SPREADSHEET', e);
        res.status(500).send();
    }
    quickSendMail(email,overnight).then(()=>{
        console.log('Email sent successfully')
    });
    
});




app.listen(port, console.log(`Server started on ${port}`));