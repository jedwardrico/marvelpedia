import React from 'react';
import ComicList from './ComicList';
import CharacterList from './CharacterList';
import { Link } from 'react-router-dom';

const Results = (props) => {
  const { comics, characters, loading } = props;
  console.log(props)
  return (
    !loading.comics && !loading.characters && !comics.length && !characters.length ?
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
          loading.comics ?
            <div className='loading text-center'> 
              <img className='loading-img' width='80' height='80' src='/public/icons/Blocks.svg' />
              <h2>Loading Results...</h2>
            </div>
          :
          comics.length ?
            <ul>
            {
              comics.slice(0,5).map(comic => {
                return <li key={comic.id}><Link to={`/comics/${comic.id}`}>{comic.title}</Link></li>
              })
            }
            </ul>
          :
            <h4> There are no comics with that name. </h4>
        }

        <h2>Characters: </h2>

        {
          loading.characters ?
            <div className='loading text-center'> 
              <img className='loading-img' width='80' height='80' src='/public/icons/Blocks.svg' />
              <h2>Loading Results...</h2>
            </div>
          :
          characters.length ?
            <ul>
            {
              characters.slice(0,5).map(character => {
                return <li key={character.id}><Link to={`/characters/${character.id}`}>{character.name}</Link></li>
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