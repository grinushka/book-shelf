import Header from './components/Header';
import BookList from './components/BookList';

import './style/utilities/_container.scss';

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <Header />
        <BookList />
      </div>
    </div>
  );
}

export default App;
