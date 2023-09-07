import React, {useState, useEffect} from "react";

export default function New({title, content, image}) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
 
    const noticia_img = {/*css da imagem */
        width: "100%",
        borderRadius: '6px'

    }
    

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
      const changes = windowWidth <= 768;

      const div_new = { /*css da div de notícias*/

        display: "flex",
        flexDirection: changes? 'column': 'row',
        gap: "10px",
        justifyContent: "center",
        backgroundColor: "#F9F9F9",
        borderRadius: "4px",
        width: '90%'

    }  

    const div_noticia_img = {/*css da div da imagem da notícia*/

        width: changes ? "100%":'50%',
        borderRadius: '6px'

    }

    const div_noticia_text = {/*css do texto da notícia*/
        display: "flex",
        flexDirection: "column",
        padding:"10px 0",
        gap: "10px",
        width: changes ? "100%":'50%'
    }

  return (

        <>
            <div style={div_new}>
                <a style={div_noticia_img} href="#">
                    <img src={image} alt="tumulto no recife" style={noticia_img}/>
                </a>
                <div style={div_noticia_text}>
                    <h4 style={{color: "black"}}>{title}</h4>
                    <a href="#">
                        <h2 style={{color: "#C4170C"}}>{content}</h2>
                    </a>
                    <h4></h4>
                </div>  
            </div>
            <hr/>
        </>

  );
}

