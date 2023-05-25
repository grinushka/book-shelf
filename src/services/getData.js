import { getDocs, collection } from "firebase/firestore"; 
import { getDb } from "./database.js"

const collection_name = "book-buddy";

export const getData = async () => {
    const doc_refs = await getDocs(collection(getDb(), collection_name))

    const response = []

    doc_refs.forEach(book => {
        response.push({
            id: book.id, 
            ...book.data()
        })
    })

    return response
}