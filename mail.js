const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config()
const emailKey = process.env.EMAIL_KEY

const messages = require('./messages.json')
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'mtaprom@gmail.com',
        pass: emailKey,
    },
});




const quickSendMail = async (email,type) => {
    
    const receiver = email;
    var body;
    if(type=="yes"){
        body = messages.overnight.html
    }else{
        body=messages['non-overnight'].html
    }

    transporter.sendMail({
        from: '<mtaprom@gmail.com>', // sender address
        to: receiver, // list of receivers
        subject: "Ticket Purchase", // Subject line
       
        html: body
    }).then(info =>{
        console.log({info});
    }).catch(console.error);

    
}

module.exports=quickSendMail;

// transporter.verify().then(console.log).catch(console.error);