import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import classes from "../style/home.module.css";
export const Home = () => {
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/", { replace: true });
  };
  return (
    <div>
      <h1>Welcome To to iHIstopathology !</h1>
      <button className={classes.homeBtn} onClick={logout}>
        signOut
      </button>
    </div>
  );
};

export default Home;
