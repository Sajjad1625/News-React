import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const { country, category, pageSize, setProgress } = props;
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    setLoading(true);
    setProgress(10);
  
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=0541d3ec9fcc4710bc0f42dd39e077e4&page=${page}&pageSize=${pageSize}`;
  
    try {
      const response = await fetch(url);
      setProgress(30);
      const data = await response.json();
      setProgress(70);
  
      // Filter out duplicate articles based on their URLs
      const newArticles = data.articles.filter((article) => {
        return !articles.some((existingArticle) => existingArticle.url === article.url);
      });
  
      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setTotalResults(data.totalResults);
      setPage(page + 1);
      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    updateNews();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h1 className="text-center">News - Top {capitalizeFirstLetter(category)} Headlines</h1>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={updateNews}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
        height={400}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>No more news to load</b>
          </p>
        }
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={element.title || ''}
                  description={element.description || ''}
                  imageUrl={element.urlToImage || ''}
                  newsUrl={element.url || ''}
                  author={element.author || ''}
                  date={element.publishedAt || ''}
                  source={element.source?.name || ''}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired
};

export default News;
