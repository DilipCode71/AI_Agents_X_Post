import express from "express";
import dotenv from "dotenv";
import { fetchLatestTechNews } from "./services/fetchNews.js";
import { generateTweetFromNews } from "./services/generateTweet.js";
import { postToTwitter } from "./services/postToTwitter.js";
import { readLastTweetTime, writeLastTweetTime } from "./services/tweetTimeStore.js";


dotenv.config();
const app = express();
let lastTweetTime = readLastTweetTime();
const MIN_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours


app.get("/tweet", async (req, res) => {


  const now = Date.now();
  if (now - lastTweetTime < MIN_INTERVAL) {
    console.log("⏳ Skipping tweet: 24-hour interval not reached");
    return res.status(429).send("Only 1 tweet per day allowed.");
  }
  lastTweetTime = now;
  writeLastTweetTime(lastTweetTime);
  try {
    const news = await fetchLatestTechNews();
    const tweet = await generateTweetFromNews(news);
    if (tweet && news) {
      await postToTwitter(tweet, news.image);
      return res.status(200).send("Tweet posted");
    } else {
     return res.status(200).send("No tweet");
    }
  } catch (error) {
    console.error("Tweet Error:", error.message); 
    return res.status(500).send("Error");
    
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
