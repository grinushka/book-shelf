import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
      <h2>Каталог книг</h2>
      <nav className='nav'>
        <Link to='/' className='btn all-books'>Все книги</Link>
        <Link to='/create' className='btn add-book'>+ Добавить книгу</Link>
      </nav>
    </div>
  );
};

export default Header;
