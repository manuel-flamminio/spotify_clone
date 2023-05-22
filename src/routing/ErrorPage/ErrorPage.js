import { useRouteError } from "react-router-dom";
import classes from "./ErrorPage.module.css";

const ErrorPage = () => {
  const error = useRouteError();

  let message = null;
  if (error.response)
    message =
      typeof error.response.data === "string"
        ? error.response.data
        : error.message;
  else message = `${error.status} ${error.statusText}`;

  return (
    <div className={classes.ErrorContainer}>
      <h1 className={classes.Title}>Oops! an error occurred!</h1>
      <h2 className={classes.Message}>{message}</h2>
    </div>
  );
};

export default ErrorPage;
