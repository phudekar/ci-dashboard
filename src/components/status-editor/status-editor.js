import React from 'react';
import { TextInput } from '../form-components';

export class StatusEditor extends React.Component {
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
          <StatusForm status={Object.assign({ testResult: { failed: 0 } }, this.props.status)} onStatusUpdated={(status) => {
            this.props.onStatusUpdated(status);
            this.setState({ editStatus: false });
          }} />
          : <div className="btn" onClick={() => this.setState({ editStatus: true })}>{this.props.label ? this.props.label : 'Edit status'}</div>
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

        <TextInput label="Title" value={this.state.status.title}
          onChange={(value) => this.setState({ status: Object.assign({}, this.state.status, { title: value }) })} />

        <TextInput label="Failed Tests" value={this.state.status.testResult.failed}
          onChange={(value) => this.setState({ status: Object.assign({}, this.state.status, { testResult: { failed: value } }) })} />

        <TextInput label="Owner" value={this.state.status.owner}
          onChange={(value) => this.setState({ status: Object.assign({}, this.state.status, { owner: value }) })} />

        <button className="btn" onClick={() => this.props.onStatusUpdated(this.state.status)}>Done</button>

        <button className="btn close" onClick={() => this.props.onStatusUpdated(this.state.status)}>Close</button>

      </div>
    )
  }
}

export default StatusEditor