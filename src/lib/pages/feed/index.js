import iconFeed from '../../../Imagens/Img feed/rede comentarios.png';
import iconNoticias from '../../../Imagens/Img feed/icon.noticias.png';
import iconArtigos from '../../../Imagens/Img feed/artigo1.png';
import iconEnviar from '../../../Imagens/Img feed/icon-enviarposter.png'
import iconEditar from '../../../Imagens/Img feed/Icone editar.png'
import iconLixo from '../../../Imagens/Img feed/iconLixo.png'
import iconProfile from '../../../Imagens/Img feed/imagem-do-usuario-com-fundo-preto.png'



import { readPosts } from '../../../firebase/firestore';

import './feed.css';



export const feed = () => {
  const container = document.createElement("section");
  container.innerHTML = `
        
      <div class="container">
          <img class="#" src="${iconFeed}" href="#"></img>       
          <img class="#" src="${iconNoticias}" href="#"></img> 
          <img class="#" src="${iconArtigos}" href="#"></img> 
      </div>
      <div class="container-pai">

        <div id="input-container">
          <div class="perfil-containe">
            
           
            <img src="${iconProfile}" alt="perfil"> </img >
             <h3>Name<h3>

          </div> 
          <input type="text" name="post" placeholder="publicação" id="post"/>
          <button id="publish-button" type="button"><img src="${iconEnviar}" alt="Send Button"></button> 
        </div>

        // recebe os dados do poster

        <section id="show-container">
         <div id="post-show"></div>
        </section>
      </div>
       
      `;

  let viewPost = container.querySelector("#post-show");

  readPosts((posts) => {
    console.log(posts);
    let template = "";
    posts.forEach(post => {
      template += `<div><h3>name</h3>
          <div type="text" id="post-show-text">${post.text}</div>
          <div type="date"> ${post.date}</div>
          <button id="edit-button" type="button"><img src="" alt="Edit Button"></button>
          <button id="delete-button" type="button"><img src="" alt="Delete Button"></button>
          </div>`;
    });
      viewPost.innerHTML = template;
  });
  return container;
};


