import { TwitterApi } from 'twitter-api-v2';
import axios from 'axios';
import dotenv from 'dotenv';
import { EUploadMimeType } from 'twitter-api-v2';

dotenv.config();

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

async function uploadImage(imageUrl) {
  if (!imageUrl) return null;
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    const mediaId = await twitterClient.v1.uploadMedia(buffer, { mimeType: EUploadMimeType.Jpeg });
    return mediaId;
  } catch (err) {
    console.error('Image upload failed:', err.message);
    return null;
  }
}

export async function postToTwitter(tweet, imageUrl = null) {
  try {
    const mediaId = await uploadImage(imageUrl);
    const payload = mediaId ? { text: tweet, media: { media_ids: [mediaId] } } : { text: tweet };
    const { data } = await twitterClient.v2.tweet(payload);
     console.log('Tweet posted:', data);
    return data;
  } catch (error) {
    console.error('Twitter Post Error:', error.response?.data || error);
    return null;
  }
}
