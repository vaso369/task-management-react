import React from 'react';
import BackgroundImage from '../../assets/task-management.svg';

const Background = () => {
  return (
    <div id="background-image">
      <img src={BackgroundImage} alt="background-image-home" />
      <style jsx>{`
        #background-image {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default Background;
