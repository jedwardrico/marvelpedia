import React from 'react';
import { Link } from 'react-router-dom';

const CharacterList = (props) => {
  const { characters } = props;
  return (
    <div className='list-grid'>
    {
      characters.map((character, index)=> {
        return (
          <div style={{gridColumn: index%6+2}} className='character' key={character.id}>
            <img className='character-image' src={`${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`} />
            <Link className='character-name' to={`/characters/${character.id}`}>
              {
                character.name.length <= 14 ? character.name
                : `${character.name.slice(0,14)}...`
              }
            </Link>
          </div>
        )
      })
    }
  </div>
  )
}

export default CharacterList;
