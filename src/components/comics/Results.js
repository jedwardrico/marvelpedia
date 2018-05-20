import React from 'react';
import ComicList from './ComicList';
import CharacterList from './CharacterList';
import { Link } from 'react-router-dom';

const Results = (props) => {
  const { comics, characters } = props;
  return (
   !comics.length && !characters.length ?
      <div className='error'> 
        Whoops, looks like there are no comics or characters with that name. 
        <br />
        Maybe try <Link to='/image-search' className='underline'> Searching with an image? </Link> 
      </div>
      :
    <div>
      <h1> Was this what you were looking for? </h1>
      <h2>Comics: </h2>
     
         {
          comics.length ?
          <ul>
          {
            comics.slice(0,5).map(comic => {
              return <li><Link to={`/comics/${comic.id}`}>{comic.title}</Link></li>
            })
          }
          </ul>
          :
          <h4> There are no comics with that name. </h4>
        }
        <h2>Characters: </h2>
        {
          characters.length ?
          <ul>
          {
            characters.slice(0,5).map(character => {
              return <li><Link to={`/characters/${character.id}`}>{character.name}</Link></li>
            })
          }
          </ul>
          :
          <h4> There are no characters with that name. </h4>
        }
    </div>
  )
}

export default Results;