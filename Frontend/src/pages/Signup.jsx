import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./../styles/login.css";

function Signup() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "ADMIN",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      await api.post("/user/add", user);

      alert("Registration Successful!");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");

    }

  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h2>Create Account to use MediCare</h2>

        <form onSubmit={handleSignup}>

          <div className="mb-3">

            <label>Username</label>

            <input
              type="text"
              className="form-control"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Enter Username"
            />

          </div>

          <div className="mb-3">

            <label>Password</label>

            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />

          </div>

          <button className="btn btn-success w-100">
            Sign Up
          </button>

        </form>

        <div className="text-center mt-3">

          Already have an account?

          <Link to="/"> Login</Link>

        </div>

      </div>

    </div>

  );

}

export default Signup;