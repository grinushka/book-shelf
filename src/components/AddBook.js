import { useState } from 'react';
import { getDb } from '../services/db';
import { collection, addDoc } from 'firebase/firestore';
import { navigate, useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setYear] = useState('');
  const [rating, setRating] = useState('0');
  const [isbn, setISBN] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const book = { title, author, publicationYear, rating, isbn };
      const db = getDb();
      const docRef = await addDoc(collection(db, 'book-buddy'), book);
      console.log(docRef);
      setLoading(false);
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='create'>
      <h3>Добавить новую книгу</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Название:</label>
        <input
          type='text'
          required
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor='author'>Автор:</label>
        <input
          type='text'
          required
          id='author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}></input>

        <label htmlFor='year'>Год публикации</label>
        <input
          type='number'
          min='1800'
          id='year'
          value={publicationYear}
          onChange={(e) => setYear(e.target.value)}></input>

        <label htmlFor='rating'>Рейтинг</label>
        <input
          type='number'
          min='0'
          max='10'
          id='rating'
          value={rating}
          onChange={(e) => setRating(e.target.value)}></input>

        <label htmlFor='isbn'>ISBN</label>
        <input
          type='text'
          id='isbn'
          value={isbn}
          onChange={(e) => setISBN(e.target.value)}></input>

        {!loading && <button>Положить на полку</button>}
        {loading && <button disabled>Кладем...</button>}
      </form>
    </div>
  );
};

export default AddBook;
