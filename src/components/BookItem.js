import '../style/components/bookItem.scss';
import deleteBtn from '../img/delete.svg';

const BookItem = ({ book, handleDelete }) => {

  return (
    <div
      className='book'
      id={book.id}>
      <div className='content'>
        <h4 className='title'>{book.title}</h4>
        <h5 className='author'>
          {book.author},{' '}
          {book.publicationYear && (
            <span className='year'>{book.publicationYear}</span>
          )}
        </h5>
        {book.rating ? (
          <p className='rating'>Оценка: {book.rating}</p>
        ) : (
          <p className='rating'>0</p>
        )}

        {book.isbn && <p className='isbn'>ISBN: {book.isbn}</p>}
      </div>

      <div className='buttons' onClick={() => {
        console.log(book.id);
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
