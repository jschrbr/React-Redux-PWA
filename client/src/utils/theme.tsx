import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export const NavBarTheme = {
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
};

export const MainTheme = () => {
  const mainTheme = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        minHeight: "calc(100vh - 60px)",
        padding: 30,
      },
      title: {
        flexGrow: 1,
      },
    })
  );
  return mainTheme;
};

export const NavTheme = (theme: any) => {
  return createStyles({
    root: {
      height: 380,
      transform: "translateZ(0px)",
      flexGrow: 1,
    },
    speedDial: {
      position: "fixed",
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
  });
};

export const PartTheme = (theme: any) => {
  return createStyles({
    root: {
      maxWidth: "100%",
      textAlign: "center",
    },
    media: {
      height: 300,
      width: "100%",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    grow: {
      flexGrow: 1,
      alignContent: "center",
    },
    homeContainer: { minHeight: "calc(100vh - 60px)", padding: 30 },
    skeletonContainer: {
      width: 50,
    },
    container: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
    },
  });
};

export const AppTheme = () => {
  return {
    form: {
      container: {
        display: "flex",
        height: "100vh",
      },
      paper: {
        marginTop: "20vh",
        textAlign: "center",
        maxWidth: 600,
        padding: 30,
      },
      title: {
        marginTop: 20,
        marginBottom: 10,
      },
      field: {
        marginTop: 40,
      },
      img: {
        width: 100,
      },
      button: {
        marginTop: 25,
        marginBottom: 40,
        position: "relative",
      },
      customError: {
        color: "red",
        marginBottom: 10,
      },
      signup: {
        marginTop: 25,
      },
      progress: {
        position: "relative",
      },
    },
    navBar: {
      root: {
        flexGrow: 1,
      },
      title: {
        flexGrow: 1,
      },
    },
  };
};
