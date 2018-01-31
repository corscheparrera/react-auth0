import React from "react";
import { Redirect } from "react-router-dom";
import isAuthenticated from "../Auth/isAuthenticated";

const Private = props =>
  isAuthenticated() ? (
    <div>
      <h2>Private Page</h2>
      <p>Hey, you’re logged in!</p>
    </div>
  ) : (
    // this will redirect to the /login path.
    // Information about the last location before
    // the redirect was done will be accessible by
    // the /private page component via this.props.location.state
    <Redirect
      to={{
        pathname: "/login",
        state: { from: props.location }
      }}
    />
  );

export default Private;
