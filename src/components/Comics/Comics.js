import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { comicHost, auth } from './index';
import ComicList from './ComicList';
import Pages from './Pages';
import Alpha from './Alpha';

class Comics extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      comics: [],
      page: 1,
      limit: 30,
      orderBy: 'title',
      format: 'comic',
      letter: '',
      loading: false,
      err: ''
    }
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.alphaSort = this.alphaSort.bind(this); 
  }

  componentWillMount(){
    const { format, orderBy, loading, page, letter } = this.state;
    this.setState({ loading: true })
    axios.get(`${comicHost}?format=${format}&${letter ? `&titleStartsWith=${letter}` : ''}&orderBy=${orderBy}&limit=${page*30}&${auth}`)
    .then(response => response.data.data.results)
    .then(comics => this.setState({ comics, loading: false }))
    .catch(err => this.setState({err}))
  }

  alphaSort(letter){
    const { format, orderBy, limit } = this.state;
    this.setState({ loading: true })
    this.setState({ letter })
    axios.get(`${comicHost}?limit=${limit}&${letter ? `&titleStartsWith=${letter}` : ''}&${auth}`)
    .then(response => response.data.data.results)
    .then(comics => this.setState({ comics, page: 0 }))
    .then(() => this.setState({ loading: false }))
    .catch(err => this.setState({err}))
  }

  nextPage(){
    let { page } = this.state
    const { format, orderBy, letter, limit } = this.state;
    this.setState({ page: page+1 })
    this.setState({ loading: true })
      axios.get(`${comicHost}?limit=${limit}&format=${format}&${letter ? `&titleStartsWith=${letter}` : ''}&orderBy=${orderBy}&offset=${page*30}&${auth}`)
      .then(response => response.data.data.results)
      .then(comics => this.setState({ comics }))
      .then(() => this.setState({ loading: false }))
      .catch(err => this.setState({err}))
  }

  prevPage(){
    let { page } = this.state
    const { format, orderBy, letter, limit } = this.state;
    this.setState({ loading: true })
    this.setState({ page: page-1 })
      axios.get(`${comicHost}?limit=${limit}&format=${format}&${letter ? `&titleStartsWith=${letter}` : ''}&orderBy=${orderBy}&offset=${page*30}&${auth}`)
      .then(response => response.data.data.results)
      .then(comics => this.setState({ comics }))
      .then(() => this.setState({ loading: false }))
      .catch(err => this.setState({err}))
  }

  render(){
    const { comics, page, loading, err } = this.state;
    return (
      <div className='text-center'>
        <h1> All Comics </h1>
        <Alpha alphaSort={this.alphaSort}/>
        { 
          loading && !err ?
          <div> 
            <img id='loading-img' src='/public/icons/Blocks.svg' />
          </div>
          :
          <ComicList comics={comics}/>
        }
        { 
          err ?
          <h4 className='mb-6'> 
            Uh-oh, looks like a {err.message}...
          </h4>
          : null
        }
        <Pages comics={comics} currentPage={page} prevPage={this.prevPage} nextPage={this.nextPage}/>
      </div>
    )
  }
}

export default (Comics);