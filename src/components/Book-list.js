import { useState, useEffect } from 'react';
import { getData } from '../services/getData';
import { groupBy } from '../utils/groupBy';
import { sortBy } from '../utils/sortObjByProperty';
import { recommendBook } from '../utils/recommendBook';
import { v4 as uuid } from 'uuid';

import BookGroup from './Book-group';
import BookItem from './Book-item';

const BookList = () => {
  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [recommendation, setRecomendation] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const response = await getData();

    // Get a reccomendation
    const recommendation = recommendBook([...response]);
    setRecomendation(recommendation);

    // Group books by some criteria, def: publicationYear
    const groupedBooks = groupBy([...response], 'publicationYear');
    sortBy(groupedBooks, 'title');

    // Create an array from the object, then reverse it to get the descending order
    const groupedBooksArr = Object.entries(groupedBooks).reverse();

    setBookData(groupedBooksArr);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <h1>Books</h1>
      {loading && <p>Loading...</p>}
      <div className='book-list'>
        <BookItem book={recommendation} className='recommedation'/>
        {bookData.length > 0 &&
          bookData.map((item) => {
            return <BookGroup key={uuid()} year={item[0]} books={item[1]}/>;
          })}
      </div>
    </section>
  );
};

export default BookList;
