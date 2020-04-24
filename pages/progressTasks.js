import React from 'react';
import { useStateGlobal } from '../src/GlobalState';
import Logout from '../components/Logout/Logout';
import Head from 'next/head';
import UserProfile from '../components/User/UserProfile';
import Sidebar from '../components/Sidebar/Sidebar';
import Paper from '../components/Paper/Paper';
import ProgressTasks from './../components/ProgressTasks/ProgressTasks';

const progressTasks = () => {
  const globalState = useStateGlobal();
  return (
    <React.Fragment>
      <Head>
        <title>Boss dashboard</title>
      </Head>
      <div>
        <Sidebar />
        <Paper>
          <ProgressTasks
            id={globalState.user.id}
            idRole={globalState.user.idPart}
            itemsPerPage={5}
          />
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
export default progressTasks;
