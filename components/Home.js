import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/user";
import { useRouter } from "next/router";
import LastTweets from "./LastTweets";

function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.value.username);
  const firstname = useSelector((state) => state.user.value.firstname);
  // const token = useSelector(state => state.user.token);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };
  return (
    <main className={styles.main}>
      <div className={`${styles.leftColumn} ${styles.column}`}>
        <Image src="/twitter.png" alt="Logo" width={50} height={50} />
        <div className={styles.userInfos}>
          <div className={styles.innerInfos}>
            <h5>{firstname}</h5>
            <p>@{username}</p>
          </div>

          <button
            onClick={() => handleLogout()}
            className={`${styles.logoutBtn} ${styles.btn}`}
          >
            Logout
          </button>
        </div>
      </div>
      <div className={`${styles.centerColumn} ${styles.column}`}>
        {" "}
        <Link href="/login">login</Link>
        <LastTweets />
      </div>
      <div className={`${styles.rightColumn} ${styles.column}`}>3rd</div>
    </main>
  );
}

export default Home;
