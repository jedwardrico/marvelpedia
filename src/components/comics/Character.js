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
    axios.get(`${characterHost}/${this.props.id}?${auth}`)
    .then(response => this.setState({ character: response.data.data.results[0] }))
    .catch(err => console.log(err))
  }

  render(){
    console.log(this.state)
    const { character } = this.state;
    if(!character.name) return null
    return (
      <div>
        <h1 className='mb-2'>{character.name}</h1>
        <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />
        {
          character.description ?
          <h4 className='mt-4 mb-2' dangerouslySetInnerHTML={{__html: character.description}}></h4>
          : <h4 className='mt-4'> No Description Listed </h4>
        }
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
        <h2 className='mb-2 mt-4'> Featured in {character.comics.available} issues </h2>
        {
            character.comics ?
            <ol>
            {
              character.comics.items.map((comic, index) => {
                return <li key={index}><Link to={`/comics/${comic.resourceURI.split('/')[6]}`}> {comic.name} </Link></li>
              })
            }
          </ol>
          : <h4> No comics listed </h4>
        }
      </div>
    )
  }
}

export default Character;