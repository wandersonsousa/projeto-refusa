import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import Topic from "../feed/Topic";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      minWidth: 450,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function YourTopics({ topics = [] }) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {topics.map((topic, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar src={topic.imageUrl}></Avatar>
          </ListItemAvatar>
          <ListItemText primary={topic.title} />
        </ListItem>
      ))}
    </List>
  );
}
