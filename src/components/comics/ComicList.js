import React from 'react';
import { Link } from 'react-router-dom';

const ComicList = (props) => {
  const { comics } = props;
  return (
    <div className='list-grid-comics'>
    {
      comics.map((comic, index) => {
        return (
          <div className='comic' style={{gridColumn: index%4+2}} key={comic.id}>
            <img className='comic-image' src={`${comic.thumbnail.path}/portrait_medium.${comic.thumbnail.extension}`} />
            <Link className='comic-name' to={`/comics/${comic.id}`}>
              {
                comic.title
              }
               <p className='mt-3'>
                { 
                  comic.prices ?
                  `Price: $${comic.prices[0].price}`
                  : 'No Price Listed'
                }
              </p>
              
            </Link>
          </div>
        )
      })
    }
  </div>
  )
}

export default ComicList;
