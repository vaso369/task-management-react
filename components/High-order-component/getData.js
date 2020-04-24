import React, { useEffect, useState } from 'react';
import axios from 'axios';

//const POSTS_SERVICE_URL = "https://jsonplaceholder.typicode.com/posts";

const withData = (url) => (WrappedComponent) => (moreProps) => {
  const [data, setData] = useState({ result: [], isFetching: false });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setData({ ...data, isFetching: true });
        const response = await axios.get(url);
        setData({
          ...data,
          result: response.data.slice(0, 5),
          isFetching: false,
        });
      } catch (e) {
        console.log(e);
        setData({ ...data, isFetching: false });
      }
    };
    fetchUsers();
  }, []);

  return (
    <WrappedComponent
      data={data.result}
      isFetching={data.isFetching}
      {...moreProps}
    />
  );
};

export default withData;
