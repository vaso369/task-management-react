import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis } from 'recharts';


const data = [
  {
    name: 'January',
    uv: 40,
    tasks: 88,
    amt: 24,
  },
  {
    name: 'February',
    uv: 30,
    tasks: 45,
    amt: 22,
  },
  {
    name: 'March',
    uv: 20,
    tasks: 65,
    amt: 22,
  },
  {
    name: 'April',
    uv: 27,
    tasks: 65,
    amt: 20,
  },
];

const getIntroOfPage = (label) => {

  if (label === 'January') {
    return "Number of finished tasks";
  }
  if (label === 'February') {
    return "Number of finished tasks";
  }
  if (label === 'March') {
    return "Number of finished tasks";
  }
  if (label === 'April') {
    return 'Number of finished tasks';
  }
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
      </div>
    );
  }

  return null;
};

const LineUserChart = () => {

  const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#00C49F'];
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey="tasks" barSize={20} fill="#8884d8">
        {data.map((entry, index) => {
          const color = COLORS[index];
          return <Cell fill={color} />;
        })}
      </Bar>
    </BarChart>
  );
};
export default LineUserChart;
