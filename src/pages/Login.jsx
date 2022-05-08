import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../Module/AuthProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../style/check.css";
import { auth } from "../firebase-config";
import classes from "../style/Login.module.css";

import {
  AiFillFacebook,
  AiFillGoogleCircle,
  AiFillGithub,
} from "react-icons/ai";

import logo from "../Assets/IHistopathology-Logo.png";
import logo2 from "../Assets/IHistopathology-Logo-White.png";

import { useNavigate } from "react-router-dom";
export const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [invalid, setInvalid] = useState("");


  const signIn = async () => {
    if (username === "") {
      setInvalid("Invalid Email or Password");
    } else if (password === "") {
      setInvalid("Invalid Email or Password");
    } else {
      try {
        const logUser = await signInWithEmailAndPassword(
          auth,
          username,
          password
        );
        setAuth({ user: username, pwd: password });
        if (logUser) {
          navigate("/home", { replace: true });
        }
      } catch (error) {
        setInvalid("Invalid Email or Password");
      }
    }
  };
  return (
    <>
      <div className={classes.mainContainer}>
        <div className={classes.imgContainer}>
          <div className={classes.weclomeContainer}>
            <span className={classes.weclome}>Welcome To</span>
            <img src={logo2} alt="bg" className={classes.logo2} />
          </div>
        </div>
        <div className={classes.rightContainer}>
          <span className={classes.rightHader}>
            Log in to your iHIstopathology account
          </span>
          <div className={classes.logoContainer}>
            <img className={classes.logo} src={logo} alt="" />
          </div>
          <div className={classes.formContainer}>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className={classes.username}
                type="text"
                name="username"
                placeholder="✉  E-mail"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <span className={classes.userInfo}>Enter Valid E-mail</span>
              <label className={invalid ? "visible" : "hidden"}>
                {invalid}
              </label>
              <input
                className={classes.pass}
                type="password"
                name="password"
                placeholder="🔒 Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />{" "}
              <span className={classes.passInfo}>
                Password 8 charchters with one letter
              </span>
              <label className={invalid ? "visible" : "hidden"}>
                {invalid}
              </label>{" "}
              <button className={classes.btn} typeof="submit" onClick={signIn}>
                Login
              </button>
              <h5
                className={classes.redirect}
                onClick={() => navigate("/", { replace: true })}
              >
                {" "}
                Don't have an account?
              </h5>
              <span
                style={{
                  backgroundColor: "grey",
                  height: "1px",
                  width: "100%",
                }}
              ></span>
              <h5 className={classes.head5}>Login with</h5>
            </form>
          </div>
          <div style={{ display: "flex" }}>
            <AiFillFacebook className={classes.icon} />

            <AiFillGoogleCircle className={classes.icon} />

            <AiFillGithub className={classes.icon} />
          </div>
        </div>
      </div>
    </>
  );
};
