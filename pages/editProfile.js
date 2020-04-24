import React from 'react';
import { useStateGlobal } from '../src/GlobalState';
import Logout from '../components/Logout/Logout';
import Head from 'next/head';
import UserProfile from '../components/User/UserProfile';
import Sidebar from '../components/Sidebar/Sidebar';
import Paper from '../components/Paper/Paper';
import EditProfile from './../components/EditProfile/EditProfile';

const editProfile = () => {
  const globalState = useStateGlobal();
  console.log(globalState);
  return (
    <React.Fragment>
      <Head>
        <title>Boss dashboard</title>
      </Head>
      <div>
        <Sidebar />
        <Paper>
          <EditProfile />
        </Paper>

        <UserProfile />

        <style jsx>{`
          div {
            height: 100vh;
            display: flex;
            justify-content: space-between;
            background: lightblue;
            margin: 0;
            padding: 0;
          }
          .info {
            display: flex;
            flex-direction: column;
          }
        `}</style>
      </div>
    </React.Fragment>
  );
};
export default editProfile;
