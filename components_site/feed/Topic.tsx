import {
  Badge,
  Collapse,
  IconButton,
  Input,
  InputAdornment,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CommentIcon from "@material-ui/icons/Comment";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../lib/auth";
import firebase_helper from "../../lib/firebase_helper";
import CommentList from "./CommentList";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: "2rem auto",
      minWidth: 500,
      maxWidth: 500,
    },
    media: {
      backgroundPosition: "center",
      backgroundSize: "contain",
    },
  })
);

// positive: #2ecc71
// negative: #e74c3c

export default function Topic({ topicData }) {
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(0);
  const [deslikes, setDeslikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [desliked, setDisliked] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [disable, setdisable] = useState(false);
  const positiveTopic = likes >= deslikes;
  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { user } = useAuth();

  // get comments
  useEffect(() => {
    getDocs(
      collection(
        doc(collection(firebase_helper.db, "topics"), topicData.id),
        "comments"
      )
    ).then((snaphots) => {
      const commentsData = [];
      snaphots.forEach((commentSnap) => {
        commentsData.push(commentSnap.data());
      });
      setComments(commentsData);
    });
  }, []);

  // get total like count
  useEffect(() => {
    getDoc(
      doc(
        collection(
          doc(collection(firebase_helper.db, "topics"), topicData.id),
          "likes"
        ),
        "total"
      )
    ).then((snap) => {
      if (snap.exists()) setLikes(snap.data().count);
      else setLikes(0);
    });
  }, []);

  // get total deslikes count
  useEffect(() => {
    getDoc(
      doc(
        collection(
          doc(collection(firebase_helper.db, "topics"), topicData.id),
          "deslikes"
        ),
        "total"
      )
    ).then((snap) => {
      if (snap.exists()) setDeslikes(snap.data().count);
      else setDeslikes(0);
    });
  }, []);

  // check if user liked this post already
  useEffect(() => {
    setdisable(true);
    getDoc(
      doc(
        collection(
          doc(collection(firebase_helper.db, "topics"), topicData.id),
          "likes"
        ),
        user.displayName
      )
    ).then((snap) => {
      if (snap.exists()) {
        setLiked(true);
        setdisable(false);
      } else {
        setLiked(false);
        setdisable(false);
      }
    });
  }, [liked]);

  // check if user desliked this post already
  useEffect(() => {
    setdisable(true);
    getDoc(
      doc(
        collection(
          doc(collection(firebase_helper.db, "topics"), topicData.id),
          "deslikes"
        ),
        user.displayName
      )
    ).then((snap) => {
      if (snap.exists()) {
        setDisliked(true);
        setdisable(false);
      } else {
        setDisliked(false);
        setdisable(false);
      }
    });
  }, [liked]);

  const toggleLikeTopic = async () => {
    if (liked) {
      // remove like
      setdisable(true);
      deleteDoc(
        doc(
          collection(
            doc(collection(firebase_helper.db, "topics"), topicData.id),
            "likes"
          ),
          user.displayName
        )
      ).then(async () => {
        await setDoc(
          doc(
            collection(
              doc(collection(firebase_helper.db, "topics"), topicData.id),
              "likes"
            ),
            "total"
          ),
          { count: likes - 1 }
        );

        setLikes(likes - 1);
        setLiked(false);
        setdisable(false);
      });
    } else {
      // add like
      setdisable(true);
      setDoc(
        doc(
          collection(
            doc(collection(firebase_helper.db, "topics"), topicData.id),
            "likes"
          ),
          user.displayName
        ),
        {
          displayName: user.displayName,
          photoURL: user.photoURL,
        }
      ).then(async () => {
        await setDoc(
          doc(
            collection(
              doc(collection(firebase_helper.db, "topics"), topicData.id),
              "likes"
            ),
            "total"
          ),
          { count: likes + 1 }
        );
        setdisable(false);
        setLiked(true);
        setLikes(likes + 1);
      });
    }
  };

  const toggleDeslikeTopic = async () => {
    if (desliked) {
      // remove deslike
      setdisable(true);
      deleteDoc(
        doc(
          collection(
            doc(collection(firebase_helper.db, "topics"), topicData.id),
            "deslikes"
          ),
          user.displayName
        )
      ).then(async () => {
        await setDoc(
          doc(
            collection(
              doc(collection(firebase_helper.db, "topics"), topicData.id),
              "deslikes"
            ),
            "total"
          ),
          { count: 0 }
        );
        setDeslikes(0);
        setDisliked(false);
        setdisable(false);
      });
    } else {
      // add deslike
      setdisable(true);
      setDoc(
        doc(
          collection(
            doc(collection(firebase_helper.db, "topics"), topicData.id),
            "deslikes"
          ),
          user.displayName
        ),
        {
          displayName: user.displayName,
          photoURL: user.photoURL,
        }
      ).then(async () => {
        await setDoc(
          doc(
            collection(
              doc(collection(firebase_helper.db, "topics"), topicData.id),
              "deslikes"
            ),
            "total"
          ),
          { count: deslikes + 1 }
        );
        setdisable(false);
        setDisliked(true);
        setDeslikes(deslikes + 1);
      });
    }
  };

  const addComment = async () => {
    if (comment.length > 0) {
      setdisable(true);
      setDoc(
        doc(
          collection(
            doc(collection(firebase_helper.db, "topics"), topicData.id),
            "comments"
          ),
          user.displayName
        ),
        {
          displayName: user.displayName,
          photoURL: user.photoURL,
          comment: comment,
        }
      ).then(() => {
        setdisable(false);
        setComment("");

        getDocs(
          collection(
            doc(collection(firebase_helper.db, "topics"), topicData.id),
            "comments"
          )
        ).then((snaphots) => {
          const commentsData = [];
          snaphots.forEach((commentSnap) => {
            commentsData.push(commentSnap.data());
          });
          setComments(commentsData);
        });
      });
    }
  };

  return (
    <Card
      className={classes.root}
      style={{
        borderLeft: positiveTopic ? "4px solid #2ecc71" : "4px solid #e74c3c",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="300"
          image={topicData.imageUrl}
          title="Contemplative Reptile"
          classes={{
            media: classes.media,
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {topicData.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {topicData.content}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions style={{ justifyContent: "center" }}>
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={likes.toString()}
        >
          <IconButton
            aria-label="like"
            disabled={disable}
            onClick={toggleLikeTopic}
          >
            <ThumbUpAltIcon color={liked ? "primary" : "inherit"} />
          </IconButton>
        </Badge>
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={deslikes.toString()}
        >
          <IconButton
            aria-label="deslike"
            disabled={disable}
            onClick={toggleDeslikeTopic}
          >
            <ThumbDownIcon color={desliked ? "primary" : "inherit"} />
          </IconButton>
        </Badge>
        <IconButton aria-label="comment">
          <CommentIcon
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Input
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            fullWidth
            endAdornment={
              <InputAdornment position="end" onClick={addComment}>
                <IconButton aria-label="toggle password visibility">
                  <CommentIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          <CommentList comments={comments} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
