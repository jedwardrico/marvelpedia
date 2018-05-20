import React from 'react';
import { Link } from 'react-router-dom';

const ComicList = (props) => {
  const { comics } = props;
  return (
    <div className='list-grid-comics'>
    {
      comics.map((comic, index) => {
        return (
          <div style={{gridColumn: index%3+1}} key={comic.id}>
            <Link to={`/comics/${comic.id}`}>{comic.title}</Link>
          </div>
        )
      })
    }
  </div>
  )
}

export default ComicList;
