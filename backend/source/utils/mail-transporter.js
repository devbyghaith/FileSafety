const Nodemailer = require("nodemailer");

module.exports = class MailTransporter {
    constructor(transporterOptions) {
        this.transporter = Nodemailer.createTransport(transporterOptions);
    };

    sendMail = (mailOptions) => new Promise((resolve, reject) => {
        this.transporter.sendMail(mailOptions, function (error, informations) {
            if (error) return reject(error);
            else resolve(informations);
        });
    });
};