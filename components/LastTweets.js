import styles from "../styles/LastTweets.module.css";
import Tweet from "./Tweet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addTweet, setTweets } from "../reducers/tweets";
import moment from "moment";
import { counter } from "@fortawesome/fontawesome-svg-core";

function LastTweets() {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.value.token);
  const tweets = useSelector((state) => state.tweets);
  const [tweetInput, setTweetInput] = useState("");
  // const [wordCounter, setWordCounter] = useState(230);
  // const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/tweets")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTweets(data.tweets));
      });
  }, []);

  const handleChange = (e) => {
    if (e.target.value.length < 230) {
      setTweetInput(e.target.value);
    }
    return;
  };

  const handleNewTweet = () => {
    fetch("http://localhost:3000/tweets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: tweetInput,
        token: userToken,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.result) {
          return;
        }
        console.log("data on click", data);

        dispatch(
          addTweet({
            firstname: data.tweet.firstname,
            time: data.tweet.time,
            likes: data.tweet.likes,
            username: data.tweet.username,
            content: data.tweet.content,
          })
        );
      });
  };

  function calculateElapsedTime(time) {
    const now = moment();
    const startTime = moment(time);
    const duration = moment.duration(now.diff(startTime));
    if (duration.asDays() >= 1) {
      return `${Math.round(duration.asDays())} jours`;
    } else if (duration.asHours() >= 1) {
      return `${Math.round(duration.asHours())} heures`;
    } else {
      return `${Math.round(duration.asMinutes())} minutes`;
    }
  }

  const tweetComponents = tweets.map((data, i) => {
    let elapsedTime = calculateElapsedTime(data.time);
    return <Tweet key={i} {...data} duration={elapsedTime} />;
  });

  return (
    <>
      <form className={styles.tweetForm}>
        <textarea
          value={tweetInput}
          onChange={(e) => handleChange(e)}
          placeholder="What's up?"
          rows="1"
          cols="70"
        />
        <span>{230 - tweetInput.length}/230</span>
        <button
          type="button"
          onClick={() => handleNewTweet()}
          className={styles.tweetBtn}
        >
          Tweet
        </button>
      </form>
      {tweetComponents}
    </>
  );
}

export default LastTweets;
