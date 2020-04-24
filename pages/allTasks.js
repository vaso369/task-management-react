import React, { useEffect } from 'react';
import Head from 'next/head';
import { useStateGlobal, useDispatchState } from '../src/GlobalState';
import UserProfile from '../components/User/UserProfile';
import Sidebar from '../components/Sidebar/Sidebar';
import Paper from '../components/Paper/Paper';
import AllTasks from './../components/AllTasks/AllTasks';
// IF LOCAL STORAGE IS NOT EMPTY
import { hydrateStateWithLocalStorage } from '../components/LocalStorage/LocalStorage';

const allTasks = () => {
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
          <AllTasks
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
export default allTasks;
