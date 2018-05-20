import React from 'react';

const Alpha = (props) => {

  return (
    <div className='btn-group mt-4 mb-4' role='group'>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value=''>0-9</button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='A'> A </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='B'> B </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='C'> C </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='D'> D </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='E'> E </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='F'> F </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='G'> G </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='H'> H </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='I'> I </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='J'> J </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='K'> K </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='L'> L </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='M'> M </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='N'> N </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='O'> O </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='P'> P </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='Q'> Q </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='R'> R </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='S'> S </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='T'> T </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='U'> U </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='V'> V </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='W'> W </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='X'> X </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='Y'> Y </button>
      <button className='btn btn-sm btn-dark' onClick={(ev) => props.alphaSort(ev.target.value)} value='Z'> Z </button>
    </div>
  )
}

export default Alpha;
