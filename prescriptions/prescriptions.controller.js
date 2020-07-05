const express = require('express');
const router = express.Router();
nodeMailer = require('nodemailer')
const prescriptionService = require('./prescriptions.service');

router.post('/upload', upload);
router.get('/download', getPrescription)

module.exports = router;

function upload(req, res, next) { 
    console.log("IN MAIL");

    prescriptionService.saveFile(req.body.file, req.body.rawfile.path, req.body.auth)
    .then(document => {
        //document ? res.json("in success") : res.status(400).json({ message: 'Not Uploaded' })

        let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            // should be replaced with real sender's account
            user: 'arun.rapolu925@gmail.com',
            pass: 'arun@hyda', 
            tls: {
                rejectUnauthorized: false
              }
        }
    });
    let htmlContent = `
                <h1>userName: ${req.body.auth.name}</h1><br/>
                <h1> mobile : ${req.body.auth.mobile}</h1>
                `
    let mailOptions = {
        // should be replaced with real recipient's account
        from:"Arun <arun.rapolu925@gmail.com>",
        to: 'shiva426.psk@gmail.com',
        subject: "test subject",
        text: "",
        html: htmlContent,
        attachments: [
            {
              filename: req.body.rawfile.path,
              content: new Buffer(req.body.file.imageData.split("base64,")[1], "base64")
            }
          ]
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            next(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.json("done");
    });

    })
    .catch(err => next(err));

   
    // let transporter = nodeMailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         // should be replaced with real sender's account
    //         user: 'arun.rapolu925@gmail.com',
    //         pass: 'arun@hyda', 
    //         tls: {
    //             rejectUnauthorized: false
    //           }
    //     }
    // });
    // let htmlContent = `
    //             <h1><strong>Contact Form</strong></h1>
    //             <p>Hi,</p>
    //             <pzxc contacted with the following Details</p>
    //             <br/>
    //             <p>Email: ada</p>
    //             <p>Phone:sdfa</p>
    //             <p>Company Name: asdfa</p>
    //             <p>Message: asdfasd</p>
    //             `
    // let mailOptions = {
    //     // should be replaced with real recipient's account
    //     from:"Arun <arun.rapolu925@gmail.com>",
    //     to: 'arun_rapoluabcdefg@yahoo.com',
    //     subject: "test subject",
    //     text: "",
    //     html: htmlContent
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message %s sent: %s', info.messageId, info.response);
    //     res.json("done");
    // });
}

function getPrescription(req,res,next){
    prescriptionService.getPrescription()
    .then(img => res.json(img))
        .catch(err => next(err));
}