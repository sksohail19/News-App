// News.js
import React, { Component } from 'react';
import NewsItems from './NewsItems';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 10,
    page: 1,
    type: '',
    category: '',
    query: 'india'
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    type: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
    query: PropTypes.string,
    setProgress: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
  }

  componentDidMount() {
    this.fetchNews();
  }

  buildUrl = (page) => {
    const { type, apiKey, pageSize, country, category, query } = this.props;
    if (type === 'everything') {
      return `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    } else if (type === 'top-headlines' && category) {
      return `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    } else {
      return `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    }
  };

  fetchNews = async () => {
    const { page } = this.state;
    const url = this.buildUrl(page);
    this.props.setProgress(10);
    this.setState({ loading: true });

    try {
      const response = await fetch(url);
      this.props.setProgress(50);
      const parsedData = await response.json();

      this.setState({
        articles: Array.isArray(parsedData.articles) ? parsedData.articles : [],
        totalResults: parsedData.totalResults || 0,
        loading: false
      });
      this.props.setProgress(100);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      this.setState({ articles: [], loading: false });
      this.props.setProgress(100);
    }
  };

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    const url = this.buildUrl(nextPage);

    try {
      const response = await fetch(url);
      const parsedData = await response.json();

      this.setState((prevState) => ({
        articles: [...prevState.articles, ...(parsedData.articles || [])],
        totalResults: parsedData.totalResults || prevState.totalResults,
        page: nextPage
      }));
    } catch (error) {
      console.error('Failed to load more news:', error);
    }
  };

  render() {
    const { articles, loading, totalResults } = this.state;

    return (
      <div className="container my-4">
        <h2 className="mb-4">News Feed</h2>

        {loading && (
          <div className="row">
            {Array.from({ length: 10 }).map((_, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <Skeleton height="30vh" borderRadius="10px" />
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <InfiniteScroll
            dataLength={articles.length}
            next={this.fetchMoreData}
            hasMore={articles.length < totalResults}
            loader={<div className="row">
            {Array.from({ length: 10 }).map((_, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <Skeleton height="30vh" borderRadius="10px" />
              </div>
            ))}
          </div>}
          >
            <div className="row">
              {articles.map((element) => (
                <div className="col-md-4 mb-3" key={element.url}>
                  <NewsItems
                    title={element.title ? element.title.slice(0, 45) : ''}
                    description={element.description ? element.description.slice(0, 55) : ''}
                    urlToImage={
                      element.urlToImage ||
                      'https://static.vecteezy.com/system/resources/previews/001/234/420/non_2x/breaking-news-on-mesh-background-vector.jpg'
                    }
                    url={element.url}
                    author={element.author || 'Unknown'}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    );
  }
}

export default News;
