import React from "react";
import {
  useTheme,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Router from "next/router";
import RightDrawer from "./RightDrawer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function RefusaAppBar({ user, logout }) {
  const theme = useTheme();
  // const loggedIn = true;
  const classes = useStyles(theme);
  return (
    <AppBar position="static">
      <Toolbar>
        {/*   <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton> */}
        <div className={classes.title}>
          <Button onClick={() => Router.push("/")} style={{ color: "white" }}>
            Feed
          </Button>
        </div>

        {user ? (
          <>
            <div style={{ padding: 8 }}>{user.displayName}</div>{" "}
            <RightDrawer user={user} logout={logout} />
          </>
        ) : (
          <Button onClick={() => Router.push("/login")} variant="contained">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
