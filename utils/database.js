import {
  getFirestore,
  updateDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";

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
      results.push({ ...doc.data(), ...{ itemID: doc.id } });
    });
    return results;
  }

  // CREATE -> Post an item to the database.
  async postItem(item) {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(this.db, "items"), item);
    // Update the timestamp field with the value from the server
    await updateDoc(docRef, {
      timestamp: serverTimestamp(),
    });
    return docRef;
  }
}
export default Database;
