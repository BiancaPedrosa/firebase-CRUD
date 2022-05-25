
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

const firebaseConfig = {
     apiKey: "AIzaSyAlU6KeGTqHmL1nLNUjzcxiwX28REFU7hw",
     authDomain: "firestorebd-6549c.firebaseapp.com",
     projectId: "firestorebd-6549c",
     storageBucket: "firestorebd-6549c.appspot.com",
     messagingSenderId: "198650234740",
     appId: "1:198650234740:web:3485be21511720ed0ece21"
   };

const app= initializeApp(firebaseConfig);
const db=getFirestore();

/* -------- References ---------- */
let varId=document.getElementById("formId");
let varTitulo=document.getElementById("formTitulo");
let varArtista=document.getElementById("formArtista");
let gravar=document.getElementById("btGravar");
let ler=document.getElementById("btLer");
let atualizar=document.getElementById("btEdit");
let excluir=document.getElementById("btExcluir");

/*----- botoes e funcoes -----*/
gravar.addEventListener('click',inserirDados);
ler.addEventListener('click',lerDados);
atualizar.addEventListener('click',atualizarDados);
excluir.addEventListener('click',excluirDados);

/*-------- funções -----------*/
async function inserirDados(){
     var ref= doc(db,'Musicas',varId.value);
     const docRef = await setDoc(
          ref,{
          titulo:varTitulo.value,
          artista: varArtista.value
     }).then(()=>{
          console.log("incluído com sucesso");
     })
     .catch((error)=>{
          console.log("erro de inclusão");
     })
}

async function lerDados(){
     var ref= doc(db,'Musicas',varId.value);
     const docSnap = await getDoc(ref);
     if(docSnap.exists()){
          varTitulo.value = docSnap.data().titulo;
          varArtista.value= docSnap.data().artista;
     }
     else alert("nao existe dado");
}

async function atualizarDados(){
     var ref= doc(db,'Musicas',varId.value);
     await updateDoc(ref,{
          titulo:varTitulo.value,
          artista: varArtista.value

     }).then(()=>{
          console.log("atualizado com sucesso");
     })
     .catch((error)=>{
          console.log("erro de atualizacao");
     })
}
async function excluirDados(){
     var ref= doc(db,'Musicas',varId.value);
     const docSnap = await getDoc(ref);
     if(!docSnap.exists()){
          alert("nao existe");
          return;
     }
     await deleteDoc(ref)
     .then(()=>{
           console.log("excluído com sucesso");
      })
      .catch((error)=>{
           console.log("erro de exclusão");
      })
 }
