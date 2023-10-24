import { verifyLogin } from "../../../firebase/firebaseAuth";
import { GoogleAuthProvider } from "firebase/auth";
import './login.css';

export const login = () => {
  const container = document.createElement("section");
  container.innerHTML = `
    <!--<form action="feed.html>" --!>
    <form class="login-container"> 
    <h3 class="titulo">LOGIN</h3>
    <label class="config-titulo">E-mail:</label>
    <input name="email" class="email-input" placeholder="seu@email.com">
    <div class = "error-none" id="email-error">E-mail e obrigatorio ou invalido</div>
    
    <label class="config-titulo">Senha:</label>
    <input type="password" class="key" placeholder="Digite sua senha.">
    <div class="error-none" id="password-error">Senha esta invalida e é obrigatoria </div>
          
    <div class="send-container"> 
     <button type="submit" class="email-error" disabled id="enter">Entrar</button>
    </div>          
    
    <div class="social-container">
      <button id="google">
        <img src="../../../Imagens/icon-google01.png"></img>             
        <h1>Login com Google</h1>
      </button>
      <p>Esqueceu a senha?<a href="paranaoesquecer.com">Redefinir senha</a></p>
      <p>Não tem uma conta?<a href="/#register">Cadastre-se</a></p>
    </div>
    `;

  /*VALIDAÇÃO EM JAVA SCRIPT PARA PAG-LOGIN */
  const email = container.querySelector(".email-input");
  const password = container.querySelector(".key");
  const emailMessage = container.querySelector(".error-none");
  const passwordMessage = container.querySelector(".error-none");
  const enterButton = container.querySelector("#enter");
  const form = container.querySelector(".login-container");
  const gmail = container.querySelector("#google");



  gmail.addEventListener("click", function () {
    GoogleAuthProvider();
  });
 

  enterButton.addEventListener("click", function () {
    if (email.value === "" || isValidEmail(email)) {
      emailMessage.classList.remove("error-none");
      emailMessage.classList.add("error-block");
    } else {
      emailMessage.classList.add("error-block");
      emailMessage.classList.remove("error-none");
    }

    if (password.value === "" || isValidPassword(password) === false) {
      passwordMessage.classList.remove("error-none");
      passwordMessage.classList.add("error-block");
    } else {
      passwordMessage.classList.add("error-none");
      passwordMessage.classList.remove("error-block");
    }
  });

  function toggleButtonDisable () {
    const emailValid = isValidEmail(email.value);
    const passwordValid = isValidPassword(password.value);
    if (emailValid && passwordValid) {
      enterButton.removeAttribute("disabled");
    } else {
      enterButton.disabled = true;
    }
  }

  email.addEventListener("input", toggleButtonDisable);
  password.addEventListener("input", toggleButtonDisable);
  

  function isValidEmail(email) {
    const parameter = /^\S+@\S+\.\S+$/;
    return parameter.test(email);
  }

  function isValidPassword(password) {
    if (password.length >= 8) {
      return true
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const verifyEmail = container.querySelector(".email-input").value;
    const verifyPassword = container.querySelector(".key").value;
    verifyLogin(verifyEmail, verifyPassword)
      .then(() => {
        window.location.hash = "feed";
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao relizar o login, verifique se seus dados estao corretos e tente novamente");
      })
  });

  return container;
};
