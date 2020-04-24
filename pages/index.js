import React from 'react';

import Background from '../components/Background/Background';
import Login from '../components/Login/Login';
import MessageAuth from '../components/MessageAuth/MessageAuth';
import Logo from '../components/Logo/Logo';
import Head from 'next/head';

const Index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Home page</title>
      </Head>
      <div id="content">
        <Background />
        <div id="form-items">
          <Login />
          <Logo />
          <MessageAuth />
        </div>
      </div>
      <div id="documentation">
        <a href="https://task-sys-laravel.herokuapp.com/Documentacija.pdf">
          Documentation
        </a>
      </div>
      <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
        }
        #content {
          width: 100%;
          height: 100%;
          display: flex;
        }
        #form-items {
          justify-content: flex-start;
        }
        #documentation {
          width: 20%;
          position: absolute;
          bottom: 2%;
          right: 12%;
          color: white;
        }
      `}</style>
    </React.Fragment>
  );
};

export default Index;
