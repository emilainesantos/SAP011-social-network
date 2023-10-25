import iconFeed from "../../../Imagens/Img feed/rede comentarios.png";
import iconNoticias from "../../../Imagens/Img feed/icon.noticias.png";
import iconArtigos from "../../../Imagens/Img feed/artigo1.png";
import iconEnviar from "../../../Imagens/Img feed/icon-enviarposter.png";
import iconEditar from "../../../Imagens/Img feed/Icone editar.png";
import iconLixo from "../../../Imagens/Img feed/iconLixo.png";
import iconProfile from "../../../Imagens/Img feed/imagem-do-usuario-com-fundo-preto.png";

import { readPosts, recordPosts } from "../../../firebase/firestore";

import "./feed.css";

export const feed = () => {
  const container = document.createElement("section");
  container.innerHTML = `
        <div class="container">
          <img class="#" src="${iconFeed}" href="#"></img>       
          <img class="#" src="${iconNoticias}" href="#"></img> 
          <img class="#" src="${iconArtigos}" href="#"></img> 
      </div>
      <div id="input-container">
       <div><h3>name<h3></div> 
        <input type="text" name="post" placeholder="publicação" id="post"/>
        <button id="publish-button" type="button"><img src="${iconEnviar}" alt="Send Button"></button> 
      </div>
      <section id="show-container">
      <div id="post-show"></div>
      </section>
      `;

  container.style.height = "90%";


  const viewPost = container.querySelector("#post-show");
  const publishButton = container.querySelector("#publish-button");

  viewPost.classList.add("feed-container");

  readPosts((posts) => {
    let template = "";
    posts.forEach((post) => {
      template += `
        <div class="feed">
          <h3>name</h3>
          <div type="text" id="post-show-text">${post.textOfPost}</div>
          <div type="date"> ${post.dateOfPost}</div>
          <div class="action-container">
            <button class="unstyled-button" id="edit-button" type="button">
              <img src="${iconEditar}" alt="Edit Button" class="small">
            </button>
            <button class="unstyled-button" id="delete-button" type="button">
              <img src="${iconLixo}" alt="Delete Button" class="small">
            </button>
          </div>
        </div>
      `;
    });
    viewPost.innerHTML = template;
  });

  publishButton.addEventListener('click', function (e) {
    e.preventDefault();

    let textOfPost = container.querySelector("#post").value;
    console.log(textOfPost);
    recordPosts(textOfPost);
    
  });


  return container;
};
