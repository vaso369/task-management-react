import React from "react";
import UserProfile from "../components/User/UserProfile";
import { useStateGlobal } from "../src/GlobalState";
import Sidebar from "../components/Sidebar/Sidebar";
import BossInfo from "../components/BossInfo/BossInfo";
import Paper from "../components/Paper/Paper";
import Head from "next/head";

const Employee = () => {
  const globalState = useStateGlobal();
  console.log(globalState);
  return (
    <React.Fragment>
      <Head>
        <title>Employee dashboard</title>
      </Head>
      <div>
        <Sidebar />
        <Paper />
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
export default Employee;
