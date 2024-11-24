// sign up page
var userName = document.querySelector(".sign-up .SuserName");
var E_mail = document.querySelector(".sign-up .SE-mail");
var password = document.querySelector(".sign-up .Spassword");
var SignUp_btn = document.querySelector(".sign-up .SignUp-btn");

// home page 
var wellcomeUser = document.querySelector(".wellcome-user");
var deleteBtn = document.querySelector(".delete-btn");


//Login Page
var emailLogin = document.querySelector(".login .login-email");
var passwordLogin = document.querySelector(".login .login-password");
var Login_btn = document.querySelector(".login .login-btn");

let userNameHome;
var usersList= JSON.parse(localStorage.getItem("users")) ?? [];


eRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
uRegex=/^[a-zA-Z0-9._]{3,20}$/;
pRegex=/^.{8,}$/;

if (userName && E_mail && password && SignUp_btn) {
  // sign up page

  SignUp_btn.addEventListener("click", function () {
    var user = {
      name: userName.value,
      email: E_mail.value,
      password: password.value,
    };
    if (userName.value == "" || E_mail.value == "" || password.value == "") {
      Swal.fire({
        text: "All the fields are required to sign up",
        icon: "info",
      });
      return;
    } else if (
      !eRegex.test(E_mail.value) ||
      !uRegex.test(userName.value) ||
      !pRegex.test(password.value)
    ) {
      Swal.fire({
        text: "Invalid Email or UserName or Password",
        icon: "error",
        color: "white",
      });
      return;
    } else {
      var flag = false;
      for (var i = 0; i < usersList.length; i++) {
        if (usersList[i].email == E_mail.value) {
          flag = true;
          swal.fire({
            text: "Email already exists try to login",
            icon: "error",
            color: "white",
          });
          break;
        }
      }
    }

    if (!flag) {
      usersList.push(user);
      localStorage.setItem("users", JSON.stringify(usersList));
      console.log(usersList);
       
      localStorage.setItem("userwellcome", JSON.stringify(userName.value));
      localStorage.setItem("email", JSON.stringify(E_mail.value));
      console.log(userNameHome);

      Swal.fire({
        text: "Sign Up Successful",
        icon: "success",
        color: "white",
      }).then(() => {
        window.location.href = "./home.html";
      });
      clearInputs();
    //   SignUp_btn.setAttribute("href", "./home.html");
    }
  });

  userName.addEventListener("input", function () {
    test(/^[a-zA-Z0-9._]{3,20}$/, userName);
  });
  E_mail.addEventListener("input", function () {
    test(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, E_mail);
  });
  password.addEventListener("input", function () {
    test(/^.{8,}$/, password);
  });

  function test(regex, input) {
    if (regex.test(input.value)) {
      input.classList.add("is-valid");
      input.classList.remove("is-invalid");
      return true;
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      return false;
    }
  }
  function clearInputs() {
    userName.value = "";
    E_mail.value = "";
    password.value = "";
    userName.classList.remove("is-valid");
    E_mail.classList.remove("is-valid");
    password.classList.remove("is-valid");
  }
}
{

    if (wellcomeUser && deleteBtn) {
      wellcomeUser.textContent = `Welcome Mr ${JSON.parse(localStorage.getItem("userwellcome"))}`;
    

    deleteBtn.addEventListener("click", function () {
      Swal.fire({
        title: "Do you want to delete your account?",
        icon: "question",
        iconHtml: "؟",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCancelButton: true,
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          for (var i = 0; i < usersList.length; i++) {
            if (usersList[i].email == JSON.parse(localStorage.getItem("email"))) {
              usersList.splice(i, 1);


              localStorage.setItem("users", JSON.stringify(usersList));
              localStorage.removeItem("userwellcome");
              localStorage.removeItem("email");

              
              Swal.fire({
                text: "Account deleted successfully",
                icon: "success",
                color: "white",
              }).then(() => {
                window.location.href = "../index.html";
              });
            }
          }
        }
      });
    });

    }
}

{
    if(emailLogin && passwordLogin && Login_btn){

        Login_btn.addEventListener("click", function () {
            for (var i = 0; i<usersList.length; i++){
                if(usersList[i].email == emailLogin.value && usersList[i].password == passwordLogin.value){
                    localStorage.setItem("userwellcome", JSON.stringify(usersList[i].name));
                    localStorage.setItem("email", JSON.stringify(usersList[i].email));
                    window.location.href = "./view/home.html";
                }else if(emailLogin.value == "" || passwordLogin.value == ""){
                    Swal.fire({
                      text: "All the fields are required to login",
                      icon: "info",
                      color:"white",
                    });
                }
                else{
                    Swal.fire({
                      text: "Invalid Email or Password",
                      icon: "error",
                      color:"white",
                    });
                }
            }
        })
    }

    
}





