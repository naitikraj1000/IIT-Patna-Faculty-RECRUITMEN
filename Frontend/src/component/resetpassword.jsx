import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import styles from './resetpassword.module.css';

export default function ResetPassword() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const password = form.elements.password?.value;
        const confirmPassword = form.elements.confirmPassword?.value;

        if (password !== confirmPassword) {
            toast.error("Passwords do not match", {
                position: "top-right",
            });
            return;
        }

        if (!token) {
            toast.error("Unauthorized Access", {
                position: "top-right",
            });
            return;
        }

        const backendurl = import.meta.env.VITE_BACKEND_URL;
        try {
            const res = await fetch(`${backendurl}/resetpassword/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success(data.message, { position: "top-right" });
                navigate("/signin");
            } else {
                toast.error(data.message, { position: "top-right" });
            }
        } catch (error) {
            console.error(error.message);
            toast.error("Error resetting password", { position: "top-right" });
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.loginBox}>
                    <img src="/logo.png" alt="IIT Patna Logo" className={styles.logo} />
                    <h2>Reset Password</h2>
                    <form onSubmit={handlePasswordReset}>
                        <label>New Password</label>
                        <div className={styles.passwordBox}>
                            <input 
                                type={isPasswordVisible ? "text" : "password"} 
                                name="password" 
                                placeholder="Enter new password" 
                                required 
                            />
                            <span 
                                className={styles.passwordToggle} 
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <label>Confirm Password</label>
                        <div className={styles.passwordBox}>
                            <input 
                                type={isConfirmPasswordVisible ? "text" : "password"} 
                                name="confirmPassword" 
                                placeholder="Re-enter new password" 
                                required 
                            />
                            <span 
                                className={styles.passwordToggle} 
                                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                            >
                                {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <button type="submit" className={styles.loginBtn}>Reset Password</button>
                    </form>
                    <p className={styles.centerText}>
                        <a href="/signin">Back to Login</a>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}