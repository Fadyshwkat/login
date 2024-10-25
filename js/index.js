var signUpNameInput = document.querySelector("#signUpName");
var signUpEmailInput = document.querySelector("#signUpEmail");
var signUpPasswordInput = document.querySelector("#signUpPassword");
var signUpBtn = document.querySelector("#signUpBtn");
var errorMsg =document.querySelector("#errorMsg");
var signInEmailInput =document.querySelector("#signInEmail");
var signInPasswordInput =document.querySelector("#signInPassword");
var homeContainer = document.getElementById("homeContainer");
var users;
localStorage.getItem("users")?(users=JSON.parse(localStorage.getItem("users"))):users=[];
var nameRegex = /^[a-zA-Z].{2,99}$/i;
var emailRegex = /^\S+@\S+\.\S+$/
var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function validateform(regex,element) {

    if (!regex.test(element.value)) {
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        return false
    }
    else {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        return true  
    }

}
function checkNameExists(){
    let userExists = false;  // Initialize a flag to track if the username exists

    for (var i = 0; i < users.length; i++) {
        if (users[i].userName.localeCompare(signUpNameInput.value) == 0) {
            userExists = true;  // Set the flag to true if a match is found
            break;  // Exit the loop since the username already exists
        }
    }
    
    // Now, handle the result outside of the loop
    if (userExists) {
        errorMsg.classList.replace("d-none","d-block")
        errorMsg.innerText = "Name is already exists"
        return false;
    } else {
        return true;
    }
}
function checkEmailExists(){
    let userExists = false;  // Initialize a flag to track if the userEmail exists

    for (var i = 0; i < users.length; i++) {
        if (users[i].userEmail.localeCompare(signUpEmailInput.value) == 0) {
            userExists = true;  // Set the flag to true if a match is found
            break;  // Exit the loop since the userEmail already exists
        }
    }
    
    // Now, handle the result outside of the loop
    if (userExists) {
        errorMsg.classList.replace("d-none","d-block")
        errorMsg.innerText = "Email is already exists"
        return false;
    } else {
        return true;
    }
}
function validData(){
    if(validateform(nameRegex,signUpNameInput) & validateform(emailRegex,signUpEmailInput) &
    validateform(passwordRegex,signUpPasswordInput) & checkNameExists() & checkEmailExists()){
        return true
    }
    else {
        return false
    }
}

function signUp(){

   if (signUpNameInput.value!="" & signUpEmailInput.value!="" & signUpPasswordInput.value !=""){
    if (validData() ){
        var user = {
            userName:signUpNameInput.value,
            userEmail:signUpEmailInput.value,
            userPassword:signUpPasswordInput.value
        }
        users.push(user);
        localStorage.setItem("users",JSON.stringify(users))
        resetSignUpInputs()
        console.log(users)
       }
   }
   else{
        errorMsg.classList.replace("d-none","d-block")
        errorMsg.innerText = "All Fields Must be filled"
   }
    
    
   
}


function resetSignUpInputs(){
    signUpNameInput.value="";
    signUpEmailInput.value="";
    signUpPasswordInput.value="";
    signUpNameInput.classList.remove("is-valid", "is-invalid")
    signUpEmailInput.classList.remove("is-valid", "is-invalid")
    signUpPasswordInput.classList.remove("is-valid", "is-invalid")
    errorMsg.classList.replace("d-block","d-none")

}
function resetSignInInputs(){
    signInEmailInput.value="";
    signInPasswordInput.value="";
    errorMsg.classList.replace("d-block","d-none")
}
function signIn() {
    let userFound = false; 

    for (var i = 0; i < users.length; i++) {
        if (
            users[i].userEmail.localeCompare(signInEmailInput.value) === 0 &&
            users[i].userPassword.localeCompare(signInPasswordInput.value) === 0
        ) {
            userFound = true;
            localStorage.setItem("userName", users[i].userName);
            window.location.href = "home.html";
            break;
        }
    }
    if (!userFound) {
        errorMsg.classList.replace("d-none", "d-block");
        errorMsg.innerText = "Incorrect email or password";
    }
}

var userName = localStorage.getItem("userName");
if (userName) {
    homeContainer.innerHTML = `<h1>Welcome ${userName}</h1>`;
}

function logOut() {
    localStorage.removeItem('userName');

    window.location.href = "index.html";
}