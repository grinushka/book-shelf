import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

let db = false;

export const getDb = () => {
    if(!db){
        const firebaseConfig = {
          apiKey: "AIzaSyB_I2Uad3WqPd4c_23ztZX7K8hHEl7pf4k",
          authDomain: "book-buddy-oid678.firebaseapp.com",
          projectId: "book-buddy-oid678",
          storageBucket: "book-buddy-oid678.appspot.com",
          messagingSenderId: "794016851904",
          appId: "1:794016851904:web:f5980356705b5b10904a25"
        }

        const app = initializeApp(firebaseConfig)

        db = getFirestore(app)
    }

    return db
}