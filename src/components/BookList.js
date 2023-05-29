import { useState, useEffect } from 'react';

import { getData } from '../services/getData';
import { groupBy } from '../utils/groupBy';
import { sortByObjProp } from '../utils/sortObjByProperty';
import { recommendBook } from '../utils/recommendBook';
import { deleteItem } from '../services/deleteDocument';
import { v4 as uuid } from 'uuid';

import BookGroup from './BookGroup';
import Recommendation from './Recommendation';

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

  // Function to delete the book
  const handleDelete = (id) => {

    // Delete the book from current state
    const newBooks = bookData.filter(book => book.id !== id);
    setBookData(newBooks);

    // Delete the book from Firebase
    deleteItem(id);
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <section className='all-books'>
      {loading && <p>Загрузка...</p>}

      {bookData.length > 0 && (
        <div className='book-list'>

          {/* If the recommendBook function returns something truthy, then we display the recommendation */}
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
