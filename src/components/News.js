import React, { Component } from 'react';
import NewsItems from './NewsItems';

export class News extends Component {
  constructor() {
    super();
    console.log("Hello, I am a constructor from the News component");
    this.state = {
      articles: [],
      loading: false,
    };
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=a626e591e85a4c618f76e0ae74939e9f";
    let data = await fetch(url); // Added `await` here
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
  }

  render() {
    return (
      <div className="container my-3">
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItems
                  title={element.title ? element.title.slice(0,45) : ""}
                  description={element.description ? element.description.slice(0,88) : ""}
                  urlToImage={element.urlToImage ? element.urlToImage : ""}
                  url={element.url}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default News;
