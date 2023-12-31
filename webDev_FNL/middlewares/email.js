const crypto = require('crypto');
const nodemailer = require('nodemailer');
Token = require('../models/token');



function sendEmail(mailOptions) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.FROM_EMAIL,
          pass: process.env.FROM_EMAIL_PASSWORD,
        }
      });
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, result) => {
            if (error) return reject(error);
            return resolve(result);
        });
    });
}
function generateVerificationToken(user, verify) {
    let payload = {
        userId: `${user._id}`,
        token: crypto.randomBytes(20).toString('hex'),
        verify: verify,
    };

    return new Token(payload);
};
async function sendVerificationEmail(user, req, res, verify){
    try{
        const token = generateVerificationToken(user, verify);

        // Save the verification token
        await token.save();
        
        let subject = "Account Verification Token";
        let to = user.Email;
        let from = process.env.FROM_EMAIL;
        let html= "";
        let link= "";
        if(verify){
            link="http://"+req.headers.host+"/auth/signup/verify/"+token.token;
            html = `<p>Hi ${user.username}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
            <br><p>If you did not request this, please ignore this email.</p>`;
        }else{ 
            link="http://"+req.headers.host+"/auth/forgotpass/verify/"+token.token;
            html = `<p>Hi ${user.username}<p><br><p>Please click on the following <a href="${link}">link</a> to reset your password.</p> 
            <br><p>If you did not request this, please ignore this email.</p>`;
        }
        console.log(to + " " + from + " " + subject + " " + html + " " + link)
        await sendEmail({to, from, subject, html});
        res.status(200).json({message: 'An email has been sent to ' + user.Email + '.'});
    }catch (error) {
        res.status(500).json({message: error.message})
    }
}
module.exports = {
    sendEmail,  generateVerificationToken, sendVerificationEmail
}