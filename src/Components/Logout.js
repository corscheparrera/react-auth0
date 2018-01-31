import React, { Component } from "react";
import { Redirect } from "react-router-dom";

//  <Logout> retire  toutes les sessions qui sont settées à l'authentication
// et redirige le user vers le /login page
class Logout extends Component {
  constructor() {
    super();
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  render() {
    return (
      // this will redirect to the /login path.
      // Information about the last location before
      // the redirect was done will be accessible by
      // the /private page component via this.props.location.state
      <Redirect
        to={{
          pathname: "/login",
          state: { from: this.props.location }
        }}
      />
    );
  }
}

export default Logout;
