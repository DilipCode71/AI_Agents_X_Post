import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function fetchLatestTechNews() {
  
  const countries = ['in', 'us', 'gb', 'ca']; 
  const randomCountry = countries[Math.floor(Math.random() * countries.length)];
  try {
    const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
      params: {
        topic: 'technology',
        lang: 'en',
        country: randomCountry, 
        max: 5,
        token: process.env.GNEWS_API_KEY,
      },
    });

    const articles = response.data.articles;
    if (!articles.length) return null;



    // pick random article from the list (to reduce duplicate tweets)
    const topArticle = articles[Math.floor(Math.random() * articles.length)];


    // const topArticle = articles[0];

    return {
      title: topArticle.title,
      description: topArticle.description,
      url: topArticle.url,
      image: topArticle.image,
    };
  } catch (error) {
    console.error('Error fetching news from GNews:', error.response?.data || error.message);
    return null;
  }
}
