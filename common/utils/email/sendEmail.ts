import { createTransport } from "nodemailer";
import * as fs from "fs";
import * as path from "path";
import { compile } from "handlebars";
import { EMAIL_TYPE_ENUM } from "@/common/Constants";

const getAccountCreatedTemplate = (name: string) => `
<html>
  <head>
    <style>

    </style>
  </head>
  <body>
    <p>Salut ${name},</p>
    <p>Contul tău a fost creat cu succes.</p>
  </body>
</html>`;

const getRequestResetPasswordTemplate = (name: string, link: string) => `
<html>
  <head>
    <style>

    </style>
  </head>
  <body>
    <p>Salut ${name},</p>
    <p>Aici găsești cererea ta de resetare a parolei.</p>
    <p>Apasă link-ul de mai jos pentru a reseta parola.</p>
    <a href="${link}">Resetare parolă</a>
  </body>
</html>`;

const getResetPasswordTemplate = (name: string) => `
<html>
  <head>
    <style>

    </style>
  </head>
  <body>
    <p>Salut ${name},</p>
    <p>Parola ta a fost resetată cu succes.</p>
  </body>
</html>`;

export const sendEmail = async (
  type: EMAIL_TYPE_ENUM,
  email: string,
  subject: string,
  payload: any
) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    // const compiledTemplate = compile(source);

    let html: string;
    switch (type) {
      case EMAIL_TYPE_ENUM.accountCreated:
        html = getAccountCreatedTemplate(payload.name);
        break;
      case EMAIL_TYPE_ENUM.requestResetPassword:
        html = getRequestResetPasswordTemplate(payload.name, payload.link);
        break;
      case EMAIL_TYPE_ENUM.resetPassword:
        html = getResetPasswordTemplate(payload.name);
        break;
      default:
        break;
    }

    const options = () => {
      return {
        subject: subject,
        html: html,
        from: process.env.FROM_EMAIL,
        to: email,
      };
    };
    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        console.log("failed to send email.", error);
      } else {
        console.log("email sent succesfully!");
      }
    });
  } catch (error) {
    console.log("error: ", error);
  }
};
