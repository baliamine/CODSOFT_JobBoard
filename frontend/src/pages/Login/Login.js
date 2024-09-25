import { useState } from "react";
import { useLogin } from "../../hooks/UseLogin";
import backroundImg from "../../img/backroundImg.jpg";
import "./login.css"; // Assuming you use a separate CSS file for login
import Navbar from "../../components/Navbar/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <>
      
      <Navbar/>
    <div  className="body-auth">
   
     <img className="background-image-Auth" src={backroundImg} alt="none" />
    <div className="auth-container">
      
       
    
      <form className="auth-form" onSubmit={handleSubmit}>
        <h3>Login to Your Account</h3>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
           
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          
          />
        </div>

        <button type="submit" className="login-btn" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {error && <div className="error-msg">{error}</div>}
      </form>
    </div>
    </div>
    </>
  );
};

export default Login;
