import React from "react";
import {
  useTheme,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import RefusaAppBar from "../components_site/template/RefusaAppBar";
import ProfileCard from "../components_site/profile/ProfileCard";
import YourVotes from "../components_site/profile/YourVotes";
import YourTopics from "../components_site/profile/YourTopics";
import { useAuth } from "../lib/auth";

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

const Profile = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { user } = useAuth();
  console.log("user from profile", user);
  return (
    <div className={classes.root}>
      <RefusaAppBar user={user} />
      <Paper
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <Grid container xs={12} sm={12} justify="space-around">
          <Grid item container sm={12} md={6} justify="space-around">
            <Grid item style={{ marginBottom: "1rem" }}>
              {/*   <Typography variant="h6">Profile</Typography> */}
              <ProfileCard user={user} />
            </Grid>
          </Grid>
          <Grid item container sm={12} md={6} justify="space-around">
            <Grid item style={{ marginBottom: "1rem" }}>
              <Typography variant="h6">Tópicos Criados</Typography>
              <YourTopics />
            </Grid>

            <Grid item style={{ marginBottom: "1rem" }}>
              <Typography variant="h6">Seus Votos</Typography>
              <YourVotes />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Profile;
