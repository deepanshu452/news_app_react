import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    
    constructor() {
        super()
        this.state = {
            articles: []
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=83bc4c8c56c6467a90ec6900dd94a637"
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles})
    }

  render() {    
    console.log("render")
    return (
      <>
      <div className="container my-3">
        <h1 className="text-center">News-- Top Headlines</h1>
        <div className='row'>
            {this.state.articles? this.state.articles.map((element) => {
                 return ( <div className='col-md-4' key = {element.url}>
                    <NewsItem title={element.title? element.title:""} description={element.description? element.description:"No Description"}
                        imageUrl={element.urlToImage} newsUrl={element.url}   />
                </div>)
            }): []}
            
        </div>
      </div>
        
      </>
    )
  }
}

export default News 