
import React from "react";
import PageContent from "../components/UI/PageContent";
import { useRouteError } from "react-router-dom";
import Header from '../components/Layout/Header/header'

function ErrorPage() {
  const error = useRouteError();
  //   error.status = 500;

  let title = "An error occured";
  let message = "Something went wrong";

  if (error.status === 500) {
    // message = JSON.parse(error.data).message;
    message = error.data.message;
  }
  if (error.status === 404) {
    title = "Not Found";
    message = "Couldnt Find resource or page";
  }
  return (
    <>
    <Header></Header>
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
