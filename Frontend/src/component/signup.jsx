import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import styles from "./signup.module.css"; // Import CSS module

const generateCaptcha = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [randomStyle, setRandomStyle] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setRandomStyle(getRandomStyle());
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    if (captchaInput !== captchaText) {
      alert("Captcha does not match. Please try again.");
      refreshCaptcha();
      return;
    }
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupBox}>
        <img src="/logo.png" alt="IIT Patna Logo" className={styles.logo} />
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="test@test.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <div className={styles.passwordBox}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              placeholder="*******"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className={styles.passwordToggle}
              onClick={() =>
                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
              }
            >
              {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className={styles.captchaBox}>
            <p className={styles.captchaText}>
              {captchaText.split("").map((char, index) => (
                <span key={index} style={randomStyle}>
                  {char}
                </span>
              ))}
            </p>
            <button
              type="button"
              onClick={refreshCaptcha}
              className={styles.refreshCaptcha}
            >
              ↻
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter Captcha"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            required
          />
          <button type="submit" className={styles.signupBtn}>
            Sign Up
          </button>
        </form>
        <p>
          <a href="/signin">Already have an Account? Login</a>
        </p>
      </div>
    </div>
  );
}
