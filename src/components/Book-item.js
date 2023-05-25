const BookItem = ({book}) => {
  return ( 
      <div key={book.id} className="book">
        <p>{book.title}</p>
        <p>{book.author}</p>
        {book.rating && <p>{book.rating}</p>}
        {book.publicationYear && <p>{book.publicationYear}</p>}
      </div>
   );
}
 
export default BookItem;