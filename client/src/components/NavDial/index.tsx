import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//MUI
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PrintIcon from "@material-ui/icons/Print";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import ListIcon from "@material-ui/icons/List";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";

import { NavTheme } from "../../utils/theme";
import { withStyles } from "@material-ui/core";

import AddPart from "../AddPart";
import { openAddPart } from "../../redux/actions/part-actions";

const actions = [
  { icon: <EditIcon />, name: "Edit items", operation: "edit" },
  { icon: <DeveloperBoardIcon />, name: "View devices", operation: "device" },
  { icon: <PrintIcon />, name: "Print reports", operation: "print" },
  {
    icon: <DashboardIcon />,
    name: "View inventory dashboard",
    operation: "dashboard",
  },
  { icon: <ListIcon />, name: "List view", operation: "list" },
  { icon: <ViewComfyIcon />, name: "Grid view", operation: "grid" },
  { icon: <AddIcon />, name: "Add an item", operation: "add" },
];

class NavDial extends Component<any, any> {
  static propTypes: {
    classes: PropTypes.Validator<object>;
    openAddPart: PropTypes.Validator<(...args: any[]) => any>;
    network: PropTypes.Validator<object>;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
    };
  }
  openDial = () => {
    this.setState({ open: true });
  };
  closeDial = () => {
    this.setState({ open: false });
  };
  handleDial = (e: any, operation: any) => {
    switch (operation) {
      case "add": {
        return this.props.openAddPart();
      }
      default: {
        break;
      }
    }
  };
  handleOffline = (status: boolean, operation: any) => {
    switch (operation) {
      case "add": {
        return { disabled: status };
      }
      case "device": {
        return { disabled: status };
      }
      case "edit": {
        return { disabled: status };
      }
      default: {
        return { disabled: false };
      }
    }
  };
  render() {
    const {
      classes,
      network: { showOfflineBanner },
    } = this.props;
    const { open } = this.state;
    return (
      <Fragment>
        <SpeedDial
          ariaLabel="SpeedDial app actions"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClose={this.closeDial}
          onOpen={this.openDial}
          open={open}
          FabProps={{ color: "secondary" }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              FabProps={this.handleOffline(showOfflineBanner, action.operation)}
              onClick={(e) => {
                this.handleDial(e, action.operation);
              }}
            />
          ))}
        </SpeedDial>
        <AddPart />
      </Fragment>
    );
  }
}

NavDial.propTypes = {
  classes: PropTypes.object.isRequired,
  openAddPart: PropTypes.func.isRequired,
  network: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
  network: state.network,
});

const mapActionsToProps = { openAddPart };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(NavTheme)(NavDial));
