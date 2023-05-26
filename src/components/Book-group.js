import { v4 as uuid } from 'uuid';
import BookItem from "./Book-item";

const BookGroup = ({year, books}) => {
  return ( 
    <div className="book-group">
      {year === 'undefined' && <h3>Others</h3>}
      {year > 1800 && <h3>{year}</h3>}
      {books.length > 0 && books.map((book) => {
        return <BookItem key={uuid()} book={book}/>
      })}
    </div>
   )
}
 
export default BookGroup;