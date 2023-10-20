import iconFeed from '../../../Imagens/Img feed/rede comentarios.png';
import iconNoticias from '../../../Imagens/Img feed/icon.noticias.png';
import iconArtigos from '../../../Imagens/Img feed/artigo 1.png';
import iconEnviar from '../../../Imagens/Img feed/icon-enviarposter.png'

import { readPosts } from '../../../firebase/firestore';

import './feed.css';



export const feed = () => {
  const container = document.createElement("section");
  container.innerHTML = `
  <div class="container-pai">
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


