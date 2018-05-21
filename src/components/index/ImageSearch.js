import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { characterHost, comicHost, auth, errImg, errFileType } from '../comics/index';
import CharacterList from '../comics/CharacterList';
import ComicList from '../comics/ComicList';

class ImageSearch extends Component {
  constructor(props){
    super(props);
    this.state = {
      img: '',
      characters: [],
      err: '',
      loading: false,
      progress: 0,
      comics: [],
      charSearch: []
    }
    this.newSearch = this.newSearch.bind(this);
    this.search = this.search.bind(this);
  }

  newSearch(){
    this.setState({ img: '', characters: [], err: '', comics: [], charSearch: []})
  }

  search(query){
    axios.get(`${comicHost}/search/titleStartsWith=${query}`)
      .then(res => res.data)
      .then(comics => this.setState({ comics, loading: false }))
    axios.get(`${characterHost}/search/nameStartsWith=${query}`)
      .then(res => res.data)
      .then(charSearch => this.setState({ charSearch }))
  }

  onDrop(img) {
    this.setState({ loading: true, err: '', characters: [], img: '' })
    const fileReader = new FileReader();
    fileReader.readAsDataURL(img[0]);
    fileReader.onload = (ev) => {
      this.setState({ img: ev.target.result })
      axios.post('/images/upload', { img: ev.target.result })
      .then(res => res.data)
      .then(results => {
        if(results.message){
          this.setState({ err: errFileType, img: errImg, loading: false })
        }
        else {
          this.setState({ characters: results.names.slice(0,5), loading: false })
        }
      })
      .catch(err => {
        this.setState({ err: err.response, loading: false })
      })
    }
  }

  render(){
    const { characters, err, loading, img, charSearch, comics } = this.state;
    return (
      <div>
        <div className='search-header'> Not sure what character you're looking at? </div>
        <div className='search mt-4'>
          <div className={ !characters.length ? 'search-drop-start' :'search-drop'}>
            <div className='dropzone'>
              <Dropzone style={img ? {} : null } accept="image/jpeg, image/png" onDrop={this.onDrop.bind(this)}>
              {
                img ?
                <img className='search-image' src={img} />
                :
                null
              }
              </Dropzone>
            </div>
          </div>
          <div className='search-results'>
          { 
            err ? 
            <div className='alert alert-danger error'> { err.statusText ? err.statusText : err } </div>
            : null
          } 
          { 
            loading ? 
            <div className='loading text-center'> 
              <img className='loading-img' src='/public/icons/Blocks.svg' />
              <h2>Loading Results...</h2>
            </div>
            : 
            characters.length ?
              <div>
              <h3 className='text-center mb-2 result-title'> Top Results: Click one to learn more! </h3>
                <div className='result-bars'>
                {
                  characters.map(character => {
                    return (
                      character.description ?
                      <div key={character.entityId}> 
                        <div className='results-name'
                          onClick={(ev) => {
                            this.setState({ loading: true })
                            this.search(character.description)
                          }}
                          >{character.description}</div> 
                        <div className="progress">
                          <div className="progress-bar bg-danger" role="progressbar" style={{width: `${character.score*75}%`}}>{Math.floor(character.score*75)}%</div>
                        </div>
                      </div>
                      : null
                    )
                  })
                }
                </div>
              </div>
              : <div className='drop-text' >
                  <h2 type='file'> Try dropping some files in the box to the right, or click it to select files to upload. </h2>
                </div>
          }
          </div>

        {
          img && characters.length || err ?
          <button onClick={this.newSearch} className='btn btn-dark mt-4 search-button'> Search Again </button>
          : null
        }
        </div>
        <div>
          {
            charSearch.length ? 
              <div>
                <h2> Characters: </h2>
                <div className='text-center'>
                  <CharacterList characters={charSearch.slice(0,5)}/>
                </div>
              </div>
            : null
          }
          {
            comics.length ? 
              <div>
                <h2> Comics: </h2>
                <div className='text-center'>
                  <ComicList comics={comics.slice(0,5)}/> 
                </div>
              </div>
            : null
          }
        </div>
    </div>
    )
  }
}

export default ImageSearch;