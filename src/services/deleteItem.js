import { doc, deleteDoc } from "firebase/firestore";
import { getDb } from "./database";

export const deleteItem = function(id) {
  const docRef = doc(getDb(), 'book-buddy', id);
  return deleteDoc(docRef);
}