
import nodemailer from 'nodemailer';
import jsonwebtoken from 'jsonwebtoken';
async function emailverificationmail(email, user_id) {

    const payload = {
        id: user_id
    }
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 3600  // 1 Hour
    });
    const link = `${process.env.FRONTEND_URL}/emailverification/${token}`;
    let subject = "Email Verification";
    let text = `Please click on the link to verify your email address. ${link}`;
    return await sendemail(email, subject, text);
}



async function forgetpasswordmail(email) {
    let subject = "Forget Password";
    let text = `Please click on the link to reset your password. ${link}`;
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
        text: text
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


