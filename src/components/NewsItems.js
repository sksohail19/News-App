import React, { Component } from 'react'

export class NewsItems extends Component {
  
  render() {
    var {title, description, urlToImage, url} = this.props;
    return (
        <div className="card" style="width: 18rem;">
        <img src={urlToImage} className="card-img-top" alt= {this.props.title}/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href= {url} className="btn btn-primary">Read More</a>
        </div>
      </div>
    )
  }
}

export default NewsItems
