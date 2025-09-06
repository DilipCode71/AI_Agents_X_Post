import express from "express";
import dotenv from "dotenv";
import { fetchLatestTechNews } from "./services/fetchNews.js";
import { generateTweetFromNews } from "./services/generateTweet.js";
import { postToTwitter } from "./services/postToTwitter.js";

dotenv.config();
const app = express();


app.get("/tweet", async (req, res) => {
  try {
    const news = await fetchLatestTechNews();
    const tweet = await generateTweetFromNews(news);
    if (tweet && news) {
      await postToTwitter(tweet, news.image);
      console.log("Tweet posted successfully!");
      return res.status(200).send("Tweet posted successfully!");
    } else {
      console.log("No tweet generated");
      return res.status(200).send("No tweet generated");
    }
  } catch (error) {
    console.error("Tweet Error:", error.message);
    return res.status(500).send("Error generating or posting tweet");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
