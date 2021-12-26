import React, { useEffect, useState } from "react";
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
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import firebase_helper from "../lib/firebase_helper";

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
  const [userData, setUserData] = useState({});
  const [yourTopics, setYourTopics] = useState([]);
  const [yourVotes, setYourVotes] = useState([]);

  // get user data
  useEffect(() => {
    (async () => {
      if (user) {
        const profilesRef = collection(firebase_helper.db, "profiles");
        const q = query(profilesRef, where("id", "==", user.uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          if (doc.exists()) {
            const userDataFromRef = doc.data();
            setUserData(userDataFromRef);

            // get topics
            const topicsRef = collection(firebase_helper.db, "topics");
            const topicsQuery = query(
              topicsRef,
              where("username", "==", user.displayName)
            );
            const topicsQuerySnapshot = await getDocs(topicsQuery);
            const topics = [];
            topicsQuerySnapshot.forEach((doc) => {
              if (doc.exists()) {
                topics.push(doc.data());
              }
            });
            setYourTopics(topics);
          }
        });
      }
    })();
  }, [user]);

  console.log(user);
  console.log(userData);
  console.log(yourTopics);
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
              {user && <ProfileCard user={user} />}
            </Grid>
          </Grid>
          <Grid item container sm={12} md={6} justify="space-around">
            <Grid item style={{ marginBottom: "1rem" }}>
              <Typography variant="h6">Tópicos Criados</Typography>
              <YourTopics topics={yourTopics} />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Profile;
