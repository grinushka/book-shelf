import { useState, useEffect } from 'react';
import { getData } from '../services/getData';
import { groupBy } from '../utils/groupBy';
import { sortBy } from '../utils/sortBy';

import BookGroup from './Book-group';

const BookList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const response = await getData();

    const groupedBooks = groupBy([...response], 'publicationYear');
    sortBy(groupedBooks, 'title');
    const groupedBooksArr = Object.entries(groupedBooks);

    setData(groupedBooksArr);
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
        {data.length > 0 &&
          data.map((item) => {
            return <BookGroup year={item[0]} books={item[1]}/>;
          })}
      </div>
    </section>
  );
};

export default BookList;
