import React from 'react';

const Alpha = (props) => {
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  return (
    <div className='btn-group mt-4 mb-4 alpha' role='group'>
      <button className='btn btn-sm btn-dark alpha' onClick={(ev) => props.alphaSort(ev.target.value)} value=''>0-9</button>
      {
        alphabet.map(letter => {
          return <button className='btn btn-sm btn-dark alpha' key={letter} onClick={(ev) => props.alphaSort(ev.target.value)} value={letter}> {letter.toUpperCase()} </button>
        })
      }
    </div>
  )
}

export default Alpha;
