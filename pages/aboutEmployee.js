import Head from 'next/head';
import React, { useEffect } from 'react';
// IF LOCAL STORAGE IS NOT EMPTY
import { hydrateStateWithLocalStorage } from '../components/LocalStorage/LocalStorage';
import Paper from '../components/Paper/Paper';
import Sidebar from '../components/Sidebar/Sidebar';
import UserProfile from '../components/User/UserProfile';
import { useDispatchState, useStateGlobal } from '../src/GlobalState';
import AboutEmployee from './../components/AboutEmployee/AboutEmployee';

const aboutEmployee = () => {
  const state = useStateGlobal();
  const dispatch = useDispatchState();
  useEffect(() => {
    hydrateStateWithLocalStorage(state, dispatch);
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
