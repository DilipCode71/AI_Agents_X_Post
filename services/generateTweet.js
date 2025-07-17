import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

export async function generateTweetFromNews(news) {
  if (!news || !news.title) return null;

  const prompt = `
Based on the following Indian tech news headline, write a short tweet (under 280 characters) that is engaging, relevant, and informative for learners.

"${news.title}"

Only reply with the tweet. Add 1-2 hashtags. No explanation.
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI that writes short, catchy tweets about tech news.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const tweetText = response.data?.choices?.[0]?.message?.content?.trim() || null;
    return tweetText;
  } catch (err) {
    console.error("❌ Mistral Axios Error:", err.response?.data || err.message);
    return null;
  }
}
