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
    axios.get(`${comicHost}/id/${this.props.id}`)
    .then(response => this.setState({ comic: response.data[0] }))
    .catch(err => console.log(err))
  }

  render(){
    const { comic } = this.state;
    if(!comic.title){
       return (
        <div> 
          <p> Loading... </p>
          <img className='loading-img' src='/public/icons/Blocks.svg' />
        </div>
      )
    }
    return (
      <div>
        <h1>{comic.title}</h1>
        <div className='comic-main'>
          <img className='image' src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`} />
          <div className='description'>
            {
              comic.description ?
              <div className='mb-3 mt-4 description-text' dangerouslySetInnerHTML={{__html: comic.description}}></div>
              : <div className='mb-3 mt-4 description-text'> No Description Listed </div>
            }
            <div className='buttons'>
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
            </div>
          </div>
        </div>
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