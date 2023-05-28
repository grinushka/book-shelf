import { Link } from 'react-router-dom';

const NotFound = () => {
  return ( 
    <div className='not-found'>
      <h2>Ой... не нужно плакать</h2>
      <p>Это всего лишь 404!</p>
      <Link className='go-back' to='/'>Вернуться к полке с книгами</Link>
    </div>
   );
}
 
export default NotFound;