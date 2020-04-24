import React from 'react';
import LineUserChart from '../UserGraphs/LineUserGraph';
import PieChartUser from './../UserGraphs/PieUserGraph';

const UserGraphs = () => {
  return (
    <div style={{ paddingTop: '3%', display: 'flex' }}>
      <LineUserChart />
      <PieChartUser />
    </div>
  );
};

export default UserGraphs;
