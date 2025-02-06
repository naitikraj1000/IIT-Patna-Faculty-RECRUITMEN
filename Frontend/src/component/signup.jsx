import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "./signup.css";

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

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [randomStyle, setRandomStyle] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility

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
    alert("Signup Successful (Handle backend logic separately)");
    navigate("/home");
  };

  return (
    <div className="container">
      <div className="signup-box">
        <img src="/logo.png" alt="IIT Patna Logo" className="logo" />
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <label>Name</label>
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <label>Email</label>
          <input type="email" placeholder="test@test.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password</label>
          <div className="password-box">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="password-toggle" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <label>Confirm Password</label>
          <div className="password-box">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="*******"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span className="password-toggle" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="captcha-box">
            <p className="captcha-text">
              {captchaText.split("").map((char, index) => (
                <span key={index} style={randomStyle}>{char}</span>
              ))}
            </p>
            <button type="button" onClick={refreshCaptcha} className="refresh-captcha">↻</button>
          </div>
          <input type="text" placeholder="Enter Captcha" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} required />
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <p><a href="/signin">Already have an Account? Login</a></p>
      </div>
    </div>
  );
}