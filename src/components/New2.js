import React, {useState, useEffect} from "react";

export default function New2({content, image}) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const new_sec_image = {
        height: '100%',
        width: '100%',
        borderRadius: '8px'

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

    const changes = windowWidth <= 350;
    const changesScreen = windowWidth <= 485;

    const div_new_sec = {

        display: 'flex',
        flexDirection: changes? 'column-reverse':'row',
        padding: '10px',
        width: changesScreen ? "96%":'90%',
        gap: '10px'

    }

    const div_new_sec_image = {

        height: changes ? "auto":'60px',
        width: changes ? "100%":'30%',
        borderRadius: '8px'

    }

    const div_new_sec_title = {

        display: 'flex',
        flexDirection: 'column',
        width: changes ? "100%":'60%',
        gap: '10px'
    }

  return (
    <>
        <div style={div_new_sec}>

            <div style={div_new_sec_title}>
                <a href="#" target="_blank">
                    <h4 style={{color: '#C4170C'}}>{content}</h4>
                </a>  
            </div>
            <a style={div_new_sec_image} href="#" target="_blank">
                <img style={new_sec_image} src={image} alt={content}/>
            </a>
            
        </div>
        <hr style={{width: changes ? "100%":'90%',}}/>

    </>
  );
}

