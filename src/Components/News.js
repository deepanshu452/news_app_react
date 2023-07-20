import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types';
import Spinner from './Spinner'

export class News extends Component {

  static defaultProps = {
    country:"in",
    category:"general",
    pageSize:8,
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

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&pageSize=${this.props.pageSize}&page=${this.state.page}
                      &category=${this.props.category}&apiKey=83bc4c8c56c6467a90ec6900dd94a637`
        this.setState({loading: true})
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({ 
          articles: parsedData.articles,
          totalResults: parsedData.totalResults,
          loading:false
        })
        console.log(parsedData.totalResults)
    }

    async updateNews () {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&pageSize=
      ${this.props.pageSize}&page=${this.state.page+1}&category=${this.props.category}&apiKey=83bc4c8c56c6467a90ec6900dd94a637`
        this.setState({loading:true})
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({ 
          articles: parsedData.articles,
          totalResults: parsedData.totalResults,
          loading: false
        })
        console.log("Update news",this.state.page)

    }

    handelNext = async() => {
      this.setState({page: this.state.page+1});
      this.updateNews();
      console.log("next",this.state.page)

    }
    handelPrevious = async() => {
      this.setState({page: this.state.page-1});
      this.updateNews();
      console.log("prev",this.state.page)
    }
    

  render() {   
    return (
      <>
      <div className="container my-3">
        <h1 className="text-center">News-- Top Headlines</h1>
        {this.state.loading? <Spinner/>:
        <div className='row'>
            {this.state.articles? this.state.articles.map((element) => {
                 return ( <div className='col-md-4' key = {element.url}>
                    <NewsItem title={element.title? element.title:""} description={element.description? element.description:"No Description"}
                        imageUrl={element.urlToImage} newsUrl={element.url}   />
                </div>)
            }): []}    
        </div>
        }
        <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page<=1} className="btn btn-outline-success m-2" onClick={this.handelPrevious}  >&larr; Previous</button>
            <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-outline-success m-2" onClick={this.handelNext}  >Next &rarr;</button>
        </div>
      </div>
        
      </>
    )
  }
}

export default News 