import React,{useState, useEffect} from "react";
import { getNews } from "./functions/newApi";

export default function Highlight(){

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    const highlight_1 = {
   
        height: "100%",
        width: "49.5%",
        position: "absolute",
        left: 0,
        borderRadius: "14px"

    }
    const highlight_2 = {
        
        height: "49.5%",
        width: "50%",
        position: "absolute",
        top: 0,
        right: 0,
        borderRadius: "14px"
        
    }
    const highlight_3 = {
        
        height: "49.5%",
        width: "50%",
        position: "absolute",
        bottom: 0,
        right: 0,
        borderRadius: "14px",

    }
    const img_highlight = {
        height: '100%',
        width: '100%',
        borderRadius: '14px'
    }
    const title_highlight = {
        top: '10px',
        left: '10px',
        position: 'absolute'
    }

    const [highlight, setHighlight] = useState([]);

    const [countHighlight1, setCountHighlight1] = useState(0);
    const [countHighlight2, setCountHighlight2] = useState(1);
    const [countHighlight3, setCountHighlight3] = useState(2);

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
      

      const csshighlight = {/*Div de notícias de destaque*/

        height: isSmallScreen ? "50vh" : "78vh",
        width: isSmallScreen ? "100%" : "95%", // Altera a largura para 100% se a tela for pequena
        position: "relative"

        }

    async function fetchNews(){

        const newsData = await getNews();

        setHighlight(newsData);

    }

    useEffect(() => {
        fetchNews();
    }, []); 

    function countImage(){

        if (countHighlight1 < 20){

          setCountHighlight1(countHighlight1 + 3);

        } else {

          setCountHighlight1(0);

        }

        if (countHighlight2 < 22) {

            setCountHighlight2(countHighlight2 + 3);

          } else {

            setCountHighlight2(0);

        }

        if (countHighlight3 < 24) {

            setCountHighlight3(countHighlight3 + 3);

          } else {

            setCountHighlight3(0);

        }

    }
    
    useEffect(() => {
    const intervalId = setInterval(countImage, 10000);
    return () => clearInterval(intervalId); // Limpar o intervalo quando o componente for desmontado
    }, [countHighlight1]);

    // Verificar se marketing possui elementos antes de acessar a propriedade 'image'
  const marketingElement1 = highlight[countHighlight1];
  const marketingElement2 = highlight[countHighlight2];
  const marketingElement3 = highlight[countHighlight3];

  if (!marketingElement1 || !marketingElement2 || !marketingElement3) {
    // Se não houver elemento em marketing, retorne null ou uma mensagem de erro apropriada
    return null;
  }


    

    

  return (

    <div style={csshighlight} id="csshighlight">

        <a href="#" target="_blank" style={highlight_1}>

            <h4 style={title_highlight} >{marketingElement1.content}</h4>

            <img style={img_highlight} src={marketingElement1.image}/>

        </a>
        <a href="#" target="_blank" style={highlight_2}>

            <h4 style={title_highlight}>{marketingElement2.content}</h4>

            <img style={img_highlight} src={marketingElement2.image}/>

        </a>
        <a href="#" target="_blank" style={highlight_3}>

            <h4 style={title_highlight}>{marketingElement3.content}</h4>

            <img style={img_highlight} src={marketingElement3.image}/>

        </a>
            
    </div>

  );
}

