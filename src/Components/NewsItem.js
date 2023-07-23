import React, { Component } from 'react'

export class NewsItem extends Component {
  style = {
    position: 'absolute',
  }
  render() {
    let {title, description, imageUrl,newsUrl,authorName, timeDate, source} = this.props
    return (
      <div className="my-2 mx-4">
        <div className="card">
            <img src={imageUrl? imageUrl: "No Image Available"} className="card-img-top" alt="No Image Available" />
            <div className="card-body">
                <h5 className="card-title">{title} <strong>by--{source}</strong></h5>
                <p className="card-text">{description}</p> 
                <p className="card-text"><small className="text-muted">By {authorName} on {timeDate}</small></p>
                <a href= {newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">Read more</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
