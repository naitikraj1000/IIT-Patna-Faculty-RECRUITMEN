
import nodemailer from 'nodemailer';
import jsonwebtoken from 'jsonwebtoken';

const base64iitplogo = "https://www.uxdt.nic.in/wp-content/uploads/2024/06/iit-patna-iit-patna-01.jpg?x76268";
function getemailverificationdraft(link) {
    return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
          body {
              font-family: Arial, Helvetica, sans-serif;
              line-height: 1.6;
              color: #333333;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
          .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: #003366;
              padding: 20px 0;
              text-align: center;
          }
          .logo {
              max-width: 140px;
              height: auto;
          }
          .content {
              padding: 30px;
              text-align: center;
          }
          h1 {
              color: #003366;
              margin-top: 0;
              margin-bottom: 20px;
              font-size: 24px;
          }
          p {
              margin-bottom: 20px;
              font-size: 16px;
          }
          .verify-button {
              display: inline-block;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              padding: 12px 30px;
              border-radius: 4px;
              font-weight: bold;
              margin: 20px 0;
          }
          .verify-button:hover {
              background-color: #0056b3;
          }
          .alternative-link {
              color: #666666;
              font-size: 14px;
              margin-top: 20px;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 20px 30px;
              text-align: center;
              font-size: 12px;
              color: #666666;
              border-top: 1px solid #dddddd;
          }
          .social-icons {
              margin-top: 15px;
          }
          .social-icons a {
              display: inline-block;
              margin: 0 8px;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="header">
              <img class="logo" src="${base64iitplogo}" alt="IIT Patna Logo">
          </div>
          <div class="content">
              <h1>Email Verification</h1>
              <p>Dear User,</p>
              <p>Thank you for registering with IIT Patna. To complete your registration and verify your email address, please click on the button below:</p>
              
              <a href="${link}" class="verify-button">Verify Email Address</a>
              
              <p class="alternative-link">If the button above doesn't work, copy and paste the following link into your browser:<br>
              <a href="${link}">${link}</a></p>
              
              <p>This link will expire in 24 hours. If you did not request this verification, please ignore this email.</p>
              
              <p>Best Regards,<br>
              IIT Patna Team</p>
          </div>
          <div class="footer">
              <p>Indian Institute of Technology Patna<br>
              Bihta, Patna, Bihar 801106</p>
              <p>© 2025 IIT Patna. All rights reserved.</p>
              <div class="social-icons">
                  <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/733/733547.png" width="24" height="24" alt="Facebook"></a>
                  <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/3670/3670151.png" width="24" height="24" alt="Twitter"></a>
                  <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/174/174857.png" width="24" height="24" alt="LinkedIn"></a>
                  <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/1384/1384060.png" width="24" height="24" alt="YouTube"></a>
              </div>
          </div>
      </div>
  </body>
  </html>
  `;
}

function getresetpassworddraft(link) {
    return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
          body {
              font-family: Arial, Helvetica, sans-serif;
              line-height: 1.6;
              color: #333333;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
          .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: #003366;
              padding: 20px 0;
              text-align: center;
          }
          .logo {
              max-width: 140px;
              height: auto;
          }
          .content {
              padding: 30px;
              text-align: center;
          }
          h1 {
              color: #003366;
              margin-top: 0;
              margin-bottom: 20px;
              font-size: 24px;
          }
          p {
              margin-bottom: 20px;
              font-size: 16px;
          }
          .verify-button {
              display: inline-block;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              padding: 12px 30px;
              border-radius: 4px;
              font-weight: bold;
              margin: 20px 0;
          }
          .verify-button:hover {
              background-color: #0056b3;
          }
          .alternative-link {
              color: #666666;
              font-size: 14px;
              margin-top: 20px;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 20px 30px;
              text-align: center;
              font-size: 12px;
              color: #666666;
              border-top: 1px solid #dddddd;
          }
          .social-icons {
              margin-top: 15px;
          }
          .social-icons a {
              display: inline-block;
              margin: 0 8px;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="header">
              <img class="logo" src="${base64iitplogo}" alt="IIT Patna Logo">
          </div>
          <div class="content">
              <h1>Password Reset Request</h1>
              <p>Dear User,</p>
              <p>We received a request to reset your password for your IIT Patna account. To create a new password, please click on the button below:</p>
              
              <a href="${link}" class="verify-button">Reset Password</a>
              
              <p class="alternative-link">If the button above doesn't work, copy and paste the following link into your browser:<br>
              <a href="${link}">${link}</a></p>
              
              <p>This link will expire in 24 hours. If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
              
              <p>Best Regards,<br>
              IIT Patna Team</p>
          </div>
          <div class="footer">
              <p>Indian Institute of Technology Patna<br>
              Bihta, Patna, Bihar 801106</p>
              <p>© 2025 IIT Patna. All rights reserved.</p>
              <div class="social-icons">
                  <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/733/733547.png" width="24" height="24" alt="Facebook"></a>
                  <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/3670/3670151.png" width="24" height="24" alt="Twitter"></a>
                  <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/174/174857.png" width="24" height="24" alt="LinkedIn"></a>
                  <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/1384/1384060.png" width="24" height="24" alt="YouTube"></a>
              </div>
          </div>
      </div>
  </body>
  </html>
  `;
}

async function emailverificationmail(email, user_id) {

    const payload = {
        id: user_id
    }
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 3600  // 1 Hour
    });
    const link = `${process.env.FRONTEND_URL}/emailverification/${token}`;
    let subject = "Email Verification";
    let text = getemailverificationdraft(link);
    return await sendemail(email, subject, text);
}



async function forgetpasswordmail(email, user_id) {
    const payload = {
        id: user_id
    }
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 3600  // 1 Hour
    });
    const link = `${process.env.FRONTEND_URL}/resetpassword/${token}`;
    // console.log("Forget Password Link", link);

    let subject = "Forget Password";
    let text = getresetpassworddraft(link);
    return await sendemail(email, subject, text);
}



async function sendemail(email, subject, text) {

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const mailOptions = {
        from: `IITP Faculty Recruitment Portal" <noreply-faoff@iitp.ac.in>`,
        to: email,
        subject: subject,
        html: text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        return { message: "Email sent successfully" };
    } catch (error) {
        console.log("Error in sending email");
        return { message: error };
    }


}


export { emailverificationmail, forgetpasswordmail };


