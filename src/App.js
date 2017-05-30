import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BuildStatus from './components/build-status';
import StatusUpdate from './components/status-update';

class App extends Component {

  constructor() {
    super();

    this.state = {
      status: {
        result: 'failed',
        testResult: {
          failed: 10
        },
        owner: ''
      }
    }
  }

  render() {
    return (
      <div className="App container">
        <BuildStatus status={this.state.status} />
          <StatusUpdate status={this.state.status} onStatusUpdated={(status) => this.setState({ status: status })} />
      </div>
    );
  }
}

export default App;
