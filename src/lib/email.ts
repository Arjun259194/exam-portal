import { MailConfig } from "@/types";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export default class MailService<
  Config extends { user: string; pass: string },
> {
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor(config: Config) {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: config,
    });
  }

  public async sendMail(config: MailConfig) {
    switch (config.type) {
      case "Verify":
        await this.transporter.sendMail({
          from: "Qresher.com",
          to: config.email,
          subject: "Authentication",
          html: this.verificationMailHTML({
            username: config.username,
            url: config.url,
          }),
        });
        break;
      case "Result":
        this.transporter.sendMail({
          to: config.email,
          from: "Examify",
          subject: `Result of ${config.testName}`,
          html: this.templeTestResultMailHTML({
            score: config.score,
            username: config.username,
            testTitle: config.testName,
            totalMarks: config.totalMarks,
          }),
        });
        break;
      case "Notification":
        // TODO: creating a mail template for notification
        throw new Error("Notification mail template is not yet implemented");

      case "TeacherRequestAccepted":
        await this.transporter.sendMail({
          from: "Examify",
          to: config.email,
          subject: "Teacher Request Accepted",
          html: this.teacherRequestAcceptedMailHTML({
            username: config.username,
            url: config.url,
          }),
        });
        break;

      case "Debug":
        const { formattedTime, isoTime } = this.getCurrentTime();

        await this.transporter.sendMail({
          from: "Examify",
          to: config.email,
          subject: "Debugging Purposes",
          html: this.debugMailHTML({
            messages: config.message,
            time: { formatted: formattedTime, isoFormat: isoTime },
            userEmail: config.email,
          }),
        });
    }
  }

  getCurrentTime(): { formattedTime: string; isoTime: string } {
    const now = new Date();

    // Formatting options for the desired format
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC", // Modify this based on your timezone requirements
    };

    // Formatted time string
    const formattedTime = now.toLocaleString("en-US", options);

    // ISO formatted time string
    const isoTime = now.toISOString();

    return { formattedTime, isoTime };
  }

  private debugMailHTML(debugInfo: {
    userEmail: string;
    messages: string[];
    time: {
      isoFormat: string;
      formatted: string;
    };
  }) {
    const {
      messages,
      userEmail,
      time: { formatted, isoFormat },
    } = debugInfo;

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Debug Email</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <h2 style="text-align: center; color: #333;">Debug Email Template</h2>
        <p style="text-align: center; color: #666; margin-bottom: 20px;">This is a sample email for checking and debugging purposes.</p>
        
        <h3 style="color: #333;">Debugging Information:</h3>
        <p><strong>App Name:</strong> Qresher.com</p>
        <p><strong>User's Email:</strong> ${userEmail}</p>
        <p><strong>Time of Sending (ISO Format):</strong> ${isoFormat}</p>
        <p><strong>Time of Sending (Formatted):</strong> ${formatted}</p>
        <p><strong>Additional Messages:</strong> ${messages.map(
          (message) => `<p>${message}</p>`,
        )}</p>
        

        <p style="text-align: center; color: #666; margin-top: 20px;">Feel free to modify and use this template for testing your Nodemailer setup.</p>
        
        <p style="text-align: center; color: #999; margin-top: 30px;">Thank you!</p>
      </div>
    </body>
    </html>
  `;
  }

  public templeTestResultMailHTML(option: {
    score: number[];
    username: string;
    testTitle: string;
    totalMarks: number;
  }) {
    return `<!DOCTYPE html>
<html>
<head>
  <title>Temple Test Results</title>
  <style>
    /* Email container styles */
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    }

    /* Table styles */
    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 8px;
      border: 1px solid #ddd;
    }

    th {
      text-align: left;
      font-weight: bold;
    }

    /* Paragraph styles */
    p {
      font-family: Arial, sans-serif;
      line-height: 1.5;
      margin-bottom: 15px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <p>Dear ${option.username},</p>
    <p>Here are your results from your recent test: ${option.testTitle}</p>

    <p>Your total earned marks are ${option.totalMarks}</p>

    <table>
      <thead>
        <tr>
          <th>Question no.</th>
          <th>score</th>
        </tr>
      </thead>
      <tbody>
        ${option.score
          .map(
            (s, i) => `<tr>
            <td>${i + 1}</td>
            <td>${s}</td>
          </tr>`,
          )
          .join("")}
      </tbody>
    </table>

    <p>We encourage you to review your results and continue your studies.</p>
    <p>Thank you for participating in the test.</p>
    <p>Sincerely,</p>
    <p>Examify</p>
  </div>
</body>
</html>`;
  }

  private teacherRequestAcceptedMailHTML(option: {
    username: string;
    url: string;
  }) {
    return `<!DOCTYPE html>
<html>
<head>
  <title>Teacher Request Accepted</title>
  <style>
    /* Email container styles */
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    }

    /* Paragraph styles */
    p {
      font-family: Arial, sans-serif;
      line-height: 1.5;
      margin-bottom: 15px;
    }

    /* Link styles */
    a {
      color: #007bff;
      text-decoration: none;
    }

    /* Link hover styles */
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <p>Dear ${option.username},</p>
    <p>We're thrilled to inform you that your request to become a teacher has been approved!</p>
    <p>You can now access the teacher dashboard and start creating courses. We encourage you to explore the resources available to you and get familiar with the platform.</p>
    <p>To get started, please visit the teacher dashboard at: <a href="${option.url}">Teacher Dashboard</a></p>
    <p>We're excited to have you join our growing community of educators. If you have any questions, please don't hesitate to contact our support team.</p>
    <p>Thank you,</p>
  </div>
</body>
</html>`;
  }

  private verificationMailHTML(option: { username: string; url: string }) {
    return `
<!doctype html>
<html lang="en">
  <head>
    <title>Varification EMAIL</title>
    <style>
      * {
        font-family: Arial;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
      }

      .para {
        max-width: 80ch;
      }

      .button {
        padding: 0.5rem 1rem;
        font-size: 1.2rem;
        border-radius: 1rem;
        outline: none;
        border: 2px solid lime;
        background-color: lime;
        color: white;
        font-weight: bold;
      }

      .box {
        padding: 2rem 3rem;
        background-color: #e6eeff;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        border: 2px solid #add8e6;

        border-radius: 1rem;
      }

      .box > * {
        margin-top: 1rem;
      }

      .container .box {
        width: 80%;
        margin-inline: auto;
      }
    </style>
  </head>
  <body>
    <section class="container">
      <div class="box">
        <h1>Varification</h1>
        <p>Dear ${option.username},</p>
        <p class="para">
          This is a varification email from examify to verify you email before
          logging in the system Please click the button below to verify your
          email address
        </p>
        <div>
          <a href="${option.url}">
            <button class="button">Verify</button>
          </a>
        </div>
      </div>
    </section>
  </body>
</html>
`;
  }
}
