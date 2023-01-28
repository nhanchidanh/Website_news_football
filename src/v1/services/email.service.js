const { validate } = require("deep-email-validator");
const nodemailer = require("nodemailer");
const { handleHtmlLang } = require("../utils/functions");

function validateEmail(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await validate(email);

      const { valid, reason, validators } = response;

      if (!valid && reason && !validators[reason].valid) {
        return resolve({
          errors: {
            message: "Vui lòng cung cấp địa chỉ email hợp lệ",
          },
          status: 400,
        });
      }
      resolve({
        errors: null,
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function sendEmailVerifyAccount(dataSend, options) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: false, //true for 465, false for others port
    auth: {
      user: process.env.EMAIL_APP_USERNAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  try {
    const response = await transporter.sendMail({
      from: `"Website tin tức thể thao" <${process.env.EMAIL_APP_USERNAME}>`,
      to: dataSend.sendToEmail,
      subject: options.subject,
      html: options.handleHtmlLang,
    });

    if (response) {
      return {
        status: 201,
        errors: null,
        elements: dataSend.data,
      };
    }
  } catch (error) {
    return {
      status: 500,
      errors: error,
      elements: null,
    };
  }
}

module.exports = { validateEmail, sendEmailVerifyAccount };
