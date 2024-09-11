import React, { Component } from 'react';

export default class NewsItem extends Component {
  render() {
    const {
      title,
      description,
      imageUrl,
      newsUrl,
      author,
      date,
      source
    } = this.props;

    // Function to render default image if imageUrl is not provided
    const renderImage = () => {
      return !imageUrl ? "https://www.livemint.com/lm-img/img/2024/04/26/1600x900/Stock_market_today_Nifty_50_Stocks_to_Buy_or_sell_1714096294065_1714096294228.png" : imageUrl;
    };

    // Function to format date
    const formatDate = () => {
      return new Date(date).toGMTString();
    };

    return (
      <div className='my-3'>
        <div className="card">
        <div style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0"
          }}>
            <span className="badge rounded-pill bg-danger" style={{ left: "90%", zIndex: "1" }}>
              {source}
            </span>
          </div>
          <img src={renderImage()} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {!author ? "Unknown" : author} on {formatDate()}
              </small>
            </p>
            <a href={newsUrl} className="btn btn-primary" target='_blank' rel="noreferrer">Read More</a>
          </div>
        </div>
      </div>
    );
  }
}
