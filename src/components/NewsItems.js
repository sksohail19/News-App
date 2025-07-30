import React, { Component } from 'react'

export class NewsItems extends Component {
  
  render() {
    var {title, description, urlToImage, url} = this.props;
    return (
      <div className="my-3">
        <p className="badge text-bg-primary text-center w-100 mb-1 p-2 justify-align-center">{this.props.source}</p>
          <div className="card" >
              <img src={urlToImage} className="card-img-top" alt={title}/>
              <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text">{description}...</p>
                  <a rel="noreferrer" href={url} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                  <p className="card-text mt-3">
                  <small className="text-muted">
                    By {this.props.author || "Unknown"} on{" "}
                    {new Date(this.props.date).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </small>
                </p>

              </div>
          </div>
      </div>
    )
  }
}

export default NewsItems
