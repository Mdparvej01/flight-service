const nodemailer = require("nodemailer");
require("dotenv").config();

const {PORT ,MAIL_USER , MAIL_PASS , MAIL_HOST } = require("../../config/server-config")

const mailSender = async (email,title,body) => {

    try {

        let transporter = nodemailer.createTransport ({
            host:MAIL_HOST,
            auth:{                                                                      
                user:MAIL_USER,
                pass:MAIL_PASS,
            }
        })

        //send 
        let info = await transporter.sendMail({
            from:"from  Ailine Service ",
            to:`${email}`,
            subject:`${title}`,
            html:`${body},`
        })

        console.log("mail info::", info);
        return info;

    } catch(error) {
        console.log("error in mailSender");
        console.log(error);

    }
}

module.exports = mailSender;