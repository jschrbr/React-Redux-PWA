import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import RefreshIcon from "@material-ui/icons/Refresh";
import SignalWifiOffIcon from "@material-ui/icons/SignalWifiOff";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logoutUser } from "../../redux/actions/user-actions";

const Link = require("react-router-dom").Link;

const styles = (theme: any) => ({
  ...theme.navBar,
});

export class NavBar extends Component<any, any> {
  static propTypes: {
    headline: PropTypes.Requireable<string>;
    network: PropTypes.Validator<object>;
    user: PropTypes.Validator<object>;
    logoutUser: PropTypes.Validator<(...args: any[]) => any>;
  };

  refreshPage = () => {
    window.location.reload(false);
  };

  logOut = () => {
    this.props.logoutUser();
  }

  render() {
    const {
      classes,
      headline,
      network: {
        showOfflineBanner,
        offlineLogs: [message],
      },
      user: {
        authenticated
      }
    } = this.props;

    const status = showOfflineBanner ? (
      <Tooltip title={message} placement="left">
        <IconButton color="inherit">
          <SignalWifiOffIcon />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title={"You're online, click to reload data"} placement="left">
        <IconButton color="inherit" onClick={this.refreshPage}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    );
    const auth = authenticated ?  <Tooltip title={message} placement="left">
    <IconButton color="inherit" onClick={this.logOut}>
      <ExitToAppIcon />
    </IconButton>
  </Tooltip> : ""
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <div className={classes.title}>
              <Button color="inherit" component={Link} to="/">
                <Typography variant="h6">{headline}</Typography>
              </Button>
            </div>
            <div>{auth}</div>
            <div>{status}</div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  headline: PropTypes.string,
  network: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => ({
  network: state.network,
  user: state.user
});

const mapActionsToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NavBar));
