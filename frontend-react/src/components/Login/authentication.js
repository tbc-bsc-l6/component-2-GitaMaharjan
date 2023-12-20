import axios from "axios";
import React, { Fragment, useEffect } from "react";

const authMe = () => {
  let url = "http://127.0.0.1:8000/api/authentication";
  useEffect(() => {
    axios.get(url).then((response) => {
      console.log(response);
    });
  }, []);
  return <Fragment></Fragment>;
};

export default authMe;
