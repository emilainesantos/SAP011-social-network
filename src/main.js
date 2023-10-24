import { login } from "./lib/pages/login/index.js";
import { register } from "./lib/pages/register/index.js";
import { feed } from "./lib/pages/feed/index.js";
// import "./style.css";

// const app = initializeApp(firebaseConfig);

const main = document.querySelector(".root");

function start() {
  window.addEventListener("hashchange", () => {
    switch (window.location.hash) {
      case "":
        main.innerHTML = ""; // Limpa o conteudo existente em 'main'
        main.appendChild(login());
        break;
      case "#login":
        main.innerHTML = ""; // Limpa o conteudo existente em 'main'
        main.appendChild(login());
        break;
      case "#feed":
        main.innerHTML = ""; // Limpa o conteudo existente em 'main'
        main.appendChild(feed());
        break;
      case "#register":
        main.innerHTML = ""; // Limpa o conteudo existente em 'main'
        main.appendChild(register());
        break;
      default:
        main.appendChild(login()); // erro Mensagem padrao de erro
    }
  });
}

window.addEventListener("load", () => {
  window.location.hash = "";
  main.appendChild(login());
  start();
});
