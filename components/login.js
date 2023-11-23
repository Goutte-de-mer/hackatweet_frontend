import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import styles from "../styles/Login.module.css";
import { Button, Popover } from "antd";

function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // const [isModalVisible, setIsModalVisible] = useState(false);
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
          // setIsModalVisible(false);
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
          // setIsModalVisible(false);
        }
      });
  };

  let modalSignup;
  if (!user.token) {
    modalSignup = (
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
  }

  let modalSignIn;
  if (!user.token) {
    modalSignIn = (
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
  }

  return (
    <header className={styles.header}>
      <Popover content={modalSignIn} title="Title" trigger="click">
        <Button className={styles.lovedMoviesBtn}>Signin</Button>
      </Popover>

      <Popover content={modalSignup} title="Title" trigger="click">
        <Button className={styles.lovedMoviesBtn}>Signup</Button>
      </Popover>
    </header>
  );
}

export default Login;
