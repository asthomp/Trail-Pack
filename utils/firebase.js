// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3FxNN1giqGjiqe8SfasrzFDeJNz1YyXg",
  authDomain: "trail-pack-400523.firebaseapp.com",
  projectId: "trail-pack-400523",
  storageBucket: "trail-pack-400523.appspot.com",
  messagingSenderId: "66386871855",
  appId: "1:66386871855:web:c011b4237ff253e4e468da",
  measurementId: "G-QC6ZCQ5D5Y",
};

// Initialize Firebase

class Firebase {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.database = new Database();
  }
}

export default Firebase;

class Database {
  constructor() {
    this.db = getFirestore();
  }

  // READ -> Retrieve all of a user's items.
  async getItems(userID) {
    const q = query(
      collection(this.db, "items"),
      where("userID", "==", userID),
    );

    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push(doc.data());
    });
    return results;
  }
}
