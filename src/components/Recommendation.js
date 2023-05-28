import BookItem from './BookItem';

import '../style/components/recommendation.scss';

const Recommendation = (props) => {
  return (
    <div className='recommendation'>
      <h2>Today's recommendation</h2>
      <BookItem
        book={props.book}
        className='recommended-book'
      />
    </div>
  );
};

export default Recommendation;
