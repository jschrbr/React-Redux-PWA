import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import CardActions from "@material-ui/core/CardActions";

import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import { PartTheme } from "../../utils/theme";

class PartSkeleton extends Component<any, any> {
  static propTypes: {
    count: PropTypes.Validator<number>;
  };
  render() {
    const { classes, count } = this.props;
    const loadSkeleton: any = [];
    for (let i = 0; i < count; i++) {
      loadSkeleton.push(
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <CardActions>
              <Typography variant="h4">
                <Skeleton width={75} />
              </Typography>

              <div className={classes.grow}></div>
              <IconButton>
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <CardActions>
              <div className={classes.grow}>
                <Chip
                  variant="outlined"
                  color="secondary"
                  label={<Skeleton width={100} />}
                />
              </div>
            </CardActions>
          </Card>
        </Grid>
      );
    }
    return loadSkeleton;
  }
}

PartSkeleton.propTypes = {
  count: PropTypes.number.isRequired,
};

const mapStateToProps: any = (state: any) => ({});

const mapActionsToProps: any = null;

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(PartTheme)(PartSkeleton));
