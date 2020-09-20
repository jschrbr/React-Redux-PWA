import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

interface Auth {
  component: any;
  exact: any;
  path: string;
  authenticated: Boolean;
  offline: Boolean;
}

const AuthRoute = ({
  component: Component,
  authenticated,
  offline,
  exact,
  path,
  ...rest
}: Auth) => {
  return (

    <Route
      {...rest}
      render={(props) => {
        if (offline)
          return path === "/" ? <Component {...props} /> : <Redirect to="/" />
        else
          return (
            authenticated && path !== "/" ? <Redirect to="/" /> : !authenticated && path === "/" ? <Redirect to="/login" /> : <Component {...props} />)
      }
      }
    />

  )
};

const mapStateToProps = (state: any) => ({
  authenticated: state.user.authenticated,
  offline: state.network.showOfflineBanner,

});

export default connect(mapStateToProps)(AuthRoute);
