import React,{useState} from "react";
import { postNews } from "./functions/newApi";
import {readFileAsBase64} from "./functions/readFileAsBase64"

export default function Header() {

    const[open, setOpen]=useState(false)
    const[openPost, setOpenPost]=useState(true)

    const [formData, setFormData] = useState({

        title: "",
        content: "",
        image: "",

    });

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          // Converter a imagem em base64 usando a função readFileAsBase64
          const imageInput = document.getElementById("image");
          const imageFile = imageInput.files[0]; // Obtenha o arquivo de imagem do input
          const maxWidth = 340; // Largura máxima desejada da imagem
          const maxHeight = 200; // Altura máxima desejada da imagem
          const quality = 0.7; // Qualidade da imagem (0.0 - 1.0)
      
          const imageBase64 = await readFileAsBase64(imageFile, maxWidth, maxHeight, quality);
      
          // Montar os dados da notícia, incluindo a imagem convertida em base64
          const newsData = {
            title: formData.title,
            content: formData.content,
            image: imageBase64,
          };
      
          // Enviar os dados da notícia para a rota /news
          await postNews(newsData);

          openMenu()
      
          console.log("Notícia postada com sucesso!");
        } catch (error) {
          console.error("Erro ao postar a notícia:", error);
        }
      };
      

    function openMenu(){
        setOpen(open => !open)
    }
    function openPostNew(){
        setOpenPost(openPost => !openPost)
    }
  return (
    <>
        <header>
            <div className="cssmenu" onClick={openMenu}>
                <div className="itemMenu">
                    <div className="itensMenu"></div>
                    <div className="itensMenu"></div>
                    <div className="itensMenu"></div>
                </div>
                <div className="menu-titulo">
                    <h4>MENU</h4>
                </div>
            </div>
            <h1 className="logo-g1">g1</h1>
            <div className="divSearch"  >
                <div id="lupa-header"></div>
                <input className="search" type="search" name="pesquisa" id="pesquisa" placeholder="BUSCAR"/>
            </div>
        </header>
        <aside id="menu-header" style={{left: open? '0':'-290px'}}>
            <a className="link_word_menu" href="#">
                editorias
            </a>
            <a className="link_word_menu" href="#">
                Eleições
            </a>
            <a className="link_word_menu" href="#">
                regiões
            </a>
            <a className="link_word_menu" href="#">
                telejornais
            </a>
            <a className="link_word_menu" href="#">
                globonews
            </a>
            <a className="link_word_menu" href="#">
                blogsecolunas
            </a>
            <a className="link_word_menu" href="#">
                podcasts
            </a>
            <a className="link_word_menu" href="#">
                serviços
            </a>
            <a className="link_word_menu" href="#">
                videos
            </a>
            <a className="link_word_menu" href="#">
                newsletter
            </a>
            <a className="link_word_menu" href="#">
                webstories
            </a>
            <a className="link_word_menu" href="#">
                especial publicitário
            </a>
            <a className="link_word_menu" href="#">
                princípios editoriais
            </a>
            <a className="link_word_menu" href="#">
                sobre o g1
            </a>
            <a className="link_word_menu" href="#">
                appg1
            </a>
            <a className="link_word_menu" href="#">
                equipe
            </a>
            <a className="link_word_menu" href="#">
                entre em contato
            </a>
            <a className="link_word_menu" href="#">
                termos de uso
            </a>
        </aside>
        <div id="backdrop" style={{display: open? 'block': 'none'}} onClick={openMenu}></div>
        {/* Formulário para coletar título, conteúdo e imagem */}
        <form onSubmit={handleSubmit} id="post_new" style={{display: openPost? 'block':'none'}}>
            <div id="box_arraw_close" onClick={openPostNew}>
                <div className="arrows_close" id="arrow_1"></div>
                <div className="arrows_close" id="arrow_2"></div>
            </div>
            <div id="box_insert_new">
                <div id="box_title">
                <label htmlFor="title">Título:</label><br/>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                </div>
                <div id="box_content">
                <label htmlFor="content">Conteúdo:</label><br/>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                ></textarea>
                </div>
                <div id="box_image">
                    <div id="label_image">Imagem</div><br/>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                    />
                </div>
            <button type="submit" id="btn_post_new">Enviar</button>
            </div>    
        </form>
    </>
  );
}

