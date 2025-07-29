import React, { Component } from 'react';
import NewsItems from './NewsItems';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 10,
    page: 1
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    type: PropTypes.string,
    apiKey: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    console.log('Hello, I am a constructor from the News component');
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
  }

  async componentDidMount() {
    await this.fetchNews();
  }

  fetchNews = async () => {
    const { page } = this.state;
    const { type, apiKey, pageSize, country, category } = this.props;

    let url = '';
    if (type === 'everything') {
      // You can replace 'india' with a dynamic query prop if needed
      url = `https://newsapi.org/v2/everything?q=india&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    } else if (type === 'top-headlines' && category) {
      url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    } else {
            url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    }

    this.setState({ loading: true });

    try {
      const response = await fetch(url);
      const parsedData = await response.json();
      console.log(parsedData);
      this.setState({
        articles: Array.isArray(parsedData.articles) ? parsedData.articles : [],
        totalResults: parsedData.totalResults || 0,
        loading: false
      });
    } catch (error) {
      console.error("Failed to fetch news:", error);
      this.setState({ articles: [], loading: false });
    }
  };

  handlePreviousButton = () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      this.fetchNews
    );
  };

  handleNextButton = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      this.fetchNews
    );
  };

  render() {
    const { articles, loading, page, totalResults } = this.state;

    return (
      <div className="container my-4">
        {loading && (
          <Skeleton
            count={3}
            height="30vh"
            borderRadius="10px"
            enableAnimation={true}
          />
        )}

        <div className="row">
          {!loading &&
            Array.isArray(articles) &&
            articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItems
                  title={element.title ? element.title.slice(0, 45) : ''}
                  description={element.description
                    ? element.description.slice(0, 55)
                    : ''}
                  urlToImage={
                    element.urlToImage ||
                    'https://static.vecteezy.com/system/resources/previews/001/234/420/non_2x/breaking-news-on-mesh-background-vector.jpg'
                  }
                  url={element.url}
                />
              </div>
            ))}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousButton}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextButton}
            disabled={page + 1 > Math.ceil(totalResults / this.props.pageSize)}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
