import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { loginUser } from "../redux/actions/user-actions";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CircularProgress from "@material-ui/core/CircularProgress";
// import AppIcon from "../images/logo192.png";

const Link = require("react-router-dom").Link;

const styles = (theme: any) => ({
  ...theme.form,
});

interface User {
  email: String;
  password: String;
  errors: any;
  showPassword: Boolean;
  [x: number]: any;
}

class login extends Component<any, User> {
  static propTypes: {
    classes: PropTypes.Validator<object>;
    loginUser: PropTypes.Validator<(...args: any[]) => any>;
    user: PropTypes.Validator<object>;
    UI: PropTypes.Validator<object>;
  };
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
      showPassword: false,
    };
  }
  // static getDerivedStateFromProps(nextProps, state) {
  //   if (nextProps.UI.errors) {
  //     state.errors = nextProps.UI.errors;
  //   }
  //   return null;
  // }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = async (event: any) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event: any) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleMouseDownPassword(event: any) {
    event.preventDefault();
  }
  render() {
    const { email, password, errors, showPassword } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    let showPass = showPassword ? <Visibility /> : <VisibilityOff />;

    return (
      <div className={classes.container}>
        <Container maxWidth="sm">
          <Paper className={classes.paper} elevation={3}>
            {/* <img src={AppIcon} alt="O" width={100} /> */}
            <Typography className={classes.title} variant="h4">
              Login
            </Typography>

            <form
              noValidate
              autoComplete="off"
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
            >
              <div className={classes.field}>
                <TextField
                  id="email"
                  type="email"
                  label="Email address"
                  placeholder="example@email.com"
                  helperText={errors.email}
                  error={errors.email ? true : false}
                  value={email}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton disabled={true}>
                          <AccountCircle />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className={classes.field}>
                <TextField
                  id="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  helperText={errors.password}
                  error={errors.password ? true : false}
                  value={password}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                        >
                          {showPass}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className={classes.button}>
                {errors.general && (
                  <Typography variant="body2" className={classes.customError}>
                    {errors.general}
                  </Typography>
                )}
                <Button
                  color="secondary"
                  disabled={loading}
                  variant="contained"
                  type="submit"
                >
                  {loading ? (
                    <CircularProgress className={classes.progress} size={25} />
                  ) : (
                      "Login"
                    )}
                </Button>
                <div className={classes.signup}>
                  <small>
                    Don't have an account? sign up{" "}
                    <Link to="/signup">here.</Link>
                  </small>
                  <br />
                  <br />
                  <small>
                    Try it out using:
                    <br />
                    email: user@email.com
                    <br />

                    password: passowrd
                  </small>
                </div>
              </div>
            </form>
          </Paper>
        </Container>
      </div>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
