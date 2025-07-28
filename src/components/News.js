import React, { Component } from 'react';
import NewsItems from './NewsItems';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PropTypes from 'prop-types';

export class News extends Component {
  static default = {
    country: "in",
    pageSize: 10,
    category: "general",
  }
  
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor() {
    super();
    console.log("Hello, I am a constructor from the News component");
    this.state = {
      articles: [],
      loading: true,
      page: 1, // Added `page` state
      
    };
  }

  async componentDidMount() {
    await this.fetchNews();
  }

  fetchNews = async () => {
    const { page } = this.state;
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=a626e591e85a4c618f76e0ae74939e9f&page=${page}&pageSize=10`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, loading: false });
  };

  handlePreviousButton = async () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      this.fetchNews // Callback to fetch news after updating state
    );
  };

  handleNextButton = async () => {
    
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      this.fetchNews,
       // Callback to fetch news after updating state
    );
  };

  
  render() {
    return (
      <div className="container my-4">
        {this.state.loading && <Skeleton count={3} height={"30vh"} boarderRadius={"10px"} enableAnimation={true}/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItems
                  title={element.title ? element.title.slice(0, 30) : ""}
                  description={element.description ? element.description.slice(0, 55) : ""}
                  urlToImage={element.urlToImage || "https://static.vecteezy.com/system/resources/previews/001/234/420/non_2x/breaking-news-on-mesh-background-vector.jpg"}
                  url={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
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
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 10)}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
