import React, { useState, useEffect } from "react";
import { getMarketing } from "./functions/marketingApi";

export default function Marketing(){

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [countImg, setCountImg] = useState(0);
  const [marketing, setMarketing] = useState([]);

  async function fetchMarketing(){
    const marketingData = await getMarketing();
    setMarketing(marketingData);
  }

  useEffect(() => {
    fetchMarketing();
  }, []); 

  function countImage(){

    if (countImg < 4) {
      setCountImg(countImg + 1);
    } else {
      setCountImg(0);
    }

  }

  useEffect(() => {
    const intervalId = setInterval(countImage, 10000);
    return () => clearInterval(intervalId); // Limpar o intervalo quando o componente for desmontado
  }, [countImg]);

  // Função para verificar a largura da tela e atualizar o estado
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

  const box_marketing = {
    /* CSS da div do anúncio */
    height:isSmallScreen ?"150px":"200px",
    width: isSmallScreen ? "95%" : "70%", // Altera a largura para 100% se a tela for pequena
    cursor: "pointer",
  };
  /*css da imagem do anúncio*/
  const img_marketing={

      height: "100%",
      width: "100%"

  }

  // Verificar se marketing possui elementos antes de acessar a propriedade 'image'
  const marketingElement = marketing[countImg];
  if (!marketingElement) {
    // Se não houver elemento em marketing, retorne null ou uma mensagem de erro apropriada
    return null;
  }

  return (
      <div style={box_marketing} id='box_marketing'>

        <img style={img_marketing} src={marketingElement.image} alt={marketingElement.image._id} />
        
      </div>
  );
}
