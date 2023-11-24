import styles from "../styles/Tweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function Tweet(props) {
  return (
    <div className={styles.tweet}>
      <p>
        <span>{props.firstname}</span> <span>@{props.username}</span> •{" "}
        <span>{props.duration}</span>
      </p>
      <p>{props.content}</p>
      <p>
        <FontAwesomeIcon icon={faHeart} /> {props.likes}
      </p>
    </div>
  );
}

export default Tweet;
