import React from 'react';

export const BuildStatus = ({ status }) => {
  return (
    <div className={'status ' + (status.result === 'success' ? 'success' : 'failed')}>
      {status.result !== 'success' && status.testResult && status.testResult.failed > 0 ?
        <div className='test-result'>
          <div>
            <div className="failed-tests">{status.testResult.failed}</div>
            <div>tests failed</div>
          </div>
          <div className='owner'>
            { status.owner? 'owner: ' + status.owner : ''}
          </div>
        </div>
        : <div />
      }
    </div>
  )
}

export default BuildStatus;