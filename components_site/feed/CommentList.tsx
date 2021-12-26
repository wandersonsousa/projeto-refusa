import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      margin: "2rem auto",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
  })
);

export default function CommentList({ comments }) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {comments.map((comment, index) => (
        <>
          <ListItem key={index} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Broken image" src={comment.photoURL} />
            </ListItemAvatar>
            <ListItemText
              primary={comment.displayName}
              secondary={<React.Fragment>{comment.comment}</React.Fragment>}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  );
}
