import React, { useEffect, useState } from 'react';
import axios from 'axios';

//const POSTS_SERVICE_URL = "https://jsonplaceholder.typicode.com/posts";

const postData = (url, obj) => (WrappedComponent) => (moreProps) => {
  const [error, setError] = useState({ hasError: false, isFetching: false });
  const [data, setData] = useState({ result: [], isFetching: false });

  const fetchUsers = async () => {
    try {
      setData({ ...data, isFetching: true });
      const response = await axios.post(url);
      console.log(response);
      setData({
        ...data,
        result: response.data,
        isFetching: false,
      });
    } catch (e) {
      console.log(e);
      setData({ hasError: true, isFetching: false });
    }
  };
  fetchUsers();
  return (
    <WrappedComponent
      data={data.result}
      error={error.hasError}
      isFetching={error.isFetching}
      {...moreProps}
    />
  );
};

export default postData;
