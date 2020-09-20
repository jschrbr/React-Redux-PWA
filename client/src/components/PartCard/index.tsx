import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//MUI
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// Icons
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { PartTheme } from "../../utils/theme";

class PartCard extends Component<any, any> {
  static propTypes: {
    part: PropTypes.Validator<object>;
    network: PropTypes.Requireable<object>;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      expanded: false,
      anchorEl: null,
    };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = (event: any) => {
    console.log(event.target.id);

    this.setState({ anchorEl: null });
  };

  render() {
    dayjs.extend(relativeTime);

    const { expanded, anchorEl } = this.state;

    const {
      classes,
      part: { name, createdAt, updatedAt, quantity },
      network: { showOfflineBanner },
    } = this.props;

    // const deleteButton =
    //   authenticated && userHandle === handle ? (
    //     <DeleteScream screamId={screamId} />
    //   ) : null;

    return (
      <Card className={classes.root}>
        <CardActions>
          <Typography variant="h5">{`${quantity}`}</Typography>

          <div className={classes.grow}></div>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <CardActions>
          <div className={classes.grow}>
            <Chip variant="outlined" color="secondary" label={name} />
          </div>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {showOfflineBanner ? (
            ""
          ) : (
            <CardActions>
              <div className={classes.grow}></div>

              <IconButton
                aria-label="settings"
                aria-haspopup="true"
                onClick={this.handleEditClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem id="edit" onClick={this.handleClose}>
                  Edit
                </MenuItem>
                <MenuItem id="remove" onClick={this.handleClose}>
                  Remove
                </MenuItem>
              </Menu>
            </CardActions>
          )}

          <CardContent>
            <Typography variant="body1" color="textSecondary" component="p">
              {`First used: ${dayjs(createdAt).fromNow()}`}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {`Last used: ${dayjs(updatedAt).fromNow()}`}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {`Remaining quantity: ${quantity}`}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

const mapStateToProps = (state: any) => ({
  network: state.network,
});
const mapActionsToProps: any = {};

PartCard.propTypes = {
  part: PropTypes.object.isRequired,
  network: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(PartTheme)(PartCard));
