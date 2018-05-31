import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',
      category: 0,
      loading: true,
    }
    this.setCategory = this.setCategory.bind(this);
    this.search = this.search.bind(this);
    this.submit = this.submit.bind(this);
  }

  setCategory(ev){
    this.setState({ category: ev.target.value })
  }

  search(ev){
    this.setState({ search: ev.target.value })
  }

  submit(ev){
    ev.preventDefault();
    this.props.search(this.state.search);
    this.setState({ search: '' })
  }

  render(){
    const { search } = this.state;
    return (
      <div className='search-bar'>
        <form onSubmit={this.submit} className='form-inline'>
          <input onChange={this.search} value={search} className='form-control form-control-sm search-input' type='search' placeholder='Search'/>
          <button className='btn btn-sm btn-outline-light'>Go</button>
        </form>
      </div>
    )
  }
}

export default SearchBar;