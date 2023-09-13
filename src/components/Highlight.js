import React, { useState, useEffect } from "react";

export default function Highlight({ news_1, news_2, news_3 }) {
  const highlight_1 = {
    height: "100%",
    width: "49.5%",
    position: "absolute",
    left: 0,
    borderRadius: "14px",
  };

  const highlight_2 = {
    height: "49.5%",
    width: "50%",
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: "14px",
  };

  const highlight_3 = {
    height: "49.5%",
    width: "50%",
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: "14px",
  };

  const img_highlight = {
    height: "100%",
    width: "100%",
    borderRadius: "14px",
  };

  const title_highlight = {
    top: "10px",
    left: "10px",
    position: "absolute",
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Lógica para determinar se a largura da tela é menor ou igual a 768px
  const isSmallScreen = windowWidth <= 768;

  const csshighlight = {
    /*Div de notícias de destaque*/
    height: isSmallScreen ? "50vh" : "95vh",
    width: isSmallScreen ? "100%" : "95%", // Altera a largura para 100% se a tela for pequena
    position: "relative",
  };

  return (
    <div style={csshighlight} id="csshighlight">
      {news_1.length > 0 && (
        <a href="#" target="_blank" style={highlight_1}>
          <h4 style={title_highlight}>{news_1[0].content}</h4>
          <img style={img_highlight} src={news_1[0].image} />
        </a>
      )}
      {news_2.length > 1 && (
        <a href="#" target="_blank" style={highlight_2}>
          <h4 style={title_highlight}>{news_2[1].content}</h4>
          <img style={img_highlight} src={news_2[1].image} />
        </a>
      )}
      {news_3.length > 2 && (
        <a href="#" target="_blank" style={highlight_3}>
          <h4 style={title_highlight}>{news_3[2].content}</h4>
          <img style={img_highlight} src={news_3[2].image} />
        </a>
      )}
    </div>
  );
}
