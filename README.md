🐦 AI Twitter Bot

An AI-powered Twitter bot that automatically fetches the latest Indian tech news, generates engaging tweets using AI, and posts them to Twitter (with images if available).

🚀 Features

• 🔎 Fetches latest tech news from India using the GNews API.

• 🧠 Uses AI (Mistral via OpenRouter) to generate short, catchy, and engaging tweets.

• 🖼️ Supports posting with images from the news article.

• ⏰ Has built-in rate-limiting (waits 30 min between tweets).

• 📅 Includes daily scheduled cron job at 8:00 AM (configurable).

• 🛠️ Built with Node.js + Express.

📂 Project Structure

ai_twitter_bot/
│── server.js              # Main entry point, handles routes & cron jobs
│
├── services/
│   ├── fetchNews.js       # Fetches top tech news from GNews API
│   ├── generateTweet.js   # Uses AI (Mistral) to generate a tweet
│   └── postToTwitter.js   # Uploads image & posts tweet to Twitter
│
├── .env                   # Environment variables (API keys, tokens)
├── package.json           # Project dependencies & scripts
├── LICENSE                # MIT License file
└── README.md              # Project documentation

⚙️ Setup Instructions

1.Clone the repo

git clone https://github.com/dilip7851/AI_Agents_X_Post.git
cd AI-TWITTER-BOT

2. Install dependencies
 npm install

3.Configure environment variables

Create a .env file in the root directory and add:

PORT=3000

# GNews API
GNEWS_API_KEY=your_gnews_api_key

# OpenRouter AI API
OPENROUTER_API_KEY=your_openrouter_api_key

# Twitter API keys (from developer portal)
TWITTER_APP_KEY=your_twitter_app_key
TWITTER_APP_SECRET=your_twitter_app_secret
TWITTER_ACCESS_TOKEN=your_twitter_access_token
TWITTER_ACCESS_SECRET=your_twitter_access_secret

# Enable cron locally
RUN_LOCAL_CRON=true

4. Run the bot locally
   
Development mode (auto restart):
npm run dev

Production mode:
npm start

5. Set up UptimeRobot

• Create an account on UptimeRobot.
• Add a new HTTP(S) monitor with the URL of your server endpoint (e.g., https://ai-agents-x-post.onrender.com).
• Set the monitoring interval to every 5 minutes to keep the server awake.

📡 API Endpoints

• POST /tweet → Triggers the bot to fetch news, generate a tweet, and post to Twitter.

Example:
curl http://localhost:3000/tweet

⏰ Cron Job

• Runs automatically at 8:00 AM daily if RUN_LOCAL_CRON=true is set in .env.

• Fetches fresh news, generates tweet, and posts it.

🛠️ Tech Stack

Node.js + Express → Server & API handling

Axios → API requests

GNews API → Fetching latest tech news

OpenRouter + Mistral → AI tweet generation

Twitter API v2 (twitter-api-v2) → Tweet posting with/without images

Node-Cron → Scheduling daily auto-tweets  

UptimeRobot → Keeping the server awake


📌 Example Tweet

🚀 India’s tech scene is buzzing!
XYZ startup raises funding to boost AI innovation.
#TechNews #AI

(Image attached if available)


📜 License

This project is licensed under the MIT License. See the LICENSE file for details.










