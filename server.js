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
