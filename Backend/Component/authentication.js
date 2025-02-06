import bcrypt from 'bcryptjs';
import prismadb from '../Database/db.js';
import nodemailer from 'nodemailer';
import jsonwebtoken from 'jsonwebtoken';
import { forgetpasswordmail, emailverificationmail } from '../Email/email.js';

async function authenticate(req, res,next) {

    const token = req.cookies.token;
 
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user_id = decoded.id;
    });

    next();

}

async function verifytoken(req, res) {

    const token = req.cookies.token;
    console.log("Verifying Tokens",token);
    
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    

    let user_id = null;
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        user_id = decoded.id;

    });

    console.log("User id", user_id);
    // return res.status(200).json({ message: "User logged in successfully", user_id: user.id });

    return res.status(200).json({ message: "Token verified", user_id: user_id });

}

async function signup(req, res) {
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }


    try {
        let result = await prismadb.user.findUnique({
            where: {
                email
            }
        });

        if (result) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Atomicity 
        await prismadb.$transaction(async (tx) => {

            const newUser = await tx.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });


            let email_sent = await emailverificationmail(email, newUser.id);
            if (!email_sent) {
                throw new Error("Email sending failed");
            }

            console.log("User created and email sent successfully");
        });


        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error });
    }


}


async function signin(req, res) {

    const { email, password } = req.body;

    console.log(" Signin", email, password)
    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    try {
        let user = await prismadb.user.findUnique({
            where: {
                email
            }
        });


        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.verified === false) {
            return res.status(400).json({ message: "User not verified" });
        }


        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = {
            id: user.id
        };

        const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 3600
        });

        res.cookie('token', token, {
            httpOnly: true

        });

        return res.status(200).json({ message: "User logged in successfully", user_id: user.id });


    } catch (error) {
        console.log("Error", error.message)
        return res.status(500).json({ message: error.message });
    }


}


async function signout(req, res) {

    res.clearCookie('token');
    return res.status(200).json({ message: "User logged out successfully" });

}


async function forgetpassword(req, res) {

    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Please enter email" });
    }

    // check user exists or not

    try {
        let user = await prismadb.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        forgetpasswordmail(email, user.id);

        return res.status(200).json({ message: "Email sent successfully" });

    } catch (error) {
        return res.status(500).json({ message: error });
    }

}


async function resetpassword(req, res) {

    const { password, token } = req.body;

    if (!password) {
        return res.status(400).json({ message: "Please enter password" });
    }

    if (!token) {
        return res.status(400).json({ message: "Invalid token" });
    }

    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.status(401).json({ message: err });
        }

        // console.log("Decoded", decoded);
        req.userId = decoded.id;

    });

    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(req.userId, hashedPassword, password);
    try {
        await prismadb.user.update({
            where: {
                id: req.userId
            },
            data: {
                password: hashedPassword
            }
        });

        return res.status(200).json({ message: "Password reset successfully" });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error });
    }

}


function emailverification(req, res) {

    const token = req.params.token;
    console.log(" Token ", token);
    if (!token) {
        return res.status(400).json({ message: "Invalid token" });
    }

    jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, decoded) => {

        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {
            await prismadb.user.update({
                where: {
                    id: decoded.id
                },
                data: {
                    verified: true
                }
            });

            return res.status(200).json({ message: "Email verified successfully" });

        } catch (error) {
            return res.status(500).json({ message: error });
        }

    });
}

async function resetpasswordverification(req, res) {

    const token = req.params.token;
    const { password } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Unauthorized" });
    }


    try {
        const hashedpassword = bcrypt.hash(password, 10);
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        await prismadb.user.update({
            where: {
                id: decoded.id
            },
            data: {
                password: hashedpassword
            }
        });

        return res.status(200).json({ message: "Password reset successfully" });

    } catch (error) {
        return res.status(500).json({ message: error });
    }





}

// function resetpassword
export { signin, signup, signout, verifytoken, forgetpassword, resetpassword, emailverification };
export default authenticate