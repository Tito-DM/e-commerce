const nodemailer = require("nodemailer");
const logger = require("../helpers/logger");

exports.sendMail = async (to, subject, text, id, res, link) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: process.env.MAILHOST,
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAILPASSWD,
    },
    secure: true,
  });

  const mailData = {
    from: process.env.MAIL, // sender address
    to, // list of receivers
    subject,
    text,
    html: `<b> ${text} </b>  <a href=http://${
      process.env.BASE_URL
    }/${link}/${id}/${true}>Click here</a>`,
  };

  transporter.sendMail(mailData, function (error, info) {
    if (error) {
      logger.error(
        `msg: Issue send email \n error: ${error.message} at  ${__filename} `
      );
      res.status(500).json({
        msg: err,
      });
    }

    if (info.response.split(" ")[0] === "250") {
      logger.info(`Email sent ${info.response}`);

      res.status(200).json({
        msg: "an email was sent for verification",
      });
    }
  });
};
