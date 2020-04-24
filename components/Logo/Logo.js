import React from 'react';

const Logo = () => {
  return (
    <div id="logo">
      <img
        src={require('../../assets/TMSLogo.svg')}
        alt="logo-task-management-system"
      />
      <style jsx>{`
        #logo {
          width: 18%;
          height: 22vh;
          position: absolute;
          top: 40%;
          right: 1.5%;
        }
      `}</style>
    </div>
  );
};
export default Logo;
