import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/user";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const firstname = useSelector((state) => state.user.firstname);
  // const token = useSelector(state => state.user.token);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/Login");
  };
  return (
    <main className={styles.main}>
      <div className={`${styles.leftColumn} ${styles.column}`}>
        <Image src="/twitter.png" alt="Logo" width={50} height={50} />
        <div className={styles.userInfos}>
          <h5>{firstname}</h5>
          <p>@{username}</p>
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
      </div>
      <div className={`${styles.rightColumn} ${styles.column}`}>3rd</div>
    </main>
  );
}

export default Home;
