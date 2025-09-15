import fs from 'fs';
import path from 'path';

const TWEET_TIME_FILE = path.join(process.cwd(), 'lastTweetTime.json');

export const readLastTweetTime = () => {
  try {
    const data = fs.readFileSync(TWEET_TIME_FILE, 'utf8');
    return JSON.parse(data).lastTweetTime;
  } catch (err) {
    return 0;
  }
};

export const writeLastTweetTime = (lastTweetTime) => {
  const data = JSON.stringify({ lastTweetTime });
  fs.writeFileSync(TWEET_TIME_FILE, data, 'utf8');
};
