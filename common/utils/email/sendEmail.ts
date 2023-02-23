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
    console.log("creating transporter.");
    const transporter = await createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    console.log("compiling template.");
    const source = await fs.readFileSync(
      path.join(__dirname, template),
      "utf8"
    );
    const compiledTemplate = await compile(source);
    const options = () => {
      return {
        subject: subject,
        html: compiledTemplate(payload),
        from: process.env.FROM_EMAIL,
        to: email,
      };
    };
    console.log("sending email.");
    // Send email
    await transporter.sendMail(options(), (error, info) => {
      if (error) {
        console.log("send email failed.", error);
      } else {
        console.log("send email success!");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/
