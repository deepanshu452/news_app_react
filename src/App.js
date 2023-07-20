import './App.css';
import React, { Component} from "react"
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<News key="general" category="general"/>} />
            <Route path="/technology" element={<News key="technology" category="technology"/>} />
            <Route path="/sports" element={<News key="sports" category="sports"/>} />
            <Route path="/science" element={<News key="science" category="science"/>} />
            <Route path="/health" element={<News key="health" category="health"/>} />
            <Route path="/entertainment" element={<News key="entertainment" category="entertainment"/>} />
            <Route path="/business" element={<News key="business" category="business"/>} />
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}
   