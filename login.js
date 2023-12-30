// ----------- Forms -------------

const modal = document.querySelector(".wrapper");
const btnLoginModal = document.querySelector(".login-link");
const btnRegisterModal = document.querySelector(".register-link");
const overlay = document.querySelector(".overlay");
const btnOpen = document.querySelector(".open");
const btnClose1 = document.querySelector(".icon-close");
const btnClose2 = document.querySelector(".icon-close2");
const inputBoxs = document.querySelectorAll(".input-box");
const loginForm = document.querySelector(".login-form");
const registrationForm = document.querySelector(".register-form");
const errorContainer = document.getElementById("errorContainer");
const successContainer = document.getElementById("successContainer");
const successLogin = document.getElementById("successLogin");

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

const isValidName = (userName) => {
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  return usernameRegex.test(userName);
};

const displayError = (errorContainer, errorMessage) => {
  errorContainer.style.display = "block";
  errorContainer.style.color = "red";
  errorContainer.textContent = errorMessage;
};

const displaySuccess = (successMessage) => {
  successContainer.style.display = "block";
  successContainer.style.color = "green";
  successContainer.textContent = successMessage;
};

const checkLoggedIn = () => {
  let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  if (isLoggedIn == true) {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log(loggedInUser);
    btnOpen.innerHTML = `<span>Welcome ${loggedInUser.username} 🎉</span>
                  <a style="text-decoration: none; color:red;" onclick="signOut()" href="#">Sign Out</a>`;

    document.querySelector(".signIn").style.width = "45%";
  }
};
checkLoggedIn();

const signOut = () => {
  localStorage.setItem("loggedInUser", JSON.stringify(""));
  localStorage.setItem("isLoggedIn", JSON.stringify(false));
  location.reload();
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("user").value;

  let users = [];
  users = JSON.parse(localStorage.getItem("users"));
  console.log(typeof users);

  // const user = users.find(
  //   (user) => user.username === username && user.password === password
  // );
  let user = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      user = users[i];
      break;
    }
  }

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    checkLoggedIn();
  } else {
    errorContainer.textContent = "Invaild name or password";
    return;
  }

  // If all validations pass, submit the form
  document.querySelector(".signIn").style.width = "45%";
  loginForm.submit();
  closeModal();
});

const regEmail = document.getElementById("email1");
const regPassword = document.getElementById("password1");
const regUserName = document.getElementById("name1");

const validateEmail = () => {
  const errDiv = document.querySelector(".error-email");

  if (regEmail.value === "") {
    displayError(errDiv, "Email field is required!");
    return;
  }

  if (!isValidEmail(regEmail.value)) {
    displayError(errDiv, "Invalid email address!");
    return;
  } else {
    errDiv.textContent = "";
    return true;
  }
};

const validatePassword = () => {
  const errDiv = document.querySelector(".error-password");

  if (regPassword.value === "") {
    displayError(errDiv, "Password field is required!");
    return;
  }

  if (!isValidPassword(regPassword.value)) {
    displayError(errDiv, "Invalid password!");
    return;
  } else {
    errDiv.textContent = "";
    return true;
  }
};

const validateName = () => {
  const errDiv = document.querySelector(".error-name");
  if (regUserName.value === "") {
    displayError(errDiv, "Name field is required!");
    return;
  }

  if (!isValidName(regUserName.value)) {
    displayError(errDiv, "Invalid name!");
    return;
  } else {
    errDiv.textContent = "";
    return true;
  }
};

regEmail.addEventListener("input", validateEmail);
regPassword.addEventListener("input", validatePassword);
regUserName.addEventListener("input", validateName);

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validatePassword() && validateName()) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // const isUserName = users.some((user) => user.userName === regUserName);
    let isUserName = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === regUserName.value) {
        isUserName = true;
        break;
      }
    }
    if (isUserName) {
      errorContainer.textContent = "Username already logged in";
      return;
    } else {
      const newUser = {
        username: regUserName.value,
        password: regPassword.value,
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
    }

    displaySuccess("Form submitted successfully!");
    registrationForm.submit();
    setTimeout(closeModal, 5000);
  }
});

// localStorage.clear();

btnRegisterModal.addEventListener("click", () => {
  modal.classList.add("active");
});

btnLoginModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

const openModal = () => {
  modal.classList.add("active-btn");
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.remove("active-btn");
  overlay.classList.add("hidden");
};

btnOpen.addEventListener("click", openModal);

btnClose1.addEventListener("click", closeModal);
btnClose2.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);
