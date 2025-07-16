import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
dotenv.config();

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

export async function postToTwitter(tweet) {
  try {
    const { data } = await twitterClient.v2.tweet(tweet);
    console.log("✅ Tweet posted successfully:", data);
    return data;
  } catch (error) {
    console.error("❌ Twitter Post Error:", error.response?.data || error);
    return null;
  }
}
