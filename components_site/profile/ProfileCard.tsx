import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 500,
      maxWidth: 500,
    },
    media: {
      height: "400px",
      paddingTop: "56.25%", // 16:9
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
  })
);

export default function ProfileCard({ user }) {
  /* const user = {
    name: "wanderson",
    bio: "oaisda",
    profileimage: "https://picsum.photos/200/300",
  }; */
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title={user.displayName} />
      <CardMedia
        className={classes.media}
        image={user.photoURL}
        title="Paella dish"
      />
      {/*  <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {user.bio}
        </Typography>
      </CardContent> */}
      {/*       <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {!expanded && "seus votos"}
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <YourVotes />
        </CardContent>
      </Collapse> */}
    </Card>
  );
}
