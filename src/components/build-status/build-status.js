import React from 'react';
import StatusEditor from '../status-editor';

export const BuildStatus = ({ status, onStatusUpdated, onDelete }) => {
  return (
    <div className={'status ' + (status.testResult && status.testResult.failed && status.testResult.failed > 0 ? 'failed' : 'success')}>
      <div className='title'>{status.title}</div>
      {status.testResult && status.testResult.failed > 0 ?
        <div className='test-result'>
          <div>
            <div className="failed-tests">{status.testResult.failed}</div>
            <div>tests failed</div>
          </div>
          <div className='owner'>
            {status.owner ? 'owner: ' + status.owner : ''}
          </div>
        </div>
        : <div />
      }
      <StatusEditor status={status} onStatusUpdated={onStatusUpdated} />
      <div className="btn" onClick={() => onDelete(status)}>X</div>
    </div>
  )
}

export default BuildStatus;