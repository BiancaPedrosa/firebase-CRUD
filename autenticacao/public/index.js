// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";

const firebaseConfig = {
     apiKey: "AIzaSyAjG5JSwV68eaUJz4kiaucOGBC_G51wuFw",
     authDomain: "novautentica.firebaseapp.com",
     projectId: "novautentica",
     storageBucket: "novautentica.appspot.com",
     messagingSenderId: "761162266435",
     appId: "1:761162266435:web:81f3fad69b4352d2caa1f6",
     measurementId: "G-LZ8M9NT2H5"
   };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
////////////////////////////////////////////////////////////
// Buttons
var authEmailPassButton = document.getElementById('authEmailPassButton');
var authGoogleButton = document.getElementById('authGoogleButton');
//var authAnonymouslyButton = document.getElementById('authAnonymouslyButton');
var createUserButton = document.getElementById('createUserButton');
var logOutButton = document.getElementById('logOutButton');

// Inputs
var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');

// Displays
var displayName = document.getElementById('displayName');

// Criar novo usuário
createUserButton.addEventListener('click', function () {
    firebase
        .auth()
        .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function () {
            alert('Bem vindo ' + emailInput.value);
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao cadastrar, verifique o erro no console.')
        });
});

// Autenticar com E-mail e Senha
authEmailPassButton.addEventListener('click', function () {
    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function (result) {
            console.log(result);
            displayName.innerText = 'Bem vindo, ' + emailInput.value;
            alert('Autenticado ' + emailInput.value);
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert(error.message);
        });
});

// Logout
logOutButton.addEventListener('click', function () {
    firebase
        .auth()
        .signOut()
        .then(function () {
            displayName.innerText = 'Você não está autenticado';
            alert('Você se deslogou');
        }, function (error) {
            console.error(error);
        });
});

// Autenticar com Google
authGoogleButton.addEventListener('click', function () {
    // Providers
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
     .auth()
     .signInWithPopup(provider)
     .then(function (result) {
            console.log(result);
            var token = result.credential.accessToken;
            displayName.innerText = 'Bem vindo, ' + result.user.displayName;
        }).catch(function (error) {
            console.log(error);
            alert('Falha na autenticação');
        });
});