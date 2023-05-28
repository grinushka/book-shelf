import '../style/components/bookItem.scss';
import deleteBtn from '../img/delete.svg';

const BookItem = ({ book }) => {

  return (
    <div className='book'>
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
      </div>

      <div className='buttons'>
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
