import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { authchange, userchange } from "../../redux/infromationslice";
import { useDispatch } from "react-redux";
import styles from "./signin.module.css";

const generateCaptcha = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const getRandomStyle = () => {
  const angle = Math.random() * 60 - 30;
  const fontSize = Math.random() * 20 + 20;
  const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  return {
    transform: `rotate(${angle}deg)`,
    fontSize: `${fontSize}px`,
    color: color,
    display: "inline-block",
  };
};



export default function SignIn() {
  const navigate = useNavigate();
  const [captchaText, setCaptchaText] = useState("");
  const [randomStyle, setRandomStyle] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const dispatch = useDispatch();



  useEffect(() => {
    refreshCaptcha();
  }, []);

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setRandomStyle(getRandomStyle());
  };


  const forgotPassword = async () => {
    const email = resetEmail;
    if (!email) {
      toast.error("Please enter your email", { position: "top-right" });
      return;
    }
    console.log(" Reset Password Email", email);
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    try {

      const res = await fetch(`${backendurl}/forgetpassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message, { position: "top-right" });
      } else {
        toast.error(data.message, { position: "top-right" });
      }
    }
    catch (error) {
      console.error(error.message);
      toast.error("Error sending reset email", { position: "top-right" });
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.elements.email?.value;
    const password = form.elements.password?.value;
    const captchaInput = form.elements.captchaInput?.value;

    if (captchaInput !== captchaText) {
      toast.error("Captcha Not Matching", { position: "top-right" });
      refreshCaptcha();
      return;
    }

    const backendurl = import.meta.env.VITE_BACKEND_URL;
    console.log(backendurl);

    try {
      let res = await fetch(`${backendurl}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      let data = await res.json();

      if (res.ok) {
        toast.success(data.message, { position: "top-right" });
        dispatch(authchange({ auth: true }));
        dispatch(userchange({ user_id: data.user_id }));
        navigate("/");
      } else {
        toast.error(data.message, { position: "top-right" });
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, { position: "top-right" });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <img src="/logo.png" alt="IIT Patna Logo" className={styles.logo} />
          <h2>Log In</h2>
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input type="email" name="email" placeholder="test@test.com" required />

            <label>Password</label>
            <div className={styles.passwordBox}>
              <input type={isPasswordVisible ? "text" : "password"} name="password" placeholder="*******" required />
              <span className={styles.passwordToggle} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className={styles.captchaBox}>
              <p className={styles.captchaText}>
                {captchaText.split("").map((char, index) => (
                  <span key={index} style={randomStyle}>{char}</span>
                ))}
              </p>
              <button type="button" onClick={refreshCaptcha} className={styles.refreshCaptcha}>↻</button>
            </div>

            <input type="text" name="captchaInput" placeholder="Enter Captcha" required />
            <button type="submit" className={styles.loginBtn}>Login</button>
          </form>

          <p onClick={() => setIsModalOpen(true)} className={styles.forgotPassword}>Forgot Password?</p>
          <p className={styles.centerText}><a href="/signup">Don't have an Account? Sign Up</a></p>
        </div>

        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <button className={styles.closeModal} onClick={() => setIsModalOpen(false)}>×</button>
              <h3>Reset Password</h3>
              <input type="email" placeholder="Enter your email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required />
              <button className={styles.resetBtn} onClick={forgotPassword}>Send Email</button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
