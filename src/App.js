import './App.css';
import { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pageSize = 6;
  state = {
    progress: 0
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  }

  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<News setProgress={this.setProgress} key="home" pageSize={this.pageSize} country="in" category="general" />}
            />
            <Route
              path="/business"
              element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business" />}
            />
            <Route
              path="/entertainment"
              element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />}
            />
            <Route
              path="/general"
              element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" />}
            />
            <Route
              path="/health"
              element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health" />}
            />
            <Route
              path="/science"
              element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science" />}
            />
            <Route
              path="/sports"
              element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports" />}
            />
            <Route
              path="/technology"
              element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology" />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
