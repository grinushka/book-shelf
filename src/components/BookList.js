import { useState, useEffect } from 'react';
import { getData } from '../services/getData';
import { groupBy } from '../utils/groupBy';
import { sortByObjProp } from '../utils/sortObjByProperty';
import { recommendBook } from '../utils/recommendBook';
import { v4 as uuid } from 'uuid';

import BookGroup from './BookGroup';
import BookItem from './BookItem';

import '../style/components/bookList.scss';

import Recommendation from './Recommendation';

const BookList = () => {
  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [recommendation, setRecomendation] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const response = await getData();

    // Get a recommendation
    const recommendation = recommendBook([...response]);
    setRecomendation(recommendation);

    // Group books by some criteria, def: publicationYear
    const groupedBooks = groupBy([...response], 'publicationYear');
    sortByObjProp(groupedBooks, 'title');

    // Create an array from the object, then reverse it to get the descending order
    const groupedBooksArr = Object.entries(groupedBooks).reverse();

    // Move books with year unspecified (aka 'undefined') to the end
    groupedBooksArr.push(groupedBooksArr.shift());

    setBookData(groupedBooksArr);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className='all-books'>
      {loading && <p>Loading...</p>}

      {bookData.length > 0 && (
        <div className='book-list'>

          <Recommendation book={recommendation}/>

          {/* {<div className='recommendation'>
            <h3>Today's recommendation</h3>
            <BookItem
            book={recommendation}
            className='recommended-book'
          />
          </div>}
           */}

          {bookData.map((item) => {
            return (
              <BookGroup
                key={uuid()}
                year={item[0]}
                books={item[1]}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default BookList;
