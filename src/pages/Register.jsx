import { auth } from "../firebase-config";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../style/Register.module.css";
import "../style/check.css";
import {
  AiFillFacebook,
  AiFillGoogleCircle,
  AiFillGithub,
} from "react-icons/ai";

import logo from "../Assets/IHistopathology-Logo.png";
import logo2 from "../Assets/IHistopathology-Logo-White.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const USER_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const Register = () => {
  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [mailErr, setMailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [usedMail, setUsedMail] = useState("");
  console.log(mailErr, passErr, nameErr);

  const register = async () => {
    if (username === "") {
      setMailErr("Invalid Email");
    } else if (password === "") {
      setPassErr("Invalid Password");
    } else if (fname === "") {
      setNameErr("Please fill the Name");
    } else {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          username,
          password
        );
        console.log(user);
        await updateProfile(auth.currentUser, { displayName: fname });
        alert("Registered Successfully");
        navigate("/login");
      } catch (error) {
        setUsedMail("Email already used");
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
            Sign up and start learning!
          </span>
          <div className={classes.logoContainer}>
            <img className={classes.logo} src={logo} alt="" />
          </div>
          <div className={classes.formContainer}>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className={classes.fname}
                type="text"
                name="name"
                placeholder="👤	Name"
                onChange={(e) => setFname(e.target.value)}
                value={fname}
              />
              <span className={classes.nameInfo}>Enter yor Name</span>
              <label className={fname === "" ? "visible" : "hidden"}>
                {nameErr}
              </label>
              <input
                className={classes.username}
                type="text"
                name="username"
                placeholder="✉    E-mail"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <span className={classes.userInfo}>Enter Valid E-mail</span>
              <label
                className={
                  USER_REGEX.test(username) === true ? "hidden" : "visible"
                }
              >
                {mailErr}
              </label>
              <label className={usedMail === "" ? "hidden" : "visible"}>
                {usedMail}
              </label>
              <input
                className={classes.pass}
                type="password"
                name="password"
                placeholder="🔒	Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />{" "}
              <span className={classes.passInfo}>
                Password 8 charchters with one letter
              </span>
              <label
                className={
                  PWD_REGEX.test(password) === true ? "hidden" : "visible"
                }
              >
                {passErr}
              </label>{" "}
              <button
                className={classes.btn}
                typeof="submit"
                onClick={register}
              >
                Regeister
              </button>
              <h5
                className={classes.redirect}
                onClick={() => navigate("/login", { replace: true })}
              >
                {" "}
                Already have an account ? SigniN
              </h5>
              <span
                style={{
                  backgroundColor: "grey",
                  height: "1px",
                  width: "100%",
                }}
              ></span>
              <h5 className={classes.head5}>Or join us with</h5>
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

export default Register;
