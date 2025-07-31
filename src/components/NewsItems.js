import React, { Component } from 'react';

export class NewsItems extends Component {
  render() {
    const { title, description, urlToImage, url, author, date, source } = this.props;

    return (
      <div className="my-3">
        <p className="badge text-bg-primary text-center fs-6 mx-5 mb-1 p-2">{source}</p>
        <div
          className="card mx-auto h-100"
          style={{ maxWidth: '350px', height: '100%' }}
        >
          <img
            src={urlToImage}
            className="card-img-top"
            alt={title}
            style={{ height: '180px', objectFit: 'cover' }}
          />
          <div className="card-body d-flex flex-column justify-content-between" style={{ minHeight: '220px' }}>
            <div>
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}...</p>
            </div>
            <div>
              <a
                rel="noreferrer"
                href={url}
                target="_blank"
                className="btn btn-sm btn-dark"
              >
                Read More
              </a>
              <p className="card-text mt-2 mb-0">
                <small className="text-muted">
                  By {author || 'Unknown'} on{' '}
                  {new Date(date).toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItems;
