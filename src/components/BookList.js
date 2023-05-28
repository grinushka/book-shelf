import { useState, useEffect } from 'react';
import { getData } from '../services/getData';
import { groupBy } from '../utils/groupBy';
import { sortByObjProp } from '../utils/sortObjByProperty';
import { recommendBook } from '../utils/recommendBook';
import { v4 as uuid } from 'uuid';

import BookGroup from './BookGroup';

import '../style/components/bookList.scss';

import Recommendation from './Recommendation';
import { deleteItem } from '../services/deleteItem';

const BookList = () => {
  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const response = await getData();
    setBookData([...response]);
    setLoading(false);
  };

  const groupAndSort = (data) => {
    // Group books by some criteria, def: publicationYear
    const groupedBooks = groupBy(data, 'publicationYear');

    sortByObjProp(groupedBooks, 'title');

    // Create an array from the object, then reverse it to get the descending order
    const booksArr = Object.entries(groupedBooks).reverse();

    // Move books with year unspecified (aka 'undefined') to the end
    if (booksArr[0][0] === 'undefined') {
    booksArr.push(booksArr.shift());
    };

    return booksArr
  };

  const handleDelete = (id) => {
    console.log('clicked in the LIST!');
    const newBooks = bookData.filter(book => book.id !== id);
    setBookData(newBooks);
    deleteItem(id);
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <section className='all-books'>
      {loading && <p>Loading...</p>}

      {bookData.length > 0 && (
        <div className='book-list'>

          {recommendBook(bookData) && <Recommendation book={recommendBook(bookData)}/>}

          {groupAndSort(bookData).map((item) => {
            return (
              <BookGroup
                key={uuid()}
                year={item[0]}
                books={item[1]}
                handleDelete={handleDelete}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default BookList;