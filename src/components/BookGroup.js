import BookItem from './BookItem';

const BookGroup = ({ year, books, handleDelete }) => {
  return (
    <div>
      {year === 'undefined' ? <h3 className='group-heading'>Others</h3> : <h3 className='group-heading'>{year}</h3>}

      <div className='book-group'>
        {books.length > 0 &&
          books.map((book) => {
            return (
              <BookItem
                key={book.id}
                book={book}
                handleDelete={handleDelete}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BookGroup;
