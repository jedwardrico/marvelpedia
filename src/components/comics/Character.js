import React from 'react';
import axios from 'axios';
import { characterHost, ts, kets, hash, auth } from './index';
import { Link } from 'react-router-dom';

class Character extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      character: []
    }
  }

  componentDidMount(){
    axios.get(`${characterHost}/id/${this.props.id}`)
    .then(response => this.setState({ character: response.data[0] }))
    .catch(err => console.log(err))
  }

  render(){
    const { character } = this.state;
    if(!character.name) return null
    return (
      <div>
        <h1 className='mb-2'>{character.name}</h1>
        <div className='character-main'> 
          <img className='image'src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`} />
          <div className='description'>
          {
            character.description ?
            <h4 className='mt-4 mb-2' dangerouslySetInnerHTML={{__html: character.description}}></h4>
            : <h4 className='mt-4'> No Description Listed </h4>
          }
          <div className='buttons'>
          {
            character.urls.map((url, index) => {
              switch(url.type){ 
                case 'detail':
                  return <button className='btn btn-dark mt-2 mr-1 ml-1' key={index}><a href={url.url}> See on Marvel.com </a></button>
                case 'comiclink':
                  return null
                case 'wiki':
                  return <button className='btn btn-dark mt-2 mr-1 ml-1' key={index}><a href={url.url}> Learn More </a></button>
                default:
                  console.log(url.type)
              }
            })          
          }
          </div>
          </div>
        </div>
        <h2 className='mb-2 mt-4 text-center'> Featured in {character.comics.available} issues </h2>
        {
          character.comics ?
          <div className='rows'>
            <ol className='row-1'>
              {
                character.comics.items.slice(0,10).map((comic, index) => {
                  return (
                  <li key={index}>
                    <Link to={`/comics/${comic.resourceURI.split('/')[6]}`}> 
                    {comic.name.length > 35 ? `${comic.name.slice(0,35)}...` : comic.name } 
                    </Link>
                  </li>
                  )
                })
              }
            </ol>
            <ol start='11' className='row-2'>
            {
              character.comics.items.slice(0,10).map((comic, index) => {
                return (
                <li key={index}>
                  <Link to={`/comics/${comic.resourceURI.split('/')[6]}`}> 
                  {comic.name.length > 35 ? `${comic.name.slice(0,35)}...` : comic.name } 
                  </Link>
                </li>
                )
              })
            }
            </ol>
          </div>
          : <h4> No comics listed </h4>
        }
      </div>
    )
  }
}

export default Character;