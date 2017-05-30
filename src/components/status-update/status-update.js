import React from 'react';

export class StatusUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editStatus: false
    };
  }

  render() {
    return (
      <div className='status-update'>
        {this.state.editStatus ?
          <StatusForm status={Object.assign({}, this.props.status)} onStatusUpdated={(status) => {
            this.props.onStatusUpdated(status);
            this.setState({ editStatus: false });
          }} />
          : <div><a className="btn" onClick={() => this.setState({ editStatus: true })}>Edit status</a></div>
        }
      </div>
    );
  }
}

export class StatusForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: props.status || {
        testResult: {}
      }
    }
  }

  componentDidReceiveProps(props) {
    console.log(props);
    this.setState({ status: props.status });
  }

  render() {
    return (
      <div className="status-form">
        <div>Build Result</div>
        <div>
          <select value={this.state.status.result}
            onChange={(e) => this.setState({ status: Object.assign({}, this.state.status, { result: e.target.value }) })} >
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div>Failed tests </div>
        <input type="number" value={this.state.status.testResult.failed}
          onChange={(e) => this.setState({ status: Object.assign({}, this.state.status, { testResult: { failed: e.target.value } }) })} />

        <div>Owner</div>
        <input type="text" value={this.state.status.owner}
          onChange={(e) => this.setState({ status: Object.assign({}, this.state.status, { owner: e.target.value }) })} />

        <button className="btn" onClick={() => this.props.onStatusUpdated(this.state.status)}>Done</button>

        <button className="btn close" onClick={() => this.props.onStatusUpdated(this.state.status)}>Close</button>

      </div>
    )
  }
}