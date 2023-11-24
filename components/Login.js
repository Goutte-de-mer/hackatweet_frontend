import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import styles from "../styles/Login.module.css";
import { Button, Popover } from "antd"; // Ajout de Image
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import Image from "next/image";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpFirstname, setSignUpFirstname] = useState("");

  const handleRegister = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: signUpFirstname,
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              username: data.username,
              token: data.token,
              firstname: data.firstname,
            })
          );
          setSignUpFirstname("");
          setSignUpUsername("");
          setSignUpPassword("");
          router.push("/");
        }
      });
  };

  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              username: signInUsername,
              token: data.token,
              firstname: data.firstname,
            })
          );
          setSignInUsername("");
          setSignInPassword("");
          router.push("/");
        }
      });
  };

  let modalSignup = (
    <div className={styles.registerContainer}>
      <div className={styles.registerSection}>
        <p>Sign-up</p>
        <input
          type="text"
          placeholder="Firstname"
          id="signUpFirstname"
          onChange={(e) => setSignUpFirstname(e.target.value)}
          value={signUpFirstname}
        />
        <input
          type="text"
          placeholder="Username"
          id="signUpUsername"
          onChange={(e) => setSignUpUsername(e.target.value)}
          value={signUpUsername}
        />
        <input
          type="password"
          placeholder="Password"
          id="signUpPassword"
          onChange={(e) => setSignUpPassword(e.target.value)}
          value={signUpPassword}
        />
        <button id="register" onClick={() => handleRegister()}>
          Register
        </button>
      </div>
    </div>
  );

  let modalSignIn = (
    <div className={styles.registerSection}>
      <p>Sign-in</p>
      <input
        type="text"
        placeholder="Username"
        id="signInUsername"
        onChange={(e) => setSignInUsername(e.target.value)}
        value={signInUsername}
      />
      <input
        type="password"
        placeholder="Password"
        id="signInPassword"
        onChange={(e) => setSignInPassword(e.target.value)}
        value={signInPassword}
      />
      <button id="connection" onClick={() => handleConnection()}>
        Connect
      </button>
    </div>
  );

  return (
    <div className={styles.loginPage}>
      <div className={styles.leftDiv}>
        <Image src="/twitter.png" width={80} height={80} alt="Logo" />
        
      </div>
      <div className={styles.rightDiv}>
        <div className={styles.topDiv}>
          <Image src="/twitter.png" width={80} height={80} alt="logo en haut" />
        </div>
        <h1>See what's happening</h1>
        <h2> Join Hackatweet today .</h2>
        <Popover className={styles.popover} trigger="click">
          <Button>Signup</Button>
        </Popover>
        <p>Already have an account</p>
        <Popover className={styles.popover} content={modalSignIn} trigger="click">
          <Button>Signin</Button>
        </Popover>
      </div>
    </div>
  );
};

export default Login;