import React, {useState, useEffect} from "react";
import New2 from './New2'

export default function BoxNew({newarray}){


    const box_new = {

        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '5px',
        padding: '50px 0 20px 0',
        border: '1px solid gray',

    }

    const [news, setNews] = useState([]);

    useEffect(()=>{
        setNews(newarray)
    }, [newarray])

    return (

        <div style={box_new}>

            <h3 style={{position: 'absolute', left: '30px', top:'20px'}}>Você viu isso?</h3>
            <hr/> 

            {news.map((item, index) => (
                  <New2 key={index} content={item.content}image={item.image}/>
            ))} 
          
        </div>

    );
}

