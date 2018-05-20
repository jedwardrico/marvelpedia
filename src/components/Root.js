import React, { Component } from 'react';
import axios from 'axios';
import { HashRouter as Router, Route } from 'react-router-dom'; 
import Home from './index/Home';
import Nav from './index/Nav';
import ImageSearch from './index/ImageSearch';
import Comic from './comics/Comic';
import Comics from './comics/Comics';
import MCU from './mcu/MCU';
import Film from './mcu/Film';
import Character from './comics/Character';
import Characters from './comics/Characters';
import Results from './comics/Results';
import { comicHost, characterHost, auth } from './comics/index';

class Root extends Component {
  constructor(props){
    super(props)
    this.state = {
      comics: [],
      characters: []
    }
    this.search = this.search.bind(this);
  }

  search(query){
    console.log(history)
    axios.get(`${comicHost}?${auth}&titleStartsWith=${query}`)
      .then(res => res.data.data.results)
      .then(comics => this.setState({ comics }))
    axios.get(`${characterHost}?${auth}&nameStartsWith=${query}`)
      .then(res => res.data.data.results)
      .then(characters => this.setState({ characters }))
    document.location.hash = '/results'
  }

  render() {
    return (
      <Router>
        <div>
          <Nav search={this.search}/>
          <div className='container-fluid mt-4'>
            <Route path='/' exact component={Home} />
            <Route path='/comics' exact render={() => <Comics />} />
            <Route path='/comics/:id' render={({ match } ) => <Comic id={match.params.id} />} />
            <Route path='/mcu' exact render={() => <MCU />}  />
            <Route path='/characters' exact render={() => <Characters />}  />
            <Route path='/characters/:id' render={({ match } ) => <Character id={match.params.id} />} />
            <Route path='/image-search' component={ImageSearch} />
            <Route path='/results' render={() => <Results comics={this.state.comics} characters={this.state.characters}/>} />
          </div>
        </div>
      </Router>
    )
  }
}


export default Root;