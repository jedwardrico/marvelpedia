import React from 'react';
import axios from 'axios';
import { comicHost, ts, kets, hash, auth } from './index';
import { Link } from 'react-router-dom';

class Comics extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      comic: []
    }
  }

  componentDidMount(){
    axios.get(`${comicHost}/${this.props.id}?${auth}`)
    .then(response => this.setState({ comic: response.data.data.results[0] }))
    .catch(err => console.log(err))
  }

  render(){
    console.log(this.state)
    const { comic } = this.state;
    if(!comic.title) return null
    return (
      <div>
        <h1>{comic.title}</h1>
        <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} />
        {
          comic.description ?
          <h4 className='mb-3 mt-4' dangerouslySetInnerHTML={{__html: comic.description}}></h4>
          : <h4 className='mb-3 mt-4'> No Description Listed </h4>
        }
        {
          comic.urls.map((url, index) => {
            switch(url.type){ 
              case 'detail':
                return <button className='btn btn-dark mr-1' key={index}><a href={url.url}> See on Marvel.com </a></button>
              case 'reader':
                return <button className='btn btn-dark mr-1' key={index}><a href={url.url}> Read online </a></button>
              case 'purchase':
                return <button className='btn btn-dark mr-1' key={index}><a href={url.url}> Buy it Here </a></button>
              default:
                console.log(url.type)
            }
           
          })          
        }
        <h2 className='mb-3 mt-4'> Characters </h2>
        {
          comic.characters.items.length ?
          <ul>
            {
              comic.characters.items.map((character, index) => {
               
                return <div key={index}><Link to={`/characters/${character.resourceURI.split('/')[6]}`}> {character.name} </Link></div>
              })
            }
          </ul>
          : <h4> No characters listed </h4>
        }
        
      </div>
    )
  }
}

export default Comics;