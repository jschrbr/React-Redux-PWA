import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getParts } from "../redux/actions/part-actions";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Grow from "@material-ui/core/Grow";

import { withStyles } from "@material-ui/core/styles";
import { PartTheme } from "../utils/theme";

import NavDial from "../components/NavDial";
import PartCard from "../components/PartCard";
import PartSkeleton from "../components/PartCard/skeleton";



class home extends Component<any, any> {

  static propTypes: {
    getParts: PropTypes.Validator<(...args: any[]) => any>;
    part: PropTypes.Validator<object>;
  };
  constructor(props: any) {
    super(props);
    this.state = {
      list: false,
    };
  }
  componentDidMount() {
    this.props.getParts();
  }

  toggleList = () => {
    this.setState({ list: !this.state.list });
  };
  render() {
    const {
      classes,
      part: { parts, loading },
    } = this.props;

    const recentPartsMarkup = !loading ? (
      parts.map((part: any) => (
        <Grid item xs={12} sm={6} md={4}>
          <PartCard key={part.partId} part={part} />
        </Grid>
      ))
    ) : (
        <Grow in={true} timeout={1000}>
          <PartSkeleton count={12} />
        </Grow>
      );
    return (
      <Container className={classes.homeContainer}>
        <Grid container spacing={4}>
          {recentPartsMarkup}
        </Grid>
        <NavDial />
      </Container>
    );
  }
}

home.propTypes = {
  getParts: PropTypes.func.isRequired,
  part: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
  part: state.part,
  network: state.network,
});

export default connect(mapStateToProps, { getParts })(
  withStyles(PartTheme)(home)
);
