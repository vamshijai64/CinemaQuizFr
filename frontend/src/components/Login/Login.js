import styles from "./Login.module.scss";
import { useState } from "react";
import { FiX } from "react-icons/fi";
// import { MdRemoveRedEye } from "react-icons/md";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom"; // Import useNavigate


function Login({setUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();  

    try {
      const res = await axiosInstance.post("/auth/login", {email,password});

      if(res.status === 200){
        localStorage.setItem("token", res.data.token); // For storing JWT token 
        setUser({email});
        navigate("/home/categories", {replace: true}); // For Navigating to home page after login

      }
    } catch(error) {
      setErrorMessage(error.response?.data?.message || "An error occurred. Please try again later.");

    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.modal}>
        <p className={styles.title}>CineQuiz</p>
        <p className={styles.subtitle}>Welcome to Admin Panel</p>
        <form onSubmit={handleSubmit}>
          <p>Email</p>
          <div className={styles.inputContainer}>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
              <span className={styles.clearIcon} onClick={() => setEmail("")}>
                <FiX />
              </span>
           
          </div>
          <p>Password</p>
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
              <span className={styles.clearIcon} onClick={() => setPassword("")}>
              {/* <MdRemoveRedEye /> */}
                <FiX />
              </span>
            
          </div>
          <div className={styles.submit}>
            <button type="submit">Sign In</button>
          </div>
        </form>
        {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}

      </div>
    </div>
  );
}

export default Login;