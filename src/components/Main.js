import React, { useEffect, useState } from "react";
import Marketing from './Marketing'
import Highlight from "./Highlight";
import BoxNew from "./BoxNew";
import New from './New';
import { getNews } from "./functions/newApi";

export default function Main() {
  const [news, setNews] = useState([]);
  const [index_news, setIndexNews] = useState(0);
  const [visibleNewsCount, setVisibleNewsCount] = useState(8);

  async function fetchNews() {
    const footer = document.querySelector('footer')
    const newsData = await getNews();

    if (newsData) {
      footer.style.display = 'flex';
    }
    setNews(newsData);
  }

  useEffect(() => {
    fetchNews();
  }, []); 

  useEffect(() => {
    const interval = setInterval(() => {
      if (index_news + 17 < news.length) {
        setIndexNews(index_news + 6);
      } else {
        setIndexNews(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [index_news, news]);

  const loadMoreNews = () => {
    setVisibleNewsCount(visibleNewsCount + 5);
  };

  return (
    <>
      <div id="spinner" style={{ display: news.length ? 'none' : 'block' }}></div>
      <main style={{ display: news.length ? 'flex' : 'none' }}>

        {/*Componente que exibe os anúncios*/}
        <Marketing/>

        {/*Componente que exibe os notícias de destaque*/}
        {news.length > 0 && (
          <Highlight
            news_1={news.slice(index_news, index_news + 5)}
            news_2={news.slice(index_news + 6, index_news + 11)}
            news_3={news.slice(index_news + 12, index_news + 17)}
          />
        )}

        {/*Componente que exibe os anúncios*/}
        <Marketing/>
        <div className="container">
          {/*Componente que exibe os lista de notícias*/}
          <div className="container1">
            {news.slice(0, visibleNewsCount).map((item, index) => (
              <New key={index} title={item.title} content={item.content} image={item.image} />
            ))}
            {visibleNewsCount < news.length && (
              <div id="btn_show_more" onClick={loadMoreNews}>Veja mais</div>
            )}
          </div>
          <div className="container2">
          {/*Componentes que exibe os lista de notícias secundárias*/}

            <BoxNew newarray={news.slice(index_news, index_news + 5)} title='Você viu isso?'/>
            <BoxNew newarray={news.slice(index_news + 6, index_news + 11)} title='Blogs e colunas'/>
            <BoxNew newarray={news.slice(index_news + 12, index_news + 17)} title='Mais lidas'/>
          </div>  
        </div>     
      </main>
    </>
  );
}
