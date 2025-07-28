import React, { Component } from 'react'

export class NewsItems extends Component {
  
  render() {
    var {title, description, urlToImage, url} = this.props;
    return (
      <div className="my-3">
          <div className="card" >
              <img src={urlToImage} className="card-img-top" alt={title}/>
              <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text">{description}...</p>
                  <a rel="noreferrer" href={url} target="_blank" className="btn btn-sm btn-dark">Read More</a>
              </div>
          </div>
      </div>
    )
  }
}

export default NewsItems
