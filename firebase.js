  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getAuth,
   onAuthStateChanged,
   createUserWithEmailAndPassword,
   signOut,
   signInWithEmailAndPassword,
   signInWithPopup, 
   GoogleAuthProvider
  
  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAxN1qjNisUOE-3ckuRNsW6Ng9e4oGoK4Q",
    authDomain: "instagram-93881.firebaseapp.com",
    projectId: "instagram-93881",
    storageBucket: "instagram-93881.appspot.com",
    messagingSenderId: "951481592496",
    appId: "1:951481592496:web:75b1232e630c6067fce975"
  };


class AppTwo{
  constructor(){
    this.form = document.querySelector('.form');
    this.body = document.querySelector('.main-container');

    this.email = document.querySelector('.email');
    this.password = document.querySelector('.password');
    this.logIn = document.querySelector('.log-in');
    this.signUp = document.querySelector('.sign-up');
    // this.googleIn = document.querySelector('.google-sigin');
    this.errorMessage = document.querySelector('.error-message');
    this.logOut = document.querySelector('.log-out');
    this.logOutTwo = document.querySelector('.log-out-two');


    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth();
    // this.provider = new GoogleAuthProvider();
    this.userAuth();

    this.addEvents();
  }

  addEvents(){
    this.logIn.addEventListener('click',()=>{
      const email = this.email.value;
      const password = this.password.value;

      signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.errorMessage.style.display = 'inline';
        this.errorMessage.innerHTML = 'YOUR EMAIL OR PASSWORD IS INCORRECT';
        this.errorMessage.style.marginLeft ='39px';
      });
    });

    this.signUp.addEventListener('click',()=>{
    //  this.createUser();

     const email = this.email.value;
     const password = this.password.value;

     createUserWithEmailAndPassword(this.auth, email, password)
     .then((userCredential) => {
       // Signed up 
       const user = userCredential.user;
       // ...
       this.errorMessage.style.display = 'inline';
     })
     .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       // ..
       this.errorMessage.style.display = 'inline';
     });
    })

    this.logOut.addEventListener('click',()=>{
      signOut(this.auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    })

    this.logOutTwo.addEventListener('click',()=>{
      signOut(this.auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    })

    // this.googleIn.addEventListener('click',()=>{
    //   signInWithPopup(this.auth, this.provider)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     // The signed-in user info.
    //     const user = result.user;
    //     // IdP data available using getAdditionalUserInfo(result)
    //     // ...
    //   }).catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //   });
    // })
  }

  userAuth(){
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
        this.body.style.display = 'inline';
        this.form.style.display = 'none';
        console.log('nice')
        console.log(user.email)
      } else {
        // User is signed out
        // ...
        console.log('bad')
        this.body.style.display = 'none';
        this.form.style.display = 'inline';
      }
    });

  }

}

const app = new AppTwo()