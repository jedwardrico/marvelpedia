import React from 'react';
import axios from 'axios';
import { characterHost, auth } from './index';
import CharacterList from './CharacterList';
import Pages from './Pages';
import Alpha from './Alpha';

class Characters extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      characters: [],
      page: 0,
      limit: 40,
      loading: false,
      err: '',
      letter: ''
    }
    this.nextPage = this.nextPage.bind(this); 
    this.prevPage = this.prevPage.bind(this);
    this.alphaSort = this.alphaSort.bind(this); 
  }

  componentDidMount(){
    const { page, limit } = this.state
    this.setState({ loading: true })
    axios.get(`${characterHost}?limit=${limit}&${auth}`)
    .then(response => {
      this.setState({ characters: response.data.data.results, loading: false })
      })
    .catch(err => this.setState({ err }))
  }

  alphaSort(letter){
    const { format, orderBy, limit } = this.state;
    this.setState({ loading: true })
    this.setState({ letter })
    axios.get(`${characterHost}?limit=${limit}&${letter ? `&nameStartsWith=${letter}` : ''}&${auth}`)
    .then(response => response.data.data.results)
    .then(characters => this.setState({ characters }))
    .then(() => this.setState({ loading: false }))
    .catch(err => this.setState({err}))
  }

  nextPage(){
    let { page } = this.state
    const { format, orderBy, limit, letter } = this.state;
    this.setState({ loading: true })
    this.setState({ page: page+1 })
    axios.get(`${characterHost}?limit=${limit}&${letter ? `&nameStartsWith=${letter}` : ''}&offset=${page*40}&${auth}`)
      .then(response => response.data.data.results)
      .then(characters => this.setState({ characters }))
      .then(() => this.setState({ loading: false }))
      .catch(err => this.setState({err}))
  }

  prevPage(){
    let { page } = this.state
    const { format, orderBy, limit } = this.state;
    this.setState({ loading: true })
    this.setState({ page: page - 1 })
    axios.get(`${characterHost}?limit=${limit}&${letter ? `&nameStartsWith=${letter}` : ''}&offset=${page*40}&${auth}`)
      .then(response => response.data.data.results)
      .then(characters => this.setState({ characters }))
      .then(() => this.setState({ loading: false }))
      .catch(err => this.setState({err}))
  }

  render(){
    console.log(this.state)
    const { characters, loading, err, page } = this.state;
    if(!characters) return null
    return (
      <div className='text-center'>
        <h1 className='text-center'> All Characters </h1>
        <Alpha alphaSort={this.alphaSort} />
          { 
          loading && !err ?
            <div className='text-center'> 
              <img id='loading-img' src='/public/icons/Blocks.svg' />
            </div>
            :
            <CharacterList characters={characters}/>
          }
          { 
            err ?
            <h4 className='mb-4'> 
              Uh-oh, looks like a {err.message}...
            </h4>
            : null
          }
          <Pages characters={characters} currentPage={page} prevPage={this.prevPage} nextPage={this.nextPage}/>
      </div>
    )
  }
}

export default Characters;