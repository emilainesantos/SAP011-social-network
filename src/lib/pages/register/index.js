import { verifyRegister } from "../../../firebase/firebaseAuth";
import "./register.css";

export const register = () => {
  const container = document.createElement("section");
  container.innerHTML = `
    <form class="registro-container"> 
      <h3 class="titulo">BEM VINDO(A) A MEDGREEN<h3>
      <label class="config-titulo">Digite seu nome completo:</label>
      <input type="name" class="name" placeholder="Nome completo">
          
      <label class="config-titulo">Nascimento:</label>
      <input type="date" id="date" class="form">
      <div id ="date" class="error-none">Data e obrigatorio</div>

      <label class="config-titulo">E-mail:</label>   
      <input type="email" class="email-input" placeholder="seu@e-mail.com">
      <div class="error-none" id ="email-error">E-mail e obrigatorio</div>

      <label class="config-titulo">Senha:</label>
      <input type="password" class="key" placeholder="Digite sua senha.">
      <div class="error-none" id="password-error">Senha e obrigatorio</div>
      
      <div class="send-container">
        <button type="submit" class="confirm" disabled id="enter" value="cadastrar">Cadastrar</button>
      </div>

      <div class="social-container">           
        <button type="button" id="gmail">
          <img src="../../../Imagens/icon-google01.png"></img>             
          <h1>Cadastre-se com Google</h1>
        </button>
        <a class="login-a" href="/#login"> Pagina inicial </a>
      </div>

      </form>
  `;

  const email = container.querySelector(".email-input");
  const password = container.querySelector(".key");
  const date = container.querySelector("#date");
  const emailMessage = container.querySelector(".error-none");
  const passwordMessage = container.querySelector(".error-none");
  const dateMessage = container.querySelector(".error-none");
  const enterButton = container.querySelector("#enter");

  const validateDate = container.querySelector(".form");
  validateDate.addEventListener("input", function (e) {
    e.preventDefault();
    toggleRegisterErrors(email, password, date);
  });

  function toggleRegisterErrors(email, password, date) {
    enterButton.addEventListener("input", function (e) {
      e.preventDefault();
      if (email.value === "" || isValidEmail(email)) {
        emailMessage.classList.contains(".error-none");
        emailMessage.classList.remove(".error-none");
        emailMessage.classList.add(".error-block");
      } else {
        emailMessage.classList.add(".error-block");
        emailMessage.classList.remove(".error-none");
      }

      if (password.value === "" || isValidPassword(password) === false) {
        passwordMessage.classList.remove(".error-none");
        passwordMessage.classList.add(".error-block");
      } else {
        passwordMessage.classList.add("error-none");
        passwordMessage.classList.remove("error-block");
      }

      if (date <= 18) {
        dateMessage.classList.remove(".error-none");
        dateMessage.classList.add(".error-block");
      } else {
        dateMessage.classList.add(".error-block");
        dateMessage.classList.remove(".error-none");
      }
    });
  }

  function toggleButtonsDisable() {
    const emailValid = isValidEmail(email.value);
    const passwordValid = isValidPassword(password.value);
    const dateValid = isValidDate(date.value);
    if (emailValid && passwordValid && dateValid) {
      enterButton.removeAttribute("disabled");
    } else {
      enterButton.disabled = true;
    }
  }

  email.addEventListener("input", toggleButtonsDisable);
  password.addEventListener("input", toggleButtonsDisable);
  date.addEventListener("input", toggleButtonsDisable);

  function isValidEmail(email) {
    const parameter = /^\S+@\S+\.\S+$/;
    return parameter.test(email);
  }

  function isValidPassword(password) {
    if (password.length - 1 >= 7) {
      return true;
    }
  }

  function isValidDate(date) {
    const ageMin = 18;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const age = currentYear - new Date(date).getFullYear();
    if (age >= ageMin) {
      return true;
    } else {
      return false;
    }
  }

  let form = container.querySelector(".registro-container");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const verifyEmail = container.querySelector(".email-input").value;
    const verifyPassword = container.querySelector(".key").value;
    verifyRegister(verifyEmail, verifyPassword)
      .then(() => {
        alert("cadastro realizado");
        window.location.hash = "feed";
      })
      .catch((error) => {
        console.error(error);
        alert(
          "Erro ao relizar o cadastro, verifique se seus dados estao corretos e tente novamente"
        );
      });
  });

  return container;
};
