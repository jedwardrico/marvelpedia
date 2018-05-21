import React from 'react';

const Pages = (props) => {
  const { prevPage, nextPage, currentPage } = props;
  return (
    <div className='mt-5'>
        <button className='btn btn-dark mr-1' disabled={currentPage < 1} onClick={prevPage}>Previous Page</button>
        <button className='btn btn-dark' 
          disabled={
            props.characters ? props.characters.length < 40 
            : props.comics ? props.comics.length < 30 
            : false 
          } 
          onClick={nextPage}>Next Page
        </button>
    </div>
  )
}

export default Pages;
