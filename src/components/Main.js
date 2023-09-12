import React, { useEffect, useState } from "react";
import Marketing from './Marketing';
import Highlight from "./Highlight";
import BoxNew from "./BoxNew";
import New from './New';
import { getNews } from "./functions/newApi";

export default function Main() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const newsData = await getNews();
        setNews(newsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  const news_1 = news.slice(0, 5);
  const news_2 = news.slice(6, 11);
  const news_3 = news.slice(12, 17);
  const news_4 = news.slice(18, 23);
  const news_5 = news.slice(24, 29);
  const news_6 = news.slice(30, 35);

  return (
    <main>
      <Marketing />
      <Highlight />
      <Marketing />
      {loading ? (
        <div id="spinner">Loading...</div>
      ) : (
        <div className="container">
          <div className="container1">
            {news.map((item, index) => (
              <New
                key={index}
                title={item.title}
                content={item.content}
                image={item.image}
              />
            ))}
          </div>
          <div className="container2">
            <BoxNew newarray={news_1} />
            <BoxNew newarray={news_2} />
            <BoxNew newarray={news_3} />
            <BoxNew newarray={news_4} />
            <BoxNew newarray={news_5} />
            <BoxNew newarray={news_6} />
          </div>
        </div>
      )}
    </main>
  );
}
