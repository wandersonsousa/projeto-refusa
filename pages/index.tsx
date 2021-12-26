import React, { useEffect, useState } from "react";
import {
  useTheme,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import RefusaAppBar from "../components_site/template/RefusaAppBar";
import { Grid, Paper } from "@material-ui/core";
import Topic from "../components_site/feed/Topic";
import { useAuth } from "../lib/auth";
import { async } from "@firebase/util";
import firebase_helper from "../lib/firebase_helper";
import { collection, getDocs } from "firebase/firestore";
// TODO: comment in feed hast to be a expansive component

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

const Home = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { user, logout } = useAuth();
  const [topics, setTopics] = useState([]);
  
  const half = Math.ceil(topics.length / 2);
  const firstHalf = topics.slice(0, half);
  const secondHalf = topics.slice(-half);

  useEffect(() => {
    (async () => {
      const topicsRefs = await getDocs(
        collection(firebase_helper.db, "topics")
      );
      const topicsData = [];
      topicsRefs.forEach((topicRef) =>
        topicsData.push({ id: topicRef.id, ...topicRef.data() })
      );
      setTopics(topicsData);
    })();
  }, []);
  return (
    <div className={classes.root}>
      <RefusaAppBar user={user} logout={logout} />
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
          <Grid item container xs={12} sm={12} md={6} justify="space-around">
            {firstHalf.map((topic) => (
              <Grid item key={topic.id}>
                <Topic topicData={topic} />
              </Grid>
            ))}
          </Grid>
          <Grid item container xs={12} sm={12} md={6} justify="space-around">
            {secondHalf.map((topic) => (
              <Grid item key={topic.id}>
                <Topic topicData={topic} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Home;
