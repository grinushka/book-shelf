import BookItem from "./Book-item";

const BookGroup = ({year, books}) => {
  return ( 
    <div className="book-group">
      {year === 'undefined' && <h3>Others</h3>}
      {year > 1800 && <h3>{year}</h3>}
      {books.length > 0 && books.map((book) => {
        return <BookItem book={book}/>
      })}
    </div>
   )
}
 
export default BookGroup;