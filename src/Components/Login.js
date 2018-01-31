import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Auth0Lock from "auth0-lock";
import { AUTH_CONFIG } from "../Auth/auth0-variables";
import logo from "../Auth/logo.png";

// Essentiellement, Login a 3 responsabilités :
// 1. Montrer le login form avec lock.show()
// 2. Débuter une session après l'authentification
// 3. Rediriger à /private après le début d'une session
class Login extends Component {
  lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
    auth: {
      redirect: false,
      responseType: "token id_token",
      sso: false
    },
    container: AUTH_CONFIG.container,
    theme: {
      logo: logo,
      primaryColor: "#31324F"
    },
    languageDictionary: {
      title: "Restricited area"
    }
  });

  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
    this.onAuthenticated();
  }

  onAuthenticated = () => {
    this.lock.on("authenticated", authResult => {
      let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );
      localStorage.setItem("access_token", authResult.accessToken);
      localStorage.setItem("id_token", authResult.idToken);
      localStorage.setItem("expires_at", expiresAt);
      this.lock.getUserInfo(authResult.accessToken, (err, profile) => {
        console.log(profile);
      });

      this.setState({ loggedIn: true });
    });
  };

  componentDidMount() {
    // Avoid showing Lock when hash is parsed.
    // if (!/access_token|id_token|error/.test(this.props.location.hash)) {
    //   this.lock.show();
    // }
    if (
      !this.state.loggedIn &&
      this.props.location.hash.indexOf("access_token") === -1
    ) {
      this.lock.show();
    }
  }

  render() {
    // Lock possède un state loggedIn. Initialement, il
    // affiche le login form pcq loggedIn est setté à fasle.
    //  MAIS le state update quand des session débute, et cela déclenche un
    // re-rendering et cette fois il affichera <Redirect>, lequel redirige vers / private après authentification
    // Lock possède par défault une option redirectUrl: l'url auquel on est redirigé après authentification.
    // on utilisera pas cette option puisque cela entraine un relaoding de la page, on laissera donc l'app handle la redirection

    const style = { marginTop: "32px" };
    return !this.state.loggedIn ? (
      <div>
        <h2>Login Page</h2>
        <div id={AUTH_CONFIG.container} style={style} />
      </div>
    ) : (
      // this will redirect to the /login path.
      // Information about the last location before
      // the redirect was done will be accessible by
      // the /private page component via this.props.location.state
      <Redirect
        to={{
          pathname: "/private",
          state: { from: this.props.location }
        }}
      />
    );
  }
}

export default Login;
