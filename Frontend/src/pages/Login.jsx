import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./../styles/login.css";
import { Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await api.get("/user/getall", {
        auth: {
          username: loginData.username,
          password: loginData.password
        }
      });

      if (response.status === 200) {

        localStorage.setItem("username", loginData.username);
        localStorage.setItem("password", loginData.password);

        alert("Login Successful!");

        navigate("/dashboard");
      }

    } catch (error) {

      alert("Invalid Username or Password");

    }

  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h2>Medical Store Management</h2>

        <form onSubmit={handleLogin}>

          <div className="mb-3">

            <label>Username</label>

            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter Username"
              value={loginData.username}
              onChange={handleChange}
            />

          </div>

          <div className="mb-3">

            <label>Password</label>

            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              value={loginData.password}
              onChange={handleChange}
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>
          <div className="text-center mt-3">
            Don't have an account?
            <Link to="/signup" className="ms-2">
              Sign Up
            </Link>
          </div>

        </form>

      </div>

    </div>

  );

}

export default Login;