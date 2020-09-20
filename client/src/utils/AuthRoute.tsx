import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

interface Auth {
  component: any;
  exact: any;
  path: string;
  authenticated: Boolean;
}

const AuthRoute = ({
  component: Component,
  authenticated,
  exact,
  path,
  ...rest
}: Auth) => 
{
  return (

  <Route
    {...rest}
    render={(props) =>

      authenticated && path !== "/" ? <Redirect to="/" /> : path === "/" && !authenticated ?  <Redirect to="/login" />: <Component {...props} /> 
    }
  />
  
)};

const mapStateToProps = (state: any) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);
