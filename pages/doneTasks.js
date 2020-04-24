import Head from 'next/head';
import React from 'react';
import Paper from '../components/Paper/Paper';
import Sidebar from '../components/Sidebar/Sidebar';
import UserProfile from '../components/User/UserProfile';
import { useStateGlobal } from '../src/GlobalState';
import DoneTasks from './../components/DoneTasks/DoneTasks';

const doneTasks = () => {
  const state = useStateGlobal();
  return (
    <React.Fragment>
      <Head>
        <title>Boss dashboard</title>
      </Head>
      <div>
        <Sidebar />
        <Paper>
          <DoneTasks
            id={state.loggedIn?state.user.id:0}
            idRole={state.loggedIn?state.user.idPart:0}
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
export default doneTasks;
