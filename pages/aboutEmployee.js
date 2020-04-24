import React, { useEffect } from 'react';
import { useStateGlobal, useDispatchState } from '../src/GlobalState';
import Logout from '../components/Logout/Logout';
import Head from 'next/head';
import UserProfile from '../components/User/UserProfile';
import Sidebar from '../components/Sidebar/Sidebar';
import Paper from '../components/Paper/Paper';
import AboutEmployee from './../components/AboutEmployee/AboutEmployee';
// IF LOCAL STORAGE IS NOT EMPTY
import { hydrateStateWithLocalStorage } from '../components/LocalStorage/LocalStorage';

const aboutEmployee = () => {
  const globalState = useStateGlobal();
  const dispatch = useDispatchState();
  useEffect(() => {
    hydrateStateWithLocalStorage(globalState, dispatch);
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>Boss dashboard</title>
      </Head>
      <div>
        <Sidebar />
        <Paper>
          <AboutEmployee />
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
export default aboutEmployee;
