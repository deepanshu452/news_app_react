import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types';

export class News extends Component {

  static defaultProps = {
    country:"in",
    category:"general",
    pageSize:15,
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  }
    
    constructor() {
        super()
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
        
    }

    // async updateNews () { 
    //   this.props.setProgress(10)
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&pageSize=
    //   ${this.props.pageSize}&page=${this.state.page}&category=${this.props.category}&apikey = ${this.props.apiKey} `
    //   this.props.setProgress(30)
    //   this.setState({loading:true})
    //   let data = await fetch(url)
    //   this.props.setProgress(50)
    //   let parsedData = await data.json()
    //   this.props.setProgress(70)
    //   this.setState({ 
    //     articles: parsedData.articles,
    //     totalResults: parsedData.totalResults,
    //     loading: false
    //   })
    //   document.title= `News-${this.props.category}`
    //   this.props.setProgress(100)
    // }

    
    
    // handelNext = async() => {
      //   this.setState({page: this.state.page+1});
      //   this.updateNews();
      //   console.log("next",this.state.page)
      
      // }
      // handelPrevious = async() => {
        //   this.setState({page: this.state.page-1});
        //   this.updateNews();
        //   console.log("prev",this.state.page)
        // }
        
      async componentDidMount() {
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&pageSize=
        ${this.props.pageSize}&page=${this.state.page}&category=${this.props.category}&apikey=${this.props.apiKey}`
        this.props.setProgress(30)
        this.setState({loading:true})
        let data = await fetch(url)
        this.props.setProgress(50)
        let parsedData = await data.json()
        this.props.setProgress(70)
        this.setState({ 
          articles: parsedData.articles,
          totalResults: parsedData.totalResults,
          loading: false
        })
        document.title= `News-${this.props.category}`
        this.props.setProgress(100)
      }


    handelHasMore = async() => {
      // this.setState({page: this.state.page+1});
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&pageSize=
      ${this.props.pageSize}&page=${this.state.page+1}&category=${this.props.category}&apikey=${this.props.apiKey}`
      this.setState({loading:true})
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({ 
        page: this.state.page+1,
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false
      })
    }
    

  render() {   
    return (
      <>
      <div className="container my-3">
        <h1 className="text-center">News-- Top {this.props.category} Headlines</h1>

                <div className="container">
                <div className='row'>
                
                  {this.state.articles.map((element) => {
                      return ( <div className='col-md-4' key = {element.url}>
                          <NewsItem title={element.title? element.title:""} description={element.description? element.description:"No Description"}
                              imageUrl={element.urlToImage} newsUrl={element.url} authorName={element.author} timeDate={element.publishedAt} source={element.source.name} />
                      </div>)
                  })}    
                </div>
              </div>
              
        <div className='container d-flex justify-content-center'>
            {/* <button disabled={this.state.page<=1} className="btn btn-outline-success m-2" onClick={this.handelPrevious}  >&larr; Previous</button> */}
            <button disabled={this.state.articles.length === this.state.totalResults} className="btn btn-outline-success m-2" onClick={this.handelHasMore}  >Load More</button>
            {/* <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-outline-success m-2" onClick={this.handelNext}  >Next &rarr;</button> */}
        </div>
      </div>
        
      </>
    )
  }
}

export default News 