import { BrowserRouter as Router, Routes,  Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import AddBook from './AddBook';


function App() {
  return (
    <Router>
    <div className='App'>
      <div className='container'>
        <Header />
        <Routes>
          <Route exact path='/' element = {<Home/>}></Route>
          <Route path = 'create' element = { <AddBook/>} ></Route>
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
