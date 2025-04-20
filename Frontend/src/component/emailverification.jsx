import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './emailverification.module.css';

export default function EmailVerification() {
    const navigate = useNavigate();
    const { token } = useParams();
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const [verificationStatus, setVerificationStatus] = useState('loading'); // 'loading', 'success', 'error'
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        verifyEmail();
    }, []);

    const verifyEmail = async () => {
        if (!token) {
            setVerificationStatus('error');
            setMessage('Unauthorized Access. Missing verification token.');
            toast.error("Unauthorized Access", {
                position: "top-right",
            });
            setTimeout(() => {
                navigate("/signin");
            }, 4000);
            return;
        }

        try {
            const res = await fetch(`${backendurl}/emailverification/${token}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            if (res.ok) {
                setVerificationStatus('success');
                setMessage(data.message || 'Email verified successfully!');
                toast.success(data.message, { position: "top-right" });
                // wait for 2 seconds before redirecting
                setTimeout(() => {
                    navigate("/signin");
                }, 4000);
            } else {
                setVerificationStatus('error');
                setMessage(data.message || 'Email verification failed.');
                toast.error(data.message, { position: "top-right" });
                setTimeout(() => {
                    navigate("/signin");
                }, 4000);
            }
        } catch (error) {
            console.error(error.message);
            setVerificationStatus('error');
            setMessage('Error verifying email. Please try again.');
            toast.error("Error verifying email", { position: "top-right" });
            setTimeout(() => {
                navigate("/signin");
            }, 4000);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.verificationBox}>
                    <img src="/logo.png" alt="IIT Patna Logo" className={styles.logo} />
                    <h2>Email Verification</h2>
                    
                    <div className={styles.statusContainer}>
                        {verificationStatus === 'loading' && (
                            <div className={styles.loadingSpinner}></div>
                        )}
                        
                        {verificationStatus === 'success' && (
                            <div className={styles.successIcon}>
                                <svg xmlns="http://www.w3.org/4000/svg" viewBox="0 0 24 24" width="48" height="48">
                                    <path fill="none" d="M0 0h24v24H0z"/>
                                    <path fill="#4caf50" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                </svg>
                            </div>
                        )}
                        
                        {verificationStatus === 'error' && (
                            <div className={styles.errorIcon}>
                                <svg xmlns="http://www.w3.org/4000/svg" viewBox="0 0 24 24" width="48" height="48">
                                    <path fill="none" d="M0 0h24v24H0z"/>
                                    <path fill="#f44336" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                </svg>
                            </div>
                        )}
                        
                        <p className={styles.statusMessage}>{message}</p>
                    </div>
                    
             
                </div>
            </div>
            <ToastContainer />
        </>
    );
}