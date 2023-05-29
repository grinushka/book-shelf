import deleteBtn from '../img/delete.svg';

const BookItem = ({ book, handleDelete }) => {

  return (
    <div
      className='book'
      id={book.id}>
      <div className='content'>
        <h3 className='title'>{book.title}</h3>
        <h4 className='author'>
          {book.author},{' '}
          {book.publicationYear && (
            <span className='year'>{book.publicationYear}</span>
          )}
        </h4>
        {book.rating ? (
          <p className='rating'>Оценка: {book.rating}</p>
        ) : (
          <p className='rating'>Оценка: 0</p>
        )}

        {book.isbn && <p className='isbn'>ISBN: {book.isbn}</p>}
      </div>

      <div className='buttons' onClick={() => {
        handleDelete(book.id)
        }}>
        <div className='delete'>
          <img
            src={deleteBtn}
            alt='Delete the book'
          />
        </div>
      </div>
    </div>
  );
};

export default BookItem;
