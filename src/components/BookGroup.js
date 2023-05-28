import { v4 as uuid } from 'uuid';
import BookItem from './BookItem';

import '../style/components/bookGroup.scss';

const BookGroup = ({ year, books }) => {
  return (
    <div>
      {year === 'undefined' ? <h3 className='group-heading'>Others</h3> : <h3 className='group-heading'>{year}</h3>}

      <div className='book-group'>
        {books.length > 0 &&
          books.map((book) => {
            return (
              <BookItem
                key={uuid()}
                book={book}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BookGroup;
