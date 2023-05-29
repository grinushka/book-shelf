import { useState } from 'react';
import { getDb } from '../services/db';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setYear] = useState('');
  const [rating, setRating] = useState('0');
  const [isbn, setISBN] = useState('');

  // States for displaing errors while the user is typing
  const [titleError, setTitleError] = useState('Обязательное поле');
  const [authorError, setAuthorError] = useState('Обязательное поле');
  const [yearError, setYearError] = useState('');
  const [isbnError, setIsbnError] = useState('');

  // Loading to change change the button after submit
  const [loading, setLoading] = useState();

  // Using naviagte to go back to all books after submit
  const navigate = useNavigate();

  // Validate the title while typing
  const handleTitleValidation = (value) => {
    if (value === '') {
      setTitleError('Обязательное поле');
    } else if (value.replace(/\s+/g, '').length === 0) {
      setTitleError('Некорректное название');
    } else {
      setTitleError('');
    }
  };

  // Validate the author while typing
  const handleAuthorValidation = (value) => {
    if (value === '') {
      setAuthorError('Обязательное поле');
    } else if (value.replace(/\s+/g, '').length === 0) {
      setAuthorError('Некорректный автор');
    } else {
      setAuthorError('');
    }
  };

  // Validate the year
  const handleYearValidation = (value) => {
    if (value === '') {
      setYearError('');
    } else if (value < 1800) {
      setYearError('Должен быть больше 1800 г.');
    } else {
      setYearError('');
    }
  };

  // Validate the length and actual ISBN number
  const validateISBN = (value) => {
    const maxChars = 17;

    if (value === '') {
      setIsbnError('');
    } else if (value.length < 13) {
      setIsbnError('ISBN должен состоять из 13 цифр');
    } else {
      if (value.length >= maxChars) {
        setISBN(value.substr(0, maxChars));
        setIsbnError('')
      }
    }
  };

  // Check if required field are truthy (have something apart from spaces)
  const checkRequiredFiels = () => {
    if (title.trim() && author.trim()) {
      return true;
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!checkRequiredFiels()) {
        throw new Error('Не заполнены обязательные поля');
      } else {
        setLoading(true);

        // Create book object depending on the state of the inputs
        // As publicationYear and ISBN are not required, we do not want to put empty values in the object
        const book = {
          title,
          author,
          rating,
          ...(publicationYear && {
            publicationYear,
          }),
          ...(isbn && {
            isbn,
          }),
        };

        // Sanitize the book obj by trimming its values
        Object.keys(book).forEach(function (key) {
          book[key] = book[key].trim();
        });
        
        console.log(book);

        // Push the book document to Firestore
        await addDoc(collection(getDb(), 'book-buddy'), book);
        setLoading(false);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='create'>
      <h3>Добавить новую книгу</h3>
      <form onSubmit={handleSubmit}>
        <div className='wrapper'>
          <label htmlFor='title'>Название:</label>
          <span className='error'>{titleError}</span>
        </div>

        <input
          type='text'
          required
          id='title'
          maxLength='100'
          placeholder='Название'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            handleTitleValidation(e.target.value);
          }}
        />

        <div className='wrapper'>
          <label htmlFor='author'>Автор:</label>
          <span className='error'>{authorError}</span>
        </div>
        <input
          type='text'
          required
          id='author'
          placeholder='Автор'
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
            handleAuthorValidation(e.target.value);
          }}></input>

        <div className='wrapper'>
          <label htmlFor='year'>Год публикации</label>
          <span className='error'>{yearError}</span>
        </div>
        <input
          type='number'
          min='1800'
          id='year'
          placeholder='Не ранее 1800 г.'
          value={publicationYear}
          onChange={(e) => {
            setYear(e.target.value);
            handleYearValidation(e.target.value);
          }}></input>

        <label htmlFor='rating'>Рейтинг</label>
        <input
          type='number'
          min='0'
          max='10'
          id='rating'
          value={rating}
          onChange={(e) => setRating(e.target.value)}></input>

        <div className='wrapper'>
          <label htmlFor='isbn'>ISBN</label>
          <span className='error'>{isbnError}</span>
        </div>
        <input
          type='text'
          id='isbn'
          // pattern='/^\d{3}-\d{1}-\d{2}-\d{6}-\d{1}$|^\d{13}$/'
          placeholder='978-3-16-148410-0-13'
          value={isbn}
          onChange={(e) => {
            setISBN(e.target.value);
            validateISBN(e.target.value);
          }}></input>
          

        {!loading && <button>Добавить в каталог</button>}
        {loading && <button disabled>Добавляем...</button>}
      </form>
    </div>
  );
};

export default AddBook;
