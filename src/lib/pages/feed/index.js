import iconFeed from "../../../Imagens/Img feed/rede comentarios.png";
import iconNoticias from "../../../Imagens/Img feed/icon.noticias.png";
import iconArtigos from "../../../Imagens/Img feed/artigo1.png";
import iconEnviar from "../../../Imagens/Img feed/icon-enviarposter.png";
import iconEditar from "../../../Imagens/Img feed/Icone editar.png";
import iconLixo from "../../../Imagens/Img feed/iconLixo.png";
import iconProfile from "../../../Imagens/Img feed/imagem-do-usuario-com-fundo-preto.png";
import { readPosts, recordPosts, atualizarPosts, deletePosts } from "../../../firebase/firestore";
import "./feed.css";

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
        <div class="perfil-container">          
          <img src="${iconProfile}" alt="perfil"> </img >
          <h3>Name<h3>
        </div> 
        
        <textarea name="post" id="post" rows="4" cols="50" placeholder="Publicação..."></textarea>
          <div class="button-container">
            <button id="publish-button" type="button" class="unstyled-button">
              <img src="${iconEnviar}" alt="Send Button">
            </button>
          </div>
        </div>
      
      <section id="show-container">
        <div id="post-show"></div>
      </section>
      </div>
      `;

  container.style.height = "100%";


  let viewPost = container.querySelector("#post-show");
  let publishButton = container.querySelector("#publish-button");

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
            <button class="edit-btn unstyled-button" id="data-${post.id}" data-postid ="${post.id}" type="button">
              <img  src="${iconEditar}" alt="Edit Button" class="small">
            </button>
            <button class="deletebtn unstyled-button" id="data-${post.id}" data-postid="${post.id}" type="button">
              <img src="${iconLixo}" alt="Delete Button" class="small">
            </button>
          </div>
        </div>
      `;
    });
    viewPost.innerHTML = template;




    //BOTÃO EDITAR
    let editBtns = viewPost.querySelectorAll(".edit-btn");
  console.log(editBtns);

  editBtns.forEach((editBtn) => {
    editBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(e);
      const id = e.target.parentNode.dataset.postid;
      console.log(e.target.parentNode);
      const novoTexto = "Novo texto Emi" //pegar o elemento do container.value
      atualizarPosts(id, novoTexto);
      
    });

  });

 //BOTÃO EXCLUIR POSTER

 let deleteBtn = viewPost.querySelectorAll(".deletebtn");

 deleteBtn.forEach((deleteBtn) => {
   deleteBtn.addEventListener('click', (e) => {
     e.preventDefault();
     const id = e.target.parentNode.dataset.postid;
     deletePosts(id);
   })
 });


  });

  publishButton.addEventListener('click', function (e) {
    e.preventDefault();

    let textOfPost = container.querySelector("#post").value;
    recordPosts(textOfPost);

  });

  // let editBtns = container.querySelectorAll(".edit-btn");
  // console.log(editBtns);

  // editBtns.forEach((editBtn) => {
  //   editBtn.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     console.log(e);
  //     const id = e.target.dataset.postid;
  //     const novoTexto = "Novo texto Emi" //pegar o elemento do container.value
  //     atualizarPosts(id, novoTexto);
      
  //   })
  // });

  // let deleteBtn = container.querySelectorAll(".deletebtn");

  // deleteBtn.forEach((deleteBtn) => {
  //   deleteBtn.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     const id = e.target.dataset.postid;
  //     deletePosts(id);
  //   })
  // });

  return container;
};


