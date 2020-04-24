import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {
  return (
    <React.Fragment>
      <div
        id="loading"
        style={{
          backgroundColor: 'grey',
          opacity: 0.4,
          width: '100%',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress color="inherit" />
      </div>
    </React.Fragment>
  );
};

export default Loading;
