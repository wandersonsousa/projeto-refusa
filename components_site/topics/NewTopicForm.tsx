import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import firebase_helper from "../../lib/firebase_helper";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Router from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        minWidth: "500px",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
  })
);

export default function NewTopicForm({ user, setIsLoading }) {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(false);
  const [image, setImage] = useState(null);
  const [ImagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addimage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files.item(0));
      const reader = new FileReader();
      reader.onload = function () {
        const dataURL = reader.result;
        setImagePreview(dataURL);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const publishPost = (e) => {
    setDisabled(true);
    e.preventDefault();

    if (image && title && content) {
      setIsLoading(true);
      window.scrollTo(0, 0);
      const randomtxt = uuidv4();
      const topicImageRef = ref(
        firebase_helper.storage,
        `TopicImages/${randomtxt + image.name}`
      );
      uploadBytes(topicImageRef, image)
        .then((snapshot) => getDownloadURL(topicImageRef))
        .then((url) => {
          addDoc(collection(firebase_helper.db, "topics"), {
            timestamp: serverTimestamp(),
            imageUrl: url + "?alt=media",
            username: user.displayName,
            title,
            content,
          }).then(async (snap) => {
            await setDoc(
              doc(
                collection(
                  doc(collection(firebase_helper.db, "topics"), snap.id),
                  "likes"
                ),
                "total"
              ),
              { count: 0 }
            );
            await setDoc(
              doc(
                collection(
                  doc(collection(firebase_helper.db, "topics"), snap.id),
                  "deslikes"
                ),
                "total"
              ),
              { count: 0 }
            );
            await setDoc(
              doc(
                collection(
                  doc(collection(firebase_helper.db, "topics"), snap.id),
                  "comments"
                ),
                "total"
              ),
              { count: 0 }
            );

            setImage(null);
            setDisabled(false);
            setIsLoading(false);
            setImagePreview(null);
            Router.push("/");
          });
        });
    }
    setIsLoading(false);
    setDisabled(false);
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%" }}>
        <TextField
          fullWidth
          id="topic_title"
          disabled={disabled}
          onChange={(evt) => setTitle(evt.target.value)}
          label="Título"
          variant="filled"
        />
      </div>
      <div style={{ width: "100%" }}>
        <TextField
          id="topic_content"
          label="Conteúdo"
          disabled={disabled}
          onChange={(evt) => setContent(evt.target.value)}
          fullWidth
          multiline
          minRows={4}
          variant="outlined"
        />
      </div>

      <div style={{ width: "100%" }}>
        <div>
          <input
            accept="image/*"
            id="image"
            multiple
            type="file"
            hidden
            onChange={(evt) => addimage(evt)}
          />
          <label htmlFor="image">
            <Button
              variant="contained"
              color="primary"
              component="span"
              disabled={disabled}
            >
              Upload
            </Button>
          </label>
        </div>
        <div>
          {ImagePreview ? (
            <>
              <div
                style={{ overflow: "hidden" }}
                className="rounded-lg h-44 overflow-hidden w-full relative"
              >
                <Image
                  alt="broken image"
                  src={ImagePreview}
                  width="300"
                  height="300"
                  objectFit="contain"
                />
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div style={{ marginTop: "16px" }}>
        <Button
          variant="contained"
          color="secondary"
          disabled={disabled}
          onClick={publishPost}
        >
          Publicar
        </Button>
      </div>
    </form>
  );
}
