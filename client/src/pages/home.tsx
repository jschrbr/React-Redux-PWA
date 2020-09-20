import React, { Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getParts } from "../redux/actions/part-actions";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";
import { PartTheme } from "../utils/theme";

import NavDial from "../components/NavDial";
import PartCard from "../components/PartCard";
import PartSkeleton from "../components/PartCard/skeleton";

const MightyMorph = (props: any) => {
  let { part, toggle } = props;
  const [toggleState, setToggle] = React.useState(true);

  React.useEffect(() => {
    setToggle((prev) => !prev);
  }, [toggle]);

  const changeEl = () => {
    if (partEl.key === "list") {
      partEl = (
        <Grow key="grid" in={toggleState} timeout={1000} onExited={changeEl}>
          <Grid item xs={12} sm={6} md={4}>
            <PartCard key={part.partId} part={part} />
          </Grid>
        </Grow>
      );
    } else {
      partEl = (
        <Grow key="list" in={toggleState} timeout={1000} onExited={changeEl}>
          <Paper>{"hello"}</Paper>
        </Grow>
      );
    }
    setToggle(true);
    return partEl;
  };

  var partEl = (
    <Grow key="grid" in={toggleState} timeout={1000} onExited={changeEl}>
      <Grid item xs={12} sm={6} md={4}>
        <PartCard key={part.partId} part={part} />
      </Grid>
    </Grow>
  );

  return partEl;
};

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
        <MightyMorph part={part} toggle={this.state.list} />
      ))
    ) : (
      <Grow in={true} timeout={1000}>
        <PartSkeleton count={12} />
      </Grow>
    );
    return (
      <Container className={classes.homeContainer}>
        <Button onClick={this.toggleList}>Thing</Button>
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
