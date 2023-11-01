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
  import { 
    getFirestore ,
    doc, 
    setDoc,
    updateDoc,
    getDoc,
    getDocFromCache ,
    getDocs
  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
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

let app;
class App{
  constructor(){
    //<-----------AUTH START--------------->

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

    this.userId = "";

    this.db = getFirestore(this.app);
    //<-----------AUTH END--------------->

    this.createPost = document.querySelector('.create-post');
    this.modal = document.querySelector('.background-image-modal');
    this.closeModal = document.querySelector('.close-modal');
    this.share = document.querySelector('.share');
    this.caption = document.querySelector('.caption-post');

    this.fileInput = document.getElementById('fileInput');
    this.selectImageButton = document.getElementById('selectImageButton');
    this.editDeleteModal = document.getElementById('update-delate');
    this.closeModalUp = document.querySelector('.close-modal-up');



    this.$posts = document.querySelector('.posts');
     
    this.deletePost = document.querySelector('#delete');
    this.editPost = document.querySelector('#edit');
    this.modalEdit = document.querySelector('.background-image-modal-edit');
    this.edit = document.querySelector('.edit');
    this.captionEdit = document.querySelector('.caption-post-eidt');
    this.closeModalEdit = document.querySelector('.close-modal-edit');

    this.id = '';

    this.posts = JSON.parse(localStorage.getItem('posts')) || [];
    this.addEventListeners();
    //  this.updatePost()
    this.readPostFirestore();
  }

  addEventListeners(){
   // <--------AUTH START ------------>
 
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

   // <-------AUTH END----------------->
  
    this.createPost.addEventListener('click',()=>{
      this.caption.value = '';
      this.modal.style.display = 'inline'
    });

    this.closeModal.addEventListener('click',()=>{
      this.modal.style.display = 'none'
    });

    this.share.addEventListener('click',()=>{
      this.modal.style.display = 'none';
      this.createPosts()
    });

    this.selectImageButton.addEventListener('click', () => {
      fileInput.click();
    });

    this.fileInput.addEventListener('change', (event) => {
      const selectedFile = event.target.files[0];
        
      if (selectedFile) {
        const imageUrl = URL.createObjectURL(selectedFile);
        // console.log(imageUrl)
        this.imgId = imageUrl;
        // this.selectedImage.src = imageUrl;
        // selectedImage.style.display = 'block';
      } else {
        // selectedImage.src = '';
        // selectedImage.style.display = 'none';
      }
    });

    document.body.addEventListener('click', (event) => {
      this.openModalEdit(event);
      this.editPosts(event);
      // this.updatePost(event)
    });

  }
  
  openModalEdit(event){

   const options = event.target.closest('.options');
   const cancel = this.closeModalUp.contains(event.target)
   const deletePost = this.deletePost.contains(event.target)

   

   if(options){
    this.editDeleteModal.style.display = 'inline';
    const id = options.id
    this.id = id;
    // this.updatePost();
   }


   if(cancel){
    this.editDeleteModal.style.display = 'none';
   }

   if(deletePost){
    this.deletePosts();
    this.editDeleteModal.style.display = 'none';
   }
   
  }

  editPosts(event){
    
    const editPost = this.edit.contains(event.target);
    const close = this.closeModalEdit.contains(event.target);
     
    const edit = this.editPost.contains(event.target);
    const text = document.querySelector('.caption-text');

    if(edit){
      // this.updatePost();
      this.modalEdit.style.display='inline';
      this.editDeleteModal.style.display = 'none';
      // this.captionEdit.value = text.innerText;

      const input = this.posts.map(item=>{
        if(item.id === this.id){
          // this.captionEdit.innerText = item.caption;
          this.captionEdit.value = item.caption;
          // item.caption = this.captionEdit.value;
          // this.captionEdit.value = '';

          console.log(item.caption, this.id)
        }
      
      })
    }

    // blue
    if(editPost){
      this.updatePost();
      this.modalEdit.style.display='none';

    }

    if(close){
      this.modalEdit.style.display='none';
    }
  }

  // <-----------AUTH ONSTATE------------>

  userAuth(){
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;

        this.userId = uid
        // ...
        this.body.style.display = 'inline';
        this.form.style.display = 'none';
        // console.log('nice')
        console.log(this.userId)
      } else {
        // User is signed out
        // ...
        // console.log('bad')
        this.body.style.display = 'none';
        this.form.style.display = 'inline';
      }
    });

  }
  // <-----------AUTH ONSTATE------------>

  createPosts(){
    const details = {
      id: cuid(),
      caption:this.caption.value ,
      img: this.imgId, 
    }

    this.posts.push(details); // this.posts = [...this.posts, details]

    // Add a new document in collection "cities"
    setDoc(doc(this.db, "users", this.userId), {
      posts: this.posts,
    });

    // localStorage.setItem('posts', JSON.stringify(this.posts));
    // this.$posts.innerHTML = '';
    // // this.readPost();
  }

  readPost(){
    this.$posts.innerHTML += this.posts.map((item) =>`
    <div class="post" id=${item.id}>
    <div class="header">
          <div class="profile-area">
            <div class="post-pic">
              <img
                alt="jayshetty's profile picture"
                class="_6q-tv"
                data-testid="user-avatar"
                draggable="false"
                src="44884218_345707102882519_2446069589734326272_n.jpg"
              />
            </div>
            <span class="profile-name">golah_777</span>
          </div>
          <div class="options" id=${item.id}>
            <div
              class="Igw0E rBNOH YBx95 _4EzTm"
              style="height: 24px; width: 24px"
            >
              <svg
                aria-label="More options"
                class="_8-yf5"
                fill="#262626"
                height="16"
                viewBox="0 0 48 48"
                width="16"
              >
                <circle
                  clip-rule="evenodd"
                  cx="8"
                  cy="24"
                  fill-rule="evenodd"
                  r="4.5"
                ></circle>
                <circle
                  clip-rule="evenodd"
                  cx="24"
                  cy="24"
                  fill-rule="evenodd"
                  r="4.5"
                ></circle>
                <circle
                  clip-rule="evenodd"
                  cx="40"
                  cy="24"
                  fill-rule="evenodd"
                  r="4.5"
                ></circle>
              </svg>
            </div>
          </div>
        </div>
        <div class="body">
          <img
            alt="Photo by Jay Shetty on September 12, 2020. Image may contain: 2 people."
            class="FFVAD"
            decoding="auto"
            sizes="614px"
            src="${item.img}"
            style="object-fit: cover"
          />
        </div>
        <div class="footer">
          <div class="user-actions">
            <div class="like-comment-share">
              <div>
                <span class=""
                  ><svg
                    aria-label="Like"
                    class="_8-yf5"
                    fill="#262626"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path
                      d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
                    ></path></svg
                ></span>
              </div>
              <div class="margin-left-small">
                <svg
                  aria-label="Comment"
                  class="_8-yf5"
                  fill="#262626"
                  height="24"
                  viewBox="0 0 48 48"
                  width="24"
                >
                  <path
                    clip-rule="evenodd"
                    d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div class="margin-left-small">
                <svg
                  aria-label="Share Post"
                  class="_8-yf5"
                  fill="#262626"
                  height="24"
                  viewBox="0 0 48 48"
                  width="24"
                >
                  <path
                    d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="bookmark">
              <div class="QBdPU rrUvL">
                <svg
                  aria-label="Save"
                  class="_8-yf5"
                  fill="#262626"
                  height="24"
                  viewBox="0 0 48 48"
                  width="24"
                >
                  <path
                    d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <span class="likes"
            >Liked by <b>ishitaaaa.b</b> and <b>others</b></span
          >
          <span class="caption">
            <span class="caption-username"><b>jayshetty</b></span>
            <span class="caption-text">${item.caption}</span>
          </span>
          <span class="posted-time">1s AGO</span>
        </div>
        <div class="add-comment">
          <input type="text" placeholder="Add a comment..." />
          <a class="post-btn">Post</a>
        </div>
     </div>
    `
    ).join(' ')
    
  }

  readPostFirestore(){
    const querySnapshot= getDocs(collection(this.db, "users"));
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    })
  }


  updatePost(){
    // this.captionEdit.value = this.$posts.querySelector('.caption-text').innerText;

    const data = this.posts.map(item =>{
      if(item.id === this.id){
        // this.captionEdit.innerText = item.caption;
        // this.captionEdit.value = item.caption;
        item.caption = this.captionEdit.value;
        // this.captionEdit.value = '';
      }
     }
    
    )

    updateDoc(doc(this.db, "users", this.userId), {
      posts: this.posts,
    });

    // setDoc(doc(this.db, "users", this.userId), {
    //   posts: this.posts,
    // });
     
    // localStorage.setItem('posts', JSON.stringify(this.posts));
    // this.$posts.innerHTML = '';
    // this.readPost();

  }

  deletePosts(){
    this.posts = this.posts.filter(item => item.id != this.id)

    updateDoc(doc(this.db, "users", this.userId), {
      posts: this.posts,
    });

    // localStorage.setItem('posts', JSON.stringify(this.posts));
    // this.$posts.innerHTML = '';
    // this.readPost();
  }

}

app = new App();