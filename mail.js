const nodemailer = require('nodemailer');

// config
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'formus.contact@gmail.com',
        pass: 'j8418232982'
    }
});

// sending mail
const sendingMail = (mailOptions) => {
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.log(err)
        else console.log(info);
    });
}

module.exports = {
    sendingMail
}