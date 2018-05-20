import React from 'react';
import { Link } from 'react-router-dom';

const CharacterList = (props) => {
  const { characters } = props;
  return (
    <div className='list-grid'>
    {
      characters.map((character, index)=> {
        return (
          <div style={{gridColumn: index%4+1}} key={character.id}>
            <Link to={`/characters/${character.id}`}>{character.name}</Link>
          </div>
        )
      })
    }
  </div>
  )
}

export default CharacterList;
