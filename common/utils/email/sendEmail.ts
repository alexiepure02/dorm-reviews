import { createTransport } from "nodemailer";
import * as fs from "fs";
import * as path from "path";
import { compile } from "handlebars";

export const sendEmail = async (
  email: string,
  subject: string,
  payload: any,
  template: string
) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = compile(source);
    const options = () => {
      return {
        subject: subject,
        html: compiledTemplate(payload),
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
    console.log(error);
  }
};
