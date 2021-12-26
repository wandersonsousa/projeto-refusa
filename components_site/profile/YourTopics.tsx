import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      minWidth: 450,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function YourTopics() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ArtTrackIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="como fazer caramelo" secondary="Jan 9, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ArtTrackIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Como faz isso mano" secondary="Jan 7, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ArtTrackIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Eu não sei bro" secondary="July 20, 2014" />
      </ListItem>
    </List>
  );
}
