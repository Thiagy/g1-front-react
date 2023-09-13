import React, { useEffect, useState } from "react";
import Marketing from './Marketing'
import Highlight from "./Highlight";
import BoxNew from "./BoxNew";
import New from './New';
import { getNews } from "./functions/newApi";

export default function Main(){

  const [news, setNews] = useState([]);
  const [index_news, setIndexNews] = useState(0); // Use o estado para armazenar o índice

  async function fetchNews() {
    
    const footer = document.querySelector('footer')

    const newsData = await getNews();

    if (newsData) {
       
        footer.style.display='flex'
    }
    setNews(newsData);
  }

  useEffect(() => {
    fetchNews();
  }, []); 

  // Atualize o índice dentro de setInterval usando o estado
  useEffect(() => {
    const interval = setInterval(() => {
      if (index_news + 17 < news.length) {
        setIndexNews(index_news + 6);
      } else {
        setIndexNews(0);
      }
    }, 5000); // Intervalo de 5 segundos (ou outro valor desejado)

    return () => clearInterval(interval); // Limpar o intervalo ao desmontar o componente
  }, [index_news, news]);

  // Divida as notícias em grupos de 5
  const news_1 = news.slice(index_news, index_news + 5);
  const news_2 = news.slice(index_news + 6, index_news + 11);
  const news_3 = news.slice(index_news + 12, index_news + 17);

  return (
    <>
    <div id="spinner" style={{display: news.length ? 'none' : 'block'}}></div>
    <main style={{display: news.length ? 'flex' : 'none'}}>
        <Marketing/>
        {news.length > 0 && (
        <Highlight
          news_1={news_1}
          news_2={news_2}
          news_3={news_3}
        />
      )}
        <Marketing/>
        
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
              <BoxNew newarray={news_1} title='Você viu isso?'/>
              <BoxNew newarray={news_2}  title='Blogs e colunas'/>
              <BoxNew newarray={news_3} title='Mais lidas'/>
            </div>  
        </div>     
    </main>
    </>
  );
}
