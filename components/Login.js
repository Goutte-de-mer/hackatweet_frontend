import { useState, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import styles from "../styles/Login.module.css";
import { Button, Popover } from "antd";
import "antd/dist/antd.css";
import { useRouter } from "next/router";

function Login() {
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
      <Popover content={modalSignIn} trigger="click">
        <Button>Signin</Button>
      </Popover>

      <Popover content={modalSignup} trigger="click">
        <Button>Signup</Button>
      </Popover>
    </div>
  );
}

export default Login;
