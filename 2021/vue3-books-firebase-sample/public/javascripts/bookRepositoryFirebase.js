// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0IBw2yZuREv0G7aj_G76414P3k2lhHz0",
    authDomain: "owp-8-demo.firebaseapp.com",
    projectId: "owp-8-demo",
    storageBucket: "owp-8-demo.appspot.com",
    messagingSenderId: "414762790161",
    appId: "1:414762790161:web:5fdd7bac62b801b13170b0"
};

const BookRepository = {

    async connect() {
        firebase.initializeApp(firebaseConfig);

        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        this.db = firebase.firestore();

        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(user => init(user));
        
            async function init(user) {
                if (user) {
                    // User is signed in.
                    resolve();
                } else {
                    // No user is signed in.
                    firebase.auth()
                        .signInWithPopup(provider)
                        .then((result) => {
                            /** @type {firebase.auth.OAuthCredential} */
                            const credential = result.credential;
            
                            // This gives you a Google Access Token. You can use it to access the Google API.
                            const token = credential.accessToken;
                            // The signed-in user info.
                            const user = result.user;
                            // ...
                            resolve();
                        }).catch((error) => {
                            // Handle Errors here.
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            // The email of the user's account used.
                            const email = error.email;
                            // The firebase.auth.AuthCredential type that was used.
                            const credential = error.credential;
                            // ...
                            reject(error);
                        });
                }
            }
        });
    },

    async getAll() {
        const snapshot = await this.db.collection('books').get();
        return snapshot.docs.map(doc => Object.assign({ id: doc.id }, doc.data()));
    },  // list (book)

    async insert(book) {
        const bookRef = await this.db.collection("books").add(book);
        const bookDoc = await bookRef.get();
        return Object.assign({ id: bookDoc.id }, bookDoc.data());
    },  // object (book)

    async delete(bookId) {
        await this.db.collection("books").doc(bookId).delete();
    },  // void
};