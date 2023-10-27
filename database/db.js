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
const app = initializeApp(firebaseConfig);

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

  // // CREATE => Posts a single item to the database.
  // async postItem(item) {
  //     await this.db.collection("items").add(item);
  // }
  //
  // // CREATE -> Given an array of items, posts multiple items to the database.
  // async postBulkItems(arr) {
  //     for (let i = 0; i < arr.length; i++) {
  //         await this.postItem(arr[i]);
  //     }
  // }
  //
  //

  //
  // // READ -> Retrieve all of a user's items sorted by category.
  // async getItemCategories(userID, category) {
  //     const snapshot = await this.db
  //         .collection("items")
  //         .where("userID", "==", userID)
  //         .orderBy("category")
  //         .get();
  //     if (snapshot.empty) {
  //         return { error: "404", message: "Not Found" };
  //     }
  //
  //     const results = [];
  //     snapshot.forEach((doc) => {
  //         results.push(doc.data());
  //     });
  //     return results;
  // }
  //
  // // HELPER => Converts LighterPack CSV data into an array of formatted JSON objects.
  // async convertCSV(user = 1, path = "./sampleCSVData.csv") {
  //     const data = await csv().fromFile(path);
  //     const result = [];
  //     for (let i = 0; i < data.length; i++) {
  //         const item = {
  //             product: data[i]["Item Name"],
  //             brand: null,
  //             category: data[i]["Category"],
  //             weight: parseFloat(data[i]["weight"]),
  //             weightUnit: data[i]["unit"],
  //             price:
  //                 parseFloat(data[i]["price"]) === 0
  //                     ? null
  //                     : parseFloat(data[i]["price"]),
  //             priceUnit: "$",
  //             link: data[i]["url"].length > 0 ? data[i]["url"] : null,
  //             description: data[i]["desc"] === "" ? null : data[i]["desc"],
  //             consumable: data[i]["consumable"] === "Consumable",
  //             worn: data[i]["worn"] === "Worn",
  //             userID: user,
  //             itemID: i + 1,
  //         };
  //
  //         // Convert weight units to shorthand.
  //         if (item["weightUnit"] === "ounce") {
  //             item["weightUnit"] = "oz";
  //         } else if (item["weightUnit"] === "pound") {
  //             item["weightUnit"] = "lbs";
  //         } else if (item["weightUnit"] === "gram") {
  //             item["weightUnit"] = "g";
  //         }
  //         result.push(item);
  //     }
  //     return result;
  // }
}
export default Database;
