import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { characterHost, auth, defaultImg, errFileType } from '../comics/index';
import CharacterList from '../comics/CharacterList';

class ImageSearch extends Component {
  constructor(props){
    super(props);
    this.state = {
      img: '',
      characters: [],
      err: '',
      loading: false,
      progress: 0
    }
    this.newSearch = this.newSearch.bind(this);
    this.updateProgressBar = this.updateProgressBar.bind(this);
  }

  newSearch(){
    this.setState({ img: '', characters: '', err: ''})
  }

  updateProgressBar(val){
    this.setState({ progress: val })
  }

  onDrop(img) {
    this.setState({ loading: true, err: '', characters: [], img: '' })
    const fileReader = new FileReader();
    fileReader.readAsDataURL(img[0]);
    fileReader.onload = (ev) => {
      this.setState({ img: ev.target.result })
      axios.post('/images/upload', 
        { img: ev.target.result }, {  
          maxContentLength: 20000000000000, 
          onUploadProgress: (progressEvent) => {
            console.log(progressEvent)
            const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length');
            console.log("onUploadProgress", totalLength);
            console.log("onUploadProgress", progressEvent.loaded);
            while (progressEvent.loaded !== totalLength) this.updateProgressBar(Math.round( (progressEvent.loaded * 100) / totalLength ));
          }
        }
      )
      .then(res => res.data)
      .then(results => {
        if(results.message){
          this.setState({ err: errFileType, img: defaultImg, loading: false, progress: 0 })
        }
        else {
          this.setState({ characters: results.names.slice(0,5), loading: false, progress: 0 })
        }
      })
      .catch(err => {
        this.setState({ err: err.response, loading: false })
      })
    }
  }

  render(){
    const { characters, err, loading, img, progress } = this.state;
    let dropzoneRef;
    console.log( loading, progress )
    return (
      <div>
        <h1 className='text-center'> Not sure what character you're looking at? </h1>
        <h3 className='text-center'> Drop an image here to search who is in it! </h3>
        <div className='search mt-4'>
          <div className={ !characters.length ? 'search-drop-start' :'search-drop'}>
            <div className='dropzone'>
            {
              img ?
              <img className='search-image' src={img}/>
              :
              <Dropzone onDrop={this.onDrop.bind(this)}>
                {/* Hold for image! */}
              </Dropzone>
            }
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
              <h2>Loading Results...</h2>
              <div
                data-preset="energy"
                className="ldBar"
                data-value={progress}
              ></div>
            </div>
            : 
            characters.length ?
              <div>
              <h3 className='text-center mb-2 result-title'> Top Results </h3>
                <div className='result-bars'>
                {
                  characters.map(character => {
                    return (
                      character.description ?
                      <div key={character.entityId}> {character.description} 
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
              : <div>
                  <h2 className='drop-text' type='file'> Try dropping some files in the box to the right, or click it to select files to upload. </h2>
                </div>
          }
          </div>

        {
          img && characters.length || err ?
          <button onClick={this.newSearch} className='btn btn-dark mt-4 search-button'> Search Again </button>
          : null
        }
        </div>  
    </div>
    )
  }
}

export default ImageSearch;