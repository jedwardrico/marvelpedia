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
      page: 0,
      limit: 32,
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
    const { format, orderBy, loading, letter, limit } = this.state;
    this.setState({ loading: true })
    axios.get(`${comicHost}/search/format=${format}${letter ? `&titleStartsWith=${letter}` : ''}&orderBy=${orderBy}&limit=${limit}`)
    .then(response => response.data)
    .then(comics => this.setState({ comics, loading: false }))
    .catch(err => this.setState({err}))
  }

  alphaSort(letter){
    const { format, orderBy, limit } = this.state;
    this.setState({ loading: true })
    this.setState({ letter })
    axios.get(`${comicHost}/search/format=${format}${letter ? `&titleStartsWith=${letter}` : ''}&orderBy=${orderBy}&limit=${limit}`)
    .then(response => response.data)
    .then(comics => this.setState({ comics }))
    .then(() => this.setState({ loading: false }))
    .catch(err => this.setState({err}))
  }

  nextPage(){
    const { format, orderBy, limit, letter, page } = this.state;
    this.setState({ loading: true })
    const _page = page+1;
    axios.get(`${comicHost}/search/format=${format}${letter ? `&titleStartsWith=${letter}` : ''}&orderBy=${orderBy}&limit=${limit}${`${_page == 0 ? '' : `&offset=${_page*limit}`}`}`)
      .then(response => response.data)
      .then(comics => this.setState({ comics, page: page+1 }))
      .then(() => this.setState({ loading: false }))
      .catch(err => this.setState({err}))
  }

  prevPage(){
    const { format, orderBy, limit, letter, page} = this.state;
    this.setState({ loading: true })
    const _page = page-1;
    axios.get(`${comicHost}/search/format=${format}${letter ? `&titleStartsWith=${letter}` : ''}&orderBy=${orderBy}&limit=${limit}${`${_page == 0 ? '' : `&offset=${_page*limit}`}`}`)
      .then(response => response.data)
      .then(comics => this.setState({ comics, page: page-1 }))
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
            <img className='loading-img' src='/public/icons/Blocks.svg' />
            <p> Loading... </p>
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