import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BuildStatus from './components/build-status';
import StatusEditor from './components/status-editor';

class App extends Component {

  constructor() {
    super();

    this.state = {
      rows: [{
        id: 0,
        results: [{
          id: 0,
          title: 'Title 1',
          testResult: {
            failed: 10
          },
          owner: ''
        },
        {
          id: 1,
          title: 'Title 2',
          owner: ''
        }
        ]
      }]
    }
  }

  updateStatus(status, statusId, rowId) {
    let rows = this.state.rows;
    let rowIndex = rows.findIndex(r => r.id == rowId);

    let results = rows[rowIndex].results;
    let resultIndex = results.findIndex(r => r.id == statusId);

    results[resultIndex] = Object.assign({}, status);
    rows[rowIndex].results = results;
    this.setState({ rows: rows });
  }

  deleteStatus(statusId, rowId) {
    let rows = this.state.rows;
    let rowIndex = rows.findIndex(r => r.id == rowId);

    let results = rows[rowIndex].results;
    let resultIndex = results.findIndex(r => r.id == statusId);

    results.splice(resultIndex, 1);
    rows[rowIndex].results = results;
    this.setState({ rows: rows })
  }

  deleteRow(rowId) {
    let rows = this.state.rows
    let rowIndex = rows.findIndex(r => r.id == rowId);

    rows.splice(rowIndex, 1);
    this.setState({ rows: rows });
  }

  addRow() {
    let rows = this.state.rows;
    this.setState({ rows: rows.concat([{ id: new Date().getTime(), results: [] }]) });
  }

  addStatus(status, rowId) {
    if (status.title) {
      let rows = this.state.rows;
      let row = rows.find(r => r.id == rowId);

      let results = row.results;

      status.id = new Date().getTime();
      row.results = results.concat([status])

      this.setState({ rows: rows });
    }
  }

  isFailed() {
    return this.state.rows.reduce((result, row) => {
      return result || row.results.reduce((result, status) => {
        return result || status.testResult.failed > 0;
      }, false)
    }, false)
  }

  render() {
    return (
      <div className={"App container " + (this.isFailed() ? 'failed' : 'success')} >

        {
          this.state.rows.map(row => {
            return (
              <div key={row.id} className="result-row">
                {
                  row.results.map(status =>
                    <BuildStatus key={status.id} status={status} onStatusUpdated={(status) => this.updateStatus(status, status.id, row.id)}
                      onDelete={() => this.deleteStatus(status.id, row.id)} />
                  )
                }
                <div className="row-actions">
                  <StatusEditor label="Add" onStatusUpdated={(status) => this.addStatus(status, row.id)} />
                  <div className="btn" onClick={() => this.deleteRow(row.id)}>Remove</div>
                </div>
              </div>
            )
          })
        }
        < div className="row-actions" >
          <div className="btn" onClick={() => this.addRow()}>Add Row</div>
        </div >
      </div >
    );
  }
}

export default App;
