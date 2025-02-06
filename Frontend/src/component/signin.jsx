import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { authchange, userchange } from "../../redux/infromationslice";
import { useDispatch, useSelector } from "react-redux";
import "./signin.css";

// Simple CAPTCHA generator
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

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = form.elements.email?.value;
    const password = form.elements.password?.value;
    const captchaInput = form.elements.captchaInput?.value;

    if (captchaInput !== captchaText) {
      toast.error("Captcha Not Matching", {
        position: "top-right",
      });
      refreshCaptcha();
      return;
    }

    const backendurl = import.meta.env.VITE_BACKEND_URL;

    try {
      let res = await fetch(`${backendurl}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      let data = await res.json();

      if (res.ok) {
        toast.success(data.message, {
          position: "top-right",
        });
        dispatch(authchange({ auth: true }));
        dispatch(userchange({ user_id: data.user_id }));
        console.log("User id", data.user_id);
        navigate("/");
      } else {
        toast.error(data.message, {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="login-box">
          <img src="/logo.png" alt="IIT Patna Logo" className="logo" />
          <h2>Log In</h2>
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="test@test.com"
              required
            />

            <label>Password</label>
            <div className="password-box">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                placeholder="*******"
                required
              />
              <span
                className="password-toggle"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="captcha-box">
              <p className="captcha-text">
                {captchaText.split("").map((char, index) => (
                  <span key={index} style={randomStyle}>
                    {char}
                  </span>
                ))}
              </p>
              <button
                type="button"
                onClick={refreshCaptcha}
                className="refresh-captcha"
              >
                ↻
              </button>
            </div>

            <input
              type="text"
              name="captchaInput"
              placeholder="Enter Captcha"
              required
            />
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p onClick={() => setIsModalOpen(true)} className="forgot-password">
            Forgot Password?
          </p>
          <p className="center-text">
            <a href="/signup">Don't have an Account? Sign Up</a>
          </p>
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <button
                className="close-modal"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
              <h3>Reset Password</h3>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
              <button
                className="reset-btn"
                onClick={() => alert("Reset link sent to email")}
              >
                Send Email
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
