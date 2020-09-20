import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  clearErrors,
  postPart,
  closeAddPart,
} from "../../redux/actions/part-actions";

const styles = (theme: any) => ({
  ...theme.profile,
  ...theme.form,
});

export class AddPart extends Component<any, any, any> {
  static propTypes: {
    postPart: PropTypes.Validator<(...args: any[]) => any>;
    clearErrors: PropTypes.Validator<(...args: any[]) => any>;
    closeAddPart: PropTypes.Validator<(...args: any[]) => any>;
    UI: PropTypes.Validator<object>;
  };
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      quantity: 0,
      errors: {},
      open: false,
    };
  }
  componentWillReceiveProps(nextProps: any) {
    this.setState({ open: nextProps.UI.open });
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", errors: {} });
    }
  }
  handleClose = () => {
    this.props.clearErrors();
    this.props.closeAddPart();
  };
  handleSubmit = () => {
    this.props.postPart({
      name: this.state.name,
      quantity: this.state.quantity,
    });
  };
  handleChange = (event: any) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };
  render() {
    const { errors, name, quantity } = this.state;
    const {
      classes,
      UI: { open, loading },
    } = this.props;
    return (
      <Fragment>
        <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Post a scream!</DialogTitle>
          <DialogContent>
            <div className={classes.flexScream}>
              <form
                noValidate
                autoComplete="off"
                onSubmit={this.handleSubmit}
                onChange={this.handleChange}
              >
                <div className={classes.field}>
                  <TextField
                    id="name"
                    type="text"
                    label="Part name"
                    placeholder="912-A2 M3x50"
                    helperText={errors.name}
                    error={errors.name ? true : false}
                    value={name}
                    fullWidth
                  />
                </div>
                <div className={classes.field}>
                  <TextField
                    id="quantity"
                    type="number"
                    label="Part quantity"
                    helperText={errors.quantity}
                    error={errors.quantity ? true : false}
                    value={quantity}
                    fullWidth
                  />
                </div>
              </form>
            </div>
          </DialogContent>
          <DialogActions className={classes.flexComment}>
            <Button
              color="secondary"
              onClick={this.handleClose}
              variant="contained"
            >
              Cancel
            </Button>
            <span className={classes.grow}></span>
            <Button
              color="primary"
              disabled={loading}
              variant="contained"
              onClick={this.handleSubmit}
            >
              {loading ? (
                <CircularProgress className={classes.progress} size={25} />
              ) : (
                "Add part"
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

AddPart.propTypes = {
  postPart: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  closeAddPart: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
  UI: state.UI,
});

const mapActionsToProps = { postPart, clearErrors, closeAddPart };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(AddPart));
