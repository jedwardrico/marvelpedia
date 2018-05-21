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
      limit: 42,
      loading: false,
      err: '',
      letter: '',
      orderBy: 'name'
    }
    this.nextPage = this.nextPage.bind(this); 
    this.prevPage = this.prevPage.bind(this);
    this.alphaSort = this.alphaSort.bind(this); 
  }

  componentDidMount(){
    const { limit, orderBy, letter } = this.state
    this.setState({ loading: true })
    axios.get(`${characterHost}/search/orderBy=${orderBy}&limit=${limit}${letter ? `&nameStartsWith=${letter}` : ''}`)
    .then(response => { this.setState({ characters: response.data, loading: false })})
    .catch(err => this.setState({ err }))
  }

  alphaSort(letter){
    const { format, orderBy, limit, page } = this.state;
    this.setState({ loading: true })
    this.setState({ letter })
    axios.get(`${characterHost}/search/orderBy=${orderBy}&limit=${limit}${letter ? `&nameStartsWith=${letter}` : ''}${`${page > 0 ? `&offset=${page*limit}` : ''}`}`)
    .then(response => response.data)
    .then(characters => this.setState({ characters }))
    .then(() => this.setState({ loading: false }))
    .catch(err => this.setState({err}))
  }

  nextPage(){
    const { format, orderBy, limit, letter, page } = this.state;
    this.setState({ loading: true })
    const _page = page + 1;
    axios.get(`${characterHost}/search/orderBy=${orderBy}&limit=${limit}${letter ? `&nameStartsWith=${letter}` : ''}${`${_page == 0 ? '' : `&offset=${_page*limit}`}`}`)
      .then(response => response.data)
      .then(characters => this.setState({ characters, page: page+1 }))
      .then(() => this.setState({ loading: false }))
      .catch(err => this.setState({err}))
  }

  prevPage(){
    const { format, orderBy, limit, letter, page } = this.state;
    this.setState({ loading: true })
    const _page = page-1;
    axios.get(`${characterHost}/search/orderBy=${orderBy}&limit=${limit}${letter ? `&nameStartsWith=${letter}` : ''}${`${_page == 0 ? '' : `&offset=${_page*limit}`}`}`)
      .then(response => response.data)
      .then(characters => this.setState({ characters, page: page-1 }))
      .then(() => this.setState({ loading: false }))
      .catch(err => this.setState({err}))
  }

  render(){
    const { characters, loading, err, page } = this.state;
    if(!characters) return null
    return (
      <div className='text-center'>
        <h1 className='text-center'> All Characters </h1>
        <Alpha alphaSort={this.alphaSort} />
          { 
          loading && !err ?
            <div className='text-center'> 
              <img className='loading-img' src='/public/icons/Blocks.svg' />
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