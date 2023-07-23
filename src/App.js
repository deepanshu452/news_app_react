import './App.css';
import React, { Component} from "react"
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  apiKey = process.env.REACT_APP_NEWS_API_KEY

  state = {
    progress:0,
    searchItem: ""
  }

  setProgress = (progress) => {
    this.setState({progress:progress})
  }
  render() {
    return (
      <>
        <BrowserRouter>
        {/* <h1>--{this.state.searchItem}</h1> */}
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
          <Routes>
            <Route path="/" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key="general" category="general"/>} />
            <Route path="/technology" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key="technology" category="technology"/>} />
            <Route path="/sports" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key="sports" category="sports"/>} />
            <Route path="/science" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key="science" category="science"/>} />
            <Route path="/health" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key="health" category="health"/>} />
            <Route path="/entertainment" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key="entertainment" category="entertainment"/>} />
            <Route path="/business" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key="business" category="business"/>} />
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}
   